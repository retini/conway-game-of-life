function escapeNonPrintableChars(char: string): string {
	let charCode = char.charCodeAt(0);
	if (charCode === 32) {
		return '\\s';
	} else if (charCode === 9) {
		return '\\t';
	} else if (charCode === 10) {
		return '\\n';
	} else if (charCode === 13) {
		return '\\r';
	} else if (charCode < 32 || charCode === 127) {
		return '\\x' + charCode.toString(16).padStart(2, '0');
	}
	return char;
}

export { escapeNonPrintableChars };
