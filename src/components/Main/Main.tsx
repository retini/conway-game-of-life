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
	let [isLoading, setIsLoading] = useState<boolean>(false);
	let [errorMessage, setErrorMessage] = useState<string>('');
	let [conwayData, setConwayData] = useState<ConwayData | null>(null);

	const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
		setIsLoading(true);
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
			setErrorMessage(error.message);
			setIsLoading(false);
			return;
		}

		let population, size, generationNumber;
		try {
			({ population, size, generationNumber } = await parseConwayFile(file));
		} catch (err: unknown) {
			fileInput.value = '';
			if (err instanceof Error) {
				setErrorMessage(err.message);
			} else {
				const message = 'An unexpected error occurred while parsing the file';
				setErrorMessage(message);
				console.error(`${message}: ${err}`);
			}
			setIsLoading(false);
			return;
		}

		population = computeNextGeneration(population, size);
		generationNumber++;
		setIsLoading(false);
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
					<CustomFileInput onFileUpload={onFileUpload} />
					{errorMessage && <Alert message={errorMessage} />}
					<ClipboardContent title='sample.txt' content={CONWAY_FILE_SAMPLE} />
				</>
			)}
		</div>
	);
};

export default Main;
