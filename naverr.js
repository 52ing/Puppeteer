//click event를 활용한 자동화, selector

const puppeteer = require('puppeteer');
//console.log(puppeteer.executablePath());
const chalk = require('chalk');

var page;
var dialog;

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
// 딜레이 타임 선언

function log(text) {
  console.log(chalk.red(text));
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

  const browser = await puppeteer.launch({
    headless: false, 
    defaultViewport : { width : 1920, height: 1080 },
  });

  page = await browser.newPage();
  await page.goto('https://www.naver.com');
  
  page.on('dialog', async d => {
    dialog = d;
    await delay(2000);
    await dialog.dismiss()
  });
  log('1 \ 로그인 화면 진입 성공111111111111111111')
  await delay(1000)


  await page.click("#account > a");	// 클릭이벤트를 실행
  log('2로그인버튼선택!!')
  await delay(1000)


  await page.$eval('#id', el => el.value = 'id_tmp');
  log('3. id 입력!')
  await delay(1000)

  await page.$eval('#pw', el => el.value = 'pw_tmp');
  log('4. pw 입력!')
  await delay(1000)

  await click('//*[@id="log.login"]');
  log('test_5 \ 사이트 정상 이동');
  await delay(1000)

  await browser.close();
})()