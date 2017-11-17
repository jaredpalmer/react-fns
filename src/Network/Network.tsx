import * as React from "react";
import { SharedRenderProps } from "../types";
import { isEmptyChildren } from "../utils";

export interface NetworkProps {
  online: boolean;
  offlineAt?: Date;
}

export class Network extends React.Component<
  SharedRenderProps<{}>,
  NetworkProps
> {
  state: NetworkProps = { online: false };

  handleOnline = () => {
    this.setState({ online: true, offlineAt: undefined });
  };

  handleOffline = () => {
    this.setState({ online: false, offlineAt: new Date() });
  };

  componentDidMount() {
    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleOnline);
    window.removeEventListener("offline", this.handleOffline);
  }

  render() {
    const { render, component, children, ...props } = this.props;
    return component
      ? React.createElement(component as any, props)
      : render
        ? (render as any)(props)
        : children // children come last, always called
          ? typeof children === "function"
            ? children(this.state)
            : !isEmptyChildren(children) ? React.Children.only(children) : null
          : null;
  }
}
