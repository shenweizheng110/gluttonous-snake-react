declare namespace ResetDTS {
    type SendCode = (form: any) => void;

    type ResetPassword = (form: any) => void;

    interface Store {
        codeNum: number;

        actions: {
            resetPassword: ResetPassword;
            sendCode: SendCode;
        };
    }
}
