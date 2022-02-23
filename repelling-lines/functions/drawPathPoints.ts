import { PointType } from "../types/PointType";

/**
 *
 * @param ctx
 * @param line
 */
export const drawPathPoints = (
  ctx: CanvasRenderingContext2D,
  line: any[],
) => {
  // 線の上に点の描画を行うか？
  line.forEach((point: PointType, _index) => {
    ctx.beginPath();
    ctx.fillStyle ='red';
    ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
    ctx.fill();
  })

}