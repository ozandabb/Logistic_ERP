import HD_dashboard from '../Views/HR Ececutive/Dashboard.HR';
import Customers from '../Views/HR Ececutive/Customers';

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
];

export default HRRoutes;
