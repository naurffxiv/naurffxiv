import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import { slides } from '@/app/constants.js';

export default function Carousel() {
    const [activeSlide, setActiveSlide] = useState(0);

    const handleNext = () => {
        if (activeSlide === slides.length - 1) {
            setActiveSlide(0);
        } else {
            setActiveSlide(activeSlide + 1);
        }
    };

    const handleBack = () => {
        if (activeSlide === 0) {
            setActiveSlide(slides.length - 1);
        } else {
            setActiveSlide(activeSlide - 1);
        }
    };

    return (
        <Box>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                columnGap: '3em',
                paddingX: { md: '3em' },
                marginTop: '4rem',
            }}>
                {/* left arrow */}
                <Button
                    color='inherit'
                    onClick={handleBack}
                    sx={{
                        zIndex: 1,
                        padding: '2em',
                        borderRadius: '3em',
                        display: { xs: 'none', lg: 'block' },
                    }}
                >
                    <ArrowBackIosNewIcon sx={{ color: '#FFFFFF' }} />
                </Button>

                <Box sx={{
                    position: 'relative',
                    display: 'inline-block',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    aspectRatio: { md: '32/10' },
                    marginX: { xs: '3%', md: '0%' }
                }}>
                    <Image
                        src={slides[activeSlide].src}
                        alt={`carousel-img-${activeSlide}`}
                        width={1500}
                        height={700}
                        className='max-w-[170%] md:max-w-full h-auto'
                        priority
                    />

                    {/* gray transparent box */}
                    <Link href={`${slides[activeSlide].url}`}>
                        <Box
                            sx={{
                                top: 0,
                                right: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.67)',
                                textAlign: 'center',
                                flexWrap: 'nowrap',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#FFFFFF',
                                padding: { xs: '1em', md: '5em' },
                            }}
                            className="absolute opacity-0 hover:opacity-100 transition-opacity"
                        >
                            <Typography sx={{
                                fontWeight: 700,
                                typography: { xs: 'h5', md: 'h4', xl: 'h3' },
                            }}>
                                <span>
                                    {slides[activeSlide].title}
                                    <br />
                                    Fight Guide
                                </span>
                            </Typography>
                        </Box>
                    </Link>
                </Box>
                {/* right arrow */}
                <Button
                    color='inherit'
                    onClick={handleNext}
                    sx={{
                        zIndex: 1,
                        padding: '2em',
                        borderRadius: '3em',
                        display: { xs: 'none', lg: 'block' },
                    }}
                >
                    <ArrowForwardIosIcon sx={{ color: '#FFFFFF' }} />
                </Button>
            </Box>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                columnGap: { xs: '0.5em', lg: '0.25em' },
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
                                className={`${activeSlide === index ? 'bg-[#007EA7] hover:bg-cyan-900' : 'bg-[#D9D9D9] hover:bg-slate-500'} rounded-full px-2.5 transition-colors`}
                            > </span>
                        </button>
                    ))
                }
            </Box>
        </Box>
    );
}