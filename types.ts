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

export type SidebarProps = DashProps & {
  darkMode: boolean,
  handleDashboard: () => void;
  handlePod: () => void;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
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
    dataSource: string;
  };
}
export type ScanProps = {
  scannedImage: {
    matches: Match[]
  }
}

export type VulnerabilityProps = {
  id: string;
  description: string;
  severity: string;
  dataSource: string;
}

export type Matches = {
  vulnerability: VulnerabilityProps;
  relatedVulnerabilities: object[];
  matchDetails: string[];
  artifact: object;
}

export type Source = {
  type: string;
  target: {
    userInput: string;
    imageID: string;
    manifestDigest: string;
    mediaType: string;
    tags: string[];
    imageSize: number;
    layers: string[];
    manifest: string;
    config: string;
  };
}

export type JSONresult = {
  matches: Matches[];
  source: Source;
}