import backOffice_dashboard from '../Views/BackOffice/Dashboard.BackOffice';
// import {SalesOrder} from '../Views/BackOffice/BackOffice Components/pages/salesorder';
import { Cheque } from '../Views/BackOffice/BackOffice Components/pages/cheque';

import LiveMap from '../Views/BackOffice/BackOffice Components/Map/LiveMap'
import Routes from '../Views/BackOffice/BackOffice Components/pages/routes'
import Jobcards from '../Views/BackOffice/BackOffice Components/pages/jobcard'


import AssignVehicle from '../Views/BackOffice/BackOffice Components/Vehicle Assign/vehicleAssign';
import ChequeVerify from '../Views/BackOffice/BackOffice Components/Cheque/chequeVerify';
import SalesOrder from '../Views/BackOffice/BackOffice Components/Sales Orders/salesOrder';
import SingleRejected from '../Views/BackOffice/BackOffice Components/Sales Orders/SingleRejected';
import SinglePending from '../Views/BackOffice/BackOffice Components/Sales Orders/SinglePending'
import SingleCompleted from '../Views/BackOffice/BackOffice Components/Sales Orders/SingleCompleted'

import SalesReturn from '../Views/BackOffice/BackOffice Components/Return Orders/returnOrder';
import SingleChequeVerify from '../Views/BackOffice/BackOffice Components/Cheque/SingleCheque';

let backOfficeRoutes = [

  {
    path: "/backOffice/dashboard",
    name: "backOffice_dashboard",
    component: backOffice_dashboard,
    exact: true,
  },
  // {
  //   path: "/backOffice/salesOrder",
  //   name: "backOffice_salesOrder",
  //   component: SalesOrder,
  //   exact: true,
  // },
  {
    path: "/backOffice/cheque",
    name: "backOffice_Cheque",
    component: Cheque,
    exact: true,
  },
  {
    path: "/backOffice/LiveMap/:id",
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
  {
    path: "/backOffice/job_cards",
    name: "JobCards",
    component: Jobcards,
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
  {
    path: "/backOffice/ChequeVerify/:id",
    name: "SingleChequeVerify",
    component: SingleChequeVerify,
    exact: true,
  },
  {
    path: "/backOffice/SalesOrder",
    name: "SalesOrder",
    component: SalesOrder,
    exact: true,
  },

  {
    path: "/backOffice/SinglePending/:id",
    name: "SinglePending",
    component: SinglePending,
    exact: true,
  },

  {
    path: "/backOffice/SingleCompleted",
    name: "SingleCompleted",
    component: SingleCompleted,
    exact: true,
  },

  {
    path: "/backOffice/SingleRejected",
    name: "SingleRejected",
    component: SingleRejected,
    exact: true,
  },

  {
    path: "/backOffice/SalesReturn",
    name: "SalesReturn",
    component: SalesReturn,
    exact: true,
  },
  

];

export default backOfficeRoutes;
