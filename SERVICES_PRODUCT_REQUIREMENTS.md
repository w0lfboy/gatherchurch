# Services Module - Product Requirements Document

**Date:** January 2026  
**Status:** Draft  
**Based on:** Planning Center Services Analysis + Architecture Plan  
**Video Reference:** Screen Recording 2026-01-19 at 11.43.06 AM.mov

---

## Executive Summary

This document defines the product requirements for GatherChurch's Services module, designed to compete directly with Planning Center Services. The module enables churches to plan worship services, manage song libraries with arrangements, schedule teams, and provide personal schedule views for volunteers and staff.

---

## 1. My Schedule

### 1.1 Overview
A personalized view showing all services and service items assigned to the logged-in user. This is the primary interface for volunteers and staff to see their upcoming commitments.

### 1.2 User Stories

**As a worship team member, I want to:**
- See all services where I'm scheduled to serve
- View the specific items I'm assigned to (songs, readings, etc.)
- See service details (date, time, location)
- Access my schedule in a calendar view
- Filter by date range
- Export my schedule

**As a pastor, I want to:**
- See all services I'm leading or speaking at
- View my assigned service items across multiple services
- Quickly see my upcoming commitments

### 1.3 Functional Requirements

#### 1.3.1 My Schedule Dashboard (`/services/my-schedule`)

**Layout:**
- **Header:** "My Schedule" with date range selector
- **View Toggle:** List view / Calendar view
- **Quick Stats:** Total upcoming services, items assigned, next service date

**List View:**
- Grouped by date (upcoming first)
- Each service card shows:
  - Service date and time
  - Service title/type
  - Service status (draft, scheduled, live, completed)
  - Items assigned to user (with icons for type)
  - Quick actions: View Plan, View Team

**Calendar View:**
- Month/week/day views
- Services marked on calendar
- Click to see service details
- Color coding by service type

**Data Sources:**
- `service_plans` where user has schedule assignments
- `service_items` where `assigned_to = user.id`
- Join with `schedule_assignments` for team positions

#### 1.3.2 Service Items Assigned to Me

**Display:**
- List of all service items where user is assigned
- Grouped by service date
- Show: Item title, type, duration, service date/time
- Link to service plan detail

**Filters:**
- Date range (default: next 30 days)
- Service type
- Item type (song, scripture, etc.)

#### 1.3.3 Upcoming Services List

**Display:**
- All services where user is assigned (via items or team positions)
- Sorted by date (ascending)
- Show service metadata:
  - Date and time
  - Service type
  - Title/theme
  - Status badge
  - Number of items assigned to user

**Actions:**
- View full service plan
- View team roster
- Mark as "viewed" (optional)

### 1.4 Acceptance Criteria

- [ ] User can view all services they're assigned to
- [ ] User can view all service items assigned to them
- [ ] Calendar view displays services correctly
- [ ] Filters work for date range and service type
- [ ] Data loads in < 500ms
- [ ] Mobile-responsive layout
- [ ] Empty state when no assignments exist

---

## 2. Plans (Service Planning)

### 2.1 Overview
The Plans module allows users to create, edit, and manage service plans. Plans contain service items that can be reordered via drag-and-drop. Four primary item types are supported: Header, Item, Scripture, and Song.

### 2.2 User Stories

**As a worship leader, I want to:**
- Create new service plans
- Add different types of items to a plan
- Reorder items by dragging and dropping
- See a grid/matrix view of multiple plans
- Link songs from the song library
- Assign items to team members
- Set durations for timing
- Add notes and attachments

**As a pastor, I want to:**
- Plan sermon series across multiple services
- See all upcoming plans at a glance
- Copy items from previous services
- Set service status (draft → scheduled → live → completed)

### 2.3 Functional Requirements

#### 2.3.1 Plans List View (`/services/plans`)

**Layout:**
- **Header:** "Plans" with "Create Plan" button
- **View Toggle:** List / Grid / Matrix
- **Filters:** Date range, service type, status
- **Search:** By title, series name

**List View:**
- Table or card layout
- Columns/Fields:
  - Date
  - Service Type (with color badge)
  - Title
  - Status (draft, scheduled, live, completed)
  - Series name/week (if part of series)
  - Item count
  - Total duration
  - Created by
  - Actions menu (Edit, Duplicate, Delete)

**Grid View:**
- Card-based layout
- 3-4 columns on desktop
- Each card shows:
  - Service date (prominent)
  - Service type badge
  - Title
  - Status badge
  - Quick stats (items, duration)
  - Thumbnail preview of items

**Matrix View:**
- Rows: Service plans (dates)
- Columns: Service items (positions)
- Cells: Item details or empty
- Allows visual comparison across services
- Useful for planning series and seeing patterns

**Actions:**
- Create new plan
- Edit plan
- Duplicate plan
- Delete plan (with confirmation)
- Bulk actions (change status, assign to series)

#### 2.3.2 Plan Detail/Builder (`/services/plans/:id`)

**Layout:**
- **Header:**
  - Service date and time (editable)
  - Service type selector
  - Status badge and selector
  - Series name/week (if applicable)
  - Actions: Save, Publish, Duplicate, Delete
  - Back button

- **Two-Column Layout:**
  - **Left Column (70%):** Service items list
  - **Right Column (30%):** Add items panel

**Left Column - Service Items:**

**Sections (Collapsible):**
- Pre-Service
- Worship Set
- Message
- Response
- Custom sections (user-defined)

**Item Display:**
- Each item as a draggable card
- Show:
  - Item type icon
  - Title
  - Duration (if set)
  - Assigned to (if set)
  - Key (for songs)
  - Quick actions: Edit, Duplicate, Delete

**Drag-and-Drop:**
- Items can be dragged within section
- Items can be dragged between sections
- Visual feedback during drag (highlight, drop zone)
- Position updates saved automatically
- Optimistic updates for smooth UX

**Right Column - Add Items Panel:**

**Item Type Selector:**
- Header (section break)
- Item (general worship item)
- Scripture
- Song (opens song selector)
- Quick actions for common items

**Song Selector (when adding Song item):**
- Search songs
- Filter by tags, key, tempo
- Show song details (title, artist, keys available)
- Select arrangement (if multiple exist)
- Select key
- Add notes specific to this service

**Item Form (when adding/editing):**
- Item type (read-only if editing)
- Title (required)
- Description (optional)
- Duration (minutes)
- Assigned to (person selector)
- Section (dropdown)
- Notes (textarea)
- Attachments (file upload)
- For songs: Arrangement, Key selector
- For scripture: Book, chapter, verse fields

**Total Duration Display:**
- Sum of all item durations
- Displayed at bottom of items list
- Updates in real-time

#### 2.3.3 Item Types

**Header:**
- Purpose: Section break/divider
- Fields: Title only
- No duration, no assignment
- Visual: Larger text, divider line, or card with background color

**Item (General):**
- Purpose: General worship service items
- Fields: Title, description, duration, assigned to, notes, attachments
- Examples: Announcements, prayers, media presentations, custom elements

**Scripture:**
- Purpose: Scripture readings
- Fields: Title (e.g., "John 3:16"), full text, book/chapter/verse, assigned to, notes
- Can link to Bible reference (future: auto-populate text)
- Display: Shows reference prominently

**Song:**
- Purpose: Worship songs
- Fields: Linked to song library, arrangement, key, duration, assigned to, notes
- Displays song info from library:
  - Song title and artist
  - Arrangement name
  - Key selected
  - Available files (lyrics, chord charts, audio)
- Click to view full song details

#### 2.3.4 Plan Management

**Create Plan:**
- Form fields:
  - Service date (required)
  - Start time (required)
  - Service type (optional, sets default time)
  - Title (optional)
  - Series name/week (optional)
  - Notes (optional)
- On create: Opens plan builder with empty items list

**Edit Plan:**
- Same form as create
- Can change date, time, type, title, series
- Status changes require confirmation if plan has items

**Duplicate Plan:**
- Creates new plan with same date/time/type
- Copies all items (with new IDs)
- Resets status to "draft"
- Useful for recurring services

**Delete Plan:**
- Confirmation dialog required
- Warns if plan has items or assignments
- Soft delete option (archive) vs hard delete

**Status Workflow:**
- Draft → Scheduled → Live → Completed
- Status changes:
  - Draft: Can edit freely
  - Scheduled: Locked for editing (can unlock)
  - Live: Read-only, shows current item
  - Completed: Read-only, archived

### 2.4 Acceptance Criteria

- [ ] User can create new plans
- [ ] User can edit plan details
- [ ] User can add all four item types (Header, Item, Scripture, Song)
- [ ] Drag-and-drop reordering works smoothly
- [ ] Items can be moved between sections
- [ ] Song items link to song library correctly
- [ ] Arrangement and key selection works for songs
- [ ] Total duration calculates correctly
- [ ] Plan status workflow functions properly
- [ ] List, Grid, and Matrix views all work
- [ ] Filters and search work correctly
- [ ] Mobile-responsive (simplified layout on mobile)
- [ ] Changes save automatically or with explicit save
- [ ] Optimistic updates for drag-and-drop

---

## 3. Song Library

### 3.1 Overview
The Song Library is a comprehensive system for managing worship songs, their arrangements, keys, files, and scheduling history. It serves as the central repository for all song-related data and integrates with service planning.

### 3.2 User Stories

**As a worship leader, I want to:**
- Search for songs by title, artist, or lyrics
- View all arrangements of a song
- See which keys are available for each arrangement
- Access lyrics, chord charts, and audio files
- See when songs were last used
- Filter songs by tags, key, tempo
- Create new songs and arrangements
- Edit song details and arrangements
- Track song usage over time

**As a music director, I want to:**
- Manage multiple arrangements per song
- Store files specific to each arrangement and key
- Add notes and tags to arrangements
- See scheduling history for songs
- Export song lists

### 3.3 Functional Requirements

#### 3.3.1 Song Library List View (`/services/songs`)

**Layout:**
- **Header:**
  - "Songs" title
  - View options dropdown (List, Grid)
  - Actions dropdown (Import, Export, Bulk actions)
  - "Add a song" button (primary)

- **Filter Bar:**
  - "Filter" button (opens filter panel)
  - Text search input ("Add text filter")
  - Active filters displayed as chips

- **Summary Bar:**
  - Total song count (e.g., "441 songs")
  - Action icons: Print, Download, Edit (batch)
  - Column visibility toggle

**Song List Table:**

**Columns:**
- Expand/Collapse icon (for details)
- **Title:** Song title (clickable to detail view)
- **File Indicators:** Icons showing available content types:
  - 📄 Document (lyrics, general files)
  - 🔊 Audio (recordings)
  - 🎵 Chord Chart (sheet music)
  - 📎 Attachment (other files)
- **BPM:** Beats per minute (if set)
- **Keys:** Available keys (comma-separated, e.g., "E, F, G")
- **Last Scheduled:** Date song was last used (e.g., "Sept 21, 2025")
- **Created:** Creation date/time (e.g., "Aug 13, 2020 7:17 AM")

**Row Interactions:**
- Click row to expand details
- Click title to open detail view
- Hover shows quick actions
- Right-click context menu

**Filters:**
- Text search (title, artist, lyrics)
- Tags (multi-select)
- Key (single or multi-select)
- Tempo (slow, medium, fast)
- Last used date range
- Has arrangements
- Has files
- CCLI number

**Sorting:**
- Default: Title (A-Z)
- Options: Title, Artist, Last Scheduled, Created, Times Used, BPM

**Pagination:**
- Default: 25 per page
- Options: 25, 50, 100, All
- Page navigation controls

#### 3.3.2 Song Detail View (`/services/songs/:id`)

**Layout:**
- **Header:**
  - Song title (large, prominent)
  - CCLI number and author/composer (if available)
  - Tags (chips, clickable to filter)
  - Actions dropdown (Edit, Duplicate, Delete, Export)

- **Two-Column Layout:**
  - **Left Sidebar (25%):** Arrangements list
  - **Main Content (75%):** Selected arrangement details

**Left Sidebar - Arrangements:**

**Sections:**
- "SONG" header
  - "All Arrangements" link (shows song-level view)
- "ARRANGEMENTS" header
  - List of arrangements:
    - "Default Arrangement" (always exists)
    - Custom arrangements (e.g., "Taylor Fletcher")
  - Selected arrangement highlighted
  - "Add" button (creates new arrangement)

**Main Content - Arrangement Details:**

**Arrangement Header:**
- Arrangement name (editable)
- Edit icon (pencil)
- Link icon (copy link to arrangement)

**Metadata:**
- Length: Duration in MM:SS format
- BPM: Beats per minute
- Meter: Time signature (dropdown: 4/4, 3/4, 6/8, etc.)

**Sequence:**
- "Sequence: Create" button
- Opens sequence editor (future feature for structured song flow)

**Files Section:**
- "Files" header with "+" button and "Lyrics & Chords" button
- File cards grouped by key:
  - **Arrangement-level files:** Apply to all keys
    - Card titled "Arrangement"
    - Shows file type icons and names
  - **Key-specific files:** Apply to specific keys
    - Card titled with key (e.g., "E", "F")
    - Shows files for that key
    - Multiple keys can have files

**Key Management:**
- Key buttons: "Arrangement", "E", "F", "G", "Add Key"
- Selected key highlighted
- Click to view files for that key
- "Add Key" opens key selector

**Bottom Sections:**

**Schedule:**
- "Schedule" header with info icon
- Dropdown: "Since 3 Most Recent" (options: All, Last Month, Last 3 Months, Last Year)
- List of scheduled services:
  - Date (e.g., "September 1, 2024")
  - Arrangement name and key (e.g., "Taylor Fletcher [E]")
  - Service name (e.g., "Sunday Worship Service")
- Click service to navigate to plan

**Tags:**
- "Tags" header with info icon and "Add" button
- List of tags (chips)
- Empty state: "There are no tags assigned to this arrangement. Click Add to assign new Tags..."
- Click tag to filter library by that tag

**Notes:**
- "Notes" header with info icon
- Textarea for free-form notes
- Auto-saves on blur

#### 3.3.3 Arrangement Management

**Create Arrangement:**
- Form fields:
  - Name (required, e.g., "Taylor Fletcher", "Acoustic Version")
  - Arrangement type (default, custom)
  - Length (seconds or MM:SS)
  - BPM
  - Meter (time signature)
  - Notes
- On create: Opens arrangement detail view

**Edit Arrangement:**
- Same form as create
- Can change all fields
- Can delete arrangement (if not default)

**Default Arrangement:**
- Every song has exactly one default arrangement
- Created automatically when song is created
- Cannot be deleted
- Name can be changed but type stays "default"

**Key Management:**
- Add keys to arrangement
- Keys stored per arrangement (not per song)
- Each key can have multiple files
- Keys displayed as buttons for quick access

**File Management:**
- Upload files to arrangement or specific key
- File types:
  - Lyrics (text or PDF)
  - Chord Charts (PDF, image)
  - Audio (MP3, WAV)
  - Video (MP4)
  - Sheet Music (PDF)
  - Other (any file type)
- Files organized by:
  - Arrangement-level (applies to all keys)
  - Key-specific (applies to one key)
- File operations:
  - Upload
  - Download
  - Preview (for supported types)
  - Delete
  - Rename

#### 3.3.4 Song Creation/Editing

**Create Song:**
- Form fields:
  - Title (required)
  - Artist (optional)
  - CCLI number (optional)
  - Author/Composer (optional)
  - Default key (optional)
  - Tempo (slow, medium, fast)
  - BPM (optional)
  - Lyrics (optional, full text)
  - Tags (multi-select or free text)
  - Notes (optional)
- On create: Creates song with default arrangement
- Redirects to song detail view

**Edit Song:**
- Same form as create
- Can edit all fields
- Changes apply to song-level metadata
- Arrangements managed separately

**Delete Song:**
- Confirmation required
- Warns if song is used in service plans
- Option to archive instead of delete

#### 3.3.5 Song Search & Filtering

**Search:**
- Full-text search across:
  - Title
  - Artist
  - Lyrics (if stored)
  - CCLI number
- Real-time results (debounced)
- Highlights matching text

**Filters:**
- **Tags:** Multi-select dropdown with search
- **Key:** Single or multi-select
- **Tempo:** Checkboxes (slow, medium, fast)
- **Last Used:** Date range picker
- **Has Arrangements:** Boolean (yes/no)
- **Has Files:** Boolean (yes/no)
- **CCLI:** Text input

**Filter Persistence:**
- Filters saved in URL query params
- Shareable links with filters applied
- Clear all filters button

#### 3.3.6 Song Usage & History

**Usage Statistics:**
- Times used (count)
- Last used date
- Most used in (time period)
- Trending songs (used frequently recently)

**Schedule History:**
- Track when songs were scheduled
- Store: Date, service, arrangement, key used
- Display in song detail view
- Filterable by date range

**Integration with Plans:**
- When song added to plan:
  - Increment times_used
  - Update last_used_date
  - Create schedule history record
- When plan deleted:
  - Option to keep or remove history

### 3.4 Acceptance Criteria

- [ ] User can search songs by title, artist, lyrics
- [ ] User can filter by tags, key, tempo, last used
- [ ] Song list displays all required columns
- [ ] File indicators show correct content types
- [ ] User can create new songs
- [ ] User can create multiple arrangements per song
- [ ] User can add keys to arrangements
- [ ] User can upload files to arrangements and keys
- [ ] User can view schedule history for songs
- [ ] Tags can be added to arrangements
- [ ] Notes can be added to arrangements
- [ ] Song detail view shows all arrangement information
- [ ] Arrangement selector works in plan builder
- [ ] Key selector works when adding songs to plans
- [ ] Files are accessible from service items
- [ ] Usage statistics update correctly
- [ ] Mobile-responsive layout
- [ ] Performance: List loads in < 1s for 500+ songs

---

## 4. Integration Points

### 4.1 Song Library → Plans
- Songs can be added to service plans as items
- Arrangement and key selection when adding song
- Song details displayed in service item card
- Files accessible from service item (lyrics, chord charts)

### 4.2 Plans → My Schedule
- Service plans appear in user's schedule if:
  - User has service items assigned to them
  - User has team position assignments
- Service items assigned to user appear in "My Items"

### 4.3 Plans → Song Library
- When song added to plan, update usage statistics
- Create schedule history record
- Link from song detail to service plans using that song

### 4.4 People Module Integration
- Person selector for assigning service items
- Person selector for team positions
- Display person names and avatars in schedules

---

## 5. User Experience Requirements

### 5.1 Performance
- Song library search: < 200ms response time
- Plan load with 50 items: < 500ms
- Drag-and-drop reorder: < 100ms (optimistic update)
- File upload: < 2s for typical files (< 5MB)
- List pagination: Smooth, no loading flicker

### 5.2 Responsive Design
- **Desktop (1024px+):** Full two-column layouts, all features
- **Tablet (768px-1023px):** Simplified layouts, collapsible sidebars
- **Mobile (< 768px):** Single column, bottom sheets for forms, simplified views

### 5.3 Accessibility
- Keyboard navigation for all interactions
- Screen reader support
- ARIA labels on interactive elements
- Focus indicators
- Drag-and-drop works with keyboard

### 5.4 Error Handling
- Clear error messages
- Validation on forms
- Confirmation dialogs for destructive actions
- Optimistic updates with rollback on error
- Loading states for all async operations

---

## 6. Data Requirements

### 6.1 Song Data
- Title, artist, CCLI number
- Multiple arrangements per song
- Multiple keys per arrangement
- Files per arrangement/key
- Tags and notes
- Usage statistics
- Schedule history

### 6.2 Plan Data
- Service date, time, type
- Status workflow
- Series information
- Multiple items with ordering
- Item types: Header, Item, Scripture, Song
- Assignments to people
- Notes and attachments

### 6.3 Schedule Data
- User assignments (items and team positions)
- Service details
- Date ranges and filters

---

## 7. Future Enhancements (Out of Scope for MVP)

- Song sequence editor (structured flow)
- CCLI API integration (auto-populate song data)
- Audio playback in browser
- PDF viewer for chord charts
- Song templates
- Bulk import/export (CSV, Planning Center format)
- Collaborative editing (real-time)
- Version history for songs
- Song suggestions based on usage patterns
- Integration with music streaming services

---

## 8. Success Metrics

### 8.1 User Engagement
- % of users who create at least one plan per month
- Average plans created per church per month
- Average songs in library per church
- % of services that use song library songs

### 8.2 Feature Adoption
- % of plans using drag-and-drop reordering
- % of songs with multiple arrangements
- % of songs with files uploaded
- % of users using "My Schedule" view

### 8.3 Performance
- Average page load time < 1s
- Search response time < 200ms (95th percentile)
- Zero data loss incidents
- < 0.1% error rate on mutations

---

**Document Status:** Draft for Review  
**Last Updated:** January 2026  
**Next Review:** After video analysis and stakeholder feedback
