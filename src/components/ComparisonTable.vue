<template>
  <section class="comparison-table">
    <div class="container">
      <h2>Why Developers Choose Formatho</h2>
      <p class="subtitle">See how we stack up against the competition</p>
      
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th class="feature-col">Feature</th>
              <th class="formatho-col">
                <div class="header-badge">
                  <span class="recommended">✨ Recommended</span>
                  <span class="name">Formatho</span>
                </div>
              </th>
              <th>Competitor A</th>
              <th>Competitor B</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in comparisonData" :key="row.feature">
              <td class="feature-col">{{ row.feature }}</td>
              <td class="formatho-col">
                <span v-if="row.formatho === true" class="check">✓</span>
                <span v-else-if="row.formatho === false" class="cross">✗</span>
                <span v-else class="text">{{ row.formatho }}</span>
              </td>
              <td>
                <span v-if="row.competitorA === true" class="check">✓</span>
                <span v-else-if="row.competitorA === false" class="cross">✗</span>
                <span v-else class="text">{{ row.competitorA }}</span>
              </td>
              <td>
                <span v-if="row.competitorB === true" class="check">✓</span>
                <span v-else-if="row.competitorB === false" class="cross">✗</span>
                <span v-else class="text">{{ row.competitorB }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const comparisonData = ref([
  {
    feature: 'Parallel Agent Execution',
    formatho: true,
    competitorA: '3 max',
    competitorB: false
  },
  {
    feature: 'Model Switching',
    formatho: true,
    competitorA: false,
    competitorB: 'Limited'
  },
  {
    feature: 'Agent Pools',
    formatho: true,
    competitorA: false,
    competitorB: false
  },
  {
    feature: 'API Access',
    formatho: true,
    competitorA: true,
    competitorB: 'Enterprise Only'
  },
  {
    feature: 'Priority Support',
    formatho: true,
    competitorA: 'Extra $20/mo',
    competitorB: 'Enterprise Only'
  },
  {
    feature: 'Free Tier',
    formatho: '5 agents',
    competitorA: false,
    competitorB: '3 agents'
  },
  {
    feature: 'Monthly Price',
    formatho: '$29',
    competitorA: '$49',
    competitorB: '$99'
  },
  {
    feature: 'Annual Discount',
    formatho: '20% off',
    competitorA: '10% off',
    competitorB: false
  },
  {
    feature: 'Beta Program Benefits',
    formatho: '6 months free',
    competitorA: false,
    competitorB: '1 month free'
  }
])
</script>

<style scoped>
.comparison-table {
  padding: 80px 0;
  background: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h2 {
  text-align: center;
  font-size: 36px;
  color: #1f2937;
  margin: 0 0 10px 0;
}

.subtitle {
  text-align: center;
  font-size: 18px;
  color: #6b7280;
  margin: 0 0 50px 0;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

thead {
  background: #f3f4f6;
}

th {
  padding: 20px 24px;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

td {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 15px;
}

.feature-col {
  font-weight: 500;
  color: #1f2937;
}

.formatho-col {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
}

.header-badge {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.recommended {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
}

.name {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.check {
  color: #10b981;
  font-size: 20px;
  font-weight: bold;
}

.cross {
  color: #ef4444;
  font-size: 20px;
  font-weight: bold;
}

.text {
  color: #6b7280;
}

tbody tr:hover {
  background: #f9fafb;
}

tbody tr:hover .formatho-col {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

@media (max-width: 768px) {
  h2 {
    font-size: 28px;
  }

  th, td {
    padding: 12px 16px;
    font-size: 14px;
  }

  .recommended {
    font-size: 9px;
  }

  .name {
    font-size: 16px;
  }
}
</style>
