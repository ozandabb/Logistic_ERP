import React from "react";
import { connect } from 'react-redux';
import { ProSidebar, Menu, MenuItem, SubMenu , SidebarHeader , SidebarContent , SidebarFooter } from 'react-pro-sidebar';
import { faTable, faBars , faPlusSquare, faColumns  , faAddressBook,faSnowman,faObjectGroup,faTruck, faAtom,faSignOutAlt, faEnvelopeOpenText,faPeopleArrows, faGlobe, faHome, faChalkboard, faAd, faChartBar, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import "../../assersts/commoncss/sidebar.css";
import {  Button, Card , Form , Image ,FormFile, OverlayTrigger , Tooltip , Popover } from 'react-bootstrap';
import { SignOut } from '../../Redux/Action/authAction';
import { Link, withRouter } from "react-router-dom";
import ADMIN_CONTROLLER from '../../Controllers/Admin/AdminController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Admin_Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            side_bar_toggle: false,
            accessList: [],
            completeList: [],
            NotCompleted: [],
            length:'',

        };
    }

    async componentDidMount() {
        this.loadAllSystemAccess();
    }

    //GET all User system access
    loadAllSystemAccess = async () => {
        const res = await ADMIN_CONTROLLER.getAllUserAccess(this.props.auth.token);
        console.log("alll cus", res);
        this.setState({
            accessList: res.data.rows,
        });
    }

    //Sign out function
    signoutuser = () => {
        const role = this.props.auth.user.user_details.role;
        this.props.SignOut && this.props.SignOut();
        this.props.history.push( "/");
    };

    render() {

    const { side_bar_toggle, accessList } = this.state;
    const { activemenu, submenu} = this.props;
    const length = accessList.length;


    return (
        <div>
            <nav className="navbar  py-0 shadow-sm  fixed-top" style={{ background: "#475466", height:"50px" }} >
                <span className="navbar-brand mb-0 h6 text-dark ml-2">
                    <FontAwesomeIcon onClick={() => this.setState({ side_bar_toggle: !this.state.side_bar_toggle, }) }
                    icon={faBars}
                    style={{color:"#FFFFFF"}}
                    className="ml-4 click show-icon"></FontAwesomeIcon>
                </span>

                <div style={{justifyContent:"center"}} className="d-none d-lg-block">
                    <h5 style={{color:"#FFFFFF"}}>Administration </h5>
                </div>


          <div style={{justifyContent:"right"}}>
            <div className="row">
            {/* <FontAwesomeIcon  icon={faEnvelope}  className="d-none d-lg-block" /> */}
              <div style={{justifyContent:"center", marginTop:"5px"}}> 
              {/* <FontAwesomeIcon  icon={faEnvelope}  /> */}
              
              <>
                {['bottom'].map((placement) => (
                    <OverlayTrigger
                    trigger="click"
                    key={placement}
                    placement={placement}
                    overlay={
                        <Popover id={`popover-positioned-${placement}`}>
                        <Popover.Title as="h3">{`Quick Email`}</Popover.Title>
                        <Popover.Content>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Button style={{backgroundColor:"#7800B7", color:"#FFFFFF", cursor: 'pointer'}}  className="btn mt-2 form-control btn btn-sm ">Send</Button>
                            </Form>
                        </Popover.Content>
                        </Popover>
                    }
                    >
                    <div>
                        <Image src="/images/notify.gif" style={{width:"30px", cursor:"pointer"}} roundedCircle  />
                        {/* {length != 0 && <FontAwesomeIcon  icon={faEnvelopeOpenText} style={{ color:"#FFFFFF", cursor: 'pointer'}}   />} */}
                   </div>
                    </OverlayTrigger>
                ))}
                </>
                </div>
              <>
                {['bottom'].map((placement) => (
                    <OverlayTrigger
                    trigger="click"
                    key={placement}
                    placement={placement}
                    overlay={
                        <Popover id={`popover-positioned-${placement}`}>
                        <Popover.Title as="h3">{`Quick Email`}</Popover.Title>
                        <Popover.Content>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Button style={{backgroundColor:"#7800B7", color:"#FFFFFF", cursor: 'pointer'}}  className="btn mt-2 form-control btn btn-sm ">Send</Button>
                            </Form>
                        </Popover.Content>
                        </Popover>
                    }
                    >
                    <Image src="/images/userprofile.png" style={{width:"35px",marginRight:"20px", marginLeft:"20px", cursor:"pointer"}} rounded />
                    </OverlayTrigger>
                ))}
                </>
            </div>
          </div>
            </nav>

            <div className={`sidebar_wrap sidebar-top ${ side_bar_toggle ? "sidebar_active" : "" }shadow`} >

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
                <MenuItem active={activemenu === 'DASHBOARD'} icon={<FontAwesomeIcon icon={faHome} />}>Dashboard<Link to="/AdminTeam/dashboard"/></MenuItem>
                <MenuItem active={activemenu === 'USERS'} icon={<FontAwesomeIcon icon={faPeopleArrows} />}>Users<Link to="/AdminTeam/Users"/></MenuItem>
                {/* <MenuItem active={activemenu === 'SUPPLIERS'} icon={<FontAwesomeIcon icon={faAddressBook} />}>Suppliers<Link to="/"/></MenuItem>
                <MenuItem active={activemenu === 'EMPLOYEES'} icon={<FontAwesomeIcon icon={faTable} />}>Employees<Link to="/"/></MenuItem>
                <MenuItem active={activemenu === 'VEHICLES'} icon={<FontAwesomeIcon icon={faTruck} />}>Vehicles<Link to="/"/></MenuItem>
                <MenuItem active={activemenu === 'DRIVERS'} icon={<FontAwesomeIcon icon={faObjectGroup} />}>Drivers<Link to="/"/></MenuItem> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin_Sidebar));
