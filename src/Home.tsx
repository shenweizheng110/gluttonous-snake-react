import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../style/main.less';
import { ConfigProvider, Avatar } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Rank from './app/rank';
import Room from './app/room';
import RoomCompare from './app/roomPrepare';
import PvP from './app/pvp';
import Login from './app/login';
import Settings from './app/settings';
import Header from './app/common/Header';
import Register from './app/register';
import Personal from './app/personal';
import Reset from './app/reset';
import Compete from './app/compete';

const mountNode: Element = document.getElementById('root');

const Home: React.FunctionComponent = () => {
    return (
        <div className='home'>
            <Link to='/home'>
                <Header />
            </Link>
            <Route exact path='/home' component={Rank} />
            <Route exact path='/home/room' component={Room} />
            <Route exact path='/home/roomPrepare' component={RoomCompare} />
            <Route exact path='/home/settings' component={Settings} />
            <Route exact path='/home/personal' component={Personal} />
            <Link to='/home/settings'>
                <div className='settings-right-bottom'>
                    <img src='http://qiniu.shenweini.cn/settings.png' alt='设置中心' />
                    <h3>设置中心</h3>
                </div>
            </Link>
            <div className='home-user'>
                <Link to='/home/personal'>
                    <Avatar size={48} src={sessionStorage.getItem('headImg') || 'http://qiniu.shenweini.cn/list1.jpeg'} />
                </Link>
            </div>
            <Link to='/home/room'>
                <div className='settings-left-bottom'>
                    <img src='http://qiniu.shenweini.cn/room.png' alt='游戏大厅' />
                    <h3>游戏大厅</h3>
                </div>
            </Link>
        </div>
    );
};

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Router>
            <Route path='/home' component={Home} />
            <Route path='/pvp' component={PvP} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/reset' component={Reset} />
            <Route path='/compete' component={Compete} />
        </Router>
    </ConfigProvider>,
    mountNode
);
