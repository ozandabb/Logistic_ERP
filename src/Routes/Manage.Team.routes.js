import AssignGift from '../Views/Management/Assign GIft/AssignGift';
import ManagementTeamDashboard from '../Views/Management/Dashboard.manage';
import SalesOrder from '../Views/Management/Sales Order/SalesOrder';

let ManagementTeamRoutes = [

  {
    path: "/ManagementTeam/dashboard",
    name: "ManagementTeamDashboard",
    component: ManagementTeamDashboard,
    exact: true,
  },

  {
    path: "/ManagementTeam/salesorder",
    name: "SalesOrder",
    component: SalesOrder,
    exact: true,
  },

  {
    path: "/ManagementTeam/assigngift",
    name: "AssignGift",
    component: AssignGift,
    exact: true,
  },

];

export default ManagementTeamRoutes;
