"use client";

import { MenuItem, Typography, Box } from "@mui/material";
import { ContentDropdown } from "./ContentDropdown";
import { MobileContentAccordion } from "./MobileContentAccordion";
import { ultimateList, savageList, extremeList } from "@/config/constants";

export default function SharedNavLinks({ isMobile, onClick }) {
  const navItems = [
    { type: "link", label: "Home", href: "/" },
    { type: "dropdown", label: "Ultimate", data: ultimateList },
    { type: "dropdown", label: "Savage", data: savageList },
    { type: "dropdown", label: "Extreme", data: extremeList },
    //{ type: "link", label: "", href: "", external: true }, --previously findingway.io
  ];

  return (
    <>
      {navItems.map((item, idx) => {
        if (item.type === "link") {
          return (
            <li key={idx}>
              <MenuItem
                component="a"
                href={item.href}
                onClick={onClick}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: isMobile ? "left" : "center",
                  }}
                >
                  {item.label}
                </Typography>
              </MenuItem>
            </li>
          );
        }

        if (item.type === "dropdown") {
          const DropdownComponent = isMobile
            ? MobileContentAccordion
            : ContentDropdown;

          return (
            <Box key={idx} sx={{ width: "100%" }}>
              <DropdownComponent name={item.label} data={item.data} />
            </Box>
          );
        }

        return null;
      })}
    </>
  );
}
