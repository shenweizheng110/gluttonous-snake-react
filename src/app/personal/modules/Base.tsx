import * as React from 'react';
import { FormComponentProps } from 'antd/es/Form';
import { Form, Input, Button, Select, Upload, Icon, InputNumber } from 'antd';
import { PersonalStoreContext } from '../stores/personalStore';

const Option = Select.Option;

const FormItem = Form.Item;

const { useContext, useEffect } = React;

const Base: React.FunctionComponent<FormComponentProps> = ({ form }) => {
    const { getFieldDecorator } = form;

    const store = useContext(PersonalStoreContext);

    const { loading, imgUrl, actions, userInfo } = store;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    useEffect(() => {
        actions.getUserInfo(sessionStorage.getItem('userId'));
    }, []);

    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className='ant-upload-text'>Upload</div>
        </div>
    );

    return (
        <>
            <Form {...formItemLayout} className='personal-form'>
                <div className='form-left'>
                    <FormItem label='用户名'>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '用户名不为空' }],
                            initialValue: userInfo && userInfo.username
                        })(
                            <Input
                                placeholder='请输入用户名'
                                autoComplete='off'
                            />
                        )}
                    </FormItem>
                    <FormItem label='邮箱'>
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: '邮箱不为空' },
                                { type: 'email', message: '邮箱格式错误' }
                            ],
                            initialValue: userInfo && userInfo.email
                        })(
                            <Input
                                placeholder='请输入邮箱'
                                autoComplete='off'
                            />
                        )}
                    </FormItem>
                    <FormItem label='年龄'>
                        {getFieldDecorator('age', {
                            rules: [
                                { required: true, message: '年龄不为空' }
                            ],
                            initialValue: userInfo && userInfo.age
                        })(
                            <InputNumber
                                placeholder='请输入年龄'
                                autoComplete='off'
                                min={3}
                                max={100}
                            />
                        )}
                    </FormItem>
                </div>
                <div className='form-right'>
                    <FormItem label='性别'>
                        {getFieldDecorator('gender', {
                            rules: [{ required: true, message: '性别不为空' }],
                            initialValue: userInfo && userInfo.gender
                        })(
                            <Select placeholder='请选择性别'>
                                <Option value='male'>男性</Option>
                                <Option value='female'>女性</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label='个性签名'>
                        {getFieldDecorator('signature', {
                            rules: [{ required: true, message: '请输入个性签名' }],
                            initialValue: userInfo && userInfo.signature
                        })(
                            <Input
                                placeholder='请输入个性签名'
                                autoComplete='off'
                            />
                        )}
                    </FormItem>
                    <FormItem label='头像'>
                        {getFieldDecorator('headImg', {
                            rules: [{ required: true, message: '请上传头像' }],
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                            initialValue: [{
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: userInfo && userInfo.headImg
                            }]
                        })(
                            <Upload
                                name='file'
                                listType='picture-card'
                                className='avatar-uploader'
                                showUploadList={false}
                                action='http://localhost:3000/api/common/upload'
                                beforeUpload={actions.beforeUpload}
                                onChange={actions.handleUploadChange}
                            >
                                { imgUrl ? <img src={imgUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        )}
                    </FormItem>
                </div>
            </Form>
            <div className='setting-footer m-t-24 t-r'>
                <Button
                    type='primary'
                    className='primary-button m-r-16'
                    onClick={() => actions.handleBaseInfoSubmit(form)}
                >保存修改</Button>
            </div>
        </>
    );
};

export default Form.create({})(Base);
