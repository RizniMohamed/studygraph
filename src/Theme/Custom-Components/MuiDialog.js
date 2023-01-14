// import { experimental_sx as sx } from "@mui/material"

export const MuiDialog = {
    "styleOverrides": {
        root: {
            "& .MuiDialog-paper": {
                p: 2,
                borderRadius : 7
            },
            "& .MuiDialogActions-root": {
                "& .MuiButton-root":{
                    width: 100,
                    bgcolor: "background.mainbg",
                    color: "white",
                    "&:hover": {
                        bgcolor: "secondary.light"
                    }
                }
            }
        }
    }
}