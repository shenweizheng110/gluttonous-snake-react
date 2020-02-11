import * as React from 'react';
import keyCode from '../../../utils/keyCode';
import { Button } from 'antd';
import { SettingsStoreContext } from '../stores/settingsStrore';

const { useEffect, useContext } = React;

const KeyMapping: React.FunctionComponent = () => {
    const store = useContext<SettingsDTS.SettingsStore>(SettingsStoreContext);

    const { userConfig, actions, keyMapping } = store;

    useEffect(() => {
        actions.getSettinsByUserId(sessionStorage.getItem('userId'));
    }, []);

    return (
        <div className='keycode-settings'>
            {
                userConfig && Object.keys(keyMapping).map(key => (
                    <div className='keycode-item' key={key}>
                        <span className='keycode-label font-ellipse'>
                            { keyMapping[key].label }
                        </span>
                        <Button
                            type='primary'
                            className='primary-button keycode-btn'
                            size='small'
                            onClick={() => actions.handleKeyMappingFocus(key)}
                        >
                            {
                                keyMapping[key].isFocus
                                    ? '请按下键位'
                                    : keyCode[userConfig[key]]
                            }
                        </Button>
                    </div>
                ))
            }
            <div className='setting-footer m-t-24 t-r'>
                <Button
                    type='primary'
                    className='primary-button m-r-16'
                    onClick={() => actions.handleUpdateKeyMapping(sessionStorage.getItem('userId'))}
                >保存配置</Button>
                {/* <Button
                    type='default'
                    className='default-button'
                    onClick={actions.handleRebackToInit}
                >恢复默认</Button> */}
            </div>
        </div>
    );
};

export default KeyMapping;
