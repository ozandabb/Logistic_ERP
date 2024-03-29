import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import { connect } from 'react-redux';

class SingleCompleted extends Component {   
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'backOffice_Cheque'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                      <h3>Cheque Verify  </h3>

                    </div>
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(SingleCompleted));