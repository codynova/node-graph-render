import React from 'react';
import { Control } from 'node-graph-engine';

const ControlComponent = ({
    control,
    className,
    innerRef,
}: {
    control: Control;
    className: string;
    innerRef: any;
}) => {
    return (
        <div
            className={className}
            title={control.key}
        />
    );
};

export { ControlComponent };