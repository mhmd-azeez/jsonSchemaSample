## JSON Schema issue

```
PS D:\x\xtp\jsonSchemaSample> npm run build

> jsonSchemaSample@1.0.0 build
> npx tsc --noEmit && node esbuild.js && extism-js dist/index.js -i src/index.d.ts -o dist/plugin.wasm

thread '<unnamed>' panicked at crates/core/src/lib.rs:21:10:
Could not eval main script: Uncaught SyntaxError: invalid escape sequence in regular expression
    at script.js:3388

note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
Error: the `wizer.initialize` function trapped

Caused by:
    0: error while executing at wasm backtrace:
           0: 0xb5c23 - <unknown>!<wasm function 1154>
           1: 0xc8f3c - <unknown>!<wasm function 1288>
           2: 0xca4cf - <unknown>!<wasm function 1308>
           3: 0x1b55e - <unknown>!<wasm function 83>
           4: 0xcd897 - <unknown>!<wasm function 1349>
    1: wasm trap: wasm `unreachable` instruction executed

Stack backtrace:
   0: <unknown>
   1: <unknown>
   2: _jit_debug_register_code
   3: _jit_debug_register_code
   4: <unknown>
   5: <unknown>
   6: <unknown>
   7: <unknown>
   8: <unknown>
   9: <unknown>
  10: <unknown>
  11: <unknown>
  12: <unknown>
  13: _jit_debug_register_code
  14: BaseThreadInitThunk
  15: RtlUserThreadStart
Error: Couldn't create wasm from input

Stack backtrace:
   0: <unknown>
   1: <unknown>
   2: _jit_debug_register_code
   3: <unknown>
   4: <unknown>
   5: <unknown>
   6: <unknown>
   7: <unknown>
   8: _jit_debug_register_code
   9: BaseThreadInitThunk
  10: RtlUserThreadStart
PS D:\x\xtp\jsonSchemaSample> 
```