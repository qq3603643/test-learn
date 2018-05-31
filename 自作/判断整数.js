/** 主要是运用整数%1==0 **/
const isInit = (val) => typeof val == 'number' && val % 1 == 0 && val < Number.MAX_VALUE;
