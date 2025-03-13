import Image from 'next/image';
import { icons } from '@/app/assets'

const divs = [
    { icon: icons.Chat, width: 70, height: 70, alt: "Chat icon", text: "Active Staff", desc: "Active staff and discussion channels" },
    { icon: icons.Lightbulb, width: 40, height: 40, alt: "Bulb icon", text: "Strats & Resources", desc: "Party Finder-friendly strats and resources" },
    { icon: icons.Contact, width: 70, height: 70, alt: "Contact icon", text: "Recruitment Forums", desc: "Recruitment forums for statics and Party Finder" },
    { icon: icons.Discord, width: 50, height: 50, alt: "Discord icon", text: "Discord Bots", desc: "Display Party Finder listings and raiding achievements" },
    { icon: icons.Calendar, width: 45, height: 45, alt: "Calendar icon", text: "Server Events", desc: "Server events to help players prog and clear" }
];

export default function Offerings() {
    return (
        <div>
            <h3 className="text-xl">What we offer</h3>
            <div className="mt-3 flex gap-x-3 sm:gap-x-10 gap-y-3 md:gap-y-6 justify-center text-center mx-auto flex-row flex-wrap">
                {
                    divs.map(div => {
                        return (
                            <div key={div.alt} className="bg-[#007EA7] grid grid-rows-2 rounded-xl min-w-28 max-w-36 px-1 py-3 sm:pt-10 sm:pb-6 sm:px-3 sm:min-w-48 sm:max-w-48 flex-1">
                                <Image src={div.icon} width={div.width} height={div.height} alt={div.alt} className="m-auto"/>
                                <p className="text-center sm:mt-2">{div.desc}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}