/* eslint-disable jsdoc/require-jsdoc */
/**
 * @file パイプライン演算子風記法をTypeScriptで実現するための関数群（Claude生成）
 */

/**
 * 非同期パイプラインクラス
 */
class AsyncPipeline<T> {
  constructor(private promise: Promise<T>) {}

  /**
   * パイプラインに新しい処理ステップを追加
   *
   * @param fn - 現在の値を受け取り、新しい値を返す関数
   * @returns 新しいパイプラインインスタンス
   */
  pipe<U>(fn: (value: T) => U | Promise<U>): AsyncPipeline<U> {
    return new AsyncPipeline(this.promise.then(fn))
  }

  /**
   * パイプラインの最終結果を取得
   *
   * @returns パイプラインの最終結果を含むPromise
   */
  value(): Promise<T> {
    return this.promise
  }

  /**
   * デバッグ用の副作用実行
   *
   * @param fn - 副作用を実行する関数
   * @returns 現在のパイプラインインスタンス
   */
  tap(fn: (value: T) => void | Promise<void>): AsyncPipeline<T> {
    return new AsyncPipeline(
      this.promise.then(async value => {
        await Promise.resolve(fn(value))
        return value
      })
    )
  }
}

/**
 * 同期パイプラインクラス
 */
class SyncPipeline<T> {
  constructor(private currentValue: T) {}

  /**
   * パイプラインに新しい処理ステップを追加
   *
   * @param fn - 現在の値を受け取り、新しい値を返す関数
   * @returns 新しいパイプラインインスタンス
   */
  pipe<U>(fn: (value: T) => U): SyncPipeline<U> {
    return new SyncPipeline(fn(this.currentValue))
  }

  /**
   * パイプラインの最終結果を取得
   *
   * @returns パイプラインの最終結果
   */
  value(): T {
    return this.currentValue
  }

  /**
   * デバッグ用の副作用実行
   *
   * @param fn - 副作用を実行する関数
   * @returns 現在のパイプラインインスタンス
   */
  tap(fn: (value: T) => void): SyncPipeline<T> {
    fn(this.currentValue)
    return this
  }
}

/**
 * 非同期パイプラインを開始
 *
 * @param initialValue - パイプラインの初期値
 * @returns 非同期パイプラインインスタンス
 */
export const startAsyncPipe = <T>(initialValue: T | Promise<T>): AsyncPipeline<T> => {
  return new AsyncPipeline(Promise.resolve(initialValue))
}

/**
 * 同期パイプラインを開始
 *
 * @param initialValue - パイプラインの初期値
 * @returns 同期パイプラインインスタンス
 */
export const startSyncPipe = <T>(initialValue: T): SyncPipeline<T> => {
  return new SyncPipeline(initialValue)
}
