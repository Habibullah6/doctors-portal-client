import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import About from "../../pages/About/About";
import Appointment from "../../pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../pages/Dashboard/AllUsers/AllUsers";
import ManageDoctor from "../../pages/Dashboard/ManageDoctor/ManageDoctor";
import MyAppointment from "../../pages/Dashboard/MyAppointment/MyAppointment";
import Payment from "../../pages/Dashboard/Payment/Payment";
import Contact from "../../pages/Home/Contact/Contact";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Home/Login/Login";
import SignUp from "../../pages/Home/SignUp/SignUp";
import DisplayError from "../../pages/Shared/DisplayError/DisplayError";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
const router = createBrowserRouter([
{
    path: '/',
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signUp',
          element: <SignUp></SignUp>
        }
        ,
        {
          path: '/appointment',
          element: <PrivateRoute><Appointment></Appointment></PrivateRoute>
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/contact',
          element: <Contact></Contact>
        }
    ]
},

{
  path: '/dashboard',
  element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
  errorElement: <DisplayError></DisplayError>,
  children: [
    {
      path: '/dashboard',
      element: <MyAppointment></MyAppointment>
    },
    {
      path: '/dashboard/allUsers',
      element: <AdminRoute> <AllUsers></AllUsers> </AdminRoute>
    },
    {
      path: '/dashboard/addDoctor',
      element: <AdminRoute> <AddDoctor></AddDoctor> </AdminRoute>
    },
    {
      path: '/dashboard/manageDoctor',
      element: <AdminRoute><ManageDoctor></ManageDoctor></AdminRoute>
    },
    {
      path: '/dashboard/payment/:id',
      element: <AdminRoute> <Payment></Payment> </AdminRoute>,
      loader: ({params}) => fetch(`http://localhost:5000/booking/${params.id}`)
      
    }
  ]
}


])

export default router;