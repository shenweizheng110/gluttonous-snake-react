declare namespace RegisterDTS {

    type Register = (form: any) => void;

    type GetBase64 = (img: any, callback: any) => void;

    type BeforeUpload = (info: any) => void;

    type HandleUploadChange = (info: any) => void;

    type SendCode = (form: any) => void;

    interface Store {
        loading: boolean;
        imgUrl: string;
        codeNum: number;

        actions: {
            register: Register;
            beforeUpload: BeforeUpload;
            handleUploadChange: HandleUploadChange;
            sendCode: SendCode;
        };
    }
}
