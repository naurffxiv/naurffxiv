import { Box } from '@mui/material';
import Image from 'next/image';
import TitleImage from '/public/images/title-server-header.png';

export default function Header() {
    return (
        <Box>
          <Box
          sx={{
            backgroundImage: 'url(/images/ultimates/fru/FRUheader.png)',  // temporary fru header
            backgroundSize: "cover",
            backgroundAttachment: "auto",
            boxShadow: '0 6px 6px -1px rgb(0 0 0 / 0.3)',
            backgroundPosition: 'right 50% top',
            backgroundRepeat: 'no-repeat'
            }}
            className='relative h-[25em] grid justify-center content-center'
            >
              <Image src={TitleImage} style={{width: 'auto', height: 'auto', maxHeight: '10em'}} alt='banner' className="object-contain"/>
          </Box>
        </Box>
    )
}