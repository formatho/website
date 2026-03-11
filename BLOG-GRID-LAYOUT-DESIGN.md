# Blog Grid Layout Design

## Current Layout (Vertical List)
```
┌─────────────────────────────────────────────────────────────────┐
│ Blog Page                                                      │
├─────────────────────────────────────────────────────────────────┤
│ Header (Blog title, description)                               │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Image 1/3] [Content 2/3 - Title, excerpt, tags, link]  │ │ ← Post 1
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Image 1/3] [Content 2/3 - Title, excerpt, tags, link]  │ │ ← Post 2
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Image 1/3] [Content 2/3 - Title, excerpt, tags, link]  │ │ ← Post 3
│ └─────────────────────────────────────────────────────────────┘ │
│ (continues vertically)                                         │
├─────────────────────────────────────────────────────────────────┤
│ Newsletter Signup                                              │
└─────────────────────────────────────────────────────────────────┘
```

## Proposed Grid Layout

### Mobile (< 768px) - 1 Column
```
┌─────────────────────────────────────────────────────────────────┐
│ Blog                                                          │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                      [Featured Image]                      │ │
│ │ ───────────────────────────────────────────────────────────  │ │
│ │ 📅 March 9, 2026  ⏱️ 7 min                             │ │
│ │ Title: India's #1 Privacy-First Toolkit                    │ │
│ │ Excerpt: Discover how Formatho became India's leading...    │ │
│ │ [#Privacy] [#Developer] [#Security]                        │ │
│ │                      Read More →                           │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                      [Featured Image]                      │ │
│ │ ───────────────────────────────────────────────────────────  │ │
│ │ 📅 March 9, 2026  ⏱️ 5 min                             │ │
│ │ Title: Generate UUIDs Without Internet                     │ │
│ │ Excerpt: Create UUIDs completely offline in your browser...  │ │
│ │ [#Privacy] [#Tools] [#Offline]                            │ │
│ │                      Read More →                           │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ (continues)                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1024px) - 2 Columns
```
┌─────────────────────────────────────────────────────────────────┐
│ Blog                                                          │
├─────────────────────────────────────────────────────────────────┤
│ ┌───────────────────┐  ┌───────────────────┐               │
│ │   [Featured Img]   │  │   [Featured Img]   │               │
│ │   ─────────────   │  │   ─────────────   │               │
│ │   Title 1         │  │   Title 2         │               │
│ │   Excerpt...      │  │   Excerpt...      │               │
│ │   Tags...         │  │   Tags...         │               │
│ │   Read More →     │  │   Read More →     │               │
│ └───────────────────┘  └───────────────────┘               │
│ ┌───────────────────┐  ┌───────────────────┐               │
│ │   [Featured Img]   │  │   [Featured Img]   │               │
│ │   ─────────────   │  │   ─────────────   │               │
│ │   Title 3         │  │   Title 4         │               │
│ │   Excerpt...      │  │   Excerpt...      │               │
│ │   Tags...         │  │   Tags...         │               │
│ │   Read More →     │  │   Read More →     │               │
│ └───────────────────┘  └───────────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

### Desktop (> 1024px) - 3 Columns
```
┌─────────────────────────────────────────────────────────────────┐
│ Blog                                                          │
├─────────────────────────────────────────────────────────────────┤
│ ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│ │  [Image]    │  │  [Image]    │  │  [Image]    │             │
│ │  ────────   │  │  ────────   │  │  ────────   │             │
│ │  Title 1    │  │  Title 2    │  │  Title 3    │             │
│ │  Excerpt... │  │  Excerpt... │  │  Excerpt... │             │
│ │  Tags...    │  │  Tags...    │  │  Tags...    │             │
│ │  Read →     │  │  Read →     │  │  Read →     │             │
│ └────────────┘  └────────────┘  └────────────┘             │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│ │  [Image]    │  │  [Image]    │  │  [Image]    │             │
│ │  ────────   │  │  ────────   │  │  ────────   │             │
│ │  Title 4    │  │  Title 5    │  │  Title 6    │             │
│ │  Excerpt... │  │  Excerpt... │  │  Excerpt... │             │
│ │  Tags...    │  │  Tags...    │  │  Tags...    │             │
│ │  Read →     │  │  Read →     │  │  Read →     │             │
│ └────────────┘  └────────────┘  └────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## Design Specifications

### Grid System

```css
/* Mobile: 1 column (default) */
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Card Design (Vertical Layout)

```html
<article class="glass-card overflow-hidden hover:border-primary/50 transition-all group flex flex-col">
  <!-- Image (Top, full width) -->
  <div class="aspect-video overflow-hidden">
    <img
      :src="post.image"
      :alt="post.imageAlt || post.title"
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
    />
  </div>

  <!-- Content (Bottom, flex to push link to bottom) -->
  <div class="flex-1 p-6 flex flex-col">
    <!-- Meta -->
    <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
      <div class="flex items-center gap-1">
        <Calendar class="w-4 h-4" />
        {{ formatDate(post.date) }}
      </div>
      <div class="flex items-center gap-1">
        <Clock class="w-4 h-4" />
        {{ post.readTime }}
      </div>
    </div>

    <!-- Title -->
    <RouterLink :to="`/blogs/${post.slug}`">
      <h2 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {{ post.title }}
      </h2>
    </RouterLink>

    <!-- Excerpt -->
    <p class="text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
      {{ post.excerpt }}
    </p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="tag in post.tags.slice(0, 3)"
        :key="tag"
        class="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
      >
        <Tag class="w-3 h-3" />
        {{ tag }}
      </span>
      <span v-if="post.tags.length > 3" class="text-xs text-muted-foreground">
        +{{ post.tags.length - 3 }}
      </span>
    </div>

    <!-- Read More Link (Always at bottom) -->
    <RouterLink
      :to="`/blogs/${post.slug}`"
      class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
    >
      Read More
      <ArrowRight class="w-4 h-4" />
    </RouterLink>
  </div>
</article>
```

### Key Changes

1. **Card Orientation**: Horizontal → Vertical
   - Image on top (aspect-video for consistency)
   - Content below

2. **Grid Layout**: 1 column → Responsive grid
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 3 columns

3. **Content Truncation**: Added line-clamp
   - Title: max 2 lines
   - Excerpt: max 3 lines
   - Tags: max 3 visible

4. **Flex Layout**: Card uses flex column
   - Content fills available space
   - "Read More" link always at bottom

5. **Hover Effects**: Maintained
   - Border color change
   - Image scale effect

### Typography Adjustments

- **Title size**: `text-2xl` → `text-xl` (smaller in grid cards)
- **Read More**: Added `mt-auto` to push to bottom

## Benefits

✅ **Better Space Utilization**: 3x more content visible on desktop
✅ **Modern Design**: Standard blog grid pattern
✅ **Responsive**: Works on all screen sizes
✅ **Visual Consistency**: Equal card heights in each row
✅ **Maintained Features**: Glass cards, hover effects, metadata
✅ **Better UX**: Users can scan more articles quickly

## Implementation Checklist

- [ ] Update grid container with responsive breakpoints
- [ ] Change card layout from horizontal to vertical
- [ ] Update image container to aspect-video
- [ ] Add line-clamp utilities for text truncation
- [ ] Update typography for grid cards
- [ ] Add flex layout to push "Read More" to bottom
- [ ] Test on mobile (375px, 414px)
- [ ] Test on tablet (768px, 820px)
- [ ] Test on desktop (1024px, 1280px, 1440px)
- [ ] Verify hover effects and transitions
- [ ] Check glass card styling
- [ ] Ensure all 37 posts display correctly

---

**Status**: Design Complete - Awaiting Approval
**Created**: March 11, 2026
**Priority**: High
