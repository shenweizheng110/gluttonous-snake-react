import * as React from 'react';
import { draw } from '../../utils/util';
import { Spin, message } from 'antd';
import { send } from '../../utils/util';

const { useEffect, useRef, useState } = React;

let animateId: number;
let ws: WebSocket;
let context: CanvasRenderingContext2D;
let pvpCanvasEl: HTMLCanvasElement;

const PvP: React.FunctionComponent = () => {
    const pvpCanvasRef = useRef(null);

    const [pageLoading, setPageLoading] = useState<boolean>(true);

    /**
     * 开始游戏
     */
    const start: VoidFnc = () => {
        animateId = window.requestAnimationFrame(() => {
            if (!ws) {
                return;
            }
            send(ws, 'move', {
                roomId: sessionStorage.getItem('roomId'),
                userId: sessionStorage.getItem('userId'),
                maxWidth: pvpCanvasEl.width,
                maxHeight: pvpCanvasEl.height
            });
            start();
        });
    };

    // 注册 ws 事件
    const registerWsEvent: WsEventsFnc = ws => {
        ws.onmessage = ({ data }) => {
            let ret: WsAPIRes = JSON.parse(data);
            let { errMsg } = ret.data;
            if (errMsg) {
                message.error(errMsg);
                return;
            }
            switch (ret.type) {
                case 'show':
                    let { snakeInfo, beans } = ret.data.data;
                    draw({ snakeInfo, beans }, context, pvpCanvasEl);
                    break;
                case 'gameOver':
                    window.cancelAnimationFrame(animateId);
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
        context = pvpCanvasEl.getContext('2d');
        window.cancelAnimationFrame(animateId);
        ws = new WebSocket('ws://localhost:3000/api/pvp');
        ws.onopen = () => {
            setPageLoading(false);
            registerWsEvent(ws);
            send(ws, 'init', {
                roomId: sessionStorage.getItem('roomId'),
                userId: sessionStorage.getItem('userId'),
                canvasWidth: pvpCanvasEl.width,
                canvasHeight: pvpCanvasEl.height
            });
            // 开始游戏
            setTimeout(() => {
                start();
            }, 100);
            // 注册键盘监听
            document.onkeydown = ({ keyCode }) => {
                send(ws, 'direction', {
                    roomId: sessionStorage.getItem('roomId'),
                    userId: sessionStorage.getItem('userId'),
                    keyCode
                });
            };
        };
        return () => {
            ws.close();
            document.onkeydown = null;
        };
    }, []);

    const rank: PvpRankItem[] = [{
        username: 'Smail~Every',
        score: 10011
    }, {
        username: 'zhaoxiaohong',
        score: 10012
    }, {
        username: '张三',
        score: 90
    }, {
        username: '李四',
        score: 57
    }];

    return (
        <Spin spinning={pageLoading}>
            <div className='pvp'>
                <div className='pvp-rank'>
                    <h2>排行榜</h2>
                    <div className='rank-content'>
                        {
                            rank.map((item, index) => (
                                <div className='rank-content-item' key={item.username}>
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
