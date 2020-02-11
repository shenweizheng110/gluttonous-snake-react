import * as React from 'react';
import { Button, message, Spin, Modal } from 'antd';
import { useMaxHeight } from '../../utils/customHook';
import RoomPeopleItem from './modules/RoomPeopleItem';
import { send } from '../../utils/util';
import Common from '../../interface/common';

const { useState, useEffect } = React;

let ws: WebSocket = null;

const RoomCompare: React.FunctionComponent<Common.NavigatorComponent> = ({ history }) => {
    const [isPrepare, setPrepare] = useState<boolean>(false);

    const [pageLoading, setPageLoading] = useState<boolean>(true);

    const [peoples, setPeoples] = useState<RoomPeopleItem[]>([]);

    const [hostId, setHostId] = useState<string>('');

    const maxHeight = useMaxHeight(120 + 16 + 32);

    // 处理玩家准备
    const handlePrepare: VoidFnc = () => {
        send(ws, 'prepare', {
            roomId: sessionStorage.getItem('roomId'),
            userId: sessionStorage.getItem('userId')
        });
    };

    // 处理开始游戏
    const handleStart: VoidFnc = () => {
        send(ws, 'start', {
            roomId: sessionStorage.getItem('roomId')
        });
    };

    // 处理获取游戏玩家的回调
    const handleRoomGameCallback: Game.HandleRoomGameCallback = (data) => {
        if (!data) {
            message.error('当前房间已失效');
            history.push('/home/room');
            return;
        }
        let users = data.users;
        setHostId(data.hostId);
        let peoples: RoomPeopleItem[] = Object.keys(data.users).map((userId: string) => {
            let userItem = users[userId];
            let { username, cover, enterIndex, isPrepare } = userItem;
            if (sessionStorage.getItem('userId') === userId) {
                setPrepare(isPrepare);
            }
            return {
                id: userId,
                name: username,
                url: cover,
                isPrepare: isPrepare,
                isOwner: data.hostId === userId,
                enterIndex: enterIndex,
                ownerId: data.hostId
            };
        });
        peoples.sort((val1, val2) => val1.enterIndex - val2.enterIndex);
        setPeoples(peoples);
    };

    // 处理离开房间回调
    const handleLeaveHomeCallback = () => {
        history.push('/home/room');
        sessionStorage.removeItem('ownerId');
    };

    // 注册 ws 事件
    const registerWsEvent: RegisterWsEvents = (ws) => {
        ws.onopen = () => {
            setPageLoading(false);
            send(ws, 'roomGame', {
                roomId: sessionStorage.getItem('roomId'),
                userId: sessionStorage.getItem('userId')
            });
        };

        ws.onmessage = ({ data }) => {
            let ret: WsAPIRes = JSON.parse(data);
            let { errMsg } = ret.data;
            if (errMsg) {
                message.error(errMsg);
                return;
            }
            switch (ret.type) {
                case 'roomGame':
                    handleRoomGameCallback(ret.data.data);
                    break;
                case 'start':
                    // ws.close();
                    history.push('/pvp');
                    break;
                case 'error':
                    message.error(errMsg);
                    break;
                case 'goHome':
                    handleLeaveHomeCallback();
                    break;
            };
        };

        ws.onerror = (ev) => {
            message.error(ev);
        };
    };

    const rebackRoomList = () => {
        if (sessionStorage.getItem('ownerId') === sessionStorage.getItem('userId')) {
            Modal.confirm({
                title: '确认',
                content: '房主离开房间，房间将删除，是否确认离开房间',
                onOk() {
                    history.push('/home/room');
                }
            });
        } else {
            history.push('/home/room');
        }
    };

    useEffect(() => {
        ws = new WebSocket('ws://localhost:3000/api/game');
        registerWsEvent(ws);

        return () => {
            send(ws, 'leaveRoom', {
                roomId: sessionStorage.getItem('roomId'),
                userId: sessionStorage.getItem('userId')
            });
            sessionStorage.removeItem('ownerId');
            ws.close();
        };
    }, []);

    return (
        <Spin spinning={pageLoading}>
            <div className='room-compare'>
                <div className='people-list' style={{
                    maxHeight: maxHeight,
                    minHeight: maxHeight
                }}>
                    {
                        peoples.map(item => (
                            <RoomPeopleItem key={item.id} roomInfo={item} />
                        ))
                    }
                </div>
                <div className='room-compare-footer'>
                    <Button
                        type='primary'
                        className='primary-button m-r-16'
                        onClick={rebackRoomList}
                    >返回大厅</Button>
                    {
                        hostId === sessionStorage.getItem('userId')
                            ? <Button
                                type='primary'
                                className='primary-button m-r-16'
                                onClick={handleStart}
                            >开始对局</Button>
                            : <Button
                                type='primary'
                                className='primary-button m-r-16'
                                onClick={handlePrepare}
                            >{ isPrepare ? '取消准备' : '准备' }</Button>
                    }
                </div>
            </div>
        </Spin>
    );
};

export default RoomCompare;
