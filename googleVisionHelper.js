/* GLOBALS */
const vision = require("@google-cloud/vision");
const FileManagement = require('./FileManagement');
const client = vision({
  projectId: "evaluation-182517",
  keyFilename: "./key.json",
});

/**
 * @name getPlantJson
 * @param {String} imageUrl 
 * @returns {Promise} that will return JSON
 * @description promise will get json, filter it (and maybe cache)
 */
const getPlantJson = imageUrl => {
  return client.annotateImage({
      image: {
        source: {imageUri: imageUrl}
      },
      features: {type: vision.v1.types.Feature.Type.LABEL_DETECTION},
    })
    .then(json => filterGVisionJson(json, imageUrl))
    .then(result => JSON.stringify(result, null, 2));
}

/**
 * @name getOtherPlantJsons
 * @async
 * @param {Integer} plantId 
 * @returns {[JSON String]}
 * @description gets all other plantId's (data collection) for the recommendation system.
 */
const getOtherPlantJsons = async plantId => {
  //if was not given an id, then get all jsons
  const jsonList = new Array();
  const isNumber = !isNaN(plantId);
  
  //TODO: make constants (represents number of images in storage)
  for(let i = 1; i <= 20; i++) {
    if(isNumber && plantId == i){} //push nothing as plantid will be input (if number)
    else jsonList.push(await getJSON(i));
  }

  return jsonList;
}

/**
 * @name getJSON
 * @async
 * @param {Integer} plantId
 * @return {JSON}
 * @todo need to integrate with DB not with fs.
 * @description gets JSON from given plantId
 */
const getJSON = async plantId => {
  const filePath = FileManagement.getPlantFilePath(plantId);
  if(FileManagement.fileExists(filePath)) {
    //get json from file
    return await FileManagement.readJsonFileSync(filePath); //return JSON
  }
  else {
    //get json from API (also save file)
    // const url = plantImageUrl(plantId);
    // if(!(url instanceof RangeError)) {
    //   console.log("hello world")
    //   return await getPlantJson(url).then(jsonStr => saveJson(jsonStr, plantId)).catch(err => err);
    // }
  }
}

/**
 * @name isJsonSaved
 * @param {Integer} plantId 
 * @returns {Boolean}
 * @description returns true if corresponding JSON file exists for plantId, otherwise false
 */
const isJsonSaved = plantId => {
  return FileManagement.fileExists(FileManagement.getPlantFilePath(plantId));
}

/**
 * 
 * @param {JSON} json 
 * @param {Integer} plantId 
 * @returns {String}
 * @todo return Promise rather than json?
 * @description saves JSON from corresponding plantId
 */
const saveJson = (json, plantId) => {
  FileManagement.writeJsonFile(json, FileManagement.getPlantFilePath(plantId));
  return json;
}

/**
 * @name filterGVisionJson
 * @param {JSON} json
 * @returns {JSON}
 * @todo make generic and add validation
 * @description filters out to only return important data from JSON
 */
const filterGVisionJson = (json, url) => {
  const newJson = JSON.parse(`{"imageUrl":"${url}"}`);
  newJson['labelAnnotations'] = json[0].labelAnnotations;
  return newJson;
}

// module.exports.plantImageUrl = plantImageUrl;
module.exports.getPlantJson = getPlantJson;
module.exports.saveJson = saveJson;
module.exports.isJsonSaved = isJsonSaved;
module.exports.getOtherPlantJsons = getOtherPlantJsons;