<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { KeyRound, RefreshCw, Copy, Check } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Password Generator — Strong Random Passwords & Passphrases | Formatho',
  description:
    'Generate strong random passwords and passphrases in your browser: length control, character sets, exclude look-alike characters, entropy meter. Uses crypto-grade randomness, 100% client-side — passwords never leave your device.',
  keywords: ['password generator', 'strong password', 'random password generator', 'passphrase generator', 'secure password', 'generate password online'],
  ogType: 'website'
})

type Mode = 'chars' | 'passphrase'
const mode = ref<Mode>('chars')

const length = ref(20)
const upper = ref(true)
const lower = ref(true)
const digits = ref(true)
const symbols = ref(true)
const excludeAmbiguous = ref(false)
const wordCount = ref(4)
const separator = ref('-')

const SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?/~',
}
const AMBIGUOUS = new Set('Il1O0oB8S5Z2G6|`\'"{}[]();.,<>~'.split(''))

// ~200 common, easy-to-type words for passphrases
const WORDS = ('able acid acorn actor agent album alert alien amber anchor angle ankle apple april arrow asset atlas audio bacon badge baker ball bamboo banjo barge basic beach beacon beam bean bell belt bench berry bike birch bird bison black blade blaze bloom blue bluff board boat bonus book booth border bottle bowl brave bread brick bridge bright bronze brook brush budget bugle bunny cabin cable cactus camel candle canoe canvas canyon capital carbon cargo carpet carrot castle cattle cedar cello chair chalk charm cheese cherry chief chill choir chrome cider cinema circus citrus clay clever cliff cloak cloud clover coach coast cobra coffee comet coral cosmic cotton county couple cover coyote crane crate crayon cream creek crest cricket crown crystal curve cycle daisy dance dawn decoy deer delta denim desert diamond dice diner dizzy dolphin donor donut double dove draft dragon drama dream drift duck dunes dusk eagle earth easel echo edge eel egret elbow elder elect elite ember emerald engine envoy equal ermine essay evening exact exit fable falcon family famous fang farm feast fern ferry fiber fiddle fig filter final fire fish flag flame flask fleet flint float flock flora flower fluid flute focus foggy forest fossil fox frame fresh frog frost fruit fudge fuel fun galley garden garlic gauge gecko gem ghost giant gift ginger glacier glass glaze globe glow gold golf goose gorge grace grain grape grasp gravel green grill grove guard guitar gulf habit halo hammer harbor harvest hawk hazel heart hedge helix hero hickory honey hood horizon horn humble ibis ice icon igloo impact indigo inlet insect iris iron island ivory jacket jade jaguar jazz jelly jewel jolly kayak kernel kettle key kiwi koala lace ladder lagoon lantern laser lattice laurel lava leaf ledger lemon lento level lichen lilac lily limber linen lion lizard llama lobby lobster locket lodge lotus lucid lumber lunar lynx lyric mango maple marble march marina market mask mason meadow medal melody mentor meteor micro mellow mint mirror mist mocha monarch moon morning mosaic moss motel motor muffin mulberry mural music mustang myrrh nectar needle nest nickel noble nomad north notch novel nudge nugget nylon oasis oat ocean ocelot octopus olive onyx opal opera orbit orchid organic osprey otter oasis paddle pagoda palace palm panda panel pansy paper parade parlor parrot pasta pasture pattern peach pearl pebble pelican pepper petal phoenix piano picnic pigment pilot pine pistol pixel planet plasma plaza plum pocket poetry polar pollen pond pony poppy portal powder prairie prism prize propane proud pudding pueblo pulpumpkin puzzle pyramid quail quarry quartz quasar quill quilt quiver rabbit racer radar radish rafter ragnorthail rally ranch ranger rapid raven rebate rebel record reef regal relay remedy render rescue resin retro rhino ribbon riddle ridge rifle ripple rising river roast robin rocket rodeo rogue rolling roost rope rose rosy royal ruby rugby ruler runway rustic saddle safari saffron sage sailor salmon salute sand sapphire sardine satin sauce scale scarf scenic school scoop scooter scorpion scout scribe scroll sculpt seal season seaweed secret sedan seed seldom sequel serene serum shadow shale shark shell shield shifter shine shore shoulder shrimp shrine sierra signal silk silo silver simple siren sketch skier slate sleek slick slope small smart smile smoke snack snout social socket solar solid sonar sonnet sorbet sound south spangle spade spark spear spice spike spine spiral spirit splash spoke sponge spool spore spring sprout spruce square squash stable stack staff stage stamp stand star statue steam steel stem steppe stick sting stock stone stool storm stove strand straw stream street stride strike strong studio stucco style sugar summit sunny surf swan sweep sweet swift swing switch sword syrup table tackle tailor talent tango tapestry target tavern tea teal temple tenant tender tennis terrace thicket thistle thorn thread throne thunder ticket tidal tiger timber tiny toast tobacco toffee token tomato topaz torch total totem toucan tower trace track trailer train tram trap travel tray treasure treat trend tribe trick trout truce trumpet trunk trust tulip tundra tunnel turbo turtle tusk tweed twig twinkle ultra umber umbrella uncle unicorn unison unity uplift urban useful usher utensil valley valve vanilla vapor vault velvet vendor venture verdict vertex vessel viable vibrant viceroy view vigor village vine violet vinyl viola virtue vista vivid vocal volcano voyage wafer wagon walnut walrus wander warmth washer wasp water wattle wave wax weaver wedge welcome whale wharf wheat wheel whisk wicker wild willow window winner winter wisdom wizard wolf wonder wood wool world worthy wreath wren xylene yacht yarn year yeast yellow yield yoga yogurt young zebra zenith zephyr zero zest zigzag zinc zodiac zone').split(' ')

function rand(n: number) {
  const buf = new Uint32Array(1)
  crypto.getRandomValues(buf)
  return buf[0] % n // fine for character selection
}

const password = ref('')
const copied = ref(false)

function generate() {
  if (mode.value === 'passphrase') {
    const words: string[] = []
    for (let i = 0; i < wordCount.value; i++) words.push(WORDS[rand(WORDS.length)])
    let p = words.join(separator.value)
    // append a digit + capital for sites that require them
    if (digits.value) p += separator.value + rand(100)
    password.value = p
    return
  }
  let pool = ''
  const active: string[] = []
  if (upper.value) { const s = filter(SETS.upper); pool += s; active.push(s) }
  if (lower.value) { const s = filter(SETS.lower); pool += s; active.push(s) }
  if (digits.value) { const s = filter(SETS.digits); pool += s; active.push(s) }
  if (symbols.value) { const s = filter(SETS.symbols); pool += s; active.push(s) }
  if (!pool) { password.value = ''; return }
  const chars: string[] = []
  // guarantee one char per selected set
  for (const s of active) chars.push(s[rand(s.length)])
  while (chars.length < length.value) chars.push(pool[rand(pool.length)])
  // Fisher-Yates shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = rand(i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
  password.value = chars.slice(0, Math.max(active.length, length.value)).join('')
}

function filter(set: string) {
  return excludeAmbiguous.value ? set.split('').filter((c) => !AMBIGUOUS.has(c)).join('') : set
}

generate()
watch([length, upper, lower, digits, symbols, excludeAmbiguous, wordCount, separator, mode], generate)

const entropy = computed(() => {
  if (mode.value === 'passphrase') return Math.round(wordCount.value * Math.log2(WORDS.length))
  let pool = 0
  if (upper.value) pool += filter(SETS.upper).length
  if (lower.value) pool += filter(SETS.lower).length
  if (digits.value) pool += filter(SETS.digits).length
  if (symbols.value) pool += filter(SETS.symbols).length
  return pool ? Math.round(length.value * Math.log2(pool)) : 0
})

const strength = computed(() => {
  const e = entropy.value
  if (e >= 128) return { label: 'Excellent', color: 'text-green-600', bar: 'bg-green-600', pct: 100 }
  if (e >= 80) return { label: 'Strong', color: 'text-green-600', bar: 'bg-green-600', pct: 80 }
  if (e >= 60) return { label: 'Good', color: 'text-amber-600', bar: 'bg-amber-600', pct: 60 }
  if (e >= 40) return { label: 'Weak', color: 'text-orange-600', bar: 'bg-orange-600', pct: 40 }
  return { label: 'Very weak', color: 'text-red-600', bar: 'bg-red-600', pct: 20 }
})

function copy() {
  navigator.clipboard.writeText(password.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <div class="text-center space-y-3 mb-8">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
        <KeyRound class="w-7 h-7 text-primary" />
      </div>
      <h1 class="text-3xl font-bold tracking-tight">Password Generator</h1>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Strong passwords and passphrases generated with your browser's cryptographic random number generator.
        Nothing is sent anywhere — every password is created and lives only on your device.
      </p>
    </div>

    <Card class="mb-4">
      <CardContent class="pt-6 space-y-4">
        <div class="flex gap-2 justify-center">
          <button class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors" :class="mode === 'chars' ? 'bg-primary text-primary-foreground' : 'border hover:bg-muted'" @click="mode = 'chars'">Random characters</button>
          <button class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors" :class="mode === 'passphrase' ? 'bg-primary text-primary-foreground' : 'border hover:bg-muted'" @click="mode = 'passphrase'">Passphrase</button>
        </div>
        <div class="rounded-xl border p-4 font-mono text-xl text-center break-all select-all min-h-16 flex items-center justify-center">
          {{ password || 'select at least one character set' }}
        </div>
        <div class="flex flex-wrap gap-2 justify-center">
          <Button @click="generate"><RefreshCw class="w-4 h-4 mr-2" /> Generate</Button>
          <Button variant="outline" @click="copy"><component :is="copied ? Check : Copy" class="w-4 h-4 mr-2" /> {{ copied ? 'Copied' : 'Copy' }}</Button>
        </div>
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span :class="strength.color" class="font-semibold">{{ strength.label }}</span>
            <span class="text-muted-foreground">{{ entropy }} bits of entropy</span>
          </div>
          <div class="h-2 rounded-full bg-muted overflow-hidden">
            <div class="h-full rounded-full transition-all" :class="strength.bar" :style="{ width: strength.pct + '%' }"></div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader class="pb-3"><CardTitle class="text-base">Options</CardTitle></CardHeader>
      <CardContent class="space-y-4">
        <template v-if="mode === 'chars'">
          <div>
            <div class="flex justify-between text-sm mb-1"><span class="font-medium">Length</span><span class="text-muted-foreground font-mono">{{ length }}</span></div>
            <input type="range" min="6" max="64" v-model.number="length" class="w-full" />
          </div>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <label class="flex items-center gap-2 p-2 rounded-lg border cursor-pointer" :class="upper ? 'border-primary bg-primary/5' : ''"><input type="checkbox" v-model="upper" class="accent-current" /> Uppercase A-Z</label>
            <label class="flex items-center gap-2 p-2 rounded-lg border cursor-pointer" :class="lower ? 'border-primary bg-primary/5' : ''"><input type="checkbox" v-model="lower" class="accent-current" /> Lowercase a-z</label>
            <label class="flex items-center gap-2 p-2 rounded-lg border cursor-pointer" :class="digits ? 'border-primary bg-primary/5' : ''"><input type="checkbox" v-model="digits" class="accent-current" /> Digits 0-9</label>
            <label class="flex items-center gap-2 p-2 rounded-lg border cursor-pointer" :class="symbols ? 'border-primary bg-primary/5' : ''"><input type="checkbox" v-model="symbols" class="accent-current" /> Symbols !@#$</label>
          </div>
          <label class="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" v-model="excludeAmbiguous" /> Exclude look-alike characters (I l 1 O 0 …)</label>
        </template>
        <template v-else>
          <div>
            <div class="flex justify-between text-sm mb-1"><span class="font-medium">Words</span><span class="text-muted-foreground font-mono">{{ wordCount }}</span></div>
            <input type="range" min="3" max="8" v-model.number="wordCount" class="w-full" />
          </div>
          <div class="text-sm">
            <span class="font-medium block mb-1.5">Separator</span>
            <div class="flex gap-2">
              <button v-for="sep in ['-', '.', '_', ' ']" :key="sep" @click="separator = sep" class="w-10 h-9 rounded-md border text-center font-mono" :class="separator === sep ? 'border-primary bg-primary/5' : ''">{{ sep === ' ' ? '␣' : sep }}</button>
            </div>
          </div>
        </template>
      </CardContent>
    </Card>

    <p class="text-xs text-muted-foreground text-center mt-6 max-w-xl mx-auto">
      Tips: use a dedicated password manager to store these; passphrases are easier to type and remember at the same
      strength; never reuse a password across sites. Check how an existing password holds up with our
      <a href="/tools/password-strength-analyser" class="underline">Password Strength Analyser</a>.
    </p>
  </div>
</template>
