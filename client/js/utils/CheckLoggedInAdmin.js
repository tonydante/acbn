import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from './history';

const CheckLoggedInAdmin = (ComposedComponent) => {
  /**
   *
   */
  class Authenticate extends Component {
    /**
     * @return {*} set user authentication status
     */
    componentWillMount() {
      if (this.props.isAuthenticated) {
        history.push('/admin/dashboard/clients');
      }
    }
    /**
     *
     * @param {*} nextProps
     * @return {*} props
     */
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated) {
        history.push('/admin/dashboard/clients');
      }
    }
    /**
 * @return {DOM} DOM
 */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.setCurrentUser.isAuthenticated,
  });

  return connect(mapStateToProps, null)(Authenticate);
};
export default CheckLoggedInAdmin;