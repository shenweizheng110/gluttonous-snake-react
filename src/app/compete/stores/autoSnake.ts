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

let open: CompeteDTS.OpenItem[] = [];

let openJson: CompeteDTS.OpenJSON = {};

let close: CompeteDTS.Close = {};

const directionOffset: CompeteDTS.DirectionOffset = {
    'Top': [0, -nodeGap], // 上
    'Down': [0, nodeGap], // 下
    'Left': [-nodeGap, 0], // 左
    'Right': [nodeGap, 0] // 右
};

/**
 * 1. 拿到 open 表的第一个元素
 * 2. 遍历四个方向添加进 open 表
 *      2.1 不触碰边界
 *      2.2 不和蛇身重合
 *      2.3 不再 open close 表
 *      2.4 虚拟蛇移动返回新的蛇头
 *      2.5 添加进 open 表
 * 3. 进 close 表
 * 3. open表排序
 */
const extendOpen = (targetId: string, snakeNodesIds: CompeteDTS.SnakeNodeIds, isFindTail: boolean) => {
    let { id, g, moveDirections } = open.splice(0, 1)[0];
    if (id === targetId) {
        if (isFindTail) {
            if (moveDirections.length !== 1) {
                return moveDirections;
            } else {
                delete openJson[id];
                return null;
            }
        } else {
            return moveDirections;
        }
    }
    let [type, x, y] = id.split('-');
    let beanSplitRet = targetId.split('-');
    Object.keys(directionOffset).forEach(direction => {
        let [xOffset, yOffset] = directionOffset[direction];
        let nextX = parseInt(x) + xOffset;
        let nextY = parseInt(y) + yOffset;
        let nextId = `${type}-${nextX}-${nextY}`;
        if (
            nextX < 0 ||
            nextX >= xMaxCount * nodeGap ||
            nextY < 0 ||
            nextY >= yMaxCount * nodeGap ||
            openJson[nextId] ||
            close[nextId] ||
            snakeNodesIds[nextId]
        ) {
            return;
        }
        let openItem: CompeteDTS.OpenItem = {
            id: nextId,
            g: g + 1,
            h: Math.abs(parseInt(beanSplitRet[1]) - nextX) + Math.abs(parseInt(beanSplitRet[2]) - nextY),
            f: null,
            moveDirections: moveDirections.concat(direction)
        };
        openItem.f = openItem.g + openItem.h;
        open.push(openItem);
        openJson[nextId] = openItem;
    });
    close[id] = true;
    open.sort((val1, val2) => val1.f - val2.f);
    return null;
};

/**
 * 初始化open表
 */
const initOpen = (initId: string) => {
    let openItem: CompeteDTS.OpenItem = {
        id: initId,
        f: 0,
        g: 0,
        h: 0,
        moveDirections: []
    };
    open.push(openItem);
    openJson[initId] = openItem;
};

const findRoute = (initId: string, targetId: string, snakeNodeIds: CompeteDTS.SnakeNodeIds, isFindTail = false) => {
    open = [];
    openJson = {};
    close = {};
    initOpen(initId);
    while (true) {
        if (open.length === 0) {
            return null;
        }
        let moveDirections = extendOpen(targetId, snakeNodeIds, isFindTail);
        if (moveDirections) {
            return moveDirections;
        }
    }
};

const virtualMove = function(snakeHead: CompeteDTS.SnakeNode, direction: string, snakeNodeIds: CompeteDTS.SnakeNodeIds, beanId: string) {
    let [xOffset, yOffset] = directionOffset[direction];
    // 创建新的头节点
    let x: number = parseInt(snakeHead.x) + xOffset;
    let y: number = parseInt(snakeHead.y) + yOffset;
    let node: any = new (SnakeNode as any)(x + '', y + '', null, null, true);
    let nodeId = getId(node);
    if (nodeId === beanId) {
        node.next = snakeHead;
        node.pre = snakeHead.pre || snakeHead;
        snakeHead.pre = node;
    } else {
        if (!snakeHead.next) {
            delete snakeNodeIds[getId(snakeHead)];
        } else {
            let tail = snakeHead.pre;
            tail.pre.next = null;
            node.pre = tail.pre;
            node.next = snakeHead;
            snakeHead.pre = node;
            delete snakeNodeIds[getId(tail)];
        }
    }
    snakeNodeIds[nodeId] = true;
    return node;
};

const deepCopySnake: CompeteDTS.DeepCopySnake = (targetHead, snakeHead, targetHeadBack = null) => {
    if (!targetHead) {
        targetHead = new (SnakeNode as any)(snakeHead.x, snakeHead.y, null, null, true);
        targetHeadBack = targetHead;
    } else {
        let node = new (SnakeNode as any)(snakeHead.x, snakeHead.y, null, null, true);
        targetHead.next = node;
        node.pre = targetHead;
        targetHead = targetHead.next;
    }
    if (!snakeHead.next) {
        targetHeadBack.pre = targetHead;
        return targetHeadBack;
    }
    return deepCopySnake(targetHead, snakeHead.next, targetHeadBack);
};

const findTailToHeadRoute = (moveDirections: string[], snakeNodeIds: CompeteDTS.SnakeNodeIds) => {
    let snakeHead = deepCopySnake(null, SnakeNode.prototype.snakeHead, null);
    snakeHead.type = SnakeNode.prototype.type;
    for (let i = 0; i < moveDirections.length; i++) {
        snakeHead = virtualMove(snakeHead, moveDirections[i], snakeNodeIds, beanId);
    }
    let targetId = getId(snakeHead.pre || snakeHead);
    delete snakeNodeIds[getId(snakeHead.pre)];
    return findRoute(beanId, targetId, snakeNodeIds, true);
};

const getFarthestDirection = () => {
    let snakeHead = SnakeNode.prototype.snakeHead;
    let { x, y, type } = snakeHead;
    let beanSplitRet = beanId.split('-');
    let maxDistance = 0;
    let targetDirection = '';
    // let hasTailRouteDirections: string[] = [];
    Object.keys(directionOffset).forEach(direction => {
        let [xOffset, yOffset] = directionOffset[direction];
        let nextX = parseInt(x) + xOffset;
        let nextY = parseInt(y) + yOffset;
        let nextId = `${type}-${nextX}-${nextY}`;
        if (
            nextX < 0 ||
            nextX >= xMaxCount * nodeGap ||
            nextY < 0 ||
            nextY >= yMaxCount * nodeGap ||
            snakeNodesIds[nextId]
        ) {
            return;
        }
        // let tailDirections = findTailToHeadRoute([direction], JSON.parse(JSON.stringify(snakeNodesIds)));
        /* if (!tailDirections) {
            return;
        } */
        let distance = Math.abs(parseInt(beanSplitRet[1]) - nextX) + Math.abs(parseInt(beanSplitRet[2]) - nextY);
        if (distance > maxDistance) {
            targetDirection = direction;
            maxDistance = distance;
        }
    });
    return targetDirection;
};

/**
 * 1. 判断能不能从蛇头到豆子
 *      1.1 移动虚拟蛇
 *      1.2 判断能不能从新的蛇头到新的蛇尾
 */
export const calcDirection = () => {
    let initId = getId(SnakeNode.prototype.snakeHead);
    let snakeNodeIds = JSON.parse(JSON.stringify(snakeNodesIds));
    let moveDirections = findRoute(initId, beanId, snakeNodeIds);
    let tailMoveDirections = null;
    if (moveDirections) {
        tailMoveDirections = findTailToHeadRoute(moveDirections, snakeNodeIds);
    }
    if (tailMoveDirections) {
        return moveDirections[0];
    }
    if (!moveDirections || !tailMoveDirections) {
        let direction = getFarthestDirection();
        return direction;
    }
};
