import FooterSocialLinks from './FooterSocialLinks';
import FooterLinks from './FooterLinks';
import { linksOther, linksUltimates, linksSavageExtreme } from "@/app/constants";

export default function Footer() {
    return (
        <footer>
            <div className="bg-gradient-to-b from-[#28506E] to-[#061A33] pt-10 pb-10">
                <div className="w-fit px-20 md:px-40 mx-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_1fr_1fr] gap-x-5">
                        <FooterLinks title="Ultimates" links={linksUltimates} className="mt-5 xl:mt-0" />
                        <FooterLinks title="Savage & Extreme" links={linksSavageExtreme} className="mt-5 xl:mt-0" />
                        <FooterLinks title="Other Links" links={linksOther} className="mt-5 xl:mt-0" />
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