declare namespace RankDTS {
    interface RankListItem {
        username: string;
        headImg: string;
        value: number;
        userId: string;
        favour: string;
        favourRecordId: number;
    }

    type GetRankList = (type: string, page: number, pageSize: number) => void;

    type HandleFavour = (favourUserId: string, recordId: number) => void;

    interface RankStoreValue {
        rankList: RankListItem[];
        rankIndex: number;
        activeName: string;

        actions: {
            getRankList: GetRankList;
            handleFavour: HandleFavour;
        };
    }

    /* interface RankListCom {
        type: string;
        typeZH: string;
    } */

    // 排行榜 list 组件下方 icon text 组件的props
    type IconTextProps = {
        type: string;
        text: string;
        userId: string;
        favourRecordId: number;
    }

    // 排行榜 list footer 组件
    type RankListFooterProps = {
        rank: number | string;
    }

    type HandleTabChange = (activeKey: string) => void;
}
