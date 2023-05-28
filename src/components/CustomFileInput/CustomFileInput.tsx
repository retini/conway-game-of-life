import { useRef } from 'react';
import './CustomFileInput.css';

type CustomFileInputProps = {
	onFileUpload: React.ChangeEventHandler<HTMLInputElement>;
};

const CustomFileInput = ({ onFileUpload }: CustomFileInputProps) => {
	let inputRef = useRef<HTMLInputElement>(null);

	let onButtonClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<div className='customFileInput'>
			<button className='btn' onClick={onButtonClick}>
				Upload a Conway file
			</button>
			<input ref={inputRef} type='file' onChange={onFileUpload} />
		</div>
	);
};

export default CustomFileInput;
