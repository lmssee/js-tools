/**  ANSI 转义序列  */
export const t = '\x1b[';

/** 当前是否为终端环境   */
export const isTTY = () => process && process.stdout && process.stdout.isTTY;
