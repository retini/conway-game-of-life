import { Properties } from 'csstype';

type CSSVariableProperties = {
	[K in `--${string}`]?: string | number;
};

export type ExtendedCSSProperties = Properties & CSSVariableProperties;
