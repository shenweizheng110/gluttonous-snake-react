import {
    nodeGap,
    getMaxCount,
    notNodeColor,
    headNodeColor,
    defaultNodeColor,
    beanColor
} from './config';

const [xMaxCount, yMaxCount] = getMaxCount();

const relativeDirection: CompeteDTS.StringInterface = {
    'Top': 'Down',
    'Down': 'Top',
    'Left': 'Right',
    'Right': 'Left'
};

// 键位
let keyCodeMapping: CompeteDTS.KeyCodeMapping = null;

// 蛇节点
let snakeNodesIds: CompeteDTS.SnakeNodeIds = {};

// 豆子的坐标
let beanId: string = null;

const getId = (node: CompeteDTS.SnakeNode) => `${node.type}-${node.x}-${node.y}`;

function SnakeNode(x: string, y: string, pre: string, next: string, isHead = false) {
    this.x = x;
    this.y = y;
    this.pre = pre;
    this.next = next;
    this.isHead = isHead;
}
SnakeNode.prototype.direction = 'Top';
SnakeNode.prototype.score = 0;
SnakeNode.prototype.type = 'Left';
SnakeNode.prototype.snakeHead = null;
SnakeNode.prototype.changeColor = function(color: string) {
    let id = getId(this);
    document.getElementById(id).style.background = color;
    // nodeNodeColor - 清除节点
    // headNodeColor - 新增节点
    if (color === notNodeColor) {
        delete snakeNodesIds[id];
    } else if (color === headNodeColor) {
        snakeNodesIds[id] = true;
    }
};

let isCanChange = true;

/**
 * 改变豆子颜色
 * @param id 豆子id
 * @param color 豆子颜色
 */
const changeBeanColor = (id: string, color: string) => {
    document.getElementById(id).style.background = color;
};

const generateBean = (type: string) => {
    let x = Math.floor(Math.random() * xMaxCount);
    let y = Math.floor(Math.random() * yMaxCount);
    let id = `${type}-${x * nodeGap}-${y * nodeGap}`;
    if (snakeNodesIds[id]) {
        generateBean(type);
        return;
    } else {
        beanId = id;
        changeBeanColor(id, beanColor);
    }
};

/**
 * 修改方向
 * @param keyCode 键值
 */
export const changeDirection = (keyCode: string, direction: string = null) => {
    if (direction) {
        SnakeNode.prototype.direction = direction;
        return;
    }
    if (!isCanChange) {
        return;
    }
    isCanChange = false;
    let newDirection = keyCodeMapping[keyCode];
    let currentDirection = SnakeNode.prototype.direction;
    if (!newDirection || relativeDirection[currentDirection] === newDirection) {
        return;
    }
    SnakeNode.prototype.direction = newDirection;
};

/**
 * 初始化蛇头
 * @param x
 * @param y
 * @param userConfig
 * @param type
 */
export const init = (x: string, y: string, userConfig: any, type: string) => {
    SnakeNode.prototype.direction = userConfig.initDirection;
    SnakeNode.prototype.type = type;
    let directionCode: CompeteDTS.KeyCodeMapping = {};
    directionCode[userConfig.up] = 'Top';
    directionCode[userConfig.down] = 'Down';
    directionCode[userConfig.left] = 'Left';
    directionCode[userConfig.right] = 'Right';
    keyCodeMapping = directionCode;
    let node = new (SnakeNode as any)(x, y, null, null, true);
    node.changeColor(headNodeColor);
    SnakeNode.prototype.snakeHead = node;
    let id = `${type}-${x}-${y}`;
    snakeNodesIds[id] = true;
    generateBean(type);
    return node;
};

export const move = () => {
    let direction = SnakeNode.prototype.direction as string;
    let snakeHead = SnakeNode.prototype.snakeHead;
    let type = SnakeNode.prototype.type;
    // 创建新的头节点
    let x: number = parseInt(snakeHead.x);
    let y: number = parseInt(snakeHead.y);
    switch (direction) {
        case 'Top':
            y -= nodeGap;
            break;
        case 'Down':
            y += nodeGap;
            break;
        case 'Left':
            x -= nodeGap;
            break;
        case 'Right':
            x += nodeGap;
            break;
    }
    // 判断是否彭碰到墙壁
    if (x < 0 || x >= xMaxCount * nodeGap || y < 0 || y >= yMaxCount * nodeGap || snakeNodesIds[`${type}-${x}-${y}`]) {
        return SnakeNode.prototype.score;
    }
    // 连接节点 - 设置新的颜色
    let node: any = new (SnakeNode as any)(x + '', y + '', null, null, true);
    if (`${type}-${x}-${y}` === beanId) {
        node.next = snakeHead;
        node.pre = snakeHead.pre || snakeHead;
        snakeHead.pre = node;
        snakeHead.changeColor(defaultNodeColor);
        node.changeColor(headNodeColor);
        generateBean(node.type);
        SnakeNode.prototype.score++;
    } else {
        if (!snakeHead.next) {
            snakeHead.changeColor(notNodeColor);
            node.changeColor(headNodeColor);
        } else {
            let tail = snakeHead.pre;
            tail.pre.next = null;
            node.pre = tail.pre;
            node.next = snakeHead;
            snakeHead.pre = node;
            tail.changeColor(notNodeColor);
            snakeHead.changeColor(defaultNodeColor);
            node.changeColor(headNodeColor);
        }
    }
    SnakeNode.prototype.snakeHead = node;
    isCanChange = true;
    return null;
};

export default SnakeNode;
