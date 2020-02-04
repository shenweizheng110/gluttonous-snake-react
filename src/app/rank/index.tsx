import * as React from 'react';
import { Button, Tabs, Icon } from 'antd';
import RankList from './modules/RankList';
import Common from '../../interface/common';

const { TabPane } = Tabs;

const Rank: React.FunctionComponent = () => {
    const tabs = [{
        key: '1',
        label: '最长长度',
        icon: 'stock',
        component: <span>最长长度</span>
    }, {
        key: '2',
        label: '总对局数',
        icon: 'fire',
        component: <span>总对局数</span>
    }, {
        key: '3',
        label: '总击杀数',
        icon: 'flag',
        component: <span>总击杀数</span>
    }, {
        key: '4',
        label: '最多击杀',
        icon: 'apple',
        component: <span>最多击杀</span>
    }];

    return (
        <>
            <Tabs className='rank-tab' tabPosition='left'>
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
                <Rank />
            </div>
            <div className='action-button'>
                <Button className='m-r-24' onClick={() => { history.push('/home/room'); }}>多人对战</Button>
                <Button onClick={() => { history.push('/pvp'); }}>人机对战</Button>
            </div>
        </>
    );
};

export default Root;
