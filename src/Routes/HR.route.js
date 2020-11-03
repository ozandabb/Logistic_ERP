import HD_dashboard from '../Views/HR Ececutive/Dashboard.HR';
import Customers from '../Views/HR Ececutive/Customers';
import basic from '../Views/HR Ececutive/HR Components/basicInfor';

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
    path: "/hr/basic",
    name: "basic",
    component: basic,
    exact: true,
  },
];

export default HRRoutes;
