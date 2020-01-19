import * as React from 'react';

const { useState, useEffect } = React;

// 动态高度
export const useMaxHeight = (subVal: number) => {
    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        setMaxHeight(window.innerHeight - subVal);
        window.onresize = () => {
            setMaxHeight(window.innerHeight - subVal);
        };

        return () => {
            window.onresize = null;
        };
    }, [subVal]);

    return maxHeight;
};
