import React, { useRef, useEffect } from 'react';
import { Socket, IO } from 'node-graph-engine';
import { kebab } from './utils';

const SocketComponent = ({
    type,
    socket,
    io,
    bindSocket,
}: {
    type: 'input' | 'output';
    socket: Socket;
    io: IO;
    bindSocket: any;
}) => {
    const { name } = socket;
    const element = useRef<HTMLDivElement>(null);
    useEffect(() => element.current ?? bindSocket(element, type, io), []);

    return (
        <div
            className={`socket ${type} ${kebab(name)}`}
            title={name}
            ref={element}
        />
    );
};

export { SocketComponent };