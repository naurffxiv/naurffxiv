import FooterSocialLinks from './FooterSocialLinks';
import FooterLinks from './FooterLinks';
import { linksExplore, linksUltimates } from "@/app/constants";

export default function Footer() {
    return (
        <footer>
            <div className="bg-gradient-to-b from-[#28506E] to-[#061A33] pt-10 pb-10">
                <div className="w-fit px-20 md:px-40 mx-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_1fr_1fr] gap-x-5">
                        <FooterLinks title="Ultimates" links={linksUltimates} className="" />
                        <FooterLinks title="Explore" links={linksExplore} className="mt-5 xl:mt-0" />
                        <div />
                        <FooterSocialLinks />
                    </div>
                    <div className="mt-14 grid justify-items-center xl:justify-items-start">
                        <div className="prose prose-slate prose-invert prose-sm">
                            <p>
                                NAUR FFXIV is a non-profit community-owned website.
                            </p>
                            <p>
                                FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd. © SQUARE ENIX CO., LTD. All Rights Reserved | All content © their respective authors
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}