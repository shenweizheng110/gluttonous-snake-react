/**
 * 解决canvas字体模糊问题
 * @param context canvas的2d上下文
 * @param canvasEl canvasDOM节点
 */
export const handleCanvasVague: (context: CanvasContext, canvasEl: HTMLCanvasElement) => void = (context, canvasEl) => {
    let getPixelRatio: (context: CanvasContext) => number = context => {
        let backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    };
    let ratio = getPixelRatio(context);
    canvasEl.style.width = canvasEl.width + 'px';
    canvasEl.style.height = canvasEl.height + 'px';
    canvasEl.width = canvasEl.width * ratio;
    canvasEl.height = canvasEl.height * ratio;
    context.scale(ratio, ratio);
};
