function add(...numbers) {
	  return numbers.reduce((acc, number) => acc + number, 0);
}

function multiply(...numbers) {
	  return numbers.reduce((acc, number) => acc * number, 1);
}

function divide(...numbers) {
	  return numbers.reduce((acc, number) => acc / number, 1);
}

function subtract(...numbers) {
	  return numbers.reduce((acc, number) => acc - number, 0);
}

function addStrings(...strings) {
	  return strings.reduce((acc, string) => acc + string, '');
}

module.exports = {
	add,
	multiply,
	divide,
	subtract,
	addStrings
}