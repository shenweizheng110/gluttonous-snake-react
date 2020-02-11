import * as React from 'react';
import axios from '../../../utils/request';
import { message } from 'antd';

const { useState, createContext } = React;

export const RankStoreContext = createContext(null);

const RankStore: React.FunctionComponent = (props) => {
    const [rankList, setRankList] = useState<RankDTS.RankListItem[]>([]);

    const [rankIndex, setRankIndex] = useState<number>(0);

    const [activeKey, setActiveKey] = useState<string>('score');

    const [activeName, setActiveName] = useState<string>('最长长度');

    /**
     * 获取排行榜列表
     * @param type 当前tab页
     * @param page
     * @param pageSize
     */
    const getRankList: RankDTS.GetRankList = (type, page, pageSize) => {
        axios.get('/api/rank', {
            params: {
                type,
                page,
                pageSize,
                userId: sessionStorage.getItem('userId')
            }
        }).then(res => {
            let { result, status } = res.data;
            if (status.code !== 1) {
                return;
            }
            let { rankList, rankIndex } = result.data;
            setRankList(rankList);
            setRankIndex(rankIndex);
            setActiveKey(type);
            switch (activeKey) {
                case 'score':
                    setActiveName('最长长度');
                    break;
                case 'recordCount':
                    setActiveName('总对局数');
                    break;
                case 'defeatCount':
                    setActiveName('总击杀数');
                    break;
                case 'maxDefeat':
                    setActiveName('最多击杀');
                    break;
            }
        }).catch(error => {
            message.error(error);
            console.log(error);
        });
    };

    /**
     * 处理点赞和取消点赞
     * @param favourUserId 被操作用户id
     * @param recordId 点赞记录id
     */
    const handleFavour: RankDTS.HandleFavour = (favourUserId, recordId) => {
        axios.post('/api/user/favour', {
            userId: sessionStorage.getItem('userId'),
            favourId: favourUserId,
            recordId: recordId
        }).then(res => {
            let { status } = res.data;
            if (status.code !== 1) {
                return;
            }
            getRankList(activeKey, 1, 10);
        }).catch(error => {
            message.error(error);
            console.log(error);
        });
    };

    const store: RankDTS.RankStoreValue = {
        rankList,
        activeName,
        rankIndex: rankIndex + 1,

        actions: {
            getRankList,
            handleFavour
        }
    };

    return (
        <>
            <RankStoreContext.Provider value={store}>
                { props.children }
            </RankStoreContext.Provider>
        </>
    );
};

export default RankStore;
