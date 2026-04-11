import { onMounted, onUnmounted } from 'vue'

interface BlogPostStructuredData {
  headline: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  url: string
  keywords?: string
  wordCount?: number
  articleBody?: string
}

interface ToolStructuredData {
  name: string
  description: string
  url: string
  category: string
  operatingSystem?: string
  applicationCategory?: string
  offers?: {
    price: string
    priceCurrency: string
  }
}

export function useStructuredData() {
  let structuredDataScript: HTMLScriptElement | null = null

  function addBlogPostStructuredData(data: BlogPostStructuredData) {
    if (typeof document === 'undefined') return

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: data.headline,
      description: data.description,
      author: {
        '@type': 'Organization',
        name: data.author,
        url: 'https://formatho.com/tools/'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Formatho',
        logo: {
          '@type': 'ImageObject',
          url: 'https://formatho.com/tools/og-image.png'
        }
      },
      datePublished: data.datePublished,
      dateModified: data.dateModified || data.datePublished,
      image: data.image || 'https://formatho.com/tools/og-image.png',
      url: data.url,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': data.url
      },
      keywords: data.keywords,
      wordCount: data.wordCount,
      articleBody: data.articleBody
    }

    addStructuredData(structuredData)
  }

  function addToolStructuredData(data: ToolStructuredData) {
    if (typeof document === 'undefined') return

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: data.name,
      description: data.description,
      url: data.url,
      applicationCategory: data.applicationCategory || data.category,
      operatingSystem: data.operatingSystem || 'Any',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: data.offers || {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1250'
      }
    }

    addStructuredData(structuredData)
  }

  function addFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
    if (typeof document === 'undefined') return

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }

    addStructuredData(structuredData)
  }

  function addBreadcrumbStructuredData(
    items: Array<{ name: string; url: string }>
  ) {
    if (typeof document === 'undefined') return

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }

    addStructuredData(structuredData)
  }

  function addStructuredData(data: any) {
    if (typeof document === 'undefined') return

    // Remove existing structured data
    removeStructuredData()

    // Create new script element
    structuredDataScript = document.createElement('script')
    structuredDataScript.type = 'application/ld+json'
    structuredDataScript.textContent = JSON.stringify(data)
    document.head.appendChild(structuredDataScript)
  }

  function removeStructuredData() {
    if (structuredDataScript && structuredDataScript.parentNode) {
      structuredDataScript.parentNode.removeChild(structuredDataScript)
      structuredDataScript = null
    }
  }

  onUnmounted(() => {
    removeStructuredData()
  })

  return {
    addBlogPostStructuredData,
    addToolStructuredData,
    addFAQStructuredData,
    addBreadcrumbStructuredData,
    addStructuredData,
    removeStructuredData
  }
}
