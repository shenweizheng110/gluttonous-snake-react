export const nodeGap = 30;

export const defaultNodeColor = 'rgba(0, 0, 0, 0.5)';

export const headNodeColor = '#CC0033';

export const notNodeColor = '#fff';

export const beanColor = '#CCFF33';

export const getMaxCount: CompeteDTS.GetMaxCount = () => [
    Math.floor((window.innerWidth - nodeGap) / 2 / nodeGap),
    Math.floor((window.innerHeight - nodeGap) / nodeGap)
];
