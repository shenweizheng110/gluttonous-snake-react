import * as React from 'react';
import { Modal, Input } from 'antd';
import { RoomStoreContext } from '../stores/roomStore';

const { useContext, useState } = React;

interface EnterRoomProps {
    callback: any;
}

const EnterRoom: React.FunctionComponent<EnterRoomProps> = ({ callback }) => {
    const store = useContext(RoomStoreContext);

    const { enterModalVisible, actions } = store;

    const [password, setPassword] = useState();

    const handleInput = (e: any) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <Modal
                visible={enterModalVisible}
                title='输入密码'
                onCancel={actions.closeEnterRoomModal}
                onOk={() => actions.validEnterRoom(password, callback)}
            >
                <Input value={password} onInput={handleInput} />
            </Modal>
        </>
    );
};

export default EnterRoom;
