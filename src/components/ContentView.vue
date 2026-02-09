<script setup lang="ts">
import { computed } from 'vue'
import type { Page, ParsedBlock } from '../types'

const props = defineProps<{
  activePage: Page | null
  currentBlocks: ParsedBlock[]
  allPages: Page[]
}>()

const emit = defineEmits<{
  'selectPage': [page: Page]
}>()


// Simplified Copy Function
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

// Strict Markdown Segment Parsing
const getParsedSegments = (content: string) => {
  const lines = content.split('\n')
  const segments: { type: 'text' | 'code' | 'h3' | 'list' | 'card', content: string | string[], cardType?: 'reference' | 'tip' | 'warning' }[] = []
  
  let inCodeBlock = false
  let currentCodeLines: string[] = []
  let currentListItems: string[] = []
  let currentCardLines: string[] = []
  let currentCardType: 'reference' | 'tip' | 'warning' | null = null

  const flushCode = () => {
    if (currentCodeLines.length > 0) {
      segments.push({ type: 'code', content: currentCodeLines.join('\n') })
      currentCodeLines = []
    }
  }

  const flushList = () => {
    if (currentListItems.length > 0) {
      segments.push({ type: 'list', content:  [...currentListItems] })
      currentListItems = []
    }
  }

  const flushCard = () => {
    if (currentCardLines.length > 0 && currentCardType) {
      segments.push({ 
        type: 'card', 
        content: currentCardLines.join('\n'),
        cardType: currentCardType
      })
      currentCardLines = []
      currentCardType = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // 1. Handle explicit fenced code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        flushCode()
        inCodeBlock = false
      } else {
        flushCode()
        flushList()
        flushCard()
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      currentCodeLines.push(line)
      continue
    }

    // 2. Handle H3 (### Markdown)
    if (trimmed.startsWith('### ')) {
      flushCode()
      flushList()
      flushCard()
      segments.push({ type: 'h3', content: trimmed.substring(4) })
    } 
    // 3. Handle Blockquote Cards (> **Type:** content)
    else if (trimmed.startsWith('> ')) {
      flushCode()
      flushList()
      
      const blockquoteContent = trimmed.substring(2)
      
      // Detect card type from first line
      if (currentCardLines.length === 0) {
        const tipMatch = blockquoteContent.match(/^\*\*Tip:?\*\*/i)
        const warningMatch = blockquoteContent.match(/^\*\*Warning:?\*\*/i)
        const referenceMatch = blockquoteContent.match(/^\*\*Reference:?\*\*/i)
        
        if (tipMatch) {
          currentCardType = 'tip'
        } else if (warningMatch) {
          currentCardType = 'warning'
        } else if (referenceMatch) {
          currentCardType = 'reference'
        }
      }
      
      currentCardLines.push(blockquoteContent)
    }
    // 4. Handle Lists
    else if (trimmed.startsWith('- ')) {
      flushCode()
      flushCard()
      currentListItems.push(trimmed.substring(2))
    }
    // 5. Normal text
    else if (trimmed) {
      flushCode()
      flushList()
      flushCard()
      segments.push({ type: 'text', content: line })
    } else {
      flushCode()
      flushList()
      flushCard()
    }
  }
  
  flushCode()
  flushList()
  flushCard()
  return segments
}


// Inline Markdown Parser (Bold)
const parseMarkdown = (text: string): string => {
  if (!text) return ''
  // Escape HTML first to prevent XSS
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Parse **bold**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  return html
}


// Syntax highlighter
const highlight = (code: string): string => {
  if (!code) return ''
  
  let html = code
  
  // Apply syntax highlighting BEFORE escaping
  // Strings (must come before keywords to avoid conflicts)
  html = html.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '___STRING_START___$1___STRING_END___')
  
  // Comments
  html = html.replace(/(\/\/.*$)/gm, '___COMMENT_START___$1___COMMENT_END___')
  
  // Keywords
  const keywords = /\b(const|let|var|if|else|for|while|do|switch|case|break|continue|function|return|class|extends|new|this|super|import|export|default|true|false|null|undefined|try|catch|finally|throw|async|await|static|typeof|instanceof|void|delete)\b/g
  html = html.replace(keywords, '___KEYWORD_START___$1___KEYWORD_END___')

  // APIs / Objects
  html = html.replace(/\b(console|window|document|fetch|localStorage|JSON|Math|Array|Object|String|Number|Boolean|Date)\b/g, '___BUILTIN_START___$1___BUILTIN_END___')

  // Numbers
  html = html.replace(/\b(\d+(?:\.\d+)?)\b/g, '___NUMBER_START___$1___NUMBER_END___')
  
  // NOW escape HTML entities
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // Replace placeholders with actual HTML tags
  html = html
    .replace(/___STRING_START___/g, '<span class="syntax-string">')
    .replace(/___STRING_END___/g, '</span>')
    .replace(/___COMMENT_START___/g, '<span class="syntax-comment">')
    .replace(/___COMMENT_END___/g, '</span>')
    .replace(/___KEYWORD_START___/g, '<span class="syntax-keyword">')
    .replace(/___KEYWORD_END___/g, '</span>')
    .replace(/___BUILTIN_START___/g, '<span class="syntax-built-in">')
    .replace(/___BUILTIN_END___/g, '</span>')
    .replace(/___NUMBER_START___/g, '<span class="syntax-number">')
    .replace(/___NUMBER_END___/g, '</span>')

  return html
}

// Navigation Logic
const currentIndex = computed(() => {
  if (!props.activePage || props.allPages.length === 0) return -1
  return props.allPages.findIndex(p => p.slug === props.activePage?.slug)
})

const prevPage = computed(() => {
  if (currentIndex.value > 0) return props.allPages[currentIndex.value - 1]
  return null
})

const nextPage = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < props.allPages.length - 1) return props.allPages[currentIndex.value + 1]
  return null
})

</script>

<template>
  <!-- Semantic main content area -->
  <main class="main-content" role="main" aria-label="JavaScript reference content">
    <template v-if="activePage">
      <header class="content-header">
        <h1>{{ activePage.title }}</h1>
        <div v-if="activePage.reference" class="concept-ref">
          <a 
            :href="activePage.reference" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View MDN documentation for this topic"
          >
            MDN Reference &rarr;
          </a>
        </div>
      </header>
      
      <article class="content-body">
        <section 
          v-for="(block, idx) in currentBlocks" 
          :key="idx" 
          class="concept-block"
          :aria-labelledby="block.title ? `heading-${idx}` : undefined"
        >
          <div v-if="block.title" class="concept-header">
            <h2 :id="`heading-${idx}`" class="concept-title">{{ block.title }}</h2>
          </div>
          <div class="concept-content">
            <!-- Render parsed segments -->
            <template v-for="(segment, segIdx) in getParsedSegments(block.body)" :key="segIdx">
              <!-- H3 Subheading -->
              <h3 v-if="segment.type === 'h3'" class="sub-heading">
                {{ segment.content }}
              </h3>

              <!-- Code block -->
              <div v-else-if="segment.type === 'code'" class="code-container">
                <header class="code-header">
                  <span class="code-lang">javascript</span>
                  <button 
                    class="copy-btn" 
                    @click="copyToClipboard(segment.content as string)"
                    aria-label="Copy code to clipboard"
                  >
                    Copy
                  </button>
                </header>
                <pre 
                  class="code-snippet" 
                  v-html="highlight(segment.content as string)"
                ></pre>
              </div>

              <!-- List -->
              <ul v-else-if="segment.type === 'list'" class="concept-list">
                <li 
                  v-for="(item, itemIdx) in (segment.content as string[])" 
                  :key="itemIdx"
                  v-html="parseMarkdown(item)"
                ></li>
              </ul>

              <!-- Info Cards -->
              <div 
                v-else-if="segment.type === 'card'" 
                :class="['info-card', `info-card--${segment.cardType}`]"
                role="note"
              >
                <div class="info-card__icon">
                  <!-- Reference Icon -->
                  <svg v-if="segment.cardType === 'reference'" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
                  </svg>
                  <!-- Tip Icon -->
                  <svg v-else-if="segment.cardType === 'tip'" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1.5 15h-3v-1.5h3V15zm0-3h-3V5h3v7z"/>
                  </svg>
                  <!-- Warning Icon -->
                  <svg v-else-if="segment.cardType === 'warning'" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0L0 18h20L10 0zm1 14H9v-2h2v2zm0-4H9V6h2v4z"/>
                  </svg>
                </div>
                <div class="info-card__content" v-html="parseMarkdown(segment.content as string)"></div>
              </div>

              <!-- Normal text line -->
              <p v-else class="text-line" v-html="parseMarkdown(segment.content as string)"></p>
            </template>
          </div>
        </section>
      </article>
      
      <!-- Page Footer -->
      <footer class="page-footer" v-if="activePage">
        <!-- Navigation -->
        <div class="footer-nav">
          <button 
            v-if="prevPage"
            @click="emit('selectPage', prevPage)"
            class="nav-button prev-button"
          >
            <span class="nav-label">Previous page</span>
            <span class="nav-title">{{ prevPage.title }}</span>
          </button>
          <div v-else class="nav-spacer"></div>
          
          <button 
            v-if="nextPage"
            @click="emit('selectPage', nextPage)"
            class="nav-button next-button"
          >
            <span class="nav-label">Next page</span>
            <span class="nav-title">{{ nextPage.title }}</span>
          </button>
          <div v-else class="nav-spacer"></div>
        </div>
        
        <!-- Action Links -->
        <div class="footer-actions">
          <a 
            href="https://github.com/ishicodespace/JavaScript-CheatSheet/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            class="action-link"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
            </svg>
            <span>Do you see a bug? <strong>open an issue on GitHub</strong></span>
          </a>
        </div>
      </footer>
    </template>
    <template v-else>
      <div class="empty-state" role="status">Select a topic.</div>
    </template>
  </main>
</template>

<style scoped>
/* Screen reader only class for accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Page Footer */
.page-footer {
  margin-top: var(--space-2xl);
  padding-top: var(--space-2xl);
  border-top: 1px solid var(--border-subtle);
  max-width: 900px;
}

.footer-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.concept-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.text-line {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  padding: 0;
}

.sub-heading {
  font-size: 20px;
  font-weight: 600;
  color: var(--accent-primary);
  margin-top: var(--space-lg);
  margin-bottom: var(--space-xs);
  letter-spacing: -0.01em;
}

.code-container {
  margin: var(--space-md) 0;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-default);
  background: var(--bg-elevated);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-subtle);
}

.code-lang {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--text-tertiary);
  font-weight: 700;
  letter-spacing: 0.1em;
}

.copy-btn {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  padding: 4px 10px;
  font-size: 11px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-emphasis);
}

.code-snippet {
  margin: 0;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.nav-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: var(--space-md) var(--space-lg);
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
}

.next-button {
  align-items: flex-end;
  text-align: right;
}

.nav-button:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-emphasis);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.nav-label {
  font-size: 12px;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.nav-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.nav-spacer {
  /* Empty space for alignment */
}

.footer-actions {
  padding: var(--space-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

.action-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.action-link:hover {
  color: var(--text-primary);
}

.action-link strong {
  color: var(--info);
  font-weight: 600;
}

.action-link:hover strong {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .footer-nav {
    grid-template-columns: 1fr;
  }
  
  .next-button {
    align-items: flex-start;
    text-align: left;
  }
}

/* List Styles */
.concept-list {
  margin: var(--space-sm) 0;
  padding-left: var(--space-lg);
  list-style-type: none;
}

.concept-list li {
  position: relative;
  padding-left: var(--space-md);
  margin-bottom: var(--space-xs);
  line-height: 1.6;
  color: var(--text-secondary);
}

.concept-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--accent-primary);
  font-weight: bold;
}

.concept-list li strong {
  color: var(--text-primary);
  font-weight: 600;
}

/* Info Cards */
.info-card {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-lg);
  margin: var(--space-md) 0;
  border-radius: var(--radius-md);
  border-left: 4px solid;
  background: var(--bg-elevated);
  transition: all 0.2s;
}

.info-card__icon {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.info-card__content {
  flex: 1;
  line-height: 1.6;
  color: var(--text-secondary);
}

.info-card__content strong {
  color: var(--text-primary);
  font-weight: 600;
  display: block;
  margin-bottom: var(--space-xs);
}

/* Reference Card - Blue */
.info-card--reference {
  border-left-color: var(--info);
  background: rgba(88, 166, 255, 0.05);
}

.info-card--reference .info-card__icon {
  color: var(--info);
}

/* Tip Card - Green */
.info-card--tip {
  border-left-color: var(--success);
  background: rgba(63, 185, 80, 0.05);
}

.info-card--tip .info-card__icon {
  color: var(--success);
}

/* Warning Card - Yellow/Orange */
.info-card--warning {
  border-left-color: var(--warning);
  background: rgba(210, 153, 34, 0.05);
}

.info-card--warning .info-card__icon {
  color: var(--warning);
}

.info-card:hover {
  transform: translateX(2px);
  box-shadow: var(--shadow-md);
}
</style>
