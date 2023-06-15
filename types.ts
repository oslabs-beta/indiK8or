import React from "react";
import { Theme } from '@mui/material'
import { PaletteMode } from "@mui/material";

export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

export type DashProps = {
  dashboardClicked: boolean;
};

export type PodProps = {
  podClicked: boolean;
};

export type SidebarProps = {
  userId: string,
  darkMode: boolean,
  handleDashboard: () => void;
<<<<<<< HEAD
  handlePod: () => void;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  dashboardClicked: boolean;
  podClicked: boolean;
=======
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  dashboardClicked: boolean;
>>>>>>> dev-ts
};

export type LightDarkTheme = Theme & {
  palette: {
    mode: PaletteMode;
    background: {
      default: string;
    };
    text: {
      primary: string;
    };
  };
};