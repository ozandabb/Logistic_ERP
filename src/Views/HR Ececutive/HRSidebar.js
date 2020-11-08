import React from "react";
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { ProSidebar, Menu, MenuItem, SubMenu , SidebarHeader , SidebarContent , SidebarFooter } from 'react-pro-sidebar';
import { faTable, faBars , faPlusSquare, faColumns  , faAddressBook,faSnowman,faObjectGroup,faTruck, faAtom,faSignOutAlt, faTachometerAlt,faPeopleArrows, faGlobe, faHome, faChalkboard, faAd, faChartBar, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import "../../Asserts/commoncss/sidebar.css";
import { SignOut } from '../../Redux/Action/authAction';
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class HRSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side_bar_toggle: false,
    };
  }

  signoutuser = () => {

    const role = this.props.auth.user.user_details.role;
    // const isadmin = (role && (role == 3 || role == 1 || role == 2 || role == 0)) ? true : false
    this.props.SignOut && this.props.SignOut();
    this.props.history.push( "/");
  };

  render() {
    const { side_bar_toggle } = this.state;
    const { activemenu, submenu } = this.props;
    return (
      <div>
        <nav className="navbar  py-0 shadow-sm  fixed-top" style={{ background: "#475466", height:"50px" }} >
          <span className="navbar-brand mb-0 h6 text-dark ml-2">
          
            <FontAwesomeIcon onClick={() => this.setState({ side_bar_toggle: !this.state.side_bar_toggle, }) }
              icon={faBars}
              style={{color:"#FFFFFF"}}
              className="ml-4 click show-icon"
            ></FontAwesomeIcon>
          </span>
        </nav>

        <div className={`sidebar_wrap sidebar-top ${ side_bar_toggle ? "sidebar_active" : "" }`} >

          {/* <div className="sidebar-header pb-4 pt-2">
            <div className="d-flex px-4">
              <img src="/images/user2.jpg" className="rounded-circle sidebar-image my-auto"></img>
                    <div className="my-auto">
                                <h6 style={{lineHeight: '12px', fontWeight: 600}}
                                    className={`text-white mb-0 mt-1`}>HR Staff </h6>
                                <span className="small text-light ">@GamageUYT</span>
                    </div>
            </div>
          </div> */}

          <ProSidebar>
          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem active={activemenu === 'DASHBOARD'} icon={<FontAwesomeIcon icon={faHome} />}>Dashboard<Link to="/hr/dashboard"/></MenuItem>
              <MenuItem active={activemenu === 'CUSTOMERS'} icon={<FontAwesomeIcon icon={faPeopleArrows} />}>Customers<Link to="/hr/customers"/></MenuItem>
              <MenuItem active={activemenu === 'SUPPLIERS'} icon={<FontAwesomeIcon icon={faAddressBook} />}>Suppliers<Link to="/hr/supplier"/></MenuItem>
              <MenuItem active={activemenu === 'EMPLOYEES'} icon={<FontAwesomeIcon icon={faTable} />}>Employees<Link to="/hr/employees"/></MenuItem>
              <MenuItem active={activemenu === 'VEHICLES'} icon={<FontAwesomeIcon icon={faTruck} />}>Vehicles<Link to="/hr/vehicles"/></MenuItem>
              <MenuItem active={activemenu === 'DRIVERS'} icon={<FontAwesomeIcon icon={faObjectGroup} />}>Drivers<Link to="/hr/driver"/></MenuItem>
              <MenuItem active={activemenu === 'gg'} onClick={() => this.signoutuser()} icon={<FontAwesomeIcon icon={faSignOutAlt}  />}>Logout<Link to="/hr/customers"/></MenuItem>
           
              {/* <SubMenu defaultOpen={activemenu === 'REGISTRATION'} title="Registration" icon={<FontAwesomeIcon icon={faTachometerAlt} />}>
                <MenuItem active={submenu === 'CUSTOMER_REG'}>Customer Registration<Link to="/hrstaff/customer_registration"/></MenuItem>
                <MenuItem active={submenu === 'SUPPLIER_REG'}>Supplier Registration<Link to="/hrstaff/supplier_registration"></Link></MenuItem>
                <MenuItem active={submenu === 'EMPLOYEE_REG'}>Employee Registration<Link to="/hrstaff/employee_registration"/></MenuItem>
                <MenuItem active={submenu === 'DRIVER_REG'}>Driver Registration<Link to="/hrstaff/driver_registration"/></MenuItem>
                <MenuItem active={submenu === 'VEHICLE_REG'}>Vehicle Registration<Link to="/hrstaff/vehicle_Registration"/></MenuItem>
              </SubMenu>
         */}
            </Menu>
            </SidebarContent>
            {/* <SidebarFooter style={{backgroundColor:"#475466",height:"50px",color:"#FFFFFF", padding:"15px"}}>
            Contact Admin
            </SidebarFooter> */}
          </ProSidebar>

          <ul className="sidebar">

          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth || {},
});

const mapDispatchToProps = {
  SignOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HRSidebar));





// HRSidebar.PropType = {
//   logoutUser: PropType.func.isRequired,
//   auth: PropType.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { logoutUser }) (HRSidebar);

// export default HRSidebar;
