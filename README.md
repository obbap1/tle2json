# Two Line Element sets to JSON (tle2json) 🚴🏾‍♀️

This helps convert the two line element format to JSON.

![Original](https://res.cloudinary.com/pbaba/image/upload/v1589652610/Screenshot_2020-05-16_at_7.02.18_PM_md6ktx.png)

![Transform](https://res.cloudinary.com/pbaba/image/upload/v1589652604/Screenshot_2020-05-16_at_6.44.58_PM_b45huo.png)

# Usage

```js
const TLE2JSON = require('tle2json');

// This URL helps Track the Starlink and Falcon 9 Satellites
const data = await TLE2JSON.convert({
  url: 'https://celestrak.com/NORAD/elements/starlink.txt'
});

// Write output to a particular file
await TLE2JSON.convert({
  url: 'https://celestrak.com/NORAD/elements/starlink.txt',
  path: '/Users/pwewe/data.json'
});
```

# Parameters

1. url : The url to the location of the Two line element set.
2. path : The location to where the file should be written to. optional.

# Algorithm

https://en.wikipedia.org/wiki/Two-line_element_set
