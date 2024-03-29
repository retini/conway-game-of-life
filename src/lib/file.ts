import { escapeNonPrintableChars } from '../utils/chars';
import { ConwayData } from './conway';

const MAX_FILE_SIZE = 3145728;
const MAX_ROWS = 500;
const MAX_COLUMNS = 500;

const checkConwayFile = (file: File): void => {
	if (file.size > MAX_FILE_SIZE) {
		throw new Error('File should be smaller than 3MB');
	}
	if (file.type !== 'text/plain') {
		throw new Error('File should be a .txt file');
	}
};

const parseConwayFile = (file: File): Promise<ConwayData> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (): void => {
			const content = reader.result as string;
			const lines = content.trim().split('\n');
			if (lines.length === 0) {
				reject(new Error(`Unexpected empty file`));
				return;
			}

			// Parse the generation number.
			if (lines[0] === '' || lines[0] == null) {
				reject(new Error(`Missing generation number`));
				return;
			}
			const generationNumberChar = lines[0].split(' ')[1].split(':')[0];
			const generationNumber = parseInt(generationNumberChar, 10);
			if (Number.isNaN(generationNumber)) {
				reject(
					new Error(
						`Expected the generation number to be a number, instead got "${escapeNonPrintableChars(
							generationNumberChar
						)}"`
					)
				);
				return;
			}

			// Parse the grid sizes.
			if (lines[1] === '' || lines[1] == null) {
				reject(new Error(`Missing grid sizes`));
				return;
			}
			const rowsChar = lines[1].split(' ')[0];
			const rows = parseInt(rowsChar, 10);
			if (Number.isNaN(rows)) {
				reject(
					new Error(
						`Expected the grid rows value to be a number, instead got "${escapeNonPrintableChars(
							rowsChar
						)}"`
					)
				);
				return;
			}
			const columnsChar = lines[1].split(' ')[1];
			const columns = parseInt(columnsChar, 10);
			if (Number.isNaN(columns)) {
				reject(
					new Error(
						`Expected the grid columns value to be a number, instead got "${escapeNonPrintableChars(
							columnsChar
						)}"`
					)
				);
				return;
			}
			const size = { rows, columns };

			// Limit the maximum number of rows and columns.
			if (rows > MAX_ROWS) {
				reject(new Error(`The current limit for the rows number is 500, you have set ${rows}"`));
				return;
			}
			if (columns > MAX_COLUMNS) {
				reject(new Error(`The current limit for the columns number is 500, you have set ${columns}"`));
				return;
			}

			// Parse the population state.
			const population: string[][] = [];
			if (lines.slice(2).length === 0) {
				reject(new Error(`Missing population state`));
				return;
			}
			for (const line of lines.slice(2)) {
				const characters: string[] = [];
				for (const char of line.trim().split('')) {
					if (char !== '.' && char !== '*') {
						reject(
							new Error(
								`Expected the population state chars to be "." or "*". Instead got unexpected character "${escapeNonPrintableChars(
									char
								)}"`
							)
						);
						return;
					}
					characters.push(char);
				}
				population.push(characters);
			}

			// Check that the population state sizes are equal to the grid
			// sizes.
			if (population.length !== size.rows) {
				reject(
					new Error(
						`The population state rows and the grid rows provided in the file are not equal. Population state rows: ${population.length}, Grid rows: ${size.rows}`
					)
				);
				return;
			}
			for (const line of population) {
				if (line.length !== size.columns) {
					reject(
						new Error(
							`The population state columns and the grid columns provided in the file are not equal. Population state columns: ${line.length}, Grid columns: ${size.columns}`
						)
					);
					return;
				}
			}

			resolve({ size, generationNumber, population });
		};

		reader.onerror = () => {
			const message = 'An unexpected error occurred while reading the file';
			reject(new Error(message));
			console.error(`${message}: ${reader.error!.name}`);
			return;
		};

		reader.readAsText(file);
	});
};

export { checkConwayFile, parseConwayFile };
