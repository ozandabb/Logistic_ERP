import React from "react";
import { connect } from 'react-redux';
import { ProSidebar, Menu, MenuItem,  SidebarContent  } from 'react-pro-sidebar';
import { faTable, faBars ,  faAddressBook,faObjectGroup,faTruck , faSignOutAlt , faPeopleArrows, faHome, faPiggyBank, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import "../../assersts/commoncss/sidebar.css";
import { SignOut } from '../../Redux/Action/authAction';
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Account_Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        side_bar_toggle: false,
        };
    }

    //Sign out function
    signoutuser = () => {
        const role = this.props.auth.user.user_details.role;
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
                    className="ml-4 click show-icon"></FontAwesomeIcon>
                </span>
            </nav>

            <div className={`sidebar_wrap sidebar-top ${ side_bar_toggle ? "sidebar_active" : "" } shadow`} >

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
                <MenuItem active={activemenu === 'DASHBOARD'} icon={<FontAwesomeIcon icon={faHome} />}>Dashboard<Link to="/Accountant/dashboard"/></MenuItem>
                <MenuItem active={activemenu === 'BANK_ACCOUNTS'} icon={<FontAwesomeIcon icon={faPiggyBank} />}>Bank Accounts<Link to="/Accountant/BankAccount"/></MenuItem>
                <MenuItem active={activemenu === 'Exchange_Rates'} icon={<FontAwesomeIcon icon={faDollarSign} />}>Exchange Rates<Link to="/Accountant/ExchangeRates"/></MenuItem>
                <MenuItem active={activemenu === 'ACCOUNTING_PERIODS'} icon={<FontAwesomeIcon icon={faTable} />}>Accounting Periods<Link to="/Accountant/AccoutingPeriods"/></MenuItem>
                <MenuItem active={activemenu === 'VEHICLES'} icon={<FontAwesomeIcon icon={faTruck} />}>Vehicles<Link to="/"/></MenuItem>
                <MenuItem active={activemenu === 'DRIVERS'} icon={<FontAwesomeIcon icon={faObjectGroup} />}>Drivers<Link to="/"/></MenuItem>
                <MenuItem active={activemenu === 'gg'} onClick={() => this.signoutuser()} icon={<FontAwesomeIcon icon={faSignOutAlt}  />}>Logout</MenuItem>
            
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Account_Sidebar));
