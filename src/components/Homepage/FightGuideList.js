import { ultimateList } from "@/app/constants.js";
import { savageList } from "@/app/constants.js";
import { extremeList } from "@/app/constants.js";
import FightGuideComponent from "./FightGuideComponent";

export default function CurrentUltimate({ selectedUltimate, selectedExtreme }) {
  const ultimateItems = ultimateList.slice(0, 1);
  const savageItems = savageList.slice(0, 4);
  const extremeItems = extremeList.slice(0, 1);

  return (
    <div>
      {ultimateItems.length > 0 && (
        <FightGuideComponent items={ultimateItems} title="Current Ultimate" />
      )}
      <FightGuideComponent items={savageItems} title="Current Savage Tier" />
      {extremeItems.length > 0 && (
        <FightGuideComponent items={extremeItems} title="Current Extreme Trial" />
      )}
    </div>
  );
}
