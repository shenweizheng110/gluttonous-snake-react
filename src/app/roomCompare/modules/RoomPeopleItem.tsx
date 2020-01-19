import * as React from 'react';
import { Avatar, Icon } from 'antd';

const RoomPeopleItem: React.FunctionComponent<RoomPeopleItemProps> = ({ roomInfo }) => {
    const { name, url, isOwner, isCompare } = roomInfo;

    return (
        <div className='room-compare-item'>
            <Avatar src={url} shape='square' size={60} alt={name} />
            <div className='people-name font-ellipse'>
                {
                    isOwner
                        ? <Icon type='home' />
                        : isCompare
                            ? <Icon type='check-circle' />
                            : <Icon type='loading' />
                }
                {
                    !isOwner && <Icon type="close-circle" className='people-close' />
                }
                <span className='name-area'>{ name }</span>
            </div>
        </div>
    );
};

export default RoomPeopleItem;
