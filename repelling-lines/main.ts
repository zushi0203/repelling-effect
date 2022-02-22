import * as dat from 'dat.gui';
import * as _ from 'lodash';
import { computeLineInfo } from './functions/computeLineInfo';
import { drawFps } from './functions/drawFps';
import { drawLines } from './functions/drawLines';
import { drawPathPoints } from './functions/drawPathPoints';
import { fpsHelper } from './helper/fps';
import { ConfigType } from './types/ConfigType';
import { PointType } from './types/PointType';

import './style.css';

const main = () => {

  const canvasElement = document.querySelector<HTMLCanvasElement>('#canvas');

  if(!canvasElement) return;

  // canvasの設定
  const ctx = canvasElement.getContext('2d');
  const W = 800;
  const H = 600;

  canvasElement.width = W;
  canvasElement.height = H;

  // マウス座標
  const mouse = {
    x: W / 2,
    y: H / 2
  }

  // パラメータ
  const config: ConfigType = {
    nPoints: 20,
    nLines: 20,
    radius: 100,
    paddingHorizontal: 20,
    showFPS: true,
    showPoints: true,
    showLines: true,
    maxSpeed: 30,
  }

  /**
   * dat.GUIの設定
   */
  window.onload = function(){
    const gui = new dat.GUI({ closed: true, name:"config" });
    gui.add(config,"nPoints",3,50).step(1).onFinishChange(() => {
      console.log('finish', config)
      debouncedInit();
    });
    gui.add(config,"nLines",3,50).step(1).onFinishChange((val) => {
      console.log('finish', val, config)
      debouncedInit();
    });;
    gui.add(config,"radius",50,300).step(1);
    gui.add(config,"paddingHorizontal",0,45).step(1).onFinishChange((val) => {
      console.log('finish', val, config)
      debouncedUpdateX();
    });
    gui.add(config,"showFPS");
    gui.add(config,"showPoints");
    gui.add(config,"maxSpeed", 5, 100);
    // 【追加】線を表示するか？
    gui.add(config, "showLines");
  }

  let lines: any = [];
  let homesX: any = [];
  let homesY: any = [];
  let fpsObj = fpsHelper();
  let rAF: number | null = null;

  // Actual Code
  // Update Line's dots Position

  /**
   * canvas全体の描画を行います。
   */
  const draw = () => {
    if(!ctx) return;

    // canvas内の情報をクリアにする
    ctx.clearRect(0,0,W,H);

    // FPSの数値を描画
    if(config.showFPS){
      // 描画前のFPSを計算
      fpsObj.computeFrame();
      const computedFps = fpsObj.getFPS();
      drawFps(ctx, computedFps);
    }
    // 線の複数描画
    lines = lines.map((line: PointType[], index: number) => computeLineInfo(line, homesX, homesY[index], mouse, config));
    lines.forEach((line: PointType[]) => {
      if(config.showLines) {
        drawLines(ctx, line);
      }
      if(config.showPoints) {
        drawPathPoints(ctx, line);
      }
    });
    rAF = requestAnimationFrame(draw)
  }

  /**
   *
   * @param x
   * @param y
   */
  const point = (x: number, y: number): PointType => {
    return {
      x: x,
      y: y,
      hy: y,
      hx: x,
    }
  }

  /**
   * 水平方向の余白を計算した描画を行います。
   */
  const canvasUpdatePaddingHorizontal = () => {
    // RequestAnimationFrameが設定されている場合
    if(rAF) {
      // 対象のRequestAnimationFrameをキャンセル?
      cancelAnimationFrame(rAF);
      rAF = null;
    }
    const calcPad = (W * config.paddingHorizontal) / 100;

    // homesXを初期化
    homesX = [];
    for(var i = config.nLines; i >= 0; i--){
      const x = calcPad + (((W - calcPad * 2) / config.nLines) * i);
      homesX.push(x);
    }
    draw();
  }

  /**
   * canvasの初期化を行います。
   */
  const canvasInit = () => {
    // Cancel if neededs
    if(rAF) {
      cancelAnimationFrame(rAF);
      rAF = null;
    }
    lines = [];
    homesX = [];
    homesY = [];
    let calcPad = (W * config.paddingHorizontal) / 100;
    for(var i = config.nLines; i >= 0; i--){
      const line = [];
      // Include padding in calculatio
      // 水平方向のパディング分を参照してに垂直方向の位置を計算する
      // paddingHorizontalの役割が大きすぎると思うので今回は使用しない
      const y = calcPad + (((H - calcPad * 2) / config.nLines) * i);
      // const y = ((H / config.nLines) * i);
      homesY.push(y);
      for(var j = config.nPoints; j >= 0; j--){
        let x = Math.round((W / config.nPoints ) * j);
        line.push(point(x,y));

        if(i === 0) {
          homesX.push(x);
        }
      }
      if(i == 0){
        // homesY.reverse();
      }
      lines.push(line);
    }
    draw();
  }

  // Input Handles
  const debouncedInit = _.debounce(canvasInit, 200)
  const debouncedUpdateX = _.debounce(canvasUpdatePaddingHorizontal, 200)

  // Events
  canvasElement.addEventListener('mousemove',(e)=>{
    // マウス座標の更新
    // canvasをフルスクリーンで表示する場合に有効
    // mouse.x = e.clientX;
    // mouse.y = e.clientY;
    // canvasを特定の位置で表示する場合に有効?
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  });

  // window.addEventListener('resize', (e) => {
  //   // canvasサイズの再計算
  //   W = window.innerWidth;
  //   H = window.innerHeight;
  //   canvas.width = W;
  //   canvas.height = H;
  //   // canvasの初期化
  //   init();
  // });

  canvasInit();
}

main();
