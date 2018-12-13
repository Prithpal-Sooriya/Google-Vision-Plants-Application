const expect = require('chai').expect;
const googleVision = require('../googleVisionHelper');
const hyperParameters = require('../hyperParameters');
const fs = require('fs');

describe('googleVisionHelper_plantImageUrl()', () => {
  it('should get image url', () => {
    const url = 'https://storage.googleapis.com/candide-developer-test-plants/1.jpg';
    const result = googleVision.plantImageUrl(1)
    expect(url).to.be.equal(result);
  });
});


describe('googleVisionHelper_getPlantJson()', () => {
  it('should get plant json', () => {
    const url = 'https://storage.googleapis.com/candide-developer-test-plants/1.jpg';
    const result = googleVision.getPlantJson(url);
    expect(url !== "").to.be.equal(result !== "");
  });
});

//TODO: large computational function (requires time to get all 20 files)
describe('googleVisionHelper_getOtherPlantJsons()', () => {
  it('should get other plant json', async () => {
    let expected = 20;
    let result = await googleVision.getOtherPlantJsons("abc");
    expect(expected).to.be.equal(result.length);
    // get all 20 files

    expected = 19;
    result = await googleVision.getOtherPlantJsons(1);
    expect(expected).to.be.equal(result.length);
    // get 20 - 1 (suppose input image is from 20 given images.)
  });
});

describe('googleVisionHelper_isJsonSaved()', () => {
  it('should check if json is saved', () => {
    const filePath = '.\\local\\plant-1.json';
    const plantId = 1;
    
    const expected = fs.existsSync(filePath);
    const result = googleVision.isJsonSaved(plantId);
    expect(expected).to.be.equal(result);
  });
});