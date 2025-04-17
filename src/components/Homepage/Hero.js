import Image from "next/image";
import { icons } from "@/app/assets";

export default function Header() {
  function Text() {
    return (
      <div className="grid max-w-prose gap-y-3 md:gap-y-6">
        <h1 className="text-4xl font-bold xl:text-6xl">NAUR</h1>
        <h3 className="text-lg/7 xl:text-2xl/9">
          NAUR (NA Ultimate Raiding) is a community of high-end raiders on North
          American Data Centers for Final Fantasy XIV Online. Come connect with
          other high-end raiders, find statics, and share the enjoyment of
          FFXIV&apos;s toughest content.
        </h3>
        <a
          href="https://discord.com/invite/naurffxiv"
          target="_blank"
          className="transition-colors bg-[#7289da] rounded-full max-w-fit py-4 px-6 hover:bg-[#007196]"
        >
          <span className="flex gap-5 font-medium">
            <Image src={icons.Discord} alt="Discord" width="32" height="24" />
            Join our Discord!
          </span>
        </a>
      </div>
    );
  }

  return (
    <div className="grid mx-auto max-w-screen-2xl md:grid-cols-2 2xl:px-6">
      <div className="px-5 py-16 bg-center bg-header-default md:bg-none md:bg-left">
        <div className="max-w-3xl mx-auto mr-0">
          <div className="max-w-fit">
            <Text />
          </div>
        </div>
      </div>
      <div className="max-w-screen-md">
        <div className="hidden h-full bg-center bg-cover md:block bg-header-wide">
          <div className="h-full bg-header-right-gradient 2xl:bg-header-right-ultrawide-gradient" />
        </div>
      </div>
    </div>
  );
}
