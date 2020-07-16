import React, { CSSProperties } from 'react';
import { ThemeProps } from '../Icon/icon';
interface ProgressProps {
    percent: number;
    showText?: boolean;
    strokeHeight?: number;
    styles?: CSSProperties;
    theme?: ThemeProps;
}
declare const Progress: React.FC<ProgressProps>;
export default Progress;
