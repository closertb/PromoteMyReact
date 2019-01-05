function takeLongTime(n, step) {
  console.log(`step${step} with ${n}`);
  return new Promise(resolve => {
    setTimeout(() => resolve(n + 200), n);
  });
}

function step1(n) {
  return takeLongTime(n,1);
}

function step2(n) {
  return takeLongTime(n,2);
}

function step3(n) {
  return takeLongTime(n,3);
}

async function testAsync() {
  await step1(100);
  await step2(200);
  await step3(300);
  return 'hello async';
}

async function async1() {
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

async1();
const result = testAsync();
result.then(v => console.log(v));

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

console.log('script end 45');