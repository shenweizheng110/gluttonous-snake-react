import * as React from 'react';
import { Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/es/Form';
import { RoomStoreContext } from '../stores/roomStore';

const FormItem = Form.Item;

const { useContext } = React;

interface AddRoomProps extends FormComponentProps {
    handleEnterRoom: RoomDTS.HandleEnterRoom;
}

const AddRoom: React.FunctionComponent<AddRoomProps> = ({ form, handleEnterRoom }) => {
    const store = useContext<RoomDTS.RoomStore>(RoomStoreContext);

    const { actions, isShowModal } = store;

    const { getFieldDecorator } = form;

    const formRules = {
        roomName: [{
            required: true,
            message: '房间名称不为空'
        }],
        roomPassword: [{
            len: 6,
            message: '最多六位数密码'
        }],
        speed: [{
            type: 'number',
            message: '请输入整数'
        }, {
            pattern: /^[1-10]$/,
            message: '速度范围为1-10'
        }]
    };

    return (
        <Modal
            title='创建房间'
            visible={isShowModal}
            width={700}
            onCancel={() => actions.closeModal(form)}
            onOk={() => actions.addRoom(form, handleEnterRoom)}
        >
            <Form layout='inline' className='add-room-form'>
                <FormItem label='房间名称'>
                    {
                        getFieldDecorator('roomName', {
                            rules: formRules['roomName']
                        })(
                            <Input placeholder='请输入房间名称' />
                        )
                    }
                </FormItem>
                <FormItem label='房间密码'>
                    {
                        getFieldDecorator('roomPassword', {
                            rules: formRules['roomPassword']
                        })(
                            <Input placeholder='请输入房间名称' />
                        )
                    }
                </FormItem>
                <FormItem label='最小速度'>
                    {
                        getFieldDecorator('minSpeed', {
                            rules: formRules['speed']
                        })(
                            <Input placeholder='请输入最小速度' />
                        )
                    }
                </FormItem>
                <FormItem label='最大速度'>
                    {
                        getFieldDecorator('maxSpeed', {
                            rules: formRules['speed']
                        })(
                            <Input placeholder='请输入最大速度' />
                        )
                    }
                </FormItem>
            </Form>
        </Modal>
    );
};

export default Form.create<AddRoomProps>({})(AddRoom);
