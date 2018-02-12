import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { updateClientInfo, logout } from '../../actions/user';
import DepositModal from './DepositModal';


/**
 *
 *
 * @export
 * @class EditClient
 * @extends {Component}
 */
export class EditClient extends Component {
  /**
    * @constructor
    * @description Creates Instance of LoginForm
    * @param {Object} props
    * @memberOf LoginForm
    */
  constructor(props) {
    super(props);
    this.state = {
      ...props.user
    };
    this.baseState = this.state;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

/**
*
* @param {*} nextProps updated props
* @returns {DOM} DOM object
*/
  componentWillReceiveProps(nextProps) {
    this.setState({
      balance: nextProps.user.balance,
      pendingBal: nextProps.user.pendingBal,
      availableCredit: nextProps.user.availableCredit,
      currentCreditLimitedAmount: nextProps.user.currentCreditLimitedAmount,
      lastPaymentDate: nextProps.user.lastPaymentDate,
      lastPaymentAmt: nextProps.user.lastPaymentAmt,
      totalMinAmtDue: nextProps.user.totalMinAmtDue,
      paymentDueDate: nextProps.user.paymentDueDate,
      rewardBal: nextProps.user.rewardBal,
    });
  }

  /**
    * @method onChange
    * @param {Event} event
    * @return {Object} updates State
    */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @method onSubmit
   * @param {Event} event
   * @return {Object} new State
   */
  onSubmit(event) {
    const { updateClientInfo, user: { _id } } = this.props;
    event.preventDefault();
    updateClientInfo(_id, this.state);
  }

  /**
   * @method resetForm
   * 
   * @memberof EditClient
   * @return {void}
   */
  resetForm() {
    const { user } = this.props
    this.setState({
      ...user
    });
  }

  /**
 *
 *
 * @returns {void}
 * @memberof EditClient
 */
  render() {
    const { match: { params: { userId } } } = this.props;
    return (
      <div className="admin-dashboard-container">
      <DepositModal userid= {userId}/>
      <div className="dashboard-container">
        <header className="nav-section logo">
          <div>
            <Link to="/" className="brand-logo logo">
              <img src="/assets/image/logo.png" alt="ABNB" height="30" />
            </Link>
          </div>
          <span>
            <h4>Welcome, {this.props.admin.username} </h4>
          </span>  
        </header>
        <main>
          <div className="side-nav-section channels">
            <div className="side-nav-logout-btn">
              <a onClick={this.props.logout}>Logout</a>
            </div>
            <NavLink 
            className="side-nav-item" 
            exact to="/admin/dashboard/clients"
            >
              <span className="icon-holder">
                <i className="fas fa-users" />
              </span>
              <div className="text">
                Users 
              </div>
            </NavLink>
            <NavLink 
            className="side-nav-item" 
            exact to="/admin/dashboard/create"
            >
              <span className="icon-holder">
                <i className="fab fa-reddit-alien" />
              </span>  
              <div className="text">Create a client</div> 
            </NavLink>
            <NavLink 
            className="side-nav-item" 
            exact to="/admin/dashboard/deposit"
            data-toggle="modal" 
            data-target="#exampleModalCenter"
            >
              <span className="icon-holder">
                <i className="fab fa-cc-amazon-pay" />
              </span>  
              <div className="text">Deposit</div> 
            </NavLink>
          </div>
          <div className="account-summary-container">
            <div className="account-summary-section overflow">
              <div className="text">
                <p> 
                  <i className="fab fa-reddit-alien" />: 
                  {this.props.user.firstname} 
                  {this.props.user.lastname}
                </p>
              </div>
              <div className="container auth-form form-width">
                <form className="row" onSubmit={this.onSubmit}>
                  <div className="col s12">
                    <div className="input-field">
                      <label htmlFor="userId" className="control-label">Current Balance: </label>
                      <input
                        type="text"
                        name="balance"
                        value={this.state.balance || ''}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="pendingBal" className="control-label">Pending Balance: </label>
                      <input
                        type="text"
                        name="pendingBal"
                        value={this.state.pendingBal || ''}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="availableCredit" className="control-label">Available Credit: </label>
                      <input
                        type="text"
                        name="availableCredit"
                        value={this.state.availableCredit || ''}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="currentCreditLimitedAmount" className="control-label">Current Credit Limited Amount: </label>
                      <input
                        type="text"
                        name="currentCreditLimitedAmount"
                        value={this.state.currentCreditLimitedAmount || ''}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="lastPaymentDate" className="control-label">Last Payment: </label>
                      <input
                        type="text"
                        name="lastPaymentDate"
                        value={this.state.lastPaymentDate || ''}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="totalMinAmtDue" className="control-label">Total Minimum Due: </label>
                      <input
                        type="text"
                        name="totalMinAmtDue"
                        value={this.state.totalMinAmtDue || ''}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="paymentDueDate" className="control-label">Payment Due Date: </label>
                      <input
                        type="text"
                        name="paymentDueDate"
                        value={this.state.paymentDueDate || ''}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="rewardBal" className="control-label">Reward Balance: </label>
                      <input
                        type="text"
                        name="rewardBal"
                        value={this.state.rewardBal || ''}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="update-form-cta">
                      <button type="reset" onClick={this.resetForm} className="btn shadow-effect">Reset</button>
                      <button type="submit" className="btn shadow-effect update-btn">Update</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>
    );
  }
}

EditClient.propTypes = {
  updateClientInfo: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  const user = state.clients.users.find(user => user._id === userId) || {};
  const admin = state.setCurrentUser.user;
  return { user, admin };
};

export default connect(mapStateToProps, { updateClientInfo, logout })(EditClient);
