import http from 'http';

const baseUrl = 'http://localhost:4321';
const testResults = [];

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/fonctionnalites', name: 'Fonctionnalités' },
  { path: '/tarifs', name: 'Tarifs' },
  { path: '/contact', name: 'Contact' },
  { path: '/a-propos', name: 'À propos' },
  { path: '/application', name: 'Application' },
  { path: '/materiel', name: 'Matériel' },
  { path: '/cgv', name: 'CGV' },
  { path: '/confidentialite', name: 'Confidentialité' },
  { path: '/blog', name: 'Blog listing' },
  { path: '/blog/alternative-dragon-medical', name: 'Blog: Alternative Dragon' },
  { path: '/blog/gain-temps-medecin', name: 'Blog: Gain temps médecin' },
  { path: '/blog/mode-hors-ligne-medical', name: 'Blog: Mode hors ligne' },
  { path: '/blog/souverainete-donnees-sante', name: 'Blog: Souveraineté données' },
  { path: '/blog/transcription-medicale-ia', name: 'Blog: Transcription IA' },
  { path: '/landing/alternative-dragon', name: 'Landing: Alternative Dragon' },
  { path: '/landing/guide-productivite', name: 'Landing: Guide productivité' },
  { path: '/landing/transcription-cardiologue', name: 'Landing: Cardiologue' },
  { path: '/landing/transcription-generaliste', name: 'Landing: Généraliste' },
  { path: '/landing/transcription-psychologue', name: 'Landing: Psychologue' },
  { path: '/landing/webinaire-productivite', name: 'Landing: Webinaire' },
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
          success: res.statusCode === 200 && body.length > 0
        };
        
        testResults.push(result);
        const check = result.success ? '✓' : '✗';
        console.log(check + ' ' + name + ' (' + path + '): ' + res.statusCode + ' - ' + duration + 'ms');
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
  console.log('Testing actual Astro pages...\n');
  
  for (const page of pages) {
    await testPage(page.path, page.name);
  }
  
  console.log('\n=== TEST SUMMARY ===');
  const passed = testResults.filter(r => r.success).length;
  const failed = testResults.filter(r => !r.success).length;
  console.log('Total: ' + testResults.length);
  console.log('Passed: ' + passed);
  console.log('Failed: ' + failed);
  
  if (failed > 0) {
    console.log('\nFailed pages:');
    testResults.filter(r => !r.success).forEach(r => {
      const errorMsg = r.error ? ' - ' + r.error : '';
      console.log('  - ' + r.name + ' (' + r.path + '): ' + r.status + errorMsg);
    });
  }
}

runTests().catch(console.error);
