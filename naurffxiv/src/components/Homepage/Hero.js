import Image from "next/image"
import { icons } from "@/app/assets"

export default function Header() {
  function Text(){ return (
      <div className="grid max-w-prose gap-y-3 md:gap-y-6">
        <h1 className="text-4xl xl:text-6xl font-bold">NAUR</h1>
                <h3 className="text-lg/8 xl:text-2xl/10">
                  NA Ultimate Raiding (NAUR) is an FFXIV Discord community focused on High-End raiding on NA Data Centers. If you're looking to raid on NA Data Centers, come join our community!
                </h3>
                <a
                href="https://discord.com/invite/naurffxiv"
                target="_blank"
                className="transition-colors bg-[#007EA7] rounded-full max-w-fit py-4 px-8 hover:bg-[#007196]"
                >
                <span className="flex gap-5 font-medium">
                  <Image src={icons.Discord} alt="Discord" width="32" height="24" />
                  Join our Discord!
                </span>
        </a>
      </div>
    )
  }

  return (
      <div className="max-w-screen-2xl grid md:grid-cols-2 bg-[#1A192B] 2xl:bg-transparent 2xl:bg-header-gradient mx-auto 2xl:px-6">
        <div className="bg-center bg-header-default px-5 md:bg-none md:bg-left py-16">
          <div className="max-w-3xl mx-auto mr-0">
            <div className="max-w-fit mx-auto">
              <Text />
            </div>
          </div>
        </div>
        <div className="max-w-screen-md">
          <div className="hidden md:block bg-header-wide bg-cover bg-center h-full">
            <div className="h-full bg-header-right-gradient 2xl:bg-header-right-ultrawide-gradient"/>
          </div>
        </div>
      </div>
    )
}