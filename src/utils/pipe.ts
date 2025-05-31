/* eslint-disable jsdoc/require-jsdoc */
/**
 * @file パイプライン演算子風記法をTypeScriptで実現するための関数群 (Gemini生成)
 */

// asyncPipeline.ts (または任意のユーティリティファイル)

/**
 * 非同期パイプラインのインターフェース。
 *
 * @template T 現在のパイプラインが扱う値の型。
 */
export interface IAsyncPipeline<T> {
  /**
   * パイプラインに新しい処理ステップを追加します。
   *
   * @template U 次のステップで扱われる値の型。
   * @param fn - 現在の値 T を受け取り、新しい値 U または Promise<U> を返す関数。
   * @returns 次のステップの値を扱う新しい IAsyncPipeline<U> インスタンス。
   */
  pipe<U>(fn: (value: T) => U | Promise<U>): IAsyncPipeline<U>

  /**
   * パイプラインの全ての処理を実行し、最終結果を含むPromiseを取得します。
   *
   * @returns パイプラインの最終結果を含む Promise<T>。
   */
  value(): Promise<T>

  /**
   * (オプション) パイプラインの現在の値を変更せずに副作用を実行します（デバッグやロギング用）。
   *
   * @param fn - 現在の値 T を受け取り、何か処理を行う関数（戻り値は無視されます）。
   * @returns 現在の値を扱う同じ IAsyncPipeline<T> インスタンス。
   */
  tap(fn: (value: T) => void | Promise<void>): IAsyncPipeline<T>
}

/**
 * 非同期パイプラインを開始します。
 *
 * @template T 初期値の型。
 * @param initialValueOrPromise - パイプラインの初期値、または初期値を含むPromise。
 * @returns IAsyncPipeline<T> インスタンス。
 */
export const startAsyncPipe = <T>(initialValueOrPromise: T | Promise<T>): IAsyncPipeline<T> => {
  // 内部では常にPromiseとして値を扱います。
  let currentPromise: Promise<T> = Promise.resolve(initialValueOrPromise)

  return {
    pipe<U>(fn: (value: T) => U | Promise<U>): IAsyncPipeline<U> {
      // fnを現在のPromiseにチェインし、その結果で新しいパイプラインを開始します。
      // Promise.then はネストされたPromiseを自動的に解決するため、
      // fn が U を返しても Promise<U> を返しても、nextPromise は Promise<U> (解決後の型) になります。
      const nextPromise: Promise<U> = currentPromise.then(fn)
      return startAsyncPipe(nextPromise) // 新しい型Uのパイプラインを返す
    },

    value(): Promise<T> {
      return currentPromise
    },

    tap(fn: (value: T) => void | Promise<void>): IAsyncPipeline<T> {
      currentPromise = currentPromise.then(async value => {
        await Promise.resolve(fn(value)) // 副作用を実行 (結果は無視)
        return value // 元の値を次のステップに渡す
      })
      return this // 同じパイプラインインスタンスを返す (型はTのまま)
    }
  }
}

/**
 * 同期パイプラインのインターフェース。
 *
 * @template T 現在のパイプラインが扱う値の型。
 */
export interface ISyncPipeline<T> {
  pipe<U>(fn: (value: T) => U): ISyncPipeline<U>
  value(): T
  tap(fn: (value: T) => void): ISyncPipeline<T>
}

/**
 * 同期パイプラインを開始します。
 *
 * @template T 初期値の型。
 * @param initialValue - パイプラインの初期値。
 * @returns ISyncPipeline<T> インスタンス。
 */
export const startSyncPipe = <T>(initialValue: T): ISyncPipeline<T> => {
  const currentValue = initialValue
  return {
    pipe<U>(fn: (value: T) => U): ISyncPipeline<U> {
      return startSyncPipe(fn(currentValue))
    },
    value(): T {
      return currentValue
    },
    tap(fn: (value: T) => void): ISyncPipeline<T> {
      fn(currentValue)
      return this
    }
  }
}
