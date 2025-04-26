import { Tooltip } from "@mui/material";
import Image from "next/image";

import { BuffTooltip } from "./BuffTooltip";
import { getBuffSrc } from "./getBuffSrc";
import { loadBuffsData } from "./loadBuffsData";

// buff component, ported from spectria's original shortcode implementation
// https://github.com/spectria-limina/dynamis-gg/blob/main/templates/shortcodes/buff.html

const PLACEHOLDER = "placeholder";

type BuffProps = {
  b: string;
  datapath?: string;
  dur?: number | string;
  mdxDir: string;
  short?: boolean;
  stacks?: number;
};

/*
    https://github.com/naurffxiv/naurffxiv/issues/103
    b: string. The key into a (fight-specific) TOML file with buff data in it. This is where the name, icon, game text, and explanation come from, as well as whether the buff has the cleansable bar or not. More on the data file in another issue.
    dur: string. The buff duration text to render under the buff icon. (Allowing an integer instead of a string is a helpful shorthand, but not necessary.)
    short: boolean (default false). If true, the name is not displayed.
    datapath: path. Alternate path to the data file (never used, I think).
    stacks: optional integer. Number of stacks for the buff. If present, the buff icon ID is offset by stacks - 1, because that's the way icon IDs work (see this page, for example).
*/
export async function Buff({
  b,
  datapath,
  dur,
  mdxDir,
  short,
  stacks,
}: BuffProps) {
  const buffsData = loadBuffsData(mdxDir, datapath);
  const buff = buffsData[b];
  const iconSrc = getBuffSrc(buff.icon);

  dur = dur || buff.duration;

  // check duration
  if (dur && typeof dur !== "number") {
    const isNum = /^\d+$/.test(dur);
    dur = isNum ? String(dur) + "s" : dur;
  }

  return (
    <span className="buff not-prose">
      <Tooltip
        title={BuffTooltip({
          name: buff.name,
          description: buff.description,
          dur: dur as string,
          explanation: buff.explanation,
          short,
          stacks,
        })}
      >
        <span className="buff-icon">
          {buff.cleansable && <span className="buff-cleansable" />}
          <Image
            height={24}
            width={18}
            src={iconSrc}
            alt={buff.description ?? "placeholder status effect"}
            loading="lazy"
          />
          {(buff.duration || dur) && (
            <span className="buff-duration">{dur || PLACEHOLDER}</span>
          )}
        </span>
      </Tooltip>
      {!short && <span className="buff-name">{buff.name || PLACEHOLDER}</span>}
    </span>
  );
}
