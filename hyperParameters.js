module.exports.numberOfDescriptions = 3;
module.exports.labelAnnotations = 'labelAnnotations';
module.exports.description = 'description';
module.exports.imageUrl = 'imageUrl';

/**
 * @name changeTopN
 * @param {Integer} num 
 * @returns {void}
 * @description changes value of 'numberOfDescriptions'
 */
const changeTopN = num => {
  if(!isNaN(num) && num > 0) module.exports.numberOfDescriptions = parseInt(num); //dont need to worry about upper bound,
}
module.exports.changeTopN = changeTopN;