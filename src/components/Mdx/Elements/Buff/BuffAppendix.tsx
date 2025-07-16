import Image from "next/image";

import { getBuffSrc } from "./getBuffSrc";
import { loadBuffsData } from "./loadBuffsData";
import { Buff, BuffMap } from "./types";

type BuffAppendixProps = {
  phase: number | string;
  header?: string;
  mdxDir: string;
  datapath?: string;
};

/**
 * Component that returns a table with a title for all buffs in a given phase
 * */
export async function BuffAppendix({
  phase,
  header,
  mdxDir,
  datapath,
}: BuffAppendixProps) {
  const buffsData = loadBuffsData(mdxDir, datapath);
  const phaseBuffs = getBuffsForPhase(phase, buffsData);

  return (
    <div>
      <h2>{header || getPhaseName(phase)}</h2>
      <table className="small-table">
        <thead>
          <tr>
            <td></td>
            <td>Buff</td>
            <td>Description</td>
            <td>Notes</td>
          </tr>
        </thead>
        <tbody>
          {phaseBuffs.map((buff) => (
            <tr key={buff.name}>
              <td>
                <div className="not-prose" style={iconCellStyle}>
                  <Image
                    height={24}
                    width={18}
                    src={getBuffSrc(buff.icon)}
                    alt={buff.description ?? "placeholder status effect"}
                    loading="lazy"
                  />
                </div>
              </td>
              <td>{buff.name}</td>
              <td>{buff.description}</td>
              <td>{buff.explanation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// "Filter" the buff map for buffs within the passed phase
function getBuffsForPhase(phase: number | string, buffsData: BuffMap): Buff[] {
  const buffsForPhase: Buff[] = [];

  for (const buffKey in buffsData) {
    const buff = buffsData[buffKey];

    if (buff.phases.includes(phase)) {
      buffsForPhase.push(buff);
    }
  }

  return buffsForPhase;
}

// Allows numbered phase keys to get a "Phase X" title without explicit prop passed
function getPhaseName(phase: number | string): string {
  if (typeof phase === "number") {
    return `Phase ${phase}`;
  }

  return phase;
}

const iconCellStyle = {
  height: "29px",
  width: "24px",
};
