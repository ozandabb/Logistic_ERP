import AccountantDashboard from '../Views/Accountant/Dashboard.Accountant';
import BankAccount from "../Views/Accountant/BankAccount";

let AccountantRoutes = [

  {
    path: "/Accountant/dashboard",
    name: "AccountantDashboard",
    component: AccountantDashboard,
    exact: true,
  },
  {
    path: "/Accountant/BankAccount",
    name: "BankAccount",
    component: BankAccount,
    exact: true,
  },
];

export default AccountantRoutes;
