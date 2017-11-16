import * as React from "react";
import { SharedRenderProps } from "../types";
import { isEmptyChildren } from "../utils";

export interface ScrollProps {
  x: number;
  y: number;
}

export class Scroll extends React.Component<
  SharedRenderProps<{}>,
  ScrollProps
> {
  state: ScrollProps = { x: 0, y: 0 };

  handleWindowScroll = () => {
    this.setState({ x: window.scrollX, y: window.scrollY });
  };

  componentDidMount() {
    this.handleWindowScroll();
    window.addEventListener("scroll", this.handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleWindowScroll);
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
