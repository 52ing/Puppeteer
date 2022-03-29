//xpath 를 활용한 자동화.

const puppeteer = require('puppeteer');
//console.log(puppeteer.executablePath());
const chalk = require('chalk');
const excel = require('exceljs');

var page;
var dialog;


function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
// 딜레이 타임 선언

function log(text) {
  console.log(chalk.yellow(text));
}

  async function getByXpath(xpath) {
    return (await page.$x(xpath))[0];
  }

    async function click(xpath) {
      return (await getByXpath(xpath)).click()
    }

      async function dblclick(xpath) {
        return (await getByXpath(xpath)).click({clickCount: 2})
      }

        async function type(xpath, text) {
          return (await getByXpath(xpath)).type(text);
        }

(async () => {
  var rows = [];
  // 아래 excel rows 선언
  // for (var i = 0; i < 1000; i++)  
  //   console.log(i); 
  // for 문 
  const browser = await puppeteer.launch({
    headless: false, 
    defaultViewport : { width : 1920, height: 1080 },
  });

  page = await browser.newPage();
  await page.goto('https://uat-admin.wirebarley.com/login');
  await page.screenshot({path: '1.jpg'});

  page.on('dialog', async d => {
    dialog = d;
    await delay(2000);
    await dialog.dismiss()
  });

  log('test_1 \ 로그인 화면 진입')
  await delay(1000)
  // var checkResult = await page.evaluate('');
  // 원래 스크립트
  var checkResult = await page.evaluate( () => {
    return true;
});
// var checkResult = await page.waitForResponse( response => {
//   return response
// }) 
// response 값을 기다렸다가 그 값을 리턴 받음
// log(checkResult.status() === 200 ? true : false); 
// 리턴받은 상태가 200 이면 true 아니면 false
  log(checkResult)
  rows.push(['1','로그인 화면', checkResult])
  await delay(1000)


  // await click('//*[@id="tbLogin"]/div/div[2]/div[2]/div[2]/label');
  // await page.screenshot({path: '2.jpg'});
  // log('test_2 \ 에디터선택');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['2','에디터선택', checkResult])
  // await delay(1000)

  await type('//*[@id="adminEmail"]', 'id');
  await page.screenshot({path: '2.jpg'});
  log('test_2 \ 계정입력');
  await delay(1000)
   var checkResult = await page.evaluate('');
  // var checkResult = await page.waitForResponse( response => {
  //   return response
  // }) 
  // // response 값을 기다렸다가 그 값을 리턴 받음
  // log(checkResult.status() === 200 ? true : false); 
  // // 리턴받은 상태가 200 이면 true 아니면 false
  log(checkResult)
  rows.push(['2','계정입력', checkResult])
  await delay(1000)

  await type('/html/body/div[1]/div/div[2]/div[1]/form/div[1]/div[2]/div/input', 'pwd');
  await page.screenshot({path: '3.jpg'});
  log('test_3 \ 비번입력');
  await delay(1000)
  var checkResult = await page.evaluate('');
  // var checkResult = await page.waitForResponse( response => {
  //   return response
  // }) 
  // // response 값을 기다렸다가 그 값을 리턴 받음
  // log(checkResult.status() === 200 ? true : false); 
  // // 리턴받은 상태가 200 이면 true 아니면 false
  log(checkResult)
  rows.push(['3','비번입력', checkResult])
  await delay(1000)

  await type('/html/body/div[1]/div/div[2]/div[1]/form/div[2]/div[1]/div/input', '201608');
  await page.screenshot({path: '4.jpg'});
  log('test_4 \ 검증코드입력');
  await delay(1000)
  var checkResult = await page.evaluate('');
  // var checkResult = await page.waitForResponse( response => {
  //   return response
  // }) 
  // // response 값을 기다렸다가 그 값을 리턴 받음
  // log(checkResult.status() === 200 ? true : false); 
  // // 리턴받은 상태가 200 이면 true 아니면 false
  log(checkResult)
  rows.push(['4','검증코드입력', checkResult])
  await delay(1000)

  await click('/html/body/div[1]/div/div[2]/div[1]/form/div[2]/div[2]/div/button');
  log('test_5 \ 사이트 정상 이동');
  await delay(1000)
  // var checkResult = await page.evaluate('');
  // var checkResult = await page.waitForResponse( response => {
  //   return response
  // }) 
  // // response 값을 기다렸다가 그 값을 리턴 받음
  // log(checkResult.status() === 200 ? true : false); 
  // // 리턴받은 상태가 200 이면 true 아니면 false
  // log(checkResult)
  // rows.push(['5','로그인', checkResult])
  var checkResult = await page.waitForResponse( response => {
    return response
  }) 
  var res = checkResult.status() === 200 ? true : false;  

  // var res = checkResult.status() === 200 || checkResult.status() === 302 ? true : false;
 // 리스폰스 값이 320 일 경우 추가.
  log(res)
rows.push(['5','로그인', res ])

  
  await delay(16000)

//   await dblclick('//*[@id="FPS"]/div')
//     log ('test_6 \ FPS 더블클릭')
//     await delay(5000)
//     var checkResult = await page.evaluate('');
//     log(checkResult)
//     rows.push(['6','FPS 더블클릭', checkResult])
//     await delay(1000)

//   await click('//*[@id="app-main"]/section/header/div/div[1]/div[2]/button[2]');
//   log('test_7 \ Viewer 선택');
//   await delay(1000)
//   var checkResult = await page.evaluate('');
//   log(checkResult)
//   rows.push(['7','Viewer', checkResult])
//   await delay(1000)
  
// })()

  // await click('//*[@id="12e392cd-e35b-4ff6-bb09-0104295a5436"]/div/div[1]');
  // log('test_7 \ 전체보기 선택 Standby');
  // await delay(1000)
  // var checkResult = await page.evaluate('wemb.mainPageComponent.$threeLayer.get("CCTV_1").appendElement.children[1].children.length > 1');
  // log(checkResult)
  // rows.push(['7','전체보기 선택 Standby', checkResult])
  // await delay(1000)
  
  // await click('//*[@id="12e392cd-e35b-4ff6-bb09-0104295a5436"]/div/div[2]');
  // log('test_8 \ 항온항습기 선택 active');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['8','항온항습기 선택 active', checkResult])
  // await delay(1000)
  
  // await click('//*[@id="12e392cd-e35b-4ff6-bb09-0104295a5436"]/div/div[2]');
  // log('test_9 \ 항온항습기 선택 Standby');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['9','항온항습기 선택 Standby', checkResult])
  // await delay(1000)

  // await click('//*[@id="12e392cd-e35b-4ff6-bb09-0104295a5436"]/div/div[3]');
  // log('test_10 \ CCTV 선택 active');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['10','CCTV 선택 active', checkResult])
  // await delay(1000)
  
  // await click('//*[@id="12e392cd-e35b-4ff6-bb09-0104295a5436"]/div/div[3]');
  // log('test_11 \ CCTV 선택 Standby');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['11','CCTV 선택 Standby', checkResult])
  // await delay(1000)

  // await click('//*[@id="12e392cd-e35b-4ff6-bb09-0104295a5436"]/div/div[4]');
  // log('test_12 \ 소방 active');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['12','소방 active', checkResult])
  // await delay(1000)
  
  // await click('//*[@id="12e392cd-e35b-4ff6-bb09-0104295a5436"]/div/div[4]');
  // log('test_13 \ 소방 선택 Standby');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['13','소방 선택 Standby', checkResult])
  // await delay(1000)

  // await click('//*[@id="12e392cd-e35b-4ff6-bb09-0104295a5436"]/div/div[1]');
  // log('test_14 \ 전체보기 선택 active');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['14','전체보기 선택 active', checkResult])
  // await delay(1000)

  // await click('//*[@id="12e392cd-e35b-4ff6-bb09-0104295a5436"]/div/div[3]');
  // log('test_15 \ CCTV 선택 active');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['15','CCTV 선택 active', checkResult])
  // await delay(1000)

  // // await click('//*[@id="12e392cd-e35b-4ff6-bb09-0104295a5436"]/div/div[4]');
  // // log('test_16 \ 출입 선택 active');
  // // await delay(1000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['16','출입 선택 active', checkResult])
  // // await delay(1000)

  // // await click('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[1]/span/div/i')
  // // log ('test_17 \ testTemp 상단 콤보박스 선택')
  // // await delay(3000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['17','testTemp 상위메뉴 선택', checkResult])
  // // await delay(1000)
  // //                   await dblclick('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[1]/ul/li/span/label')
  // //                   log ('test_18 \ testTemp 포커싱')
  // //                   await delay(3000)
  // //                   var checkResult = await page.evaluate('');
  // //                   log(checkResult)
  // //                   rows.push(['18','testTemp 포커싱', checkResult])
  // //                   await delay(1000)

  // // await click('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[3]/span/div')
  // // log ('test_19 \ Fire 상위메뉴선택')
  // // await delay(3000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['19','Fire 상위메뉴 선택', checkResult])
  // // await delay(1000)
  // //                   await dblclick('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[3]/ul/li[1]/span/label')
  // //                   log ('test_20 \ Fire 123 포커싱 (이전 포커싱 해제후 이동)')
  // //                   await delay(3000)
  // //                   var checkResult = await page.evaluate('');
  // //                   log(checkResult)
  // //                   rows.push(['20','Fire 123 포커싱 (이전 포커싱 해제후 이동)', checkResult])
  // //                   await delay(1000)

  // // await click('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[4]/span/div')
  // // log ('test_21 \ Access 선택')
  // // await delay(3000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['21',' Access 상위메뉴 선택', checkResult])
  // // await delay(1000)
  // //                   await dblclick('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[4]/ul/li/span/label')
  // //                   log ('test_22 \ 3333 포커싱 (이전 포커싱 해제후 이동)')
  // //                   await delay(3000)
  // //                   var checkResult = await page.evaluate('');
  // //                   log(checkResult)
  // //                   rows.push(['22','3333 포커싱 (이전 포커싱 해제후 이동)', checkResult])
  // //                   await delay(1000)

  // // await click('//*[@id="0e7aa007-ff1c-428e-8736-8ac317d458cd"]/div/div[1]/div[1]/div[3]/div')
  // // log ('test_23 \ 이벤트 현황 페이지 숨김')
  // // await delay(3000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['23','이벤트 현황 페이지 숨김', checkResult])
  // // await delay(1000)

  // // await click('//*[@id="0e7aa007-ff1c-428e-8736-8ac317d458cd"]/div/div[1]/div[1]/div[3]/div')
  // // log ('test_24 \ 이벤트 현황 페이지 보임')
  // // await delay(3000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['24','이벤트 현황 페이지 보임', checkResult])
  // // await delay(1000)

  // // await click('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[2]')
  // // log ('test_25 \ 자산리스트 숨김')
  // // await delay(3000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['25','자산리스트 숨김', checkResult])
  // // await delay(1000)

  // // await click('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[2]')
  // // log ('test_26 \ 자산리스트 보임')
  // // await delay(3000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['26','자산리스트 보임', checkResult])
  // // await delay(1000)

  // // await click('//*[@id="6c3d8f1f-05ee-4dd9-9297-245db7ae7a1d"]/ul/li[2]/a/img[1]')
  // // log ('test_27 \ 종합현황 대쉬보드 불러오기')
  // // await delay(2000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['27','종합현황 대쉬보드 불러오기', checkResult])
  // // await delay(5000)

  // // await click('/html/body/div[1]/div/div[4]/div[2]/div[5]/div[2]/div[1]/a')
  // // log ('test_28 \ 닫기')
  // // await delay(1000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['28','닫기', checkResult])
  // // await delay(1000)

  // // await click('//*[@id="12e392cd-e35b-4ff6-bb09-0104295a5436"]/div/div[4]');
  // // log('test_29 \ 소방 active');
  // // await delay(1000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['29','소방 active', checkResult])
  // // await delay(1000)

  // // await click('//*[@id="6c3d8f1f-05ee-4dd9-9297-245db7ae7a1d"]/ul/li[3]/a/img[1]')
  // // log ('test_30 \ 기본위치 선택')
  // // await delay(1000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['30','기본위치 선택', checkResult])
  // // await delay(1000)

  // await click('//*[@id="app-main"]/div/div[3]/div/div/button[3]')
  // log ('test_31 \ 로그아웃')
  // await delay(3000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['31','로그아웃', checkResult])
  // await delay(1000)

  // await click('//*[@id="tbLogin"]/div/div[2]/div[2]/div[1]/label');
  // await page.screenshot({path: '32.jpg'});
  // log('test_32 \ 뷰어선택');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['32','뷰어선택', checkResult])
  // await delay(1000)

  // await type('//*[@id="idInput"]', 'admin');
  // log('test_33 \ 계정입력');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['33','계정입력', checkResult])
  // await delay(1000)

  // await type('//*[@id="pwInput"]', 'admin');
  // log('test_34 \ 비번입력');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['34','비번입력', checkResult])
  // await delay(1000)

  // await click('//*[@id="tbLogin"]/div/div[2]/div[4]');
  // log('test_35 \ 사이트 정상 이동');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['35','사이트 정상 이동', checkResult])
  // await delay(10000)

  // // await click('//*[@id="app-main"]/div/div[3]/div/div/button[1]');
  // // log('test_36 \ Walk View');
  // // await delay(1000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['36','Walk View 선택', checkResult])
  // // await delay(10000)

  // // await click('//*[@id="app-main"]/div/div[3]/div/div/button[1]');
  // // log('test_37 \ 360도뷰');
  // // await delay(1000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['37','360도뷰', checkResult])
  // // await delay(10000)

  // // await click('//*[@id="app-main"]/div/div[3]/div/div/button[2]');
  // // log('test_38 \ admin 이동');
  // // await delay(1000)
  // // var checkResult = await page.evaluate('');
  // // log(checkResult)
  // // rows.push(['38','admin 선택', checkResult])
  // // await delay(3000)

  // // page = (await browser.pages())[2];

  // page.on('dialog', async d => {
  //   dialog = d;
  //   await delay(2000);
  //   console.log(d);
  //   await dialog.dismiss()
  // });
  
  // await click('//*[@id="app"]/div/div[2]/div[1]/span[1]');
  // log('test_39 \ viewer 이동');
  // await delay(1000)
  // var checkResult = await page.evaluate('');
  // log(checkResult)
  // rows.push(['39','Viewer', checkResult])
  // await delay(6000)

//   await click('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[2]/span/div')
//   log ('test_40 \ CCTV 하위 선택')
//   await delay(1000)
//   var checkResult = await page.evaluate('');
//   log(checkResult)
//   rows.push(['40','CCTV 하위 선택', checkResult])
//   await delay(1000)

//   // await dblclick('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[2]/ul/li[1]/span/label')
//   // log ('test_41 \ CCTV 선택')
//   // await delay(3000)
//   // var checkResult = await page.evaluate('');
//   // log(checkResult)
//   // rows.push(['41','CCTV 선택', checkResult])
//   // await delay(1000)
//   // console.log(dialog.message());
//   // 크롬 자체에 팝업이 아니라서 일단 보류

//   // await click('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[3]/span/div')
//   // log ('test_42 \ Fire 하위메뉴선택')
//   // await delay(2000)
//   // var checkResult = await page.evaluate('');
//   // log(checkResult)
//   // rows.push(['42','Fire 하위메뉴선택', checkResult])

//   // await dblclick('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[3]/ul/li[1]/span/label')
//   // log ('test_43 \ Fire 123 포커싱 (이전 포커싱 해제후 이동)')
//   // await delay(2000)
//   // var checkResult = await page.evaluate('');
//   // log(checkResult)
//   // rows.push(['43','Fire 123 포커싱 (이전 포커싱 해제후 이동)', checkResult])
//   // await delay(1000)

//   // await click('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[2]/span/div')
//   // log ('test_44 \ CCTV 하위 선택')
//   // await delay(1000)
//   // var checkResult = await page.evaluate('');
//   // log(checkResult)
//   // rows.push(['44','CCTV 하위 선택', checkResult])
//   // await delay(1000)

//   // await click('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[2]/span/div')
//   // log ('test_45 \ CCTV 하위 선택')
//   // await delay(1000)
//   // var checkResult = await page.evaluate('');
//   // log(checkResult)
//   // rows.push(['45','CCTV 하위 선택', checkResult])
//   // await delay(1000)

//   // await dblclick('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[2]/ul/li[1]/span/label')
//   // log ('test_46 \ CCTV 선택')
//   // await delay(3000)
//   // var checkResult = await page.evaluate('');
//   // log(checkResult)
//   // rows.push(['46','CCTV 선택', checkResult])
//   // await delay(1000)
//   // console.log(dialog.message());

//   // await click('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[1]/span/div/i')
//   // log ('test_47 \ testTemp 상단 콤보박스 선택')
//   // await delay(3000)
//   // var checkResult = await page.evaluate('');
//   // log(checkResult)
//   // rows.push(['47','testTemp 상단 콤보박스 선택', checkResult])
//   // await delay(1000)

//   // await dblclick('//*[@id="8a5ee369-50eb-4329-9492-314806ed85b4"]/div/div[1]/div[2]/div/ul/li[1]/ul/li/span/label')
//   // log ('test_48 \ testTemp 포커싱')
//   // await delay(3000)
//   // var checkResult = await page.evaluate('');
//   // log(checkResult)
//   // rows.push(['48','testTemp 포커싱', checkResult])
//   // await delay(1000)



// //  } 위의 for문 닫기.

  const workbook = new excel.Workbook();
  const sheet = workbook.addWorksheet('테스트 결과');
  sheet.addTable({
  name: '테스트 결과',
  ref: 'A1',
  columns: [{name: 'Number'},{name: 'Case'}, {name: 'Result'}],
  rows: rows
});

  await workbook.xlsx.writeFile('시나리오테스트.xlsx');
  // 테스트 결과 excel Ouput 내보냄
  log('Result Output');

  await browser.close();

//   var check = false;
// if (checkResult == 'true'){
// check = true;
// }
})()




// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // page.on('dialog', async d => {
// //   dialog = d;
// //   await delay(1000);
// //   await dialog.dismiss()
// // });
// // 크롬에서 제공하는 Popup창 무조건 닫기.

// // console.log(dialog.message());
// // Popup 창에 대한 메세지 내용.

// // await page.goto('http://192.168.10.161:10277/renobit/manager.do#/');
// // await delay(1000)
// // 기존 page 가 아닌 다른 page 로 이동.

// // var rows = [];

// // var checkResult = await page.evaluate('');
// // log(checkResult)
// // rows.push(['45','Fire 123 포커싱 (이전 포커싱 해제후 이동)', checkResult])

// // const workbook = new excel.Workbook();
// // const sheet = workbook.addWorksheet('테스트 결과');
// // sheet.addTable({
// //   name: '테스트 결과',
// //   ref: 'A1',
// //   columns: [{name: 'Number'},{name: 'Case'}, {name: 'Result'}],
// //   rows: rows
// // });

// // await workbook.xlsx.writeFile('시나리오테스트.xlsx');
// //excel 로 내보내기.

// await browser.close();
// 브라우저 닫기.

// var check = false;
// if (checkResult == 'true'){
// check = true;
// }
//   true일때