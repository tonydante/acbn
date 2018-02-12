import * as types from '../app/constants';

const initialState = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  accountNumber: '',
  balance: '',
  availableCredit: '',
  currentCreditLimitedAmount: '',
  lastPaymentDate: '',
  lastPaymentAmt: '',
  totalMinAmtDue: '',
  paymentDueDate: '',
  rewardBal: '',
  lastLogin: ''
}

const userAccDetails = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_USERACCDETAILS_SUCCESS:
      return Object.assign(...state, action.details);


    case types.GET_USERACCDETAILS_ERROR:
      return [];

    default:
      return state;
  }
};

export default userAccDetails;
