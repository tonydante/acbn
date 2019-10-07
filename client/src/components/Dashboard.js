import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { HashLink as Link } from 'react-router-hash-link';
import Transfer from './Transfer'
import {
  getUserAccDetails, logout, getTransactions
} from '../actions';
import Header from './Header'


class Dashboard extends Component {
  state = {
    btcusd: {},
    ltcusd: '-',
    ethusd: '-',
    initValue: 0,
    transactions: [],
    firstname: '',
    lastname: this.props.userAccDetails.lastname,
    username: this.props.userAccDetails.username,
    email: this.props.userAccDetails.email,
    accountNumber: this.props.userAccDetails.accountNumber,
    balance: this.props.userAccDetails.balance,
    rewardBal: this.props.userAccDetails.rewardBal,
    pendingBal: this.props.userAccDetails.pendingBal
  }
  BASE_URL = "https://api.cryptonator.com/api/ticker/";

  /**
* 
* 
* @memberof Dashboard
* @returns {void}
*/
  componentDidMount() {
    this.props.getTransactions();
    this.props.getUserAccDetails();
    this.getDataFor("btc-usd", "btcusd");
    this.getDataFor('ltc-usd', 'ltcusd');
    this.getDataFor('eth-usd', 'ethusd');

  }
  getDataFor(conversion, prop) {
    fetch(this.BASE_URL + conversion, {
      mode: "cors"
    })
      .then(res => res.json())
      .then(d => {
        console.log(d, 'hello there')
        this.setState({
          [prop]: d.ticker
        });
      });
  }
  roundUp = (num, precision) => {
    precision = Math.pow(10, precision)
    return Math.ceil(num * precision) / precision
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.transactions !== prevState.transactions) {
      return ({ transactions: nextProps.transactions }) // <- this is setState equivalent
    }
    if (nextProps.userAccDetails !== prevState.userAccDetails) {
      return ({
        firstname: nextProps.userAccDetails.firstname,
        lastname: nextProps.userAccDetails.lastname,
        username: nextProps.userAccDetails.username,
        email: nextProps.userAccDetails.email,
        accountNumber: nextProps.userAccDetails.accountNumber,
        balance: nextProps.userAccDetails.balance,
        rewardBal: nextProps.userAccDetails.rewardBal,
        pendingBal: nextProps.userAccDetails.pendingBal,
      }) 
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    const { history } = this.props
    this.props.logout(history);
}

  render() {
    const transction = this.state.transactions.map(transaction => {
      return <li className="media u-indicator-vertical-dashed-item" key={transaction._id}>
            <span className="btn btn-xs btn-icon btn-primary rounded-circle mr-3">
              <span className="btn-icon__inner">A</span>
            </span>
            <div className="media-body">
              <h5 className="font-size-1 mb-1">Transfered: $ {transaction.amountToTransfer} - {transaction.transactionType}</h5>
              <p className="small mb-1">Description: <span className="font-weight-medium">{transaction.transferDescription}</span></p>
              <small className="d-block text-muted">{transaction.date}</small>
            </div>
          </li>
      
    });
    return (
      <Fragment>
        <Header username={this.state.username}/>
        <main id="content" role="main">
          <div className="bg-primary">
            <div className="container space-top-1 pb-3">
              <div className="row">
                <div className="col-lg-5 order-lg-2 text-lg-right mb-4 mb-lg-0">
                  <div className="d-flex d-lg-inline-block justify-content-between justify-content-lg-end align-items-center align-items-lg-start">

                    <ol className="breadcrumb breadcrumb-white breadcrumb-no-gutter mb-0">
                      <li className="breadcrumb-item"><a className="breadcrumb-link" href="../home/index.html">Home</a></li>
                      <li className="breadcrumb-item"><a className="breadcrumb-link" href="dashboard.html">Account</a></li>
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
                      <h1 className="h3 text-white font-weight-medium mb-1">Howdy, {this.state.firstname}!</h1>
                      <span className="d-block text-white">{this.state.email}</span>
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
                          <li className="nav-item u-header__nav-item">
                            <Link className="nav-link u-header__nav-link" to="/dashboard">Dashboard</Link>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>


                <div className="ml-lg-auto">

                  <Link className="btn btn-sm btn-soft-white text-nowrap transition-3d-hover" to="/dashboard#requestPaymentModal"
                    data-modal-target="#requestPaymentModal">
                    <span className="fas fa-plus small mr-2"></span>
                    Request a Payment
            </Link>

                </div>
              </div>
            </div>
          </div>



          <div className="bg-light">
            <div className="container space-2">

              <div className="card-deck d-block d-lg-flex card-lg-gutters-3 mb-6">

                <div className="card mb-3 mb-lg-0">
                  <div className="card-body p-5">
                    <div className="media align-items-center">
                      <span className="btn btn-lg btn-icon btn-soft-primary rounded-circle mr-4">
                        <span className="fas fa-dollar-sign btn-icon__inner"></span>
                      </span>
                      <div className="media-body">
                        <span className="d-block font-size-3">${this.state.balance}.00</span>
                        <h2 className="h6 text-secondary font-weight-normal mb-0">Available balance</h2>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="card mb-3 mb-lg-0">
                  <div className="card-body p-5">
                    <div className="media align-items-center">
                      <span className="btn btn-lg btn-icon btn-soft-success rounded-circle mr-4">
                        <span className="fas fa-coins btn-icon__inner"></span>
                      </span>
                      <div className="media-body">
                        <span className="d-block font-size-3">${this.state.rewardBal}.00</span>
                        <h3 className="h6 text-secondary font-weight-normal mb-0">Reward balance</h3>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="card">
                  <div className="card-body p-5">
                    <div className="media align-items-center">
                      <span className="btn btn-lg btn-icon btn-soft-warning rounded-circle mr-4">
                        <span className="fas fa-exchange-alt btn-icon__inner"></span>
                      </span>
                      <div className="media-body">
                        <span className="d-block font-size-3">${this.state.pendingBal}.00</span>
                        <h3 className="h6 text-secondary font-weight-normal mb-0">Pending balance</h3>
                      </div>
                    </div>
                  </div>
                </div>

              </div>



              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="h6 mb-0">The BTC Market</h3>
              </div>



              <div className="mb-7">
              <div className="card-deck d-block d-lg-flex card-lg-gutters-3">
        
        <div className="card border-0 shadow-sm mb-5 mb-lg-0">
          <header className="card-header p-6">
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <small className="d-block text-muted">{moment().format('MMMM Do YYYY')}</small>
              <div className="btn btn-sm btn-icon btn-soft-primary rounded-circle" data-placement="top">
              </div>
            </div>
            
    
            
            <div className="media align-items-center">
              <div className="u-avatar mr-3">
                <img className="img-fluid rounded-circle" src="../../assets/vendor/flag-icon-css/flags/1x1/us.svg" alt="United States Flag"/>
              </div>
              <div className="media-body">
                <h3 className="h6 mb-0">{this.roundUp(parseFloat(this.state.btcusd.price), 2)} USD</h3>
                  {(Math.sign(parseInt(this.state.btcusd.change)) === 1) ? 
                    <div className="small text-success">
                    {this.roundUp(parseFloat(this.state.btcusd.change), 3)}%
                    <span className="fas fa-angle-up ml-2"></span>
                  </div>
                  : <div className="small text-danger" >
                  -{this.roundUp(parseFloat(this.state.btcusd.change), 3)}%
                  <span className="fas fa-angle-down ml-2"></span>
                  </div>}
              </div>
              <div className="js-bar-chart"> <h3 className="h6 text-success">{this.state.btcusd.base}</h3></div>
            </div>
            
          </header>
    
          <div className="card-body p-6">
            
            <div className="row mb-7">
              <div className="col-6">
                <h4 className="small text-muted">
                  Volume: <strong className="text-secondary">${this.roundUp(parseFloat(this.state.btcusd.volume), 0)}</strong>
                </h4>
                <div className="js-hr-progress progress" style={{height: "6px"}}>
                  <div className="js-hr-progress-bar progress-bar bg-success" role="progressbar"  style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div className="col-6">
                <h4 className="small text-muted">
                  Duration: <strong className="text-secondary">1 week</strong>
                </h4>
                <div className="js-hr-progress progress" style={{height: "6px"}}>
                  <div className="js-hr-progress-bar progress-bar bg-warning" role="progressbar"  style={{width: "50%"}}aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    
        
        <div className="card border-0 shadow-sm mb-5 mb-lg-0">
          <header className="card-header p-6">
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <small className="d-block text-muted">{moment().format('MMMM Do YYYY')}</small>
              <div className="btn btn-sm btn-icon btn-soft-primary rounded-circle" data-placement="top">
              </div>
            </div>
            
    
            
            <div className="media align-items-center">
              <div className="u-avatar mr-3">
                <img className="img-fluid rounded-circle" src="../../assets/vendor/flag-icon-css/flags/1x1/us.svg" alt="United States Flag"/>  
              </div>
              <div className="media-body">
                <h3 className="h6 mb-0">{this.roundUp(parseFloat(this.state.ltcusd.price), 2)} USD</h3>
                  {(Math.sign(parseInt(this.state.ltcusd.change)) === 1) ? 
                    <div className="small text-success" >
                    {this.roundUp(parseFloat(this.state.ltcusd.change), 3)}%
                    <span className="fas fa-angle-up ml-2"></span>
                  </div>
                  : <div className="small text-danger" >
                  -{this.roundUp(parseFloat(this.state.ltcusd.change), 3)}%
                  <span className="fas fa-angle-down ml-2"></span>
                  </div>}
              </div>
              <div className="js-bar-chart"> <h3 className="h6 text-success">{this.state.ltcusd.base}</h3></div>
            </div>
            
          </header>
    
          <div className="card-body p-6">
            
            <div className="row mb-7">
              <div className="col-6">
              <h4 className="small text-muted">
                  Volume: <strong className="text-secondary">${this.roundUp(parseFloat(this.state.ltcusd.volume), 0)}</strong>
                </h4>
                <div className="js-hr-progress progress" style={{height: "6px"}}>
                  <div className="js-hr-progress-bar progress-bar bg-success" role="progressbar"  style={{width: "12%"}} aria-valuenow="12" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div className="col-6">
                <h4 className="small text-muted">
                  Duration: <strong className="text-secondary">1 month</strong>
                </h4>
                <div className="js-hr-progress progress" style={{height: "6px"}}>
                  <div className="js-hr-progress-bar progress-bar bg-warning" role="progressbar"  style={{width: "15%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
    
        
        <div className="card border-0 shadow-sm">
          <header className="card-header p-6">
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <small className="d-block text-muted">{moment().format('MMMM Do YYYY')}</small>
              <a className="btn btn-sm btn-icon btn-soft-primary rounded-circle" href="javascript:;" data-toggle="tooltip" data-placement="top" title="Download overall report">
                <span className="fas fa-cloud-download-alt btn-icon__inner"></span>
              </a>
            </div>
            
    
            
            <div className="media align-items-center">
              <div className="u-avatar mr-3">
              <img className="img-fluid rounded-circle" src="../../assets/vendor/flag-icon-css/flags/1x1/us.svg" alt="United States Flag"/>
              </div>
              <div className="media-body">
              <h3 className="h6 mb-0">{this.roundUp(parseFloat(this.state.ethusd.price), 2)} USD</h3>
                  {(Math.sign(parseInt(this.state.ethusd.change)) === 1) ? 
                    <div className="small text-success">
                    {this.roundUp(parseFloat(this.state.ethusd.change), 3)}%
                    <span className="fas fa-angle-up ml-2"></span>
                  </div>
                  : <div className="small text-danger">
                  -{this.roundUp(parseFloat(this.state.ethusd.change), 3)}%
                  <span className="fas fa-angle-down ml-2"></span>
                  </div>}
              </div>
              <div className="js-bar-chart"> <h3 className="h6 text-success">{this.state.ethusd.base}</h3></div>
            </div>
            
          </header>
    
          <div className="card-body p-6">
            
            <div className="row mb-7">
              <div className="col-6">
                <h4 className="small text-muted">
                Volume: <strong className="text-secondary">${this.roundUp(parseFloat(this.state.ethusd.volume), 0)}</strong>
                </h4>
                <div className="js-hr-progress progress" style={{height: "6px"}}>
                  <div className="js-hr-progress-bar progress-bar bg-success" role="progressbar"  style={{width: "45%"}}aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div className="col-6">
                <h4 className="small text-muted">
                  Duration: <strong className="text-secondary">3 weeks</strong>
                </h4>
                <div className="js-hr-progress progress" style={{height: "6px"}}>
                  <div className="js-hr-progress-bar progress-bar bg-warning" role="progressbar"  style={{width: "40%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
              </div>



              <div className="card-deck d-block d-lg-flex card-lg-gutters-3">

                <div className="card mb-7 mb-lg-0">
                  <div className="card-body pt-4 pb-5 px-5 mb-3 mb-md-0">

                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="h6 mb-0">Deposits</h4>


                      <div className="position-relative">
                        <div id="depositSettingsDropdownInvoker" className="btn btn-sm btn-icon btn-soft-secondary btn-bg-transparent" role="button"
                          aria-controls="depositSettingsDropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          data-unfold-type="css-animation"
                          data-unfold-duration="300"
                          data-unfold-delay="300"
                          data-unfold-hide-on-scroll="true"
                          data-unfold-animation-in="slideInUp"
                          data-unfold-animation-out="fadeOut">
                          <span className="fas fa-ellipsis-h btn-icon__inner"></span>
                        </div>
                      </div>

                    </div>


                    <hr className="mt-3 mb-4" />


                    <div className="row mb-5">
                      <div className="col-sm-6 mb-4 mb-sm-0">
                        <span className="align-top">$</span>
                        <span className="font-size-3 font-weight-medium text-lh-sm">{this.state.balance}</span>
                        <div className="mb-1">
                          <span className="text-secondary font-size-1">Deposit:</span>
                          <span className="font-weight-medium font-size-1">${this.state.balance}</span>
                        </div>
                        {/* <div>
                          <span className="text-primary font-weight-medium text-lh-sm">
                            <span className="fas fa-arrow-up text-success small"></span>
                            +2.1% ($122)
                    </span> 
                        </div>*/}
                      </div>

                      <div className="col-sm-6 align-self-end">

                        <div className="js-pie text-center"
                          data-success-class="content-centered-y"
                          data-circles-value="40"
                          data-circles-max-value="100"
                          data-circles-bg-color="rgba(0, 201, 167, 0.1)"
                          data-circles-fg-color="#00c9a7"
                          data-circles-radius="70"
                          data-circles-stroke-width="8"
                          data-circles-duration="2000"
                          data-circles-scroll-animate="true"
                          data-circles-color="#00c9a7"
                          data-circles-font-size="24"></div>

                      </div>
                    </div>

                    {/* <button type="button" className="btn btn-block btn-sm btn-primary transition-3d-hover">Add Funds</button> */}

                  </div>

                  <div className="card-footer p-5">

                    <div className="row align-items-center">
                      <div className="col-6 u-ver-divider">
                        <label className="small text-muted">Goal:</label>
                        <small className="font-weight-medium">$100k</small>
                        <div className="js-hr-progress progress" style={{ height: `4px` }}>
                          <div className="js-hr-progress-bar progress-bar" role="progressbar" style={{ width: `70%` }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>

                      <div className="col-6">
                        <label className="small text-muted">Duration:</label>
                        <small className="font-weight-medium">6 months</small>
                        <div className="js-hr-progress progress" style={{ height: `4px` }}>
                          <div className="js-hr-progress-bar progress-bar bg-success" role="progressbar" style={{ width: `40%` }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>



                <div className="card mb-7 mb-lg-0">
                  <div className="card-body pt-4 pb-5 px-5 mb-3 mb-md-0">

                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="h6 mb-0">Balance</h4>


                      <div className="position-relative">
                        <div id="balanceSettingsDropdownInvoker" className="btn btn-sm btn-icon btn-soft-secondary btn-bg-transparent"  role="button"
                          aria-controls="balanceSettingsDropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          data-unfold-type="css-animation"
                          data-unfold-duration="300"
                          data-unfold-delay="300"
                          data-unfold-hide-on-scroll="true"
                          data-unfold-animation-in="slideInUp"
                          data-unfold-animation-out="fadeOut">
                          <span className="fas fa-ellipsis-h btn-icon__inner"></span>
                        </div>

                        
                      </div>

                    </div>


                    <hr className="mt-3 mb-4" />


                    <div className="row align-items-center mb-4">
                      <div className="col-6 u-ver-divider">
                        <label className="d-block small text-muted mb-0">Available:</label>
                        <span className="font-weight-medium">${this.state.balance}.00</span>
                      </div>

                      <div className="col-6">
                        <label className="d-block small text-muted mb-0">Pending:</label>
                        <span className="font-weight-medium">${this.state.pendingBal}.00</span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-3">
                        <div className="js-vr-progress progress-vertical rounded mb-2">
                          <div className="js-vr-progress-bar bg-primary rounded-bottom" role="progressbar" style={{ height: `45%` }} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        
                      </div>
                      <div className="col-3">
                        <div className="js-vr-progress progress-vertical rounded mb-2">
                          <div className="js-vr-progress-bar bg-primary rounded-bottom" role="progressbar" style={{ height: `80%` }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        
                      </div>
                      <div className="col-3">
                        <div className="js-vr-progress progress-vertical rounded mb-2">
                          <div className="js-vr-progress-bar bg-primary rounded-bottom" role="progressbar" style={{ height: `23%` }} aria-valuenow="23" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      
                      </div>
                      <div className="col-3">
                        <div className="js-vr-progress progress-vertical rounded mb-2">
                          <div className="js-vr-progress-bar bg-primary rounded-bottom" role="progressbar" style={{ height: `39%` }} aria-valuenow="39" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        
                      </div>
                    </div>

                  </div>
                </div>



                <div className="card">
                  <div className="card-body pt-4 pb-5 px-5 mb-3 mb-md-0">

                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="h6 mb-0">Transactions</h4>


                      <div className="position-relative">
                        <span id="activitySettingsDropdownInvoker" className="btn btn-sm btn-icon btn-soft-secondary btn-bg-transparent"  role="button"
                          aria-controls="activitySettingsDropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          data-unfold-type="css-animation"
                          data-unfold-duration="300"
                          data-unfold-delay="300"
                          data-unfold-hide-on-scroll="true"
                          data-unfold-animation-in="slideInUp"
                          data-unfold-animation-out="fadeOut">
                          <span className="fas fa-ellipsis-h btn-icon__inner"></span>
                        </span>
                      </div>

                    </div>


                    <hr className="mt-3 mb-4" />

                    <div className="overflow-hidden">
                      <div className="js-scrollbar pr-3" style={{ minWidth: `300px` }}>

                        <ul className="list-unstyled u-indicator-vertical-dashed">
                        {transction}
                        </ul>

                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </main>



        <footer>
          <div className="container text-center space-1">

            <a className="d-inline-flex align-items-center mb-2" href="../home/index.html" aria-label="Front">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 46 46" style={{ marginBottom: 0 }}>
                <path fill="#3F7DE0" opacity=".65" d="M23,41L23,41c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18h11.3C38,5,41,8,41,11.7V23C41,32.9,32.9,41,23,41z" />
                <path className="fill-info" opacity=".5" d="M28,35.9L28,35.9c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18l11.3,0C43,0,46,3,46,6.6V18C46,27.9,38,35.9,28,35.9z" />
                <path className="fill-primary" opacity=".7" d="M18,46L18,46C8,46,0,38,0,28v0c0-9.9,8-18,18-18h11.3c3.7,0,6.6,3,6.6,6.6V28C35.9,38,27.9,46,18,46z" />
              </svg>
            </a>

            <p className="small text-muted">&copy; Front. 2019 Htmlstream. All rights reserved.</p>
          </div>

        </footer>




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
                      <span className="font-weight-semi-bold">{this.state.firstname} {this.state.lastname} <span className="badge badge-success ml-1">Online</span></span>
                      <span className="u-sidebar--account__holder-text">{this.state.email}</span>
                    </div>


                  

                  </header>


                  <div className="u-sidebar__content--account">

                    <ul className="list-unstyled u-sidebar--account__list">
                      <li className="u-sidebar--account__list-item">
                        <a className="u-sidebar--account__list-link" style={{ cursor: 'pointer' }} onClick={this.handleLogout}>
                          <span className="fas fa-home u-sidebar--account__list-icon mr-2"></span>
                          Sign out
                  </a>
                      </li>
                      
                    </ul>

                  </div>
                </div>
              </div>


              <footer id="SVGwaveWithDots" className="svg-preloader u-sidebar__footer u-sidebar__footer--account">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item pr-3">
                    <a className="u-sidebar__footer--account__text" href="../pages/privacy.html">Privacy</a>
                  </li>
                  <li className="list-inline-item pr-3">
                    <a className="u-sidebar__footer--account__text" href="../pages/terms.html">Terms</a>
                  </li>
                  <li className="list-inline-item">
                    <a className="u-sidebar__footer--account__text" href="../pages/help.html">
                      <i className="fas fa-info-circle"></i>
                    </a>
                  </li>
                </ul>


                <div className="position-absolute right-0 bottom-0 left-0">
                  <img className="js-svg-injector" src="../../assets/svg/components/wave-bottom-with-dots.svg" alt="Image Description"
                    data-parent="#SVGwaveWithDots" />
                </div>

              </footer>

            </div>
          </div>
        </aside>



        <Transfer history={this.props.history}/>




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


const mapStateToProps = (state) => {
  const transactions= state.transactions.user
  const userAccDetails= state.userAccDetails
  return { transactions, userAccDetails}
}
export default connect(mapStateToProps, { logout, getTransactions, getUserAccDetails })(Dashboard);
