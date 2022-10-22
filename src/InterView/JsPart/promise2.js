/* eslint-disable no-extend-native */
const pending = 'pending';
const fulfilled = 'fulfilled';
const rejected = 'rejected';

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    reject(new TypeError('error'));
  }

  if (x instanceof myPromise) {
    if (x.status === pending) {
      x.then((y) => resolvePromise(promise2, y, resolve, reject), reject);
    } else if (x.status === fulfilled) {
      resolve(x.value);
    } else if (x.status === rejected) {
      reject(x.reason);
    }
  } else if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      var then = x.then;
    } catch (e) {
      reject(e);
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (e) {
        if (called) return;
        called = true;

        reject(e);
      }
    } else {
      resolve(x);
    }
  } else {
    return resolve(x);
  }
};

class myPromise {
  constructor(executor) {
    this.status = pending;
    this.value = undefined;
    this.reason = '';
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.status === pending) {
        this.status = fulfilled;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === pending) {
        this.status = rejected;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => {
          fn();
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  static resolve(value) {
    if (value instanceof myPromise) {
      return value;
    }

    if (typeof value === 'object' && 'then' in value) {
      return new myPromise((resolve, reject) => {
        value.then(resolve, reject);
      });
    }

    return new myPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new myPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let result = [];
        let count = 0;

        if (!promises.length) {
          return resolve(promises);
        }

        promises.forEach((item, index) => {
          myPromise.resolve(item).then(
            (y) => {
              count++;
              result[index] = y;
              count === promises.length && resolve(result);
            },
            (reason) => {
              reject(reason);
            }
          );
        });
      } else {
        return reject(new TypeError('Arguments is not iterable'));
      }
    });
  }

  static allSettled(promises) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let result = [];
        let count = 0;

        if (!promises.length) {
          return resolve(promises);
        }

        promises.forEach((item, index) => {
          myPromise.resolve(item).then(
            (value) => {
              count++;
              result[index] = {
                status: 'filFiled',
                value,
              };
              count === promises.length && resolve(result);
            },
            (reason) => {
              count++;
              result[index] = {
                status: 'rejected',
                reason,
              };
              count === promises.length && reject(result);
            }
          );
        });
      } else {
        return reject(new TypeError('Arguments is not iterable'));
      }
    });
  }

  static any(promises) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let error = [];
        let count = 0;

        if (!promises.length) {
          return rejected(new Error('all promises were rejected'));
        }

        promises.forEach((item, index) => {
          myPromise.resolve(item).then(
            (value) => {
              resolve(value);
            },
            (reason) => {
              count++;
              error[index] = reason;
              count === promises.length && reject(error);
            }
          );
        });
      } else {
        return reject(new TypeError('Arguments is not iterable'));
      }
    });
  }

  static race(promises) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        if (promises.length > 0) {
          promises.forEach((item) => {
            return myPromise.resolve(item).then(resolve, reject);
          });
        }
      } else {
        return reject(new TypeError('Arguments is not iterable'));
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(callback) {
    return this.then(callback, callback);
  }

  then(onFulFiled, onRejected) {
    onFulFiled = typeof onFulFiled === 'function' ? onFulFiled : (v) => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    let promise2 = new myPromise((resolve, reject) => {
      if (this.status === fulfilled) {
        setTimeout(() => {
          try {
            let x = onFulFiled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === rejected) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === pending) {
        this.onFulfilledCallbacks.push(() =>
          setTimeout(() => {
            try {
              let x = onFulFiled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)
        );
        this.onRejectedCallbacks.push(() =>
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)
        );
      }
    });
    return promise2;
  }
}

myPromise.deferred = function () {
  let result = {};
  result.promise = new myPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

module.exports = myPromise;
