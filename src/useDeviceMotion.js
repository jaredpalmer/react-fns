import React, { useState } from 'react';

export function useDeviceMotion(props) {
  const [state, setState] = useState({});

  handleDeviceMotion = e => {
    setState({
      acceleration: e.acceleration,
      accelerationIncludingGravity: e.accelerationIncludingGravity,
      rotationRate: e.rotationRate,
      interval: e.interval,
    });
  };

  useEffect(() => {
    window.addEventListener('devicemotion', handleDeviceMotion, true);
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  });
  return state;
}
