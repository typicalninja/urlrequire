// ability to use requireSync without defining it
const ms = requireSync('ms');


function convert(value) {
	return ms(value);
}

module.exports = convert