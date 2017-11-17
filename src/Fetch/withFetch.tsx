import React from 'react';
import Fetch from './Fetch';

// TODO: hoistStatics

const withFetch = ({ url, transform }) => Inner => () =>
  <Fetch
    url={url}
    transform={transform}
    render={props => <Inner {...props} />}
  />

export default withFetch
