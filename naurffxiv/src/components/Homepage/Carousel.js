import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slides = [
    { id: 1, src: '/images/Ultima.png', alt: 'Ultima' },
    { id: 2, src: '/images/Bahamut.png', alt: 'Bahamut' },
    { id: 3, src: '/images/Alexander.png', alt: 'Alexander' },
    { id: 4, src: '/images/Thordan.png', alt: 'Thordan' },
    { id: 5, src: '/images/Omega.png', alt: 'Omega' },
    { id: 6, src: '/images/Pandora.png', alt: 'Pandora' },
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

    const handleActive = (pageNumber) => {
        setActiveSlide(pageNumber)
        const pageButton = document.GetElementByName(`carousel-${pageNumber}`)
        pageButton.focus();
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
                    display: {sm: 'none', lg: 'block'},
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
                    backgroundColor: 'rgba(255, 255, 255, 0.63)',
                    }}
                />
                </Box>

                {/* right arrow */}
                <Button
                color='inherit'
                onClick={handleNext}
                sx={{
                    zIndex: 1,
                    padding: '2em',
                    borderRadius: '3em',
                    display: {sm: 'none', lg: 'block'},
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
                columnGap: {sm:'0.5em', lg:'0.25em'},
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