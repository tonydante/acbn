import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import shortId from 'shortid';
import Footer from './Footer'
import Aside from './Aside'
import {
    getAllUsers, logout, authTransfer, deleteUser
} from '../actions';
// import { HashLink as Link } from 'react-router-hash-link';


class AdminDashboard extends Component {
    /**
 * Creates Instance of UpdateProfilePage
 * @param {Object} props
 * @memberOf UpdateProfilePage
 */

    state = {
        users: [],
    };
    componentDidMount() {
        this.props.getAllUsers();
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.users !== prevState.users) {
            return ({ users: nextProps.users }) // <- this is setState equivalent
        }
    }
    onChange = (event) => {
        const toggleTokenValue = event.target.checked;
        const { id, name } = event.target;
        const transferToken = {
            firstToken: toggleTokenValue,
            isActive: toggleTokenValue
        };
        this.props.authTransfer(id, transferToken).then(() => {
            if (toggleTokenValue === true) {
                return swal({
                    title: "Hi there!",
                    text: `Transfer has been activated for ${name}`,
                    icon: "success"
                });
            }
            if (toggleTokenValue === false) {
                return swal({
                    title: "Hi there!",
                    text: 'Transfer has been deactivated for this user',
                    icon: "warning"
                });
            }
        });
    }

    handleLogout = (event) => {
        event.preventDefault();
        const { history } = this.props
        this.props.logout(history);
    }

    handleDelete = (event, id) => {
        event.preventDefault();
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to view this user again!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteUser(id).then(() => {
                    this.props.getAllUsers();
                });
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("User was not deleted!");
            }
        });
    }
    render() {
        console.log(this.props)
        return (
            <Fragment>
                <header id="header" className="u-header">
                    <div className="u-header__section">

                        <div className="container u-header__hide-content pt-2">
                            <div className="d-flex align-items-center">

                                <div className="position-relative mr-auto">
                                    <a id="languageDropdownInvoker" className="dropdown-nav-link dropdown-toggle d-flex align-items-center" href="#" role="button"
                                        aria-controls="languageDropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        data-unfold-event="hover"
                                        data-unfold-target="#languageDropdown"
                                        data-unfold-type="css-animation"
                                        data-unfold-duration="300"
                                        data-unfold-delay="300"
                                        data-unfold-hide-on-scroll="true"
                                        data-unfold-animation-in="slideInUp"
                                        data-unfold-animation-out="fadeOut">
                                        <img className="dropdown-item-icon" src="../../assets/vendor/flag-icon-css/flags/4x3/us.svg" alt="SVG" />
                                        <span className="d-inline-block d-sm-none">US</span>
                                        <span className="d-none d-sm-inline-block">United States</span>
                                    </a>

                                    <div id="languageDropdown" className="dropdown-menu dropdown-unfold" aria-labelledby="languageDropdownInvoker">
                                        <a className="dropdown-item active" href="#">English</a>
                                        <a className="dropdown-item" href="#">Deutsch</a>
                                        <a className="dropdown-item" href="#">Español‎</a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div id="logoAndNav" className="container">

                            <nav className="js-mega-menu navbar navbar-expand-md u-header__navbar u-header__navbar--no-space">

                                <a className="navbar-brand u-header__navbar-brand u-header__navbar-brand-center" href="../home/index.html" aria-label="Front">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="46px" height="46px" viewBox="0 0 46 46" style={{ marginBottom: 0 }}>
                                        <path fill="#3F7DE0" opacity=".65" d="M23,41L23,41c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18h11.3C38,5,41,8,41,11.7V23C41,32.9,32.9,41,23,41z" />
                                        <path className="fill-info" opacity=".5" d="M28,35.9L28,35.9c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18l11.3,0C43,0,46,3,46,6.6V18C46,27.9,38,35.9,28,35.9z" />
                                        <path className="fill-primary" opacity=".7" d="M18,46L18,46C8,46,0,38,0,28v0c0-9.9,8-18,18-18h11.3c3.7,0,6.6,3,6.6,6.6V28C35.9,38,27.9,46,18,46z" />
                                        <path className="fill-white" d="M17.4,34V18.3h10.2v2.9h-6.4v3.4h4.8v2.9h-4.8V34H17.4z" />
                                    </svg>
                                    <span className="u-header__navbar-brand-text">ACBN</span>
                                </a>



                                <button type="button" className="navbar-toggler btn u-hamburger"
                                    aria-label="Toggle navigation"
                                    aria-expanded="false"
                                    aria-controls="navBar"
                                    data-toggle="collapse"
                                    data-target="#navBar">
                                    <span id="hamburgerTrigger" className="u-hamburger__box">
                                        <span className="u-hamburger__inner"></span>
                                    </span>
                                </button>



                                <div id="navBar" className="collapse navbar-collapse u-header__navbar-collapse">
                                    <ul className="list-inline ml-2 mb-0 ml-auto">





                                        <li className="list-inline-item">

                                            <a id="sidebarNavToggler" className="btn btn-xs btn-text-secondary u-sidebar--account__toggle-bg ml-1" href="#" role="button"
                                                aria-controls="sidebarContent"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                data-unfold-event="click"
                                                data-unfold-hide-on-scroll="false"
                                                data-unfold-target="#sidebarContent"
                                                data-unfold-type="css-animation"
                                                data-unfold-animation-in="fadeInRight"
                                                data-unfold-animation-out="fadeOutRight"
                                                data-unfold-duration="500">
                                                <span className="position-relative">
                                                    <span className="u-sidebar--account__toggle-text">Howdy, {this.props.admin.username}!</span>
                                                    <img className="u-sidebar--account__toggle-img" src="../../assets/img/100x100/img1.jpg" alt="Image Description" />
                                                </span>
                                            </a>

                                        </li>

                                    </ul>
                                </div>

                            </nav>

                        </div>
                    </div>
                </header>




                <main id="content" role="main">

                    <div className="bg-primary">
                        <div className="container space-top-1 pb-3">
                            <div className="row">
                                <div className="col-lg-5 order-lg-2 text-lg-right mb-4 mb-lg-0">
                                    <div className="d-flex d-lg-inline-block justify-content-between justify-content-lg-end align-items-center align-items-lg-start">

                                        <ol className="breadcrumb breadcrumb-white breadcrumb-no-gutter mb-0">
                                            <li className="breadcrumb-item"><a className="breadcrumb-link" href="../home/index.html">Home</a></li>
                                            <li className="breadcrumb-item"><a className="breadcrumb-link" href="dashboard.html">Admin</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                        </ol>



                                        <div className="d-lg-none">
                                            <button type="button" className="navbar-toggler btn u-hamburger u-hamburger--white"
                                                aria-label="Toggle navigation"
                                                aria-expanded="false"
                                                aria-controls="breadcrumbNavBar"
                                                data-toggle="collapse"
                                                data-target="#breadcrumbNavBar">
                                                <span id="breadcrumbHamburgerTrigger" className="u-hamburger__box">
                                                    <span className="u-hamburger__inner"></span>
                                                </span>
                                            </button>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-lg-7 order-lg-1">

                                    <div className="media d-block d-sm-flex align-items-sm-center">
                                        <div className="u-lg-avatar position-relative mb-3 mb-sm-0 mr-3">
                                            <img className="img-fluid rounded-circle" src="../../assets/img/160x160/img2.jpg" alt="Image Description" />
                                            <span className="badge badge-md badge-outline-success badge-pos badge-pos--bottom-right rounded-circle">
                                                <span className="fas fa-check"></span>
                                            </span>
                                        </div>
                                        <div className="media-body">
                                            <h1 className="h3 text-white font-weight-medium mb-1">Howdy, {this.props.admin.username}!</h1>
                                            {/* <span className="d-block text-white">natalie.curtis@gmail.com</span> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="container space-bottom-1 space-bottom-lg-0">
                            <div className="d-lg-flex justify-content-lg-between align-items-lg-center">

                                <div className="u-header u-header-left-aligned-nav u-header--bg-transparent-lg u-header--white-nav-links z-index-4">
                                    <div className="u-header__section bg-transparent">
                                        <nav className="js-breadcrumb-menu navbar navbar-expand-lg u-header__navbar u-header__navbar--no-space">
                                            <div id="breadcrumbNavBar" className="collapse navbar-collapse u-header__navbar-collapse">
                                                <ul className="navbar-nav u-header__navbar-nav">

                                                    {/* <li className="nav-item hs-has-sub-menu u-header__nav-item"
                                                        data-event="hover"
                                                        data-animation-in="slideInUp"
                                                        data-animation-out="fadeOut">
                                                        <a id="generalDropdown" className="nav-link u-header__nav-link u-header__nav-link-toggle" href="javascript:;" aria-haspopup="true" aria-expanded="false" aria-labelledby="generalDropdownMenu">
                                                            General
                     </a>

                                                        <ul id="generalDropdownMenu" className="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer" style={{ minWidth: '230px' }} aria-labelledby="generalDropdown">
                                                            <li><a className="nav-link u-header__sub-menu-nav-link" href="dashboard.html">Dashboard</a></li>
                                                            <li><a className="nav-link u-header__sub-menu-nav-link" href="profile.html">Profile</a></li>
                                                            <li><a className="nav-link u-header__sub-menu-nav-link" href="my-tasks.html">My tasks</a></li>
                                                            <li><a className="nav-link u-header__sub-menu-nav-link" href="projects.html">Projects</a></li>
                                                            <li><Link className="nav-link u-header__sub-menu-nav-link" to="/signup">New Client</Link></li>
                                                        </ul>
                                                    </li> */}



                                                    {/* <li className="nav-item hs-has-sub-menu u-header__nav-item"
                                                        data-event="hover"
                                                        data-animation-in="slideInUp"
                                                        data-animation-out="fadeOut">
                                                        <a id="accountSettingsDropdown" className="nav-link u-header__nav-link u-header__nav-link-toggle" href="javascript:;" aria-haspopup="true" aria-expanded="false" aria-labelledby="accountSettingsDropdownMenu">
                                                            Account settings
                     </a>

                                                        <ul id="accountSettingsDropdownMenu" className="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer" style={{ minWidth: '230px' }} aria-labelledby="accountSettingsDropdown">
                                                            <li><a className="nav-link u-header__sub-menu-nav-link" href="edit-profile.html">Edit profile</a></li>
                                                            <li><a className="nav-link u-header__sub-menu-nav-link" href="change-password.html">Change password</a></li>
                                                            <li><a className="nav-link u-header__sub-menu-nav-link" href="notifications.html">Notifications</a></li>
                                                        </ul>
                                                    </li> */}



                                                    {/* <li className="nav-item hs-has-sub-menu u-header__nav-item"
                                                        data-event="hover"
                                                        data-animation-in="slideInUp"
                                                        data-animation-out="fadeOut">
                                                        <a id="billingDropdown" className="nav-link u-header__nav-link u-header__nav-link-toggle" href="javascript:;" aria-haspopup="true" aria-expanded="false" aria-labelledby="billingDropdownMenu">
                                                            Billing
                     </a>

                                                        <ul id="billingDropdownMenu" className="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer" style={{ minWidth: '230px' }} aria-labelledby="billingDropdown">
                                                            <li><a className="nav-link u-header__sub-menu-nav-link" href="activity.html">Activity</a></li>
                                                            <li><a className="nav-link u-header__sub-menu-nav-link" href="payment-methods.html">Payment methods</a></li>
                                                        </ul>
                                                    </li> */}



                                                    {/* <li className="nav-item hs-has-sub-menu u-header__nav-item"
                                                        data-event="hover"
                                                        data-animation-in="slideInUp"
                                                        data-animation-out="fadeOut">
                                                        <a id="accessibilityDropdown" className="nav-link u-header__nav-link u-header__nav-link-toggle" href="javascript:;" aria-haspopup="true" aria-expanded="false" aria-labelledby="accessibilityDropdownMenu">
                                                            Accessibility
                     </a>

                                                        <ul id="accessibilityDropdownMenu" className="hs-sub-menu u-header__sub-menu u-header__sub-menu--spacer" style={{ minWidth: '230px' }} aria-labelledby="accessibilityDropdown">
                                                            <li><a className="nav-link u-header__sub-menu-nav-link" href="invite-friends.html">Invite friends</a></li>
                                                            <li><a className="nav-link u-header__sub-menu-nav-link" href="api-token.html">API Token</a></li>
                                                        </ul>
                                                    </li> */}

                                                    <li className="nav-item u-header__nav-item">
                                                        <Link className="nav-link u-header__nav-link" to="/admin/clients">Dashboard</Link>
                                                    </li>

                                                    <li className="nav-item u-header__nav-item">
                                                        <Link className="nav-link u-header__nav-link" to="/admin/client/new">New Client</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="bg-light">
                        <div className="container space-2">
                            <form>

                                <div className="mb-7">

                                    <div className="row justify-content-between align-items-end">
                                        <div className="col-6">
                                            <h2 className="h5 mb-0">My Clients</h2>
                                        </div>

                                    </div>
                                    <hr className="mt-2 mb-4" />

                                    {this.state.users.length > 0 ? this.state.users.map(user => (

                                        <div key={shortId.generate()}>
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox"
                                                    id={user._id}
                                                    name={user.username}
                                                    className="custom-control-input"
                                                    onChange={this.onChange}
                                                    checked={user.isActive} />
                                                <label className="custom-control-label" htmlFor={user._id}>
                                                    <Link to={`/admin/clients/${user._id}`}>
                                                        <span className="d-block" >{user.username}</span>
                                                    </Link>
                                                    <small className="d-block text-muted">A weekly email featuring shots from designers you follow</small>
                                                </label>
                                            </div>

                                            <hr className="my-3" />
                                        </div>

                                    )) : (<h3> No users found</h3>)}




                                    {/* <div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" id="customSwitch2" checked />
                                        <label className="custom-control-label" htmlFor="customSwitch2">
                                            <span className="d-block">Account activity <span className="badge badge-success ml-1">New</span></span>
                                            <small className="d-block text-muted">Get important notifications about you or activity you've missed</small>
                                        </label>
                                    </div> */}


                                    {/* <hr className="my-3" /> */}


                                    {/* <div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" id="customSwitch3" />
                                        <label className="custom-control-label" htmlFor="customSwitch3">
                                            <span className="d-block">Meetups near you <span className="badge badge-success ml-1">New</span></span>
                                            <small className="d-block text-muted">Get an email when a Dribbble Meetup is posted close to my location</small>
                                        </label>
                                    </div>


                                    <hr className="my-3" />


                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" id="customSwitch4" checked />
                                        <label className="custom-control-label" htmlFor="customSwitch4">
                                            <span className="d-block">Opportunities</span>
                                            <small className="d-block text-muted">Get a daily email when new design jobs are posted in your area</small>
                                        </label>
                                    </div> */}

                                </div>
                            </form>
                        </div>
                    </div>

                </main>
                <Footer />
                <Aside admin={this.props.admin} logout={this.props.logout} history={this.props.history} />
                <a className="js-go-to u-go-to" href="#"
                    data-position='{"bottom": 15, "right": 15 }'
                    data-type="fixed"
                    data-offset-top="400"
                    data-compensation="#header"
                    data-show-effect="slideInUp"
                    data-hide-effect="slideOutDown">
                    <span className="fas fa-arrow-up u-go-to__inner"></span>
                </a>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    users: state.clients.users,
    admin: state.setCurrentUser.user
});
export default connect(mapStateToProps, {
    getAllUsers, logout, authTransfer, deleteUser
})(AdminDashboard);