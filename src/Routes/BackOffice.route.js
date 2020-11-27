import backOffice_dashboard from '../Views/BackOffice/Dashboard.BackOffice';
import {SalesOrder} from '../Views/BackOffice/BackOffice Components/pages/salesorder';
import { Cheque } from '../Views/BackOffice/BackOffice Components/pages/cheque';
import LiveMap from '../Views/BackOffice/BackOffice Components/Map/LiveMap';
import AssignVehicle from '../Views/BackOffice/BackOffice Components/Vehicle Assign/vehicleAssign';
import ChequeVerify from '../Views/BackOffice/BackOffice Components/Cheque/chequeVerify'


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
    path: "/backOffice/AssignVehicle",
    name: "AssignVehicle",
    component: AssignVehicle,
    exact: true,
  },
  {
    path: "/backOffice/ChequeVerify",
    name: "ChequeVerify",
    component: ChequeVerify,
    exact: true,
  },
 
];

export default backOfficeRoutes;
