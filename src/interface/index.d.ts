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
