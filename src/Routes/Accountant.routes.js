import AccountantDashboard from '../Views/Accountant/Dashboard.Accountant';
import BankAccount from "../Views/Accountant/BankAccount";
import ExchangeRates from "../Views/Accountant/ExchangeRates";

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
  {
    path: "/Accountant/ExchangeRates",
    name: "ExchangeRates",
    component: ExchangeRates,
    exact: true,
  },
];

export default AccountantRoutes;
