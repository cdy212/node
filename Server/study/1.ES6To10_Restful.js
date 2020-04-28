/**
 * 1. babel http://jeonghwan-kim.github.io/2016/07/19/babel.html
 * TODO : 2. restful https://github.com/hurkanyakay/reactjs-nodejs-rest-example
 * **
 * https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
 //TODO : cash https://github.com/jeonyeonbin/rest-api-cache-node
 
 https://www.compose.com/articles/api-caching-with-redis-and-nodejs/

 https://www.npmtrends.com/apicache-vs-memory-cache-vs-node-cache-vs-redis

How can I cache RESTFul API responses (node/express) with dynamic data?
이를 달성하는 데는 여러 가지 방법이 있으며, 필요한 경로는 필요에 따라 다릅니다.
캐시 된 데이터가 작고 오래 살 필요가 없다면 글로벌 인 메모리 저장소를 사용하십시오.
데이터를 저장해야하는 경우, 데이터베이스에 저장하고, 메모리에 저장하고 메모리에서 제공하십시오. 서버가 올바른 상태가되기 시작하면 데이터베이스에서로드하십시오.
서버간에 데이터를 공유하는 경우 위와 동일하게 수행 할 수 있지만 인 메모리를 사용하는 대신 Redis, Memcached, CouchDB, Mongo 또는 기타 솔루션과 같은 것을 사용해야합니다.
따라서 이것은 사용자가 일부 데이터를 POST하고 어딘가에 저장된 값을 업데이트한다는 것을 의미합니다.
사용자가 데이터를 가져 오면 해당 저장소에서 데이터를 가져옵니다.
장소와 방법을 저장하기 만하면됩니다.


});

 */

var mssql = require('mssql');
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');


const employees = [
  { firstName: 'Jane', lastName: 'Smith', age: 20 },
  //...
  { firstName: 'John', lastName: 'Smith', age: 30 },
  { firstName: 'Mary', lastName: 'Green', age: 50 },
]

/*
EC6(2015): Generator, Arrow Function, Class 문법, import {} from ‘ /;’export
EC7(2016): **(제곱연산자), array.includes(value, startIndex), Promise.
EC8(2017): [async/await]
*/

//0.depth
 router.get('/articles/:articleId/comments', async function(req, res) {
     
     console.log(111);
     try {
           //1. valid
            const { email } = req.body;
            const userExists =await users.find(u => u.email === email);
            if (userExists) {
                return res.status(400).json({ error: 'User already exists' })
            }

            //2. filter     ordering - //http://example.com/articles?sort=+author,-datepublished 
            const { firstName, lastName, age } = req.query;
            let results = [...employees];
            if (firstName) {
                results = results.filter(r => r.firstName === firstName);
            }

            if (lastName) {
                results = results.filter(r => r.lastName === lastName);
            }

            if (age) {
                results = results.filter(r => +r.age === +age);
            }
            
            res.json(results);
     } catch (err) {
            return res.status(500).json({ error: err.message })
     }
  


});








/**
 * Array filter, find - one, map, reduce
 * setting 축약
 * calss
 * 
 */
 
/**
 * https://chanspark.github.io/2017/11/28/ES6-%EA%BF%80%ED%8C%81.html
 * 
 * 축약 방법
const observable = require('mobx/observable');
const action = require('mobx/action');
const runInAction = require('mobx/runInAction');
const store = this.props.store;
const form = this.props.form;
const loading = this.props.loading;
const errors = this.props.errors;
const entity = this.props.entity;
축약기법:
import { observable, action, runInAction } from 'mobx';
const { store, form, loading, errors, entity } = this.props;
축약기법으로 커스텀 변수명을 지정할 수 있습니다:
const { store, form, loading, errors, entity:contact } = this.props;

 * https://bblog.tistory.com/300
 */

class Person { 
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(this.name + " is eating.");
  }
}

class Student extends Person {
  constructor(name) {//
    super(name);     // Property를 따로 변경하지 않았기 때문에 생략 가능하다.
  }                  //
  eat() {
    console.log(`${this.name}is studying.`);
  }
  
  learn() {
    console.log(`${this.name}is coding.`);
  }
}


// "Daniel is eating."
// "Daniel is studying."

(function usefulArray() {
//filter, find 많이 쓰고 . reduce .. 는 음.
var student1 = new Student("Daniel");
student1.eat(); 

//map 메소드는 요소를 일괄적으로 변경하는데 효과적입니다. 예제를 봅시다.
// 문자열 배열에서 문자열 길이만 획득하기
var arr = ['foo', 'hello', 'diamond', 'A'];
var arr2 = arr.map(function (str) {
    return str.length;
});
console.log(arr2); // [3, 5, 7, 1]

// map - 문자열 배열에서 문자열 길이만 획득하기
// reduce로 구현
var arr = ['foo', 'hello', 'diamond', 'A'];
var arr2 = arr.reduce(function (pre, value) {
    pre.push(value.length);
    return pre;//*************리턴 값이 pre 파라미터가 됨 ***************
}, []);
console.log(arr2); // [3, 5, 7, 1]


// 정수 배열에서 5의 배수인 정수만 모으기
var arr = [4, 15, 377, 395, 400, 1024, 3000];
var arr2 = arr.filter(function (n) {
    return n % 5 == 0;
});
console.log(arr2); // [15, 395, 400, 3000]
 
// filter - 정수 배열에서 5의 배수인 정수만 모으기
// reduce로 구현
var arr = [4, 15, 377, 395, 400, 1024, 3000];
var arr2 = arr.reduce(function (pre, value) {
    if (value % 5 == 0) {
        pre.push(value);
    }
    return pre;
}, []);
console.log(arr2); // [15, 395, 400, 3000]



const pets = [
  { type: 'Dog', name: 'Max'},
  { type: 'Cat', name: 'Karl'},
  { type: 'Dog', name: 'Tommy'},
]

pet = pets.find(pet => pet.type ==='Dog' && pet.name === 'Tommy');
console.log(pet); // { type: 'Dog', name: 'Tommy' }

    const odd = [1, 3, 5 ];
    const nums = [2, ...odd, 4 , 6];
    console.log(nums);


    calcCircumference = diameter => (
        Math.PI * diameter
    )
    console.log(calcCircumference(333));
    calcCircumference2 = diameter => {
        return Math.PI * diameter
        //Math.PI * diameter
    }
    console.log(calcCircumference2(333));


    const dbHost = process.env.DB_HOST || 'localhost';
    console.log(dbHost);
    
    const x = 20;
    const answer = x > 10 ? " greater than 10" : x 
    console.log(answer);
    
    let variable1 = undefined;//if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
    const variable2 = variable1  || 'empty';
    console.log(variable2);

    let values = [3, 1, 3, 5, 2, 4, 4, 4];
    let uniqueValues = [...new Set(values)];
    console.log(uniqueValues);
    //babel test
    console.log([1, 2, 3].map(n => n * n))

    //array func is call first set value - https://helloinyong.tistory.com/74
    function callFunc(){
        return {
            foo : 25,
            bar : () => {
            console.log(this.foo);
            }
        }
    }

    callFunc.call({foo:100}).bar(); // 100

    function callFunc2(){
        return {
            foo : 25,
            bar : function(){
            console.log(this.foo);
            }
        }
    }
    callFunc2.call({foo:100}).bar(); // 25



})();

module.exports = router;



