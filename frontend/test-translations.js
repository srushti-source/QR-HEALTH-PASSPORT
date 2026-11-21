// Automated verification for Phase 2 translations & localization completeness
import { translations } from './src/i18n/translations.js';

console.log("--- Starting Phase 2 Frontend Localization Tests ---\n");

let passed = 0;
let failed = 0;

function assert(cond, name) {
  if (cond) {
    console.log(`[PASS] ${name}`);
    passed++;
  } else {
    console.error(`[FAIL] ${name}`);
    failed++;
  }
}

const enKeys = Object.keys(translations.en);
const knKeys = Object.keys(translations.kn);

assert(enKeys.length > 30, `Total translation keys in English: ${enKeys.length}`);
assert(knKeys.length > 30, `Total translation keys in Kannada: ${knKeys.length}`);

// Check 1:1 mapping between English and Kannada
let missingInKn = [];
for (const key of enKeys) {
  if (!translations.kn[key] || translations.kn[key].trim() === '') {
    missingInKn.push(key);
  }
}

assert(missingInKn.length === 0, `All English keys have complete Kannada translations (Missing: ${missingInKn.join(', ') || 'None'})`);

// Check mandatory HealthTech disclaimers in both languages
assert(translations.en.safetyDisclaimer.includes('NOT provide AI diagnosis'), 'Safety disclaimer present in English (No AI diagnosis)');
assert(translations.kn.safetyDisclaimer.includes('ರೋಗನಿರ್ಣಯ'), 'Safety disclaimer present in Kannada (ರೋಗನಿರ್ಣಯ)');

// Check role translations
assert(translations.kn.patient === 'ರೋಗಿ', 'Patient translated to ರೋಗಿ');
assert(translations.kn.doctor === 'ವೈದ್ಯರು', 'Doctor translated to ವೈದ್ಯರು');

console.log(`\n--- Verification Summary: ${passed} PASSED, ${failed} FAILED ---`);
if (failed === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
