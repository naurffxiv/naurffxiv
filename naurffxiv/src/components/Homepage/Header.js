
import { Box } from '@mui/material';
import Image from 'next/image';

export default function Carousel({className}) {
    return (
        <Box>
            <Box sx={{
                width: 'auto',
                height: '500px',
                overflow: 'hidden',
                position: 'relative'
                }}
                className={{className}}
                >
                <Image fill src='/images/fru-server-header.png' alt='banner' />
            </Box>
        </Box>
    )
}