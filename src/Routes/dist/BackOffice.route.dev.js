"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Dashboard = _interopRequireDefault(require("../Views/BackOffice/Dashboard.BackOffice"));

var _salesorder = _interopRequireDefault(require("../Views/BackOffice/BackOffice Components/pages/salesorder"));

var _cheque = require("../Views/BackOffice/BackOffice Components/pages/cheque");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var backOfficeRoutes = [{
  path: "/backOffice/dashboard",
  name: "backOffice_dashboard",
  component: _Dashboard["default"],
  exact: true
}, {
  path: "/backOffice/salesOrder",
  name: "backOffice_salesOrder",
  component: _salesorder["default"],
  exact: true
}, {
  path: "/backOffice/cheque",
  name: "backOffice_Cheque",
  component: _cheque.Cheque,
  exact: true
}];
var _default = backOfficeRoutes;
exports["default"] = _default;