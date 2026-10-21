/**
 * Related-tools map — curated pairs (growth spec) with same-category fallback.
 * Privacy: slugs only, derived client-side.
 */
import { tools } from '@/data/tools'

const CURATED: Record<string, string[]> = {
  '/tools/function-selector': ['/tools/keccak256', '/tools/calldata-decode', '/tools/address-checksum'],
  '/tools/keccak256': ['/tools/function-selector', '/tools/calldata-decode', '/tools/hash-text'],
  '/tools/calldata-decode': ['/tools/function-selector', '/tools/keccak256', '/tools/abi-encoder'],
  '/tools/address-checksum': ['/tools/function-selector', '/tools/private-key-to-address', '/tools/evm-converter'],
  '/tools/bpmn-to-visio': ['/tools/visio-viewer', '/tools/bpmn', '/tools/xml-formatter'],
  '/tools/visio-viewer': ['/tools/bpmn-to-visio', '/tools/bpmn', '/tools/markdown-viewer'],
  '/tools/contract-reader': ['/tools/abi-encoder', '/tools/calldata-decode', '/tools/function-selector'],
  '/tools/abi-encoder': ['/tools/contract-reader', '/tools/calldata-decode', '/tools/function-selector'],
  '/tools/csr-decoder': ['/tools/tls-checker', '/tools/certificate-fingerprint', '/tools/key-format-converter'],
  '/tools/invoice-generator': ['/tools/pint-ae', '/tools/gtin-validator', '/tools/iso20022-validator'],
  '/tools/battery-passport-checklist': ['/tools/battery-carbon-footprint', '/tools/espr-timeline', '/tools/dpp-json-validator'],
  '/tools/dpp-json-validator': ['/tools/battery-passport-checklist', '/tools/dpp-playground', '/tools/gs1-digital-link'],
  '/tools/comfyui-workflow-inspector': ['/tools/comfyui-api-converter', '/tools/comfyui-workflow-diff', '/tools/safetensors-reader'],
  '/tools/eliza-character-validator': ['/tools/env-hygiene-checker', '/tools/eliza-plugin-linter', '/tools/llm-json-validator'],
  '/tools/env-hygiene-checker': ['/tools/eliza-character-validator', '/tools/eliza-plugin-linter', '/tools/prompt-injection-tester'],
  '/tools/eliza-plugin-linter': ['/tools/env-hygiene-checker', '/tools/eliza-character-validator', '/tools/llm-token-counter'],
  '/tools/create2-proxy-deployer': ['/tools/create2-calculator', '/tools/contract-reader', '/tools/evm-unit-converter'],
  '/tools/cloudhsm-evm-address': ['/tools/key-format-converter', '/tools/address-checksum', '/tools/rsa-key-pair-generator']
}

interface ToolInfo { name: string; route: string; description: string }

const allByRoute = new Map<string, ToolInfo>()
for (const cat of tools) {
  for (const t of cat.items) {
    allByRoute.set(t.route, { name: t.name, route: t.route, description: t.description })
  }
}

export function relatedFor(route: string): ToolInfo[] {
  const curated = CURATED[route]
  if (curated) {
    const found = curated.map(r => allByRoute.get(r)).filter(Boolean) as ToolInfo[]
    if (found.length) return found.slice(0, 3)
  }
  for (const cat of tools) {
    if (cat.items.some(t => t.route === route)) {
      return cat.items.filter(t => t.route !== route).slice(0, 3).map(t => ({ name: t.name, route: t.route, description: t.description }))
    }
  }
  return []
}
