import * as React from 'react';
import { draw } from '../../utils/util';
import { Spin, message, Modal } from 'antd';
import { send } from '../../utils/util';
import Common from '../../interface/common';

const { useEffect, useRef, useState } = React;

let animateId: any;
let ws: WebSocket;
let context: CanvasRenderingContext2D;
let pvpCanvasEl: HTMLCanvasElement;

const PvP: React.FunctionComponent<Common.NavigatorComponent> = ({ history }) => {
    const pvpCanvasRef = useRef(null);

    const [pageLoading, setPageLoading] = useState<boolean>(true);

    const [rankList, setRankList] = useState<PvpRankItem[]>([]);

    /**
     * 开始游戏
     */
    // const start: VoidFnc = () => {
    //     /* animateId = window.requestAnimationFrame(() => {
    //         if (!ws) {
    //             return;
    //         }
    //         if (isCanMove && !isGameOver) {
    //             send(ws, 'move', {
    //                 roomId: sessionStorage.getItem('roomId'),
    //                 userId: sessionStorage.getItem('userId'),
    //                 maxWidth: pvpCanvasEl.width,
    //                 maxHeight: pvpCanvasEl.height
    //             });
    //             isCanMove = false;
    //         }
    //         start();
    //     }); */
    // };

    /**
     * 处理结束游戏
     */
    const handleGameOver = (gameOverUserIds: string[]) => {
        // window.cancelAnimationFrame(animateId);
        let userId = sessionStorage.getItem('userId');
        if (gameOverUserIds.indexOf(userId) !== -1) {
            // isGameOver = true;
            document.onkeydown = null;
            document.onkeyup = null;
            Modal.info({
                title: '呦～呵',
                content: (
                    <span>GameOver!!!</span>
                ),
                onOk() {
                    history.push('/home/room');
                }
            });
        }
    };

    // 注册 ws 事件
    const registerWsEvent: WsEventsFnc = ws => {
        ws.onmessage = ({ data }) => {
            let ret: any = JSON.parse(data);
            let { errMsg } = ret.data;
            if (errMsg) {
                message.error(errMsg);
                history.push('/home/room');
                return;
            }
            switch (ret.type) {
                case 'show':
                    let { snakeInfo, beans, rankList } = ret.data;
                    draw({ snakeInfo, beans }, context, pvpCanvasEl);
                    setRankList(rankList);
                    context.setTransform(1, 0, 0, 1, 0, 0);
                    break;
                case 'gameOver':
                    handleGameOver(ret.data.data);
                    break;
                case 'error':
                    break;
            }
        };
        ws.onclose = () => {
            window.cancelAnimationFrame(animateId);
        };
        ws.onerror = () => {
            window.cancelAnimationFrame(animateId);
        };
    };

    useEffect(() => {
        pvpCanvasEl = pvpCanvasRef.current;
        pvpCanvasEl.width = window.innerWidth;
        pvpCanvasEl.height = window.innerHeight;
        /* pvpCanvasEl.width = 1600;
        pvpCanvasEl.height = 600; */
        context = pvpCanvasEl.getContext('2d');
        // context.scale(2, 2);
        window.cancelAnimationFrame(animateId);
        ws = new WebSocket('ws://localhost:3000/api/pvp');
        ws.onopen = () => {
            setPageLoading(false);
            registerWsEvent(ws);
            send(ws, 'init', {
                roomId: sessionStorage.getItem('roomId'),
                userId: sessionStorage.getItem('userId')
            });
            // animateId = window.requestAnimationFrame(start);
            // 开始游戏
            /* setTimeout(() => {
                start();
            }, 100); */
            // 注册键盘监听
            document.onkeydown = ({ keyCode }) => {
                send(ws, 'direction', {
                    roomId: sessionStorage.getItem('roomId'),
                    userId: sessionStorage.getItem('userId'),
                    keyCode
                });
            };
            document.onkeyup = ({ keyCode }) => {
                send(ws, 'destorySpeedUp', {
                    roomId: sessionStorage.getItem('roomId'),
                    userId: sessionStorage.getItem('userId'),
                    keyCode
                });
            };
        };
        return () => {
            send(ws, 'leaveGame', {
                roomId: sessionStorage.getItem('roomId'),
                userId: sessionStorage.getItem('userId')
            });
            sessionStorage.removeItem('roomId');
            sessionStorage.removeItem('ownerId');
            ws.close();
            document.onkeydown = null;
        };
    }, []);

    return (
        <Spin spinning={pageLoading}>
            <div className='pvp'>
                <div className='pvp-rank'>
                    <h2>排行榜</h2>
                    <div className='rank-content'>
                        {
                            rankList.map((item, index) => (
                                <div
                                    className='rank-content-item'
                                    key={item.username}
                                    style={{
                                        color: sessionStorage.getItem('userId') === item.userId ? '#CC3333' : null
                                    }}
                                >
                                    <span>#{ index + 1 }</span>
                                    <span className='font-ellipse'>{ item.username }</span>
                                    <span className='font-ellipse'>{ item.score }</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <canvas id="pvpCanvas" width="400" height="400" ref={pvpCanvasRef} />
            </div>
        </Spin>
    );
};

export default PvP;
