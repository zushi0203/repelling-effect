import './style.css';
const canvas = document.querySelector("#canvas");
const ctx = canvas?.getContext("2d");
let particles = [], mouse = { x: 0, y: 0 }, radius = 1;
const colors = ["#468966", "#FFF0A5", "#FFB03B", "#B64926", "#8E2800"];
const copy = document.querySelector("#copy");
let ww;
let wh;
class Particle {
    ctx;
    x;
    y;
    dest;
    r;
    vx;
    vy;
    accX;
    accY;
    friction;
    color;
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = Math.random() * ww;
        this.y = Math.random() * wh;
        this.dest = {
            x: x,
            y: y
        };
        this.r = Math.random() * 5 + 2;
        this.vx = (Math.random() - 0.5) * 20;
        this.vy = (Math.random() - 0.5) * 20;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random() * 0.05 + 0.94;
        this.color = colors[Math.floor(Math.random() * 6)];
    }
    draw() {
        // 座標の更新
        this.accX = (this.dest.x - this.x) / 1000;
        this.accY = (this.dest.y - this.y) / 1000;
        this.vx += this.accX;
        this.vy += this.accY;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
        // 描画
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        this.ctx.fill();
        //
        const a = this.x - mouse.x;
        const b = this.y - mouse.y;
        const distance = Math.sqrt(a * a + b * b);
        if (distance < (radius * 70)) {
            this.accX = (this.x - mouse.x) / 100;
            this.accY = (this.y - mouse.y) / 100;
            this.vx += this.accX;
            this.vy += this.accY;
        }
    }
}
/**
 * 初期設定を行い、アニメーションのループを行います
 */
function initScene() {
    if (!canvas || !ctx || !copy) {
        return;
    }
    // canvasの初期設定
    ww = canvas.width = window.innerWidth;
    wh = canvas.height = window.innerHeight;
    // 描画するテキストの設定
    ctx.font = "bold " + (ww / 10) + "px sans-serif";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText(copy.value, ww / 2, wh / 2);
    // 合成処理の変更
    ctx.globalCompositeOperation = "screen";
    // パーティクルの設定
    var data = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = [];
    for (let i = 0; i < ww; i += Math.round(ww / 150)) {
        for (let j = 0; j < wh; j += Math.round(ww / 150)) {
            if (data[((i + j * ww) * 4) + 3] > 150) {
                particles.push(new Particle(ctx, i, j));
            }
        }
    }
    render();
}
/**
 * 描画を行います。
 */
function render() {
    if (!canvas || !ctx) {
        return;
    }
    // canvasをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.draw();
    });
    requestAnimationFrame(render);
}
initScene();
function onMounseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}
window.addEventListener("mousemove", onMounseMove);
window.addEventListener("click", () => {
    console.table("Test", [
        "" + particles
    ]);
});
