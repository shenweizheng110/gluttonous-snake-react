declare namespace Draw {
    // 绘制函数
    type DrawFnc = (gameInfo: ShowAction, context: CanvasRenderingContext2D, canvasEl: HTMLCanvasElement) => void;
    // 绘制单个蛇
    type DrawSnake = (snake: Snake, snakeNodes: SnakeNodes, context: CanvasRenderingContext2D) => void;
    // 绘制单个蛇节点
    type DrawCommon = (context: CanvasRenderingContext2D) => void;
}
