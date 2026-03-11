# Task: Implement Blog Grid Layout

## Task Details

**Title**: Implement Blog Grid Layout
**Priority**: High
**Status**: Pending Approval
**Created**: March 11, 2026
**Project**: website

## Description

Update the blog page from vertical list layout to responsive grid layout for improved user experience and better space utilization on larger screens.

## Current State

- Blog posts displayed in vertical single-column list
- Each post is a horizontal card with image (1/3 width) + content (2/3 width)
- Posts stacked vertically with `gap-8`
- All 37 posts listed sequentially
- File: `src/views/BlogsView.vue`

## Requirements

### Design
- Responsive grid layout for desktop and mobile
- Mobile: 1 column (maintain readability)
- Tablet: 2 columns (768px - 1024px)
- Desktop: 3 columns (> 1024px)
- Vertical card layout (image top, content below)
- Maintain glass-card styling and hover effects
- Keep all existing metadata (date, read time, tags)

### Features to Preserve
- Glass card design
- Hover border effect
- Image scale on hover
- Date and read time metadata
- Tags display
- Read More link with arrow icon
- Newsletter signup section

### New Features
- Line clamping for titles (2 lines max)
- Line clamping for excerpts (3 lines max)
- Limit tags to 3 visible (+X more indicator)
- Equal card heights using flex layout

## Implementation Plan

### Phase 1: Design Review ✅
- [x] Create design mockup document
- [x] Define breakpoints
- [x] Specify card layout changes
- [x] Document benefits and checklist
- [ ] Get approval from stakeholder

### Phase 2: Implementation
- [ ] Update grid container with responsive Tailwind classes
- [ ] Change card from flex-row to flex-col
- [ ] Update image container to aspect-video ratio
- [ ] Add line-clamp classes to title and excerpt
- [ ] Limit tags display to 3 items
- [ ] Adjust typography for grid cards (smaller title)
- [ ] Add flex layout to push "Read More" to bottom

### Phase 3: Testing
- [ ] Test mobile view (iPhone SE, iPhone 12, iPhone 14)
- [ ] Test tablet view (iPad, iPad Pro)
- [ ] Test desktop view (1024px, 1280px, 1440px, 1920px)
- [ ] Verify hover effects work correctly
- [ ] Check glass card styling in grid
- [ ] Ensure all 37 posts display properly
- [ ] Test responsive breakpoints
- [ ] Verify transitions and animations

### Phase 4: Review & Deploy
- [ ] Code review
- [ ] Update documentation
- [ ] Create git commit
- [ ] Deploy to staging for final review
- [ ] Deploy to production

## Expected Outcome

- **Improved UX**: Users can scan 3x more articles on desktop
- **Modern Design**: Standard blog grid layout pattern
- **Better Space Utilization**: More content visible above fold
- **Responsive**: Works seamlessly on all devices
- **Maintained Quality**: All existing features and styling preserved

## Timeline Estimate

- Design Approval: 1 day
- Implementation: 2-3 hours
- Testing: 1-2 hours
- Review & Deploy: 1-2 hours

**Total**: 1-2 days

## Notes

- Priority is high as this improves first impressions
- Current vertical layout works but isn't optimal for larger screens
- Grid layout is industry standard for blog pages
- Will improve bounce rate and engagement

## Related Files

- Design: `BLOG-GRID-LAYOUT-DESIGN.md`
- Component: `src/views/BlogsView.vue`
- Data: `src/data/blogPosts.ts`
- Router: `src/router/index.ts`

---

**Last Updated**: March 11, 2026
**Status**: Awaiting Design Approval
