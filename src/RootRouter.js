import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect} from 'react-redux'
import indexRoutes from './Routes/index'
import HRRoutes from './Routes/HR.route';
import backOfficeRoutes from './Routes/BackOffice.route';

class App extends React.Component {

    router = () => {
    let routes = indexRoutes;

   
    let checkSignedIn =  this.props.auth.isAuthenticated;
    let role = (checkSignedIn) ? this.props.auth.user.role : "";

    if(checkSignedIn === true ){
      routes = [ ...routes ];
    }else if(checkSignedIn === false){
      routes = [...routes ];
    }

    if(checkSignedIn === true && role === 12){
      routes = [ ...HRRoutes, ...routes ];
    }
    if(checkSignedIn === true && role === 5){
      routes = [ ...backOfficeRoutes, ...routes ];
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