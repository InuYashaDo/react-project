import React from 'react';

export default function Sort() {
  const arr = [1, 43, 134, 3, 4, 34, 13, 4123, 4, 354, 65, 0, 33];

  // 冒泡排序
  // 最佳O(n) 当已经排好序为最佳
  // 最差O(n^2) 当倒序为最差
  // 平均O(n^2)
  // 稳定
  // 空间复杂度O(1)
  // function bubbling() {
  //   let temp;
  //   for (let i = 0; i < arr.length; i++) {
  //     let exchange = false;
  //     for (let j = 0; j < arr.length - i; j++) {
  //       if (arr[j] > arr[j + 1]) {
  //         temp = arr[j];
  //         arr[j] = arr[j + 1];
  //         arr[j + 1] = temp;
  //         exchange = true;
  //       }
  //     }
  //     if (!exchange) {
  //       return;
  //     }
  //   }
  // }

  // bubbling();

  // 选择排序
  // 最佳O(n^2)
  // 最差O(n^2)
  // 平均O(n^2)
  // 不稳定
  // 空间复杂度O(1)
  // function selectionSort() {
  //   let min = 0;
  //   let temp;
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let j = i; j < arr.length; j++) {
  //       if (arr[j] < arr[min]) {
  //         min = j;
  //       }
  //     }
  //     if (i !== min) {
  //       temp = arr[i];
  //       arr[i] = arr[min];
  //       arr[min] = temp;
  //     }
  //   }
  // }

  // selectionSort();

  // 插入排序
  // 最佳O(n) 已经排好序为最佳
  // 最差O(n^2) 倒序为最差
  // 平均O(n^2)
  // 稳定
  // 空间复杂度O(1)
  // function insertionSort() {
  //   let temp;
  //   let index = 1;
  //   for (let i = 1; i < arr.length; i++) {
  //     temp = arr[i];
  //     for (index = i - 1; arr[index] > temp; index--) {
  //       arr[index + 1] = arr[index];
  //     }
  //     arr[index + 1] = temp;
  //   }
  // }

  // insertionSort();

  // 希尔排序
  // 最差O(nlog2 2^n)
  // 最优O(nlog2 n)
  // 平均O(nlog2 n)
  // 不稳定
  // 时间复杂度O(1)
  // function shellSort() {
  //   for (let gap = Math.floor(arr.length / 2); gap >= 0; gap /= 2) {
  //     for (let i = gap; i < arr.length; i++) {
  //       let temp = arr[i];
  //       let index = i - gap;
  //       for (index; arr[index] > temp; index -= gap) {
  //         arr[index + gap] = arr[index];
  //       }
  //       arr[index + gap] = temp;
  //     }
  //   }
  // }

  // shellSort();

  // 归并排序
  // 最佳O(nlog2 n)
  // 最差O(nlog2 n)
  // 平均O(nlog2 n)
  // 稳定
  // function mergeSort(arr) {
  //   if (arr.length < 2) return arr;
  //   const mid = Math.floor(arr.length / 2);
  //   const left = arr.slice(0, mid);
  //   const right = arr.slice(mid);
  //   return merge(mergeSort(left), mergeSort(right));
  // }

  // function merge(left, right) {
  //   const result = [];
  //   for (let i = 0, j = 0; result.length < left.length + right.length; ) {
  //     if (i >= left.length) {
  //       result.push(right[j++]);
  //     } else if (j >= right.length) {
  //       result.push(left[i++]);
  //     } else if (left[i] < right[j]) {
  //       result.push(left[i++]);
  //     } else {
  //       result.push(right[j++]);
  //     }
  //   }
  //   return result;
  // }

  // const tempArr = mergeSort(arr);

  // console.log('====================================');
  // console.log(tempArr);
  // console.log('====================================');

  function a() {
    console.log(this.m);
  }

  function c() {
    console.log(this);
  }

  const obj = {
    l: 5,
    e: c,
  };
  obj.e()

  function b(e) {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
    console.log(this);
    this.m = 1;
    a();
  }

  return <div onClick={b}>sort</div>;
}
