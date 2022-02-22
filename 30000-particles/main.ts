import '/common.css';
import {ParticleType} from "./types";

const container = document.querySelector<HTMLDivElement>("#container");
const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
const ctx = canvas?.getContext("2d");

const ROWS = 100,
  /** */
  COLS = 300,
  /** */
  NUM_PARTICLES = ROWS * COLS,
  /** */
  THICKNESS = Math.pow(80, 2),
  /** */
  SPACING = 3,
  /** */
  MARGIN = 100,
  /** */
  COLOR = 220,
  /** */
  DRAG = 0.95,
  /** */
  EASE = 0.25
;

const particleInitProp: ParticleType = {
  vx: 0,
  vy: 0,
  ox: 0,
  oy: 0,
  x: 0,
  y: 0
}

let tog: boolean,
  /** particleのリスト */
  particles: ParticleType[],
  w: number, h: number,
  /** マウス座標 */
  mx: number, my: number,
  d: number, dx: number, dy: number,
  f: number,
  b: Uint8ClampedArray,
  t: number,
  a: ImageData,
  n: number
;

/**
 * 初期
 */
function init() {
  if(!canvas || !container || !ctx) {
    return;
  }

  tog = true;
  particles = [];

  // canvasサイズの設定
  canvas.width = COLS * SPACING + MARGIN * 2;
  canvas.height = ROWS * SPACING + MARGIN * 2;
  // w, h変数の値を設定
  w = canvas.width;
  h = canvas.height;

  // パーティクルオブジェクトの生成
  [...Array(NUM_PARTICLES)].forEach((_element, index) => {
    const p = Object.create(particleInitProp);
    p.x = p.ox = MARGIN + SPACING * (index % COLS);
    p.y = p.oy = MARGIN + SPACING * Math.floor(index / COLS);
    particles[index] = p;
  })

  // マウスの操作
  container.addEventListener("mousemove", (e) => {
    const bounds = container.getBoundingClientRect();
    mx = e.clientX - bounds.left;
    my = e.clientY - bounds.top;
  });

  step();
}

function step() {
  if(!ctx) {
    console.error("container要素またはcanvas要素がみつかりません")
    return;
  }

  if(tog = !tog) {
    // パーティクルの座標計算
    particles.forEach((particle) => {
      // マウス座標とパーティクル座標の距離を計算
      dx = mx - particle.x;
      dy = my - particle.y;
      //
      d = dx * dx + dy * dy;
      //
      f = -THICKNESS / d;
      if (d < THICKNESS) {
        t = Math.atan2(dy, dx);
        particle.vx += f * Math.cos(t);
        particle.vy += f * Math.sin(t);
      }
      particle.x += (particle.vx *= DRAG) + (particle.ox - particle.x) * EASE;
      particle.y += (particle.vy *= DRAG) + (particle.oy - particle.y) * EASE;
    });
  } else {
    // 描画を行う
    b = (a = ctx.createImageData(w, h)).data;
    particles.forEach((particle) => {
      b[n = (~~particle.x + (~~particle.y * w)) * 4] = b[n+1] = b[n+2] = COLOR,
        b[n+3] = 255;
    });
    ctx.putImageData(a, 0, 0);
  }

  requestAnimationFrame(step);
}

init();
