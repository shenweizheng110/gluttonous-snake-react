import * as React from 'react';
import { List, Icon, Avatar } from 'antd';
import { useMaxHeight } from '../../../utils/customHook';

const IconText: React.FunctionComponent<IconTextProps> = ({ type, text, liked }) => (
    <span className={`m-l-24 ${liked ? '' : 'not-liked'}`}>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

const RankListFooter: React.FunctionComponent<RankListFooterProps> = ({ rank }) => (
    <div className='rank-list-footer'>
        <span>当前排名：{ rank }</span>
        <a href='javascript:;'>查看完整榜单{'>>'}</a>
    </div>
);

const RankList: React.FunctionComponent = () => {
    const listData = [];
    for (let i = 0; i < 10; i++) {
        listData.push({
            href: 'http://ant.design',
            title: `ShenWeiNi ${i}`,
            avatar: i === 0 ? 'http://qiniu.shenweini.cn/list1.jpeg' : 'http://qiniu.shenweini.cn/list2.jpeg',
            description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            liked: i === 0,
            extra: i === 0 ? 'http://qiniu.shenweini.cn/first-64.png' : 'http://qiniu.shenweini.cn/second-64.png',
            value: 20 + i
        });
    }

    const maxHeight = useMaxHeight(230);

    return (
        <>
            <List
                className='rank-list'
                style={{
                    maxHeight: maxHeight
                }}
                itemLayout='vertical'
                size='large'
                dataSource={listData}
                footer={<RankListFooter rank='1' />}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        extra={
                            <img
                                width={48}
                                alt="logo"
                                src={item.extra}
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} size={48} />}
                            title={<a href={item.href}>{item.title}</a>}
                        />
                        <span className='rank-list-desc'>
                            <span>总击杀数：</span>
                            <span className='list-value'>{ item.value }</span>
                            <IconText type='like-o' text='156' liked={item.liked} />
                        </span>
                    </List.Item>
                )}
            ></List>
        </>
    );
};

export default RankList;
