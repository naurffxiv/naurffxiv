"use client";

import React, { useState } from 'react';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';

/**
 * Navigation component for FFXIV guides
 */
const GuidePhaseNavigation = ({
  phases = [],                             // Array of phase objects with {name, link}
  currentPath = '',                        // Current URL path
  title = "Guide Navigation",              // Menu header title 
  defaultOpen = false,                     // Initial state of menu
  gradientColors = ['#28506E', '#061A33'], // Header gradient colors
  className = "",                          // Additional custom classes
}) => {
  // Use state to handle toggle functionality
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Style objects
  const gradientStyle = {
    background: `linear-gradient(to bottom, ${gradientColors[0]}, ${gradientColors[1]})`
  };

  return (
    <div className={`w-full border-t border-gray-200 mt-8 pt-6 mb-12 ${className}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ borderColor: gradientColors[0] }}>
        {/* Clickable header to toggle menu */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 text-white font-medium"
          style={gradientStyle}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="guide-navigation-content"
        >
          <span>{title}</span>
          <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
            <KeyboardArrowDown fontSize="small" />
          </span>
        </button>

        {/* Navigation content - controlled by isOpen state */}
        {isOpen && (
          <div id="guide-navigation-content">
            <div className="p-4 md:p-0">
              {/* Single layout for all screen sizes - using the mobile design */}
              <div className="grid grid-cols-1 gap-2">
                {phases.map((phase, index) => {
                  // Extract phase number if available in the URL
                  const phaseMatch = phase.link.match(/p(\d+)$/);
                  const phaseNumber = phaseMatch ? phaseMatch[1] : index + 1;
                  
                  return (
                    <a
                      key={index}
                      href={phase.link}
                      className={`block w-full text-left p-3 rounded border border-gray-200 hover:bg-gray-100 transition-colors no-underline mb-1 ${
                        currentPath === phase.link ? 'bg-gray-200 border-gray-300' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div 
                          className="h-8 w-8 rounded-full text-white flex items-center justify-center mr-3" 
                          style={gradientStyle}
                        >
                          {phaseNumber}
                        </div>
                        <span className="font-medium text-gray-800">{phase.name}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidePhaseNavigation;