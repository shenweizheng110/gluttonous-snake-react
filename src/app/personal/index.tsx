import * as React from 'react';
import { Tabs, Icon } from 'antd';
import Base from './modules/Base';
import PersonalStore from './stores/personalStore';
import Phone from './modules/Phone';
import Password from './modules/Password';

const { TabPane } = Tabs;

const Personal: React.FunctionComponent = () => {
    const tabs = [{
        key: 'base',
        label: '个人信息',
        icon: 'stock',
        component: <Base />
    }, {
        key: 'phone',
        label: '手机号重置',
        icon: 'fire',
        component: <Phone />
    }, {
        key: 'password',
        label: '密码修改',
        icon: 'flag',
        component: <Password />
    }];

    return (
        <div className='personal'>
            <PersonalStore>
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
            </PersonalStore>
        </div>
    );
};

export default Personal;
