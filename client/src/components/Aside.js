import React, { Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';



function Aside(props) {
    const handleLogout = useCallback((event)=> {
            event.preventDefault();
            const { history } = props
            props.logout(history);
        })
    return (
        <Fragment>
             <aside id="sidebarContent" className="u-sidebar" aria-labelledby="sidebarNavToggler">
          <div className="u-sidebar__scroller">
            <div className="u-sidebar__container">
              <div className="u-sidebar--account__footer-offset">

                <div className="d-flex justify-content-between align-items-center pt-4 px-7">
                  <h3 className="h6 mb-0">My Account</h3>

                  <button type="button" className="close ml-auto"
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
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>



                <div className="js-scrollbar u-sidebar__body">

                  <header className="d-flex align-items-center u-sidebar--account__holder mt-3">
                    <div className="position-relative">
                      <img className="u-sidebar--account__holder-img" src="../../assets/img/100x100/img1.jpg" alt="Image Description" />
                      <span className="badge badge-xs badge-outline-success badge-pos rounded-circle"></span>
                    </div>
                    <div className="ml-3">
                      <span className="font-weight-semi-bold">Welcome, {props.admin.username} <span className="badge badge-success ml-1">Pro</span></span>
                      <span className="u-sidebar--account__holder-text">Bank Customer Adviser</span>
                    </div>


                    <div className="btn-group position-relative ml-auto mb-auto">
                      <a id="sidebar-account-settings-invoker" className="btn btn-xs btn-icon btn-text-secondary rounded" href="#" role="button"
                        aria-controls="sidebar-account-settings"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-toggle="dropdown"
                        data-unfold-event="click"
                        data-unfold-target="#sidebar-account-settings"
                        data-unfold-type="css-animation"
                        data-unfold-duration="300"
                        data-unfold-delay="300"
                        data-unfold-animation-in="slideInUp"
                        data-unfold-animation-out="fadeOut">
                        <span className="fas fa-ellipsis-v btn-icon__inner"></span>
                      </a>

                      <div id="sidebar-account-settings" className="dropdown-menu dropdown-unfold dropdown-menu-right" aria-labelledby="sidebar-account-settings-invoker">
                        {/* <a className="dropdown-item" href="#">Settings</a>
                                                <a className="dropdown-item" href="#">History</a> */}
                        {/* <div className="dropdown-divider"></div> */}
                        <a className="dropdown-item"
                          style={{ cursor: 'pointer' }}
                          onClick={handleLogout}>Sign Out</a>
                      </div>
                    </div>

                  </header>


                  <div className="u-sidebar__content--account">

                    <ul className="list-unstyled u-sidebar--account__list">
                      {/* <li className="u-sidebar--account__list-item">
                                                <a className="u-sidebar--account__list-link" href="dashboard.html">
                                                    <span className="fas fa-home u-sidebar--account__list-icon mr-2"></span>
                                                    Dashboard
                  </a>
                                            </li> */}
                      {/* <li className="u-sidebar--account__list-item">
                                                <a className="u-sidebar--account__list-link" href="profile.html">
                                                    <span className="fas fa-user-circle u-sidebar--account__list-icon mr-2"></span>
                                                    Profile
                                                 </a>
                                            </li> */}
                      <li className="u-sidebar--account__list-item">
                        <Link className="u-sidebar--account__list-link" to="/admin/clients">
                          <span className="fas fa-users u-sidebar--account__list-icon mr-2"></span>
                        Clients <span className="badge badge-danger float-right mt-1">3</span>
                        </Link>
                      </li>
                      <li className="u-sidebar--account__list-item">
                        <Link className="u-sidebar--account__list-link" to="/admin/client/new">
                          <span className="fas fa-users u-sidebar--account__list-icon mr-2"></span>
                          New Client 
                        </Link>
                      </li>
                    </ul>


                    <div className="u-sidebar--account__list-divider"></div>




                  </div>
                </div>
              </div>


              <footer id="SVGwaveWithDots" className="svg-preloader u-sidebar__footer u-sidebar__footer--account">



                <div className="position-absolute right-0 bottom-0 left-0">
                  <img className="js-svg-injector" src="../../assets/svg/components/wave-bottom-with-dots.svg" alt="Image Description"
                    data-parent="#SVGwaveWithDots" />
                </div>

              </footer>

            </div>
          </div>
        </aside>
        </Fragment>
    )
}

export default Aside