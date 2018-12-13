const GoogleVision = require('./googleVisionHelper');
const RecommendationSystem = require('./recommendSystemTopN');
const HyperParameters = require('./hyperParameters');
/**
 * @name start
 * @param {[String]} args
 * @return {void}
 * @description main function that will run the code.
 */
const start = async args => {
  /* Number of arguments validation */
  if(!argLengthValid(args)) {
    console.log("Need to enter arguments");
    console.log("Use --help command for more information")
    outputHelp();
    return null;
  }

  /* Help validation */
  if(args[0] == '--help') {
    outputHelp();
    return null;
  }

  /* Number of arguments validation */
  if(args[1]) {
    if(isNaN(args[1]))
      console.log(`NaN arg1 (numberOfDescriptions), will use default: ${HyperParameters.numberOfDescriptions}`);
    else if(args[1] < 1)
      console.log(`arg1 < 1, will use default: ${HyperParameters.numberOfDescriptions}`)
    else HyperParameters.changeTopN(args[1]);
  }

  /* URL validation */
  let url = args[0]; //will be number or a different url
  if(!isNaN(url)) {
    console.log("Error not a number: ", url);
    return null;
    
  }
  
  console.log("=====")

  /* Query URL */
  console.log("attempting to query url: ", url);

  // save input to fs. TODO: replace with db
  const jsonPromise = GoogleVision.getPlantJson(url)
    .then(jsonString => {
      if(!isNaN(args[0])) {
        if(!GoogleVision.isJsonSaved(args[0])) {
          GoogleVision.saveJson(jsonString, args[0])
        }
      }
      return jsonString;
    });

  
  /* Get Recommendations */
  const resultPromise = jsonPromise.then(jsonString => {
    const jsonListPromiseUnnormalised = GoogleVision.getOtherPlantJsons(args[0]);
    //change any strings to json format
    const jsonListPromiseNormalised = jsonListPromiseUnnormalised.then(jsonList => jsonList.map(json => 
      (typeof json === 'string') ? JSON.parse(json) : json
    ))
    return RecommendationSystem.getRecommendations(JSON.parse(jsonString), jsonListPromiseNormalised);
  });

  resultPromise.then(urlArray => console.log("images that are similar are: ", urlArray));
} 

/* Argument validation */
/**
 * @name argLengthValid
 * @param {Array} args
 * @returns {Boolean}
 * @description true if valid arguments, false if otherwise
 */
const argLengthValid = args => args.length > 0;

/* Argument operations */
/**
 * @name outputHelp
 * @param {void}
 * @returns {void}
 * @description return what arguments are required
 */
const outputHelp = () => {
  outputArg1();
  console.log("Arg 2: numberOfDescriptions (>0) : Default 3")
  // console.log("Arg 2: 'topn' || 'var' :: Default 'topn'"); // TODO: create variable recommendation system.
}

/**
 * @name outputArg1
 * @param {void}
 * @returns {void}
 * @description returns what argument 2 should be
 */
const outputArg1 = () => {
  console.log("Arg 1: URL");
}

module.exports.start = start;