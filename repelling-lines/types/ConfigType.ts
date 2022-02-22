/**
 * コンフィグ設定の型定義です。
 */
export interface ConfigType {
  /** */
  nPoints: number,
  /**  */
  nLines: number,
  /**  */
  radius: number,
  /**  */
  paddingHorizontal: number, // padding is in percentage
  /**  */
  showFPS: boolean,
  /**  */
  showPoints: boolean,
  /**  */
  showLines: boolean,
  /**  */
  maxSpeed: number,
}