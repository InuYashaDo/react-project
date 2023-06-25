import React from 'react';

export default function Sort2() {
  const _arr = [1, 3, 23, 42, 123, 43, 22, 123, 445, 12, 31, 1];

  function _swap(arr, i, j) {
    let temp;
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  function _checkArr(arr) {
    if (!arr || !arr.length || arr.length === 1) return true;
  }

  // 冒泡排序
  // 空间复杂度O(1)
  // 时间复杂度 最快已经排好序O(n) 最慢逆序 n+(n-1)+... O(n^2)
  function mpSort(arr) {
    if (_checkArr(arr)) return arr;

    for (let i = 0; i < arr.length; i++) {
      // 如果一次遍历未发生移动，证明当前数组已经有序
      let change = false;

      for (let j = 0; j < arr.length - i; j++) {
        if (arr[j] > arr[j + 1]) {
          _swap(arr, j, j + 1);
          change = true;
        }
      }

      if (!change) return arr;
    }
    return arr;
  }

  // 插入排序
  // 空间复杂度O(1)
  // 时间复杂度 O(n^2)
  function insetSort(arr) {
    if (_checkArr(arr)) return arr;

    for (let i = 1; i < arr.length; i++) {
      for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
        _swap(arr, j, j + 1);
      }
    }
    return arr;
  }

  // 选择排序
  // 空间复杂度O(1)
  // 时间复杂度O(n^2)
  function chooseSort(arr) {
    if (_checkArr(arr)) return arr;

    for (let i = 0; i < arr.length; i++) {
      let _inx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[_inx] > arr[j]) {
          _inx = j;
        }
      }

      if (_inx > i) {
        _swap(arr, _inx, i);
      }
    }

    return arr;
  }

  /*
let arr = [1,2,3,4]
start sort(arr,0,3)

mid = 1
A-1 sort(arr, 0, 1)
  mid = 0
  A-1-1 sort(arr, 0, 0) return
  A-1-2 sort(arr, 1, 1) return
  // 排序 p1 = 0 p2 = mid + 1 = 1 两个数字排序
  return
A-2 sort(arr,2,3)
  mid = 2
  A-2-1 sort(arr, 2, 2) return
  A-2-2 sort(arr, 3, 3) return
  // 排序 p1 = 2 p2 = mid + 1 = 3 两个数字排序
  return
// 排序 p1 = 0 p2 = mid + 1 = 3 已经有序的两个数组排序
*/

  // 归并排序
  // 时间复杂度O(nlg n)
  function merSort(arr) {
    if (_checkArr(arr)) return;
    mergeSortRecur(arr, 0, arr.length - 1);
    return arr;
  }

  function mergeSortRecur(arr, left, right) {
    // 证明当前只有一个元素
    if (left === right) return;

    let mid = Math.floor((left + right) / 2);
    mergeSortRecur(arr, left, mid);
    mergeSortRecur(arr, mid + 1, right);

    let i = 0;
    let _sortArr = [];
    let p1 = left;
    let p2 = mid + 1;

    while (p1 <= mid && p2 <= right) {
      _sortArr[i++] = arr[p1] > arr[p2] ? arr[p2++] : arr[p1++];
    }

    while (p1 <= mid) {
      _sortArr[i++] = arr[p1++];
    }

    while (p2 <= right) {
      _sortArr[i++] = arr[p2++];
    }

    for (let j = 0; j < _sortArr.length; j++) {
      arr[left + j] = _sortArr[j];
    }

    return arr;
  }

  /*
    let temp = [3,2,1,3,4,5,12,5,6]
    1   mid = 4 base = 4 left = [3,2,1,3] right = [5,12,5,6]  
    2   mid = 2 base = 1 left = [] right = [3,2,3]
    3   return []
    4   mid = 1 base = 2 left = [] right = [3,3]
    5   return []
    6   mid = 1 base = 3 left [] right = [3]
    7   return []
    8   return [3]
    9   return [3,3]
    10  return [2,3,3]
    11  return [1,2,3,3]
    12  mid = 2 base = 5 left = [] right = [5,12,6]
    13  return []
    14  mid = 1 base = 12 left = [5,6] right = []
    15  mid = 1 base = 6 left = [5] right = []
    16  return [5]
    17  return []
    18  return []
    19  return [5,6]
    20  return [5,6,12]
    21  return [5,5,6,12]
    22  return [1,2,3,3,4,5,5,6,12]


    1   [3,2,1,3]
    2   []
    3   [3,2,3]
    4   []
    5   [3,3]
    6   []
    7   [3]
    8   [5,12,5,6]
    9   []
    10  [5,12,6]
    11  [5,6]
    12  [5]
    13  []
    14  []
  */
  // 快速排序方法一
  let times = 0;
  function quickSortFir(arr) {
    times += 1;
    console.log(times, arr);
    if (_checkArr(arr)) return arr;

    let mid = parseInt(arr.length >> 1);

    let base = arr.splice(mid, 1)[0];
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < base) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return quickSortFir(left).concat([base], quickSortFir(right));
  }

  /*
    let temp = [32,1,2,1,6,3]
    第一轮 left = 0 right = length - 1 = 5
    基准值为 3
    index = -1 i = 0
    32 > 3 i++ = 1
    1 <= 3 index++ = 0 list[0]和list[1]互换(当前index指向的值一定是大于基准值的，将当前大于基准值的第一个值和第一个不大于基准值的值互换) i++ = 2
    2 <= 3 index++ = 1 list[1]和list[2]互换 i++ = 3
    1 <= 3 index++ = 2 list[2]和list[3]互换 i++ = 4
    6 > 3 i++ = 5
    3 <= 3 index++ = 3 list[3]和list[5]互换 i++ 结束
    结束 【1,2,1,3,6,32] index = 3 进入下一层

    第二轮 [1,2,1,3,6,32]  left = 0 right = 2
    基准值为 1
    index = -1 i = 0
    1 <= 1 index++ = 0 自身交换 i++ = 1
    2 > 1 i++ = 2
    1 <= 1 index++ = 1 list[1]和list[2]互换 i++结束
    结束 [1,1,2,3,6,32] index = 1 进入下一层

    第三轮 [1,1,2,3,6,32] left = 0 right = 0
    结束 返回上一层
    
    第三轮 [1,1,2,3,6,32] left = 2 right = 2
    结束 返回上一层

    第四轮 [1,1,2,3,6,32] left = 4 right = 5
    基准值为32
    index = left - 1 = 3 i = 4
    6 <= 32 index++ = 4 自身交换 i++ = 5
    32 <= 32 i++ 结束

    第五轮 [1,1,2,3,6,32] left = 4 right = 3
    结束 返回上一层

    第六轮 [1,1,2,3,6,32] left = 5 right = 5
    结束 返回上一层

    结束 返回
    
  */
  // 快排方法二
  // 利用三路快排的思想
  function quickSortSec(list, left = 0, right = list.length - 1) {
    if (left < right) {
      var index = left - 1;
      for (var i = left; i <= right; i++) {
        if (list[i] <= list[right]) {
          index++;
          var temp = list[index];
          list[index] = list[i];
          list[i] = temp;
        }
      }
      quickSortSec(list, left, index - 1);
      quickSortSec(list, index + 1, right);
    }

    return list;
  }

  // const res = mpSort(_arr);
  // const res = insetSort(_arr);
  // const res = chooseSort(_arr);
  // const res = merSort(_arr);
  // const res = quickSortFir([3, 2, 1, 3, 4, 5, 12, 5, 6]);
  // const res = quickSortFir(_arr);
  // const res = quickSortSec(_arr);
  const res = quickSortSec([32, 1, 2, 1, 6, 3]);

  console.log(res);

  return <div>sort2</div>;
}
