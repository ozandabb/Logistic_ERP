/*  eslint-disable */
import React from "react";
// import PropType from 'prop-types';
// import { connect } from 'react-redux';
// import { logoutUser } from '../../actions/authAction';
import { ProSidebar, Menu, MenuItem, SubMenu , SidebarHeader , SidebarContent , SidebarFooter } from 'react-pro-sidebar';
import { faTable, faBars , faPlusSquare  , faAddressBook, faAtom, faTachometerAlt, faGlobe, faHome, faChalkboard, faAd, faChartBar, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import "../../Asserts/commoncss/sidebar.css";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class HRSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side_bar_toggle: false,
    };
  }

  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { side_bar_toggle } = this.state;
    const { activemenu, submenu } = this.props;
    return (
      <div>
        <nav className="navbar  py-0 shadow-sm  fixed-top" style={{ background: "#ffffff", height:"50px" }} >
          <span className="navbar-brand mb-0 h6 text-dark ml-2">
          
            <FontAwesomeIcon onClick={() => this.setState({ side_bar_toggle: !this.state.side_bar_toggle, }) }
              icon={faBars}
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
            <Menu iconShape="circle">
              <MenuItem active={activemenu === 'DASHBOARD'} icon={<FontAwesomeIcon icon={faBars} />}>Dashboard<Link to="/hr/dashboard"/></MenuItem>
              <MenuItem active={activemenu === 'CUSTOMERS'} icon={<FontAwesomeIcon icon={faBars} />}>Customers<Link to="/hr/customers"/></MenuItem>
              <MenuItem active={activemenu === 'jj'} icon={<FontAwesomeIcon icon={faBars} />}>Dashboard<Link to="/hr/dashboard"/></MenuItem>
              <MenuItem active={activemenu === 'gg'} icon={<FontAwesomeIcon icon={faBars} />}>Customers<Link to="/hr/customers"/></MenuItem>
              {/* <SubMenu defaultOpen={activemenu === 'REGISTRATION'} title="Registration" icon={<FontAwesomeIcon icon={faTachometerAlt} />}>
                <MenuItem active={submenu === 'CUSTOMER_REG'}>Customer Registration<Link to="/hrstaff/customer_registration"/></MenuItem>
                <MenuItem active={submenu === 'SUPPLIER_REG'}>Supplier Registration<Link to="/hrstaff/supplier_registration"></Link></MenuItem>
                <MenuItem active={submenu === 'EMPLOYEE_REG'}>Employee Registration<Link to="/hrstaff/employee_registration"/></MenuItem>
                <MenuItem active={submenu === 'DRIVER_REG'}>Driver Registration<Link to="/hrstaff/driver_registration"/></MenuItem>
                <MenuItem active={submenu === 'VEHICLE_REG'}>Vehicle Registration<Link to="/hrstaff/vehicle_Registration"/></MenuItem>
              </SubMenu>
              <SubMenu defaultOpen={activemenu === 'PROFILES'} title="Profiles" icon={<FontAwesomeIcon icon={faTachometerAlt} />}>
                <MenuItem active={submenu === 'CUSTOMER_PRO'}>Customer Profile<Link to="/hrstaff/customerProfile"/></MenuItem>
                <MenuItem active={submenu === 'SUPPLIER_PRO'}>Supplier Profile<Link to="/hrstaff/supplierProfile"></Link></MenuItem>
                <MenuItem active={submenu === 'EMPLOYEE_PRO'}>Employee Profile<Link to="/hrstaff/employeeProfile"/></MenuItem>
                <MenuItem active={submenu === 'DRIVER_PRO'}>Driver Profile<Link to="/hrstaff/driverProfile"/></MenuItem>
                <MenuItem active={submenu === 'VEHICLE_PRO'}>Vehicle Profile<Link to="/hrstaff/vehicleProfile"/></MenuItem>
              </SubMenu> */}

              {/* <MenuItem active={activemenu === 'DASHBOARD'} icon={<FontAwesomeIcon icon={faBars} />}>AccDashboard<Link to="/finance/AccDashboard"/></MenuItem>
              <MenuItem active={activemenu === 'DASHBOARD'} icon={<FontAwesomeIcon icon={faBars} />}>AccExDashboard<Link to="/finance/AccExDashboard"/></MenuItem>
              <MenuItem active={activemenu === 'DASHBOARD'} icon={<FontAwesomeIcon icon={faBars} />}>AssAccDashboard<Link to="/finance/AssAccDashboard"/></MenuItem> */}

            </Menu>
          </ProSidebar>

          <ul className="sidebar">

     
      
           
            {/* <li onClick={this.onLogoutClick.bind(this)} className={`listitem ${  active == "products" && "active_category"}`}>
            <Link to="/">
                <h6 className={`categorylink px-2 ${ active == "products" && "active_category" }`} >
                  Logout
                </h6>
                </Link>
              </li> */}

          </ul>
        </div>
      </div>
    );
  }
}

// HRSidebar.PropType = {
//   logoutUser: PropType.func.isRequired,
//   auth: PropType.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { logoutUser }) (HRSidebar);

export default HRSidebar;
