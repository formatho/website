#!/usr/bin/env node
/* eslint-env node */

/**
 * QA Deployment Verification Script
 * Verifies that qa.formatho.com is accessible after deployment
 */

import https from 'https';
import { URL } from 'url';

const QA_URL = 'https://qa.formatho.com';
const TIMEOUT_MS = 5000;

function verifyDeployment(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const urlObj = new URL(url);

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.path,
      method: 'GET',
      timeout: TIMEOUT_MS,
      headers: {
        'User-Agent': 'OpenClaw-QA-Agent/1.0'
      }
    };

    const req = https.request(options, (res) => {
      const responseTime = Date.now() - startTime;

      if (res.statusCode === 200) {
        resolve({
          success: true,
          url: url,
          statusCode: res.statusCode,
          responseTime: responseTime,
          timestamp: new Date().toISOString(),
          errors: []
        });
      } else {
        resolve({
          success: false,
          url: url,
          statusCode: res.statusCode,
          responseTime: responseTime,
          timestamp: new Date().toISOString(),
          errors: [`HTTP ${res.statusCode}`]
        });
      }
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        url: url,
        statusCode: null,
        responseTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        errors: [error.message]
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        success: false,
        url: url,
        statusCode: null,
        responseTime: TIMEOUT_MS,
        timestamp: new Date().toISOString(),
        errors: ['Request timeout']
      });
    });

    req.end();
  });
}

async function main() {
  console.log(`🌐 Verifying deployment to ${QA_URL}...`);

  try {
    const result = await verifyDeployment(QA_URL);

    if (result.success) {
      console.log(`✅ Deployment verified`);
      console.log(`🌐 ${QA_URL} - responding (${result.statusCode})`);
      console.log(`⏱️  Response time: ${result.responseTime}ms`);
      console.log(`📅 Timestamp: ${result.timestamp}`);
      process.exit(0);
    } else {
      console.error(`❌ Deployment verification failed`);
      console.error(`🌐 ${QA_URL}`);
      console.error(`📋 Status: ${result.statusCode || 'Connection failed'}`);
      console.error(`⏱️  Response time: ${result.responseTime}ms`);
      console.error(`📋 Errors:`, result.errors);
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Verification error:`, error.message);
    process.exit(1);
  }
}

main();
