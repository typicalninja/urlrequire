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

	  describe('Custom script require', function () {
		const scriptLink = 'https://raw.githubusercontent.com/typicalninja493/urlrequire/main/example/example.js'
		it('Should require our custom script', function () {
			  const customScript = requireSync(scriptLink);

			  assert.equal(typeof customScript.add, 'function');
			  assert.equal(typeof customScript.multiply, 'function');
		});
	});

	describe('Option validation', function () {
		// expects a string, try providing a array
		const scriptLink = []
		it('It Should throw a Error due scriptLink being a array', function () {
			  assert.throws(() => {
				  requireSync(scriptLink);
			  })
		});

		it('It Should throw a Error due requestOptions being a array', function () {
			assert.throws(() => {
				requireSync('test', { requestOptions: [] });
			})
	  });
	});
});