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

// TODO: instead of repeating dashboardClicked and podClicked you can write
/* 
export type SidebarProps = DashProps & { 
  userId: string,
  darkMode: boolean,
  handleDashboard: () => void;
  handlePod: () => void;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>; 
}
*/

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

// TODO: for PodRow you can write
/* 
export type PodRow = Omit<Pod, 'IMAGES'> & {
  [key: string]: string; // btw, if you are using generic type like this, not sure if the rest of the types still regester
  NOMINATED: string;
  READINESS: string;
}
*/
export type PodRow = {
  [key: string]: string;
  NAME: string;
  READY: string;
  STATUS: string;
  RESTARTS:string;
  AGE: string;
  IP: string;
  NODE: string;
  NOMINATED: string;
  READINESS: string;
}

export type Pod = {
  NAME: string;
  READY: string;
  STATUS: string;
  RESTARTS: string;
  AGE: string;
  IP: string;
  NODE: string;
  IMAGES: string[];
}

export type Match = {
  vulnerability: {
    id: string;
    description: string;
    severity: string;
  };
}
export type ScanProps = {
  scannedImage: {
    matches: Match[]
  }
}

