import Accoun_Assi_Dashboard from '../Views/Assistant Accountant/Dashboard.Assi.Acc';
import FixedAssetsLocation from '../Views/Assistant Accountant/FixedAssetsLocation';

let AssistantAccountantRoutes = [

  {
    path: "/AssistantAccountant/dashboard",
    name: "Accoun_Assi_Dashboard",
    component: Accoun_Assi_Dashboard,
    exact: true,
  },
  {
    path: "/AssistantAccountant/fixedAssetsLocation",
    name: "Fixed Assets Location",
    component: FixedAssetsLocation,
    exact: true,
  },
];

export default AssistantAccountantRoutes;
