import backOffice_dashboard from '../Views/BackOffice/Dashboard.BackOffice';

let backOfficeRoutes = [

  {
    path: "/backOffice/dashboard",
    name: "backOffice_dashboard",
    component: backOffice_dashboard,
    exact: true,
  },
 
];

export default backOfficeRoutes;
