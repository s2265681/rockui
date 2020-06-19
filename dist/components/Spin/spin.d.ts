import React, { ReactElement } from 'react';
interface SpinProps {
    delay?: number;
    indicator?: ReactElement;
    size?: "small" | "default" | "large";
    loading?: boolean;
    tip?: string;
}
declare const Spin: React.FC<SpinProps>;
export default Spin;
