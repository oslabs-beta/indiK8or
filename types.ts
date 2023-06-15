export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

export type DashProps = {
  dashboardClicked: boolean;
};

export type SidebarProps = {
  userId: string,
  darkMode: boolean,
  handleDashboard: () => void;
  setDarkMode: Function;
}




