/**
 * TODO: 不明
 * @param arg
 */
export const mid = (...arg: number[]) => { // TODO: 残余引数について確認
  const args = Array.from(arg);
  if(args.length < 3) return args[0] || 0;
  const sorted = args.slice().sort((a, b)=> a - b);
  return sorted[Math.round((sorted.length - 1) / 2)];
}
