<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'

type ConversionDirection = 'xml-to-json' | 'json-to-xml'

const direction = ref<ConversionDirection>('xml-to-json')
const input = ref('')
const output = ref('')
const error = ref('')

// XML to JSON conversion
const xmlToJson = (xml: string): any => {