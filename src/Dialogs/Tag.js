import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { dialogActions } from '../Store/dialogSlice';

const Schema = yup.object().shape({
  name: yup.string().required("Required*"),
  color: yup.string().required("Required*"),
})

const Tag = () => {
  const { status, onSubmit, data } = useSelector(state => state.dialog.tag)
  const dispatch = useDispatch()

  const initVals = {
    name: data?.name,
    color: data?.color,
  }

  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  const renderData = [
    {
      type: "text",
      placeholder: 'Tag',
      defaultValue: data && data.name,
      name: "name"
    },
    {
      type: "color",
      placeholder: 'Color',
      defaultValue: data && data.color,
      name: "color"
    },
  ]

  useEffect(() => {
    if (data) {
      formik.values.name = data.name
      formik.values.color = data.color
    }
  }, [data])

  return (
    <Dialog open={status} onClose={() => {formik.resetForm()  }} >

      <form onSubmit={formik.handleSubmit}>

        <DialogContent sx={{ display: "flex", flexDirection: "column", minWidth: "80vw" }}>
          {renderData.map((item, id) => {
            return (
              <Box key={id} mb={1.5} width={"100%"} display="flex" alignItems="center">
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

          <DialogActions sx={style_dialogActions} >
            <Button
              variant='contained'
              size='small'
              onClick={() => { dispatch(dialogActions.hide("tag")) }}
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
              {data ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog >
  )
}

export default Tag

const style_dialogActions = { display: "flex", justifyContent: "end", m: 0, p: 0, pt: 2 }
const style_btn = { width: 100, color: "white", bgcolor: "secondary.main" }
const style_textfield = { width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.2 } }