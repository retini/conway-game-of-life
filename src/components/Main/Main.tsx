import { useState } from 'react';
import './Main.css';
import ConwayGrid from '../ConwayGrid/ConwayGrid';
import CustomFileInput from '../CustomFileInput/CustomFileInput';
import Alert from '../Alert/Alert';
import ClipboardContent from '../ClipboardContent/ClipboardContent';
import { ConwayData, computeNextGeneration } from '../../lib/conway';
import { checkConwayFile, parseConwayFile } from '../../lib/file';
import CONWAY_FILE_SAMPLE from '../../sampleData/conwayFileSample';

const Main = () => {
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [conwayData, setConwayData] = useState<ConwayData | null>(null);

	const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
		setErrorMessage('');
		const fileInput = e.currentTarget as HTMLInputElement;

		let file: File;
		if (fileInput.files && fileInput.files.length > 0) {
			file = fileInput.files[0];
		} else {
			// The user canceled the action before uploading the file.
			return;
		}

		try {
			checkConwayFile(file);
		} catch (err: unknown) {
			fileInput.value = '';
			const error = err as Error;
			setTimeout(() => {
				setErrorMessage(error.message);
			}, 200);
			return;
		}

		let population, size, generationNumber;
		try {
			({ population, size, generationNumber } = await parseConwayFile(file));
		} catch (err: unknown) {
			fileInput.value = '';
			let errorMessage: string;
			if (err instanceof Error) {
				errorMessage = err.message;
			} else {
				errorMessage = 'An unexpected error occurred while parsing the file';
				console.error(`${errorMessage}: ${err}`);
			}
			setTimeout(() => {
				setErrorMessage(errorMessage);
			}, 200);
			return;
		}

		population = computeNextGeneration(population, size);
		generationNumber++;
		setConwayData({ population, size, generationNumber });
	};

	const onUploadNewFile = () => {
		setConwayData(null);
	};

	return (
		<div className='main'>
			{conwayData ? (
				<>
					<button className='btn' onClick={onUploadNewFile}>
						Upload a new file
					</button>
					<ConwayGrid conwayData={conwayData} />
				</>
			) : (
				<>
					<h1>Conway's game of life</h1>
					<p>This is a React + Typescript web application reproducing Conway's Game of Life</p>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://github.com/retini/conway-game-of-life.git'
					>
						Source code
					</a>
					<CustomFileInput onFileUpload={onFileUpload} />
					{errorMessage !== '' && <Alert message={errorMessage} />}
					<ClipboardContent title='sample.txt' content={CONWAY_FILE_SAMPLE} />
				</>
			)}
		</div>
	);
};

export default Main;
