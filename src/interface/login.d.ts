declare namespace LoginDTS {
    interface Store {
        actions: {
            login: Login;
        };
    }

    type Login = (form: any) => void;
}
