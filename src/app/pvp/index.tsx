import * as React from 'react';
import { draw } from '../../utils/util';

const { useEffect, useRef } = React;

let animateId: number;
let ws: WebSocket;
let userId = '1';
let context: CanvasRenderingContext2D;
let pvpCanvasEl: HTMLCanvasElement;

// 注册 ws 事件
const registerWsEvent: WsEventsFnc = ws => {
    ws.onmessage = ({ data }) => {
        let { type } = JSON.parse(data);
        switch (type) {
            case 'show':
                let { snakeInfo, beans } = JSON.parse(data);
                draw({ snakeInfo, beans }, context, pvpCanvasEl);
                break;
            case 'gameOver':
                // let { snake } = JSON.parse(data);
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

// 初始化页面
const initPage: WsEventsFnc = ws => {
    ws.onopen = () => {
        registerWsEvent(ws);
        ws.send(JSON.stringify({
            type: 'login',
            userId: userId,
            username: 'Smail~Every',
            canvasWidth: pvpCanvasEl.width,
            canvasHeight: pvpCanvasEl.height
        }));
        ws.send(JSON.stringify({
            type: 'show'
        }));
    };
};

const PvP: React.FunctionComponent = () => {
    const pvpCanvasRef = useRef(null);

    useEffect(() => {
        pvpCanvasEl = pvpCanvasRef.current;
        pvpCanvasEl.width = window.innerWidth;
        pvpCanvasEl.height = window.innerHeight;
        context = pvpCanvasEl.getContext('2d');
        window.cancelAnimationFrame(animateId);
        ws = new WebSocket('ws://localhost:8080');
        initPage(ws);
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
    );
};

export default PvP;
