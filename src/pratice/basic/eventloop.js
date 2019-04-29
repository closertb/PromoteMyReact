async function pro() {
  console.log('async start');
  await Promise.resolve().then(() => {
    console.log('await pro');
  });
  // await console.log('con start');
  console.log('async end');
}
function test() {
  console.log('start');
  pro();
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
// start -> async start -> end -> awit pro -> promise1 -> settimeout1 -> promise2 -> settimeout3 -> promise3 -> settimeout2
test();