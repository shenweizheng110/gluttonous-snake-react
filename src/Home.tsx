import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../style/main.less';
import { handleCanvasVague } from './utils/util';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Rank from './app/rank';
import Room from './app/room';
import RoomCompare from './app/roomCompare';
import PvP from './app/pvp';

const { useEffect, useRef } = React;

const mountNode: Element = document.getElementById('root');

const Home: React.FunctionComponent = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const logoEl: HTMLCanvasElement = canvasRef.current;
        const context: CanvasRenderingContext2D = logoEl.getContext('2d');
        handleCanvasVague(context, logoEl);
        context.textAlign = 'center';
        context.font = 'bold 50px Georgia, serif';
        let gradient = context.createLinearGradient(0, 0, 400, 120);
        gradient.addColorStop(0, '#60FF70');
        gradient.addColorStop(1, '#9850FF');
        context.fillStyle = gradient;
        context.fillText('Gluttonous Snake', Math.round(logoEl.offsetWidth / 2), logoEl.offsetHeight / 1.2);
        context.fill();
    }, []);

    return (
        <div className='home'>
            <div className='flex-center'>
                <canvas ref={canvasRef} id='logo' width='500' height='120' />
            </div>
            <Route exact path='/home' component={Rank} />
            <Route exact path='/home/room' component={Room} />
            <Route exact path='/home/roomCompare' component={RoomCompare} />
        </div>
    );
};

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Router>
            <Route path='/home' component={Home} />
            <Route path='/pvp' component={PvP} />
        </Router>
    </ConfigProvider>,
    mountNode
);
