import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';

const slides = [
    { id: 1, url: '/', src: '/images/Bahamut.png', alt: 'Bahamut', title: 'The Unending Coil of Bahamut' },
    { id: 2, url: '/', src: '/images/Ultima.png', alt: 'Ultima', title: 'The Weapon\'s Refrain' },
    { id: 3, url: '/', src: '/images/Alexander.png', alt: 'Alexander', title: 'The Epic of Alexander' },
    { id: 4, url: '/', src: '/images/Thordan.png', alt: 'Thordan', title: 'Dragonsong\'s Reprise' },
    { id: 5, url: '/', src: '/images/Omega.png', alt: 'Omega', title: 'The Omega Protocol' },
    { id: 6, url: '/', src: '/images/Pandora.png', alt: 'Pandora', title: 'Futures Rewritten' },
  ];


  
export default function Carousel({className}) {
    const [activeSlide, setActiveSlide] = useState(0);

    const handleNext = () => {
        if (activeSlide === slides.length - 1) {
            setActiveSlide(0);
        } else {
            setActiveSlide(activeSlide + 1);
        }
    }

    const handleBack = () => {
        if (activeSlide === 0) {
            setActiveSlide(slides.length - 1)
        } else {
            setActiveSlide(activeSlide - 1)
        }
    }

    return (
        <Box>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                columnGap: '3em',
                paddingX: '3em',
            }}
            className={`${className}`}
            >
                {/* left arrow */}
                <Button
                color='inherit'
                onClick={handleBack}
                sx={{
                    zIndex: 1,
                    padding: '2em',
                    borderRadius: '3em',
                    display: {xs: 'none', lg: 'block'},
                }}
                >
                <ArrowBackIosNewIcon sx={{ color: (theme) => theme.palette.text.primary }}/>
                </Button>

                <Box sx={{
                    position: 'relative',
                    display: 'inline-block',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    aspectRatio: '32/10',
                    }}>
                <Image
                    src={slides[activeSlide].src}
                    alt={`carousel-img-${activeSlide}`}
                    width={1500}
                    height={700}
                    style={{
                    maxWidth: '100%',
                    height: 'auto',
                    }}
                />

                {/* gray transparent box */}
                <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '40%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.67)',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#00171F',
                    padding: '5em',
                }}>
                <Typography variant="h2" sx={{fontWeight: 700}}>
                    {slides[activeSlide].title}
                </Typography>
                
                <Link href={`${slides[activeSlide].url}`}>
                    <Button
                        color='inherit'
                        sx={{
                        backgroundColor: '#007EA7',
                        borderRadius: '10em',
                        maxWidth: 'fit-content',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        fontSize: '1.4em',
                        paddingY: '0.5em',
                        paddingX: '4em',
                        marginTop: '1em',
                        }}
                        >
                        Fight Guide
                    </Button>
                </Link>
                </Box>
                </Box>
                {/* right arrow */}
                <Button
                color='inherit'
                onClick={handleNext}
                sx={{
                    zIndex: 1,
                    padding: '2em',
                    borderRadius: '3em',
                    display: {xs: 'none', lg: 'block'},
                }}
                >
                <ArrowForwardIosIcon sx={{ color: (theme) => theme.palette.text.primary }} />
                </Button>
            </Box>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                columnGap: {xs:'0.5em', lg:'0.25em'},
                marginTop: '2em',
            }}>
                {
                slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        className="p-1 rounded-full"
                        name={`carousel-${slide.id}`}
                        onClick={() => setActiveSlide(index)}
                    >
                        <span
                        className={`${activeSlide === index ? 'bg-[#007EA7] hover:bg-cyan-900' : 'bg-slate-50 hover:bg-slate-300'} rounded-full px-2.5 transition-colors`}
                        > </span>
                    </button>
                ))
                }
            </Box>
        </Box>
    )
}