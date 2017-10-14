import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';

const shared = {
  entry: `compiled/index.js`,
  sourceMap: true,
  external: ['react'],
  globals: {
    react: 'React',
  },
  exports: 'named',
};

export default [
  Object.assign({}, shared, {
    moduleName: 'RenderProps',
    format: 'umd',
    dest:
      process.env.NODE_ENV === 'production'
        ? './dist/index.umd.min.js'
        : './dist/index.umd.js',
    plugins: [
      resolve(),
      replace({
        exclude: 'node_modules/**',
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        ),
      }),
      commonjs(),
      sourceMaps(),
      process.env.NODE_ENV === 'production' && filesize(),
      process.env.NODE_ENV === 'production' && uglify(),
    ],
  }),
  Object.assign({}, shared, {
    targets: [
      { dest: 'dist/index.es6.js', format: 'es' },
      { dest: 'dist/index.js', format: 'cjs' },
    ],
    plugins: [resolve(), sourceMaps()],
  }),
];
