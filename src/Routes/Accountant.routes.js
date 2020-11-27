import AccountantDashboard from '../Views/Accountant/Dashboard.Accountant';
import BankAccount from "../Views/Accountant/BankAccount";
import ExchangeRates from "../Views/Accountant/ExchangeRates";
import AccountingPeriod from "../Views/Accountant/AccountingPeriod";


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
  {
    path: "/Accountant/AccoutingPeriods",
    name: "AccoutingPeriods",
    component: AccountingPeriod,
    exact: true,
  },
];

export default AccountantRoutes;
