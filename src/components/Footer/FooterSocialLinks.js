import { IconButton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import {icons} from '@/app/assets'

export default function FooterSocialLinks() {
    return (
        <div className="mt-5 xl:mt-0">
            <p className="text-xl text-[#007EA7] font-bold">
                Keep in touch
            </p>
            <p className="xs:text-base xl:text-4xl mt-1 font-bold">
                Join our community today!
            </p>
            <div className="whitespace-nowrap">
                <ul className="flex flex-wrap gap-x-5 items-center mt-5">
                    <li>
                        <IconButton size="small">
                            <Link href="https://discord.com/invite/naurffxiv" target="_blank" rel="noopener noreferrer">
                                <Image
                                src={icons.Discord}
                                alt="Discord logo"
                                height="37"
                                width="37"
                                />
                            </Link>
                        </IconButton>
                    </li>
                    <li>
                        <IconButton size="small">
                            <Link href="https://github.com/naurffxiv/naurffxiv" target="_blank" rel="noopener noreferrer">
                                <Image
                                src={icons.Github}
                                alt="GitHub Logo"
                                height="32"
                                width="32"
                                />
                            </Link>
                        </IconButton>
                    </li>
                    <li>
                        <IconButton size="small">
                            <Link href="https://patreon.com/naurffxiv" target="_blank" rel="noopener noreferrer">
                                <Image
                                src={icons.Patreon}
                                alt="Patreon Logo"
                                height="30"
                                width="30"
                                />
                            </Link>
                        </IconButton>
                    </li>
                </ul>
            </div>
        </div>
    );
}