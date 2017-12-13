---
id: installation
title: Installation
---

You can install react-fns with [NPM](https://npmjs.com),
[Yarn](https://yarnpkg.com), or good ol' `<script>` tag with
[unpkg.com](https://unpkg.com)

## NPM

```
npm install react-fns --save
```

## Yarn

```
yarn add react-fns
```

## CDN

react-fns also has a UMD build so you can use it with just a script tag if you'd
like. It is available via CDN on [unpkg.com](https://unpkg.com).

You can copy and paste the following into an html file and open it in a browser
to jump right in.

```html
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  <title>react-fns with script tags</title>
  <!-- Load React -->
  <script src="https://unpkg.com/react/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
  <!-- Load babel for JSX -->
  <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
  <script src="https://unpkg.com/react-fns@1.3.0/dist/index.umd.js"></script>
  <!-- Technically there is a minified production build too. -->
  <!-- <script src="https://unpkg.com/react-fns@1.3.0/dist/index.umd.min.js"></script> -->
</head>
<body>
<div id="root"></div>
<script type="text/babel">
  const DeviceMotion = window.ReactFns.DeviceMotion

  const App = () => {
    return (
      <DeviceMotion
        render={deviceMotionHelpers => (
          <pre>{JSON.stringify(deviceMotionHelpers, null, 2)}</pre>
        )}
      />
    );
  };

  ReactDOM.render(<App />, document.getElementById('root'));
</script>
</body>
</html>
```

All of the components will then be available on `window.ReactFns`. For example,
to use `<DeviceMotion>`, you would use `var DeviceMotion =
window.ReactFns.DeviceMotion` and then `<DeviceMotion>`.
