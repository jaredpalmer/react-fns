import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Fetch extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      data: this.props.initialValue,
      loading: true,
      error: null,
    };
    
    this.update(this.props);
  }
  
  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.url !== nextProps.url ||
      this.state.loading !== nextState.loading
    );
  }
  
  componentWillReceiveProps (props) {
    this.setState({ loading: true });
    this.update(props);
  }
  
  update (props) {
    const {
      url,
      transform = r => r.text(),
      cache = 'default',
      children,
      render,
      component,
      ...rest
    } = props;
    
    fetch(url, { cache, ...rest })
      .then(transform)
      .then(data => this.setState({ data, loading: false, error: null }))
      .catch(error => this.setState({ error }));
  }
  
  render () {
    const { children, render, component } = this.props;
    const { loading, data, error } = this.state;
    const renderProp = children || render || component;
    
    return renderProp({ loading, data, error });
  }
}

Fetch.propTypes = {
  initialValue: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  cache: PropTypes.oneOf([
    'default',
    'no-store',
    'reload',
    'no-cache',
    'force-cache',
  ]),
  url: PropTypes.string,
  transform: PropTypes.func,
  render: PropTypes.func,
  component: PropTypes.func,
  children: PropTypes.func,
};

const withFetch = ({ url, transform }) => Inner => () =>
  <Fetch
    url={url}
    transform={transform}
    render={props => <Inner {...props} />}
  />

export {
  Fetch,
  withFetch
}
