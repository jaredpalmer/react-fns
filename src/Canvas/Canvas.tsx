import * as React from 'react';
import { isEmptyChildren } from '../utils';

export interface CanvasConfig {
  width?: number;
  height?: number;
  className?: string;
  style?: object;
}

export interface CanvasCtx {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export interface RenderWithSideEffect<T> {
  render?: ((props: T) => void);
  children?: ((props: T) => void) | React.ReactNode;
}

export class Canvas extends React.Component<
  CanvasConfig & RenderWithSideEffect<CanvasCtx>
> {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');

    if (this.props.render) {
      this.props.render({ canvas: this.canvas, ctx: this.ctx });
    } else if (typeof this.props.children === 'function') {
      this.props.children({ canvas: this.canvas, ctx: this.ctx });
    }
  }

  render() {
    const { children, width, height, className, style } = this.props;

    return (
      <canvas
        width={width}
        height={height}
        className={className}
        style={style}
        ref={el => (this.canvas = el)}
      >
        {typeof children !== 'function' &&
          !isEmptyChildren(children) &&
          React.Children.only(children)}
      </canvas>
    );
  }
}
