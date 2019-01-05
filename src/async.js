/* function* create(a) {
  let first = yield 1 + a;
  console.log('2');
  let sec = yield first + 2;
  return yield sec;
} */

function printMe() {
  console.log('I get called from print.js!');
  console.log('change me!');
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
