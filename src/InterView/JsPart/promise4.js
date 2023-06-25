// import React from 'react';

// export default function Promise4() {
//   function resolvePromise(promise2, x, resolve, reject) {
//     if (promise2 === x) {
//       throw Error('cycle error');
//     }

//     if (x instanceof Promise4) {
//       x.then((y) => {
//         resolvePromise(promise2, y, resolve, reject);
//       }, reject);
//     } else if (x !== null && typeof x === ('object' || 'function')) {
//       let then;

//       try {
//         then = x.then;
//       } catch (error) {
//         reject(error);
//       }
//       if (typeof then === 'function') {
//         let called = false;
//         try {
//           then.call(
//             x,
//             (y) => {
//               if (called) return;
//               called = true;
//               resolvePromise(promise2, y, resolve, reject);
//             },
//             (r) => {
//               if (called) return;
//               called = true;
//               reject(r);
//             }
//           );
//         } catch (error) {
//           if (called) return;
//           called = true;
//           reject(error);
//         }
//       } else {
//         resolve(x);
//       }
//     } else {
//       resolve(x);
//     }
//   }

//   class Promise4 {
//     constructor(executor) {
//       this.status = 'pending';
//       this.result = null;
//       this.reason = null;
//       this.onFulFilledCallbacks = [];
//       this.onRejectedCallbacks = [];

//       try {
//         executor(this.resolve, this.reject);
//       } catch (error) {
//         this.reject(error);
//       }
//     }

//     resolve = (res) => {
//       if (this.status === 'pending') {
//         this.result = res;
//         this.status = 'fulfilled';

//         this.onFulFilledCallbacks.forEach((callback) => callback(res));
//       }
//     };

//     reject = (err) => {
//       if (this.status === 'pending') {
//         this.reason = err;
//         this.status = 'rejected';

//         this.onRejectedCallbacks.forEach((callback) => callback(err));
//       }
//     };

//     then = (onFulFilled, onRejected) => {
//       const promise2 = new Promise4((resolve, reject) => {
//         if (this.status === 'fulfilled') {
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
//         }

//         if (this.status === 'rejected') {
//           setTimeout(() => {
//             try {
//               if (typeof onRejected === 'function') {
//                 const x = onRejected(this.result);
//                 resolvePromise(promise2, x, resolve, reject);
//               } else {
//                 resolve(this.result);
//               }
//             } catch (error) {
//               reject(error);
//             }
//           });
//         }

//         if (this.status === 'pending') {
//           this.onFulFilledCallbacks.push(
//             setTimeout(() => {
//               try {
//                 if (typeof onFulFilled === 'function') {
//                   const x = onFulFilled(this.result);
//                   resolvePromise(promise2, x, resolve, reject);
//                 } else {
//                   resolve(this.result);
//                 }
//               } catch (error) {
//                 reject(error);
//               }
//             })
//           );
//           this.onRejectedCallbacks.push(
//             setTimeout(() => {
//               try {
//                 if (typeof onRejected === 'function') {
//                   const x = onRejected(this.result);
//                   resolvePromise(promise2, x, resolve, reject);
//                 } else {
//                   resolve(this.result);
//                 }
//               } catch (error) {
//                 reject(error);
//               }
//             })
//           );
//         }
//       });
//       return promise2;
//     };
//   }

//   new Promise4((resolve) => {
//     console.log('promise before resolve');
//     resolve(1);
//   })
//     .then((res) => {
//       console.log(res, 'promise then 1');
//       return res + 1;
//     })
//     .then((res) => {
//       console.log(res, 'promise then 2');
//       return res + 1;
//     })
//     .then((res) => {
//       console.log(res, 'promise then 3');
//     });

//   return <div>promise4</div>;
// }

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw TypeError('cycle error');
  }

  if (x instanceof Promise4) {
    x.then((y) => {
      resolvePromise(promise2, y, resolve, reject);
    }, reject);
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
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

class Promise4 {
  constructor(executor) {
    this.status = 'pending';
    this.result = null;
    this.reason = null;
    this.onFulFilledCallbacks = [];
    this.onRejectedCallbacks = [];

    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  resolve = (res) => {
    if (this.status === 'pending') {
      this.result = res;
      this.status = 'fulfilled';

      this.onFulFilledCallbacks.forEach((callback) => callback(this.result));
    }
  };

  reject = (err) => {
    if (this.status === 'pending') {
      this.reason = err;
      this.status = 'rejected';

      this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
    }
  };

  then = (onFulFilled, onRejected) => {
    const promise2 = new Promise4((resolve, reject) => {
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
        this.onFulFilledCallbacks.push(() => {
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
        this.onRejectedCallbacks.push(() => {
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
}

Promise4.deferred = function () {
  let result = {};
  result.promise = new Promise4((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = Promise4;
