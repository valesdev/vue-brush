# vue-brush

[![Version](https://img.shields.io/npm/v/vue-brush.svg)](https://www.npmjs.com/package/vue-brush)
[![Downloads](https://img.shields.io/npm/dm/vue-brush.svg)](https://npmcharts.com/compare/vue-brush?minimal=true)
[![Issues](https://img.shields.io/github/issues/valesdev/vue-brush.svg)](https://github.com/valesdev/vue-brush/issues)
[![License](https://img.shields.io/npm/l/vue-brush.svg)](https://www.npmjs.com/package/vue-brush)

Gracefully load images, integrated with Vue.js.

[Live demo](https://open.vales.io/vue-brush/demo.html)

## Features

- Only 5.3KB minified while 2.3KB gzipped
- Integrated with Vue.js as a plugin
- Loading indicator and error indicator
- Able to specified aspect ratio of container
- Able to crop image overflowed
- Able to customize indicator styles

## Usage

Register the plugin first.

```js
import Vue from 'vue'
import vueBrush from 'vue-brush'

Vue.use(vueBrush)

new Vue()
```

Then, use it anywhere.

```vue
<template>
  <div id="app">
    <brush source="https://example.com/image.jpg" :ratio="1280 / 720" />
    <brush source="https://example.com/avatar.jpg" cropped />
  </div>
</template>
```

## Options

### `<brush>`

| Property | Type | Required | Description | Default |
| --- | --- | --- | --- | --- |
| `source` | String | N | The URL of image. | `null` |
| `ratio` | Number | N | The ratio of image width to height. | `1` |
| `cropped` | Boolean | N | Whether to crop image overflowed. | `false` |

## License

[MIT](http://opensource.org/licenses/MIT)
