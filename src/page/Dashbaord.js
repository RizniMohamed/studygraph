
import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { messageActions } from '../Store/messageSlice';
import { getLineChart } from '../services/dashboard';

const initVals = {
  start_date: "",
  end_date: "",
}

const Schema = yup.object().shape({
  start_date: yup.string().required("Required*"),
  end_date: yup.string().required("Required*"),
})


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },

  },
};

const Dashboard = () => {
  const dispatch = useDispatch()

  const [data, setData] = useState(undefined)

  console.log(data);

  const onSubmit = async ({ start_date, end_date }) => {
    let start_date_days = new Date(start_date).getDate()
    let end_date_days = new Date(end_date).getDate()

    if (start_date_days < end_date_days) {
      const res = await getLineChart({ start_date, end_date })
      if (res.status === 200) setData(res.data)
    } else dispatch(messageActions.show(["Invalid dates", "error"]))

  }


  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })

  return (
    <Box mt={5} >
      <form onSubmit={formik.handleSubmit}>

        <Box sx={{ display: "flex", alignItems: "center" }} >
          <Box width={130} display="flex" alignItems="center" ml={1}>
            <TextField
              variant="outlined"
              size='small'
              type="date"
              placeholder='start_date'
              name='start_date'
              sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.2 } }}
              onChange={formik.handleChange}
              error={formik.touched.start_date && Boolean(formik.errors.start_date)}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Typography fontSize={20} fontWeight={700} sx={{ mx: 1 }}> To </Typography>
          <Box width={130}  >
            <TextField
              variant="outlined"
              size='small'
              type="date"
              placeholder='end_date'
              name='end_date'
              sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.2 } }}
              onChange={formik.handleChange}
              error={formik.touched.end_date && Boolean(formik.errors.end_date)}
              onBlur={formik.handleBlur}
            />
          </Box>

          <Button
            variant='contained'
            size='small'
            type='submit'
            sx={{ width: 100, color: "white", bgcolor: "secondary.main", p: 0, mx: 1 }}
          >
            Go
          </Button>
        </Box>
      </form>
      <br />

      {data && <Line options={options} data={data} redraw={true} />}
    </Box >
  );
}

export default Dashboard;

