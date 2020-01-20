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
}
