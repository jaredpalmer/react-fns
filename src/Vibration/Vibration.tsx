import { SharedRenderProps } from '../types';
import * as React from 'react';
import { isEmptyChildren } from '../utils/isEmptyChildren';
import { supportsVibrationAPI } from '../utils/featureDetection';

export type VibrationPattern = number | Array<number>;
export interface VibrationProps {
  vibrate: (pattern: VibrationPattern) => void;
  persistentVibrate: (pattern: VibrationPattern, interval: number) => void;
  cancelVibrations: () => void;
}

export interface VibrationState {
  currentPersistentVibrations: Array<number>;
}

export class Vibration extends React.Component<
  SharedRenderProps<VibrationProps>,
  VibrationProps & VibrationState
> {
  handleVibrate = (pattern: VibrationPattern) => {
    if (supportsVibrationAPI) {
      navigator.vibrate(pattern);
    }
  };

  handlePersistentVibrate = (pattern: VibrationPattern, interval: number) => {
    //create new vibration on interval, and save the interval id
    const newPersistentVibration =
      window && window.setInterval(() => this.handleVibrate(pattern), interval);
    //push the new interval id to the list of ongoing vibrations
    const currentPersistentVibrations = [
      ...this.state.currentPersistentVibrations,
      newPersistentVibration,
    ];
    this.setState({ currentPersistentVibrations });
  };

  handleCancelVibrations = () => {
    // cancel current vibration
    this.handleVibrate(0);
    //clear all persistent vibrations
    this.state.currentPersistentVibrations.forEach(
      intervalId => window && window.clearInterval(intervalId)
    );
    this.setState({ currentPersistentVibrations: [] });
  };

  state = {
    vibrate: this.handleVibrate,
    persistentVibrate: this.handlePersistentVibrate,
    cancelVibrations: this.handleCancelVibrations,
    currentPersistentVibrations: [],
  };

  render() {
    const { render, component, children } = this.props;
    return component
      ? React.createElement(component as any, this.state)
      : render
        ? (render as any)(this.state)
        : children // children come last, always called
          ? typeof children === 'function'
            ? children(this.state)
            : !isEmptyChildren(children) ? React.Children.only(children) : null
          : null;
  }
}
