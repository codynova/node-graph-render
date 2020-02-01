import React, { useRef, useEffect } from 'react';
import { Control } from 'node-graph-engine';

const ControlComponent = ({
    control,
    className,
    bindControl,
}: {
    control: Control;
    className: string;
    bindControl: any;
}) => {
    const element = useRef<HTMLDivElement>(null);
    useEffect(() => element.current ?? bindControl(element.current, control), [ element ]);

    return (
        <div
            className={className}
            title={control.key}
            ref={element}
        />
    );
};

export { ControlComponent };