import Accoun_Assi_Dashboard from '../Views/Assistant Accountant/Dashboard.Assi.Acc';
import FixedAssetsLocation from '../Views/Assistant Accountant/FixedAssetsLocation';
import FixedAssetsClass from '../Views/Assistant Accountant/FixedAssetsClass';
import FixedAssetsSubClass from '../Views/Assistant Accountant/FixedAssetsSubClass';
import FixedAssetsPostingGroup from '../Views/Assistant Accountant/FixedAssetsPostingGroup';

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
  {
    path: "/AssistantAccountant/fixedAssetsClass",
    name: "Fixed Assets Class",
    component: FixedAssetsClass,
    exact: true,
  },
  {
    path: "/AssistantAccountant/fixedAssetsSubClass",
    name: "Fixed Assets Sub Class",
    component: FixedAssetsSubClass,
    exact: true,
  },
  {
    path: "/AssistantAccountant/fixedAssetsPostingGroup",
    name: "Fixed Assets Posting Groups",
    component: FixedAssetsPostingGroup,
    exact: true,
  },
];

export default AssistantAccountantRoutes;
