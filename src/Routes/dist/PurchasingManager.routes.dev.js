"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Dashboard = _interopRequireDefault(require("../Views/Purchasing Manager/Dashboard.purchace"));

var _AddSupplierDiscounts = _interopRequireDefault(require("../Views/Purchasing Manager/Purchasing Manager Components/Supplier/Add Claims/AddSupplierDiscounts"));

var _Supplier = _interopRequireDefault(require("../Views/Purchasing Manager/Purchasing Manager Components/Supplier/Supplier"));

var _request = _interopRequireDefault(require("../Views/Purchasing Manager/Purchasing Manager Components/Request/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PurchasingManagerRoutes = [{
  path: "/PurchasingManager/dashboard",
  name: "PurchasingDashboard",
  component: _Dashboard["default"],
  exact: true
}, {
  path: "/PurchasingManager/supplier",
  name: "CreatePurchasingOrder",
  component: _Supplier["default"],
  exact: true
}, {
  path: "/PurchasingManager/request",
  name: "PurchasingManagerRequest",
  component: _request["default"],
  exact: true
} // {
//   path: "/PurchasingManager/addClaim",
//   name: "AddSupplierClaim",
//   component: AddSupplierClaim,
//   exact: true,
// },
];
var _default = PurchasingManagerRoutes;
exports["default"] = _default;