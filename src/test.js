// function takeLongTime(n, step) {
//   console.log(`step${step} with ${n}`);
//   return new Promise(resolve => {
//     setTimeout(() => resolve(n + 200), n);
//   });
// }

// function step1(n) {
//   return takeLongTime(n,1);
// }

// function step2(n) {
//   return takeLongTime(n,2);
// }

// function step3(n) {
//   return takeLongTime(n,3);
// }

// async function testAsync() {
//   await step1(100);
//   await step2(200);
//   await step3(300);
//   return 'hello async';
// }

// async function async1() {
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end');
// }

// async function async2() {
//   console.log('async2');
// }

// console.log('script start');

// setTimeout(function () {
//   console.log('setTimeout');
// }, 0);

// // async1();
// const result = testAsync();
// result.then(v => console.log(v));

// new Promise(function (resolve) {
//   console.log('promise1');
//   resolve();
// }).then(function () {
//   console.log('promise2');
// });

// console.log('script end 45');



// function test () {
//   console.log('start')
//    setTimeout(() => {
//        console.log('children2')
//        Promise.resolve().then(() => {console.log('children2-1')})
//    }, 0)
//    setTimeout(() => {
//        console.log('children3')
//        Promise.resolve().then(() => {console.log('children3-1')})
//    }, 0)
//    Promise.resolve().then(() => {console.log('children1')})
//    console.log('end') 
// }

function test() {
  console.log('start');
  Promise.resolve().then(()=>{
    console.log('Promise1');
    setTimeout(()=>{
      console.log('setTimeout2');
    },0);
  });
  setTimeout(()=>{
    console.log('setTimeout1');
    Promise.resolve().then(()=>{
      console.log('Promise2');   
    });
  },0);
  setTimeout(() => {
    Promise.resolve().then(() => {
      console.log('promise3');
    });
    console.log('settimeout3');
  }, 0);
  console.log('end');
}
// start -> end -> promise1 -> settimeout1 -> promise2 -> settimeout3 -> promise3 -> settimeout2
test();