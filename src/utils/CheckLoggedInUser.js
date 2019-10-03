import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CheckLoggedInUser = (ComposedComponent) => {
  /**
   * @class Authenticate
   *
   * @extends {Component}
   */
  class Authenticate extends Component {
    /**
     * @method componentWillMount
     *
     * @return {object}  checks user authentication status
     */
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
    }
    /**
     * @method componentWillUpdate
     *
     * @param {nextProps} nextProps
     *
     * @return {object} props
     */
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
    }
    /**
     * @memberof Authenticate
     *
     * @return {Component-DOM} DOM
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
export default CheckLoggedInUser;