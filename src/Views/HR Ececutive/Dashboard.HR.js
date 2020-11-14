import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import HRSidebar from "./HRSidebar";

class HRDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  render() {
    return (

    //   <div className="app" >
    // <Sidebar activemenu={'STUDENT'}   submenu={'STUDENT_TB_LIST'} />
    // <main></main>
    // </div>
      <div className="bg-light wd-wrapper">
        <HRSidebar activemenu={'DASHBOARD'} />
          <div className="wrapper-wx" style={{height:"100hv"}}>
            <div className="container-fluid">
                    <h5>HR Dashboard</h5>
          </div>
      </div>
      </div>
    );
  }
}

const cardstyle = "card border-0 shadow-sm rounded mt-3 bg-white py-3 d-flex flex-row"

export default withRouter(HRDashboard);
