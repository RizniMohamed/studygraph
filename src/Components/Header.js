import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawerActions } from '../Store/drawerSlice';

const Header = () => {

  const drawerState = useSelector(state => state.leftDrawer.status)
  const dispatch = useDispatch()


  const handleDrawerState = () => drawerState ? dispatch(drawerActions.hide()) : dispatch(drawerActions.show())

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "background.mainbg" }}>
        <Toolbar>
          {<IconButton
            onClick={handleDrawerState}
            edge="start"
            sx={{
              color: drawerState? "primary.main" : "white",
            }}
          >
            <MenuIcon />
          </IconButton>}

          <Box mx={2} display="flex" alignItems="center" flexGrow={1}>
            {/* <Logo /> */}
            <Typography fontSize={20} color="white" fontFamily="serif" fontWeight={600}>Study Graph</Typography>
          </Box>

        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header