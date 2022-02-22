import { mid } from "../helper/middle";
import { PY } from "../helper/py";
/**
 * line情報を計算します
 * @param line
 * @param homeY
 */
export const computeLineInfo = (line, homesX, homeY, mouse, config) => {
    //
    let point;
    // マウス座標を中心の領域を計算
    let desiredX, desiredY;
    let desiredH, desiredForce, desiredAngle;
    //
    let hvx, hvy;
    //
    let mvx, mvy;
    //
    let vx, vy;
    //
    let x, y;
    // 半径
    let radius = config.radius;
    //
    let maxSpeed = config.maxSpeed;
    for (var j = line.length - 1; j >= 0; j--) {
        point = line[j];
        x = point.x;
        y = point.y;
        hvx = 0;
        hvy = 0;
        // Home forces
        const homeX = homesX[j];
        if (x !== homeX || y !== homeY) {
            desiredX = homeX - x;
            desiredY = homeY - y;
            desiredH = PY(desiredX, desiredY);
            desiredForce = Math.max(desiredH * 0.2, 1);
            desiredAngle = Math.atan2(desiredY, desiredX);
            hvx = desiredForce * Math.cos(desiredAngle);
            hvy = desiredForce * Math.sin(desiredAngle);
        }
        // Mouse Forces
        mvx = 0, mvy = 0;
        desiredX = x - mouse.x;
        desiredY = y - mouse.y;
        if (!(desiredX > radius || desiredY > radius || desiredY < -radius || desiredX < -radius)) {
            desiredAngle = Math.atan2(desiredY, desiredX);
            desiredH = PY(desiredX, desiredY);
            desiredForce = Math.max(0, Math.min(radius - desiredH, radius));
            mvx = desiredForce * Math.cos(desiredAngle);
            mvy = desiredForce * Math.sin(desiredAngle);
        }
        // Combine and limit
        vx = Math.round(mid((mvx + hvx) * 0.9, maxSpeed, -maxSpeed));
        vy = Math.round(mid((mvy + hvy) * 0.9, maxSpeed, -maxSpeed));
        // Dont let point get too far from home
        if (vx != 0) {
            point.x += vx;
        }
        if (vy != 0) {
            point.y += vy;
        }
        line[j] = point;
    }
    return line;
};
