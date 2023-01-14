import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import Error from './Error';
import { Outlet } from 'react-router-dom'

const Mobile = () => {
    const theme = useTheme()
    const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return onlySmallScreen ? <>
        <Outlet />
    </> : <Error />
}

export default Mobile