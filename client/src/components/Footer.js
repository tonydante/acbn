import React, { Fragment } from 'react';

function Footer() {
    return (
        <Fragment>
             <footer className="border-top">
                    <div className="border-bottom">
                        <div className="container space-2">
                            <div className="row justify-content-md-between">

                                <div className="col-sm-4 col-lg-2 mb-4 mb-lg-0" />
                                <div className="col-md-6 col-lg-4">
                                    <h4 className="h6 font-weight-semi-bold mb-4">We are driven to deliver results for all your businesses.</h4>


                                    <button type="button" className="btn btn-xs btn-dark btn-wide transition-3d-hover text-left mb-2 mr-1">
                                        <span className="media align-items-center">
                                            <span className="fab fa-apple fa-2x mr-3"></span>
                                            <span className="media-body">
                                                <span className="d-block">Download on the</span>
                                                <strong className="font-size-1">App Store</strong>
                                            </span>
                                        </span>
                                    </button>
                                    <button type="button" className="btn btn-xs btn-dark btn-wide transition-3d-hover text-left mb-2">
                                        <span className="media align-items-center">
                                            <span className="fab fa-google-play fa-2x mr-3"></span>
                                            <span className="media-body">
                                                <span className="d-block">Get it on</span>
                                                <strong className="font-size-1">Google Play</strong>
                                            </span>
                                        </span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container text-center space-1">
                        <a className="d-inline-flex align-items-center mb-2" href="../home/index.html" aria-label="Front">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 46 46" style={{ marginBottom: 0 }}>
                                <path fill="#3F7DE0" opacity=".65" d="M23,41L23,41c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18h11.3C38,5,41,8,41,11.7V23C41,32.9,32.9,41,23,41z" />
                                <path className="fill-info" opacity=".5" d="M28,35.9L28,35.9c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18l11.3,0C43,0,46,3,46,6.6V18C46,27.9,38,35.9,28,35.9z" />
                                <path className="fill-primary" opacity=".7" d="M18,46L18,46C8,46,0,38,0,28v0c0-9.9,8-18,18-18h11.3c3.7,0,6.6,3,6.6,6.6V28C35.9,38,27.9,46,18,46z" />
                            </svg>
                        </a>
                        <p className="small text-muted">&copy; Acbn. 2019. All rights reserved.</p>
                    </div>

                </footer>
        </Fragment>
    )
}

export default Footer;