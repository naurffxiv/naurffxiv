import { Box, Typography } from '@mui/material';

export default function FooterLinks ({title, links, className}) {
    return (
        <Box className={`list-none ${className}`}>
            <Typography className="text-xl text-[#007EA7] font-bold">
                {title}
            </Typography>
            <ul>
                {links.map((item) => (
                    <li key={item.id} className="inline-block xl:block">
                        <a href={item.url} className="hover:underline text-nowrap pr-6 xl:px-0">
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </Box>
    )
}