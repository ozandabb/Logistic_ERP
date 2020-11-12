import HD_dashboard from '../Views/HR Ececutive/Dashboard.HR';
import Customers from '../Views/HR Ececutive/Customers';
import Supplier from '../Views/HR Ececutive/Supplier';
import Employee from '../Views/HR Ececutive/Employee';
import Vehicles from '../Views/HR Ececutive/Vehicle';
import Driver from '../Views/HR Ececutive/DriverProfile';

import Loans from '../Views/HR Ececutive/HR Components/Requests/LoanRequest';
import Leave from '../Views/HR Ececutive/HR Components/Requests/LeaveRequest';
import SalaryAdavanced from '../Views/HR Ececutive/HR Components/Requests/SalaryAdvancedReq';

let HRRoutes = [

  {
    path: "/hr/dashboard",
    name: "HD_dashboard",
    component: HD_dashboard,
    exact: true,
  },
  {
    path: "/hr/customers",
    name: "Customers",
    component: Customers,
    exact: true,
  },
  {
    path: "/hr/supplier",
    name: "Supplier",
    component: Supplier,
    exact: true,
  },
  {
    path: "/hr/employees",
    name: "Employee",
    component: Employee,
    exact: true,
  },
  {
    path: "/hr/vehicles",
    name: "Vehicles",
    component: Vehicles,
    exact: true,
  },
  {
    path: "/hr/driver",
    name: "Driver",
    component: Driver,
    exact: true,
  },

  //Requests
  {
    path: "/hr/Requests/Loans",
    name: "Loans",
    component: Loans,
    exact: true,
  },
  {
    path: "/hr/Requests/Leave",
    name: "Leave",
    component: Leave,
    exact: true,
  },
  {
    path: "/hr/Requests/SalaryAdavanced",
    name: "SalaryAdavanced",
    component: SalaryAdavanced,
    exact: true,
  },
];

export default HRRoutes;
