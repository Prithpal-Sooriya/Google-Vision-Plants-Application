# Image Recommendation System
A short and interesting project that uses the Google Vision API, and recommends images (from a select database of plants) based on input image!

Currently looks through existing 20 plant images, but will expand to a larger data set.

Look through `Notes.md` to see my thought process of developing this small application.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org), and [Git](https://git-scm.com/) are installed.

Requires `key.json` file for the use of `Google Vision API`.
- Instructions can be found on [Google Vision website](https://cloud.google.com/vision/), just follow the instructions and documentation.

Once a `key.json` just use these code snippets to use Google Vision

```js
const client = vision({
  projectId: "PROJECT NAME",
  keyFilename: "./key.json",
});
```
```js
// returns a promise, 
client.annotateImage({
      image: {
        source: {imageUri: IMAGE_URL}
      },
      features: {type: vision.v1.types.Feature.Type.LABEL_DETECTION},
})
.then(json => /* what you wish to do with the resulting data */)
.catch(err => /* what you wish to do with resulting errors */)
```

### Installation

Simply install from Install directly from [Github repo]().

Once you have placed a `key.json` you can install dependencies and run the code
- NOTE: need to give 2 arguments, use `--help` command to see which arguments are required.

```bash
git clone <repo url>
cd <repo>
npm install
npm start --help
```

You can also test by running

```bash
npm test
```
