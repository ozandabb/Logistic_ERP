import Account_Executive_Dashboard from '../Views/Accounts Executives/Dashboard.Acc.Exe';
import Payment from '../Views/Accounts Executives/Payments';
import Accounts from '../Views/Accounts Executives/Accounts';

let AccountsExecutivesRoutes = [

  {
    path: "/AccountsExecutives/dashboard",
    name: "Account_Executive_Dashboard",
    component: Account_Executive_Dashboard,
    exact: true,
  },
  {
    path: "/AccountsExecutives/payments",
    name: "Payment",
    component: Payment,
    exact: true,
  },
  {
    path: "/AccountsExecutives/accounts",
    name: "Accounts",
    component: Accounts,
    exact: true,
  },
];

export default AccountsExecutivesRoutes;
