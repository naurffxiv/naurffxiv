import FightGuideList from "../Widgets/FightGuideList";
import Offerings from "../Widgets/OfferingCards";

export default function HomepageContent() {
  return (
    <div className="grid p-10 mx-auto max-w-screen-2xl gap-y-10">
      <FightGuideList />
      <Offerings />
      <p className="text-xl text-center">
        If you are interested in high-end content on NA Data Centers and what we
        have to offer, come be a part of our community!
      </p>
    </div>
  );
}
