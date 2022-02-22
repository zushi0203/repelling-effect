/**
 * FPSのヘルパー関数です。
 * @param onSecond
 */
export const fpsHelper = (onSecond) => {
    let lastSec = Date.now();
    let frames = 0;
    let fps = 0;
    return {
        /**
         * フレームレートを計算します。
         */
        computeFrame: () => {
            if (((Date.now() - lastSec) / 1000) > 1) {
                lastSec = Date.now();
                fps = frames;
                frames = 0;
                if (onSecond) {
                    onSecond(fps);
                }
            }
            else {
                frames += 1;
            }
        },
        /**
         * FPSを取得します。
         */
        getFPS: () => {
            return fps;
        }
    };
};
