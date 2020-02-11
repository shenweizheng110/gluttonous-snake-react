import * as React from 'react';
import axios from '../../../utils/request';
import { message } from 'antd';
import keyCodeTable from '../../../utils/keyCode';

const { useState, createContext } = React;

export const SettingsStoreContext = createContext<SettingsDTS.SettingsStore>(null);

const SettingsStore: React.FunctionComponent = ({ children }) => {
    const [userConfig, setUserConfig] = useState<SettingsDTS.UserConfig>(null);

    const userConfigInit: SettingsDTS.UserConfig = {
        initSpeed: 2,
        dangerColor: '#CC3333',
        eyeColor: '#000000',
        nodeColor: ['#336633', '#336666', '#336699'],
        initDirection: 'Top',
        up: '87',
        down: '83',
        left: '65',
        right: '68',
        start: '32',
        exit: '27',
        speedUp: '75',
        showFight: 1,
        showPersonal: 1
    };

    const [keyMapping, setkeyMapping] = useState<SettingsDTS.KeyMapping>({
        up: {
            label: '向上移动',
            isFocus: false
        },
        down: {
            label: '向下移动',
            isFocus: false
        },
        left: {
            label: '向左移动',
            isFocus: false
        },
        right: {
            label: '向右移动',
            isFocus: false
        },
        start: {
            label: '开始/暂停',
            isFocus: false
        },
        exit: {
            label: '退出房间',
            isFocus: false
        },
        speedUp: {
            label: '加速',
            isFocus: false
        }
    });

    // 当前激活的键位key值
    let focusKeyMapping: string = null;

    /**
     * 获取用户配置
     * @param userId 用户id
     */
    const getSettinsByUserId: SettingsDTS.GetSettingsByUserId = (userId) => {
        axios.get(`/api/settings/getUser/${userId}`)
            .then(res => {
                let { status, result } = res.data;
                if (status.code !== 1) {
                    return;
                }
                result.data.nodeColor = result.data.nodeColor.split(';');
                setUserConfig(result.data);
            })
            .catch(error => {
                console.log(error);
                message.error(error);
            });
    };

    /**
     * 更新用户配置
     * @param userId 用户id
     * @param userConfig 用户配置
     */
    const updateUserConfig: SettingsDTS.UpdateUserConfig = (userId, userConfig) => {
        axios.post('/api/settings/updateUser', {
            userId,
            userConfig: JSON.stringify(userConfig)
        }).then(res => {
            let { status } = res.data;
            if (status.code !== 1) {
                return;
            }
            message.success('保存成功');
        }).catch(error => {
            console.log(error);
            message.error(error);
        });
    };

    /**
     * 处理恢复默认配置
     */
    const handleRebackToInit: SettingsDTS.HandleRebackToInit = () => {
        setUserConfig(userConfigInit);
    };

    /**
     * 键位设置本地更新用户配置
     * @param newConfig 新的配置
     */
    const updateUserConfigLocal: SettingsDTS.UpdateUserConfigLocal = (newConfig) => {
        setUserConfig(Object.assign(userConfig, newConfig));
    };

    /**
     * 处理激活键位设置修改
     * @param prop \
     */
    const handleKeyMappingFocus: SettingsDTS.HandleKeyMappingFocus = (prop) => {
        focusKeyMapping = prop;
        keyMapping[focusKeyMapping].isFocus = true;
        setkeyMapping(Object.assign({}, keyMapping));
        document.onkeydown = ({ keyCode }) => {
            if (!keyCodeTable.hasOwnProperty(keyCode + '')) {
                message.error('不是合法的键位');
                return;
            }
            let isDuplicated = false;
            Object.keys(keyMapping).some(key => {
                if (key === focusKeyMapping) {
                    return false;
                }
                if (userConfig[key] == keyCode) {
                    isDuplicated = true;
                    return true;
                }
            });
            if (isDuplicated) {
                message.error('键位重复');
                return;
            }
            userConfig[focusKeyMapping] = keyCode;
            setUserConfig(Object.assign({}, userConfig));
            keyMapping[focusKeyMapping].isFocus = false;
            setkeyMapping(Object.assign({}, keyMapping));
            focusKeyMapping = null;
            document.onkeydown = null;
        };
    };

    /**
     * 处理更新键位设置
     */
    const handleUpdateKeyMapping: SettingsDTS.HandleUpdateKeyMapping = (userId) => {
        let newConfig: SettingsDTS.UserConfig = {};
        Object.keys(keyMapping).forEach(key => {
            newConfig[key] = userConfig[key];
        });
        updateUserConfig(userId, newConfig);
    };

    /**
     * 新增节点颜色
     * @param color 颜色值
     */
    const handleAddNodeColor: SettingsDTS.HandleAddNodeColor = (color) => {
        userConfig.nodeColor.push(color);
        if (userConfig.nodeColor.length > 30) {
            message.error('最多30个节点颜色');
            return;
        }
        setUserConfig(Object.assign({}, userConfig));
    };

    /**
     * 删除节点颜色
     * @param colorIndex 颜色值
     */
    const handleRemoveNodeColor: SettingsDTS.HandleRemoveNodeColor = (colorIndex) => {
        if (userConfig.nodeColor.length === 1) {
            message.error('至少有一个节点颜色');
            return;
        }
        userConfig.nodeColor.splice(colorIndex, 1);
        setUserConfig(Object.assign({}, userConfig));
    };

    /**
     * 更新用户游戏配置
     * @param userId 用户id
     * @param form 表单对象
     */
    const updateGameSetting: SettingsDTS.UpdateGameSetting = (userId, form) => {
        form.validateFields((errs: any, values: any) => {
            if (!errs) {
                values.nodeColor = userConfig.nodeColor.join(';');
                updateUserConfig(userId, values);
            }
        });
    };

    /**
     * 更新用户的许可配置
     * @param userId 用户id
     * @param form 表单对象
     */
    const updatePersonalPermissionSetting: SettingsDTS.UpdatePersonalPermissionSetting = (userId, form) => {
        form.validateFields((errs: any, values: any) => {
            if (!errs) {
                updateUserConfig(userId, {
                    showFight: values.showFight ? 1 : 0,
                    showPersonal: values.showPersonal ? 1 : 0
                });
            }
        });
    };

    const store: SettingsDTS.SettingsStore = {
        userConfig,
        keyMapping,

        actions: {
            getSettinsByUserId,
            updateUserConfig,
            handleRebackToInit,
            updateUserConfigLocal,
            handleKeyMappingFocus,
            handleUpdateKeyMapping,
            handleAddNodeColor,
            handleRemoveNodeColor,
            updateGameSetting,
            updatePersonalPermissionSetting
        }
    };

    return (
        <>
            <SettingsStoreContext.Provider value={store}>
                { children }
            </SettingsStoreContext.Provider>
        </>
    );
};

export default SettingsStore;
