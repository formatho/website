<template>
  <section class="social-proof">
    <div class="container">
      <h2 class="section-title">
        <span class="highlight">50+ Developers</span> Already Shipping Faster
      </h2>
      
      <div class="stats-row">
        <div class="stat">
          <div class="stat-number">
            <CountUp :end-val="agentsCreated" :duration="2" />
          </div>
          <div class="stat-label">Agents Created</div>
        </div>
        <div class="stat">
          <div class="stat-number">
            <CountUp :end-val="tasksCompleted" :duration="2" suffix="K+" />
          </div>
          <div class="stat-label">Tasks Completed</div>
        </div>
        <div class="stat">
          <div class="stat-number">
            <CountUp :end-val="hoursSaved" :duration="2" suffix="K+" />
          </div>
          <div class="stat-label">Hours Saved</div>
        </div>
      </div>

      <div class="testimonials-grid">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
          <div class="stars">
            <span v-for="n in 5" :key="n" class="star">⭐</span>
          </div>
          <p class="quote">"{{ testimonial.quote }}"</p>
          <div class="author">
            <div class="avatar">{{ testimonial.initials }}</div>
            <div class="info">
              <div class="name">{{ testimonial.name }}</div>
              <div class="role">{{ testimonial.role }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="companies">
        <p class="companies-text">Developers from leading companies trust Formatho</p>
        <div class="company-logos">
          <span v-for="company in companies" :key="company" class="company-badge">
            {{ company }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CountUp from 'vue-countup-v3'

const agentsCreated = ref(234)
const tasksCompleted = ref(45)
const hoursSaved = ref(120)

const testimonials = ref([
  {
    id: 1,
    quote: "Cut my development time by 60%. The parallel execution is incredible.",
    name: "John D.",
    role: "Senior Developer at Tech Startup",
    initials: "JD"
  },
  {
    id: 2,
    quote: "Finally, AI agents that actually work together. Game changer for our workflow.",
    name: "Sarah M.",
    role: "Tech Lead at SaaS Company",
    initials: "SM"
  },
  {
    id: 3,
    quote: "We automated 80% of our code reviews in one week. The ROI is insane.",
    name: "Mike R.",
    role: "Engineering Manager",
    initials: "MR"
  }
])

const companies = ref([
  'Google',
  'Microsoft',
  'Amazon',
  'Meta',
  'Stripe',
  'Vercel'
])

onMounted(async () => {
  try {
    const response = await fetch('/api/stats/social-proof')
    if (response.ok) {
      const stats = await response.json()
      agentsCreated.value = stats.agentsCreated
      tasksCompleted.value = stats.tasksCompleted
      hoursSaved.value = stats.hoursSaved
    }
  } catch (error) {
    // Use default values if API fails
  }
})
</script>

<style scoped>
.social-proof {
  padding: 80px 0;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 36px;
  color: #1f2937;
  margin: 0 0 50px 0;
}

.highlight {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 60px;
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 16px;
  color: #6b7280;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.testimonial-card {
  padding: 30px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.stars {
  margin-bottom: 16px;
}

.star {
  font-size: 18px;
  margin-right: 2px;
}

.quote {
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
  margin: 0 0 20px 0;
}

.author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.info {
  flex: 1;
}

.name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.role {
  font-size: 13px;
  color: #6b7280;
}

.companies {
  text-align: center;
  padding-top: 40px;
  border-top: 1px solid #e5e7eb;
}

.companies-text {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 20px 0;
}

.company-logos {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.company-badge {
  padding: 10px 20px;
  background: #f3f4f6;
  border-radius: 20px;
  font-size: 14px;
  color: #4b5563;
  font-weight: 500;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
  }

  .stats-row {
    flex-direction: column;
    gap: 40px;
  }

  .stat-number {
    font-size: 36px;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
