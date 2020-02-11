import * as React from 'react';
import { Icon, Pagination, message, Spin, Empty } from 'antd';
import { useMaxHeight } from '../../../utils/customHook';
import Common from '../../../interface/common';
import { withRouter } from 'react-router-dom';
import { send } from '../../../utils/util';
import { RoomStoreContext } from '../stores/roomStore';
import AddRoom from './AddRoom';
import EnterRoom from './EnterRoom';

const { useState, useEffect, useContext } = React;

let ws: WebSocket = null;

const RoomList: React.FunctionComponent<Common.NavigatorComponent> = ({ history }) => {

    const store = useContext<RoomDTS.RoomStore>(RoomStoreContext);

    const { roomList, actions, pagination } = store;

    const [pageLoading, setPageLoading] = useState<boolean>(false);

    const maxHeight = useMaxHeight(120 + 150 + 40 + 40 + 30);

    const registerWsEvent: RegisterWsEvents = (ws) => {
        ws.onopen = () => {
            setPageLoading(false);
        };

        ws.onmessage = ({ data }) => {
            let ret: WsAPIRes = JSON.parse(data);
            let { errMsg } = ret.data;
            if (errMsg) {
                message.error(errMsg);
                return;
            }
            switch (ret.type) {
                case 'enterRoom':
                    // ws.close();
                    history.push('/home/roomPrepare');
                    break;
                case 'error':
                    message.error(errMsg);
                    break;
            };
        };

        ws.onerror = (ev) => {
            message.error(ev);
        };
    };

    useEffect(() => {
        actions.getRoomList(1, 10);
        ws = new WebSocket('ws://localhost:3000/api/game');
        registerWsEvent(ws);
        return () => {
            ws.close();
        };
    }, []);

    const handleRoomPasswordCallback = (roomInfo: any) => {
        let { roomId, ownerId } = roomInfo;
        sessionStorage.setItem('roomId', roomId + '');
        sessionStorage.setItem('ownerId', ownerId + '');
        let userId = sessionStorage.getItem('userId');
        send(ws, 'enterRoom', {
            roomId: roomInfo.roomId + '',
            userId
        });
    };

    // 处理进入房间
    const handleEnterRoom: RoomDTS.HandleEnterRoom = (roomInfo) => {
        let { hasPassword } = roomInfo;
        if (hasPassword) {
            actions.showEnterRoomModal(roomInfo);
            return;
        }
        handleRoomPasswordCallback(roomInfo);
    };

    return (
        <Spin spinning={pageLoading}>
            {
                roomList.length === 0
                    ? <Empty />
                    : <>
                        <ul className='room-list' style={{
                            maxHeight: maxHeight
                        }}>
                            {
                                roomList.map(item => (
                                    <div className='room-item' key={item.roomId} onClick={() => handleEnterRoom(item)}>
                                        <div className='room-title font-ellipse'>
                                            {
                                                item.hasPassword
                                                    ? <Icon type="lock" />
                                                    : null
                                            }
                                            { item.roomName }
                                        </div>
                                        <div className='room-cover'>
                                            <img src={item.roomCover} alt='img'/>
                                        </div>
                                        <footer>
                                            <span className='font-ellipse room-owner'>
                                                <Icon type="home" />
                                                <span>{ item.username }</span>
                                            </span>
                                            <span className='font-ellipse room-count'>
                                                <Icon type="user" />
                                                <span>{ item.peopleCount } 人</span>
                                            </span>
                                        </footer>
                                    </div>
                                ))
                            }
                        </ul>
                        <Pagination
                            className='room-pagination'
                            current={pagination.page}
                            total={pagination.total}
                            pageSize={pagination.pageSize}
                            onChange={actions.getRoomList}
                        />
                    </>
            }
            <AddRoom handleEnterRoom={handleEnterRoom} />
            <EnterRoom callback={handleRoomPasswordCallback} />
        </Spin>
    );
};

export default withRouter(RoomList);
