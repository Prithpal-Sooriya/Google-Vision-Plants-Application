/* Globals */
const HyperParameters = require('./hyperParameters');

/* General Purpose Functions */
//no inbuilt flatmap, define own
const concat = (x, y) => x.concat(y);
const flatMap = (f, xs) => xs.map(f).reduce(concat, []);

/**
 * given a json input, will product recommended json/image outputs
 * 
 * from some [research](https://www.analyticsvidhya.com/blog/2018/06/comprehensive-guide-recommendation-engine-python/), will use "Content based filtering" to produce a simple recommendation --> will go through Top-n approach first
 * 
 * - Issue with topN approach: lower score values seem to be more specific (e.g. flower species/genus) thus lose precision in some recommendations.
 *  - if input is flower, will show all other flowers!
 * 
 * TODO: create variable recommendation system that will check through more descriptions and need to meet a threshold (match certain amount of descriptions) to show url.
 *  - threshold could be need x amount of matches (40% matches)
 */

/**
 * @name getMapUrlDescriptions
 * @param {JSON} json 
 * @param {Integer} numberOfDescriptions 
 * @param {HashMap} hashmap
 * @description maps unique URL (key) to [String] descriptions
 */
const getMapUrlDescriptions = (json, numberOfDescriptions, hashmap = new Array()) => {
  //add each word if given sentence
  try{
    const descriptions = flatMap(
      obj => {if(obj["description"]) return obj["description"].split(" ")},
      json[HyperParameters.labelAnnotations].slice(0, numberOfDescriptions)
    );
    hashmap[json[HyperParameters.imageUrl]] = descriptions;
    return hashmap;
  }
  catch {
    console.log("Error getting json descriptions"); //should indicate which json file is missing
  }
}

/**
 * @name compareDescriptions
 * @param {[String]} desc1 
 * @param {[String]} desc2 
 * @returns {Boolean}
 * @description returns true if any of the values in array are included in 2nd array
 */
const compareDescriptions = (desc1, desc2) => {
  if(desc1.length == 0 || desc2.length == 0) {
    return null; // no urls found
  }

  return desc1.some(desc => desc2.includes(desc)); //O(n^2)
}

/**
 * @name getRecommendations
 * @param {JSON} jsonInput
 * @param {Promise([JSON])} jsonListPromise
 * @returns {[String]} urls
 * @description returns all recommended urls from input json and list of JSON (20 images)
 */
const getRecommendations = async (jsonInput, jsonListPromise) => {
  /* get input mapping */
  const inputMap = getMapUrlDescriptions(jsonInput, HyperParameters.numberOfDescriptions)

  /* get list mapping */
  const listMap = new Array();
  await jsonListPromise.then(jsonList => {
    jsonList.forEach(json => getMapUrlDescriptions(json, HyperParameters.numberOfDescriptions, listMap))
  });

  // log check
  // for(let key in inputMap) console.log(`${key} : ${inputMap[key]}`);
  // for(let key in listMap) console.log(`${key} : ${listMap[key]}`);

  /* Get recommended URLs */
  const urls = new Array();
  let inputKey;
  for(key in inputMap) {
    inputKey = key;
    break;
  }
  for(listKey in listMap) {
    if (compareDescriptions(inputMap[inputKey], listMap[listKey])) {
      urls.push(listKey); //in case multiple inputs, scalable.
    }
  }
  return urls;
}



/* Test code */
const test = async () => {
  const fs = require('./fileManagement');
  const googleVision = require('./googleVisionHelper');
  const plantNumber = 6;
  const result = await getRecommendations(fs.readJsonFileSync(fs.getPlantFilePath(plantNumber)), googleVision.getOtherPlantJsons(plantNumber));
  console.log("result: ", result);
}
// test();

/* Exports */
module.exports.getRecommendations = getRecommendations;