"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AssignGift = _interopRequireDefault(require("../Views/Management/Assign GIft/AssignGift"));

var _Dashboard = _interopRequireDefault(require("../Views/Management/Dashboard.manage"));

var _SalesOrder = _interopRequireDefault(require("../Views/Management/Sales Order/SalesOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ManagementTeamRoutes = [{
  path: "/ManagementTeam/dashboard",
  name: "ManagementTeamDashboard",
  component: _Dashboard["default"],
  exact: true
}, {
  path: "/ManagementTeam/salesorder",
  name: "SalesOrder",
  component: _SalesOrder["default"],
  exact: true
}, {
  path: "/ManagementTeam/assigngift",
  name: "AssignGift",
  component: _AssignGift["default"],
  exact: true
}];
var _default = ManagementTeamRoutes;
exports["default"] = _default;