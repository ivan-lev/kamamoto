export default function floatHandler(value: number | '') {
	// if (value.toString().length && value.toString().slice(-2) === '..')
	// return value.toString().slice(0, -1);
	if (value.toString().length && value.toString().slice(-1) === '.')
		return value;
	if (Number.parseFloat(value.toString()).toString() === 'NaN')
		return '';
	else
		return Number.parseFloat(value.toString());
};
