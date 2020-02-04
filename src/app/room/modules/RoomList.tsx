import * as React from 'react';
import { Icon, Pagination, message, Spin } from 'antd';
import { useMaxHeight } from '../../../utils/customHook';
import Common from '../../../interface/common';
import { withRouter } from 'react-router-dom';
import { send } from '../../../utils/util';

const { useState, useEffect } = React;
let ws: WebSocket = null;

const RoomList: React.FunctionComponent<Common.NavigatorComponent> = ({ history }) => {

    const [roomList, setRoomList] = useState<RoomItem[]>([]);

    const [pageLoading, setPageLoading] = useState<boolean>(true);

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
                    ws.close();
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
        let res: RoomItem[] = [];
        for (let i = 0; i < 10; i++) {
            res.push({
                roomId: i,
                img: `http://qiniu.shenweini.cn/snake${Math.floor(Math.random() * 20 + 1)}.jpeg`,
                owner: 'Smail~Every',
                count: Math.ceil(Math.random() * 100),
                roomName: '这是一个房间'
            });
        }
        setRoomList(res);
        ws = new WebSocket('ws://localhost:3000/api/game');
        registerWsEvent(ws);
    }, []);

    // 处理进入房间
    const handleEnterRoom: HandleEnterRoom = (roomInfo) => {
        sessionStorage.setItem('roomId', roomInfo.roomId + '');
        let userId = sessionStorage.getItem('userId') || Math.floor(Math.random() * 100) + '';
        send(ws, 'enterRoom', {
            roomId: roomInfo.roomId + '',
            userId,
            userConfig: {
                userId,
                colors: ['#BD4A45', '#333333', '#333366', '#333399', '#3333CC', '#336633', '#663366', '#663399'],
                initDirection: 'Top',
                up: '',
                down: '',
                left: '',
                right: '',
                directionCode: {
                    '87': 'Top',
                    '83': 'Bottom',
                    '65': 'Left',
                    '68': 'Right'
                },
                speedUp: '',
                initSpeed: '2',
                dangerColor: 'red',
                eyeColor: '#000'
            },
            userInfo: {
                username: `玩家${userId}`,
                cover: 'http://qiniu.shenweini.cn/list2.jpeg'
            }
        });
    };

    return (
        <Spin spinning={pageLoading}>
            <ul className='room-list' style={{
                maxHeight: maxHeight
            }}>
                {
                    roomList.map(item => (
                        <div className='room-item' key={item.roomId} onClick={() => handleEnterRoom(item)}>
                            <div className='room-title font-ellipse'>{ item.roomName }</div>
                            <div className='room-cover'>
                                <img src={item.img} alt='img'/>
                            </div>
                            <footer>
                                <span className='font-ellipse room-owner'>
                                    <Icon type="home" />
                                    <span>{ item.owner }</span>
                                </span>
                                <span className='font-ellipse room-count'>
                                    <Icon type="user" />
                                    <span>{ item.count } 人</span>
                                </span>
                            </footer>
                        </div>
                    ))
                }
            </ul>
            <Pagination className='room-pagination' defaultCurrent={1} total={roomList.length} />
        </Spin>
    );
};

export default withRouter(RoomList);
