// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#e3f6fc",
      100: "#cddce3",
      200: "#b3c4cb",
      300: "#96abb4",
      400: "#7b939e",
      500: "#617984",
      600: "#4b5e68",
      700: "#33434b",
      800: "#1b292f",
      900: "#010e18",
    },
    red: {
      50: "#ffe2eb",
      100: "#ffb1c2",
      200: "#ff7f99",
      300: "#ff4d71",
      400: "#fe1d48",
      500: "#e50630",
      600: "#b30024",
      700: "#81001a",
      800: "#4f000f",
      900: "#200004",
    },
    green: {
      50: "#e7f9ee",
      100: "#cae4d8",
      200: "#add1c0",
      300: "#8dbfa7",
      400: "#6eac8e",
      500: "#559375",
      600: "#40725b",
      700: "#2d5141",
      800: "#183226",
      900: "#00130a",
    },
    honeydew: {
      50: "#e7faef",
      100: "#c7ead6",
      200: "#a5dcbb",
      300: "#80cea1",
      400: "#5ec086",
      500: "#46a76d",
      600: "#368255",
      700: "#255d3c",
      800: "#153823",
      900: "#011409",
    },
    black: {
      50: "#f0f0fa",
      100: "#d2d3e0",
      200: "#b4b5c9",
      300: "#9798b2",
      400: "#797a9c",
      500: "#5f6183",
      600: "#4a4b66",
      700: "#353649",
      800: "#1f202d",
      900: "#080b14",
    },
    white: "#F0F9F4",
  },
});

export default theme;
