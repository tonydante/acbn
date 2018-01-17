const initialState = {
  signup: {
    username: '',
    email: '',
    fullname: '',
    loggedIn: false,
    password: ''
  },

  userDetails: {
    username: '',
    email: '',
    fullname: '',
  },

  search: {
    searchTerm: '',
    result: []
  },

  login: {
    username: '',
    password: '',
    isLoggedIn: false
  },


  forgotPassword: {
    email: ''
  },

  resetPassword: {
    newPassword: '',
    confirmPassword: '',
    class: 'reset'
  },

  editIdea: {
    title: '',
    description: '',
    category: '',
    status: ''
  },

  setCurrentUser: {
    isAuthenticated: false,
    user: {}
  },

};

export default initialState;