#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function log(msg) {
  // keep output concise
  console.log(`[deploy] ${msg}`);
}

function readPackageJson() {
  try {
    const pkgPath = path.join(__dirname, '..', 'package.json');
    return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  } catch (e) {
    return {};
  }
}

function extractDomainFromHomepage(homepage) {
  try {
    if (!homepage) return null;
    const url = new URL(homepage);
    // ignore default github.io pattern; only use if custom domain
    if (/github\.io$/i.test(url.hostname)) return null;
    return url.hostname;
  } catch {
    return null;
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function isValidDomain(d) {
  // very light validation: "sub.domain.tld" like patterns
  return typeof d === 'string' && /^[a-z0-9.-]+$/i.test(d) && d.includes('.');
}

(function main() {
  const pkg = readPackageJson();
  const envDomain = process.env.CUSTOM_DOMAIN;
  const pkgDomain = pkg.customDomain || (pkg.config && pkg.config.customDomain);
  const homepageDomain = extractDomainFromHomepage(pkg.homepage);

  const domain = envDomain || pkgDomain || homepageDomain;

  if (!domain) {
    log('No custom domain provided. Skipping CNAME creation.');
    log('Provide via env CUSTOM_DOMAIN, package.json customDomain, or non-github.io homepage.');
    process.exit(0);
  }

  if (!isValidDomain(domain)) {
    log(`Invalid domain '${domain}'. Skipping CNAME.`);
    process.exit(0);
  }

  const distDir = path.join(__dirname, '..', 'dist');
  ensureDir(distDir);
  const cnamePath = path.join(distDir, 'CNAME');
  try {
    fs.writeFileSync(cnamePath, domain.trim() + '\n', 'utf8');
    log(`CNAME written with domain: ${domain}`);
  } catch (e) {
    log(`Failed to write CNAME: ${e.message}`);
    process.exit(1);
  }
})();
