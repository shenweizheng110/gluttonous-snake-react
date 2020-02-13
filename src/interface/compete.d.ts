declare namespace CompeteDTS {
    interface NodeItemProps {
        x: number;
        y: number;
        type: string;
    }

    type VoidFnc = () => void;

    type GetMaxCount = () => [number, number]

    interface SnakeNode {
        x: string;
        y: string;
        pre: SnakeNode;
        next: SnakeNode;
        type: string;
        isHead: boolean;
    }

    interface KeyCodeMapping {
        [keyCode: string]: string;
    }

    interface StringInterface {
        [key: string]: string;
    }

    type ClearSnakeNode = (snakeNode: SnakeNode) => void;

    type SnakeNodeIds = {
        [key: string]: boolean;
    };

    interface OpenItem {
        id: string;
        moveDirections: string[];
        f: number;
        g: number;
        h: number;
    }

    interface OpenJSON {
        [id: string]: OpenItem;
    }

    interface Close {
        [id: string]: boolean;
    }

    type DirectionOffsetItem = [number, number];

    type DirectionOffset = {
        [direction: string]: DirectionOffsetItem;
    };

    type DeepCopySnake = (targetHead: CompeteDTS.SnakeNode, snakeHead: CompeteDTS.SnakeNode, targetHeadBack: CompeteDTS.SnakeNode) => CompeteDTS.SnakeNode;

    type UserAPI = (userId: string) => void;

    interface Store {
        actions: {
            getUserConfig: UserAPI;
            saveScore: UserAPI;
        };
    }

    interface UserConfig {
        userId: string;
        maxScore: number;
        up: string;
        down: string;
        left: string;
        right: string;
        start: string;
        initSpeed: number;
        initDirection: string;
    }
}
