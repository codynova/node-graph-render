import React from 'react';
import { render } from 'react-dom';
import { NodeEditor, DefaultEditorEvents } from 'node-graph-editor';
import { NodeComponent } from './NodeComponent';

const install = (editor: NodeEditor, { component: nodeComponent = NodeComponent }: { component: typeof NodeComponent }) => {
    editor.on('rendernode', ({ element, node, component, bindSocket, bindControl }: DefaultEditorEvents['rendernode']) => {
        const Component = (component as any).component || nodeComponent;
    
        node.update = () => {
            return new Promise(resolve =>
                render(
                    <Component
                        node={node}
                        editor={editor}
                        bindSocket={bindSocket}
                        bindControl={bindControl}
                    />,
                    element,
                    resolve,
                )
            );
        };
    
        node.update();
    });
    editor.on('rendercontrol', ({ element, control }: DefaultEditorEvents['rendercontrol']) => {
        const Component = (control as any).component;
    
        control.update = () => {
            return new Promise(resolve =>
                render(
                    <Component
                        {...(control as any).props}
                    />,
                    element,
                    resolve,
                )
            );
        };
    
        control.update();
    });

    editor.on(['connectioncreated', 'connectionremoved'], connection => {
        connection.output.node?.update();
        connection.input.node?.update();
    });

    editor.on('nodeselected', () => editor.nodes.forEach(node => node.update()));
}

export default {
    name: 'react-render',
    install,
};