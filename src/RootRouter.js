import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect} from 'react-redux'

import indexRoutes from './Routes/index';
import ManagementTeamRoutes from './Routes/Manage.Team.routes';
import backOfficeRoutes from './Routes/BackOffice.route';
import AccountsExecutivesRoutes from './Routes/AccountsExecutives.routes';
import WarehouseRoutes from './Routes/Warehouse.routes';
import SalesPersonRoutes from './Routes/Salesperson.routes';
import CashierRoutes from './Routes/Cashier.routes';
import PurchasingManagerRoutes from './Routes/PurchasingManager.routes';
import HRRoutes from './Routes/HR.route';
import PayrollOficerRoutes from './Routes/PayrollOfficer.routes';
import HeadOfDeptRoutes from './Routes/HeadOfDept.routes';
import AssistantAccountantRoutes from './Routes/AssistantAccountant.routes';
import AccountantRoutes from './Routes/Accountant.routes';
import AdminRoutes from './Routes/Admin.routes';

class App extends React.Component {

    router = () => {
    let routes = indexRoutes;

   
    let checkSignedIn =  this.props.auth.isAuthenticated;
    let role = (checkSignedIn) ? this.props.auth.user.user_details.role : "";
     
    if(checkSignedIn === true ){
      routes = [ ...routes ];
    }
    if(checkSignedIn === true && role === 3){
      routes = [ ...ManagementTeamRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 4){
      routes = [ ...backOfficeRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 6){
      routes = [ ...AccountsExecutivesRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 7){
      routes = [ ...WarehouseRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 8){
      routes = [ ...SalesPersonRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 9){
      routes = [ ...CashierRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 10){
      routes = [ ...PurchasingManagerRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 12){
      routes = [ ...HRRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 13){
      routes = [ ...PayrollOficerRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 14){
      routes = [ ...HeadOfDeptRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 15){
      routes = [ ...AssistantAccountantRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 16){
      routes = [ ...AccountantRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 18){
      routes = [ ...AdminRoutes, ...routes ];
    }
    
    return routes;
  } 

    render(){
        return(
            <Router >
            
            <Switch>
            { this.router().map((prop, key) => {
                return (
                <Route
                    path={prop.path}
                    key={key}
                    component={(props) => <prop.component    {...props} />}
                    exact={prop.exact ? true : false}

                />
                );
            })}
            </Switch>
        </Router>
        )
    }
}

const mapStateToProps = state => ({
    auth : state.auth || {} ,
  });

export default connect(mapStateToProps)(App);