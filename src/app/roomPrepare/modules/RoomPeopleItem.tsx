import * as React from 'react';
import { Avatar, Icon } from 'antd';

const RoomPeopleItem: React.FunctionComponent<RoomPeopleItemProps> = ({ roomInfo }) => {
    const { name, url, isOwner, isPrepare, ownerId } = roomInfo;

    return (
        <div className='room-compare-item'>
            <Avatar src={url} shape='square' size={60} alt={name} />
            <div className='people-name font-ellipse'>
                {
                    isOwner
                        ? (
                            <>
                                <Icon type='home' />
                            </>
                        )
                        : isPrepare
                            ? <Icon type='check-circle' />
                            : <Icon type='loading' />
                }
                {
                    // 判断是不是房主视角
                    sessionStorage.getItem('userId') === ownerId
                        ? !isOwner && <Icon type="close-circle" className='people-close' />
                        : null
                }
                <span className='name-area'>{ name }</span>
            </div>
        </div>
    );
};

export default RoomPeopleItem;
