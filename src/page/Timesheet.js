import { Add, Delete } from "@mui/icons-material";
import { Fab, IconButton, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createTS, deleteTS, getTS, updateTS } from "../services/timesheet";
import { dialogActions } from "../Store/dialogSlice";
import { forceRefreshActions } from "../Store/forceRefreshSlice";
import { messageActions } from "../Store/messageSlice";

const Timesheet = () => {

  const [list, setList] = useState(undefined)
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const forceRefresh = useSelector(state => state.forceRefresh)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getTS(`userID=${auth.userID}`)
      if (response.status === 200) setList(response.data.timesheet)
      setLoading(false);
    })()
  }, [forceRefresh.timesheet,auth.userID])

  const onDelete = (id) => {
    dispatch(
      dialogActions.show([
        "delete",
        async () => {
          const response = await deleteTS(id)
          if (response.status === 200) {
            dispatch(forceRefreshActions.refresh("timesheet"))
            dispatch(messageActions.show(['Timesheet deleted successfully', 'success']))
          }
          if (response.status !== 200) dispatch(messageActions.show([response.data, 'error']))
        },
        "Are you sure do you going to remove this timesheet?",
      ])
    )
  }

  const onAddClick = () => {
    dispatch(
      dialogActions.show(["timesheet", async (ts) => {

        if (parseInt(ts.start_time.split(':')[0]) >= parseInt(ts.end_time.split(':')[0])) {
          dispatch(messageActions.show(['Invalid time', 'error']))
          return
        }

        const response = await createTS({
          date: ts.date,
          start_time: ts.start_time,
          end_time: ts.end_time,
          tagID: ts.tag,
          userID: auth.userID
        })
        if (response.status === 201) {
          dispatch(forceRefreshActions.refresh("timesheet"))
          dispatch(messageActions.show(['Time sheet created successfully', 'success']))
        }
        if (response.status !== 201) dispatch(messageActions.show([response.data, 'error']))
        dispatch(dialogActions.hide("timesheet"))
      }])
    )
  }

  const onUpdateClick = async ({ ts, tag }) => {
    dispatch(
      dialogActions.show(["timesheet", async (data) => {
        console.log({
          id: ts._id,
          date: new Date(data.date),
          start_time: data.start_time,
          end_time: data.end_time,
          tagID: data.tag,
        });
        const response = await updateTS({
          id: ts._id,
          date: new Date(data.date),
          start_time: data.start_time,
          end_time: data.end_time,
          tagID: data.tag,
        })
        console.log(response);
        if (response.status === 200) {
          dispatch(forceRefreshActions.refresh("timesheet"))
          dispatch(messageActions.show(['Timesheet updated successfully', 'success']))
        } else dispatch(messageActions.show([response.data, 'error']))
        dispatch(dialogActions.hide("timesheet"))
      }, { ts, tag }])
    )
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
        <Typography fontWeight={700} fontSize={28} >
          Loading...
        </Typography>
      </Box>
    )
  }

  if (!loading && !list) {
    return <>
      <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
        <Typography fontWeight={700} fontSize={28} >
          No tags created yet...
        </Typography>
      </Box>
      <Fab
        onClick={onAddClick}
        sx={style_btnAdd} >
        <Add />
      </Fab>
    </>
  }

  return (
    <Box>
      <List dense={false} sx={{ ...stlye_list, mb: 9 }} >
        {list && list.map((ts, id) => {
          return <ListItem
            key={id}
            sx={{ ...style_listItem, display: "flex", flexDirection: "column" }}
          >
            <Typography fontWeight={700} fontSize={18} sx={{ textAlign: "start", width: "100%" }} >
              {Object.keys(ts)[0]}
            </Typography>

            <List dense={false} sx={{ ...stlye_list, py: 0 }} >
              {ts[Object.keys(ts)[0]].map((ts, id) => {
                return <ListItem key={id} sx={style_listItem}>

                  <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="column" width="calc(100vw - 50px)" >

                      <Typography fontWeight={700} fontSize={18} >
                        {Object.keys(ts)}
                      </Typography>

                      <List dense={false} sx={{ ...stlye_list, py: 0, pl: 1 }} >
                        {ts[Object.keys(ts)[0]].map((ts, id) => {
                          return <ListItem key={id} sx={style_listItem} >
                            <Box display="flex" flexDirection="column">
                              <Box display="flex" justifyContent="space-between" width="calc(100vw - 50px)" alignItems="center">
                                <Box onClick={() => onUpdateClick(ts)} width="100%">
                                  <Typography fontWeight={700} fontSize={18} >
                                    {ts.start_time} - {ts.end_time} ({ts.deff_time})
                                  </Typography>
                                </Box>
                                <IconButton edge="end" onClick={() => onDelete(ts.id)} sx={{ p: 0, }}>
                                  <Delete />
                                </IconButton>
                              </Box>
                            </Box>
                          </ListItem>
                        })}
                      </List>

                    </Box>
                  </Box>
                </ListItem>
              })}
            </List>
          </ListItem>
        })}

      </List>

      <Fab
        onClick={onAddClick}
        sx={style_btnAdd} >
        <Add />
      </Fab>
    </Box>
  );
}

export default Timesheet;

const stlye_list = { display: "flex", flexDirection: "column", alignItems: "center", }
const style_listItem = { bgcolor: "#DADADA", borderRadius: 0.2, width: "calc(100vw - 10px)", my: 0 }
const style_btnAdd = {
  bgcolor: "background.mainbg",
  color: "white",
  position: "fixed",
  bottom: 16,
  right: 16
}