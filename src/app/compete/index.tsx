import * as React from 'react';
import SnakeNodeItem from './modules/SnakeNodeItem';
import { nodeGap, getMaxCount } from './stores/config';
import CompeteStore, { CompeteStoreContext } from './stores/competeStore';

const { useEffect, useState, useContext } = React;

const Compete: React.FunctionComponent = () => {

    const [leftNodes, setLeftNodes] = useState<React.FunctionComponent[]>([]);

    const [rightNodes, setRightNodes] = useState<React.FunctionComponent[]>([]);

    const store = useContext<CompeteDTS.Store>(CompeteStoreContext);

    let { actions } = store;

    /**
     * 初始化表格
     */
    const initNodes: CompeteDTS.VoidFnc = () => {
        let leftNodes: (typeof SnakeNodeItem)[] = [];
        let rightNodes: (typeof SnakeNodeItem)[] = [];
        let [xMaxCount, yMaxCount] = getMaxCount();
        for (let i = 0; i < yMaxCount; i++) {
            for (let j = 0; j < xMaxCount; j++) {
                let x = j * nodeGap;
                let y = i * nodeGap;
                leftNodes.push((<SnakeNodeItem key={`left-${x}-${y}`} x={x} y={y} type='left' />) as any);
                rightNodes.push((<SnakeNodeItem key={`right-${x}-${y}`} x={x} y={y} type='right' />) as any);
            }
        }
        setLeftNodes(leftNodes);
        setRightNodes(rightNodes);
    };

    useEffect(() => {
        initNodes();
        actions.getUserConfig(sessionStorage.getItem('userId'));
    }, []);

    return (
        <div className='compete'>
            <div className='compete-left'>
                { leftNodes.map(item => item) }
            </div>
            <div className='compete-right'>
                { rightNodes.map(item => item) }
            </div>
        </div>
    );
};

const CompeteWrapper: React.FunctionComponent = () => {
    return (
        <>
            <CompeteStore>
                <Compete />
            </CompeteStore>
        </>
    );
};

export default CompeteWrapper;
