const babel = require('@babel/core')
const rollup = require('rollup')
const path = require('path')
const fs = require('fs')
const virtual = require('@rollup/plugin-virtual')
const commonjs = require('@rollup/plugin-commonjs')

const babelOptions = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'last 2 versions',
        modules: false,
        spec: true,
        forceAllTransforms: true,
        useBuiltIns: 'usage',
        corejs: {
          version: '3',
        },
      },
    ],
  ],
}

module.exports = function (snowpackConfig, pluginOptions) {
  const options = Object.assign(
    {
      filePath: 'scripts/legacy.js',
      babelOptions: babelOptions
    },
    pluginOptions,
  )

  return {
    name: 'legacy-bundle',
    async optimize({ buildDirectory }) {

      const fullPath = path.join(buildDirectory, options.filePath)

      if (fs.existsSync(fullPath)) {
        let transpiled = await babel.transformFileAsync(
          fullPath,
          options.babelOptions,
        )

        const inputOptions = {
          input: fullPath,
          plugins: [
            commonjs(),
          ],
        }

        const outputOptions = {
          format: 'iife',
          file: fullPath
        }

        const bundle = await rollup.rollup(inputOptions)

        await bundle.write(outputOptions)

      }

    }

  }

}
