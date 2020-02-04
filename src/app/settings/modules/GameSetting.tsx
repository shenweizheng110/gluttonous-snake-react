import * as React from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

const GameSetting: React.FunctionComponent<FormComponentProps> = ({ form }) => {
    const { getFieldDecorator } = form;
    const snakeNodeColors: string[] = ['#336633', '#336666', '#336699', '#336633', '#336666', '#336699', '#336633', '#336666', '#336699', '#336633', '#336666', '#336699', '#336633', '#336666', '#336699', '#336633', '#336666', '#336699', '#336633', '#336666', '#336699', '#336633', '#336666', '#336699', '#336633', '#336666', '#336699', '#336633', '#336666', '#336699', '#336633', '#336666', '#336699', '#336633', '#336666', '#336699'];

    return (
        <>
            <Form layout='inline' className='filter-form game-setting-form'>
                <FormItem label='初始速度'>
                    {
                        getFieldDecorator('initSpeed', {})(
                            <Input
                                placeholder='请输入初始速度'
                                className='filter-input'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='警告颜色'>
                    {
                        getFieldDecorator('dangerColor', {})(
                            <Input
                                placeholder='请输入初始速度'
                                className='filter-input'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='蛇睛颜色'>
                    {
                        getFieldDecorator('eyeColor', {})(
                            <Input
                                placeholder='请输入初始速度'
                                className='filter-input'
                            />
                        )
                    }
                </FormItem>
                <FormItem label='节点颜色'>
                    <div className='node-color-choose-area'>
                        {
                            snakeNodeColors.map((item, index) => (
                                <span key={index} className='node-color-item' style={{ backgroundColor: item }}></span>
                            ))
                        }
                    </div>
                </FormItem>
                <FormItem label='已选颜色'>
                    <div className='node-color-choose-area'>
                        {
                            snakeNodeColors.map((item, index) => (
                                <span key={index} className='node-color-item' style={{ backgroundColor: item }}></span>
                            ))
                        }
                    </div>
                </FormItem>
            </Form>
            <div className='setting-footer m-t-24 t-r'>
                <Button type='primary' className='primary-button m-r-16'>保存配置</Button>
                <Button type='default' className='default-button'>恢复默认</Button>
            </div>
        </>
    );
};

export default Form.create({})(GameSetting);
