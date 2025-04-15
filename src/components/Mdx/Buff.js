import { parse } from "smol-toml";
import path from "path";
import fs from "fs";
import { Tooltip } from "@mui/material";
import Image from "next/image";

// buff component, ported from spectria's original shortcode implementation
// https://github.com/spectria-limina/dynamis-gg/blob/main/templates/shortcodes/buff.html

let safe = "placeholder";

// content within tooltip
function tooltip({ name, description, dur, explanation, short, stacks }) {
  return (
    <div className="tooltip">
      {(short || stacks || dur) && (
        <div className="buff-name">
          {name && <>{name || safe}</>}
          {(stacks || dur) && (
            <span className="buff-params">
              {" "}
              (
              {stacks && (
                <>
                  {stacks} stack{stacks != 1 && "s"}
                </>
              )}
              {dur && (
                <>
                  {stacks && " "}for {dur}
                </>
              )}
              )
            </span>
          )}
        </div>
      )}
      {description && (
        <>
          <div className="buff-description"> {description || safe} </div>
          {explanation && <hr />}
        </>
      )}
      {explanation && (
        <div className="buff-explanation">{explanation || safe}</div>
      )}
    </div>
  );
}

/*
    https://github.com/naurffxiv/naurffxiv/issues/103
    b: string. The key into a (fight-specific) TOML file with buff data in it. This is where the name, icon, game text, and explanation come from, as well as whether the buff has the cleansable bar or not. More on the data file in another issue.
    dur: string. The buff duration text to render under the buff icon. (Allowing an integer instead of a string is a helpful shorthand, but not necessary.)
    short: boolean (default false). If true, the name is not displayed.
    datapath: path. Alternate path to the data file (never used, I think).
    stacks: optional integer. Number of stacks for the buff. If present, the buff icon ID is offset by stacks - 1, because that's the way icon IDs work (see this page, for example).
    description: optional string. Override the buff description text in the tooltip (never used, I think).
    explanation: optional string. Override the buff explanation text in the tooltip (never used, I think).
*/
export default async function Buff({
  b,
  datapath,
  description,
  dur,
  explanation,
  mdxDir,
  short,
  stacks,
  type = "toml",
}) {
  let filename = "";
  let buffsData = {};
  switch (type) {
    case "json":
      datapath = datapath || `buffs.json`;
      filename = String(fs.readFileSync(path.join(mdxDir, datapath)));
      buffsData = JSON.parse(filename);
      break;
    default:
      datapath = datapath || "buffs.toml";
      filename = String(fs.readFileSync(path.join(mdxDir, datapath)));
      buffsData = parse(filename);
      break;
  }

  let buff = buffsData[b];

  let icon = String(buff.icon);
  let fill = 6 - icon.length;
  icon = "0".repeat(fill) + icon;
  let iconseries = icon.substring(0, 3) + "0".repeat(3);

  description = description || buff.description;
  explanation = explanation || buff.explanation;
  dur = dur || buff.duration;

  // check duration
  if (typeof dur !== "number") {
    let isNum = /^\d+$/.test(dur);
    dur = isNum ? String(dur) + "s" : dur;
  }

  return (
    <span className="buff not-prose">
      <Tooltip
        title={tooltip({
          name: buff.name,
          description,
          dur,
          explanation,
          short,
          stacks,
        })}
      >
        <span className="buff-icon">
          {buff.cleansable && <span className="buff-cleansable" />}
          <Image
            height={24}
            width={18}
            src={`https://xivapi.com/i/${iconseries}/${icon}.png`}
            alt={description}
            loading="lazy"
          />
          {(buff.duration || dur) && (
            <span className="buff-duration">{dur || safe}</span>
          )}
        </span>
      </Tooltip>
      {!short && <span className="buff-name">{buff.name || safe}</span>}
    </span>
  );
}
