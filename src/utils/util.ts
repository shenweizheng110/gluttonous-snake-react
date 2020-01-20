/**
 * 解决canvas字体模糊问题
 * @param context canvas的2d上下文
 * @param canvasEl canvasDOM节点
 */
export const handleCanvasVague: (context: CanvasContext, canvasEl: HTMLCanvasElement) => void = (context, canvasEl) => {
    let getPixelRatio: (context: CanvasContext) => number = context => {
        let backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    };
    let ratio = getPixelRatio(context);
    canvasEl.style.width = canvasEl.width + 'px';
    canvasEl.style.height = canvasEl.height + 'px';
    canvasEl.width = canvasEl.width * ratio;
    canvasEl.height = canvasEl.height * ratio;
    context.scale(ratio, ratio);
};

// 基础游戏配置
export const Config: Game.GameBaseConfig = {
    snakeHeadSize: 20,
    snakeBodySize: 15,
    snakeEyeSize: 2,
    snakeEyeInterval: 5, // 蛇两个眼睛之间的距离
    beanSize: 20,
    snakeEnergy: 20, // 吃足 20能量值添加一个节点
    snakeHeadColor: '#DA4F46',
    snakeBodyColor: '#FCA25D',
    snakeEyeColor: '#000',
    snakeBodyColors: ['#E89696', '#92C6F4', '#F3DF98'], // 蛇节点可选的颜色
    snakeItemInterval: 20, // 每个蛇节点之间的距离
    snakeHeadInterval: 25,
    dangerDistance: 100, // 危险警告的距离
    dangerColor: '#FF0000',
    beanColor: ['#7F5032', '#CEC04F', '#A5251B', '#81C989', '#7B568B', '#0033FF', '#CC00CC', '#FFFF00', '#FF0099', '#00CC00'] // 豆子的颜色
};

// TODO
// 整合用户自身的配置
export const integrateUserConfig = () => {
    // todo 整合用户配置到 config 变量中
};

// 绘制单个蛇节点
export const drawSnakeItem: Draw.DrawCommon = function(context) {
    context.beginPath();
    context.fillStyle = this.color;
    let x = this.x;
    let y = this.y;
    let radiusSize = this.radiusSize;
    context.arc(x, y, radiusSize, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    if (this.isHead) {
        context.beginPath();
        context.translate(x, y);
        context.rotate(this.rotateOffset * (Math.PI / 180));
        context.translate(-x, -y);
        context.fillStyle = Config.snakeEyeColor;
        let snakeEyeSize = Config.snakeEyeSize;
        let snakeEyeInterval = Config.snakeEyeInterval;
        context.arc(x - snakeEyeInterval, y - snakeEyeInterval, snakeEyeSize, 0, 2 * Math.PI);
        context.arc(x + snakeEyeInterval, y - snakeEyeInterval, snakeEyeSize, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.closePath();
    }
    context.closePath();
};

// 绘制单条蛇
export const drawSnake: Draw.DrawSnake = (snake, snakeNodes, context) => {
    let snakeHead = snakeNodes[snake.snakeHeadId];
    let tail = snakeHead.preId ? snakeNodes[snakeHead.preId] : snakeHead;
    while (!tail.isHead) {
        drawSnakeItem.call(tail, context);
        tail = snakeNodes[tail.preId];
    }
    drawSnakeItem.call(tail, context);
};

// 绘制单个豆子
export const drawBeanItem: Draw.DrawCommon = function(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.val, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
    context.closePath();
};

// 绘制整个画布内容
export const draw: Draw.DrawFnc = ({ snakeInfo, beans }, context, canvasEl) => {
    const { snakeNodes, snakes } = snakeInfo;
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    for (let i = 0; i < snakes.length; i++) {
        drawSnake(snakes[i], snakeNodes, context);
    }
    for (let key in beans) {
        drawBeanItem.call(beans[key], context);
    }
};
