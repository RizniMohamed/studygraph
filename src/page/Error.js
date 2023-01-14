import { Box, Typography } from '@mui/material'
import React from 'react'

const Error = () => {
    return (
        <>
            <Box textAlign="center" color="red" display="flex" alignItems="center" justifyContent="center" height="100vh" flexDirection="column">
                <Typography fontWeight={900} fontSize={42}>Sorry :(</Typography>
                <Typography fontWeight={900} fontSize={30}>Currently Web View Not Supported</Typography>
            </Box>
        </>
    )
}

export default Error