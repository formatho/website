import AppLayout from '../layouts/AppLayout.vue'
import HomeView from '../views/HomeView.vue'
import { routeMeta } from '../data/routeMeta'
import MarkdownView from '../views/MarkdownView.vue'

export const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: '/tools'
      },
      {
        path: '/tools',
        name: 'home',
        component: HomeView,
        meta: routeMeta['home']
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackPrefetch: true */ '../views/AboutView.vue'),
        meta: routeMeta['about']
      },
      {
        path: '/blogs',
        name: 'blogs',
        component: () => import(/* webpackPrefetch: true */ '../views/BlogsView.vue'),
        meta: routeMeta['blogs']
      },
      // Dynamic blog post route (slug from Strapi)
      {
        path: '/blogs/:slug',
        name: 'blog-post-dynamic',
        component: () => import(/* webpackPrefetch: true */ '../views/BlogPostView.vue'),
        meta: routeMeta['blog-post-dynamic']
      },
      {
        path: '/security',
        name: 'security',
        component: () => import(/* webpackPrefetch: true */ '../views/SecurityView.vue'),
        meta: routeMeta['security']
      },
      {
        path: '/acceptable-use',
        name: 'acceptable-use',
        component: () => import(/* webpackPrefetch: true */ '../views/AcceptableUseView.vue'),
        meta: routeMeta['acceptable-use']
      },
      {
        path: '/privacy',
        name: 'privacy',
        component: () => import(/* webpackPrefetch: true */ '../views/PrivacyPolicyView.vue'),
        meta: routeMeta['privacy']
      },
      {
        path: '/terms',
        name: 'terms',
        component: () => import(/* webpackPrefetch: true */ '../views/TermsOfServiceView.vue'),
        meta: routeMeta['terms']
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import(/* webpackPrefetch: true */ '../views/ContactView.vue'),
        meta: routeMeta['contact']
      },
      {
        path: '/markdown',
        name: 'markdown',
        component: MarkdownView,
        meta: routeMeta['markdown']
      },
      {
        path: '/tools/markdown',
        name: 'tools-markdown',
        component: MarkdownView,
        meta: routeMeta['tools-markdown']
      },
      {
        path: '/tools/json-yaml',
        name: 'json-yaml',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonYamlView.vue'),
        meta: routeMeta['json-yaml']
      },
      {
        path: '/tools/json-csv',
        name: 'json-csv',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonCsvView.vue'),
        meta: routeMeta['json-csv']
      },
      {
        path: '/tools/diff',
        name: 'diff',
        component: () => import(/* webpackPrefetch: true */ '../views/DiffView.vue'),
        meta: routeMeta['diff']
      },
      {
        path: '/tools/base64',
        name: 'base64',
        component: () => import(/* webpackPrefetch: true */ '../views/Base64View.vue'),
        meta: routeMeta['base64']
      },
      {
        path: '/tools/jwt',
        name: 'jwt',
        component: () => import(/* webpackPrefetch: true */ '../views/JwtView.vue'),
        meta: routeMeta['jwt']
      },
      {
        path: '/tools/sql',
        name: 'sql',
        component: () => import(/* webpackPrefetch: true */ '../views/SqlFormatterView.vue'),
        meta: routeMeta['sql']
      },
      {
        path: '/tools/sql-to-er-diagram',
        name: 'sql-to-er-diagram',
        component: () => import(/* webpackPrefetch: true */ '../views/SqlToErDiagramView.vue'),
        meta: routeMeta['sql-to-er-diagram']
      },
      {
        path: '/tools/sql-query-plan-visualizer',
        name: 'sql-query-plan-visualizer',
        component: () => import(/* webpackPrefetch: true */ '../views/SqlQueryPlanVisualizerView.vue'),
        meta: routeMeta['sql-query-plan-visualizer']
      },
      {
        path: '/tools/sql-dialect-converter',
        name: 'sql-dialect-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/SqlDialectConverterView.vue'),
        meta: routeMeta['sql-dialect-converter']
      },
      {
        path: '/tools/foreign-key-visualizer',
        name: 'foreign-key-visualizer',
        component: () => import(/* webpackPrefetch: true */ '../views/FkVisualizerView.vue'),
        meta: routeMeta['foreign-key-visualizer']
      },
      {
        path: '/tools/all',
        name: 'tools-all',
        component: () => import(/* webpackPrefetch: true */ '../views/ToolsView.vue'),
        meta: routeMeta['tools-all']
      },
      {
        path: '/tools/uuid',
        name: 'uuid',
        component: () => import(/* webpackPrefetch: true */ '../views/UuidGeneratorView.vue'),
        meta: routeMeta['uuid']
      },
      {
        path: '/tools/lorem',
        name: 'lorem',
        component: () => import(/* webpackPrefetch: true */ '../views/LoremIpsumView.vue'),
        meta: routeMeta['lorem']
      },
      {
        path: '/tools/image',
        name: 'image',
        component: () => import(/* webpackPrefetch: true */ '../views/ImageCompressorView.vue'),
        meta: routeMeta['image']
      },
      {
        path: '/tools/json-lint',
        name: 'json-lint',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonLintView.vue'),
        meta: routeMeta['json-lint']
      },
      {
        path: '/tools/yaml-lint',
        name: 'yaml-lint',
        component: () => import(/* webpackPrefetch: true */ '../views/YamlLintView.vue'),
        meta: routeMeta['yaml-lint']
      },
      {
        path: '/tools/bpmn',
        name: 'bpmn',
        component: () => import(/* webpackPrefetch: true */ '../views/BpmnView.vue'),
        meta: routeMeta['bpmn']
      },
      {
        path: '/tools/bpmn-to-visio',
        name: 'bpmn-to-visio',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/BpmnToVisioConverterView.vue'),
        meta: routeMeta['bpmn-to-visio']
      },
      {
        path: '/tools/visio-viewer',
        name: 'visio-viewer',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/tools/VisioViewer.vue'),
        meta: routeMeta['visio-viewer']
      },
      {
        path: '/tools/evm-converter',
        name: 'evm-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/EvmUnitConverterView.vue'),
        meta: routeMeta['evm-converter']
      },
      {
        path: '/tools/bls-signature',
        name: 'bls-signature',
        component: () => import(/* webpackPrefetch: true */ '../views/BlsSignatureView.vue'),
        meta: routeMeta['bls-signature']
      },
      {
        path: '/tools/keccak256',
        name: 'keccak256',
        component: () => import(/* webpackPrefetch: true */ '../views/KeccakHasherView.vue'),
        meta: routeMeta['keccak256']
      },
      {
        path: '/tools/address-checksum',
        name: 'address-checksum',
        component: () => import(/* webpackPrefetch: true */ '../views/AddressChecksumView.vue'),
        meta: routeMeta['address-checksum']
      },
      {
        path: '/tools/multi-chain-keys',
        name: 'multi-chain-keys',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/MultiChainKeyGeneratorView.vue'),
        meta: routeMeta['multi-chain-keys']
      },
      {
        path: '/tools/address-from-key',
        name: 'address-from-key',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/AddressFromPrivateKeyView.vue'),
        meta: routeMeta['address-from-key']
      },
      {
        path: '/tools/cosmos-address-generator',
        name: 'cosmos-address-generator',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/CosmosAddressGeneratorView.vue'),
        meta: routeMeta['cosmos-address-generator']
      },
      {
        path: '/tools/rwa-swap',
        name: 'rwa-swap',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/RwaSwapView.vue'),
        meta: routeMeta['rwa-swap']
      },
      {
        path: '/tools/rwa-deploy-lab',
        name: 'rwa-deploy-lab',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/RwaDeployLabView.vue'),
        meta: routeMeta['rwa-deploy-lab']
      },
      {
        path: '/tools/solidity-to-opcodes',
        name: 'solidity-to-opcodes',
        component: () => import(/* webpackPrefetch: true */ '../views/SolidityToOpcodesView.vue'),
        meta: routeMeta['solidity-to-opcodes']
      },
      {
        path: '/tools/cosmos-reader',
        name: 'cosmos-reader',
        component: () => import(/* webpackPrefetch: true */ '../views/CosmosReaderView.vue'),
        meta: routeMeta['cosmos-reader']
      },
      {
        path: '/tools/solana-account-reader',
        name: 'solana-account-reader',
        component: () => import(/* webpackPrefetch: true */ '../views/SolanaAccountReaderView.vue'),
        meta: routeMeta['solana-account-reader']
      },
      {
        path: '/tools/polkadot-reader',
        name: 'polkadot-reader',
        component: () => import(/* webpackPrefetch: true */ '../views/PolkadotReaderView.vue'),
        meta: routeMeta['polkadot-reader']
      },
      {
        path: '/tools/cardano-reader',
        name: 'cardano-reader',
        component: () => import(/* webpackPrefetch: true */ '../views/CardanoReaderView.vue'),
        meta: routeMeta['cardano-reader']
      },
      {
        path: '/tools/contract-reader',
        name: 'contract-reader',
        component: () => import(/* webpackPrefetch: true */ '../views/ContractReaderView.vue'),
        meta: routeMeta['contract-reader']
      },
      {
        path: '/tools/function-selector',
        name: 'function-selector',
        component: () => import(/* webpackPrefetch: true */ '../views/FunctionSelectorView.vue'),
        meta: routeMeta['function-selector']
      },
      {
        path: '/tools/ens-namehash',
        name: 'ens-namehash',
        component: () => import(/* webpackPrefetch: true */ '../views/EnsNamehashView.vue'),
        meta: routeMeta['ens-namehash']
      },
      {
        path: '/tools/passkey-address',
        name: 'passkey-address',
        component: () => import(/* webpackPrefetch: true */ '../views/PasskeyAddressView.vue'),
        meta: routeMeta['passkey-address']
      },
      {
        path: '/tools/dkms-visualizer',
        name: 'dkms-visualizer',
        component: () => import(/* webpackPrefetch: true */ '../views/DkmsVisualizerView.vue'),
        meta: routeMeta['dkms-visualizer']
      },
      {
        path: '/tools/x402-encoder',
        name: 'x402-encoder',
        component: () => import(/* webpackPrefetch: true */ '../views/X402EncoderView.vue'),
        meta: routeMeta['x402-encoder']
      },
      {
        path: '/tools/tls-checker',
        name: 'tls-checker',
        component: () => import(/* webpackPrefetch: true */ '../views/TlsCheckerView.vue'),
        meta: routeMeta['tls-checker']
      },
      {
        path: '/tools/soc2-checklist',
        name: 'soc2-checklist',
        component: () => import(/* webpackPrefetch: true */ '../views/Soc2ChecklistView.vue'),
        meta: routeMeta['soc2-checklist']
      },
      {
        path: '/tools/policy-generator',
        name: 'policy-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/PolicyGeneratorView.vue'),
        meta: routeMeta['policy-generator']
      },
      {
        path: '/tools/impermanent-loss',
        name: 'impermanent-loss',
        component: () => import(/* webpackPrefetch: true */ '../views/ImpermanentLossView.vue'),
        meta: routeMeta['impermanent-loss']
      },
      {
        path: '/tools/vault-calculator',
        name: 'vault-calculator',
        component: () => import(/* webpackPrefetch: true */ '../views/VaultCalculatorView.vue'),
        meta: routeMeta['vault-calculator']
      },
      {
        path: '/tools/apy-calculator',
        name: 'apy-calculator',
        component: () => import(/* webpackPrefetch: true */ '../views/ApyCalculatorView.vue'),
        meta: routeMeta['apy-calculator']
      },
      {
        path: '/tools/vanity-eth',
        name: 'vanity-eth',
        component: () => import(/* webpackPrefetch: true */ '../views/VanityEthView.vue'),
        meta: routeMeta['vanity-eth']
      },
      {
        path: '/tools/security-headers',
        name: 'security-headers',
        component: () => import(/* webpackPrefetch: true */ '../views/SecurityHeadersView.vue'),
        meta: routeMeta['security-headers']
      },
      {
        path: '/tools/csp-generator',
        name: 'csp-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/CspGeneratorView.vue'),
        meta: routeMeta['csp-generator']
      },
      {
        path: '/tools/csp-evaluator',
        name: 'csp-evaluator',
        component: () => import(/* webpackPrefetch: true */ '../views/CspEvaluatorView.vue'),
        meta: routeMeta['csp-evaluator']
      },
      {
        path: '/tools/cors-tester',
        name: 'cors-tester',
        component: () => import(/* webpackPrefetch: true */ '../views/CorsTesterView.vue'),
        meta: routeMeta['cors-tester']
      },
      {
        path: '/tools/cookie-analyzer',
        name: 'cookie-analyzer',
        component: () => import(/* webpackPrefetch: true */ '../views/CookieAnalyzerView.vue'),
        meta: routeMeta['cookie-analyzer']
      },
      {
        path: '/tools/jwt-suite',
        name: 'jwt-suite',
        component: () => import(/* webpackPrefetch: true */ '../views/JwtSuiteView.vue'),
        meta: routeMeta['jwt-suite']
      },
      {
        path: '/tools/saml-decoder',
        name: 'saml-decoder',
        component: () => import(/* webpackPrefetch: true */ '../views/SamlDecoderView.vue'),
        meta: routeMeta['saml-decoder']
      },
      {
        path: '/tools/oidc-url-builder',
        name: 'oidc-url-builder',
        component: () => import(/* webpackPrefetch: true */ '../views/OidcUrlBuilderView.vue'),
        meta: routeMeta['oidc-url-builder']
      },
      {
        path: '/tools/abi-encoder',
        name: 'abi-encoder',
        component: () => import(/* webpackPrefetch: true */ '../views/AbiEncoderView.vue'),
        meta: routeMeta['abi-encoder']
      },
      {
        path: '/agent-identity-generator',
        name: 'agent-identity-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/tools/AgentIdentityView.vue'),
      },
      {
        path: '/tools/agent-identity-generator',
        name: 'tools-agent-identity-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/tools/AgentIdentityView.vue'),
        meta: routeMeta['tools-agent-identity-generator']
      },
      {
        path: '/local-token-counter',
        name: 'local-token-counter',
        component: () => import(/* webpackPrefetch: true */ '../views/LocalTokenCounterView.vue'),
      },
      {
        path: '/tools/local-token-counter',
        name: 'tools-local-token-counter',
        component: () => import(/* webpackPrefetch: true */ '../views/LocalTokenCounterView.vue'),
        meta: routeMeta['tools-local-token-counter']
      },
      {
        path: '/agents',
        name: 'agents',
        component: () => import(/* webpackPrefetch: true */ '../views/AgentsView.vue'),
        meta: routeMeta['agents']
      },
      {
        path: '/agents/:address',
        name: 'agent-detail',
        component: () => import(/* webpackPrefetch: true */ '../views/AgentDetailView.vue'),
        meta: routeMeta['agent-detail']
      },

      // Crypto Tools
      {
        path: '/tools/bcrypt',
        name: 'bcrypt',
        component: () => import(/* webpackPrefetch: true */ '../views/BcryptView.vue'),
        meta: routeMeta['bcrypt']
      },
      {
        path: '/tools/encryption',
        name: 'encryption',
        component: () => import(/* webpackPrefetch: true */ '../views/EncryptionView.vue'),
        meta: routeMeta['encryption']
      },
      {
        path: '/tools/bip39-generator',
        name: 'bip39-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/Bip39GeneratorView.vue'),
        meta: routeMeta['bip39-generator']
      },
      {
        path: '/tools/crypto-forecasts',
        name: 'crypto-forecasts',
        component: () => import(/* webpackPrefetch: true */ '../views/CryptoForecastsView.vue'),
        meta: routeMeta['crypto-forecasts']
      },
      {
        path: '/tools/hmac-generator',
        name: 'hmac-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/HmacGeneratorView.vue'),
        meta: routeMeta['hmac-generator']
      },
      {
        path: '/tools/rsa-key-pair-generator',
        name: 'rsa-key-pair-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/RsaKeyPairGeneratorView.vue'),
        meta: routeMeta['rsa-key-pair-generator']
      },
      {
        path: '/tools/password-strength-analyser',
        name: 'password-strength-analyser',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/PasswordStrengthAnalyserView.vue'),
        meta: routeMeta['password-strength-analyser']
      },
      {
        path: '/tools/prompt-injection-tester',
        name: 'prompt-injection-tester',
        component: () => import('@/views/PromptInjectionTesterView.vue'),
        meta: routeMeta['prompt-injection-tester']
      },
      {
                path: '/tools/pdf-signature-checker',
        name: 'pdf-signature-checker',
        component: () => import(/* webpackPrefetch: true */ '../views/PdfSignatureCheckerView.vue'),
        meta: routeMeta['pdf-signature-checker']
      },
      // Converter Tools
      {
        path: '/tools/integer-base-converter',
        name: 'integer-base-converter',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/IntegerBaseConverterView.vue'),
        meta: routeMeta['integer-base-converter']
      },
      {
        path: '/tools/roman-numeral-converter',
        name: 'roman-numeral-converter',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/RomanNumeralConverterView.vue'),
        meta: routeMeta['roman-numeral-converter']
      },
      {
        path: '/tools/base64-file-converter',
        name: 'base64-file-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/Base64FileConverterView.vue'),
        meta: routeMeta['base64-file-converter']
      },
      {
        path: '/tools/text-to-nato-alphabet',
        name: 'text-to-nato-alphabet',
        component: () => import(/* webpackPrefetch: true */ '../views/TextToNatoAlphabetView.vue'),
        meta: routeMeta['text-to-nato-alphabet']
      },
      {
        path: '/tools/text-to-unicode',
        name: 'text-to-unicode',
        component: () => import(/* webpackPrefetch: true */ '../views/TextToUnicodeView.vue'),
        meta: routeMeta['text-to-unicode']
      },
      {
        path: '/tools/yaml-to-toml',
        name: 'yaml-to-toml',
        component: () => import(/* webpackPrefetch: true */ '../views/YamlToTomlView.vue'),
        meta: routeMeta['yaml-to-toml']
      },
      {
        path: '/tools/json-to-toml',
        name: 'json-to-toml',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonToTomlView.vue'),
        meta: routeMeta['json-to-toml']
      },
      {
        path: '/tools/list-converter',
        name: 'list-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/ListConverterView.vue'),
        meta: routeMeta['list-converter']
      },
      {
        path: '/tools/toml-to-json',
        name: 'toml-to-json',
        component: () => import(/* webpackPrefetch: true */ '../views/TomlToJsonView.vue'),
        meta: routeMeta['toml-to-json']
      },
      {
        path: '/tools/toml-to-yaml',
        name: 'toml-to-yaml',
        component: () => import(/* webpackPrefetch: true */ '../views/TomlToYamlView.vue'),
        meta: routeMeta['toml-to-yaml']
      },
      {
        path: '/tools/markdown-to-html',
        name: 'markdown-to-html',
        component: () => import(/* webpackPrefetch: true */ '../views/MarkdownToHtmlView.vue'),
        meta: routeMeta['markdown-to-html']
      },
      // Web Tools
      {
        path: '/tools/url-encoder',
        name: 'url-encoder',
        component: () => import(/* webpackPrefetch: true */ '../views/UrlEncoderView.vue'),
        meta: routeMeta['url-encoder']
      },
      {
        path: '/tools/url-parser',
        name: 'url-parser',
        component: () => import(/* webpackPrefetch: true */ '../views/URLParserView.vue'),
        meta: routeMeta['url-parser']
      },
      {
        path: '/tools/html-entities',
        name: 'html-entities',
        component: () => import(/* webpackPrefetch: true */ '../views/HtmlEntitiesView.vue'),
        meta: routeMeta['html-entities']
      },
      {
        path: '/tools/device-information',
        name: 'device-information',
        component: () => import(/* webpackPrefetch: true */ '../views/DeviceInformationView.vue'),
        meta: routeMeta['device-information']
      },
      {
        path: '/tools/basic-auth-generator',
        name: 'basic-auth-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/BasicAuthGeneratorView.vue'),
        meta: routeMeta['basic-auth-generator']
      },
      {
        path: '/tools/meta-tag-generator',
        name: 'meta-tag-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/MetaTagGeneratorView.vue'),
        meta: routeMeta['meta-tag-generator']
      },
      {
        path: '/tools/otp-code-generator',
        name: 'otp-code-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/OtpCodeGeneratorView.vue'),
        meta: routeMeta['otp-code-generator']
      },
      {
        path: '/tools/mime-types',
        name: 'mime-types',
        component: () => import(/* webpackPrefetch: true */ '../views/MimeTypesView.vue'),
        meta: routeMeta['mime-types']
      },
      {
        path: '/tools/keycode-info',
        name: 'keycode-info',
        component: () => import(/* webpackPrefetch: true */ '../views/KeycodeInfoView.vue'),
        meta: routeMeta['keycode-info']
      },
      {
        path: '/tools/slugify-string',
        name: 'slugify-string',
        component: () => import(/* webpackPrefetch: true */ '../views/SlugifyStringView.vue'),
        meta: routeMeta['slugify-string']
      },

      {
        path: '/tools/html-wysiwyg-editor',
        name: 'html-wysiwyg-editor',
        component: () => import(/* webpackPrefetch: true */ '../views/HtmlWysiwygEditorView.vue'),
        meta: routeMeta['html-wysiwyg-editor']
      },
      {
        path: '/tools/user-agent-parser',
        name: 'user-agent-parser',
        component: () => import(/* webpackPrefetch: true */ '../views/UserAgentParserView.vue'),
        meta: routeMeta['user-agent-parser']
      },
      {
        path: '/tools/json-diff',
        name: 'json-diff',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonDiffView.vue'),
        meta: routeMeta['json-diff']
      },
      {
        path: '/tools/safelink-decoder',
        name: 'safelink-decoder',
        component: () => import(/* webpackPrefetch: true */ '../views/SafelinkDecoderView.vue'),
        meta: routeMeta['safelink-decoder']
      },
      // Images/Videos Tools
      {
        path: '/tools/wifi-qr-code-generator',
        name: 'wifi-qr-code-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/WifiQrCodeGeneratorView.vue'),
        meta: routeMeta['wifi-qr-code-generator']
      },
      {
        path: '/tools/svg-placeholder-generator',
        name: 'svg-placeholder-generator',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/SvgPlaceholderGeneratorView.vue'),
        meta: routeMeta['svg-placeholder-generator']
      },
      {
        path: '/tools/camera-recorder',
        name: 'camera-recorder',
        component: () => import(/* webpackPrefetch: true */ '../views/CameraRecorderView.vue'),
        meta: routeMeta['camera-recorder']
      },
      // Development Tools
      {
        path: '/tools/git-memo',
        name: 'git-memo',
        component: () => import(/* webpackPrefetch: true */ '../views/GitMemoView.vue'),
        meta: routeMeta['git-memo']
      },
      {
        path: '/tools/random-port-generator',
        name: 'random-port-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/RandomPortGeneratorView.vue'),
        meta: routeMeta['random-port-generator']
      },
      {
        path: '/tools/json-viewer',
        name: 'json-viewer',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonViewerView.vue'),
        meta: routeMeta['json-viewer']
      },
      {
        path: '/tools/json-minify',
        name: 'json-minify',
        component: () => import(/* webpackPrefetch: true */ '../views/JsonMinifyView.vue'),
        meta: routeMeta['json-minify']
      },
      {
        path: '/tools/chmod-calculator',
        name: 'chmod-calculator',
        component: () => import(/* webpackPrefetch: true */ '../views/ChmodCalculatorView.vue'),
        meta: routeMeta['chmod-calculator']
      },
      {
        path: '/tools/docker-run-to-compose',
        name: 'docker-run-to-compose',
        component: () => import(/* webpackPrefetch: true */ '../views/DockerRunToComposeView.vue'),
        meta: routeMeta['docker-run-to-compose']
      },
      {
        path: '/tools/xml-formatter',
        name: 'xml-formatter',
        component: () => import(/* webpackPrefetch: true */ '../views/XmlFormatterView.vue'),
        meta: routeMeta['xml-formatter']
      },
      {
        path: '/tools/yaml-viewer',
        name: 'yaml-viewer',
        component: () => import(/* webpackPrefetch: true */ '../views/YamlViewerView.vue'),
        meta: routeMeta['yaml-viewer']
      },
      {
        path: '/tools/email-normalizer',
        name: 'email-normalizer',
        component: () => import(/* webpackPrefetch: true */ '../views/EmailNormalizerView.vue'),
        meta: routeMeta['email-normalizer']
      },
      {
        path: '/tools/regex-memo',
        name: 'regex-memo',
        component: () => import(/* webpackPrefetch: true */ '../views/RegexMemoView.vue'),
        meta: routeMeta['regex-memo']
      },
      // Network Tools
      {
        path: '/tools/ipv4-subnet-calculator',
        name: 'ipv4-subnet-calculator',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/Ipv4SubnetCalculatorView.vue'),
        meta: routeMeta['ipv4-subnet-calculator']
      },
      {
        path: '/tools/ipv4-address-converter',
        name: 'ipv4-address-converter',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/Ipv4AddressConverterView.vue'),
        meta: routeMeta['ipv4-address-converter']
      },
      {
        path: '/tools/ipv4-range-expander',
        name: 'ipv4-range-expander',
        component: () => import(/* webpackPrefetch: true */ '../views/Ipv4RangeExpanderView.vue'),
        meta: routeMeta['ipv4-range-expander']
      },
      {
        path: '/tools/mac-address-lookup',
        name: 'mac-address-lookup',
        component: () => import(/* webpackPrefetch: true */ '../views/MacAddressLookupView.vue'),
        meta: routeMeta['mac-address-lookup']
      },
      {
        path: '/tools/mac-address-generator',
        name: 'mac-address-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/MacAddressGeneratorView.vue'),
        meta: routeMeta['mac-address-generator']
      },
      {
        path: '/tools/ipv6-ula-generator',
        name: 'ipv6-ula-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/Ipv6UlaGeneratorView.vue'),
        meta: routeMeta['ipv6-ula-generator']
      },
      // Math Tools
      {
        path: '/tools/eta-calculator',
        name: 'eta-calculator',
        component: () => import(/* webpackPrefetch: true */ '../views/EtaCalculatorView.vue'),
        meta: routeMeta['eta-calculator']
      },
      // Measurement Tools
      {
        path: '/tools/chronometer',
        name: 'chronometer',
        component: () => import(/* webpackPrefetch: true */ '../views/ChronometerView.vue'),
        meta: routeMeta['chronometer']
      },
      {
        path: '/tools/temperature-converter',
        name: 'temperature-converter',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/TemperatureConverterView.vue'),
        meta: routeMeta['temperature-converter']
      },
      {
        path: '/tools/benchmark-builder',
        name: 'benchmark-builder',
        component: () => import(/* webpackPrefetch: true */ '../views/BenchmarkBuilderView.vue'),
        meta: routeMeta['benchmark-builder']
      },
      // Text Tools
      {
        path: '/tools/text-statistics',
        name: 'text-statistics',
        component: () => import(/* webpackPrefetch: true */ '../views/TextStatisticsView.vue'),
        meta: routeMeta['text-statistics']
      },
      {
        path: '/tools/emoji-picker',
        name: 'emoji-picker',
        component: () => import(/* webpackPrefetch: true */ '../views/EmojiPickerView.vue'),
        meta: routeMeta['emoji-picker']
      },
      {
        path: '/tools/string-obfuscator',
        name: 'string-obfuscator',
        component: () => import(/* webpackPrefetch: true */ '../views/StringObfuscatorView.vue'),
        meta: routeMeta['string-obfuscator']
      },
      {
        path: '/tools/numeronym-generator',
        name: 'numeronym-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/NumeronymGeneratorView.vue'),
        meta: routeMeta['numeronym-generator']
      },
      {
        path: '/tools/ascii-text-drawer',
        name: 'ascii-text-drawer',
        component: () => import(/* webpackPrefetch: true */ '../views/AsciiTextDrawerView.vue'),
        meta: routeMeta['ascii-text-drawer']
      },
      // Data Tools
      {
        path: '/tools/phone-parser',
        name: 'phone-parser',
        component: () => import(/* webpackPrefetch: true */ '../views/PhoneParserView.vue'),
        meta: routeMeta['phone-parser']
      },
      {
        path: '/tools/iban-validator',
        name: 'iban-validator',
        component: () => import(/* webpackPrefetch: true */ '../views/IbanValidatorView.vue'),
        meta: routeMeta['iban-validator']
      },
      // Additional missing routes
      {
        path: '/tools/qr-code-generator',
        name: 'qr-code-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/QRCodeGeneratorView.vue'),
        meta: routeMeta['qr-code-generator']
      },
      {
        path: '/tools/crontab-generator',
        name: 'crontab-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/CrontabGeneratorView.vue'),
        meta: routeMeta['crontab-generator']
      },
      {
        path: '/tools/regex-tester',
        name: 'regex-tester',
        component: () => import(/* webpackPrefetch: true */ '../views/RegexTesterView.vue'),
        meta: routeMeta['regex-tester']
      },
      {
        path: '/tools/math-evaluator',
        name: 'math-evaluator',
        component: () => import(/* webpackPrefetch: true */ '../views/MathEvaluatorView.vue'),
        meta: routeMeta['math-evaluator']
      },
      {
        path: '/tools/quantum-circuit-simulator',
        name: 'quantum-circuit-simulator',
        component: () => import(/* webpackPrefetch: true */ '../views/QuantumCircuitSimulatorView.vue'),
        meta: routeMeta['quantum-circuit-simulator']
      },
      {
        path: '/tools/percentage-calculator',
        name: 'percentage-calculator',
        component: () =>
          import(/* webpackPrefetch: true */ '../views/PercentageCalculatorView.vue'),
        meta: routeMeta['percentage-calculator']
      },
      {
        path: '/tools/token-generator',
        name: 'token-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/TokenGeneratorView.vue'),
        meta: routeMeta['token-generator']
      },
      {
        path: '/tools/hash-text',
        name: 'hash-text',
        component: () => import(/* webpackPrefetch: true */ '../views/HashTextView.vue'),
        meta: routeMeta['hash-text']
      },
      {
        path: '/tools/xml-json',
        name: 'xml-json',
        component: () => import(/* webpackPrefetch: true */ '../views/tools/XmlJsonConverter.vue'),
        meta: routeMeta['xml-json']
      },
      {
        path: '/tools/ulid-generator',
        name: 'ulid-generator',
        component: () => import(/* webpackPrefetch: true */ '../views/ULIDGeneratorView.vue'),
        meta: routeMeta['ulid-generator']
      },
      {
        path: '/tools/case-converter',
        name: 'case-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/CaseConverterView.vue'),
        meta: routeMeta['case-converter']
      },
      {
        path: '/tools/date-time-converter',
        name: 'date-time-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/DateTimeConverterView.vue'),
        meta: routeMeta['date-time-converter']
      },
      {
        path: '/tools/unix-timestamp',
        name: 'unix-timestamp',
        component: () => import(/* webpackPrefetch: true */ '../views/UnixTimestampView.vue'),
        meta: routeMeta['unix-timestamp']
      },
      {
        path: '/tools/color-converter',
        name: 'color-converter',
        component: () => import(/* webpackPrefetch: true */ '../views/ColorConverterView.vue'),
        meta: routeMeta['color-converter']
      },
      {
        path: '/tools/text-to-binary',
        name: 'text-to-binary',
        component: () => import(/* webpackPrefetch: true */ '../views/TextToBinaryView.vue'),
        meta: routeMeta['text-to-binary']
      },
      {
        path: '/tools/http-status-codes',
        name: 'http-status-codes',
        component: () => import(/* webpackPrefetch: true */ '../views/HTTPStatusCodesView.vue'),
        meta: routeMeta['http-status-codes']
      },
      {
        path: '/tools/mermaid-viewer',
        name: 'mermaid-viewer',
        component: () => import(/* webpackPrefetch: true */ '../views/tools/MermaidViewer.vue'),
        meta: routeMeta['mermaid-viewer']
      },
      {
        path: '/tools/beta-feedback',
        name: 'beta-feedback',
        component: () => import(/* webpackPrefetch: true */ '../views/BetaFeedbackView.vue'),
        meta: routeMeta['beta-feedback']
      },
      {
        path: '/tools/admin/beta-feedback',
        name: 'admin-beta-feedback',
        component: () => import(/* webpackPrefetch: true */ '../views/admin/BetaFeedbackAdmin.vue'),
        meta: routeMeta['admin-beta-feedback']
      },
      {
        path: '/tools/admin/ab-tests',
        name: 'admin-ab-tests',
        component: () => import(/* webpackPrefetch: true */ '../views/admin/ABTestDashboard.vue'),
        meta: routeMeta['admin-ab-tests']
      },
      {
        path: '/dev-tools/:stack',
        name: 'dev-tools',
        component: () => import(/* webpackPrefetch: true */ '../views/DevStackView.vue'),
      },
      {
        path: '/evm-tools/:chain',
        name: 'evm-tools',
        component: () => import(/* webpackPrefetch: true */ '../views/EvmToolsView.vue'),
      },
      // Category index redirects to the tools directory
      {
        path: '/category',
        redirect: '/tools/all'
      },
      // Category Routes (single generic component, slugs are stable)
      {
        path: '/category/web3',
        name: 'category-web3',
        component: () => import('../views/CategoryView.vue'),
        meta: routeMeta['category-web3']
      },
      {
        path: '/category/security',
        name: 'category-security',
        component: () => import('../views/CategoryView.vue'),
        meta: routeMeta['category-security']
      },
      {
        path: '/category/data-formats',
        name: 'category-data-formats',
        component: () => import('../views/CategoryView.vue'),
        meta: routeMeta['category-data-formats']
      },
      {
        path: '/category/developer',
        name: 'category-developer',
        component: () => import('../views/CategoryView.vue'),
        meta: routeMeta['category-developer']
      },
      {
        path: '/category/converters',
        name: 'category-converters',
        component: () => import('../views/CategoryView.vue'),
        meta: routeMeta['category-converters']
      },
      {
        path: '/category/network',
        name: 'category-network',
        component: () => import('../views/CategoryView.vue'),
        meta: routeMeta['category-network']
      },
      // Legacy category slugs redirect to new pages
      { path: '/category/web-network', redirect: '/category/network' },    ]
  },
  // 404 Catch-all route
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackPrefetch: true */ '../views/NotFoundView.vue'),
    meta: routeMeta['not-found']
  }
]
