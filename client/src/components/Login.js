import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './Header';
import { userLoginRequest } from '../actions';
import Footer from './Footer';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: '',
            isLoading: true
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    /**
     * 
     * @returns {void} 
     * @param {any} event
     * @memberof SignupForm
     */
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });

        if (!isEmpty(this.state.userId) && !isEmpty(this.state.password)) {
            this.setState({ isLoading: false });
        }
    }


    /**
     * This method validates the input from the state object 
     * and chcecks if its valid and makes an api call to the backend
     * 
     * @param {any} event 
     * @memberof SigninForm
     * @returns {void}
     */
    onSubmit(event) {
        event.preventDefault();
        const { history } = this.props
        this.props.userLoginRequest(this.state, history);
    }

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>ABNB FCU | Login</title>
                    <meta charSet="utf-8" />
                    <meta name="description" content="A React.js application" />
                </Helmet>
                <Header />
                <main id="content" role="main">
                    <div className="container space-2">
                        <form className="js-validate w-md-75 w-lg-50 mx-md-auto">
                            <div className="mb-7">
                                <h2 className="h3 text-primary font-weight-normal mb-0">Welcome <span className="font-weight-semi-bold">back</span></h2>
                                <p>Login to manage your account.</p>
                            </div>
                            <div className="js-form-message form-group">
                                <label className="form-label" htmlFor="signinSrEmail">User ID</label>
                                <input type="text"
                                    className="form-control"
                                    name="userId"
                                    value={this.state.userId}
                                    onChange={this.onChange}
                                    id="signinSrEmail"
                                    placeholder="User ID"
                                    aria-label="User ID"
                                    required
                                    data-msg="Please enter a valid User ID."
                                    data-error-class="u-has-error"
                                    data-success-class="u-has-success" />
                            </div>
                            <div className="js-form-message form-group">
                                <label className="form-label" htmlFor="signinSrPassword">
                                    <span className="d-flex justify-content-between align-items-center">
                                        Password

                                    </span>
                                </label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    id="signinSrPassword" placeholder="********" aria-label="********" required
                                    data-msg="Your password is invalid. Please try again."
                                    data-error-class="u-has-error"
                                    data-success-class="u-has-success" />
                            </div>
                            <div className="row align-items-center mb-5">
                                <div className="col-6">
                                    <span className="small text-muted">Don't have an account?</span>
                                    <Link className="small" to='/signup'>Signup</Link>
                                </div>
                                <div className="col-6 text-right">
                                    <button type="submit"
                                        className="btn btn-primary transition-3d-hover"
                                        disabled={this.state.isLoading}
                                        onClick={this.onSubmit}>Get Started</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
                <Footer />
            </Fragment>


        )
    }
}

// LoginForm.propTypes = {
//     userLoginRequest: PropTypes.func.isRequired
//   };
//   export default connect(null, {
//     userLoginRequest
//   })(Login);
export default connect(null, { userLoginRequest })(Login);