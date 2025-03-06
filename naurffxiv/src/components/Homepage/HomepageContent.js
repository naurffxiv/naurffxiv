import { Box, Typography} from '@mui/material';
import { getIcons } from '@/app/constants.js'
import { useThemeMode } from '@/app/themeContext';
import Image from 'next/image';

export default function HomepageContent() {
    const { isDarkMode } = useThemeMode();
    const icons = getIcons(isDarkMode);

    return (
        <Box sx={{
            maxWidth: { xs: '90%', md: '60%' },
            textAlign: 'center',
            flexWrap: 'wrap',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '2.5rem auto auto auto',
            gap: { xs: 2, md: 6 },
          }}>
            
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center',
            }}>
                <Typography color="text.primary" className="font-medium text-lg max-w-screen-xl">
                NA Ultimate Raiding (NAUR) is a Final Fantasy XIV Discord community centered around
                Ultimate Duties in North American Data Centers. Our goal is to provide a community that
                makes the experience of Ultimate Raiding the best it can be. Whether you&apos;re completely
                new or have a lot of experience in Ultimate raiding, we have something for everyone!
                </Typography>
            </Box>
  
            <Box sx={{
                width: {sm: '100%', lg:  '60%'},
                alignSelf: 'center',
                marginTop: '2em',
                }}>
                
                <Box sx={{ display: { xs: 'flex', md: 'flex' }, justifyContent: 'space-between', gap: { xs: 1, md: 3 } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Image src={icons.chat} width={70} height={70} alt="Chat icon"/>
                        <Typography color="text.primary">Active Staff</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mb: 1 }}>
                        <Image src={icons.lightbulb} width={40} height={40} alt="Bulb icon"/>
                        <Typography color="text.primary">Strats & Resources</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, mb: 1 }}>
                        <Image src={icons.contact} width={80} height={80} alt="Contact icon"/>
                        <Typography color="text.primary">Recruitment Forums</Typography>
                    </Box>
                </Box>
    
                <Box sx={{ width: '70%', display: { xs: 'flex', md: 'flex' }, justifyContent: 'space-between', margin: '0 auto' }} className="mt-20">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, mb: 1 }}>
                        <Image src={icons.discord} width={50} height={50} alt="Discord icon"/>
                        <Typography color="text.primary">Discord Bots</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mb: 1 }}>
                        <Image src={icons.calendar} width={45} height={45} alt="Calendar icon"/>
                        <Typography color="text.primary">Server Events</Typography>
                    </Box>
                </Box>
  
            </Box>
            <Typography color="text.primary" className="font-medium text-lg">
              If you are interested in Ultimate Raiding on NA Data Centers and what we have to offer, come be a part of our community!
            </Typography>
          </Box>
    )
}