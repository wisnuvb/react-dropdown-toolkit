import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
`import typescript from "@rollup/plugin-typescript";`;
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import { createRequire } from "node:module";
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile("./package.json");

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
        exports: "default",
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external: ["react", "react-dom"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.build.json",
        outputToFilesystem: true,
        declaration: true,
        declarationDir: "dist/types",
      }),
      postcss({
        extract: true,
        minimize: true,
        sourceMap: true,
        // extensions: [".css"],
      }),
      terser(),
    ],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    // external: [/\.css$/],
  },
];
