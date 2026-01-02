import http from 'http';
import fs from 'fs';

const baseUrl = 'http://localhost:4321';
const testResults = [];

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/fonctionnalites', name: 'Fonctionnalités' },
  { path: '/tarifs', name: 'Tarifs' },
  { path: '/contact', name: 'Contact' },
  { path: '/a-propos', name: 'À propos' },
  { path: '/demo', name: 'Demo' },
  { path: '/blog', name: 'Blog listing' },
  { path: '/blog/guide-productivite-medicale', name: 'Blog article 1' },
  { path: '/blog/transcription-medicale-gratuite', name: 'Blog article 2' },
  { path: '/blog/retranscription-medicale-gratuite', name: 'Blog article 3' },
  { path: '/blog/logiciel-transcription-medicale', name: 'Blog article 4' },
  { path: '/blog/application-retranscription-audio', name: 'Blog article 5' },
  { path: '/blog/retranscription-consultation-medicale', name: 'Blog article 6' },
  { path: '/landing/alternative-dragon', name: 'Landing: Alternative Dragon' },
  { path: '/landing/transcription-medicale-gratuite', name: 'Landing: Transcription gratuite' },
  { path: '/legal/mentions-legales', name: 'Legal: Mentions légales' },
  { path: '/legal/politique-confidentialite', name: 'Legal: Politique confidentialité' },
  { path: '/legal/cgu', name: 'Legal: CGU' },
];

function testPage(path, name) {
  return new Promise((resolve) => {
    const url = baseUrl + path;
    const startTime = Date.now();
    
    http.get(url, (res) => {
      const duration = Date.now() - startTime;
      let body = '';
      
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        const result = {
          name: name,
          path: path,
          status: res.statusCode,
          duration: duration,
          contentLength: body.length,
          hasContent: body.length > 0,
          success: res.statusCode === 200 && body.length > 0
        };
        
        if (body.length > 0) {
          result.checks = {
            hasDoctype: body.includes('<!DOCTYPE html>') || body.includes('<!doctype html>'),
            hasTitle: body.includes('<title>'),
            hasHeader: body.includes('<header') || body.includes('header'),
            hasFooter: body.includes('<footer') || body.includes('footer'),
            hasNav: body.includes('<nav') || body.includes('navigation'),
          };
        }
        
        testResults.push(result);
        const check = result.success ? '✓' : '✗';
        console.log(check + ' ' + name + ' (' + path + '): ' + res.statusCode + ' - ' + duration + 'ms - ' + body.length + ' bytes');
        resolve(result);
      });
    }).on('error', (err) => {
      const result = {
        name: name,
        path: path,
        status: 'ERROR',
        error: err.message,
        success: false
      };
      testResults.push(result);
      console.log('✗ ' + name + ' (' + path + '): ERROR - ' + err.message);
      resolve(result);
    });
  });
}

async function runTests() {
  console.log('Starting HTTP tests for Astro website...');
  console.log('');
  
  for (const page of pages) {
    await testPage(page.path, page.name);
  }
  
  console.log('');
  console.log('=== TEST SUMMARY ===');
  const passed = testResults.filter(r => r.success).length;
  const failed = testResults.filter(r => !r.success).length;
  console.log('Total: ' + testResults.length);
  console.log('Passed: ' + passed);
  console.log('Failed: ' + failed);
  
  if (failed > 0) {
    console.log('');
    console.log('Failed pages:');
    testResults.filter(r => !r.success).forEach(r => {
      const errorMsg = r.error ? r.error : '';
      console.log('  - ' + r.name + ' (' + r.path + '): ' + r.status + ' ' + errorMsg);
    });
  }
  
  fs.writeFileSync('/home/user/doclify.cloud/doclify-astro/test-results.json', 
    JSON.stringify(testResults, null, 2));
  console.log('');
  console.log('Detailed results saved to test-results.json');
}

runTests().catch(console.error);
