import React from "react";
import { connect } from 'react-redux';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent } from 'react-pro-sidebar';
import { faTable, faBars, faAddressBook, faObjectGroup, faTruck, faSignOutAlt, faPeopleArrows, faHome, faLandmark, faLocationArrow, faClipboard, faCashRegister } from '@fortawesome/free-solid-svg-icons'
import "../../assersts/commoncss/sidebar.css";
import { SignOut } from '../../Redux/Action/authAction';
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Sidebar_Assi_Acc extends React.Component {
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
        this.props.history.push("/");
    };

    render() {

        const { side_bar_toggle } = this.state;
        const { activemenu, submenu } = this.props;

        return (
            <div>
                <nav className="navbar  py-0 shadow-sm  fixed-top" style={{ background: "#475466", height: "50px" }} >
                    <span className="navbar-brand mb-0 h6 text-dark ml-2">
                        <FontAwesomeIcon onClick={() => this.setState({ side_bar_toggle: !this.state.side_bar_toggle, })}
                            icon={faBars}
                            style={{ color: "#FFFFFF" }}
                            className="ml-4 click show-icon"></FontAwesomeIcon>
                    </span>
                </nav>


                <div className={`sidebar_wrap sidebar-top ${side_bar_toggle ? "sidebar_active" : ""} shadow`} >
                    <ProSidebar>
                        <SidebarContent>
                            <Menu iconShape="circle">
                                <MenuItem active={activemenu === 'DASHBOARD'} icon={<FontAwesomeIcon icon={faHome} />}>Dashboard<Link to="/AssistantAccountant/dashboard" /></MenuItem>
                                <SubMenu defaultOpen={activemenu === 'FIXED_ASSETS'} title="Fixed Assets" icon={<FontAwesomeIcon icon={faCashRegister} />}>
                                    <MenuItem active={submenu === 'FIXED_ASSETS_LOCATION'} >Locations<Link to="/AssistantAccountant/fixedAssetsLocation" /></MenuItem>
                                    <MenuItem active={submenu === 'FIXED_ASSETS_CLASS'}>Classes<Link to="/AssistantAccountant/fixedAssetsClass" /></MenuItem>
                                    <MenuItem active={submenu === 'FIXED_ASSETS_SUBCLASS'}>Sub Classes<Link to="/AssistantAccountant/fixedAssetsSubClass" /></MenuItem>
                                    <MenuItem active={submenu === 'FIXED_ASSETS_POSTING_GROUP'}>Posting Groups<Link to="/AssistantAccountant/fixedAssetsPostingGroup" /></MenuItem>
                                    <MenuItem active={submenu === 'FIXED_ASSETS_CARD'}>Cards<Link to="/AssistantAccountant/fixedAssetsCard" /></MenuItem>
                                </SubMenu>
                                <MenuItem active={activemenu === 'gg'} onClick={() => this.signoutuser()} icon={<FontAwesomeIcon icon={faSignOutAlt} />}>Logout</MenuItem>
                            </Menu>
                        </SidebarContent>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar_Assi_Acc));
