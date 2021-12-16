const assert = require('assert')
const axios = require('axios')
const path = require('path')
const expect = require('chai').expect;

const nockback = require('./nockback')(path.resolve(__dirname, './fixtures'))
const httpClient = axios.create({baseURL: `http://localhost:3000`});

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('API', function() {
  describe('GET /some-api', function() {
    beforeEach(nockback.beforeEach)
    afterEach(nockback.afterEach)

    it('should response with json data', async function() {
      const response = await httpClient.get('/some-api')

      expect(response.data.product.title).to.equal('Soft Baked Variety Pack (6 Boxes)');
    });
  });
});
