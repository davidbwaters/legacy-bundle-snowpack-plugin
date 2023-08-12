...
  plugins: [
    'legacy-bundle-snowpack-plugin',
...

# Legacy Bundle Snowpack Plugin
This is a Snowpack plugin that provides a dead simple way to add a legacy bundle and implement differential serving for browsers that don't support modules.  

It transpiles code and adds basic Pollyfills with Babel and uses Rollup to build a legacy bundle. By loading the bundle with `<script nomodule ...`, the bundle is only used in older browsers and the everybody else gets all the benefits and speed of ES modules and bundler-free experience Snowpack offers.  Works with CJS modules, too.

---

## Setup
Setup is super simple. First install:
`npm install --dev legacy-bundle-snowpack-plugin`
or
`yarn add --dev legacy-bundle-snowpack-plugin`

---

Add a script file for your legacy code and add `imports` for your entry point and any non-Babel pollyfills you want to add:

`src/scripts/legacy.js`
```
// Legacy

@import index.js
@import { somePoly } from 'polyfill'

...
```
---

Add the plugin to your Snowpack config:
`snowpack.config.js`
```
...
  plugins: [
    'legacy-bundle-snowpack-plugin',
...
```
Or with one of the options.  `filePath` is relative to the build directory and defaults to 'scripts/legacy.js' which is build/scripts/legacy.js and built from src/scripts/legacy.js in my setup.
```
...
  plugins: [
    [ 'legacy-bundle-snowpack-plugin',
      { 
        filePath: 'scripts/legacy.js', 
        babelConfig: { ... } 
      }
    ]
  ]
...
```
---
Finally, just add it to your `index.html` under your main script.  Make sure to load the normal/modern version with `type=module` and this one as `nomodule` (just the attribute)
```
...
    <script type="module" src="/scripts/main.js"></script>
    <script nomodule src="/scripts/legacy.js"></script>
  </body>
</html>
```

Now run build and the output of legacy.js should be an old-school bundle.  That's it.

---
