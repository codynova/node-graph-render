import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Node } from 'node-graph-engine';
import { NodeEditor } from 'node-graph-editor';
import { kebab } from './utils';
import { ControlComponent } from './ControlComponent';
import { SocketComponent } from './SocketComponent';

const NodeComponent = ({
    node,
    editor,
    bindSocket,
    bindControl,
}: {
    node: Node;
    editor: NodeEditor;
    bindSocket: any;
    bindControl: any;
}) => {
    const [ controls, setControls ] = useState(Array.from(node.controls.values()));
    const [ inputs, setInputs ] = useState(Array.from(node.inputs.values()));
    const [ outputs, setOutputs ] = useState(Array.from(node.outputs.values()));
    const [ selected, setSelected ] = useState(editor.selected.contains(node));

    useEffect(() => void setControls(Array.from(node.controls.values())), [ node.controls ]);
    useEffect(() => void setInputs(Array.from(node.inputs.values())), [ node.inputs ]);
    useEffect(() => void setOutputs(Array.from(node.outputs.values())), [ node.outputs ]);
    useEffect(() => void setSelected(editor.selected.contains(node)), [ editor.selected ]);

    return (
        <div
            className={classNames({
                node: true,
                [kebab(node.name)]: true,
                selected,
            })}
        >
            <div className="title">
                {node.name}
            </div>
            {outputs.map(output => (
                <div
                    key={output.key}
                    className="output"
                >
                    <div className="output-title">
                        {output.name}
                    </div>
                    <SocketComponent
                        type="output"
                        socket={output.socket}
                        io={output}
                        innerRef={bindSocket}
                    />
                </div>
            ))}
            {controls.map(control => (
                <ControlComponent
                    key={control.key}
                    control={control}
                    className="control"
                    innerRef={bindControl}
                />
            ))}
            {inputs.map(input => (
                <div
                    key={input.key}
                    className="input"
                >
                    <SocketComponent
                        type="input"
                        socket={input.socket}
                        io={input}
                        innerRef={bindSocket}
                    />
                    {input.showControl() ? (
                        <ControlComponent
                            control={input.control!}
                            className="input-control"
                            innerRef={bindControl}
                        />
                    ) : (
                        <div className="input-title">
                            {input.name}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export { NodeComponent };