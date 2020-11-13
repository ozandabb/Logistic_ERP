import backOffice_dashboard from '../Views/BackOffice/Dashboard.BackOffice';
import {SalesOrder} from '../Views/BackOffice/BackOffice Components/pages/salesorder';
import { Cheque } from '../Views/BackOffice/BackOffice Components/pages/cheque';


let backOfficeRoutes = [

  {
    path: "/backOffice/dashboard",
    name: "backOffice_dashboard",
    component: backOffice_dashboard,
    exact: true,
  },
  {
    path: "/backOffice/salesOrder",
    name: "backOffice_salesOrder",
    component: SalesOrder,
    exact: true,
  },
  {
    path: "/backOffice/cheque",
    name: "backOffice_Cheque",
    component: Cheque,
    exact: true,
  },
 
];

export default backOfficeRoutes;
