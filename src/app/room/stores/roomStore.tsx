import * as React from 'react';
import axios from '../../../utils/request';
import { message } from 'antd';

const { useState, createContext } = React;

export const RoomStoreContext = createContext(null);

const RoomStore: React.FunctionComponent = ({ children }) => {

    const [roomList, setRoomList] = useState<RoomDTS.RoomListItem[]>([]);

    const [enterModalVisible, setEnterModalVisible] = useState<boolean>(false);

    const [currentRoomInfo, setCurrentRoomInfo] = useState<RoomDTS.RoomListItem>(null);

    const [pagination, setPagination] = useState<RoomDTS.PaginationInfo>({
        total: 0,
        page: 1,
        pageSize: 10
    });

    const [isShowModal, setIsShowModal] = useState<boolean>(false);

    let searchInfo: RoomDTS.RoomSearchInfo = {
        roomId: '',
        roomName: '',
        ownerName: '',
        miniSpeed: '',
        maxSpeed: ''
    };

    /**
     * 获取房间列表
     * @param page
     * @param pageSize
     */
    const getRoomList: RoomDTS.GetRoomList = (page, pageSize) => {
        axios.get('/api/room/list', {
            params: {
                page,
                pageSize,
                roomName: searchInfo.roomName || '',
                ownerName: searchInfo.ownerName || '',
                roomId: searchInfo.roomId || '',
                miniSpeed: searchInfo.miniSpeed || '',
                maxSpeed: searchInfo.maxSpeed || ''
            }
        }).then(res => {
            let { status, result } = res.data;
            if (status.code !== 1) {
                return;
            }
            let { roomList, pageInfo } = result.data;
            setPagination(pageInfo);
            setRoomList(roomList);
        }).catch(error => {
            message.error(error);
            console.log(error);
        });
    };

    /**
     * 筛选房间列表
     * @param form 表单对象
     */
    const filterRoom: RoomDTS.FilterRoom = (form) => {
        form.validateFields((errs: any, values: any) => {
            if (!errs) {
                searchInfo = values;
                getRoomList(1, 10);
            }
        });
    };

    /**
     * 重置筛选
     * @param form 表单对象
     */
    const resetFilter: RoomDTS.FilterRoom = (form) => {
        form.resetFields();
        searchInfo = {
            roomId: '',
            roomName: '',
            ownerName: '',
            miniSpeed: '',
            maxSpeed: ''
        };
        getRoomList(1, 10);
    };

    /**
     * 弹窗开关
     * @param isShowModal 弹窗状态
     */
    const openModal: RoomDTS.AddRoom = () => {
        setIsShowModal(true);
    };

    /**
     * 关闭弹窗
     * @param form
     */
    const closeModal: RoomDTS.CloseModal = (form) => {
        form.resetFields();
        setIsShowModal(false);
    };

    /**
     * 添加房间
     * @param roomInfo 房间信息
     */
    const addRoom: RoomDTS.AddRoom = (form, callback) => {
        form.validateFields((errs: any, values: any) => {
            if (!errs) {
                let { roomName, roomPassword, miniSpeed, maxSpeed } = values;
                axios.post('/api/room/create', {
                    roomName,
                    ownerId: sessionStorage.getItem('userId'),
                    roomPassword: roomPassword,
                    miniSpeed: miniSpeed,
                    maxSpeed: maxSpeed
                }).then(res => {
                    let { status, result } = res.data;
                    if (status.code !== 1) {
                        return;
                    }
                    closeModal(form);
                    getRoomList(1, 10);
                    callback({
                        roomId: result.data,
                        ownerId: sessionStorage.getItem('userId')
                    } as any);
                }).catch(error => {
                    message.error(error);
                    console.log(error);
                });
            }
        });
    };

    const showEnterRoomModal = (roomInfo: any) => {
        setCurrentRoomInfo(roomInfo);
        setEnterModalVisible(true);
    };

    const closeEnterRoomModal = () => {
        setCurrentRoomInfo(null);
        setEnterModalVisible(false);
    };

    const validEnterRoom = (password: string, callback: any) => {
        let roomInfo = currentRoomInfo;
        axios.post('/api/room/enter', {
            roomId: roomInfo.roomId,
            password
        }).then(res => {
            let { status } = res.data;
            if (status.code === 1) {
                closeEnterRoomModal();
                callback(roomInfo);
            }
        }).catch(error => {
            message.error(error);
            console.log(error);
        });
    };

    const store = {
        roomList,
        pagination,
        isShowModal,
        enterModalVisible,

        actions: {
            getRoomList,
            filterRoom,
            resetFilter,
            addRoom,
            openModal,
            closeModal,
            showEnterRoomModal,
            closeEnterRoomModal,
            validEnterRoom
        }
    };

    return (
        <>
            <RoomStoreContext.Provider value={store}>
                { children }
            </RoomStoreContext.Provider>
        </>
    );
};

export default RoomStore;
