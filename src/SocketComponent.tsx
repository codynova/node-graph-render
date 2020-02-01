import React from 'react';
import { Socket, IO } from 'node-graph-engine';
import { kebab } from './utils';

const SocketComponent = ({
    type,
    socket,
    io,
    innerRef,
}: {
    type: 'input' | 'output';
    socket: Socket;
    io: IO;
    innerRef: any;
}) => {
    const { name } = socket;

    return (
        <div
            className={`socket ${type} ${kebab(name)}`}
            title={name}
        />
    );
};

export { SocketComponent };