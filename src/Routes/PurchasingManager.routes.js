import PurchasingDashboard from '../Views/Purchasing Manager/Dashboard.purchace';
import AddOrder  from '../Views/Purchasing Manager/Purchasing Manager Components/AddOrder/Addorder';

let PurchasingManagerRoutes = [

      {
        path: "/PurchasingManager/dashboard",
        name: "PurchasingDashboard",
        component: PurchasingDashboard,
        exact: true,
      },
      {
        path: "/PurchasingManager/addOrder",
        name: "CreatePurchasingOrder",
        component: AddOrder,
        exact: true,
      },
    
    ];
    
    export default PurchasingManagerRoutes;
    