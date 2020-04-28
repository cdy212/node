/**
 * 0. 사전 지식 Task Study
 * 1. 비동기 코딩을 동기 코딩 방식으로. 
 * 2. 병렬 프로그래밍
 * 3. cf) 병렬처리
 */
//https://blueshw.github.io/2018/01/28/tasks-microtasks-queues-and-schedules/
//thread , process
//https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html

var mssql = require('mssql');
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

/**
 * 0. Task Study
 */

/*
thread 는 자신의 이벤트 루프를 갖고 있으며 별도의 이벤트 루프는 실행 순서를 보장하는 여러개의 task 를 가지고 있지만 각 이벤트 루프의 실행단계에서 어떤 task 를 실행시킬지는 브라우저가 선택한다. 
일반적으로 microtask 는 현재 실행되고 있는 script 바로 다음 observer callback이나 promise callback
*/
/* GET home page. */
router.get('/', function(req, res, next) {

      // 1 - task1 실행: script, script start 출력
      console.log('script start')

      var a = 1; 

      // 2 - task2 등록: timer task 대기열에 들어감
      setTimeout(function() {
        // 8 - task2 실행
        console.log('setTimeout')
          console.log(a);
      }, 0)

      // 3 - microtask1 등록: promise가 microtask 대기열에 들어감
      Promise.resolve()
        .then(function() {
          // 5 - microtask1 실행: promise1 출력
          console.log('promise1')
          // 6 - microtask2 등록:
          console.log(a);
          a=3;
        })
        .then(function() {
          // 7 - microtask2 실행: promise2 출력
          console.log('promise2')
        })

        // 4 - task1 종료: script end 출력
        console.log('script end')
        
        test(a);
        a=2;
        res.render('index', { title: 'Express' });
        test(a);

});

function test(x){
    console.log("---------function----------");
    console.log(x);
}


/**
 * 1. Async - 동기 코딩 처럼 쓰기위해 async 사용
 * async, await 는 ES8 스펙이라 몇몇 브라우저에서는 호환되지 않게 때문에(최신 크롬은 됩니다) 기존 브라우저에서 동작하도록 자바스크립트 코드를 변환해 주어야 합니다. babel 변환 코드.
 * https://blueshw.github.io/2018/02/27/async-await/
 * 주의할 점 : await 뒷부분이 반드시 promise 를 반환해야 한다는 것과 async function 자체도 promise 를 반환
 * https://velog.io/@bathingape/ES7-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC-Asyncawait
 */

//case 1
function goWork(time1, timeStartWork) {
  wakeUp(time1, function (time2) {
    takeSubway(time2, function(time3) {
      takeOffSubway(time3, function(time4) {
        arriveWork(time4, function(arrivalTime) {
          if (arrivalTime > timeStartWork) {
            fire();
          }
        })
      })
    })
  })
};

//case 2
function goWork(time1, timeStartWork) {
  return wakeUp(time1)
    .then(time2 => tackSubway(time2))
    .then(time3 => takeOffSubway(time3))
    .then(time4 => arriveWork(time4))
    .then(arrivalTime => {
      if (arrivalTime > timeStartWork) {
        fire()
      }
    })
}

//case 3 - finally
//* 동기 코드 개발자가 보기 편한..? 코드
async function goWork(time1, timeStartWork) {
  const time2 = await wakeUp(time1)
  const time3 = await takeSubway(time2)
  const time4 = await takeOffSubway(time3)
  const arrivalTime = await arriveWork(time4)
  if (arrivalTime > timeStartWork) {
    fire()
  }
}

/**
 * 2. 실무
 * //https://jsao.io/2017/07/how-to-get-use-and-close-a-db-connection-using-async-functions/
 * TODO sql injection...
 * http://blog.naver.com/PostView.nhn?blogId=pjt3591oo&logNo=221505148267&redirect=Dlog&widgetTypeCall=true&directAccess=false 커넥션 풀 테스트
 */

router.get('/async',async (req, res, next) => {
   const body = req.body;
   let shno  = '202004230018';
/*
  let sqlDelHdr = ` SELECT *  FROM [dbo].[t_adm_sheet_hdr]   where sh_no = ${shno} `;
  let sqlDelDtl = ` select * FROM [dbo].[t_adm_sheet_dtl]   where sh_no = ${shno} `;
  let sqlDelMissAuditEdit = ` select * FROM [dbo].[t_adm_sheet_miss_auditedit]  where sh_no = ${shno} `;
  let sqlDelMissSum = ` select * FROM [dbo].[t_adm_sheet_miss_auditsum]  where sh_no = ${shno} `;
  let sqlDelMissEdit = ` select * FROM [dbo].[t_adm_sheet_miss_edit]  where sh_no = ${shno} `;
  let sqlDelEditSum = ` select * FROM [dbo].[t_adm_sheet_miss_edit_sum]  where sh_no = ${shno} `;
  let sqlDelGenDataSum = ` select * FROM [dbo].[t_adm_sheet_miss_gendatsum]  where sh_no = ${shno} `;

  
*/  
    
  let sqlDelHdr = ` DELETE  FROM [dbo].[t_adm_sheet_hdr]   where sh_no = ${shno} `;
  let sqlDelDtl = ` DELETE FROM [dbo].[t_adm_sheet_dtl]   where sh_no = ${shno} `;
  let sqlDelMissAuditEdit = ` DELETE FROM [dbo].[t_adm_sheet_miss_auditedit]  where sh_no = ${shno} `;
  let sqlDelMissSum = ` DELETE FROM [dbo].[t_adm_sheet_miss_auditsum]  where sh_no = ${shno} `;
  let sqlDelMissEdit = ` DELETE FROM [dbo].[t_adm_sheet_miss_edit]  where sh_no = ${shno} `;
  let sqlDelEditSum = ` DELETE FROM [dbo].[t_adm_sheet_miss_edit_sum]  where sh_no = ${shno} `;
  let sqlDelGenDataSum = ` DELETE FROM [dbo].[t_adm_sheet_miss_gendatsum]  where sh_no = ${shno} `;

/*
//동기 코딩 방식

  let callDelAll = async function delHistoryByShno(){
      try {
        const resultHdr = await callSql(sqlDelHdr);
        const resultDtl = await callSql(sqlDelDtl);
        const resultMiss = await callSql(sqlDelMissAuditEdit);
        const resultSum = await callSql(sqlDelMissSum);
        const resultAudit = await callSql(sqlDelMissEdit);
        const resultEdit = await callSql(sqlDelEditSum);
        const resultDataSum = await callSql(sqlDelGenDataSum);  
        //console.log(resultDataSum);
        console.log(111) ;
        var a= 1/0;
        console.log(a);
        return [resultHdr,resultDtl,resultMiss,resultSum,resultAudit,resultEdit,resultDataSum];
      } catch (error) {
        return new Error(error);
      }
  }()
  .then(r=>
    res.status(200).json(r)
  ).catch(e=>
    console.log(e+'final')
  );
*/


  //병렬 코딩 성능 2배 가량 향상. * 끝~
  /*
  let callDelAll2 = async function delHistoryByShno2(){
        return await Promise.all([await callSql(sqlDelHdr),await callSql(sqlDelDtl), callSql(sqlDelMissAuditEdit) , callSql(sqlDelMissSum) , callSql(sqlDelMissEdit) , callSql(sqlDelEditSum) ,callSql(sqlDelGenDataSum) ]);
  }()
  .then(r=>
    res.status(200).json(r)
  ).catch(e=>
    console.log('111111111111111'+e+'final')
  );
  */
 
  try {
    Promise.all([callSql(sqlDelHdr),callSql(sqlDelDtl), callSql(sqlDelMissAuditEdit) , callSql(sqlDelMissSum) , callSql(sqlDelMissEdit) , callSql(sqlDelEditSum) ,callSql(sqlDelGenDataSum) ])
    .then(r=>res.status(200).json(r)) ;  
  } catch (error) {
    res.status(500).json(error.message);
  }
  


/*
 try {
   const result = await  global.poolPromise.then(
     function(r,e){
        return r.request().query('select 1');
     }
   );      
   const result2 = await  global.poolPromise.then(r=>r.request().query('select 1'));      
   console.log(result.recordsets); 
 } catch (error) {
    console.log(error);
 }
 */
 

});

async function useAsync() { throw "error"; }
 
async function callSql(sql ,coninfo=global._db_kr_ajis){
    mssqlCon = await mssql.connect(coninfo);
    const result =  await mssqlCon.query(sql);
    return result; 
}



 
async function callSql3(sql ,coninfo=global._db_kr_ajis){
  let mssqlCon ;
  try {
     mssqlCon = await mssql.connect(coninfo);
    const result =  await mssqlCon.query(sql);
    return result; 
  } catch (error) {
    
  }finally{
    mssqlCon.realise();
  }
   
}


function callSql_back(sql ,coninfo=global._db_kr_ajis){
  return new Promise(function(resolve, reject) {
        mssql.connect(coninfo).then(function(err) {
        new mssql.Request().query(sql ).then(function(recordset,err) {
              if(err){
                  reject(err)
              }
              //console.log(recordset);
              resolve( recordset );
            }).catch(function(err) {			
              reject(err);						
            });
          }).catch(function(err) {			
            reject(err);						
      });
  });
}
 


//3. cf) 병렬처리
function getRandomNumber() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const randomValue = Math.random();
      const error = randomValue > .8 ? true : false;
      //console.log(error);

      if (error) {
        resolve(error);
        //reject(new Error('Ooops, something broke!'));
      } else {
        resolve(randomValue);
      }
    }, 2000);
  }); 
}
 
async function logNumbers() {
  let promises = [];
  let values;
 
  promises[0] = getRandomNumber();
  promises[1] = getRandomNumber();
  promises[2] = getRandomNumber();
 
  try {
    values = await Promise.all(promises);
    console.log(values);
  } catch (err) {
    console.log(err);
  }
}
 
logNumbers();

module.exports = router;



