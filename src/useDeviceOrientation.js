import React, { useState } from 'react';

export function useDeviceOrientation(props) {
  const [state, setState] = useState({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false,
  });

  handleDeviceOrientation = e => {
    setState({
      beta: e.beta,
      alpha: e.alpha,
      gamma: e.gamma,
      absolute: e.absolute,
    });
  };

  useEffect(() => {
    window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  });

  return state;
}
