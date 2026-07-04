/* eslint-env node */
const fs = require('fs');

const content = fs.readFileSync('blogPosts.ts', 'utf8');

// Simple string replacements - handle different quote styles
let updated = content;

// Already done
// updated = updated.replace(/title: "India's #1 Privacy-First Developer Toolkit — The 2026 Blueprint for Data Sovereignty"/g, 
//   'title: "India\'s #1 Privacy-First Developer Toolkit — The 2026 Blueprint for Data Sovereignty by Nitin Gurbani"');

updated = updated.replace(/title: 'Generate UUIDs Without Internet Connection: The 2026 Masterclass'/g, 
  "title: 'Generate UUIDs Without Internet Connection: The 2026 Masterclass by Prateek Sabharwal'");
updated = updated.replace(/title: 'Generate QR Codes Without Tracking Pixels: The Privacy-First Guide'/g, 
  "title: 'Generate QR Codes Without Tracking Pixels: The Privacy-First Guide by Nitin Gurbani'");
updated = updated.replace(/title: 'Test Regex Patterns — No More Random Websites'/g, 
  "title: 'Test Regex Patterns — No More Random Websites by Prateek Sabharwal'");
updated = updated.replace(/title: 'NEW: 100\+ Developer Tools — All Free, All Private'/g, 
  "title: '100+ Developer Tools — All Free, All Private by Nitin Gurbani'");
updated = updated.replace(/title: 'Encode\/Decode Base64 — Files Never Leave Your Browser'/g, 
  "title: 'Encode\\/Decode Base64 — Files Never Leave Your Browser by Prateek Sabharwal'");
updated = updated.replace(/title: 'Format SQL Queries Without Cloud Uploads'/g, 
  "title: 'Format SQL Queries Without Cloud Uploads by Nitin Gurbani'");
updated = updated.replace(/title: 'Decode JWT Tokens Without Server Exposure'/g, 
  "title: 'Decode JWT Tokens Without Server Exposure by Prateek Sabharwal'");
updated = updated.replace(/title: 'Convert JSON to YAML in 1 Second — No Upload'/g, 
  "title: 'Convert JSON to YAML in 1 Second — No Upload by Nitin Gurbani'");
updated = updated.replace(/title: "Need Developer Tools That Don't Spy On You\?"/g, 
  'title: "Need Developer Tools That Don\'t Spy On You? by Prateek Sabharwal"');

fs.writeFileSync('blogPosts.ts', updated);
console.log("All 10 titles updated with authors!");
