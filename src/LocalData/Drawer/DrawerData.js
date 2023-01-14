import {
  Dashboard, Description, Label, ExitToApp
} from '@mui/icons-material';


const data = [
  {
    name: "Dashboard",
    path: "/Dashboard",
    icon: <Dashboard />
  },
  {
    name: "Time Sheet",
    path: "/Timesheet",
    icon: <Description />
  },
  {
    name: "Tag",
    path: "/Tag",
    icon: <Label />
  },
  {
    name: "Logout",
    path: "/",
    icon: <ExitToApp />
  },
]

export default data