/**
 * 線の描画を行います。
 * @param ctx
 * @param line
 */
export const drawLines = (ctx, line) => {
    let xc, yc, cur, curX, curY, next;
    ctx.beginPath();
    ctx.strokeStyle = '#d2d2d2';
    ctx.moveTo(line[line.length - 1].x, line[line.length - 1].y);
    for (var j = line.length - 2; j > 1; j--) {
        cur = line[j];
        curX = cur.x;
        curY = cur.y;
        next = line[j - 1];
        xc = (curX + next.x) / 2;
        yc = (curY + next.y) / 2;
        ctx.quadraticCurveTo(curX, curY, xc, yc);
    }
    // ベジェ曲線の線を描画
    ctx.quadraticCurveTo(line[j].x, line[j].y, line[j - 1].x, line[j - 1].y);
    ctx.stroke();
};
