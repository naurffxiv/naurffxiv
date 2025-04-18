import Image from "next/image";
import { icons } from "@/lib/assets";

const divs = [
  {
    title: "Active & Inclusive Community",
    desc: `NAUR is an inclusive community with active staff and discussion channels.
                Our Discord features custom recruitment tools and bots created by our members,
                making it easy to find groups, recruit for high-end content, and stay connected with fellow players.`,
    icon: icons.Contact,
    width: 70,
    height: 70,
    alt: "Person Search Icon",
  },
  {
    title: "FFXIV Resources for NA Players",
    desc: `Our website and Discord provide tailored resources for high-end content which include up-to-date
                raid-plans/toolboxes, written guides, and other learning tools and resources.
                Whether you're tackling Savage or Ultimate raids, we’ve got the tools you need to progress and clear them.`,
    icon: icons.Lightbulb,
    width: 40,
    height: 40,
    alt: "Bulb icon",
  },
  {
    title: "Raid Events",
    desc: `NAUR hosts a variety of events throughout the year for NA data centers,
                designed to help players prog and clear high-end content.
                Join us for fun parties that bring the community together to achieve your raiding goals.`,
    icon: icons.Calendar,
    width: 45,
    height: 45,
    alt: "Calendar icon",
  },
];

export default function Offerings() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-2xl">What NAUR has to offer</h3>
      <div className="grid justify-center grid-cols-1 mx-auto text-center lg:grid-cols-3 gap-x-3 sm:gap-x-10 gap-y-3">
        {divs.map((div) => {
          return (
            <div
              key={div.alt}
              className="grid grid-rows-[1fr_2fr] rounded-xl px-1 sm:pb-6 sm:px-3 flex-1"
            >
              <Image
                src={div.icon}
                width={div.width}
                height={div.height}
                alt={div.alt}
                className="m-auto mb-0"
              />
              <div>
                <h4 className="text-lg font-semibold text-center sm:mt-2">
                  {div.title}
                </h4>
                <p className="prose max-w-prose prose-invert">{div.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
