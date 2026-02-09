<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { cheatsheet } from './data'
import type { Page, ParsedBlock } from './types'
import Sidebar from './components/Sidebar.vue'
import ContentView from './components/ContentView.vue'
import TableOfContents from './components/TableOfContents.vue'

const searchQuery = ref('')
const activePage = ref<Page | null>(null)
const cheatsheetData = cheatsheet as any

// Theme management
const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Load theme from localStorage on mount
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  isDark.value = savedTheme === 'dark'
  document.documentElement.setAttribute('data-theme', savedTheme)
})

// Mobile menu state
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}



// Convert object to array for easier filtering
const categories = computed(() => {
  return Object.keys(cheatsheetData).map(key => ({
    id: key,
    ...cheatsheetData[key]
  }))
})

// Filter categories and pages based on search
const filteredStructure = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return categories.value

  return categories.value.map(cat => {
    const matchingPages = cat.pages.filter((page: any) => {
      const inTitle = page.title.toLowerCase().includes(query)
      const inContent = page.content.toLowerCase().includes(query)
      return inTitle || inContent
    })

    if (matchingPages.length > 0) {
      return { ...cat, pages: matchingPages }
    }
    return null
  }).filter(cat => cat !== null)
})

// Parse content into blocks
const parseContent = (contentString: string): ParsedBlock[] => {
  if (!contentString) return []
  
  const lines = contentString.split('\n')
  const blocks: ParsedBlock[] = []
  let currentBlock = { title: '', content: [] as string[] }
  let inCodeBlock = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    
    // Toggle code block status to avoid parsing headers inside code
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock
    }

    if (!inCodeBlock && trimmed.startsWith('### ')) {
      // Push previous block if it has content
      if (currentBlock.content.length > 0 || currentBlock.title) {
        blocks.push({
          title: currentBlock.title,
          body: currentBlock.content.join('\n').trim()
        })
      }
      
      // Start new block with this header
      currentBlock = { title: trimmed.substring(4).trim(), content: [] }
    } else {
      // Regular content
      currentBlock.content.push(line)
    }
  }

  // Push final block
  if (currentBlock.content.length > 0 || currentBlock.title) {
    blocks.push({
      title: currentBlock.title,
      body: currentBlock.content.join('\n').trim()
    })
  }

  return blocks
}

const currentBlocks = computed(() => {
  if (!activePage.value) return []
  return parseContent(activePage.value.content)
})

const selectPage = (page: Page) => {
  activePage.value = page
  // Update browser tab title
  document.title = `${page.title} - JavaScript Cheatsheet`
}

// Initialize with first page
if (categories.value.length > 0 && categories.value[0].pages.length > 0) {
  selectPage(categories.value[0].pages[0])
}
</script>

<template>
  <div class="app-container">
    <!-- Mobile Header (visible only on mobile) -->
    <header class="mobile-header">
      <button 
        @click="toggleMobileMenu" 
        class="hamburger-btn"
        aria-label="Toggle navigation menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      
      <div class="mobile-header-actions">
        <button 
          @click="toggleTheme" 
          class="theme-toggle-mobile"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </button>
        
        <a 
          href="https://github.com/ishicodespace/JavaScript-CheatSheet" 
          target="_blank" 
          rel="noopener noreferrer"
          class="github-link-mobile"
          aria-label="View GitHub repository"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </header>

    <!-- Mobile Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="mobile-overlay"
      @click="closeMobileMenu"
    ></div>

    <!-- Semantic HTML for better SEO -->
    <Sidebar
      v-model:search="searchQuery"
      :filtered-structure="filteredStructure"
      :active-page="activePage"
      :class="{ 'sidebar--mobile-open': isMobileMenuOpen }"
      @select-page="(page) => { selectPage(page); closeMobileMenu(); }"
    </Sidebar>
    
    <div class="main-container">
      <!-- Header with Theme Toggle and Profile -->
      <header class="top-header">
        <div class="header-actions">
          <button 
            @click="toggleTheme" 
            class="theme-toggle"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>
          
          <a 
            href="https://github.com/ishicodespace/JavaScript-CheatSheet" 
            target="_blank" 
            rel="noopener noreferrer"
            class="github-link"
            aria-label="View GitHub profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </header>
      
      <!-- Content with TOC Grid -->
      <div class="content-grid">
        <ContentView
          :active-page="activePage"
          :current-blocks="currentBlocks"
          :all-pages="categories.flatMap(cat => cat.pages)"
          @select-page="selectPage"
        />
        
        <!-- Right Table of Contents -->
        <TableOfContents :blocks="currentBlocks" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 0;
  flex: 1;
  overflow: hidden;
}

@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.top-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 24px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-subtle);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-toggle {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle:hover {
  background: var(--bg-elevated);
  border-color: var(--border-emphasis);
  color: var(--text-primary);
  transform: scale(1.05);
}

.github-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.github-link:hover {
  background: var(--bg-elevated);
  border-color: var(--border-emphasis);
  color: var(--text-primary);
  transform: scale(1.05);
}

/* Hide desktop header on mobile */
@media (max-width: 768px) {
  .top-header {
    display: none !important;
  }
}
</style>
