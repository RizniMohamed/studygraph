import {
  List,
  ListItem,
  ListItemButton, ListItemIcon, ListItemText, Toolbar
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminData from "../LocalData/Drawer/DrawerData";
import { authActions } from '../Store/authSlice';
import { drawerActions } from '../Store/drawerSlice';

// custom drawer to animate open and close
const drawerWidth = 180;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    ...(open && {
      ...theme.mixins.openedMixin(theme, drawerWidth),
      '& .MuiDrawer-paper': theme.mixins.openedMixin(theme, drawerWidth),
    }),
    ...(!open && {
      ...theme.mixins.closedMixin(theme),
      '& .MuiDrawer-paper': theme.mixins.closedMixin(theme),
    }),
  }),
);

const SidePanel = () => {

  const drawerState = useSelector(state => state.leftDrawer.status)
  const dispatch = useDispatch()

  const hoverStyle = () => {
    let element = null

    if (drawerState)
      element = "MuiListItemButton"
    else
      element = "MuiSvgIcon"

    return {
      [`& .${element}-root:hover`]: {
        borderRadius: element === "MuiSvgIcon" ? 0.3 : 0.2,
        backgroundColor: "primary.main",
        // px: 1,
      },
    }
  }

 

  return (
    <Drawer
      variant="permanent"
      open={drawerState}
      sx={{ ...hoverStyle() }}>
      <Toolbar />
      <List>
        {AdminData.map(({ name, path, icon }, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Link to={path}>
              <ListItemButton
                onClick={() => {
                  if (name === "Logout") dispatch(authActions.logout())
                  dispatch(drawerActions.hide())
                }}
                sx={{
                  minHeight: 10,
                  justifyContent: drawerState ? 'initial' : 'center',
                  // marginX: 1.5,
                  paddingX: 0
                }} >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerState ? 2 : 'auto',
                    ml: 2,
                    justifyContent: 'center',
                  }} >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={name} sx={{ opacity: drawerState ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SidePanel
