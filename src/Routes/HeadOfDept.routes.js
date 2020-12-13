import HeadDeptDashboard from '../Views/Head Department/Dashboard.head';
import Requests from '../Views/Head Department/Components/Requests';
import all_employees from '../Views/Head Department/Components/AllEmployees';

let HeadOfDeptRoutes = [

      {
        path: "/HeadOfDept/dashboard",
        name: "HeadDeptDashboard",
        component: HeadDeptDashboard,
        exact: true,
      },
      {
        path: "/HeadOfDept/requests",
        name: "Requests",
        component: Requests,
        exact: true,
      },
      {
        path: "/HeadOfDept/all_employees",
        name: "all_employees",
        component: all_employees,
        exact: true,
      },
    
    ];
    
    export default HeadOfDeptRoutes;
    