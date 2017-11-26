import { SharedRenderProps } from '../types';
import * as React from 'react';
import { isEmptyChildren } from '../utils/isEmptyChildren';

export type VibrationPattern = number | Array<number>;
export interface VibrationProps {
  vibrate: (pattern: VibrationPattern) => void;
}

export class Vibration extends React.Component<
  SharedRenderProps<VibrationProps>,
  VibrationProps
> {
  handleVibrate = (pattern: VibrationPattern) => {
    navigator.vibrate(pattern);
  };

  state = {
    vibrate: this.handleVibrate,
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
