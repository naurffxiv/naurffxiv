import { Box, Typography, IconButton, } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import FooterSocialLinks from './FooterSocialLinks';
import FooterLinks from './FooterLinks';
import {linksResources, linksExplore} from "@/app/constants";

export default function Footer() {
    return (
        <footer>
            <Box className="bg-gradient-to-b from-[#28506E] to-[#061A33] mt-20 pt-20 pb-10">
                <Box className="w-fit px-10 md:px-20 xl:px-40">
                    <Box className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_1fr_1fr] gap-x-5">
                        <FooterLinks title="Ultimate Resources" links={linksResources} className=""/>
                        <FooterLinks title="Explore" links={linksExplore} className="mt-5 xl:mt-0"/>
                        <Box />
                        <FooterSocialLinks />
                    </Box>
                    <Box className="mt-14 grid justify-items-center xl:justify-items-start">
                        <Box className="">
                        <Typography variant="subtitle2">
                                NAUR FFXIV is a non-profit community-owned website.
                                </Typography>
                            <Typography variant="subtitle2">
                                FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd. © SQUARE ENIX CO., LTD. All Rights Reserved | All content © their respective authors
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </footer>
    )
}