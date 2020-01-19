import * as React from 'react';
import RoomList from './modules/RoomList';
import RoomFilter from './modules/RoomFilter';

const Room: React.FunctionComponent = () => {
    return (
        <div className='room'>
            <div className='page-box'>
                <div className='box-title'>
                    <h3>房间筛选</h3>
                </div>
                <div className='box-content'>
                    <RoomFilter />
                </div>
            </div>
            <div className='page-box'>
                <div className='box-title'>
                    <h3>房间列表</h3>
                </div>
                <div className='box-content'>
                    <RoomList />
                </div>
            </div>
        </div>
    );
};

export default Room;
