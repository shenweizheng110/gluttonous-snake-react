import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import AddRoom from './AddRoom';

const FormItem = Form.Item;

const { useRef } = React;

const RoomFilter: React.FunctionComponent<FormComponentProps> = ({ form }) => {
    const { getFieldDecorator } = form;

    const addRoomRef = useRef();

    const openAddRoomModal: VoidFnc = () => {
        let { current } = addRoomRef;
        (current as ModalProps).openModal();
    };

    return (
        <>
            <Form layout='inline' className='filter-form'>
                <FormItem label='房间号'>
                    {
                        getFieldDecorator('roomId', {})(
                            <Input
                                placeholder='请输入房间ID'
                                className='filter-input'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='房间名称'>
                    {
                        getFieldDecorator('roomName', {})(
                            <Input
                                placeholder='请输入房间名称'
                                className='filter-input'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='房主名称'>
                    {
                        getFieldDecorator('owner', {})(
                            <Input
                                placeholder='请输入房主名称'
                                className='filter-input'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='最小速度'>
                    {
                        getFieldDecorator('miniSpeed', {})(
                            <Input
                                placeholder='请输入最小速度'
                                className='filter-input'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='最大速度'>
                    {
                        getFieldDecorator('maxSpeed', {})(
                            <Input
                                placeholder='请输入最大速度'
                                className='filter-input'
                            />
                        )
                    }
                </FormItem>
                <FormItem className='filter-form-action'>
                    <Button type='primary' className='m-r-16 primary-button'>筛选</Button>
                    <Button type='default' className='m-r-16 default-button'>重置</Button>
                    <Button type='primary' className='primary-button' onClick={openAddRoomModal}>创建房间</Button>
                </FormItem>
            </Form>
            <AddRoom selfRef={addRoomRef} />
        </>
    );
};

export default Form.create({ name: 'room' })(RoomFilter);
