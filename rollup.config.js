import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      modules: true, // Enable CSS modules
      extract: true, // Extract CSS to a file (optional, but recommended for libraries)
      minimize: true, // Minify CSS
      sourceMap: true,
    }),
  ],
  external: ['react', 'react-dom'],
};
