import PayrollDashboard from '../Views/Payroll Officer/Dashboard.payroll';
import earning from '../Views/Payroll Officer/Components/Earn';
import deduction from '../Views/Payroll Officer/Components/Deduction';
import payroll from '../Views/Payroll Officer/Components/payroll';

let PayrollOficerRoutes = [

      {
        path: "/PayrollOfficer/dashboard",
        name: "PayrollDashboard",
        component: PayrollDashboard,
        exact: true,
      },
      {
        path: "/PayrollOfficer/earning",
        name: "earning",
        component: earning,
        exact: true,
      },
      {
        path: "/PayrollOfficer/deduction",
        name: "deduction",
        component: deduction,
        exact: true,
      },
      {
        path: "/PayrollOfficer/payroll",
        name: "payroll",
        component: payroll,
        exact: true,
      },
    
    ];
    
    export default PayrollOficerRoutes;
    