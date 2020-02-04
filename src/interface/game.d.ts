declare namespace Game {
    // 游戏配置
    interface GameBaseConfig {
        snakeHeadSize: number;
        snakeBodySize: number;
        snakeEyeSize: number;
        snakeEyeInterval: number; // 蛇两个眼睛之间的距离
        beanSize: number;
        snakeEnergy: number; // 吃足 20能量值添加一个节点
        snakeHeadColor: string;
        snakeBodyColor: string;
        snakeEyeColor: string;
        snakeBodyColors: string[]; // 蛇节点可选的颜色
        snakeItemInterval: number; // 每个蛇节点之间的距离
        snakeHeadInterval: number;
        dangerDistance: number; // 危险警告的距离
        dangerColor: string;
        beanColor: string[];
    }

    // 移动方向
    enum Direction {
        Top = 'Top',
        Bottom = 'Bottom',
        Left = 'Left',
        Right = 'Right'
    }

    // 键位配置
    interface KeyCodeConfig {
        [key: number]: Direction;
    }

    // 用户配置
    interface UserConfig {
        userId: string;
        colors: string[];
        initDirection: Direction;
        up: Direction;
        down: Direction;
        left: Direction;
        right: Direction;
        directionCode: KeyCodeConfig;
        speedUp: Direction;
        initSpeed: Direction;
        dangerColor: string;
        eyeColor: string;
    }

    // 玩家个人信息
    interface UserInfo {
        username: string;
        cover: string;
    }

    // 玩家
    interface Gamer {
        userId: string;
        score: number;
        enterIndex: number;
        isPrepare: boolean;
        userConfig: UserConfig;
        userInfo: UserInfo;
    }
    // 每一局游戏
    interface GameItem {
        roomId: string;
        hostId: string;
        currentCount: number;
        users: {
            [key: string]: Gamer;
        };
        isStart: boolean;
        isEnd: boolean;
    }

    // 返回结果
    interface GameResult<T> {
        errMsg: string | null;
        data: T;
    }

    // 处理进入房间事件回调
    // type HandleEnterRoomCallback = (ws: WebSocket, data: GameResult<any>) => void;

    // 处理房间准备-进入房间
    type HandleRoomGameCallback = (data: GameItem) => void;

    // 处理准备回调
    type HandlePrepareCallback = (data: GameItem) => void;
}
