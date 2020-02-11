import * as React from 'react';
import { List, Icon, Avatar } from 'antd';
import { useMaxHeight } from '../../../utils/customHook';
import { RankStoreContext } from '../stores/rankStore';

const RankListFooter: React.FunctionComponent<RankDTS.RankListFooterProps> = ({ rank }) => (
    <div className='rank-list-footer'>
        <span>当前排名：{ rank }</span>
        <a href='javascript:;'>查看完整榜单{'>>'}</a>
    </div>
);

const { useContext } = React;

const RankList: React.FunctionComponent = () => {
    const store = useContext<RankDTS.RankStoreValue>(RankStoreContext);
    const { rankList, rankIndex, actions, activeName } = store;

    const maxHeight = useMaxHeight(230);

    const IconText: React.FunctionComponent<RankDTS.IconTextProps> = ({ type, text, userId, favourRecordId }) => (
        <span
            className={`rank-favour m-l-24 ${favourRecordId ? '' : 'not-liked'}`}
            onClick={() => actions.handleFavour(userId, favourRecordId)}
        >
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
    );

    return (
        <>
            <List
                className='rank-list'
                style={{
                    maxHeight: maxHeight
                }}
                itemLayout='vertical'
                size='large'
                dataSource={rankList}
                footer={<RankListFooter rank={rankIndex} />}
                renderItem={(item, index) => (
                    <List.Item
                        key={item.userId}
                        extra={
                            index <= 2
                                ? <img
                                    width={48}
                                    alt="logo"
                                    src={`http://qiniu.shenweini.cn/rank-${index + 1}-64.png`}
                                />
                                : <span className='rank-count'>{ index + 1 }</span>
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.headImg} size={48} />}
                            title={<a href='javascript:;'>{item.username}</a>}
                        />
                        <span className='rank-list-desc'>
                            <span>{ activeName }：</span>
                            <span className='list-value'>{ item.value }</span>
                            <IconText
                                type='like-o'
                                text={item.favour}
                                userId={item.userId}
                                favourRecordId={item.favourRecordId}
                            />
                        </span>
                    </List.Item>
                )}
            ></List>
        </>
    );
};

export default RankList;
