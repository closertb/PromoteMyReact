/* function* create(a) {
  let first = yield 1 + a;
  console.log('2');
  let sec = yield first + 2;
  return yield sec;
} */

/* const fibonacci = {
  [Symbol.iterator]() {
    let n1 = 1,
      n2 =1;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const current = n2;
        n2 = n1;
        n1 += current;
        return { value: current, done: false };
      },
      return(v) {
        console.log('stop here');
        return { value: v, done: true };
      }
    };
  }
};
function *foo() {
  console.log('start');
  yield 1;
  console.log('v:1');
  yield 2;
  console.log('v:2');
  yield 3;
  console.log('v:3');
  return '4';
}
function *bar() {
  const x = yield *foo();
  console.log('x:', x);
  
}*/
function printMe() {
  for(let v of [2,3]) {
    console.log(v);
  }

} 
/* async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

const iter = create(3);
async1();
console.log(iter.next(5));

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log(iter.next(2));
console.log('script end 45'); */

// const iter = create(3);

// export default printMe;
printMe();
