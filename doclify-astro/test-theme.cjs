const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:4322';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots-theme-tests');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function testThemeSystem() {
  console.log('Test du systeme de theme\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1200 });
  
  try {
    console.log('TEST 1: Mode sombre par defaut');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForSelector('.theme-toggle', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 1000));
    
    const bgColorDark = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    
    const themeAttrInitial = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    
    const darkIconVisible = await page.evaluate(() => {
      const darkIcon = document.querySelector('.theme-icon-dark');
      const style = window.getComputedStyle(darkIcon);
      return style.display !== 'none';
    });
    
    console.log('  Couleur de fond:', bgColorDark);
    console.log('  Attribut data-theme:', themeAttrInitial || '(vide = dark par defaut)');
    console.log('  Icone lune visible:', darkIconVisible);
    
    const screenshot1 = path.join(SCREENSHOTS_DIR, '1-homepage-dark-mode.png');
    await page.screenshot({ path: screenshot1, fullPage: true });
    console.log('  Screenshot:', screenshot1, '\n');
    
    console.log('TEST 2: Basculer en mode clair');
    await page.click('.theme-toggle');
    await new Promise(r => setTimeout(r, 1000));
    
    const bgColorLight = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    
    const themeAttrLight = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    
    const lightIconVisible = await page.evaluate(() => {
      const lightIcon = document.querySelector('.theme-icon-light');
      const style = window.getComputedStyle(lightIcon);
      return style.display !== 'none';
    });
    
    console.log('  Couleur de fond:', bgColorLight);
    console.log('  Attribut data-theme:', themeAttrLight);
    console.log('  Icone soleil visible:', lightIconVisible);
    
    const screenshot2 = path.join(SCREENSHOTS_DIR, '2-homepage-light-mode.png');
    await page.screenshot({ path: screenshot2, fullPage: true });
    console.log('  Screenshot:', screenshot2, '\n');
    
    console.log('TEST 3: Revenir en mode sombre');
    await page.click('.theme-toggle');
    await new Promise(r => setTimeout(r, 1000));
    
    const bgColorDarkAgain = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    
    const themeAttrDarkAgain = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    
    console.log('  Couleur de fond:', bgColorDarkAgain);
    console.log('  Attribut data-theme:', themeAttrDarkAgain || '(vide = dark)');
    
    const screenshot3 = path.join(SCREENSHOTS_DIR, '3-homepage-back-to-dark.png');
    await page.screenshot({ path: screenshot3, fullPage: true });
    console.log('  Screenshot:', screenshot3, '\n');
    
    console.log('TEST 4: Persistance du theme (localStorage)');
    await page.click('.theme-toggle');
    await new Promise(r => setTimeout(r, 1000));
    
    const localStorageTheme = await page.evaluate(() => {
      return localStorage.getItem('theme');
    });
    
    console.log('  localStorage theme:', localStorageTheme);
    
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForSelector('.theme-toggle', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 1000));
    
    const themeAfterReload = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    
    const bgColorAfterReload = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    
    console.log('  Theme apres reload:', themeAfterReload);
    console.log('  Couleur apres reload:', bgColorAfterReload);
    
    const screenshot4 = path.join(SCREENSHOTS_DIR, '4-persistence-after-reload.png');
    await page.screenshot({ path: screenshot4, fullPage: true });
    console.log('  Screenshot:', screenshot4, '\n');
    
    console.log('TEST 5: Verifier le theme sur /contact');
    await page.goto(BASE_URL + '/contact', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForSelector('.theme-toggle', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 1000));
    
    const themeOnContactPage = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    
    const bgColorOnContactPage = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    
    console.log('  Theme sur /contact:', themeOnContactPage);
    console.log('  Couleur sur /contact:', bgColorOnContactPage);
    
    const screenshot5 = path.join(SCREENSHOTS_DIR, '5-contact-page-light-mode.png');
    await page.screenshot({ path: screenshot5, fullPage: true });
    console.log('  Screenshot:', screenshot5, '\n');
    
    console.log('=======================================');
    console.log('RESUME DES TESTS');
    console.log('=======================================');
    
    const darkBgExpected = 'rgb(10, 10, 10)';
    const lightBgExpected = 'rgb(248, 249, 250)';
    
    const test1Pass = bgColorDark === darkBgExpected && darkIconVisible;
    const test2Pass = bgColorLight === lightBgExpected && themeAttrLight === 'light' && lightIconVisible;
    const test3Pass = bgColorDarkAgain === darkBgExpected;
    const test4Pass = localStorageTheme === 'light' && themeAfterReload === 'light' && bgColorAfterReload === lightBgExpected;
    const test5Pass = themeOnContactPage === 'light' && bgColorOnContactPage === lightBgExpected;
    
    console.log('TEST 1 (Mode sombre defaut):', test1Pass ? 'PASS' : 'FAIL');
    console.log('TEST 2 (Basculer mode clair):', test2Pass ? 'PASS' : 'FAIL');
    console.log('TEST 3 (Revenir mode sombre):', test3Pass ? 'PASS' : 'FAIL');
    console.log('TEST 4 (Persistance localStorage):', test4Pass ? 'PASS' : 'FAIL');
    console.log('TEST 5 (Theme sur /contact):', test5Pass ? 'PASS' : 'FAIL');
    
    const allPass = test1Pass && test2Pass && test3Pass && test4Pass && test5Pass;
    
    console.log('\n=======================================');
    if (allPass) {
      console.log('RESULTAT: TOUS LES TESTS SONT PASSES');
    } else {
      console.log('RESULTAT: CERTAINS TESTS ONT ECHOUE');
    }
    console.log('=======================================');
    
    console.log('\nScreenshots dans:', SCREENSHOTS_DIR);
    
    return allPass;
    
  } catch (error) {
    console.error('ERREUR:', error.message);
    
    const errorScreenshot = path.join(SCREENSHOTS_DIR, 'ERROR-screenshot.png');
    await page.screenshot({ path: errorScreenshot, fullPage: true });
    console.log('Screenshot erreur:', errorScreenshot);
    
    throw error;
  } finally {
    await browser.close();
  }
}

testThemeSystem()
  .then((success) => {
    console.log('\nScript termine');
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Script echoue:', error.message);
    process.exit(1);
  });
