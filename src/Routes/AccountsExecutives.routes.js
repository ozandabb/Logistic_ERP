import Account_Executive_Dashboard from '../Views/Accounts Executives/Dashboard.Acc.Exe';
import Payment from '../Views/Accounts Executives/Payments';

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
];

export default AccountsExecutivesRoutes;
