const expect = require('chai').expect;
const fileManagment = require('../fileManagement');
const hyperParameters = require('../hyperParameters');
const fs = require('fs');

describe('fileManagment_writeJsonFile()', () => {
  it('should write file ./test2', () => {
    const jsonString = `{
      "imageUrl": "http://google.com",
      "labelAnnotations": [
        {
          "mid": "/m/0c9ph5",
          "locale": "",
          "description": "flower",
          "score": 0.9796295166015625,
          "confidence": 0,
          "topicality": 0.9796295166015625,
          "boundingPoly": null,
          "locations": [],
          "properties": []
        },
        {
          "mid": "/m/05s2s",
          "locale": "",
          "description": "plant",
          "score": 0.9753165245056152,
          "confidence": 0,
          "topicality": 0.9753165245056152,
          "boundingPoly": null,
          "locations": [],
          "properties": []
        }
      ]
    }`;
    const filePath = "./test2.json";
    
    fileManagment.writeJsonFile(jsonString, filePath);
    const result = fs.existsSync(filePath)

    expect(true).to.be.equal(result);
  });
});

describe('fileManagment_readJsonFileSync()', () => {
  it('should read file test.json', () => {
    const filePath = ".\\test\\test.json";
    const imageUrl = "http://google.com";
    const description1 = "flower";

    const json = fileManagment.readJsonFileSync(filePath);

    expect(imageUrl).to.be.equal(json[hyperParameters.imageUrl]);
    expect(description1).to.be.equal(json[hyperParameters.labelAnnotations][0][hyperParameters.description])    
  });
});

describe('fileManagment_fileExists()', () => {
  it('should check if file exists', () => {
    const filePath = ".\\test\\test.json";
    expect(true).to.be.equal(fileManagment.fileExists(filePath));
  });
});

//TODO: make function more generic on filepath.
describe('fileManagment_getPlantFilePath()', () => {
  it('should get plant.json file path', () => {
    const dummyPath = `./local/plant-1.json`
    expect(dummyPath).to.be.equal(fileManagment.getPlantFilePath(1));
  });
});