import * as React from 'react';
import { Icon, Pagination } from 'antd';
import { useMaxHeight } from '../../../utils/customHook';

const { useState, useEffect } = React;

const RoomList: React.FunctionComponent = () => {

    const [roomList, setRoomList] = useState([]);

    const maxHeight = useMaxHeight(120 + 150 + 40 + 40 + 30);

    useEffect(() => {
        let res = [];
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
    }, []);

    return (
        <>
            <ul className='room-list' style={{
                maxHeight: maxHeight
            }}>
                {
                    roomList.map(item => (
                        <div className='room-item' key={item.roomId}>
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
        </>
    );
};

export default RoomList;
