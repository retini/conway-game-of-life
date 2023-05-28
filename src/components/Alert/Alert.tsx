import './Alert.css';

type AlertProps = {
	message: string;
};

const Alert = ({ message }: AlertProps) => {
	return (
		<div className={'alert'}>
			<i className='material-symbols-outlined'>error</i>
			<p className='message'>{message}</p>
		</div>
	);
};

export default Alert;
