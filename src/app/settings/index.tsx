import * as React from 'react';
import { Tabs, Icon } from 'antd';
import KeyMapping from './modules/KeyMapping';
import GameSetting from './modules/GameSetting';
import PermisionSetting from './modules/PermissionSetting';
import SettingsStore from './stores/settingsStrore';

const { TabPane } = Tabs;

const Settings: React.FunctionComponent = () => {
    const tabs = [{
        key: '1',
        label: '键位设置',
        icon: 'stock',
        component: <KeyMapping />
    }, {
        key: '2',
        label: '对局设置',
        icon: 'fire',
        component: <GameSetting />
    }, {
        key: '3',
        label: '权限设置',
        icon: 'flag',
        component: <PermisionSetting />
    }];

    return (
        <div className='settings'>
            <SettingsStore>
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
                                { item.component }
                            </TabPane>
                        ))
                    }
                </Tabs>
            </SettingsStore>
        </div>
    );
};

export default Settings;
