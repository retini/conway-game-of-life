enum AsciiCharCodes {
	SPACE = 32,
	TAB = 9,
	NEW_LINE = 10,
	CARRIAGE_RETURN = 13,
	DELETE = 127,
}

// Return the escaped version of the non-printable characters contained in the
// provided string.
function escapeNonPrintableChars(char: string): string {
	const charCode = char.charCodeAt(0);
	switch (charCode) {
		case AsciiCharCodes.SPACE:
			return '\\s';
		case AsciiCharCodes.TAB:
			return '\\t';
		case AsciiCharCodes.NEW_LINE:
			return '\\n';
		case AsciiCharCodes.CARRIAGE_RETURN:
			return '\\r';
		default:
			if (charCode < AsciiCharCodes.SPACE || charCode === AsciiCharCodes.DELETE) {
				return '\\x' + charCode.toString(16).padStart(2, '0');
			}
			return char;
	}
}

export { escapeNonPrintableChars };
