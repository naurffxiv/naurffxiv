import { Box, Typography } from '@mui/material';

export default function FooterLinks ({title, links, className}) {
    return (
        <Box className={`list-none ${className}`}>
            <Typography className="text-xl text-[#007EA7] font-bold">
                {title}
            </Typography>
            <ul>
                {links.map((item) => (
                    <li>
                        <a href={item.url}>
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </Box>
    )
}