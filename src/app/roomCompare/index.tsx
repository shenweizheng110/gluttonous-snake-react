import * as React from 'react';
import { Button } from 'antd';
import { useMaxHeight } from '../../utils/customHook';
import RoomPeopleItem from './modules/RoomPeopleItem';

const { useState } = React;

const RoomCompare: React.FunctionComponent = () => {
    const [isCompare, setCompare] = useState(false);

    const maxHeight = useMaxHeight(120 + 16 + 32);

    const people: RoomPeopleItem[] = [{
        id: 1,
        name: 'Smail~Every',
        url: 'http://qiniu.shenweini.cn/list2.jpeg',
        isCompare: true,
        isOwner: true
    }, {
        id: 2,
        name: '赵小宏',
        url: 'http://qiniu.shenweini.cn/list1.jpeg',
        isCompare: true,
        isOwner: false
    }];

    const handleCompare: VoidFnc = () => {
        setCompare(!isCompare);
    };

    return (
        <div className='room-compare'>
            <div className='people-list' style={{
                maxHeight: maxHeight,
                minHeight: maxHeight
            }}>
                {
                    people.map(item => (
                        <RoomPeopleItem key={item.id} roomInfo={item} />
                    ))
                }
            </div>
            <div className='room-compare-footer'>
                <Button
                    type='primary'
                    className='primary-button'
                    onClick={handleCompare}
                >{ isCompare ? '取消准备' : '准备' }</Button>
            </div>
        </div>
    );
};

export default RoomCompare;
