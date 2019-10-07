import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Aside from './Aside'
import { updateClientInfo, logout } from '../actions';




class Client extends Component {
    /**
    * @constructor
    * @param {State} props
    */
    state = {
        ...this.props.user
    };
    /**
     *
     * @param {Event} event
     * @return {state} sets state of button
     */
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
     *
     * @param {Event} event
     * @return {state} updates state
     */
    onSubmit = (event) => {
        const { user: { _id }, history } = this.props;
        event.preventDefault();
        this.props.updateClientInfo(_id, this.state, history);
    }


    /**
    * @method resetForm
    * 
    * @memberof EditClient
    * @return {void}
    */
    resetForm = () => {
        const { user } = this.props
        this.setState({
            ...user
        });
    }

    render() {
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

                                            <Link id="sidebarNavToggler" className="btn btn-xs btn-text-secondary u-sidebar--account__toggle-bg ml-1" to="#" role="button"
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
                                            </Link>

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
                                            <li className="breadcrumb-item active" aria-current="page">Client</li>
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
                                                    <li className="nav-item u-header__nav-item">
                                                        <Link className="nav-link u-header__nav-link" to={`/admin/clients/${this.state._id}/deposite`}>Deposite</Link>
                                                    </li>

                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container space-2">
                        <form className="js-validate">
                            <div className="row">

                                <div className="col-sm-6 mb-6">
                                    <div className="js-form-message">
                                        <label id="nameLabel" className="form-label">
                                            Current Balance
                                        </label>

                                        <div className="form-group">
                                            <input type="text" 
                                                className="form-control"
                                                name="balance"
                                                value={this.state.balance || '' }
                                                onChange={this.onChange}
                                                required
                                                aria-describedby="nameLabel"
                                                data-error-class="u-has-error"
                                                data-success-class="u-has-success" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-6">
                                    <div className="js-form-message">
                                        <label id="lastNameLabel" className="form-label">
                                            Pending Balance:
                                        </label>

                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                name="pendingBal"
                                                value={this.state.pendingBal || ''}
                                                onChange={this.onChange}
                                                required
                                                aria-describedby="lastNameLabel"
                                                data-error-class="u-has-error"
                                                data-success-class="u-has-success" />
                                        </div>
                                    </div>
                                </div>


                                <div className="col-sm-6 mb-6">
                                    <div className="js-form-message">
                                        <label id="usernameLabel" className="form-label">
                                            Available Credit:
                                        </label>

                                        <div className="form-group">
                                            <input type="text" className="form-control" name="availableCredit"
                                                required
                                                aria-describedby="usernameLabel"
                                                value={this.state.availableCredit || ''}
                                                onChange={this.onChange}
                                                data-error-class="u-has-error"
                                                data-success-class="u-has-success" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-6">
                                    <div className="js-form-message">
                                        <label id="usernameLabel" className="form-label">
                                            Current Credit Limited Amount:
                                        </label>

                                        <div className="form-group">
                                            <input type="text" className="form-control" name="currentCreditLimitedAmount"
                                                required aria-describedby="passwordLabel"
                                                value={this.state.currentCreditLimitedAmount || ''}
                                                onChange={this.onChange}
                                                data-error-class="u-has-error"
                                                data-success-class="u-has-success" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-6">
                                    <div className="js-form-message">
                                        <label id="usernameLabel" className="form-label">
                                            Last Payment
                                        </label>

                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                name="lastPaymentAmt"
                                                onChange={this.onChange}
                                                required
                                                aria-describedby="passwordLabel"
                                                value={this.state.lastPaymentAmt || ''}
                                                onChange={this.onChange}
                                                data-error-class="u-has-error"
                                                data-success-class="u-has-success" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-6">
                                    <div className="js-form-message">
                                        <label id="emailLabel" className="form-label">
                                            Total Minimum Due:
                                        </label>

                                        <div className="form-group">
                                            <input type="tesxt" className="form-control"
                                                name="totalMinAmtDue"
                                                required aria-describedby="emailLabel"
                                                value={this.state.totalMinAmtDue || ''}
                                                onChange={this.onChange}
                                                data-error-class="u-has-error"
                                                data-success-class="u-has-success" />
                                        </div>
                                    </div>
                                </div>



                               
                                <div className="col-sm-6 mb-6">
                                    <div className="js-form-message">
                                        <label id="rewardBal" className="form-label">
                                            Reward Balance:
                                        </label>

                                        <div className="form-group">
                                            <input type="text" className="form-control" name="rewardBal"
                                                value={this.state.rewardBal || ''}
                                                onChange={this.onChange}
                                                required aria-describedby="rewardBal"
                                                data-error-class="u-has-error"
                                                data-success-class="u-has-success" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-1 mb-7" />
                            <button
                                type="submit"
                                className="btn btn-sm btn-success transition-3d-hover mr-1"
                                // disabled={this.state.isLoading}
                                onClick={this.onSubmit}
                                >
                                Update
                             </button>
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary transition-3d-hover mr-1"
                                onClick={this.resetForm}>
                                Reset
                             </button>
                        </form>
                    </div>

                </main>
                <Footer />
                {/* <Aside admin={this.props.admin} logout={this.props.logout} history={this.props.history} /> */}
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
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const userId = ownProps.match.params.userId;
    const user = state.clients.users.find(user => user._id === userId) || {};
    const admin = state.setCurrentUser.user;
    return { user, admin };
};

export default connect(mapStateToProps, { updateClientInfo, logout })(Client);
