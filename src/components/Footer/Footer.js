import FooterLinks from './FooterLinks';
import { ultimateList, savageList, extremeList, otherList } from "@/app/constants";

export default function Footer() {
    return (
        <footer>
            <div className="bg-gradient-to-b from-[#28506E] to-[#061A33] pt-10 pb-10 px-20 md:px-40">
                <div className="mx-auto max-w-screen-2xl">
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_1fr_1fr] gap-x-5">
                        <FooterLinks title="Ultimate" links={ultimateList} className="mt-5 xl:mt-0" />
                        <FooterLinks title="Savage" links={savageList} className="mt-5 xl:mt-0" />
                        <FooterLinks title="Extreme" links={extremeList} className="mt-5 xl:mt-0" />
                        <FooterLinks title="Other Links" links={otherList} className="mt-5 xl:mt-0" />
                    </div>
                    <div className="grid mt-14 justify-items-center xl:justify-items-start">
                        <div className="prose-sm prose prose-slate prose-invert">
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