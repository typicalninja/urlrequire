function isInstalled(packageName: string) {
	try {
		require(packageName);
		return true;
	} catch {
		return false;
	}
}

function isUrl(string: string) {
	try {
		new URL(string)
		return true;
	}
	catch {
		return false
	}
}

function optionalRequire(packageName: string) {
	if(isInstalled(packageName)) {
		return require(packageName)
	}
	return undefined;
}


const RequireTypes = {
	async: ['async', 'requireAsync', '_requireAsync'],
	sync: ['sync', 'requireSync', '_requireSync'],
}

export {
	isInstalled,
	isUrl,
	optionalRequire,
	RequireTypes
}