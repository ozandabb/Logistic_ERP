import AdminDashboard from '../Views/Admin/Dashboard.Admin';
import Users from '../Views/Admin/Users';

let AdminRoutes = [

      {
        path: "/AdminTeam/dashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
        exact: true,
      },
      {
        path: "/AdminTeam/Users",
        name: "Users",
        component: Users,
        exact: true,
      },
    
    ];
    
    export default AdminRoutes;
    