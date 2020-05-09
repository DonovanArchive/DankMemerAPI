# Dank Memer API
This is an api wrapper built for Dank Memer's [Image Generation API](https://dankmemer.services).

## JavaScript Example:
```js
const DankMemerAPI = require("dankmemerapi");
const fs = require("fs");
// User agent (second param) is not required.
const DMAPI = new DankMemerAPI("api key", "SomeUserAgent/1.0.0");
DMAPI.abandon("text to provide").then(response => fs.writeFileSync(`${__dirname}/abandon.png`, response.file));
```

## TypeScript Example:
```ts
import DankMemerAPI from "dankmemerapi";
import * as fs from "fs";
// User agent (second param) is not required.
const DMAPI = new DankMemerAPI("api key", "SomeUserAgent/1.0.0");
DMAPI.abandon("text to provide").then(response => fs.writeFileSync(`${__dirname}/abandon.png`, response.file));
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


## Caching
In the options for the constructor, there's an option at the end, `cacheRequests`. This sends requests through an api of mine, `https://api.furry.bot`. It saves the responses from Dank Memer's api so it only ever fetches them once. Every other time they're fetched after the first, they're served from disk. it may not be noticeable for most endpoints, but for the video endpoints, it can save multiple seconds, and can shred the ratelimits on those endpoints due to my api being much nicer with ratelimits, especially since it's just serving things from disk most of the time.
