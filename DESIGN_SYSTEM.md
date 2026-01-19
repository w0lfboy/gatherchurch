# Parish Center - Design System & Branding Suite

**Version:** 2.0.0  
**Last Updated:** January 2026  
**Status:** Active Design System  
**Design Lead:** TAYLOR FLETCHER  
**Purpose:** Comprehensive branding and design system for developer reference  
**Brand Name:** Parish Center

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
   - [The "Flow" (Behavior & Usability)](#1-the-flow-behavior--usability)
   - [The "Look" (Visual Clarity)](#2-the-look-visual-clarity)
   - [The "Emotion" (Psychological Impact)](#3-the-emotion-psychological-impact)
   - [Modern Industry Terms (2025 Context)](#4-modern-industry-terms-2025-context)
2. [Parish Center Brand Identity](#2-parish-center-brand-identity)
3. [Design System: Parish Center](#3-design-system-parish-center)
4. [Wireframe Specifications](#4-wireframe-specifications)
5. [Market Positioning](#5-market-positioning)
6. [Design Rules & Guidelines](#6-design-rules--guidelines)
7. [Experience Summary](#7-experience-summary)
8. [Implementation Notes](#8-implementation-notes)

---

## 1. Design Philosophy

### The Experience Framework

Our design philosophy is organized around four pillars: **Flow** (Behavior & Usability), **Look** (Visual Clarity), **Emotion** (Psychological Impact), and **Modern Principles** (2025 Context).

---

### 1. The "Flow" (Behavior & Usability)

How users move through the app should be **frictionless**, **fluid**, **anticipatory**, **forgiving**, **responsive**, and **linear**.

#### Frictionless
**Zero barriers from intent to action.** The user flows from intent to action without hesitation. Every interaction removes unnecessary steps and eliminates stopping points.

- **Single-tap actions** for common tasks (e.g., check-in with one tap)
- **Smart defaults** that pre-fill based on context (e.g., service date defaults to next Sunday)
- **Inline editing** instead of modal forms where possible
- **Bulk operations** for repetitive tasks (e.g., select multiple people, tag all at once)

#### Fluid
**Smooth, continuous movement like water.** Transitions between screens and gestures feel natural and seamless.

- **Swipeable navigation** between tabs and sections
- **Smooth page transitions** (300-400ms, ease-in-out curves)
- **Physics-based animations** that feel natural (momentum scrolling, elastic bounces)
- **Gesture support** where intuitive (swipe to archive, pull-to-refresh)

#### Anticipatory
**The app "knows" what the user wants next.** Reduce decision fatigue by predicting and surfacing the next action.

- **Contextual suggestions** (e.g., "Create service for next Sunday?" appears on Friday)
- **Auto-complete** for common inputs (e.g., person names, song titles)
- **Smart scheduling** that suggests team members based on history and availability
- **Quick actions** surfaced based on user role and current context

#### Forgiving
**Users can make mistakes without panic.** Undo and recovery options are always available.

- **Undo/redo** for destructive actions (delete person, remove assignment)
- **Confirmation dialogs** for irreversible actions with clear consequences
- **Soft delete** (archive) instead of permanent deletion (30-day recovery window)
- **Auto-save** for forms (never lose work due to browser crash or accidental navigation)

#### Responsive
**Instant feedback the millisecond it is touched.** Not just mobile-friendly, but reactive with immediate visual or haptic feedback.

- **Touch feedback** within 100ms (button highlight, ripple effect)
- **Haptic feedback** on mobile (vibration for confirmations, errors)
- **Loading states** for async operations (skeleton screens, progress indicators)
- **Optimistic updates** (UI updates immediately, rolls back on error)

#### Linear
**Step-by-step processes without overwhelming choices.** Complex workflows broken into clear, sequential steps.

- **Multi-step wizards** for complex tasks (e.g., service planning: 1. Create service → 2. Add items → 3. Schedule team)
- **Progress indicators** showing current step and completion
- **One primary action** per screen (clear next step)
- **Progressive disclosure** revealing advanced options only when needed

---

### 2. The "Look" (Visual Clarity)

How the visual design aids understanding should be **uncluttered**, **airy**, **immersive**, **tactile**, and **scannable**.

#### Uncluttered
**Strictly limits visual noise, allowing focus on one primary task at a time.** Every element earns its place.

- **Single focal point** per screen (one primary action, one primary content area)
- **Progressive disclosure** for advanced features (collapsible sections, "Show more" links)
- **Remove decorative elements** that don't serve function
- **Group related content** visually (cards, sections, borders)

#### Airy
**Generous whitespace lets content breathe, reducing cognitive load.** Space is a design element.

- **48px spacing** between major sections
- **24px padding** within cards and components
- **16px gaps** between related items
- **8px tight spacing** for grouped elements (icon + label)

#### Immersive
**The interface disappears, and the content takes center stage.** Users focus on their work, not the tool.

- **Minimal chrome** (header, sidebar are thin, unobtrusive)
- **Full-width content** where appropriate (dashboard cards, service builder)
- **Reduced borders** (use shadows and spacing for separation)
- **Content-first hierarchy** (headings, data, actions are most prominent)

#### Tactile
**Elements look "touchable" with depth, shadows, and physics-based animations.** Digital objects feel real and interactive.

- **Subtle shadows** on cards and buttons (elevation hierarchy)
- **Hover states** that elevate (shadow increases, slight scale)
- **Press states** that depress (scale 0.98, darker color)
- **Depth cues** (layered cards, z-index stacking)

#### Scannable
**Information organized so users understand app state in a single glance.** Clear hierarchy, bold headings, and icons enable quick comprehension.

- **Visual hierarchy** (size, weight, color differentiate importance)
- **Bold headings** for sections (H2, 24px, semibold)
- **Icon + text** for actions (not icon-only where ambiguous)
- **Status indicators** (badges, colors, icons) for quick state recognition

---

### 3. The "Emotion" (Psychological Impact)

The relationship between user and product should feel **empowering**, **delightful**, **transparent**, **obvious**, and **cohesive**.

#### Empowering
**The tool makes users feel smarter and more capable.** Automates the hard stuff so users can be the "hero" of their ministry.

- **AI-powered features** that save time (duplicate detection, smart scheduling)
- **Bulk operations** that handle repetitive work
- **Templates and presets** for common tasks
- **One-click actions** for complex workflows (e.g., "Schedule team for next 4 weeks")

#### Delightful
**Micro-interactions create small moments of joy that break monotony.** Unexpected positive feedback creates emotional connection.

- **Celebration animations** for milestones (e.g., confetti when reaching 100 members)
- **Playful loading states** (e.g., animated icon while processing)
- **Easter eggs** for power users (e.g., keyboard shortcuts, hidden features)
- **Smooth transitions** that feel satisfying (page transitions, state changes)

#### Transparent
**The app communicates clearly what is happening.** Users never feel anxious or lost about system state or progress.

- **Loading indicators** for all async operations ("Uploading 50%...", "Processing...")
- **Status badges** for all states (draft, published, completed, archived)
- **Error messages** that explain what went wrong and how to fix it
- **Audit logs** showing who did what and when (for teams)

#### Obvious
**No instruction manual needed—functionality is self-evident.** The highest compliment for intuitive UX.

- **Clear labels** over icons (when in doubt)
- **Familiar patterns** (tables, forms, cards work as expected)
- **Consistent placement** (actions always in same spot, navigation predictable)
- **Visual affordances** (buttons look clickable, inputs look editable)

#### Cohesive
**Every screen, button, and font feels like it belongs to the same family.** Creates trust and reliability.

- **Consistent color palette** across all modules
- **Unified typography** (same font families, size scales)
- **Shared component library** (buttons, inputs, cards look identical everywhere)
- **Pattern consistency** (same interactions work same way everywhere)

---

### 4. Modern Industry Terms (2025 Context)

#### Cognitive Load
**Minimize the mental processing power needed to use the tool.** Our goal is to reduce cognitive load so users can focus on ministry, not software.

- **Chunking information** into digestible pieces (cards, sections)
- **Removing distractions** (hide unused features, collapsible advanced options)
- **Clear visual hierarchy** (scan, don't read)
- **Contextual help** (tooltips, inline hints, not separate documentation)

#### Progressive Disclosure
**Show only necessary information at first, reveal complex options as users ask.** Complexity is available but not overwhelming.

- **Advanced options hidden** by default ("Show advanced settings")
- **Collapsible sections** for optional features
- **Multi-step wizards** for complex tasks (reveal next step only after completing previous)
- **Contextual menus** (right-click, long-press reveal additional options)

#### Zero-UI (Gesture & Automation)
**Interfaces that rely on gestures, voice, or automation rather than buttons and menus.** Reduce friction through intelligent defaults.

- **Swipe gestures** for common actions (swipe to archive, swipe to confirm)
- **Keyboard shortcuts** for power users (Cmd+K for command palette)
- **Smart defaults** that reduce decisions (auto-fill, suggestions)
- **Automation** for repetitive tasks (recurring services, automated workflows)

#### Ethical Design
**UX that respects user privacy and avoids "dark patterns"** (tricks to make you subscribe or stay online).

- **Clear opt-in/opt-out** for communications (not pre-checked boxes)
- **Transparent pricing** (no hidden fees, clear what's included)
- **Easy cancellation** (no "retention" tricks, one-click cancel)
- **Data ownership** (users can export and delete their data easily)
- **Permission requests** with clear explanation (why we need access)

---

## 2. Parish Center Brand Identity

### Brand Name
**Parish Center**

**Tagline:** "Your Parish Management Platform" or "Manage Your Parish Community"

### Brand Personality

**Core Values:**
- Professional yet approachable
- Organized, structured, reliable
- Community-focused, parish-centered
- Modern, tech-forward
- Respectful of tradition

**Experience Description:**

**Flow (Behavior & Usability):**
- **Frictionless:** Organized workflows, minimal steps from intent to action (e.g., one-tap check-in, smart service templates)
- **Fluid:** Smooth, professional transitions (8px border radius, ease-in-out animations)
- **Forgiving:** Clear error messages, easy undo, soft delete with recovery
- **Linear:** Clear step-by-step onboarding and complex workflows with progress indicators
- **Anticipatory:** Smart defaults based on parish size/type, contextual suggestions
- **Responsive:** Instant feedback (100ms), optimistic updates, skeleton screens

**Look (Visual Clarity):**
- **Uncluttered:** Generous whitespace, single focal point per screen, progressive disclosure for advanced features
- **Airy:** Warm cream backgrounds (hsl(50 20% 98%)), 48px section spacing, content that breathes
- **Immersive:** Minimal chrome, full-width content where appropriate, content-first hierarchy
- **Tactile:** Subtle shadows on cards, structured depth, professional color palette (navy blue, purple accent)
- **Scannable:** Clear hierarchy with DM Sans display font, Inter body text, icon + label patterns

**Emotion (Psychological Impact):**
- **Empowering:** Organized features make parish management feel capable and professional
- **Delightful:** Professional micro-interactions (smooth transitions, satisfying feedback)
- **Transparent:** Clear status indicators with professional colors (navy for primary, purple for accent)
- **Obvious:** Familiar patterns, clear labels, professional tone in copy
- **Cohesive:** Professional color palette throughout (navy/purple), consistent spacing, unified component library

**Modern Principles (2025 Context):**
- **Cognitive Load:** Low-Medium—organized layouts, chunked information, clear hierarchy
- **Progressive Disclosure:** Advanced options organized in logical groups, revealed contextually
- **Zero-UI:** Keyboard shortcuts, smart defaults, automation features
- **Ethical Design:** Transparent pricing, easy opt-out, clear data ownership, respectful of tradition

**Target Appeal:** Churches seeking professional, organized management, value tradition with modern tools

**Market Position:** Professional, organized, parish-focused alternative

---

## 3. Design System: Parish Center
**Tagline:** "Where Ministry Meets Technology" or "Connect Your Community"

**Brand Personality:**
- Modern, tech-forward
- Efficient, streamlined
- Connection-focused
- Professional, polished

**Experience Description:**

**Flow (Behavior & Usability):**
- **Frictionless:** Fast, efficient workflows with minimal steps (quick-actions, keyboard shortcuts)
- **Fluid:** Sharp, precise transitions (clean animations, geometric shapes)
- **Anticipatory:** Smart suggestions based on usage patterns, auto-complete, contextual actions
- **Responsive:** Instant feedback with haptic vibrations, optimistic updates, skeleton screens

**Look (Visual Clarity):**
- **Uncluttered:** Minimal design, geometric shapes, sharp corners (4px radius)
- **Airy:** White backgrounds, generous spacing, high contrast for clarity
- **Immersive:** Full-width content, minimal chrome, content-first hierarchy
- **Scannable:** Bold headings, clear typography (Plus Jakarta Sans), icon + text labels

**Emotion (Psychological Impact):**
- **Empowering:** Advanced features feel powerful and capable (bulk operations, smart automations)
- **Delightful:** Precise, satisfying micro-interactions (sharp animations, crisp feedback)
- **Transparent:** Clear progress indicators, detailed status information
- **Obvious:** Modern patterns (familiar to tech-savvy users), clear visual affordances
- **Cohesive:** Unified blue/purple palette, consistent geometric design language

**Modern Principles (2025 Context):**
- **Cognitive Load:** Medium—organized information, clear hierarchy, but more features visible
- **Progressive Disclosure:** Advanced features accessible but organized in logical groups
- **Zero-UI:** Extensive keyboard shortcuts, gesture support, automation features
- **Ethical Design:** Transparent data handling, clear permissions, privacy-first

**Target Appeal:** Tech-savvy churches, modern congregations, efficiency-seekers

**Market Position:** Modern alternative, tech-forward without being cold

---

### Option C: "MinistryHub"
**Tagline:** "Your Ministry Command Center" or "Everything You Need, One Place"

**Brand Personality:**
- Organized, comprehensive
- Powerful, capable
- Hub-focused, central
- Professional, authoritative

**Experience Description:**

**Flow (Behavior & Usability):**
- **Frictionless:** Powerful shortcuts, bulk operations, comprehensive search
- **Linear:** Structured workflows, clear steps, progress tracking
- **Anticipatory:** Smart defaults based on church size/type, contextual suggestions
- **Forgiving:** Comprehensive undo, audit logs, data recovery options

**Look (Visual Clarity):**
- **Uncluttered:** Organized grid layouts, clear sections, structured information
- **Airy:** White/gray backgrounds, consistent spacing, organized layout
- **Scannable:** Strong hierarchy, bold typography (DM Sans), organized tables/lists
- **Tactile:** Medium shadows, structured depth, professional color palette (navy, purple)

**Emotion (Psychological Impact):**
- **Empowering:** Comprehensive features make users feel capable and organized
- **Transparent:** Detailed status information, audit trails, comprehensive reporting
- **Obvious:** Professional patterns, clear labeling, structured layouts
- **Cohesive:** Unified navy/purple palette, consistent component library, professional tone

**Modern Principles (2025 Context):**
- **Cognitive Load:** Medium-High—comprehensive features require some learning, but organized clearly
- **Progressive Disclosure:** Features organized in tabs/sections, advanced options revealed contextually
- **Zero-UI:** Keyboard shortcuts, bulk operations, automation for power users
- **Ethical Design:** Transparent permissions, data export, audit logs for accountability

**Target Appeal:** Churches wanting power and comprehensiveness, organized leaders

**Market Position:** Comprehensive solution, powerful without being overwhelming

---

### Option D: "Flourish"
**Tagline:** "Help Your Church Flourish" or "Growth Made Simple"

**Brand Personality:**
- Growth-oriented, optimistic
- Fresh, vibrant
- Encouraging, supportive
- Energetic, inspiring

**Experience Description:**

**Flow (Behavior & Usability):**
- **Frictionless:** Optimistic defaults, smart growth suggestions, one-click actions
- **Fluid:** Organic, flowing transitions (large rounded corners, smooth curves)
- **Anticipatory:** Growth-focused suggestions (e.g., "Ready to add another small group?"), smart templates
- **Delightful:** Energetic micro-interactions (growth animations, celebration moments)

**Look (Visual Clarity):**
- **Uncluttered:** Focused on growth metrics, progressive disclosure for advanced features
- **Airy:** Light mint backgrounds, generous spacing, content that flows
- **Tactile:** Large rounded corners (16px), soft shadows, vibrant colors (growth green, teal)
- **Scannable:** Growth-focused hierarchy, bold headings (Poppins), clear metrics and KPIs

**Emotion (Psychological Impact):**
- **Empowering:** Growth-focused features make users feel optimistic and capable (growth insights, trend visualizations)
- **Delightful:** Energetic animations (growth charts animate up, celebration for milestones)
- **Transparent:** Clear growth metrics, progress indicators, optimistic but honest reporting
- **Obvious:** Fresh, modern patterns, clear growth-oriented copy, encouraging tone
- **Cohesive:** Vibrant green/teal palette throughout, unified component library, growth-focused messaging

**Modern Principles (2025 Context):**
- **Cognitive Load:** Low-Medium—growth-focused information prioritized, advanced options secondary
- **Progressive Disclosure:** Growth features front and center, administrative features accessible but not prominent
- **Zero-UI:** Growth-focused automation, smart templates, optimistic defaults
- **Ethical Design:** Transparent growth metrics, honest reporting, encouraging but not manipulative

**Target Appeal:** Growth-minded churches, forward-thinking leaders, vision-focused

**Market Position:** Growth partner, inspiring and forward-looking

---

### 3.1 Brand Identity

**Name:** Parish Center  
**Tagline:** "Your Parish Management Platform"  
**Brand Voice:** Professional, organized, community-focused, modern, respectful of tradition

**Logo Concepts:**
1. **Wordmark with Icon** — "PC" monogram or parish symbol with "Parish Center" wordmark
2. **Parish Symbol** — Church building or community circle with "Parish Center" wordmark
3. **Minimalist** — Clean typography-only wordmark in DM Sans

### 3.2 Color Palette

**Primary Colors:**
```
Navy Blue (Primary)
- Base:   hsl(220, 50%, 25%)  #1A2B4A (approx)
- Foreground: hsl(0, 0%, 100%)  #FFFFFF
- Usage:  Primary actions, links, brand elements, headings

Royal Purple (Accent)
- Base:   hsl(260, 50%, 55%)  #7B5FB8 (approx)
- Foreground: hsl(0, 0%, 100%)  #FFFFFF
- Usage:  Highlights, CTAs, important notices, premium features

Warm Cream (Background)
- Base:   hsl(50, 20%, 98%)   #FBFBF9 (approx)
- Usage:  Backgrounds, page base

White (Card)
- Base:   hsl(0, 0%, 100%)     #FFFFFF
- Foreground: hsl(220, 50%, 18%)  #1A2B4A (approx)
- Usage:  Cards, modals, elevated surfaces
```

**Neutral Scale:**
```
Background:  hsl(50, 20%, 98%)   #FBFBF9 (approx)
Card:        hsl(0, 0%, 100%)     #FFFFFF
Border:      hsl(220, 20%, 85%)   #D8DBE0 (approx)
Muted Text:  hsl(220, 15%, 50%)   #6B7178 (approx)
Foreground:  hsl(220, 50%, 18%)   #1A2B4A (approx)
```

**Semantic Colors:**
```
Success:   hsl(145, 60%, 45%)   #2DA563 (approximate)
Warning:   hsl(38, 85%, 55%)    #F5B041 (approximate)
Error:     hsl(0, 65%, 50%)     #D15C5C (approximate)
Info:      hsl(220, 50%, 25%)   #1A2B4A (primary)
```

### 3.3 Typography

**Display Font: DM Sans (Sans-serif)**
- Usage: Headings (h1-h6), brand elements, emphasis
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Sizes:
  - H1: 2.5rem (40px) - Hero, page titles
  - H2: 2rem (32px) - Section titles
  - H3: 1.5rem (24px) - Subsection titles
  - H4: 1.25rem (20px) - Card titles
  - H5: 1.125rem (18px) - Small headings
  - H6: 1rem (16px) - Tiny headings

**Body Font: Inter (Sans-serif)**
- Usage: Body text, UI elements, buttons, forms
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Sizes:
  - Large: 1.125rem (18px) - Lead text, important content
  - Base: 1rem (16px) - Body text, default
  - Small: 0.875rem (14px) - Captions, metadata
  - Tiny: 0.75rem (12px) - Labels, fine print

**Line Heights:**
- Headings: 1.2
- Body: 1.6
- Tight: 1.4 (for short lines)

### 3.4 Spacing System

**Base Unit: 4px**
```
0.25x =  1px  (0.25rem)
0.5x =   2px  (0.5rem)
1x =     4px  (0.25rem)
2x =     8px  (0.5rem)
3x =    12px  (0.75rem)
4x =    16px  (1rem)
5x =    20px  (1.25rem)
6x =    24px  (1.5rem)
8x =    32px  (2rem)
10x =   40px  (2.5rem)
12x =   48px  (3rem)
16x =   64px  (4rem)
20x =   80px  (5rem)
24x =   96px  (6rem)
```

**Usage Guidelines:**
- Component padding: 16px (4x) default, 24px (6x) for cards
- Section spacing: 48px (12x) between major sections
- Page margins: 24px (6x) mobile, 48px (12x) desktop
- Grid gaps: 16px (4x) default, 24px (6x) for larger layouts

### 3.5 Border Radius

```
Small:    calc(0.5rem - 4px) = 4px   - Badges, small elements
Medium:   calc(0.5rem - 2px) = 6px   - Buttons, inputs
Large:    0.5rem = 8px                - Cards, modals (default)
XLarge:   12px  (0.75rem)             - Large cards, hero sections
Full:     9999px                      - Pills, avatars
```

### 3.6 Shadows

```
None:     none
Card:     0 2px 10px hsla(220, 50%, 18%, 0.06)      - Cards (default)
Elevated: 0 10px 28px hsla(220, 50%, 18%, 0.1)      - Modals, elevated cards
Glow:     0 0 35px hsla(220, 50%, 25%, 0.18)        - Primary focus states
```

### 3.7 Component Patterns

**Buttons:**
- Primary: Navy blue background (hsl(220, 50%, 25%)), white text, 8px radius, 44px height
- Secondary: Light gray background (hsl(220, 20%, 95%)), navy text, subtle border
- Outline: Transparent, navy border, navy text
- Ghost: Transparent, text only
- Accent: Purple background (hsl(260, 50%, 55%)), white text
- Destructive: Red background (hsl(0, 65%, 50%)), white text
- Sizes: Small (36px), Default (44px), Large (52px)

**Inputs:**
- Height: 44px (touch-friendly)
- Padding: 12px horizontal
- Border: 1px solid border color (hsl(220, 20%, 85%)), 8px radius
- Focus: Navy ring (2px), subtle glow (hsl(220, 50%, 25%))
- Error: Red border, error message below

**Cards:**
- Background: White (hsl(0, 0%, 100%)), card shadow
- Padding: 24px (6x)
- Border radius: 8px
- Hover: Slight elevation increase (elevated shadow)
- Border: Subtle border (hsl(220, 20%, 85%))

**Tables:**
- Headers: Medium weight, navy accent
- Rows: Alternating subtle backgrounds (light gray)
- Hover: Navy highlight (light - hsl(220, 20%, 95%))
- Borders: Subtle, 1px (hsl(220, 20%, 85%))

### 3.8 Layout Grid

**Breakpoints:**
```
Mobile:    < 640px   (1 column)
Tablet:    640px+    (2 columns)
Desktop:   1024px+   (3-4 columns)
Wide:      1440px+   (4-6 columns)
```

**Container Widths:**
- Mobile: Full width, 24px padding
- Tablet: 640px max, centered
- Desktop: 1200px max, centered
- Wide: 1400px max, centered

---

## 4. Wireframe Specifications

### 4.1 Wireframe Set A: Dashboard View

**Parish Center Layout:**
- Header with Parish Center logo, navigation, user menu
- Sidebar with module navigation (collapsible on mobile)
- Main content area with dashboard cards/widgets
- Quick actions/fab button (mobile)

**Parish Center Design Characteristics:**
- Professional, organized white cards with subtle navy shadows
- Structured grid layout with clear alignment
- Medium rounded corners (8px)
- Navy blue (hsl(220, 50%, 25%)) accents
- Purple (hsl(260, 50%, 55%)) for highlights
- Warm cream background (hsl(50, 20%, 98%))
- Generous whitespace (48px sections, 24px cards)

### 4.2 Wireframe Set B: People List View

**Parish Center Elements:**
- Page header with "People" title and "Add Person" button (navy primary button)
- Search bar and filters (white cards, navy borders)
- Table/list view toggle
- People cards/rows with avatar, name, email, phone, status
- Pagination or infinite scroll

**Parish Center Layout:**
- Structured table view (primary) with card view option
- Clean white cards with navy accents
- Professional navy headers
- Organized hierarchy with DM Sans headings
- Navy hover states (light - hsl(220, 20%, 95%))

### 4.3 Wireframe Set C: Service Builder View

**Parish Center Elements:**
- Service header (date, name, status) with navy accents
- Drag-and-drop service items list (white cards, navy borders)
- Right sidebar for adding items (white background, navy accents)
- Duration tracker (navy text, purple highlights)
- Publish/Draft buttons (navy primary, gray secondary)

**Parish Center Layout:**
- Two-column layout (service items left, add items right)
- Organized grid with clear hierarchy
- Professional navy sidebar accents
- Clean white cards with subtle shadows

### 4.4 Wireframe Set D: Mobile View (People Profile)

**Parish Center Elements:**
- Sticky header with back button and actions (navy background, white text)
- Profile photo and name (DM Sans heading)
- Tabs (Overview, Timeline, Notes) with navy active state
- Contact information (Inter body text)
- Quick actions (Email, Call, SMS) with navy icons

**Parish Center Layout:**
- Mobile-first responsive design
- Navy header, white content cards
- Consistent spacing (24px mobile, 48px desktop)
- Touch-friendly targets (44px minimum)

---

## 5. Market Positioning

### 5.1 Target Market

**Parish Center** targets churches seeking:
- **Professional, organized management** without corporate coldness
- **Traditional values** with modern tools
- **Parish-focused** approach (community, not just technology)
- **Scalable solution** that grows with the church

**Ideal Customer Profile:**
- Small to mid-size churches (50-500 members)
- Anglican/Episcopal, Catholic, mainline Protestant traditions
- Value structure and organization
- Want professional tools that respect tradition

### 5.2 Competitive Differentiation

**vs. Planning Center Online:**
- **Parish Center:** More organized, professional, parish-focused
- **Parish Center:** Better visual hierarchy, cleaner design
- **Parish Center:** Parish-specific terminology and workflows

**vs. ChurchTrac/Breeze:**
- **Parish Center:** More sophisticated, professional design
- **Parish Center:** Better feature set, more comprehensive
- **Parish Center:** Modern tech with traditional respect

**vs. MinistryHub/Generic ChMS:**
- **Parish Center:** Parish-specific terminology
- **Parish Center:** Professional yet approachable (not cold)
- **Parish Center:** Respects Anglican/parish tradition

### 5.3 Brand Positioning

**Positioning Statement:**
"For churches seeking professional, organized management that respects tradition, **Parish Center** is a modern platform that combines parish-focused workflows with professional design—unlike Planning Center or generic church software that feel either dated or too corporate."

**Key Differentiators:**
- ✅ **Parish-focused** terminology and workflows
- ✅ **Professional design** without corporate coldness
- ✅ **Respectful of tradition** while being modern
- ✅ **Organized, structured** approach churches value
- ✅ **Scalable** from 50 to 500+ members

---

## 6. Design Rules & Guidelines

### 6.1 Layout Rules

**Grid System:**
- Use 12-column grid (desktop)
- 4px base unit for all spacing
- Consistent gutters: 16px mobile, 24px tablet, 32px desktop

**Content Width:**
- Max content width: 1400px
- Sidebar: 240px (collapsed: 64px)
- Main content: Responsive, min 320px

**Spacing Hierarchy:**
- Between sections: 48px+
- Between components: 24px
- Within components: 16px
- Tight grouping: 8px

### 6.2 Typography Rules

**Heading Hierarchy:**
- Only one H1 per page
- H2 for major sections
- H3 for subsections
- H4+ for nested content

**Text Length:**
- Headings: Max 60 characters
- Body paragraphs: Max 75 characters (optimal readability)
- Line height: 1.6 for body, 1.2-1.4 for headings

**Font Loading:**
- System fonts as fallback
- Font display: swap (prevents FOIT)
- Preload critical fonts

### 6.3 Color Usage Rules

**Color Contrast:**
- Text on background: WCAG AA (4.5:1) minimum
- Large text: WCAG AA (3:1) minimum
- Interactive elements: 3:1 minimum
- Always test with contrast checker

**Color Semantics:**
- Primary: Main actions, brand elements
- Secondary: Supporting elements, backgrounds
- Accent: Highlights, important notices
- Semantic: Success (green), Warning (yellow), Error (red), Info (blue)

**Color Accessibility:**
- Never rely on color alone to convey information
- Use icons + color, patterns + color, or text + color
- Test with color blindness simulators

### 6.4 Interactive Elements

**Touch Targets (Responsive):**
- Minimum: 44x44px (iOS/Android standard) for **frictionless** interaction
- Optimal: 48x48px for comfortable tapping
- Spacing between targets: 8px minimum (prevents mis-taps)
- **Responsive feedback:** Visual highlight within 100ms of touch

**States (Tactile & Obvious):**
- **Default:** Base styling, clear affordance (looks clickable)
- **Hover:** Subtle elevation or color change (tactile depth cue)
- **Active/Pressed:** Slight scale (0.98) or darker color (responsive feedback, feels pressed)
- **Focus:** Visible ring/outline (keyboard navigation, transparent state)
- **Disabled:** 50% opacity, no interaction (obvious non-interactive state)

**Feedback (Transparent & Delightful):**
- **Loading states:** Skeleton screens preferred (transparent about what's loading)
- **Success:** Toast notification + icon + celebration animation (delightful moment)
- **Error:** Inline error message + icon + recovery suggestion (forgiving, helps fix)
- **Progress:** Progress bar for long operations (transparent about completion status)
- **Responsive:** All feedback appears within 100ms (instant acknowledgment)

### 6.5 Image & Media Rules

**Images:**
- Optimize: WebP format, < 200KB for thumbnails
- Lazy load: Below-the-fold images
- Alt text: Always descriptive
- Aspect ratios: Maintain consistency

**Icons:**
- Size: 16px (small), 20px (default), 24px (large)
- Style: Consistent (filled or outlined)
- Library: Lucide React (recommended)

**Avatars:**
- Size: 32px (small), 40px (default), 64px (large), 96px (hero)
- Fallback: Initials or generic avatar
- Shape: Circle (default) or square (brand preference)

### 6.6 Animation & Motion

**Principles (Fluid & Delightful):**
- **Purposeful:** Every animation should have a purpose (reduce cognitive load)
- **Fluid:** Smooth, continuous movement (ease-in-out curves, not linear)
- **Responsive:** Fast feedback (< 300ms for micro-interactions)
- **Tactile:** Natural physics (momentum scrolling, elastic bounces)
- **Delightful:** Small moments of joy (smooth transitions, celebration animations)

**Common Animations:**
- **Fade in:** 200-300ms (fluid appearance)
- **Slide in:** 300-400ms (fluid movement)
- **Scale:** 200ms with bounce (optional) (tactile, delightful feedback)
- **Page transitions:** 400-500ms (fluid navigation)
- **Loading states:** Skeleton screens (transparent about loading)

**Reduced Motion (Ethical Design):**
- Respect `prefers-reduced-motion` (ethical design, accessibility)
- Provide alternative (instant, no animation)
- Use CSS: `@media (prefers-reduced-motion: reduce)`

### 6.7 Form Design Rules

**Input Labels:**
- Always visible, above input
- Required fields: Asterisk (*) + "Required" text
- Help text: Below label, smaller font

**Validation:**
- Inline validation: After blur or submit
- Error message: Below input, red color
- Success indicator: Optional, subtle checkmark

**Form Layout:**
- Single column preferred (mobile-first)
- Two columns only for long forms (desktop)
- Logical grouping: Related fields together
- Progress indicator: For multi-step forms

### 6.8 Accessibility Rules

**WCAG 2.1 AA Compliance:**
- Color contrast: 4.5:1 for text
- Keyboard navigation: All features accessible
- Screen readers: Semantic HTML, ARIA labels
- Focus indicators: Always visible

**Implementation:**
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- ARIA labels for icon-only buttons
- Skip links for keyboard navigation
- Landmark regions (`role="main"`, `role="navigation"`)

### 6.9 Responsive Design Rules

**Breakpoints:**
- Mobile: < 640px (1 column, stacked)
- Tablet: 640px - 1023px (2 columns, adjusted spacing)
- Desktop: 1024px+ (full layout)
- Wide: 1440px+ (max content width)

**Mobile-First:**
- Start with mobile layout
- Enhance for larger screens
- Hide/show elements appropriately
- Touch-friendly targets

**Content Adaptation:**
- Text: Wrap naturally, no horizontal scroll
- Images: Responsive (max-width: 100%)
- Tables: Scroll horizontally or card view
- Navigation: Hamburger menu on mobile

---

## 8. Implementation Notes

### 8.1 Tech Stack Alignment

**Convex Integration:**
- Realtime subscriptions: Smooth loading states
- Optimistic updates: Immediate UI feedback
- Error handling: Clear error messages

**TanStack Query:**
- Caching strategy: Stale-while-revalidate
- Loading states: Skeleton screens
- Error states: Error boundaries + inline messages

**Clerk Integration:**
- Auth UI: Match brand colors
- User menu: Consistent with design system
- Profile images: Avatar component

### 8.2 Component Library

**Base Components (shadcn/ui):**
- Button, Input, Card, Table, Dialog, etc.
- Customize colors via CSS variables
- Maintain accessibility standards

**Custom Components:**
- PersonAvatar, StatusBadge, TagPill
- Dashboard widgets, Service items
- Navigation components

### 8.3 CSS Variables Strategy

**Parish Center CSS Variables:**
```css
:root {
  /* Parish Center brand colors */
  --background: 50 20% 98%;          /* Warm cream */
  --foreground: 220 50% 18%;         /* Navy blue */
  --card: 0 0% 100%;                 /* White */
  --card-foreground: 220 50% 18%;    /* Navy blue */
  --primary: 220 50% 25%;            /* Navy blue */
  --primary-foreground: 0 0% 100%;   /* White */
  --secondary: 220 20% 95%;          /* Light gray */
  --secondary-foreground: 220 50% 18%; /* Navy blue */
  --muted: 220 20% 90%;              /* Light gray */
  --muted-foreground: 220 15% 50%;   /* Gray text */
  --accent: 260 50% 55%;             /* Royal purple */
  --accent-foreground: 0 0% 100%;    /* White */
  --destructive: 0 65% 50%;          /* Red */
  --destructive-foreground: 0 0% 100%; /* White */
  --border: 220 20% 85%;             /* Border gray */
  
  /* Typography */
  --font-display: 'DM Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Border radius */
  --radius: 0.5rem;                  /* 8px default */
  
  /* Shadows */
  --shadow-card: 0 2px 10px hsla(220, 50%, 18%, 0.06);
  --shadow-elevated: 0 10px 28px hsla(220, 50%, 18%, 0.1);
  --shadow-glow: 0 0 35px hsla(220, 50%, 25%, 0.18);
}
```

**Implementation:**
- Use HSL color format with space-separated values for Tailwind
- Colors match `parish-center-tailwind-theme.js`
- Typography: DM Sans for display, Inter for body
- Border radius: 8px (0.5rem) default

### 8.4 Developer Handoff

**Deliverables:**
1. Design system documentation (this file)
2. Component library documentation
3. Figma/design files (if applicable)
4. Wireframe specifications (Section 4)
5. Color palette files (CSS, JSON)
6. Typography scale (CSS, documentation)

**Communication:**
- Weekly design review meetings
- Slack channel for questions
- Design system updates via changelog
- Component examples in Storybook (future)

---

## 7. Experience Summary

### How We Achieve the Desired Experience

This section summarizes how all design principles work together to create the desired user experience using our terminology framework.

#### Flow (Behavior & Usability)

**Frictionless Experience:**
- Single-tap common actions (check-in, confirm assignment)
- Smart defaults (service dates, recurring events)
- Inline editing (name tags, status badges)
- Bulk operations (tag multiple people, schedule team members)
- Keyboard shortcuts for power users (Cmd+K command palette)

**Fluid Navigation:**
- Smooth page transitions (300-400ms, ease-in-out)
- Swipeable tabs and sections
- Physics-based scrolling (momentum, elastic)
- Gesture support (swipe to archive, pull-to-refresh)

**Anticipatory Features:**
- Contextual suggestions ("Create service for next Sunday?" on Friday)
- Auto-complete for names, songs, locations
- Smart scheduling suggestions based on history
- Quick actions surfaced by role and context

**Forgiving Interface:**
- Undo/redo for destructive actions (30-second window)
- Soft delete (archive) with 30-day recovery
- Auto-save on all forms (never lose work)
- Clear confirmation dialogs with consequences explained

**Responsive Feedback:**
- Touch feedback within 100ms (button highlight, ripple)
- Haptic feedback on mobile (vibration for confirmations)
- Optimistic UI updates (immediate, rollback on error)
- Skeleton screens for loading states

**Linear Workflows:**
- Multi-step wizards with progress indicators
- One primary action per screen
- Clear next steps in complex processes
- Progressive disclosure for advanced options

#### Look (Visual Clarity)

**Uncluttered Design:**
- Single focal point per screen
- Progressive disclosure ("Show advanced settings")
- Removed decorative elements
- Grouped related content visually

**Airy Layouts:**
- Generous whitespace (48px sections, 24px cards)
- Content breathes with spacing
- Reduced cognitive load through spacing
- Clear visual hierarchy

**Immersive Experience:**
- Minimal chrome (thin headers, collapsible sidebar)
- Full-width content where appropriate
- Reduced borders (shadows and spacing instead)
- Content-first hierarchy

**Tactile Elements:**
- Subtle shadows on cards and buttons
- Hover elevation (shadow increases)
- Press states (scale 0.98, darker color)
- Depth cues (layered cards, z-index)

**Scannable Information:**
- Visual hierarchy (size, weight, color)
- Bold headings (24px, semibold)
- Icon + text labels (not icon-only)
- Status indicators (badges, colors, icons)

#### Emotion (Psychological Impact)

**Empowering Features:**
- AI-powered time-savers (duplicate detection, smart scheduling)
- Bulk operations for repetitive tasks
- Templates and presets for common workflows
- One-click complex actions ("Schedule team for 4 weeks")

**Delightful Moments:**
- Celebration animations for milestones (confetti at 100 members)
- Playful loading states (animated icons)
- Smooth transitions that feel satisfying
- Easter eggs for power users (keyboard shortcuts)

**Transparent Communication:**
- Loading indicators with progress ("Uploading 50%...")
- Status badges for all states (draft, published, completed)
- Clear error messages with solutions
- Audit logs showing who did what and when

**Obvious Functionality:**
- Clear labels over icons (when in doubt)
- Familiar patterns (tables, forms, cards work as expected)
- Consistent placement (actions always in same spot)
- Visual affordances (buttons look clickable)

**Cohesive System:**
- Consistent color palette across modules
- Unified typography (same families, size scales)
- Shared component library (identical buttons, inputs, cards)
- Pattern consistency (same interactions work same way)

#### Modern Principles (2025 Context)

**Minimized Cognitive Load:**
- Chunked information (cards, sections)
- Removed distractions (hide unused features)
- Clear visual hierarchy (scan, don't read)
- Contextual help (tooltips, inline hints)

**Progressive Disclosure:**
- Advanced options hidden by default
- Collapsible sections for optional features
- Multi-step wizards for complex tasks
- Contextual menus (right-click, long-press)

**Zero-UI Elements:**
- Swipe gestures for common actions
- Keyboard shortcuts for power users
- Smart defaults reducing decisions
- Automation for repetitive tasks

**Ethical Design:**
- Clear opt-in/opt-out (no pre-checked boxes)
- Transparent pricing (no hidden fees)
- Easy cancellation (one-click, no tricks)
- Data ownership (export and delete easily)
- Permission requests with clear explanation

---

## Appendices

### Appendix A: Color Accessibility Testing

**Tools:**
- WebAIM Contrast Checker
- Color Oracle (color blindness simulator)
- axe DevTools

**Testing Checklist:**
- [ ] All text meets WCAG AA (4.5:1)
- [ ] Large text meets WCAG AA (3:1)
- [ ] Interactive elements visible in all states
- [ ] Color blindness simulation (protanopia, deuteranopia)

### Appendix B: Brand Asset Checklist

**Logo Variations:**
- [ ] Full logo (horizontal)
- [ ] Icon only (square, minimum 32px)
- [ ] Wordmark only
- [ ] Light version (for dark backgrounds)
- [ ] Dark version (for light backgrounds)

**File Formats:**
- [ ] SVG (vector, scalable)
- [ ] PNG (with transparency, various sizes)
- [ ] Favicon (16x16, 32x32, multiple sizes)

### Appendix C: Typography Scale Reference

**Heading Sizes:**
```
H1: 2.5rem (40px) / 3rem (48px) line-height
H2: 2rem (32px) / 2.5rem (40px) line-height
H3: 1.5rem (24px) / 2rem (32px) line-height
H4: 1.25rem (20px) / 1.75rem (28px) line-height
H5: 1.125rem (18px) / 1.5rem (24px) line-height
H6: 1rem (16px) / 1.5rem (24px) line-height
```

**Body Sizes:**
```
Large: 1.125rem (18px) / 1.75rem (28px) line-height
Base: 1rem (16px) / 1.5rem (24px) line-height
Small: 0.875rem (14px) / 1.25rem (20px) line-height
Tiny: 0.75rem (12px) / 1rem (16px) line-height
```

---

**Document Status:** Active Design System  
**Brand:** Parish Center  
**Next Steps:** 
1. Implement Parish Center brand colors in application
2. Update all components with Parish Center theme
3. Create detailed wireframes for all key pages
4. Develop component library documentation
5. Build style guide website (future)

---

*This design system is a living document. Update as brand evolves and new patterns emerge.*
