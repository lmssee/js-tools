/** 数据类型
 *
 * {@link typeOf} 检测出来的数据类型
 *
 *  - number 数组类型 {@link Number}
 *  - function 函数（一种特殊的对象） {@link Function}
 *  - string  字符串 {@link String}
 *  - array 数组（一种有序的对象） {@link Array}
 *  - boolean  布尔值 {@link Boolean} ，仅有  true 和 false 两种能值
 *  - undefined 值未定义或未赋值 {@link undefined}
 *  - object 对象 {@link Object}、{@link Proxy}
 *  - null  指向一个特殊的空对象  null
 *  - regexp 正则 {@link RegExp}
 *  - set 值的集合 {@link Set}
 *  - map 保存键值对，且有序的  {@link Map}
 *  -  date  时间  {@link Date}
 *  - bigint 内置对象，它提供了一种方法来表示大于 2^53 - 1 的整数 {@link BigInt}
 *  - bigint64array  64 位有符号整数组成的数组 {@link BigInt64Array}
 *  - biguint64array  64 位无符号整数组成的数组 {@link BigInt64Array}
 *  - symbol
 *  - error 错误类型 {@link Error}、 {@link URIError}、{@link TypeError}、{@link SyntaxError}、${@link ReferenceError}、{@link RangeError}、{@link EvalError}、{@link AggregateError}
 * - int8array 二进制补码 8 位有符号整数的数组  {@link Int8Array }
 *  - uint8array 8 位无符号整型数组  {@link Uint8Array}
 *  - int16array 二进制补码 16 位有符号整数的数组   {@link Int16Array}
 *  - uint16array 16 位无符号整数 {@link Uint16Array}
 *  - int32array二进制补码 32 位有符号整数的数组   {@link Int32Array}
 *  - uint32array 32 位无符号整型数组  {@link Uint32Array}
 *  - float32array  32 位的浮点数型数组   {@link Float32Array}
 *  - float64array  64 位的浮点数型数组   {@link Float64Array}
 *  - uint8clampedarray  8 位无符号整型固定数组 {@link Uint8ClampedArray}
 *  - sharedarraybuffer 可以用来在共享内存上创建视图的二进制数据缓冲区，目前，浏览器不支持 {@link SharedArrayBuffer}
 *  - promise 异步操作最终的完成（或失败）以及其结果值 {@link Promise}
 *  - window  全局对象 {@link Window}、{@link globalThis}
 *  - dataview 从二进制 ArrayBuffer 对象中读写多种数值类型的底层接口  {@link DataView}
 * - atomics 命名空间对象包含对 SharedArrayBuffer 和 ArrayBuffer 对象执行原子操作的静态方法 {@link Atomics}
 *  - arraybuffer 通用的原始二进制数据缓冲区  {@link ArrayBuffer}
 *
 *  _NaN 即便意思非数字的值，但依旧是 {@link Number} 类型_
 */
export type TypeOf =
  | 'number'
  | 'function'
  | 'string'
  | 'boolean'
  | 'object'
  | 'undefined'
  | 'null'
  | 'array'
  | 'date'
  | 'set'
  | 'map'
  | 'symbol'
  | 'bigint'
  | 'bigint64array'
  | 'biguint64array'
  | 'regexp'
  | 'int8array'
  | 'uint8array'
  | 'uint16array'
  | 'float32array'
  | 'float64array'
  | 'uint32array'
  | 'error'
  | 'uint8clampedarray'
  | 'sharedarraybuffer'
  | 'promise'
  | 'window'
  | 'dataview'
  | 'atomics'
  | 'arraybuffer';
/**
 * 获取数据的类型
 *
 * @param {*} o 任意数据
 * @return {*}  返回是一个字符串 {@link String}，包含于   @see  {@link TypeOf}
 */
export function typeOf(o: any): TypeOf {
  return Reflect.apply(Object.prototype.toString, o, [])
    .replace(/^.*\s(.*)]$/, '$1')
    .toLowerCase() as TypeOf;
}

/**
 * 防抖
 *
 *  这种设计有一种不好的地方就是倘若最后一次尚未执行，不好清理
 * @param {*} callback
 * @param {number} delay
 * @return {*}   返回的是一个函数
 */
export function debounce(callback: any, delay: number): any {
  let timeout: string | number | NodeJS.Timeout | undefined;
  return (...args: any) => (
    clearTimeout(timeout),
    (timeout = setTimeout(() => Reflect.apply(callback, null, args), delay))
  );
}

/**
 *  节流函数
 * @param callback
 * @param delay  延迟时间，单位为毫秒（ms），缺省 200（ms）
 * @returns  返回的是一个函数
 */
export function throttle(callback: any, delay: number = 200): any {
  let inThrottle = true;
  return (...args: any) =>
    inThrottle &&
    (Reflect.apply(callback, null, args),
    (inThrottle = false),
    setTimeout(() => (inThrottle = true), delay));
}

/** 响应的  */
function responsive(target: any) {
  const handle = {
    get(target: any, key: any, receiver: any) {
      console.log(`捕获到 key: ${key}`);
      return Reflect.get(target, key, receiver);
    },
    set(target: any, key: any, value: any, receiver: any) {
      console.log(`设置值 ${value} 到属性 ${key}`);
      return Reflect.set(target, key, value, receiver);
    },
  };
  return new Proxy(target, handle);
}

/**
 * 监听
 */

// function Listener(vm: any, expOrFn: any, cb: any) {
//   // @ts-ignore
//   (this.vm = vm),
//     (this.expOrFn = expOrFn),
//     (this.cb = cb),
//     Reflect.apply(this.cb, this.vm, [this.evaluate()]);
// }

/**
 *
 * 获取一个随机整数
 *
 * 可传入两个参数，获取两参数之间的任意数
 *
 * 若只传入一个参数，这获取小于（若提供的值为负数，则为大于）该数的整数
 *
 * @export
 * @param {number} max 最大值
 * @param {number} [min] 最小值
 * @return {*}  {number}
 */
export function getRandomInt(max: number = 1, min: number = 0): number {
  let _min = Math.ceil(Number(min)),
    _max = Math.floor(Number(max));
  _min > _max && ([_max, _min] = [_min, _max]);
  return Math.floor(Math.random() * (_max - _min + 1) + _min);
}

/**
 *
 * 获取一个随机浮点数数
 *
 * 可传入两个参数，获取两参数之间的任意数
 *
 * 若只传入一个参数，这获取小于（若提供的值为负数，则为大于）该数的浮点数数
 *
 * @export
 * @param {number} max 最大值，缺省 1
 * @param {number} [min] 最小值，缺省 0
 * @return {*}  {number}
 */
export function getRandomFloat(max: number = 1, min: number = 0): number {
  if (max == min) max++;
  min > max && ([max, min] = [min, max]);
  return Math.random() * (max - min) + min;
}
