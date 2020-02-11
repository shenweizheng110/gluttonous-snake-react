import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import { RoomStoreContext } from '../stores/roomStore';

const FormItem = Form.Item;

const { useContext } = React;

const RoomFilter: React.FunctionComponent<FormComponentProps> = ({ form }) => {
    const store = useContext<RoomDTS.RoomStore>(RoomStoreContext);

    const { actions } = store;

    const { getFieldDecorator } = form;

    const validNumber = (e: any) => e.target.value.replace(/\D/g, '');

    return (
        <>
            <Form layout='inline' className='filter-form'>
                <FormItem label='房间号'>
                    {
                        getFieldDecorator('roomId', {
                            getValueFromEvent: validNumber
                        })(
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
                        getFieldDecorator('ownerName', {})(
                            <Input
                                placeholder='请输入房主名称'
                                className='filter-input'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='最小速度'>
                    {
                        getFieldDecorator('miniSpeed', {
                            getValueFromEvent: validNumber
                        })(
                            <Input
                                placeholder='请输入最小速度'
                                className='filter-input'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='最大速度'>
                    {
                        getFieldDecorator('maxSpeed', {
                            getValueFromEvent: validNumber
                        })(
                            <Input
                                placeholder='请输入最大速度'
                                className='filter-input'
                            />
                        )
                    }
                </FormItem>
                <FormItem className='filter-form-action'>
                    <Button type='primary' className='m-r-16 primary-button' onClick={() => actions.filterRoom(form)}>筛选</Button>
                    <Button type='default' className='m-r-16 default-button' onClick={() => actions.resetFilter(form)}>重置</Button>
                    <Button type='primary' className='primary-button' onClick={actions.openModal}>创建房间</Button>
                </FormItem>
            </Form>
        </>
    );
};

export default Form.create({ name: 'room' })(RoomFilter);
