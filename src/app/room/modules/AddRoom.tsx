import * as React from 'react';
import { Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/es/Form';

const FormItem = Form.Item;

const { useImperativeHandle, useState } = React;

interface ModalFormProps extends FormComponentProps {
    selfRef: React.Ref<ModalProps>;
}

const AddRoom: React.FunctionComponent<ModalFormProps> = ({ form, selfRef }) => {
    const [visible, setVisible] = useState(false);

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

    useImperativeHandle(selfRef, () => ({
        openModal: () => {
            setVisible(true);
        }
    }));

    // 处理弹窗关闭
    const handleCancel: VoidFnc = () => {
        form.resetFields();
        setVisible(false);
    };

    return (
        <Modal
            title='创建房间'
            visible={visible}
            width={700}
            onCancel={handleCancel}
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

export default Form.create<ModalFormProps>({})(AddRoom);
