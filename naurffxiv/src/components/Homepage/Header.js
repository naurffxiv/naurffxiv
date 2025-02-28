
import { Box } from '@mui/material';
import Image from 'next/image';
import TitleImage from '/public/images/title-server-header.png';

export default function Carousel({className}) {
    return (
        <Box>
          <Box className='relative h-[25em] mt-16 grid justify-center content-center' sx={{backgroundImage: 'url(/images/fru-server-header.png)', backgroundSize: "cover", backgroundAttachment: "auto", boxShadow: '0 6px 6px -1px rgb(0 0 0 / 0.3)', backgroundPosition: 'right 50% top', backgroundRepeat: 'no-repeat'}}>

              <Image src={TitleImage} style={{width: 'auto', height: 'auto', maxHeight: '10em'}} alt='banner' className="object-contain"/>

          </Box>
        </Box>
    )
}