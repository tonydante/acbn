import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import {
    transfer
  } from '../actions';

class Transfer extends Component {
    state = {
        receiverBank: '',
        receiverName: '',
        receiverAccountNumber: '',
        email: '',
        swiftCode: '',
        ibanNumber: '',
        accountNumber: '',
        amountToTransfer: '',
        transferDescription: ''
      }
       
  /**
   * @method onChange
   * @param {Event} event
   * @return {Object} updates State
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  cancelHandler = (event) => {
    event.preventDefault();
    window.location.reload(); 
  }
   /**
   * @method onSubmit
   * @param {Event} event
   * @return {Object} new State
   */
  onSubmit = (event) => {
    event.preventDefault();
    this.props.transfer(this.state)
  }
  
    render() {
        return (
            <Fragment>
                <div id="requestPaymentModal" className="js-modal-window u-modal-window" style={{ minWidth: '600px' }}>
                    <div className="card mb-9">

                        <header className="card-header bg-light py-3 px-5">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="h6 mb-0">Request a payment</h3>

                                {/* <button type="button" className="close" aria-label="Close" onClick="Custombox.modal.close();">
                                    <span aria-hidden="true">&times;</span>
                                </button> */}
                            </div>
                        </header>


                        <div className="card-body bg-white">

                            <form className="js-validate js-step-form"
                                data-progress-id="#progressStepForm"
                                data-steps-id="#contentStepForm"
                                noValidate="novalidate"
                            >

                                <nav id="progressStepForm" className="js-step-progress nav nav-icon nav-justified text-center p-5">
                                    <div className="nav-item" >
                                        <span className="nav-icon-action">
                                            <span className="fas fa-user-circle nav-icon-action-inner"></span>
                                        </span>
                                        <span className="d-none d-sm-block">Receiver's Bank Name</span>
                                    </div>
                                    <div className="nav-item">
                                        <span className="nav-icon-action">
                                            <span className="fas fa-file-invoice-dollar nav-icon-action-inner"></span>
                                        </span>
                                        <span className="d-none d-sm-block">Payment details</span>
                                    </div>
                                    <div className="nav-item" href="#">
                                        <span className="nav-icon-action">
                                            <span className="fas fa-paperclip nav-icon-action-inner"></span>
                                        </span>
                                        <span className="d-none d-sm-block">Attachment</span>
                                    </div>
                                </nav>


                                <hr className="my-0" />


                                <div id="contentStepForm" className="p-5">
                                    <div id="selectPlayerStep" className="active">

                                        <div id="recentPayersList" data-target-group="idAddNewPayer">
                                            <div className="mb-4">
                                                    <input type="text"
                                                            className="form-control"
                                                            name="receiverBank"
                                                            value={this.state.receiverBank}
                                                            onChange={this.onChange}
                                                            placeholder="Enter Receiver's Bank Name"
                                                            aria-label="Enter Receiver's Bank Name"
                                                            aria-describedby="receiverBank" required
                                                            data-msg="Please enter an amount."
                                                            data-error-class="u-has-error"
                                                            data-success-class="u-has-success" />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button type="button" className="btn btn-sm btn-primary transition-3d-hover mr-1" data-next-step="#paymentDetailsStep">Next</button>
                                            <button type="submit" className="btn btn-sm btn-soft-secondary transition-3d-hover" onClick={this.cancelHandler}>Cancel</button>
                                        </div>

                                    </div>

                                    <div id="paymentDetailsStep" style={{ display: 'none' }}>
                                        <div className="row">

                                        <div className="col-sm-6 mb-4">
                                            <label id="receiverName" className="h6 small d-block text-uppercase">Reciever's name</label>
                                            <div className="js-form-message">
                                                <div className="input-group input-group-sm">
                                                    <input type="text"
                                                        className="form-control"
                                                        name="receiverName"
                                                        value={this.state.receiverName}
                                                        onChange={this.onChange}
                                                        placeholder="Reciever's name" aria-label="Amount"
                                                        aria-describedby="receiverName" required
                                                        data-msg="Please enter an amount."
                                                        data-error-class="u-has-error"
                                                        data-success-class="u-has-success" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 mb-4">
                                            <label id="receiverAccountNumber" className="h6 small d-block text-uppercase">Reciever's Account No</label>
                                            <div className="js-form-message">
                                                <div className="input-group input-group-sm">
                                                    <input type="number"
                                                        className="form-control"
                                                        name="receiverAccountNumber"
                                                        value={this.state.receiverAccountNumber}
                                                        onChange={this.onChange}
                                                        placeholder="Reciever's Account No" aria-label="Amount"
                                                        aria-describedby="receiverAccountNumber" 
                                                        required
                                                        data-msg="Please enter an amount."
                                                        data-error-class="u-has-error"
                                                        data-success-class="u-has-success" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 mb-4">
                                            <label id="email" className="h6 small d-block text-uppercase">Email</label>
                                            <div className="js-form-message">
                                                <div className="input-group input-group-sm">
                                                    <input type="email"
                                                        className="form-control"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.onChange}
                                                        placeholder="Email" aria-label="Email"
                                                        aria-describedby="email" 
                                                        required
                                                        data-msg="Please enter a valid email."
                                                        data-error-class="u-has-error"
                                                        data-success-class="u-has-success" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 mb-4">
                                                <label id="amountToTransfer" className="h6 small d-block text-uppercase">Amount</label>
                                                <div className="js-form-message">
                                                    <div className="input-group input-group-sm">
                                                        <input type="number"
                                                            className="form-control"
                                                            name="amountToTransfer"
                                                            value={this.state.amountToTransfer}
                                                            onChange={this.onChange}
                                                            placeholder="Amount" aria-label="Amount"
                                                            aria-describedby="amountToTransfer" required
                                                            data-msg="Please enter an amount."
                                                            data-error-class="u-has-error"
                                                            data-success-class="u-has-success" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label id="descriptionLabel" className="h6 small d-block text-uppercase">Transfer Description</label>
                                            <div className="js-form-message">
                                                <div className="input-group input-group-sm">
                                                    <textarea className="form-control" rows="2" 
                                                    name="transferDescription"
                                                    value={this.state.transferDescription}
                                                    onChange={this.onChange}
                                                    placeholder="Reciever will see this description on the payment request" 
                                                    aria-label="Reciever will see this description on the payment request" aria-describedby="descriptionLabel" 
                                                    required
                                                        data-msg="Please enter a valid reason."
                                                        data-error-class="u-has-error"
                                                        data-success-class="u-has-success"></textarea>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="d-flex justify-content-end">
                                            <button type="button" className="btn btn-sm btn-primary transition-3d-hover mr-1" data-next-step="#attachDocumentsStep">Next</button>
                                            <a className="btn btn-sm btn-soft-secondary transition-3d-hover mr-1" href="#" data-previous-step="#selectPlayerStep">Back</a>
                                        </div>

                                    </div>

                                    <div id="attachDocumentsStep" style={{ display: 'none' }}>
                                    <div className="col-sm-6 mb-4">
                                            <label id="swiftCode" className="h6 small d-block text-uppercase">Swift Code</label>
                                            <div className="js-form-message">
                                                <div className="input-group input-group-sm">
                                                    <input type="number"
                                                        className="form-control"
                                                        name="swiftCode"
                                                        value={this.state.swiftCode}
                                                        onChange={this.onChange}
                                                        placeholder="Swift code" aria-label="Swift code"
                                                        aria-describedby="swiftCode" 
                                                        required
                                                        data-msg="Please enter an valid swift code."
                                                        data-error-class="u-has-error"
                                                        data-success-class="u-has-success" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 mb-4">
                                            <label id="ibanNumber" className="h6 small d-block text-uppercase">Routing Number</label>
                                            <div className="js-form-message">
                                                <div className="input-group input-group-sm">
                                                    <input type="number"
                                                        className="form-control"
                                                        name="ibanNumber"
                                                        value={this.state.ibanNumber}
                                                        onChange={this.onChange}
                                                        placeholder="Iban Number" aria-label="Iban Number"
                                                        aria-describedby="ibanNumber" 
                                                        required
                                                        data-msg="Please enter an valid Iban number."
                                                        data-error-class="u-has-error"
                                                        data-success-class="u-has-success" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-sm btn-primary transition-3d-hover mr-1" onSubmit={this.onSubmit}>Request Transfer</button>
                <button type="submit" className="btn btn-sm btn-soft-secondary transition-3d-hover" onClick={this.cancelHandler}>Cancel</button>
              </div>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    userdetail: state.setCurrentUser.user,
})

  export default connect(mapStateToProps, { transfer })(Transfer);
