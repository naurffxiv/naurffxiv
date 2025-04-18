import { ultimateList } from "@/app/constants.js";
import { savageList } from "@/app/constants.js";
import { extremeList } from "@/app/constants.js";
import FightGuideComponent from "./FightGuideComponent";

export default function EncounterEntry() {
  const ultimateEntries = ultimateList.slice(0, 1);
  const savageEntries = savageList.slice(0, 4);
  const extremeEntries = extremeList.slice(0, 1);

  return (
    <div>
      {ultimateEntries.length > 0 && (
        <FightGuideComponent
          entries={ultimateEntries}
          title="Current Ultimate"
          left
        />
      )}
      <FightGuideComponent
        entries={savageEntries}
        title="Current Savage Tier"
      />
      {extremeEntries.length > 0 && (
        <FightGuideComponent
          entries={extremeEntries}
          title="Current Extreme Trial"
        />
      )}
    </div>
  );
}
