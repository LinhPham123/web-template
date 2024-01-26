import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./app-routes.tsx";
import { BrowserRouter } from "react-router-dom";
import {
  createTheme,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";

import "@mantine/core/styles.css";

const rootElement = document.getElementById("root");

/* eslint-disable */
const theme = createTheme({
  primaryColor: "pinkNPurpleGradient",
  colors: {
    pinkNPurpleGradient: [
      "#feeefe",
      "#f3dcf3",
      "#e3b8e2",
      "#d291d1",
      "#c470c3",
      "#bc5bba",
      "#b850b6",
      "#a241a0",
      "#91398f",
      "#7f2e7e",
    ],
  },
} as MantineThemeOverride);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <React.Suspense>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MantineProvider>
    </React.Suspense>
  </React.StrictMode>,
);
