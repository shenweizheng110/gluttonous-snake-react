import * as React from 'react';
import RoomList from './modules/RoomList';
import RoomFilter from './modules/RoomFilter';
import RoomStore from './stores/roomStore';

const Room: React.FunctionComponent = () => {
    return (
        <div className='room'>
            <RoomStore>
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
            </RoomStore>
        </div>
    );
};

export default Room;

