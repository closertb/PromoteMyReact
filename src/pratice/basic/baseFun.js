/**
 * about this
 * apply, call, bind
 */

/**
 * 开胃菜：this指向
 * tips：
 * 普通function函数this指向他的调用者，比如test.trandition()中this指向test；
 * 箭头函数的this指向他被定义时的this，和调用者无关，比如说下方的test.arrow()指向的是他被定义时的外层name out;
 */
const get = {
  name: 'out',
  test: {
    name: 'test',
    trandition: function () {
      console.log('trand name', this.name);
    },
    track: function() {
      const name = this.name;
      return function() {
        console.log('track sname', name, this.name);
      };
    },
    arrow: () => {
      console.log('arrow name', this.name);
      
    },
    arrChild: () => {
      const name = this.name;
      return () => { console.log('arrow child name', name, this.name); };
    }
  },
  getthis: function() {
    return {
      name: 'test',
      trandition: function () {
        console.log('trand name', this.name);
      },
      track: function() {
        const name = this.name;
        return function() {
          console.log('track sname', name, this.name);
        };
      },
      arrow: () => {
        console.log('arrow name', this.name);
        
      },
      arrChild: () => {
        const name = this.name;
        return () => { console.log('arrow child name', name, this.name); };
      }
    };
  },
  getArrow: () => ({
    name: 'test',
    trandition: function () {
      console.log('trand name', this.name);
    },
    track: function() {
      const name = this.name;
      return function() {
        console.log('track sname', name, this.name);
      };
    },
    arrow: () => {
      console.log('arrow name', this.name);
      
    },
    arrChild: () => {
      const name = this.name;
      return () => { console.log('arrow child name', name, this.name); };
    }
  })
};
const test = get.getArrow();

test.trandition();
test.track()();
test.arrow();
test.arrChild()();