import AssignGift from '../Views/Management/Assign GIft/AssignGift';
import ManagementTeamDashboard from '../Views/Management/Dashboard.manage';
import SalesOrder from '../Views/Management/Sales Order/SalesOrder';
import PaymentMismatch from '../Views/Management/Payment Mismatch/AllPaymentMismatch';
import SinglePaymentMismatch from '../Views/Management/Payment Mismatch/singlePaymentMismatch';

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

  {
    path: "/ManagementTeam/PaymentMismatch",
    name: "PaymentMismatch",
    component: PaymentMismatch,
    exact: true,
  },

  {
    path: "/ManagementTeam/SinglePaymentMismatch/:id",
    name: "SinglePaymentMismatch",
    component: SinglePaymentMismatch,
    exact: true,
  },

];

export default ManagementTeamRoutes;
