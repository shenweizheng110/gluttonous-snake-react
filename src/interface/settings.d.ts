declare namespace SettingsDTS {
    interface GameSettings {
        initSpeed: number;
        dangerColor: string;
        eyeColor: string;
        nodeColors: string[];
    }

    interface UserConfig {
        initSpeed?: number;
        dangerColor?: string;
        eyeColor?: string;
        nodeColor?: string[];
        initDirection?: string;
        up?: string;
        down?: string;
        left?: string;
        right?: string;
        start?: string;
        exit?: string;
        speedUp?: string;
        showFight?: number;
        showPersonal?: number;
        [key: string]: any;
    }

    // 键位配置项
    interface KeyMapping {
        [prop: string]: {
            label: string;
            isFocus: boolean;
        };
    }

    type GetSettingsByUserId = (userId: string) => void;

    type UpdateUserConfig = (userId: string, userConfig: UserConfig) => void;

    type UpdateUserConfigLocal = (newConfig: UserConfig) => void;

    type HandleRebackToInit = () => void;

    type HandleKeyMappingFocus = (prop: string) => void;

    type HandleUpdateKeyMapping = (userId: string) => void;

    type HandleAddNodeColor = (color: string) => void;

    type HandleRemoveNodeColor = (colorIndex: number) => void;

    type UpdateGameSetting = (userId: string, form: any) => void;

    type UpdatePersonalPermissionSetting = (userId: string, form: any) => void;

    interface SettingsStore {
        userConfig: UserConfig;
        keyMapping: KeyMapping;

        actions: {
            getSettinsByUserId: GetSettingsByUserId;
            updateUserConfig: UpdateUserConfig;
            handleRebackToInit: HandleRebackToInit;
            updateUserConfigLocal: UpdateUserConfigLocal;
            handleKeyMappingFocus: HandleKeyMappingFocus;
            handleUpdateKeyMapping: HandleUpdateKeyMapping;
            handleAddNodeColor: HandleAddNodeColor;
            handleRemoveNodeColor: HandleRemoveNodeColor;
            updateGameSetting: UpdateGameSetting;
            updatePersonalPermissionSetting: UpdatePersonalPermissionSetting;
        };
    }
}
