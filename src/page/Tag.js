import { Add, Delete, Label } from "@mui/icons-material";
import { Avatar, Fab, IconButton, List, ListItem, ListItemAvatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createTag, deleteTags, getAllTags, updateTag } from "../services/tag";
import { dialogActions } from "../Store/dialogSlice";
import { forceRefreshActions } from "../Store/forceRefreshSlice";
import { messageActions } from "../Store/messageSlice";

const Tag = () => {
  const auth = useSelector(state => state.auth)
  const forceRefresh = useSelector(state => state.forceRefresh)
  const [list, setList] = useState(null)
  const dispatch = useDispatch()

  const onDelete = (tag) => {
    dispatch(
      dialogActions.show([
        "delete",
        async () => {
          const response = await deleteTags(tag._id)
          if (response.status === 200) {
            dispatch(forceRefreshActions.refresh("tag"))
            dispatch(messageActions.show(['Tag deleted successfully', 'success']))
          }
          if (response.status !== 200) dispatch(messageActions.show([response.data, 'error']))
        },
        "Are you sure do you going to remove this tag?",
      ])
    )
  }

  const onAddClick = () => {
    dispatch(
      dialogActions.show(["tag", async (tag) => {
        const response = await createTag({
          name: tag.name.replace(/\s+/g, ''),
          color: tag.color,
          userID: auth.userID
        })
        if (response.status === 201) {
          dispatch(forceRefreshActions.refresh("tag"))
          dispatch(messageActions.show(['Tag created successfully', 'success']))
        }
        if (response.status !== 201) dispatch(messageActions.show([response.data, 'error']))
        dispatch(dialogActions.hide("tag"))
      }])
    )
  }

  const onUpdateClick = async ({ name, color, _id }) => {

    dispatch(
      dialogActions.show(["tag", async (tag) => {
        console.log(tag);
        const response = await updateTag({
          name: tag.name,
          color: tag.color,
          id: _id
        })
        console.log(response);
        if (response.status === 200) {
          dispatch(forceRefreshActions.refresh("tag"))
          dispatch(messageActions.show(['Tag updated successfully', 'success']))
        } else dispatch(messageActions.show([response.data, 'error']))
        dispatch(dialogActions.hide("tag"))
      }, { name, color }])
    )
  }

  useEffect(() => {
    (async () => {
      const response = await getAllTags()
      if (response.status === 200) setList(response.data.tag)
    })()
  }, [forceRefresh.tag])

  if (!list) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
        <Typography fontWeight={700} fontSize={28} >
          Loading...
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <List dense={false} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
        {list && list.map((item, id) => {
          return <ListItem
            key={id}
            sx={{ bgcolor: "#DADADA", borderRadius: 0.2, mb: 0.5, width: "calc(100vw - 10px)" }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" >
              <Box display="flex" alignItems="center" flexGrow={1} onClick={() => onUpdateClick(item)} >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "background.mainbg" }}>
                    <Label sx={{ color: item.color }} />
                  </Avatar>
                </ListItemAvatar>
                <Typography fontWeight={700} fontSize={18} >
                  {item.name}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" >
                <IconButton onClick={() => onDelete(item)} >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          </ListItem>
        })}

      </List>

      <Fab
        onClick={onAddClick}
        sx={{
          bgcolor: "background.mainbg",
          color: "white",
          position: "fixed",
          bottom: 16,
          right: 16
        }} >
        <Add />
      </Fab>

    </Box>
  );
}

export default Tag;
