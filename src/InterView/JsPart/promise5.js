import React from 'react';

export default function Promise5() {
  function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      throw TypeError('cycle');
    }

    if (x instanceof Promise5) {
      x.then((y) => {
        resolvePromise(promise2, y, resolve, reject);
      }, reject);
    } else if (
      x !== null &&
      (typeof x === 'object' || typeof x === 'function')
    ) {
      let then;

      try {
        then = x.then;
      } catch (error) {
        reject(error);
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
            (e) => {
              if (called) return;
              called = true;
              reject(e);
            }
          );
        } catch (error) {
          if (called) return;
          called = true;
          reject(error);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }

  class Promise5 {
    constructor(executor) {
      this.status = 'pending';
      this.fulfilledCallbacks = [];
      this.rejectedCallbacks = [];
      this.result = null;
      this.reason = null;

      try {
        executor(this.resolve, this.reject);
      } catch (error) {
        this.reject(error);
      }
    }

    resolve = (res) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.result = res;

        this.fulfilledCallbacks.forEach((callback) => callback(this.result));
      }
    };

    reject = (err) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = err;

        this.rejectedCallbacks.forEach((callback) => callback(this.reason));
      }
    };

    then = (onFulFilled, onRejected) => {
      const promise2 = new Promise5((resolve, reject) => {
        if (this.status === 'fulfilled') {
          setTimeout(() => {
            try {
              if (typeof onFulFilled === 'function') {
                const x = onFulFilled(this.result);
                resolvePromise(promise2, x, resolve, reject);
              } else {
                resolve(this.result);
              }
            } catch (error) {
              reject(error);
            }
          });
        }

        if (this.status === 'rejected') {
          setTimeout(() => {
            try {
              if (typeof onRejected === 'function') {
                const x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
              } else {
                reject(this.reason);
              }
            } catch (error) {
              reject(error);
            }
          });
        }

        if (this.status === 'pending') {
          this.fulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                if (typeof onFulFilled === 'function') {
                  const x = onFulFilled(this.result);
                  resolvePromise(promise2, x, resolve, reject);
                } else {
                  resolve(this.result);
                }
              } catch (error) {
                reject(error);
              }
            });
          });

          this.rejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                if (typeof onRejected === 'function') {
                  const x = onRejected(this.reason);
                  resolvePromise(promise2, x, resolve, reject);
                } else {
                  reject(this.reason);
                }
              } catch (error) {
                reject(error);
              }
            });
          });
        }
      });

      return promise2;
    };

    catch = (onRejected) => {
      return this.then(undefined, onRejected);
    };

    finally = (callback) => {
      return this.then(callback, callback);
    };

    static resolve = (value) => {
      if (value instanceof Promise5) {
        return value;
      }

      if (value instanceof 'object' && 'then' in value) {
        return new Promise5((resolve, reject) => {
          value.then(resolve, reject);
        });
      }

      return new Promise5((resolve) => {
        resolve(value);
      });
    };

    static reject = (err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    };

    static all = (promises) => {
      let result = [];
      let count = 0;
      return new Promise5((resolve, reject) => {
        if (Array.isArray(promises)) {
          if (promises.length === 0) {
            return resolve(promises);
          }

          promises.forEach((item, index) => {
            if (item instanceof Promise5) {
              Promise5.resolve(item).then(
                (value) => {
                  result[index] = value;
                  count++;
                  count === promises.length && resolve(result);
                },
                (err) => {
                  reject(err);
                }
              );
            } else {
              result[index] = item;
              count++;
              count === promises.length && resolve(result);
            }
          });
        } else {
          return reject(new TypeError('argument is not Iterable'));
        }
      });
    };

    static allSettled = (promises) => {
      let result = [];
      let count = 0;

      return new Promise5((resolve, reject) => {
        if (Array.isArray(promises)) {
          if (promises.length === 0) {
            return resolve(promises);
          }

          promises.forEach((item, index) => {
            Promise5.resolve(item).then(
              (value) => {
                result[index] = {
                  status: 'fulfilled',
                  value,
                };
                count++;
                count === promises.length && resolve(result);
              },
              (reason) => {
                result[index] = {
                  status: 'rejected',
                  reason,
                };
                count++;
                count === promises.length && resolve(result);
              }
            );
          });
        } else {
          return reject(new TypeError('Argument is not Iterable'));
        }
      });
    };

    static any = (promises) => {
      return new Promise5((resolve, reject) => {
        let errors = [];
        let count = 0;
        if (Array.isArray(promises)) {
          if (promises.length === 0)
            return reject(new Error('All promises were rejected'));

          promises.forEach((item) => {
            Promise5.resolve(item).then(
              (value) => {
                resolve(value);
              },
              (reason) => {
                errors.push(reason);
                count++;
                count === promises.length && reject(new Error(errors));
              }
            );
          });
        } else {
          return reject(new TypeError('Argument is not Iterable'));
        }
      });
    };

    static race = (promises) => {
      return new Promise5((resolve, reject) => {
        if (Array.isArray(promises)) {
          promises.forEach((item) => {
            Promise5.resolve(item).then(resolve, reject);
          });
        } else {
          return reject(new TypeError('argument is not iterable'));
        }
      });
    };
  }

  new Promise5((resolve) => {
    console.log('promise before resolve');
    resolve(1);
  })
    .then((res) => {
      console.log(res, 'promise then 1');
      return res + 1;
    })
    .then((res) => {
      console.log(res, 'promise then 2');
      return res + 1;
    })
    .then((res) => {
      console.log(res, 'promise then 3');
    });

  return <div>Promise5</div>;
}

// function resolvePromise(promise2, x, resolve, reject) {
//   if (promise2 === x) {
//     throw TypeError('cycle');
//   }

//   if (x instanceof Promise5) {
//     x.then((y) => {
//       resolvePromise(promise2, y, resolve, reject);
//     }, reject);
//   } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
//     let then;

//     try {
//       then = x.then;
//     } catch (error) {
//       reject(error);
//     }

//     if (typeof then === 'function') {
//       let called = false;
//       try {
//         then.call(
//           x,
//           (y) => {
//             if (called) return;
//             called = true;
//             resolvePromise(promise2, y, resolve, reject);
//           },
//           (e) => {
//             if (called) return;
//             called = true;
//             reject(e);
//           }
//         );
//       } catch (error) {
//         if (called) return;
//         called = true;
//         reject(error);
//       }
//     } else {
//       resolve(x);
//     }
//   } else {
//     resolve(x);
//   }
// }

// class Promise5 {
//   constructor(executor) {
//     this.status = 'pending';
//     this.fulfilledCallbacks = [];
//     this.rejectedCallbacks = [];
//     this.result = null;
//     this.reason = null;

//     try {
//       executor(this.resolve, this.reject);
//     } catch (error) {
//       this.reject(error);
//     }
//   }

//   resolve = (res) => {
//     if (this.status === 'pending') {
//       this.status = 'fulfilled';
//       this.result = res;

//       this.fulfilledCallbacks.forEach((callback) => callback(this.result));
//     }
//   };

//   reject = (err) => {
//     if (this.status === 'pending') {
//       this.status = 'rejected';
//       this.reason = err;

//       this.rejectedCallbacks.forEach((callback) => callback(this.reason));
//     }
//   };

//   then = (onFulFilled, onRejected) => {
//     const promise2 = new Promise5((resolve, reject) => {
//       if (this.status === 'fulfilled') {
//         setTimeout(() => {
//           try {
//             if (typeof onFulFilled === 'function') {
//               const x = onFulFilled(this.result);
//               resolvePromise(promise2, x, resolve, reject);
//             } else {
//               resolve(this.result);
//             }
//           } catch (error) {
//             reject(error);
//           }
//         });
//       }

//       if (this.status === 'rejected') {
//         setTimeout(() => {
//           try {
//             if (typeof onRejected === 'function') {
//               const x = onRejected(this.reason);
//               resolvePromise(promise2, x, resolve, reject);
//             } else {
//               reject(this.reason);
//             }
//           } catch (error) {
//             reject(error);
//           }
//         });
//       }

//       if (this.status === 'pending') {
//         this.fulfilledCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               if (typeof onFulFilled === 'function') {
//                 const x = onFulFilled(this.result);
//                 resolvePromise(promise2, x, resolve, reject);
//               } else {
//                 resolve(this.result);
//               }
//             } catch (error) {
//               reject(error);
//             }
//           });
//         });

//         this.rejectedCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               if (typeof onRejected === 'function') {
//                 const x = onRejected(this.reason);
//                 resolvePromise(promise2, x, resolve, reject);
//               } else {
//                 reject(this.reason);
//               }
//             } catch (error) {
//               reject(error);
//             }
//           });
//         });
//       }
//     });

//     return promise2;
//   };
// }

// Promise5.deferred = function () {
//   let result = {};
//   result.promise = new Promise5((resolve, reject) => {
//     result.resolve = resolve;
//     result.reject = reject;
//   });

//   return result;
// };

// module.exports = Promise5;
