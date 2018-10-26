![Repo Banner](./.github/repo-banner.png)

# The Platform

Browser API's turned into React Hooks and Suspense-friendly React elements for common situations.

```
npm i the-platform
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [DeviceMotion](#devicemotion)
- [DeviceOrientation](#deviceorientation)
- [Network](#network)
- [GeoPosition](#geoposition)
- [Scroll](#scroll)
- [WindowSize](#windowsize)
- [Locales](#locales)
- [Components](#components)
  - [`<Img>`](#img)
  - [`<Script>`](#script)
  - [`<Video>`](#video)
  - [`<Audio>`](#audio)
  - [`<Preload>`](#preload)
  - [`<Stylesheet>`](#stylesheet)
- [Todo](#todo)
- [Playing with Suspense](#playing-with-suspense)
- [Authors](#authors)

## DeviceMotion

Detect and retrieve current device Motion.

- `acceleration: DeviceMotionEvent.acceleration`
- `accelerationIncludingGravity: DeviceMotionEvent.accelerationIncludingGravity`
- `rotationRate: DeviceMotionEvent.rotationRate`
- `interval: DeviceMotionEvent.interval`

For more information about the DeviceMotion API,
[check out the MDN reference](https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion)

### `useDeviceMotion()`

```js
import React from 'react';
import { useDeviceMotion } from 'the-platform';

const Example = () => {
  const motion = useDeviceMotion();
  return <pre>{JSON.stringify(motion, null, 2)}</pre>;
};
```

## DeviceOrientation

Detect and retrieve current device orientation.

- `alpha: number`: value represents the motion of the device around the z axis,
  represented in degrees with values ranging from 0 to 360.
- `beta: number`: value represents the motion of the device around the x axis,
  represented in degrees with values ranging from -180 to 180. This represents a
  front to back motion of the device.
- `gamma: number`: value represents the motion of the device around the y axis,
  represented in degrees with values ranging from -90 to 90. This represents a
  left to right motion of the device.

For more information about the DeviceOrientation API,
[check out the MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation)

### `useDeviceOrientation()`

```javascript
import React from 'react';
import { useDeviceOrientation } from 'the-platform';

const Example = () => {
  const { alpha, beta, gamma, absolute } = useDeviceOrientation();
  return <pre>{JSON.stringify({ alpha, beta, gamma, absolute }, null, 2)}</pre>;
};

export default Example;
```

## Network

Retrieve network access from the browser.

- `online: boolean`: `true` if the browser has network access. `false`
  otherwise.
- `offlineAt?: Date`: Date when network connection was lost.

### `useNetwork()`

```javascript
import React from 'react';
import { useNetwork } from 'the-platform';

const Example = () => {
  const { online, offlineAt } = useNetwork();
  return (
    <div>
      {online ? 'Online!' : 'Offline'}
      {offlineAt && `Last connected ${offlineAt.toISOString()}`}
    </div>
  );
};

export default Example;
```

## GeoPosition

Retrieve Geo position from the browser.

- `isLoading: boolean`: `true` request status
- `coords?: Position`: Geoposition object. Has keys of `latitude` and
  `longitude`
- `error?: PositionError`: GeoPosition error. See MDN for shape.

### `useGeoPosition()`

```javascript
import React from 'react';
import { useGeoPosition } from 'the-platform';

const Example = () => {
  const { isLoading, coords, error } = useGeoPosition();
  return <div>{coords && `${cords.longitude}$,{coords.latitude}`}</div>;
};

export default Example;
```

## Scroll

- `x`: Horizontal scroll in pixels (`window.pageXOffset`)
- `y`: Vertical scroll in pixels (`window.pageYOffset`)

### `useScroll()`

Injects `window.pageYOffset` and `window.pageXOffset` as `x` and `y` props.

```javascript
import React from 'react';
import { useScroll } from 'the-platform';

const Example = () => {
  const { x, y } = useScroll();
  return (
    <div>
      Scroll Position: {x}, {y}
    </div>
  );
};

export default Example;
```

## WindowSize

- `width`: Width of browser viewport (`window.innerWidth`)
- `height`: Height of browser viewport (`window.innerHeight`)

### `useWindowSize()`

Injects `window.innerWidth` and `window.innerHeight` as `width` and `height`
props.

```javascript
import { useWindowSize } from 'the-platform';

const Example = () => {
  const { width, height } = useWindowSize();
  return (
    <div>
      Window size: {width}, {height}
    </div>
  );
};

export default Example;
```

## Locales

- `locales`: The current browser locales (`navigator.languages` or
  `navigator.language`)

### `useLocales()`

Injects canonical `navigator.languages` or `navigator.language` as `locales`
prop.

```javascript
import React from 'react';
import { useLocales } from 'the-platform';

const Example = () => {
  const { locales } = useLocales();
  return (
    <span>
      Right now the time and date is
      {new Intl.DateTimeFormat(locales).format(new Date())}
    </span>
  );
};

export default Example;
```

## Components

### `<Img>`

**props**

- `src: string`
- anything else you can pass to an `<img>` tag

```js
import React from 'react';
import { Img } from 'the-platform';

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <React.Placeholder delayMs={300} fallback={'loading...'}>
        <Img src="https://source.unsplash.com/random/4000x2000" />
      </React.Placeholder>
    </div>
  );
}

export default App;
```

### `<Script>`

**props**

- `src: string`
- `children?: () => React.ReactNode` - This render prop will only execute _after_ the script has loaded.
- `cache?`: Optionally pass your own instance of `react-cache`
- anything else you can pass to a `<script>` tag

```js
import React from 'react';
import { Script } from 'the-platform';

function App() {
  return (
    <div>
      <h1>Load Stripe.js Async</h1>
      <React.Placeholder delayMs={300} fallback={'loading...'}>
        <Script src="https://js.stripe.com/v3/" async>
          {() => console.log(window.Stripe) || null}
        </Script>
      </React.Placeholder>
    </div>
  );
}

export default App;
```

### `<Video>`

**props**

- `src: string`
- `cache?`: Optionally pass your own instance of `react-cache`
- anything else you can pass to a `<video>` tag

```js
import React from 'react';
import { Video } from 'the-platform';

function App() {
  return (
    <div>
      <h1>Ken Wheeler on a Scooter</h1>
      <React.Placeholder delayMs={300} fallback={'loading...'}>
        <Video
          src="https://video.twimg.com/ext_tw_video/1029780437437014016/pu/vid/360x640/QLNTqYaYtkx9AbeH.mp4?tag=5"
          preload="auto"
          autoPlay
        />
      </React.Placeholder>
    </div>
  );
}

export default App;
```

### `<Audio>`

**props**

- `src: string`
- `cache?`: Optionally pass your own instance of `react-cache`
- anything else you can pass to a `<audio>` tag

```js
import React from 'react';
import { Audio } from 'the-platform';

function App() {
  return (
    <div>
      <h1>Meavy Boy - Compassion</h1>
      {/* source: http://freemusicarchive.org/music/Meavy_Boy/EP_71_to_20/Compassion */}
      <React.Placeholder delayMs={300} fallback={'loading...'}>
        <Audio src="https://file-dnzavydoqu.now.sh/" preload="auto" autoPlay />
      </React.Placeholder>
    </div>
  );
}

export default App;
```

### `<Preload>`

Preload a resource with `<link rel="preload">`.

**More Info:**

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)
- [Google Developer Blog](https://developers.google.com/web/updates/2016/03/link-rel-preload)

**props**

- `href: string`
- `as: string` - resource type

```js
import React from 'react';
import { Preload, Script } from 'the-platform';

function App() {
  return (
    <div>
      <h1>Preload</h1>
      <React.Placeholder delayMs={300} fallback={'loading...'}>
        <Preload href="https://js.stripe.com/v3/" rel="preload" as="script" />
        <Script src="https://js.stripe.com/v3/" async />
      </React.Placeholder>
    </div>
  );
}

export default App;
```

### `<Stylesheet>`

Lazy load a stylesheet.

**props**

- `href: string`

```js
import React from 'react';
import { Stylesheet } from 'the-platform';

function App() {
  return (
    <div>
      <h1>Styles</h1>
      <React.Placeholder delayMs={300} fallback={'loading...'}>
        <Stylesheet href="style.css" />
      </React.Placeholder>
    </div>
  );
}

export default App;
```

## Todo

- [ ] `<IFrame>`
- [ ] `<Embed>`

## Playing with Suspense

If you want to play around with suspense features, you'll need to enable suspense somehow. That means either building React yourself. Or, using this handy dandy starter we made.

https://github.com/palmerhq/react-suspense-starter

## Authors

- [Jack Cross](https://twitter.com/crosscompile)
- [Jared Palmer](https://twitter.com/jaredpalmer)

---

MIT License
