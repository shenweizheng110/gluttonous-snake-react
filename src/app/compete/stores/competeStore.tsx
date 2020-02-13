import * as React from 'react';
import { nodeGap, getMaxCount } from './config';
import axios from '../../../utils/request';
import { message, Modal } from 'antd';
import { init, changeDirection, move } from './snake';
import {
    init as rightInit,
    calcDirection,
    changeDirection as changeRightDirection,
    move as rightMove
} from './autoSnake';
import Common from '../../../interface/common';
import { withRouter } from 'react-router-dom';

const [xMaxCount, yMaxCount] = getMaxCount();

const { createContext, useEffect } = React;

export const CompeteStoreContext = createContext(null);

let personalScore: number = null;

let autoScore: number = null;

let userConfig: CompeteDTS.UserConfig = null;

let leftIntervalId: any = null;

let rightIntervalId: any = null;

const CompeteStore: React.FunctionComponent<Common.NavigatorComponent> = ({ children, history }) => {
    const saveScore: VoidFnc = () => {
        axios.post('/api/user/update/score', {
            userId: sessionStorage.getItem('userId'),
            maxScore: personalScore > userConfig.maxScore ? personalScore : userConfig.maxScore
        }).then(res => {
            let { status } = res.data;
            if (status.code === 1) {
                history.push('/home');
            }
        }).catch(error => {
            message.error(error);
            console.log(error);
        });
    };

    const handleGameOver = () => {
        Modal.info({
            title: '呦～呵',
            content: (
                <>
                    <span>GameOver!!!</span>
                    <p>得分为：{ personalScore }</p>
                </>
            ),
            onOk() {
                saveScore();
            }
        });
    };

    const startRightSnake = () => {
        rightInit(
            (Math.floor(xMaxCount / 2) - 1) * nodeGap + '',
            (Math.floor(yMaxCount / 2) - 1) * nodeGap + '',
            {
                initDirection: 'Top',
                up: '87',
                down: '83',
                left: '65',
                right: '68'
            },
            'right'
        );
        rightIntervalId = setInterval(() => {
            let dirtection = calcDirection();
            changeRightDirection(null, dirtection);
            let score = rightMove();
            if (score) {
                window.clearInterval(rightIntervalId);
            }
        }, 100);
    };

    const startLeftSnake = (userConfig: any) => {
        init(
            (Math.floor(xMaxCount / 2) - 1) * nodeGap + '',
            (Math.floor(yMaxCount / 2) - 1) * nodeGap + '',
            userConfig,
            'left'
        );
        leftIntervalId = setInterval(() => {
            let score = move();
            if (score) {
                window.clearInterval(leftIntervalId);
                document.onkeydown = null;
                personalScore = score;
                handleGameOver();
            }
        }, Math.floor(1000 / userConfig.initSpeed));
        document.onkeydown = ({ keyCode }) => {
            changeDirection(keyCode + '');
        };
    };

    const getUserConfig: CompeteDTS.UserAPI = (userId) => {
        axios.get('/api/user/scoreAndSettings', {
            params: {
                userId
            }
        }).then(res => {
            let { status, result } = res.data;
            if (status.code !== 1) {
                return;
            }
            userConfig = result.data;
            startLeftSnake(result.data);
            startRightSnake();
        }).catch(error => {
            message.error(error);
            console.log(error);
        });
    };

    const store: CompeteDTS.Store = {

        actions: {
            getUserConfig,
            saveScore
        }
    };

    useEffect(() => {
        return () => {
            clearInterval(leftIntervalId);
            clearInterval(rightIntervalId);
        };
    }, []);

    return (
        <>
            <CompeteStoreContext.Provider value={store}>
                { children }
            </CompeteStoreContext.Provider>
        </>
    );
};

export default withRouter(CompeteStore);
