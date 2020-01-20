interface CanvasContext extends CanvasRenderingContext2D {
    backingStorePixelRatio?: number;
    webkitBackingStorePixelRatio?: number;
    mozBackingStorePixelRatio?: number;
    msBackingStorePixelRatio?: number;
    oBackingStorePixelRatio?: number;
}

// 排行榜 list 组件下方 icon text 组件的props
type IconTextProps = {
    type: string;
    text: string;
    liked: boolean;
}

// 排行榜 list footer 组件
type RankListFooterProps = {
    rank: number | string;
}

// 表单布局
type FormLayout = {
    span?: number;
    offset?: number;
}

// 房间项
type RoomItem = {
    roomId: number;
    img: string;
    owner: string;
    roomName: string;
    count: number;
}

// 弹窗开关
interface ModalProps {
    openModal: () => void;
}

// void 无参函数
type VoidFnc = () => void;

// id 为参数函数
type IdFnc = (id: number) => void;

// 房间成员数组
interface RoomPeopleItem {
    id: number;
    name: string;
    url: string;
    isCompare: boolean;
    isOwner: boolean;
}

// 房间成员组件props
interface RoomPeopleItemProps {
    roomInfo: RoomPeopleItem;
}

// pvp对战房间内排行榜
interface PvpRankItem {
    username: string;
    score: number;
}

// 旋转偏移量
declare enum RotateOffset {
    Top = 0,
    Bottom = 180,
    Left = 270,
    Right = 90
}

// 路径项
type RouteItem = [number, number];

// 蛇节点 - 单个
interface SnakeNode {
    x: number;
    y: number;
    isHead: boolean;
    color: string;
    rotateOffset: RotateOffset;
    radiusSize: number;
    preId: string;
    nextId: string;
    id: string;
    routes: RouteItem[];
}

// 蛇节点 - 多个
interface SnakeNodes {
    [key: string]: SnakeNode;
}

// 蛇
interface Snake {
    userId: string;
    speed: number;
    energyNum: number;
    energy: number;
    direction: string;
    snakeHeadId: string;
    snakeCount: number;
    rotateOffset: RotateOffset;
    recordNumber: number;
}

// 豆子 - 单个
interface Bean {
    x: number;
    y: number;
    val: number;
    color: string;
}

// 豆子 - 多个
interface Beans {
    [key: string]: Bean;
}

// ws 命令为 show 得到的结构
type ShowAction = {
    snakeInfo: {
        snakeNodes: SnakeNodes;
        snakes: Snake[];
    };
    beans: Beans;
}

// ws 进程时间注册
type WsEventsFnc = (ws: WebSocket) => void;
