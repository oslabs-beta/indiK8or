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
  podClicked: boolean;
};

export type SidebarProps = {
  userId: string,
  darkMode: boolean,
  handleDashboard: () => void;
  handlePod: () => void;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  dashboardClicked: boolean;
  podClicked: boolean;
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

export type OAuthUser = {
  _id: string;
  username: string;
  createdAt: string;
  __v: number;
}

export type Pod = {
  [key: string]: string;
  NAME: string;
  READY: string;
  STATUS: string;
  RESTARTS:string;
  AGE: string;
  IP: string;
  NODE: string;
  NOMINATED NODE: string;
  READINESS GATES: string;
}