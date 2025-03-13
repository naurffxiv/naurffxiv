import Image from "next/image"

export default function Header() {
    return (
      <div className="grid min-w-full md:grid-cols-[40%_60%] xl:grid-cols-[45%_55%]">
        <div className="px-5 xl:pr-0 bg-center bg-header-default md:bg-header-gradient">
          <div className="grid mx-auto py-16 gap-y-3 max-w-prose md:gap-y-6 xl:float-right">
            <h1 className="text-4xl xl:text-6xl font-bold">NAUR</h1>
            <h3 className="text-lg/8 xl:text-2xl/10">
              NA Ultimate Raiding (NAUR) is an FFXIV Discord community for Ultimate Duties in NA Data Centers. Join us for the best Ultimate raiding experience, whether you're new or a veteran!
            </h3>
            <a
            href="https://discord.com/invite/naurffxiv"
            target="_blank"
            className="transition-colors bg-[#007EA7] rounded-full max-w-fit py-4 px-8 hover:bg-[#007196]"
            >
            <span className="flex gap-5 font-medium">
              <Image src="/icons/Discord.png" alt="Discord" width="32" height="24" />
              Join our Discord!
            </span>
            </a>
          </div>
        </div>
        <div className="hidden md:block bg-header-wide bg-cover bg-center h-60 md:h-auto"/>
      </div>
    )
}