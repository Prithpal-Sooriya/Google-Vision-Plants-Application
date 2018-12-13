const expect = require('chai').expect;
const hyperParameters = require('../hyperParameters');

describe('hyperParameters_changeTopN()', () => {
  it('should change number of descriptions', () => {
    const x = 10;

    hyperParameters.changeTopN(10);
    const result = hyperParameters.numberOfDescriptions;

    expect(x).to.be.equal(result);
  });
});