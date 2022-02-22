/**
 * FPSの描画を行います。
 * @param ctx Canvasの2Dコンテキスト
 * @param fps 描画するFPSの値
 */
export const drawFps = (ctx, fps) => {
    ctx.fillStyle = '#282828';
    ctx.textAlign = "start";
    ctx.textBaseline = "top";
    ctx.font = "50px Helvetica";
    ctx.fillText(String(fps), 50, 50);
};
