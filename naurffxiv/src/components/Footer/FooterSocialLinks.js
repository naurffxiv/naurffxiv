import { Box, Typography, IconButton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function FooterSocialLinks() {
    return (
        <Box className="mt-5 xl:mt-0">
            <Typography className="text-xl text-[#007EA7] font-bold">
                Keep in touch
            </Typography>
            <Typography className="xs:text-base xl:text-4xl mt-1 font-bold">
                Join our community today!
            </Typography>
            <Box className="whitespace-nowrap">
                <ul className="flex flex-wrap gap-x-5 items-center mt-5">
                    <li>
                        <IconButton size="small">
                            <Link href="/">
                                <Image
                                src="/images/discordlogo.png"
                                alt="Discord logo"
                                height="30"
                                width="30"
                                />
                            </Link>
                        </IconButton>
                    </li>
                    <li>
                        <IconButton size="small">
                            <Link href="/">
                                <Image
                                src="/images/githublogo.png"
                                alt="GitHub Logo"
                                height="30"
                                width="30"
                                />
                            </Link>
                        </IconButton>
                    </li>
                    <li>
                        <IconButton size="small">
                            <Link href="/">
                                <Image
                                src="/images/patreonlogo.png"
                                alt="Patreon Logo"
                                height="30"
                                width="30"
                                />
                            </Link>
                        </IconButton>
                    </li>
                </ul>
            </Box>
        </Box>
    );
}