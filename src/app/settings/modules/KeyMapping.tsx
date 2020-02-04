import * as React from 'react';
import keyCode from '../../../utils/keyCode';
import { Button } from 'antd';

const KeyMapping: React.FunctionComponent = () => {
    const initValue: KeyMappingInitValue = {
        'up': '87',
        'down': '68',
        'left': '65',
        'right': '82',
        'start': '13',
        'exit': '27',
        'speedUp': '32'
    };

    const keyMappings: KeyMappingItem[] = [{
        label: '向上移动',
        prop: 'up'
    }, {
        label: '向下移动',
        prop: 'down'
    }, {
        label: '向左移动',
        prop: 'left'
    }, {
        label: '向右移动',
        prop: 'right'
    }, {
        label: '开始/暂停',
        prop: 'start'
    }, {
        label: '退出房间',
        prop: 'exit'
    }, {
        label: '加速',
        prop: 'speedUp'
    }];

    return (
        <div className='keycode-settings'>
            {
                keyMappings.map(item => (
                    <div className='keycode-item' key={item.prop}>
                        <span className='keycode-label font-ellipse'>
                            { item.label }
                        </span>
                        <Button
                            type='primary'
                            className='primary-button keycode-btn'
                            size='small'
                        >{ keyCode[initValue[item.prop]] }</Button>
                    </div>
                ))
            }
            <div className='setting-footer m-t-24 t-r'>
                <Button type='primary' className='primary-button m-r-16'>保存配置</Button>
                <Button type='default' className='default-button'>恢复默认</Button>
            </div>
        </div>
    );
};

export default KeyMapping;
