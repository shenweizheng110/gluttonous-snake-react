declare namespace RoomDTS {
    interface RoomSearchInfo {
        roomId?: string;
        roomName?: string;
        ownerName?: string;
        miniSpeed?: string;
        maxSpeed?: string;
    }

    interface PaginationInfo {
        page: number;
        pageSize: number;
        total: number;
    }

    interface RoomListItem {
        roomId: string;
        roomCover: string;
        username: string;
        peopleCount: number;
        roomName: string;
        ownerId: string;
        hasPassword: boolean;
    }

    interface RoomStore {
        isShowModal: boolean;
        searchInfo: RoomSearchInfo;
        roomList: RoomListItem[];
        pagination: PaginationInfo;

        actions: {
            getRoomList: GetRoomList;
            filterRoom: FilterRoom;
            resetFilter: ResetFilter;
            addRoom: AddRoom;
            closeModal: CloseModal;
            openModal: OpenModal;
            showEnterRoomModal: (roomInfo: any) => void;
        };
    }

    type GetRoomList = (page: number, pageSize: number) => void;

    // 进入房间
    type HandleEnterRoom = (roomInfo: RoomListItem) => void;

    // 筛选房间
    type FilterRoom = (form: any) => void;

    // 重置筛选
    type ResetFilter = (form: any) => void;

    // 创建房间
    type AddRoom = (form: any, callback: HandleEnterRoom) => void;

    // 弹窗开关
    type OpenModal = () => void;

    // 关闭弹窗
    type CloseModal = (form: any) => void;

    // 处理翻页
    type HandlePageChange = (page: number, pageSize: number) => void;
}
