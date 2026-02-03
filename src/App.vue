<script setup lang="ts">
import { ref, computed } from 'vue'
import { cheatsheet } from './data'
import type { Page, ParsedBlock } from './types'
import Sidebar from './components/Sidebar.vue'
import ContentView from './components/ContentView.vue'

const searchQuery = ref('')
const activePage = ref<Page | null>(null)
const cheatsheetData = cheatsheet as any; // Handle loose typing from data.ts


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
  let isFirstBlock = true

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const nextLine = lines[i + 1]

    // Detect Header (line followed by dashes)
    if (nextLine && nextLine.trim().startsWith('---')) {
      if (currentBlock.content.length > 0 || currentBlock.title) {
        blocks.push({
          title: currentBlock.title,
          body: currentBlock.content.join('\n').trim()
        })
      }
      
      currentBlock = { title: line.trim(), content: [] }
      isFirstBlock = false
      i++ // Skip dashes line
    } else {
      if (isFirstBlock && currentBlock.title === '' && !line.trim().startsWith('---')) {
        currentBlock.content.push(line)
      } else {
        currentBlock.content.push(line)
      }
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
    <!-- Semantic HTML for better SEO -->
    <Sidebar
      v-model:search="searchQuery"
      :filtered-structure="filteredStructure"
      :active-page="activePage"
      @select-page="selectPage"
    />
    
    <ContentView
      :active-page="activePage"
      :current-blocks="currentBlocks"
    />
  </div>
</template>
