// import { experimental_sx as sx } from "@mui/material"


export const MuiDrawer = {
    "styleOverrides": {
        root: {
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            '& .MuiDrawer-paper': {
                backgroundColor: "#525151"
            },
            '& .MuiTypography-root': {
                color: "white",
                textDecoration: "none"
            },
            '& a': {
                textDecoration: "none",
                color: "#525151"
            },
            '& .MuiListItemButton-root': {
                mx: 0,
                px: 1,
                transition: "background 0.3s, color 0.3s",
            },
            '& .MuiListItemButton-root:hover .MuiSvgIcon-root': {
                backgroundColor: "#FF8B03",
                px: 1,
                // color: "white"
            },
            '& .MuiSvgIcon-root': {
                transition: "background 0.3s, color 0.3s",
                boxSizing: "unset",
                backgroundColor: "#525151",
                p: 1,
                borderRadius: 0.3,
                color: "#FF8B03"

            }
        }
    }
}