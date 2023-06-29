THIS FILE IS GENERATED.THIS FILE IS GENERATED. THIS FILE IS GENERATED.

# Purpose of this folder
Put your backend **mocha** tests (with *.test.ts extension) in this folder or any other *tests*
folder inside project.

```
/src/lib/my-feature/features.test.ts                          # -> NOT ok, test omitted
/src/lib/my-feature/tests/features.test.ts                    # -> OK
/src/lib/my-feature/nested-feature/tests/features.test.ts     # -> OK
```


# How to test your isomorphic backend ?

1. By using console select menu:
```
firedev test                   # single run
firedev test:watch             # watch mode
firedev test:debug             # and start "attach" VSCode debugger
firedev test:watch:debug       # and start "attach" VSCode debugger
```

2. Directly:
```
firedev mocha                        # single run
firedev mocha:watch                  # watch mode
firedev mocha:debug                  # and start "attach" VSCode debugger
firedev mocha:watch:debug            # and start "attach" VSCode debugger
```

# Example
example.test.ts
```ts
import { describe, before, it } from 'mocha'
import { expect } from 'chai';

describe('Set name for function or class', () => {

  it('should keep normal function name ', () => {
    expect(1).to.be.eq(Number(1));
  })
});
```

THIS FILE IS GENERATED.THIS FILE IS GENERATED. THIS FILE IS GENERATED.

          