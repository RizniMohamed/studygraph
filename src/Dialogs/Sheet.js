import { Autocomplete, Button, Dialog, DialogActions, DialogContent, MenuItem, OutlinedInput, Paper, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { getTags } from '../services/tag';
import { dialogActions } from '../Store/dialogSlice';

const initVals = {
  date: "",
  tag: "",
  start_time: "",
  end_time: "",
}

const Schema = yup.object().shape({
  date: yup.string().required("Required*"),
  tag: yup.mixed().required("Required*"),
  start_time: yup.string().required("Required*"),
  end_time: yup.string().required("Required*"),
})

const Sheet = () => {
  const { status, onSubmit, data } = useSelector(state => state.dialog.timesheet)
  const dispatch = useDispatch()
  const [tags, setTags] = useState(undefined)
  const auth = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  const renderData = [
    {
      type: "date",
      placeholder: 'Date',
      defaultValue: data && data.ts.date.split('T')[0],
      name: "date"
    },
    {
      type: "time",
      placeholder: 'Start Time',
      defaultValue: data && data.ts.start_time,
      name: "start_time"
    },
    {
      type: "time",
      placeholder: 'End Time',
      defaultValue: data && data.ts.end_time,
      name: "end_time"
    },
  ]

  
  const tagList = {
    name: "tag",
    placeholder: "Select",
    defaultValue: data && data.tag ,
    list: tags
  }

  useEffect(() => {
    (async () => { setTags((await getTags(`userID=${auth.userID}`)).data.tag) })()
    if (data) {
      formik.values.date = data.ts.date
      formik.values.start_time = data.ts.start_time
      formik.values.end_time = data.ts.end_time
      formik.values.tag = data.tag._id
    }
  }, [data])

  return (
    <Dialog open={status} onClose={() => { }} >

      <form onSubmit={formik.handleSubmit}>

        <DialogContent sx={{ display: "flex", flexDirection: "column", minWidth: "80vw" }}>
          {renderData.map((item, id) => {
            return (
              <Box key={id} mb={1.5} width={"100%"} alignItems="center">
                {item.placeholder}
                <TextField
                  variant="outlined"
                  size='small'
                  type={item.type}
                  placeholder={item.placeholder}
                  defaultValue={item.defaultValue}
                  name={item.name}
                  sx={style_textfield}
                  onChange={formik.handleChange}
                  error={formik.touched[item.name] && Boolean(formik.errors[item.name])}
                  onBlur={formik.handleBlur}
                />
              </Box>
            )
          })}

          {tagList.list &&
            <Box mb={1.5} width={"100%"} alignItems="center">
              {"Tag"}
              <Autocomplete
                size='small'
                options={tagList.list}
                defaultValue={tagList.defaultValue}
                onChange={(e, value) => { formik.values.tag = value._id }}
                getOptionLabel={option => option.name}
                PaperComponent={params => <Paper {...params} sx={{ ...paperStyle }} />}
                sx={style_textfield}
                renderInput={(params) => (
                  < TextField
                    {...params}
                    name={tagList.name}
                    placeholder={tagList.placeholder}
                    error={formik.touched.tag && Boolean(formik.errors.tag)}
                    onBlur={formik.handleBlur}
                    inputProps={{ ...params.inputProps, readOnly: true }}
                    sx={{ minWidth: 200, }}
                  />
                )}
              />
            </Box>
          }

          <DialogActions sx={style_dialogActions} >
            <Button
              variant='contained'
              size='small'
              onClick={() => { formik.resetForm(); dispatch(dialogActions.hide("timesheet")) }}
              sx={style_btn}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              size='small'
              type='submit'
              sx={style_btn}
            >
              { data ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog >
  )
}

export default Sheet

const paperStyle = {
  bgcolor: "background.mainbg",
  borderRadius: 0.3,
  mt: 0.5,
  "li": {
    color: "white",
    px: 2
  },
}

const style_dialogActions = { display: "flex", justifyContent: "end", m: 0, p: 0, pt: 2 }
const style_btn = { width: 100, color: "white", bgcolor: "secondary.main" }
const style_textfield = { width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.2 } }