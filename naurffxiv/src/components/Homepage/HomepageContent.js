import { icons } from '@/app/constants.js';
import Image from 'next/image';

export default function HomepageContent() {
    return (
        <div className="max-w-[90%] md:max-w-[60%] text-center wrap flex flex-col justify-center m-auto mt-10 gap-2 md:gap-6">
            <div className="flex wrap flex-col items-center">
                <p className="font-medium text-lg max-w-screen-xl">
                    NA Ultimate Raiding (NAUR) is a Final Fantasy XIV Discord community centered around
                    Ultimate Duties in North American Data Centers. Our goal is to provide a community that
                    makes the experience of Ultimate Raiding the best it can be. Whether you&apos;re completely
                    new or have a lot of experience in Ultimate raiding, we have something for everyone!
                </p>
            </div>

            <div className="min-w-full xl:min-w-[80%] flex flex-col self-center mx-auto space-y-10 mt-6">
                <div className="grid grid-cols-3 min-w-full items-center">
                    <div className="flex flex-col justify-between items-center text-center h-32 py-4">
                        <Image src={icons.chat} width={70} height={70} alt="Chat icon" />
                        <p>Active Staff</p>
                    </div>
                    <div className="flex flex-col justify-between items-center text-center h-32 py-4">
                        <Image src={icons.lightbulb} width={40} height={40} alt="Bulb icon" />
                        <p>Strats & Resources</p>
                    </div>
                    <div className="flex flex-col justify-between items-center text-center h-32 py-4">
                        <Image src={icons.contact} width={80} height={80} alt="Contact icon" />
                        <p>Recruitment Forums</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-0 min-w-[80%] mx-auto">
                    <div className="flex flex-col justify-between items-center text-center h-32 py-4">
                        <Image src={icons.discord} width={50} height={50} alt="Discord icon" />
                        <p>Discord Bots</p>
                    </div>
                    <div className="flex flex-col justify-between items-center text-center h-32 py-4">
                        <Image src={icons.calendar} width={45} height={45} alt="Calendar icon" />
                        <p>Server Events</p>
                    </div>
                </div>
            </div>
            <p className="font-medium text-lg mt-6">
                If you are interested in Ultimate Raiding on NA Data Centers and what we have to offer, come be a part of our community!
            </p>
        </div>
    );
}