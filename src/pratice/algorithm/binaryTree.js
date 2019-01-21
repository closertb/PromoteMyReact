/**
 *  二叉树算法的简单熟悉
 * 示例： 寻找无序数组的第K大元素
 * 关于堆的一些基础知识：
 *    第一： 叶子节点k与非叶子节点n存在一个k = n + 1的关系；
 *    推导： 设定双叶子父节点节点数为t2，单叶子父节点节点上为t1，而叶子节点节点数为t0；
 *    步骤1: 节点总数 t = t2 + t1 + t0;
 *    步骤2: 连接线总数 b = 2 * t2 + t1 = t - 1
 *    即可推出： t2 = t0 - 1
 *    所以建立二叉堆通常以 length/2 -1的位置分开叶子节点与飞叶子节点
 *    另一个隐藏的知识就是：父子节点的关系： childIndex = 2 * parentIndex + 1 （2）
 */
const length = 800000;
const k = 8000;

const disorganize = (length) => {
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

let array = [];
function testArray() {
  array = disorganize(length);
}

/**
 * 
 */
function performanceRecord(fun) {
  const newarr = array.slice();
  const start = new Date().getTime();
  const res = fun(newarr, k);
  const end = new Date().getTime();
  console.log(`the function ${fun.name} run time is ${end - start}, the result is ${res}`);
  
}
// 最容易想到的方法，arr的sort排序，然后找到第六个数；
/**
 *时间复杂度：nlogn 
 */
function sortWay(arr, targetIndex) {
  const res = arr.sort((a, b) => b - a); 
  // console.log('target', res[targetIndex]);
  return res[targetIndex - 1];
}

// 插入排序， 用一个容器，先预装k个数，然后将剩下的数与预装容器中的最小数进行比对
/**
 *时间复杂度：nk 
 */
function secondWay(arr, targetIndex) {  
  const temp = arr.splice(0, targetIndex);
  const realTarget = targetIndex - 1;
  let lowest = sortWay(temp, targetIndex);
  for (let i = 0; i < arr.length; i++) {
    const target = arr[i];
    if (target > lowest) {
      temp[realTarget] = target;
      lowest = sortWay(temp, targetIndex);
    }
  }
  return lowest;  
}

//  二叉堆排序，维护一个长度为K的堆，然后用插入排序的剩下思路完成；堆顶即为要找的元素
/**
 *时间复杂度：nlogk
 */
function buildHeap(arr, length) {
  for (let i = length/2 - 1; i >= 0; i-- ) {
    heapAdjust(arr, i, length);
  }
  return arr;
}
function heapAdjust(arr, index, length) {
  let temp = arr[index];
  let childIndex = 2 * index + 1;
  while (childIndex < length) {
    if (childIndex + 1 < length && arr[childIndex + 1] < arr[childIndex]) {
      childIndex++;
    }
    if (temp <= arr[childIndex]) {
      break;
    }
    arr[index] = arr[childIndex];
    index = childIndex;
    childIndex = 2 * childIndex + 1;
  }
  arr[index] = temp;
}

function thirdWay(arr, targetIndex) {
  // const arr = [ 21, 37, 23, 31, 12, 44, 35, 41, 27, 39, 42, 22, 32, 19, 3 ];
  const temp = buildHeap(arr.splice(0, targetIndex), targetIndex);
  let lowest = temp[0];
  for (let i = 0; i < arr.length; i++) {
    const target = arr[i];
    if (target > lowest) {
      temp[0] = target;
      heapAdjust(temp, 0, targetIndex);
      lowest = temp[0];
    }
  }
  return lowest;  
}

//简单分治法，找出一个数，然后分左右堆，在这里只需要分大于这个数大的堆，然后不断分，知道堆的大小小于等于K个数；然后排序找出要找的元素
/**
 *时间复杂度：nlogk
 */
function fourthWay(arr, targetIndex) {
  let bigArr;
  let resArr = arr;
  while(resArr.length > targetIndex) {
    bigArr = resArr;
    const midVal = bigArr[targetIndex];
    let tempArr = [];
    for (let i = 0; i < bigArr.length; i++) {
      const target = bigArr[i];
      target > midVal && tempArr.push(target);
    }
    resArr = tempArr;
  }
  return resArr.length === targetIndex ? sortWay(resArr, targetIndex) : sortWay(bigArr, targetIndex);
}
performanceRecord(testArray);
// sortWay(arr, 6);
//performanceRecord(initarray);
performanceRecord(sortWay);
performanceRecord(secondWay);
performanceRecord(thirdWay);
performanceRecord(fourthWay);