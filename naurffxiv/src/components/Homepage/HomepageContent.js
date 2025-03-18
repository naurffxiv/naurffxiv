import FightGuideList from './FightGuideList';
import Offerings from './OfferingCards';

export default function HomepageContent() {
    return (
        <div className="max-w-screen-2xl mx-auto p-10 grid gap-y-10">
            <FightGuideList />
            <Offerings />
            <p className="text-center text-xl">
                If you are interested in Ultimate Raiding on NA Data Centers and what we have to offer, come be a part of our community!
            </p>
        </div>
    );
}