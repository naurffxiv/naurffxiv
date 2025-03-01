import { Box, Typography } from '@mui/material';

export default function FooterLinks ({title, links, className}) {
    return (
        <Box className={`list-none ${className}`}>
            <Typography className="text-xl text-[#007EA7] font-bold">
                {title}
            </Typography>
            <ul className="columns-3xs">
                {links.map((item) => (
                    <li key={item.id} className="">
                        <a href={item.url} className="hover:underline text-nowrap xl:px-0">
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </Box>
    )
}