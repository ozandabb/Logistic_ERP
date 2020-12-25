import AssignGift from '../Views/Management/Assign GIft/AssignGift';
import ManagementTeamDashboard from '../Views/Management/Dashboard.manage';
import SalesOrder from '../Views/Management/Sales Order/SalesOrder';
import PaymentMismatch from '../Views/Management/Payment Mismatch/AllPaymentMismatch';
import SinglePaymentMismatch from '../Views/Management/Payment Mismatch/singlePaymentMismatch';
import SalaryIncrement from '../Views/Management/Salary Increment/SalaryIncrement';
import SingleSalaryIncrement from '../Views/Management/Salary Increment/SingleSalaryIncrement';

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

  {
    path: "/ManagementTeam/SalaryIncrement",
    name: "SalaryIncrement",
    component: SalaryIncrement,
    exact: true,
  },
  {
    path: "/ManagementTeam/SingleSalaryIncrement/:id",
    name: "SingleSalaryIncrement",
    component: SingleSalaryIncrement,
    exact: true,
  },

];

export default ManagementTeamRoutes;
