<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import type { ParsedBlock } from '../types'

const props = defineProps<{
  blocks: ParsedBlock[]
}>()

const activeId = ref<string>('')

// Extract headings from blocks
const headings = computed(() => {
  return props.blocks
    .map((block, idx) => ({
      id: `heading-${idx}`,
      title: block.title,
      level: 2
    }))
    .filter(h => h.title)
})

// Scroll to section
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Track active section on scroll
const updateActiveSection = () => {
  const headingElements = headings.value.map(h => document.getElementById(h.id)).filter(Boolean)
  
  for (let i = headingElements.length - 1; i >= 0; i--) {
    const element = headingElements[i]
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 100) {
        activeId.value = element.id
        return
      }
    }
  }
  
  if (headingElements.length > 0 && headingElements[0]) {
    activeId.value = headingElements[0].id
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection, true)
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection, true)
})

watch(() => props.blocks, () => {
  updateActiveSection()
})
</script>

<template>
  <aside class="toc-sidebar" v-if="headings.length > 0">
    <div class="toc-container">
      <h3 class="toc-title">On this page</h3>
      <nav class="toc-nav">
        <ul class="toc-list">
          <li 
            v-for="heading in headings" 
            :key="heading.id"
            class="toc-item"
          >
            <a 
              :href="`#${heading.id}`"
              :class="['toc-link', { active: activeId === heading.id }]"
              @click.prevent="scrollToSection(heading.id)"
            >
              {{ heading.title }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.toc-sidebar {
  position: sticky;
  top: 80px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: var(--space-xl) var(--space-lg);
  border-left: 1px solid var(--border-subtle);
}

.toc-container {
  max-width: 240px;
}

.toc-title {
  font-size: 13px;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--text-tertiary);
  margin-bottom: var(--space-md);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: 8px;
}

.toc-link {
  display: block;
  padding: 6px 0;
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  line-height: 1.4;
}

.toc-link:hover {
  color: var(--text-primary);
}

.toc-link.active {
  color: var(--accent-primary);
  font-weight: var(--weight-bold);
}

/* Hide on smaller screens */
@media (max-width: 1200px) {
  .toc-sidebar {
    display: none;
  }
}
</style>
