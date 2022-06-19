# Dank Memer API
This is an api wrapper built for Dank Memer's [Image Generation API](https://dankmemer.services).

[![](https://nodei.co/npm/dankmemerapi.png)](https://npm.im/dankmemerapi)

### Deprecation
As of writing this, Dank Memer has privatized their api and revoked most (if not all) api keys. If you are looking for a solution to this, I've made my own which you can see [here](https://imgen.yiff.rest). You can also use it through this module, by setting `baseURL` to `https://imgen.yiff.rest/api`. If you want to run it on your own, you can look at the [original source](https://github.com/DankMemer/imgen), or my [dockerized version](https://github.com/DonovanDMC/DMImageGen/tree/a4ec5d8eae4f4f646c8a84ab4060a6c1dc546cd4) (pre-rebranding, `Jun 19, 2022`).

## JavaScript Example:
```js
const DankMemerAPI = require("dankmemerapi");
const { writeFile } = require("fs/promises");
// only apiKey is required
const DMAPI = new DankMemerAPI({ apiKey: "api key", userAgent: "SomeUserAgent/1.0.0", baseURL: "https://dankmemer.services/api" });
DMAPI.abandon("text to provide").then(response => writeFile(`${__dirname}/abandon.png`, response.file));
```

## TypeScript Example:
```ts
import DankMemerAPI from "dankmemerapi";
import { writeFile } from "fs/promises";
// only apiKey is required
const DMAPI = new DankMemerAPI({ apiKey: "api key", userAgent: "SomeUserAgent/1.0.0", baseURL: "https://dankmemer.services/api" });
DMAPI.abandon("text to provide").then(response => writeFile(`${__dirname}/abandon.png`, response.file));
```

The return of the functions is this structure (using the TS interface as an example):
```ts
interface MemeRequestResponse {
    ext: string;
    mime: string;
    file: Buffer;
}
```
`ext` will be the file extension of what was returned, `mime` will be the mime type of what was returned, and `file` will be the actual data returned.

The only function that differentiates from this is the `yomomma` function, which returns just a string.
