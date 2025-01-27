'use client';
import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeContextProvider');
  }
  return context;
}

export function ThemeContextProvider({ children }) {
	const [isDarkMode, setIsDarkMode] = useState(true);
	const theme = isDarkMode ? darkTheme : lightTheme;
  
	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};
  
	return (
	  <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
		<ThemeProvider theme={theme}>
		  {children}
		</ThemeProvider>
	  </ThemeContext.Provider>
	);
  }