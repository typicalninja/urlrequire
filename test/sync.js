const { requireSync } = require('../dist/index.js');
var assert = require('assert');

describe('Sync', function() {
	  describe('Package name require', function () {
		  const pkgName = 'ms';
		  it('should Require the ms package', function () {
				const ms = requireSync(pkgName);
				assert.equal(typeof ms, 'function');
				assert.equal(ms('1m'), 60000);
		  });
	  });

	  describe('D', function () {
		const pkgName = 'ms';
		it('should Require the ms package', function () {
			  const ms = requireSync(pkgName);
			  assert.equal(typeof ms, 'function');
			  assert.equal(ms('1m'), 60000);
		});
	});
});