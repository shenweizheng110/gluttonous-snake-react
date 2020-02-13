import * as React from 'react';
import { nodeGap } from '../stores/config';

const SnakeNodeItem: React.FunctionComponent<CompeteDTS.NodeItemProps> = ({ x, y, type }) => {
    return (
        <div
            className='node-item'
            id={`${type}-${x}-${y}`}
            style={{
                width: `${nodeGap}px`,
                height: `${nodeGap}px`,
                position: 'absolute',
                top: `${y}px`,
                left: `${x}px`
            }}
        />
    );
};

export default SnakeNodeItem;
