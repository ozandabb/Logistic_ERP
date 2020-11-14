import PurchasingDashboard from '../Views/Purchasing Manager/Dashboard.purchace';
import AddSupplierClaim from '../Views/Purchasing Manager/Purchasing Manager Components/Supplier/Add Claims/AddSupplierDiscounts';
import Supplier  from '../Views/Purchasing Manager/Purchasing Manager Components/Supplier/Supplier';

let PurchasingManagerRoutes = [

      {
        path: "/PurchasingManager/dashboard",
        name: "PurchasingDashboard",
        component: PurchasingDashboard,
        exact: true,
      },
      {
        path: "/PurchasingManager/supplier",
        name: "CreatePurchasingOrder",
        component: Supplier,
        exact: true,
      },
      // {
      //   path: "/PurchasingManager/addClaim",
      //   name: "AddSupplierClaim",
      //   component: AddSupplierClaim,
      //   exact: true,
      // },
    
    ];
    
    export default PurchasingManagerRoutes;
    