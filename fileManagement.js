/* GLOBALS */
const fs = require('fs');

/**
 * @name writeJsonFile
 * @param {JSON} json 
 * @param {String} filePath 
 * @returns {Promise}
 * @todo error handling
 * @description writes JSON to a file path
 */
const writeJsonFile = (json, filePath) => {
  const stringify = (typeof json !== 'string') ? JSON.stringify(json) : json;
  fs.writeFile(filePath, stringify, 'utf-8', err => {if(err) throw err}); //no error handling, simple application
  console.log("writing file: ", filePath);
}

/**
 * @name readJsonFileSync
 * @param {String} filePath
 * @returns {JSON}
 * @todo error handling
 * @todo make async version
 * @description returns JSON from a file path
 */
const readJsonFileSync = filePath => {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

/**
 * @name fileExists
 * @param {String} filePath
 * @returns {Boolean}
 * @description returns true if file path exists, false if not.
 */
const fileExists = filePath => {
  return fs.existsSync(filePath);
}

/**
 * @name getPlantFilePath
 * @param {Integer} plantId
 * @returns {String} path for file
 * @todo will become deprecated once DB integrated
 * @description returns the file path for the plantID given.
 */
const getPlantFilePath = plantId => `./local/plant-${plantId}.json`;

module.exports.writeJsonFile = writeJsonFile;
module.exports.readJsonFileSync = readJsonFileSync;
module.exports.fileExists = fileExists;
module.exports.getPlantFilePath = getPlantFilePath;