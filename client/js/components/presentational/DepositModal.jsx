import React, {Component}from 'react';
import { connect } from 'react-redux';
import { deposit } from './../../actions/user';
/**
 *
 *
 * @export
 * @class DepositModal
 * @extends {Component}
 */
class DepositModal extends Component {

  /**
   *Creates an instance of DepositModal.
   * @param {*} props
   * @memberof DepositModal
   */
  constructor(props) {
    super(props)
    this.state = {
      amountToTransfer: '',
      transferDescription: '',
      date: '',
      dismiss: true
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

/**
 * 
 * 
 * @memberof Dashboard
 * @returns {void}
 */
componentDidMount() {
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
}
  /**
 *
 * Gets the value from each input in the form
 * @param {*} event
 * @memberof DepositModal
 * @return {void}
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value})
    const {transferDescription, amountToTransfer, date} = this.state;
    if(amountToTransfer != '' && transferDescription != '' && date != '') {
      return this.setState({
        dismiss: false
      })
    }
  }

  /**
  *
  * Call the api function with data from the state
  * @param {*} event
  * @memberof DepositModal
  * @return {void}
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.deposit(this.props.userid, this.state);
    this.setState({
      amountToTransfer: '',
      transferDescription: '',
      date: ''
    })
  }

  /**
   *
   *
   * @returns {void}
   * @memberof DepositModal
   */
  render() {
    return (
      <div>
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">Make a transfer</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <div className="input-field">
              <input
                type="number"
                name="amountToTransfer"
                className="form-control"
                required
                pattern="[0-9]*"
                title="e.g. 0-9"
                value={this.state.amountToTransfer}
                onChange = {this.onChange}
                autoComplete="off"
                placeholder="Enter transfer amount"
              />
            </div>
            <div className="input-field">
            <input
              type="text"
              name="transferDescription"
              className="form-control"
              value={this.state.transferDescription}
              onChange = {this.onChange}
              required
              autoComplete="off"
              placeholder="Enter transfer description"
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              name="date"
              pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"
              className="form-control"
              value={this.state.date}
              onChange = {this.onChange}
              required
              autoComplete="off"
              placeholder="Enter a date in format dd-mm-yyyy"
            />
          </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-override" data-dismiss="modal">cancel</button>
                <button 
                type="button" 
                className="btn btn-primary btn-override" 
                data-dismiss="modal" 
                onClick={this.onSubmit}
                disabled={this.state.dismiss}
                >Transfer</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      )
  }
}

export default connect(null, { deposit })(DepositModal)
