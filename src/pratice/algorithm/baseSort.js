/**
 *  常规排序算法的简单熟悉
 * length：无序数组的长度
 */

const length = 150000;
let array = [];
// let array = [ 31, 38, 4, 13, 22, 1, 20, 11, 34, 36, 6, 29, 28, 23, 2 ];


/**
 * 名称：数组元素位置调换
 *时间复杂度：nlogn 
 */
function swap(arr, lastIndex, newIndex) {
  let temp = arr[lastIndex];
  arr[lastIndex] = arr[newIndex];
  arr[newIndex] = temp;
}

/**
 * 名称：乱序数组生成器
 *时间复杂度：3n 
 */
const disorganize = (len) => {
  const length = 3 * len;
  const arr = [];
  const res = [];
  let temp;
  for (let i = 1; i <= length; i++) {
    arr.push(i);
  }
  for (let i = 0; i < length; i++) {
    let random = Math.round(Math.random() * (length - 2));
    temp = arr[random];
    arr[random] = arr[i];
    arr[i] = temp;
  }
  for (let i = 0; i < length; i++) {
    //arr.push(i);
    i % 3 === 0 && res.push(arr[i]);
  }
  return res;
};

function testArray() {
  array = disorganize(length);
}

/**
 * 
 */
function performanceRecord(fun) {
  const newarr = array.slice();
  const start = new Date().getTime();
  //console.log('sd',fun(newarr));
  fun(newarr);
  const end = new Date().getTime();
  console.log(`the function ${fun.name} run time is ${end - start}`);

}
/**
 * 名称：冒泡排序
 * 计算公式： n + (n - 1) + (n - 2) + ... + 2 + 1 = n^2/2 
 *时间复杂度：O(n^2)
 */
function bubbleOrder(arr) {
  let i = 0,
    // count = 0,
    j = 0;
  for (i = 0; i < arr.length; i++) {
    for (j = arr.length - 1; j > i; j--) {
      //count++;
      (arr[j] < arr[j - 1]) && swap(arr, j - 1, j);
    }
  }
  // console.log('bubbleOrder', count);
  return arr;
}

/**
 * 名称：冒泡排序加入提前顺序判断
 * 计算公式： n + (n - 1) + (n - 2) + ... + 2 + 1 = n^2/2 
 *时间复杂度：O(n^2)
 */
function bubbleOrderWithSorted(arr) {
  let i = 0,
    // count = 0,
    j = 0;
  for (i = 0; i < arr.length; i++) {
    let isSorted = true;
    for (j = arr.length - 1; j > i; j--) {
      // count++;
      if ((arr[j] < arr[j - 1])) {
        swap(arr, j - 1, j);
        isSorted = false;
      }
    }
    if (isSorted) {
      break;
    }
  }
  // console.log('bubbleOrderWithSorted:', count);
  return arr;
}

/**
 * 名称：冒泡排序加上提前判断和起始边界
 * 计算公式： n + (n - 1) + (n - 2) + ... + 2 + 1 = n^2/2 
 *时间复杂度：O(n^2)
 */
function bubbleOrderWithBorder(arr) {
  let i = 0,
    // count = 0,
    j = 0;
  // console.log(arr);
  let sortBorder = 0;
  let lastChangeIndex = arr.length - 1;
  for (i = 0; i < arr.length; i++) {
    let isSorted = true;
    for (j = arr.length - 1; j > sortBorder; j--) {
      // count++;
      if ((arr[j] < arr[j - 1])) {
        swap(arr, j - 1, j);
        isSorted = false;
        lastChangeIndex = j;
      }
    }
    sortBorder = lastChangeIndex;
    if (isSorted) {
      break;
    }
  }
  // console.log('bubbleOrderWithBorder:', count);
  return arr;
}

/**
 * 名称：选择排序
 * 稳定性： 不稳定
 * 计算公式： n + (n - 1) + (n - 2) + ... + 2 + 1 = n^2/2 
 * 时间复杂度：O(n^2)
 * 与冒泡排序相比，选择排序扫了很多不必要的交换
 * 特别说明：选择排序是一种不稳定的排序。就是说，排序过程会将已经排好的顺序打乱重排。比如： 5 8 5 2 9，在排序过程中，第一个5会被调整到第二个5后面
 */
function chooseOrder(arr) {
  let i = 0,
    j = 0,
    min = 0;
  for (i = 0; i < arr.length; i++) {
    min = i;
    for (j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    (min > i) && swap(arr, i, min);
  }
  return arr;
}

/**
 * 名称：插入排序
 * 稳定性： 稳定
 * 计算公式： 1 + 2 + 3 + ... + (n - 1) + n = n^2/2 
 * 时间复杂度：O(n^2)
 * 与选择排序相比，插入排序在某些过程中会提前结束，所以并不少n-k, n + 1 -k, ... n这样递增的，所以虽然都是n^2,但插入排序时间性能时优于选择排序的
 */
function insertOrder(arr) {

  let i = 0;
  for (i = 0; i < arr.length; i++) {
    let j = i,
      temp = arr[i];
    for (j = i; j > 0 && (temp < arr[j - 1]); j--) {
      arr[j] = arr[j - 1];
    }
    arr[j] = temp;
  }
  return arr;
}

/**
 * 名称：希尔排序
 * 稳定性： 不稳定
 * 计算公式： 有些复杂，增量规则不同，复杂度也不同；
 * 时间复杂度：O(n^1.3)
 * 与插入排序
 */
function hellOrder(arr) {
  const N = arr.length;
  let h = 1;
  // console.log('arr', arr);
  while (h < Math.round(N / 3)) {
    h = 3 * h + 1;
  }
  while (h >= 1) {
    // 这一步的实质就是插入排序，只不过增量从1变为了H
    for (let i = h; i < N; i++) { // 将a[i]插入到a[i-h], a[i-2*h], a[i-3*h]... 之中
      for (let j = i; j >= h && (arr[j] < arr[j - h]); j -= h) {
        // console.log('res', i, j, h);
        swap(arr, j, j - h);
      }
    }
    h = Math.round(h / 3);
  }
  // console.log('res', arr);

  return arr;
}

/**
 * 名称：归并排序
 * 稳定性： 稳定
 * 时间复杂度：nlogn 
 * 空间复杂度：n
 */
function merge(left, right) {
  let temp = [],
    l = 0,
    r = 0;
  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      temp.push(left[l++]);
    } else {
      temp.push(right[r++]);
    }
  }
  return temp.concat(left.slice(l)).concat(right.slice(r));
}

function mergeSort(arr) {
  const m = Math;
  if (arr.length < 2) {
    return arr;
  }
  let mid = m.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

/**
 * 名称：快速排序
 * 稳定性：不稳定
 * 时间复杂度：nlogn
 * 空间复杂度：nlogn
 */
function partition(arr, left, right) { // 分区操作
  let pivot = left, // 设定基准值（pivot）, 这里的取值始终为区域最左侧的数值
    index = pivot + 1;
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}

function quickSort(arr, tempLeft, tempRight) {
  let partitionIndex;
  const left = typeof tempLeft != 'number' ? 0 : tempLeft;
  const right = typeof tempRight != 'number' ? arr.length - 1 : tempRight;

  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}
/**
 * 关于堆的一些基础知识：
 *    第一： 叶子节点k与非叶子节点n存在一个k = n + 1的关系；
 *    推导： 设定双叶子父节点节点数为t2，单叶子父节点节点上为t1，而叶子节点节点数为t0；
 *    步骤1: 节点总数 t = t2 + t1 + t0;
 *    步骤2: 连接线总数 b = 2 * t2 + t1 = t - 1
 *    即可推出： t2 = t0 - 1
 *    所以建立二叉堆通常以 length/2 -1的位置分开叶子节点与飞叶子节点
 *    另一个隐藏的知识就是：父子节点的关系： childIndex = 2 * parentIndex + 1 （2） left加1，right加2
 */
/**
 * 堆排序
 * 稳定性：不稳定
 * 时间复杂度：nlogn
 * 空间复杂度：1
 * 思路：首先构建一个大顶兑，然后堆顶就是最大的数，将堆顶和当前堆的最大索引兑换。然乎调整堆，然后再与当前堆最大索引兑换，继续前面的过程。
 * 整个过程中，堆在不断的变小，然后弹出的堆顶就是想要的结果；
 * 计算过程：
 *        构建大顶堆: ；
 *        调整堆 log(n-1), log(n-2), ...., log1
 */
function buildMaxHeap(arr) { // 建立大顶堆
  const len = arr.length;
  for (var i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapify(arr, len, i);
  }
}
/**
 * 
 * @param {*} arr 构建堆的数组
 * @param {*} len 堆对应的数组最大索引
 * @param {*} i 非叶子节点索引
 */
function heapify(arr, len, i) { // 堆调整
  let left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i;

  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, len, largest);
  }
}

function heapSort(arr) {
  let len = arr.length;
  // console.log('sd', arr);
  buildMaxHeap(arr);
  // console.log('sd', arr);
  for (var i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    len--;
    heapify(arr, len, 0);
  }
  // console.log('res', arr);
  return arr;
}
/**
 * 计数排序
 * 
 */
function findMaxAndMin(arr){
  let max = 0;
  // let min = 0;
  for (let i = 0; i< arr.length; i++) {
    const curr = arr[i];
    curr > max && (max = curr);
    //curr < min && (min = curr);
  }
  return max;
}
function countingSort(arr) {
  const maxValue = findMaxAndMin(arr);
  const bucket = new Array(maxValue + 1);
  let sortedIndex = 0;
  const arrLen = arr.length,
    bucketLen = maxValue + 1;

  for (let i = 0; i < arrLen; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 0;
    }
    bucket[arr[i]]++;
  }

  for (var j = 0; j < bucketLen; j++) {
    while (bucket[j] > 0) {
      arr[sortedIndex++] = j;
      bucket[j]--;
    }
  }
  // console.log('arr', arr);
  return arr;
}
performanceRecord(testArray);
performanceRecord(bubbleOrder);
performanceRecord(bubbleOrderWithSorted);
performanceRecord(bubbleOrderWithBorder);
performanceRecord(chooseOrder);
performanceRecord(insertOrder);
performanceRecord(hellOrder);
performanceRecord(mergeSort);
performanceRecord(quickSort);
performanceRecord(heapSort);
performanceRecord(countingSort);