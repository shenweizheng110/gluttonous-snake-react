declare namespace PersonalDTS {
    interface UserInfo {
        id: string;
        userId: string;
        username: string;
        phone: string;
        email: string;
        age: number;
        gender: string;
        signature: string;
        headImg: string;
    }

    type HandleSubmit = (form: any) => void;

    type GetUserInfo = (userId: string) => void;

    type GetBase64 = (img: any, callback: any) => void;

    type BeforeUpload = (info: any) => void;

    type HandleUploadChange = (info: any) => void;

    type HandleChangePhone = (form: any) => void;

    type HandleChangePassword = (form: any) => void;

    interface Store {
        userInfo: UserInfo;
        imgUrl: string;
        loading: boolean;
        imgBack: string;
        codeNum: number;

        actions: {
            handleBaseInfoSubmit: HandleSubmit;
            getUserInfo: GetUserInfo;
            beforeUpload: BeforeUpload;
            handleUploadChange: HandleUploadChange;
            sendCode: RegisterDTS.SendCode;
            handleChangePhone: HandleChangePhone;
            handleChangePassword: HandleChangePassword;
        };
    }
}
