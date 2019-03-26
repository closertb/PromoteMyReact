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
// printMe();

function run(taskDef) {
  let task = taskDef();
  let result = task.next();

  function step(val) {
    if(!result.done) {
      result = task.next(val);
      const res = result.value;
      if(res instanceof Promise) {
        res.then(resolve => {
          console.log('sole', resolve);
          step(result.value);
        });
      } else {
        console.log('taskval:', result, result.value);
        step(result.value);
      }
    }
  }
  step(result.value);
}

function asyncRun(taskDef) {
  let task = taskDef();
  let result = task.next();
  (function step() {
    if(!result.done) {
      let promise = Promise.resolve(result.value);
      promise.then(value => {
        console.log('val:', result);
        result = task.next(value);
        step();
      }).catch((err) => {
        console.log('err', err);
        result = task.throw(err);
        step(err);
      });
    }
  }());
}
const forkWait = new Promise(resolve => setTimeout(() => {
  resolve('finish');
}, 1000));

function request(url, callback) {
  return new Promise(() => setTimeout(() => {
    callback(url);
  }, 1000));
}
function *wait() {
  yield request('fuck test', (data) => { console.log('da:', data);});
  console.log('finally');
}

function test() {
  console.log('start');
  return 1;
  
}
function *create(count) {
  console.log('wait', count);
  let first = yield test();
  
  let second = yield first + 2;
  yield second + 3;
  return 4 * count;
}

function *asyncfun() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

function *compose() {
  const count = yield *asyncfun();
  yield *wait();
  const res = yield *create(count);
  return res;
}
// run(asyncfun);

// run(compose);
// asyncRun(compose);
asyncRun(wait);