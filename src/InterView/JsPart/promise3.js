import React from 'react';

// 弄清楚
// 构造类和构造函数的区别
// 原型上的方法和实例上的方法的区别

export default function Promise3() {
  console.log('fun start');

  function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      throw TypeError('Chaining cycle detected for promise');
    }

    if (x instanceof Promise3) {
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
            (r) => {
              if (called) return;
              called = true;
              reject(r);
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

  class Promise3 {
    constructor(executor) {
      this.status = 'pending';
      this.res = null;
      this.err = null;
      this.onFulFiledCallbacks = [];
      this.onRejectedCallbacks = [];

      try {
        executor(this.resolve, this.reject);
      } catch (error) {
        this.reject(error);
      }
    }

    resolve = (res) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.res = res;

        this.onFulFiledCallbacks.forEach((cb) => {
          cb(res);
        });
      }
    };

    reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.err = reason;

        this.onRejectedCallbacks.forEach((cb) => {
          cb(reason);
        });
      }
    };

    then(onFulFiled, onRejected) {
      const promise2 = new Promise3((resolve, reject) => {
        if (this.status === 'pending') {
          this.onFulFiledCallbacks.push(() => {
            setTimeout(() => {
              try {
                if (typeof onFulFiled !== 'function') {
                  resolve(this.res);
                } else {
                  let x = onFulFiled(this.res);
                  resolvePromise(promise2, x, resolve, reject);
                }
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                if (typeof onRejected !== 'function') {
                  reject(this.err);
                } else {
                  let x = onRejected(this.err);
                  resolvePromise(promise2, x, resolve, reject);
                }
              } catch (error) {
                reject(error);
              }
            }, 0);
          });
        }

        if (this.status === 'fulfilled') {
          setTimeout(() => {
            try {
              if (typeof onFulFiled !== 'function') {
                resolve(this.res);
              } else {
                let x = onFulFiled(this.res);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          }, 0);
        }

        if (this.status === 'rejected') {
          setTimeout(() => {
            try {
              if (typeof onRejected !== 'function') {
                reject(this.err);
              } else {
                let x = onRejected(this.err);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          }, 0);
        }
      });

      return promise2;
    }

    catch(onRejected) {
      return onRejected(this.err);
    }
  }

  new Promise3((resolve) => {
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

  console.log('fun mid after new promise');

  console.log('fun end');

  return <div>promise3</div>;
}

// function resolvePromise(promise2, x, resolve, reject) {
//   if (promise2 === x) {
//     throw TypeError('Chaining cycle detected for promise');
//   }

//   if (x instanceof Promise3) {
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
//           (r) => {
//             if (called) return;
//             called = true;
//             reject(r);
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

// class Promise3 {
//   constructor(executor) {
//     this.status = 'pending';
//     this.res = null;
//     this.err = null;
//     this.onFulFiledCallbacks = [];
//     this.onRejectedCallbacks = [];

//     try {
//       executor(this.resolve, this.reject);
//     } catch (error) {
//       this.reject(error);
//     }
//   }

//   resolve = (res) => {
//     if (this.status === 'pending') {
//       this.status = 'fulfilled';
//       this.res = res;

//       this.onFulFiledCallbacks.forEach((cb) => {
//         cb(res);
//       });
//     }
//   };

//   reject = (reason) => {
//     if (this.status === 'pending') {
//       this.status = 'rejected';
//       this.err = reason;

//       this.onRejectedCallbacks.forEach((cb) => {
//         cb(reason);
//       });
//     }
//   };

//   then(onFulFiled, onRejected) {
//     const promise2 = new Promise3((resolve, reject) => {
//       if (this.status === 'pending') {
//         this.onFulFiledCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               if (typeof onFulFiled !== 'function') {
//                 resolve(this.res);
//               } else {
//                 let x = onFulFiled(this.res);
//                 resolvePromise(promise2, x, resolve, reject);
//               }
//             } catch (error) {
//               reject(error);
//             }
//           }, 0);
//         });
//         this.onRejectedCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               if (typeof onRejected !== 'function') {
//                 reject(this.err);
//               } else {
//                 let x = onRejected(this.err);
//                 resolvePromise(promise2, x, resolve, reject);
//               }
//             } catch (error) {
//               reject(error);
//             }
//           }, 0);
//         });
//       }

//       if (this.status === 'fulfilled') {
//         setTimeout(() => {
//           try {
//             if (typeof onFulFiled !== 'function') {
//               resolve(this.res);
//             } else {
//               let x = onFulFiled(this.res);
//               resolvePromise(promise2, x, resolve, reject);
//             }
//           } catch (error) {
//             reject(error);
//           }
//         }, 0);
//       }

//       if (this.status === 'rejected') {
//         setTimeout(() => {
//           try {
//             if (typeof onRejected !== 'function') {
//               reject(this.err);
//             } else {
//               let x = onRejected(this.err);
//               resolvePromise(promise2, x, resolve, reject);
//             }
//           } catch (error) {
//             reject(error);
//           }
//         }, 0);
//       }
//     });

//     return promise2;
//   }
// }

// Promise3.deferred = function () {
//   let result = {};
//   result.promise = new Promise3((resolve, reject) => {
//     result.resolve = resolve;
//     result.reject = reject;
//   });
//   return result;
// };

// module.exports = Promise3;
