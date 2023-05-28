import { useState } from 'react';
import './ClipboardContent.css';

type ClipboardContentProps = {
	title: string;
	content: string;
};

const ClipboardContent = ({ title, content }: ClipboardContentProps) => {
	const [isCopied, setIsCopied] = useState<boolean>(false);

	const onCopy = async (): Promise<void> => {
		if (isCopied) return;
		try {
			await navigator.clipboard.writeText(content);
		} catch (err) {
			alert('Copy to clipboard failed. Please try manually copying the text or adjusting your browser settings');
			return;
		}
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	return (
		<div className='clipboardContent'>
			<div className='head'>
				<span className='title'>{title}</span>
				<button onClick={onCopy}>{isCopied ? '✓ Copied' : 'Copy'}</button>
			</div>
			<div className='content'>
				<pre>
					<code>{content}</code>
				</pre>
			</div>
		</div>
	);
};

export default ClipboardContent;
