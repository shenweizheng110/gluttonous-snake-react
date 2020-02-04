import * as H from 'history';

declare namespace Common {
    interface NavigatorComponent {
        history: H.History;
    }
}

export default Common;
