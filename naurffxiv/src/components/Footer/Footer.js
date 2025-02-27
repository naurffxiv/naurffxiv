import { Box, Typography, IconButton, } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import FooterSocialLinks from './FooterSocialLinks';
import FooterLinks from './FooterLinks';

const linksUltis = [
    {name: "Futures Rewritten", url: "/"},
    {name: "The Omega Protocol", url: "/"},
    {name: "Dragonsong's Reprise", url: "/"},
    {name: "The Epic of Alexander", url: "/"},
    {name: "The Weapon's Refrain", url: "/"},
    {name: "The Unending Coil of Bahamut", url: "/"},
]

const linksExplore = [
    {name: "About Us", url: "/"},
    {name: "Events", url: "/"},
]

export default function Footer() {
    return (
        <footer>
            <Box className="bg-gradient-to-b from-[#28506E] to-[#061A33] mt-20 py-20 sm:px-40 lg:px-80">
                <Box className="grid sm:grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1fr]">
                    <FooterLinks title="Ultimates" links={linksUltis} />
                    <FooterLinks title="Explore" links={linksExplore} className="sm:mt-5 lg:mt-0"/>
                    <Box />
                    <FooterSocialLinks />
                </Box>

                <Box className="mt-20">
                    <Typography>
                        NAUR FFXIV is a non-profit community-owned website.
                        </Typography>
                    <Typography>
                        FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd. © SQUARE ENIX CO., LTD. All Rights Reserved | All content © their respective authors
                    </Typography>
                </Box>
            </Box>
        </footer>
    )
}