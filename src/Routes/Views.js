import { Route, Routes } from "react-router-dom"

import Tag from "../page/Tag";
import NotFound from "../page/NotFound";
import Dashboard from '../page/Dashbaord';
import Timesheet from '../page/Timesheet';
import Login from '../page/Login';
import Mobile from '../page/Mobile';
import { Navigate } from 'react-router-dom'
import Header from "../Components/Header";
import SidePanel from "../Components/SidePanel";
import { Toolbar } from "@mui/material";
import { useSelector } from "react-redux";

function Protected({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Header />
      <SidePanel />
      <Toolbar />
      {children}
    </>
  )
}


function Views() {
  const authSate = useSelector(state => state.auth.status)


  return (
    <Routes>
      <Route path="" element={<Mobile />} >
        <Route index element={<Login />} />
        <Route path="Dashboard" element={<Protected isSignedIn={authSate}> <Dashboard />  </Protected>} />
        <Route path="Tag" element={<Protected isSignedIn={authSate}> <Tag />  </Protected>} />
        <Route path="Timesheet" element={<Protected isSignedIn={authSate}> <Timesheet />  </Protected>} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default Views