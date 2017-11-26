import { SharedRenderProps } from '../types';
import * as React from 'react';
import { isEmptyChildren } from '../utils/isEmptyChildren';
import { supportsVibrationAPI } from '../utils/featureDetection';

export type VibrationPattern = number | Array<number>;
export interface VibrationProps {
  vibrate: (pattern: VibrationPattern) => void;
  persistentVibrate: (pattern: VibrationPattern, interval?: number) => number;
  cancelVibrations: () => void;
}

export interface VibrationState {
  persistentVibrations: Array<number>;
}

export class Vibration extends React.Component<
  SharedRenderProps<VibrationProps>,
  VibrationProps & VibrationState
> {
  handleVibrate = (pattern: VibrationPattern) => {
    if (supportsVibrationAPI) {
      return navigator.vibrate(pattern);
    }
    return false;
  };

  handlePersistentVibrate = (pattern: VibrationPattern, interval?: number) => {
    //immediately start vibration, cancel persistency on pattern fail
    const result = this.handleVibrate(pattern);
    if (!result) {
      return result;
    }

    //calculate implicit interval based on the length of the vibration pattern
    if (!interval) {
      if (Array.isArray(pattern)) {
        interval = pattern.reduce((sum, value) => sum + value);
      } else {
        interval = pattern;
      }
    }

    //create new vibration on interval, and save the interval id
    const newPersistentVibration =
      window && window.setInterval(() => this.handleVibrate(pattern), interval);
    //push the new interval id to the list of ongoing vibrations
    const persistentVibrations = [
      ...this.state.persistentVibrations,
      newPersistentVibration,
    ];
    this.setState({ persistentVibrations });
    return result;
  };

  handleCancelVibrations = () => {
    // cancel current vibration
    this.handleVibrate(0);
    //clear all persistent vibrations
    this.state.persistentVibrations.forEach(
      intervalId => window && window.clearInterval(intervalId)
    );
    this.setState({ persistentVibrations: [] });
  };

  state = {
    vibrate: this.handleVibrate,
    persistentVibrate: this.handlePersistentVibrate,
    cancelVibrations: this.handleCancelVibrations,
    persistentVibrations: [] as Array<number>,
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
