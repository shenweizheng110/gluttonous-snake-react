import * as React from 'react';
import { Button, Tabs, Icon } from 'antd';
import RankList from './modules/RankList';
import Common from '../../interface/common';
import RankStore, { RankStoreContext } from './stores/rankStore';

const { useContext, useEffect } = React;

const { TabPane } = Tabs;

const Rank: React.FunctionComponent = () => {
    const store = useContext<RankDTS.RankStoreValue>(RankStoreContext);

    const { actions } = store;

    const tabs = [{
        key: 'score',
        label: '最长长度',
        icon: 'stock'
    }, {
        key: 'recordCount',
        label: '总对局数',
        icon: 'fire'
    }, {
        key: 'defeatCount',
        label: '总击杀数',
        icon: 'flag'
    }, {
        key: 'maxDefeat',
        label: '最多击杀',
        icon: 'apple'
    }];

    /**
     * 处理tab页切换
     * @param activeKey 新的key
     */
    const handleTabChange: RankDTS.HandleTabChange = (activeKey) => {
        actions.getRankList(activeKey, 1, 10);
    };

    useEffect(() => {
        actions.getRankList('score', 1, 10);
    }, []);

    return (
        <>
            <Tabs className='rank-tab' tabPosition='left' onChange={handleTabChange}>
                {
                    tabs.map(item => (
                        <TabPane
                            tab={
                                <span>
                                    <Icon type={ item.icon } />
                                    { item.label }
                                </span>
                            }
                            key={item.key}
                        >
                            <RankList />
                        </TabPane>
                    ))
                }
            </Tabs>
        </>
    );
};

const Root: React.FunctionComponent<Common.NavigatorComponent> = ({ history }) => {

    return (
        <>
            <div className='rank'>
                <RankStore>
                    <Rank />
                </RankStore>
            </div>
            <div className='action-button'>
                <Button className='m-r-24' onClick={() => { history.push('/home/room'); }}>多人对战</Button>
                <Button onClick={() => { history.push('/pvp'); }}>人机对战</Button>
            </div>
        </>
    );
};


export default Root;
