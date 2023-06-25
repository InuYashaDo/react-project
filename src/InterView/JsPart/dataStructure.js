import React from 'react';

export default function DataStructure() {
  // -----链表------
  /*
    1 -> 2 -> 3 -> 4 -> 5 -> 6
    head = 1 tail = 4
    current = 1
    current.next

    function reverseLoop(head) {
      if(!head || !head.next) return
      
      let current = head;
      let pre = null;
      let next = head.next;

      while(current) {
        next = current.next
        current.next = pre
        pre = current
        current = next
      }
    }

      // function reverseRecur(current) {
  //   if (!current.next) {
  //     return;
  //   }

  //   reverseRecur(current.next);

  //   current.next.next = current;
  //   return;
  // }

  // reverseRecur(getLinkList.getNode(1));
  */

  class linkNode {
    constructor(value, next) {
      this.value = value;
      this.next = next;
    }
  }

  class linkList {
    constructor() {
      this.size = 0;
      this.dummyNode = new linkNode(null, null);
    }

    checkIndex(index) {
      if (index < 0 || index > this.size) throw Error('index error');
    }

    find(header, index, currentIndex) {
      if (index === currentIndex) return header;
      return this.find(header.next, index, currentIndex + 1);
    }

    getNode(index) {
      this.checkIndex(index);

      return this.find(this.dummyNode, index, 0);
    }

    getLastNode() {
      return this.getNode(this.size);
    }

    getFirstNode() {
      return this.dummyNode;
    }

    addNode(value, index) {
      this.checkIndex(index);

      const preNode = this.getNode(index);
      const newNode = new linkNode(value);

      newNode.next = preNode.next;
      preNode.next = newNode;
      this.size++;
      return newNode;
    }

    addFirstNode(value) {
      return new linkNode(value, 0);
    }

    addLastNode(value) {
      return this.addNode(value, this.size);
    }

    removeNode(index, isLast) {
      index = isLast ? index - 1 : index;
      let prev = this.find(this.dummyNode, index, 0);
      let node = prev.next;
      prev.next = node.next;
      node.next = null;
      this.size--;
      return node;
    }

    removeFirstNode() {
      return this.removeNode(0);
    }
    removeLastNode() {
      return this.removeNode(this.size, true);
    }
  }

  const getLinkList = new linkList();

  for (let i = 1; i <= 10; i++) {
    getLinkList.addNode(i, i - 1);
  }

  function reverseLoop(head) {
    if (!head || !head.next) return;

    let current = head;
    let pre = null;
    let next = head.next;

    while (current) {
      next = current.next;
      current.next = pre;
      pre = current;
      current = next;
    }

    return pre;
  }

  const loopFirst = reverseLoop(getLinkList.getNode(0));
  console.log(loopFirst);

  // ------------------------------

  // ---------------------- 栈 ----------------------
  class Stack {
    constructor() {
      this.stack = [];
    }

    push(item) {
      this.stack.push(item);
    }

    pop() {
      this.stack.pop();
    }

    peek() {
      return this.stack[this.getCount() - 1];
    }

    getCount() {
      return this.stack.length;
    }

    isEmpty() {
      return this.stack.length === 0;
    }
  }

  const newStack = new Stack();

  newStack.push({ index: 0 });
  newStack.push({ index: 1 });
  newStack.push({ index: 2 });
  newStack.push({ index: 3 });

  console.log(newStack.peek(), '==========stack');

  // ------------------------------------------------

  // ----------------------- 队列 -----------------------------
  class commonQueue {
    constructor() {
      this.queue = [];
    }

    enqueue(item) {
      this.queue.push(item);
    }

    dequeue() {
      return this.queue.shift();
    }

    peek() {
      return this.queue[0];
    }

    getCount() {
      return this.queue.length;
    }

    isEmpty() {
      return this.queue.length === 0;
    }
  }

  class sqQueue {
    constructor(length) {
      this.queue = new Array(length + 1);
      this.first = 0;
      this.last = 0;
      this.size = 0;
    }

    enqueue(item) {
      if (this.first === (this.last + 1) % this.queue.length) {
        this.resize(this.getLength() * 2 + 1);
      }

      this.queue[this.last] = item;
      this.size++;
      this.last = (this.last + 1) % this.queue.length;
    }

    dequeue() {
      if (this.size === 0) throw Error('queue is empty');

      const r = this.queue[this.first];
      this.queue[this.first] = null;
      this.first = (this.first + 1) % this.queue.length;
      this.size--;

      if (this.size === this.getLength() / 4 && this.getLength() / 2 !== 0) {
        this.resize(this.getLength() / 2);
      }

      return r;
    }

    getHeader() {
      return this.queue[this.first];
    }

    getLength() {
      return this.queue.length - 1;
    }

    isEmpty() {
      return this.size === 0;
    }

    getSize() {
      return this.size;
    }

    resize(length) {
      const q = new Array(length);

      for (let i = 0; i < length; i++) {
        q[i] = this.queue[(this.first + i) % this.queue.length];
      }

      this.first = 0;
      this.last = this.size;
      this.queue = q;
    }
  }

  // ---------------- 树 ------------------------
  class treeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.size = 1;
    }
  }

  // 生成二叉搜索树
  class BST {
    constructor() {
      this.root = null;
      this.size = 0;
    }

    addNode(v) {
      this.root = this._addNode(this.root, v);
    }

    _addNode(node, v) {
      if (!node) {
        this.size++;
        return new treeNode(v);
      }

      if (node.value < v) {
        node.size++;
        node.right = this._addNode(node.right, v);
      } else if (node.value > v) {
        node.size++;
        node.left = this._addNode(node.left, v);
      }

      return node;
    }

    getMin() {
      if (!this.root) return null;
      return this._getMin(this.root);
    }

    _getMin(node) {
      if (!node.left) return node;
      return this._getMin(node.left);
    }

    getMax() {
      if (!this.root) return null;
      return this._getMax(this.root);
    }

    _getMax(node) {
      if (!node.right) return node;
      return this._getMax(node.right);
    }

    deleteMin() {
      this.root = this._deleteMin(this.root);
    }

    _deleteMin(node) {
      if (node && !node.left) return node.right;
      node.left = this._deleteMin(node.left);
      node.size = this._getSize(node.left.size) + this._getSize(node.right) + 1;
      return node;
    }

    delete(v) {
      this.root = this._delete(this.root, v);
    }

    _delete(node, v) {
      if (!node) return null;

      if (node.value > v) {
        node.left = this._delete(node.left);
      } else if (node.value < v) {
        node.right = this._delete(node.right);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        const min = this._getMin(node.right);
        min.right = this._deleteMin(node.right);
        min.left = node.left;
        node = min;
      }

      node.size = this._getSize(node.left.size) + this._getSize(node.right) + 1;
      return node;
    }

    floor(v) {
      if (!this.root) return null;
      return this._floor(this.root, v);
    }

    _floor(node, v) {
      if (v > node.value) {
        if (node.right) {
          return this._floor(node.right, v);
        }
      }

      if (v < node.value) {
        if (node.left) {
          return this._floor(node.left, v);
        }
      }

      return node;
    }

    getSize() {
      return this.size;
    }

    _getSize(node) {
      return node ? node.size : 0;
    }

    select(k) {
      if (!this.root) return null;
      return this._select(this.root, k);
    }

    _select(node, k) {
      let size = node.left ? node.left.size : 0;

      if (size > k) {
        return this._select(node.left, k);
      }

      if (size < k) {
        return this._select(node.right, k - size - 1);
      }

      return node;
    }

    getRoot() {
      return this.root;
    }

    isEmpty() {
      return this.size === 0;
    }
  }

  // 实例化
  const newBST = new BST();

  newBST.addNode(1);
  newBST.addNode(7);
  newBST.addNode(3);
  newBST.addNode(4);
  newBST.addNode(2);
  newBST.addNode(11);
  newBST.addNode(9);

  const bstRoot = newBST.getRoot();

  const treeMin = newBST.getMin();
  const treeMax = newBST.getMax();
  console.log(treeMin, '======tree min');
  console.log(treeMax, '========tree max');

  const treeFloor = newBST.floor(6);
  console.log(treeFloor, '========tree floor');

  const treeRank = newBST.select(5);
  console.log(treeRank, '========tree rank');

  newBST.deleteMin();
  console.log(newBST.getRoot(), '=============tree delete min');

  newBST.delete(3);
  console.log(newBST.getRoot(), '=============tree delete random');

  // 二叉搜索树的三种深度遍历
  function fBst(node) {
    if (node) {
      console.log(node.value);
      fBst(node.left);
      fBst(node.right);
    }
  }

  function mBst(node) {
    if (node) {
      mBst(node.left);
      console.log(node.value);
      mBst(node.right);
    }
  }

  function lBst(node) {
    if (node) {
      lBst(node.left);
      lBst(node.right);
      console.log(node.value);
    }
  }

  // fBst(bstRoot);
  // mBst(bstRoot);
  // lBst(bstRoot);

  // 二叉搜索树的广度遍历
  function breadthTravel(node) {
    if (!node) return null;

    const q = new commonQueue();

    q.enqueue(node);

    while (!q.isEmpty()) {
      const l = q.dequeue();
      console.log(l.value);
      if (l.left) q.enqueue(l.left);
      if (l.right) q.enqueue(l.right);
    }
  }

  breadthTravel(bstRoot);

  // --------------------------------------------------

  // --------------------堆------------------------------
  class MaxHeap {
    constructor() {
      this.heap = [];
    }

    size() {
      return this.heap.length;
    }

    isEmpty() {
      return this.size() === 0;
    }

    add(item) {
      this.heap.push(item);
      this._shiftUp(this.size() - 1);
    }

    _getParentIndex(k) {
      return parseInt((k - 1) >> 1);
    }

    _shiftUp(k) {
      while (this.heap[k] > this.heap[this._getParentIndex(k)]) {
        this._swap(k, this._getParentIndex(k));
        k = this._getParentIndex(k);
      }
    }

    _getLeftIndex(k) {
      return k * 2 + 1;
    }

    removeMax(k) {
      this._shiftDown(0);
    }

    _shiftDown(k) {
      this._swap(0, this.size() - 1);
      this.heap.splice(this.size() - 1, 1);
      while (this._getLeftIndex(k) < this.size()) {
        let j = this._getLeftIndex(k);

        if (j + 1 < this.size() && this.heap[j + 1] > this.heap[j]) j++;

        if (this.heap[k] >= this.heap[j]) break;
        this._swap(j, k);
        k = j;
      }
    }

    _swap(left, right) {
      let temp = this.heap[left];
      this.heap[left] = this.heap[right];
      this.heap[right] = temp;
    }
  }

  const newHeap = new MaxHeap();

  newHeap.add(1);
  newHeap.add(11);
  newHeap.add(3);
  newHeap.add(5);
  newHeap.add(9);
  newHeap.add(22);
  newHeap.add(1);
  newHeap.add(7);

  console.log(newHeap.heap, '============max heap');
  // 22 9 11 7 5 3 1 1

  newHeap.removeMax();
  console.log(newHeap.heap, '============remove max');
  // 11 9 3 7 5 1 1

  // ------------------------------------

  return <div>dataStructure</div>;
}
