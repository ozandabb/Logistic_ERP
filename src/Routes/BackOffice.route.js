import backOffice_dashboard from '../Views/BackOffice/Dashboard.BackOffice';
import {SalesOrder} from '../Views/BackOffice/BackOffice Components/pages/salesorder';
import { Cheque } from '../Views/BackOffice/BackOffice Components/pages/cheque';
import LiveMap from '../Views/BackOffice/BackOffice Components/Map/LiveMap'
import Routes from '../Views/BackOffice/BackOffice Components/pages/routes'


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
  {
    path: "/backOffice/LiveMap",
    name: "LiveMap",
    component: LiveMap,
    exact: true,
  },
  {
    path: "/backOffice/routes",
    name: "Routes",
    component: Routes,
    exact: true,
  },
 
];

export default backOfficeRoutes;
