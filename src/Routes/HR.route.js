import HD_dashboard from '../Views/HR Ececutive/Dashboard.HR';
import Customers from '../Views/HR Ececutive/Customers';
import Supplier from '../Views/HR Ececutive/Supplier';
import Employee from '../Views/HR Ececutive/Employee';

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
];

export default HRRoutes;
