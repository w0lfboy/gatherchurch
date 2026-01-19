# Congregation Module - Product Requirements Document

**Date:** January 2026  
**Status:** Draft  
**Based on:** Planning Center People Analysis + GatherChurch Architecture  
**Module Priority:** P0 (Critical)

---

## Executive Summary

The Congregation module is a dual-sided member management system that serves both administrators (pastors, staff, admins) and congregation members. Administrators can manage full member records, take notes, and access all personal information. Members can update their own profiles, view a church directory with privacy controls, see volunteer teams and groups they belong to, and manage their household information.

---

## 1. Architecture Overview

### 1.1 Dual-Sided Access Model

**Admin Side (Pastors, Staff, Admins):**
- Full access to all member information
- Ability to create, edit, and manage member profiles
- Take private and public notes on members
- View all personal information (addresses, phone numbers, emails)
- Manage households
- Access analytics and dashboards
- Full search and filtering capabilities

**Member Side (Congregation Members):**
- Self-service profile management
- View and update own contact information
- Control directory visibility preferences
- View church directory (with privacy-respecting display)
- See volunteer teams and groups they belong to
- Manage own household information
- Limited search capabilities

### 1.2 Permission-Based Views

| Feature | Admin/Staff | Member (Self) | Member (Others) |
|---------|------------|---------------|-----------------|
| View own profile | ✅ Full | ✅ Full | ❌ |
| Edit own profile | ✅ Full | ✅ Limited | ❌ |
| View directory | ✅ Full | ✅ Limited* | ✅ Limited* |
| View other profiles | ✅ Full | ❌ | ❌ |
| Take notes | ✅ | ❌ | ❌ |
| View private notes | ✅ | ❌ | ❌ |
| Manage households | ✅ | ✅ (Own only) | ❌ |
| View teams/groups | ✅ All | ✅ Own only | ✅ Public only |

*Limited = Respects privacy settings (directory visibility)

---

## 2. Admin/Pastor Side - Full Management

### 2.1 People List View (`/congregation` - Admin)

**Layout:**
- **Header:**
  - "People" title with count badge (e.g., "321 people")
  - View toggle: List / Pipeline / Directory / Households
  - Settings dropdown (gear icon)
  - "Add person" button (primary)

- **Tabs:**
  - "People" (active)
  - "Households"

- **Filter and Search Bar:**
  - "Filter" button (opens filter panel)
  - Active filters displayed as chips (e.g., "Profile status: Active" with X to remove)
  - Search input: "Search by name, email, street address, or phone number"
  - Total count: "321 people"
  - Column visibility toggle (three dots menu)

**People Table (List View):**

**Columns:**
- **PHOTO:** Circular avatar or initials placeholder
- **FIRST NAME:** Sortable
- **LAST NAME:** Sortable (default sort)
- **PRIMARY EMAIL:** Email address with mailto link
- **PRIMARY PHONE:** Phone number with tel link
- **PRIMARY ADDRESS:** Full address (street, city, state, zip)
- **GENDER:** Male, Female, or empty
- **STATUS:** Badge (Member, Visitor, Regular Attender, etc.)
- **ACTIONS:** Dropdown menu (Edit, View Profile, Archive, etc.)

**Filters:**
- Profile status (Active, Inactive, All)
- Membership status (Member, Visitor, Regular Attender, etc.)
- Tags (multi-select)
- Gender
- Has email / Has phone / Has address
- Date range (member since, first visit)
- Pipeline stage
- Household

**Sorting:**
- Any column sortable
- Multi-column sort support
- Save sort preferences

**Pagination:**
- Default: 25 per page
- Options: 25, 50, 100 per page
- Page navigation (prev/next, page numbers)

**Actions:**
- Bulk actions (select multiple people)
- Export to CSV
- Print directory
- Batch operations (tag, status change, etc.)

### 2.2 Households View (`/congregation` - Households Tab)

**Layout:**
Similar to People view but displays households.

**Household Table:**
- **PHOTO:** Stacked circular avatars of household members (with overflow indicator)
- **NAME:** Household name (e.g., "Fletcher Household", "Alexander Household")
- **MEMBERS:** Total member count
- **ADULTS:** Adult count
- **CHILDREN:** Child count
- **PRIMARY ADDRESS:** Household address
- **UPDATED AT:** Last update timestamp
- **CREATED AT:** Creation timestamp
- **ACTIONS:** Dropdown menu

**Filters:**
- Member count (min/max)
- Has children / Has adults
- Address (city, state, zip)
- Tags

**Actions:**
- Create household
- Merge households
- View household detail
- Edit household

### 2.3 Person Detail View (`/congregation/:id` - Admin)

**Layout:**
- **Left Sidebar (Navigation):**
  - Profile (active)
  - Activity
  - Communication
  - Workflows
  - Notes (private and public)
  - Forms
  - Custom tabs (configurable)

**Profile Tab:**

**Top Section:**
- Large profile photo/avatar (editable)
- Full name (editable)
- Primary email (editable)
- Primary phone (editable)
- Status badge (dropdown: Member, Visitor, Regular Attender, etc.)
- Permission level badge (dropdown)

**Contact Information Section:**
- **HOME:**
  - Email: Email address with type indicator (HOME)
  - Phone: Phone number with type (HOME)
  - Address: Full address
- **WORK:**
  - Email: Work email (if set)
  - Phone: Work phone (if set)
- Additional contact types: Mobile, Other

**Personal Information Section:**
- Gender: Male, Female, Other, or "add" link
- Birthday: Date or "No birthday - add" link
- Marital Status: Dropdown (Single, Married, Divorced, Widowed, etc.)
- Anniversary: Date or "No anniversary - add" link

**Directory Visibility Section:**
- Toggle: "Show in directory"
- Checkboxes:
  - Show email in directory
  - Show phone in directory
  - Show address in directory

**Household Section:**
- Household name with "Manage" button
- List of household members:
  - Photo, name, role (head, spouse, child, other)
  - Role editable
- "Add to household" button
- "Create new household" button

**Notes Tab:**
- List of all notes (private and public)
- Filter by: All, Private, Public, Category
- Categories: General, Pastoral, Prayer, Follow-up
- Add note button
- Each note shows: Author, date, content, category, private/public indicator
- Edit/delete notes (if authored by current user or admin)

**Activity Tab:**
- Timeline of all activity
- Check-ins, event attendance, giving, service participation
- Filterable by activity type
- Date range filter

**Communication Tab:**
- Email history
- SMS history
- Communication preferences
- Opt-in/opt-out status

**Workflows Tab:**
- Pipeline stages
- Custom workflows
- Task assignments
- Follow-ups

### 2.4 Dashboard View (`/congregation/dashboard` - Admin)

**Layout:**
- **Tabs:** Overview, Metrics, Profile notes, Background checks

**Overview Tab:**

**Demographics Section:**
- Stacked bar chart showing age distribution
- Age ranges: 0-3, 4-11, 12-18, 19-25, 26-35, 36-50, 51-64, 65+
- Split by gender (Male, Female, Unassigned)
- Legend: Counts per gender

**Membership Types Section:**
- Donut/ring chart showing membership distribution
- Segments: Regular Attender, Member, Visitor, Unassigned
- Total count displayed
- Legend with counts

**Recently Created Profiles:**
- List of recently added people
- Name and time since creation (e.g., "4 days ago")

**My Workflow Cards:**
- Personal workflow items assigned to current user
- Empty state if none

**Potential Duplicates:**
- List of suspected duplicate profiles
- Click to review and merge

**Metrics Tab:**
- Growth trends
- Membership statistics
- Engagement metrics
- Attendance patterns

**Profile Notes Tab:**
- Recent notes across all profiles
- Filterable by author, category, date

**Background Checks Tab:**
- List of people needing background checks
- Status tracking (pending, approved, expired)
- Filterable by status

### 2.5 Notes System

**Note Creation:**
- Add note button on person detail page
- Form fields:
  - Content (textarea, required)
  - Category (dropdown: General, Pastoral, Prayer, Follow-up)
  - Private checkbox (default: checked for admins)
  - Assign follow-up (optional)
  - Due date (if follow-up)
- Auto-save draft
- Rich text support (future enhancement)

**Note Display:**
- Chronological list (newest first)
- Color coding by category
- Private notes indicated with lock icon
- Author name and timestamp
- Edit/delete actions (if permitted)

**Note Permissions:**
- Admins can view all notes
- Pastors can view pastoral notes
- Private notes only visible to creator and admins
- Public notes visible to all staff

### 2.6 Household Management

**Create Household:**
- Form fields:
  - Household name (auto-generated from primary contact or editable)
  - Primary address
  - Primary contact (dropdown or create new)
- Add members during creation
- Set household roles

**Edit Household:**
- Change household name
- Update address
- Add/remove members
- Change member roles
- Set primary contact

**Household Roles:**
- Head of household
- Spouse
- Child
- Other (with description)

**Parent/Guardian Roles (Future):**
- Special designation for adults in households with children
- Automatic assignment option
- Customizable per household

### 2.7 Search and Filtering

**Search Capabilities:**
- Full-text search across:
  - First name
  - Last name
  - Email
  - Phone number
  - Street address
  - Tags
- Real-time results (debounced)
- Search history

**Advanced Filters:**
- Profile status
- Membership status
- Tags (multi-select)
- Gender
- Age range (calculated from birth date)
- Member since (date range)
- First visit (date range)
- Has email / phone / address
- Pipeline stage
- Household
- Background check status
- Volunteer teams
- Groups

**Saved Filters:**
- Save frequently used filter combinations
- Name and share filters
- Quick access to saved filters

---

## 3. Member Side - Self-Service & Directory

### 3.1 My Profile (`/profile` - Member)

**Layout:**
- **Header:** "My Profile" with edit toggle

**Profile Section:**
- Large profile photo (upload/change)
- Full name (editable)
- Display name preference

**Contact Information:**
- **Email Addresses:**
  - Primary email (editable)
  - Add additional email (HOME, WORK, OTHER)
  - Set primary email
  - Remove emails (except primary)

- **Phone Numbers:**
  - Primary phone (editable)
  - Add additional phone (HOME, MOBILE, WORK, OTHER)
  - Set primary phone
  - Remove phones (except primary)

- **Address:**
  - Home address (editable)
  - Add additional addresses (WORK, OTHER)
  - Set primary address

**Personal Information:**
- Gender (dropdown)
- Birthday (date picker)
- Marital status (dropdown)
- Anniversary (date picker)

**Directory Visibility Settings:**
- Toggle: "Show me in church directory"
- Privacy checkboxes:
  - ✅ Show my email address
  - ✅ Show my phone number
  - ✅ Show my address
- Save changes button
- Preview: "This is how you'll appear to others"

**Household Information:**
- Household name (if part of household)
- Household members list (read-only or editable based on role)
- "Manage Household" button (if head of household)

**Volunteer Teams:**
- List of teams user belongs to
- Team name, role/position
- View team details link
- "Join a team" link (if available)

**Groups:**
- List of groups user belongs to
- Group name, role
- View group details link
- "Find groups" link

**Account Settings:**
- Change password
- Notification preferences
- Communication preferences
- Delete account (with confirmation)

### 3.2 Church Directory (`/directory` - Member)

**Layout:**
- **Header:** "Church Directory"
- **Search Bar:** "Search by name, email, or phone"
- **Filters:**
  - Tags
  - Teams
  - Groups
- **View Toggle:** List / Grid / Card

**Directory List View:**

**What's Visible (Based on Privacy Settings):**
- Photo (if available)
- Name (always visible)
- Email (if `showEmail = true` for that person)
- Phone (if `showPhone = true` for that person)
- Address (if `showAddress = true` for that person)
- Teams (public teams only)
- Groups (public groups only)

**Privacy-Respecting Display:**
- If email hidden: Shows nothing or "[Email hidden]"
- If phone hidden: Shows nothing or "[Phone hidden]"
- If address hidden: Shows nothing or "[Address hidden]"
- If person opted out of directory: Not shown at all

**Directory Grid View:**
- Card-based layout
- Each card shows:
  - Photo
  - Name
  - Visible contact info (based on privacy)
  - Teams/groups badges
- Click card to see more details

**Directory Card View:**
- Larger cards with more information
- Photo, name, contact info
- Household members (if visible)
- Teams and groups

**Member Profile Preview (From Directory):**
- Limited view when clicking on another member
- Shows only:
  - Photo
  - Name
  - Contact info (based on their privacy settings)
  - Public teams/groups
- No notes, no activity, no personal info beyond directory settings

**Search:**
- Search by name (first, last, or both)
- Search by email (if visible)
- Search by phone (if visible)
- Real-time results
- Highlights matching text

**Filters:**
- Tags (if public)
- Volunteer teams (if public membership)
- Groups (if public membership)
- Has photo
- Has contact info

**Export (Member View):**
- Download directory as CSV (respecting privacy)
- Print directory (respecting privacy)
- Export own contacts only

### 3.3 Volunteer Teams View (Member)

**My Teams (`/profile/teams`):**
- List of teams user belongs to
- For each team:
  - Team name
  - Role/position
  - Team description
  - Schedule/last meeting
  - Team members (if team is public)
  - Team leader contact info
- "Leave team" option (if applicable)
- "View all teams" link

**All Teams (`/directory/teams`):**
- List of all public teams
- Filter by category/ministry area
- Team description
- Current member count
- "Join team" button (if open enrollment)
- Search teams

### 3.4 Groups View (Member)

**My Groups (`/profile/groups`):**
- List of groups user belongs to
- For each group:
  - Group name
  - Group type (Small Group, Bible Study, etc.)
  - Role (Member, Leader, etc.)
  - Meeting schedule
  - Group members (if group is public)
  - Leader contact info
- "Leave group" option
- "View all groups" link

**All Groups (`/directory/groups`):**
- List of all public groups
- Filter by type, category, meeting time
- Group description
- Current member count
- "Join group" button (if open enrollment)
- Search groups

### 3.5 Household Management (Member)

**My Household (`/profile/household`):**
- Household name (if head of household, editable)
- Household address (editable if head)
- Household members list:
  - Name, relationship/role
  - Contact info (if visible)
  - Remove member (if head of household)
- "Add household member" (if head)
- "Leave household" (if not head)
- "Request to join household" (if not in household)

**Add Household Member:**
- Search existing people
- Or create new person
- Set relationship/role
- Send invitation (if person has account)

**Create Household:**
- If user is not in a household
- "Create household" button
- Set household name
- Add address
- Add members (search or invite)
- Set yourself as head of household

---

## 4. Data Models

### 4.1 Person Schema

```typescript
interface Person {
  id: string;
  tenant_id: string;
  
  // Basic info
  first_name: string;
  last_name: string;
  display_name?: string;
  avatar_url?: string;
  
  // Contact info (stored as JSONB for multiple)
  emails: ContactMethod[]; // [{type: 'home', value: '...', is_primary: true}]
  phones: ContactMethod[]; // [{type: 'mobile', value: '...', is_primary: true}]
  addresses: Address[]; // [{type: 'home', street: '...', city: '...', ...}]
  
  // Status
  status: 'visitor' | 'regular' | 'member' | 'volunteer' | 'leader' | 'inactive';
  member_since?: Date;
  first_visit?: Date;
  
  // Demographics
  birth_date?: Date;
  gender?: 'male' | 'female' | 'other';
  marital_status?: 'single' | 'married' | 'divorced' | 'widowed' | 'other';
  anniversary_date?: Date;
  
  // Household
  household_id?: string;
  household_role?: 'head' | 'spouse' | 'child' | 'other';
  is_parent_guardian?: boolean;
  
  // Directory visibility
  show_in_directory: boolean;
  show_email: boolean;
  show_phone: boolean;
  show_address: boolean;
  
  // Metadata
  tags: string[];
  pipeline_stage_id?: string;
  background_check_status?: 'none' | 'pending' | 'approved' | 'expired';
  background_check_date?: Date;
  
  created_at: Date;
  updated_at: Date;
}
```

### 4.2 Household Schema

```typescript
interface Household {
  id: string;
  tenant_id: string;
  name: string;
  primary_contact_id: string; // Person ID
  address?: Address;
  members: HouseholdMember[];
  created_at: Date;
  updated_at: Date;
}

interface HouseholdMember {
  person_id: string;
  role: 'head' | 'spouse' | 'child' | 'other';
  is_parent_guardian?: boolean;
}
```

### 4.3 Note Schema

```typescript
interface Note {
  id: string;
  person_id: string;
  author_id: string; // User ID
  content: string;
  category: 'general' | 'pastoral' | 'prayer' | 'followup';
  is_private: boolean;
  follow_up_id?: string;
  created_at: Date;
  updated_at: Date;
}
```

### 4.4 Directory Visibility Logic

```typescript
// When displaying person in directory
function getDirectoryInfo(person: Person, viewer: User): DirectoryInfo {
  // Viewer can always see own info
  if (viewer.person_id === person.id) {
    return fullInfo(person);
  }
  
  // Person opted out of directory
  if (!person.show_in_directory) {
    return null; // Don't show in directory
  }
  
  // Build limited info based on privacy settings
  return {
    id: person.id,
    name: `${person.first_name} ${person.last_name}`,
    avatar: person.avatar_url,
    email: person.show_email ? person.primary_email : null,
    phone: person.show_phone ? person.primary_phone : null,
    address: person.show_address ? person.primary_address : null,
    teams: getPublicTeams(person),
    groups: getPublicGroups(person),
  };
}
```

---

## 5. User Stories

### 5.1 Admin/Pastor User Stories

**As a pastor, I want to:**
- Search for any member quickly by name, email, or phone
- View complete member profiles with all contact information
- Take private notes about pastoral visits or conversations
- See which members belong to which households
- Filter members by status, tags, or custom criteria
- Track member engagement through activity timeline
- View demographic breakdowns of the congregation

**As a church administrator, I want to:**
- Manage all member records in one place
- Update member contact information when they move or change phone numbers
- Create and manage households
- Export member lists for mailings or events
- Track background check status for volunteers
- View membership metrics and trends

**As a small group leader, I want to:**
- See contact information for my group members
- Take notes about group interactions
- View member activity and engagement

### 5.2 Member User Stories

**As a congregation member, I want to:**
- Update my own contact information when it changes
- Control what information is visible in the directory
- Find other members' contact information in the directory
- See which volunteer teams and groups I belong to
- Manage my household information
- Add family members to my household

**As a new member, I want to:**
- Complete my profile with my information
- Set my directory visibility preferences
- Find groups to join
- See volunteer opportunities

---

## 6. Acceptance Criteria

### 6.1 Admin Side

- [ ] Admin can view complete list of all people
- [ ] Admin can search by name, email, phone, address
- [ ] Admin can filter by status, tags, household, etc.
- [ ] Admin can create, edit, and delete person records
- [ ] Admin can take notes on any person (private and public)
- [ ] Admin can view all notes (subject to permissions)
- [ ] Admin can create and manage households
- [ ] Admin can view dashboard with demographics and metrics
- [ ] Admin can see volunteer teams and groups for any person
- [ ] Directory respects privacy settings when exporting
- [ ] All actions are permission-checked

### 6.2 Member Side

- [ ] Member can view and edit own profile
- [ ] Member can update own contact information
- [ ] Member can set directory visibility preferences
- [ ] Member can view church directory (respecting privacy)
- [ ] Member can see other members' visible contact info
- [ ] Member can see own volunteer teams and groups
- [ ] Member can see public teams and groups
- [ ] Member can manage own household (if head)
- [ ] Member cannot view other members' notes
- [ ] Member cannot edit other members' profiles
- [ ] Directory search works correctly with privacy filters

### 6.3 Household Management

- [ ] Admin can create households
- [ ] Admin can add/remove members from households
- [ ] Admin can set household roles
- [ ] Head of household can manage household (if permitted)
- [ ] Household address can be set
- [ ] Household name auto-generates or is editable
- [ ] Removing person from household works correctly
- [ ] Merging households works correctly

### 6.4 Privacy & Permissions

- [ ] Directory visibility settings are respected
- [ ] Members cannot see private notes
- [ ] Members cannot see other members' full profiles
- [ ] Admin can see all information regardless of privacy settings
- [ ] Export functions respect privacy settings
- [ ] Search results respect privacy settings

---

## 7. UI/UX Requirements

### 7.1 Design Consistency
- Follow GatherChurch design system
- Use shadcn/ui components
- Dark theme support (based on Planning Center inspiration)
- Responsive design (mobile, tablet, desktop)

### 7.2 Performance
- People list loads in < 500ms for 500+ records
- Search results appear in < 200ms
- Directory view loads in < 1s
- Profile page loads in < 300ms
- Smooth pagination (no loading flicker)

### 7.3 Accessibility
- Keyboard navigation for all interactions
- Screen reader support
- ARIA labels on all interactive elements
- Focus indicators
- Color contrast compliance

### 7.4 Mobile Experience
- Touch-friendly tap targets (44px minimum)
- Swipeable cards for directory
- Bottom sheets for forms
- Simplified navigation on mobile
- Offline support for viewing (future)

---

## 8. Integration Points

### 8.1 Volunteer Teams Module
- Display teams on person profile
- Show team membership in directory
- Link from teams to member profiles
- Track team assignments

### 8.2 Groups Module
- Display groups on person profile
- Show group membership in directory
- Link from groups to member profiles
- Track group attendance

### 8.3 Services Module
- Link service item assignments to people
- Show service participation in activity timeline
- Track volunteer scheduling

### 8.4 Communications Module
- Link email/SMS history to person records
- Show communication preferences
- Track opt-in/opt-out status

### 8.5 Check-Ins Module
- Link check-ins to person records
- Show check-in history in activity timeline
- Track attendance patterns

---

## 9. Future Enhancements (Out of Scope for MVP)

- Custom fields for people
- Workflow automation
- Bulk import from CSV/Excel
- Photo upload and management
- Family tree visualization
- Member directory mobile app
- Advanced analytics and reporting
- Integration with external directories
- Member portal customizations
- Automated duplicate detection
- Member lifecycle automation
- Advanced search with AI
- Member matching/suggestions

---

## 10. Success Metrics

### 10.1 Adoption
- % of members who complete their profile
- % of members who use directory
- % of members who update their own information
- Average profile completeness score

### 10.2 Engagement
- Directory views per month
- Profile updates per month (self-service)
- Notes created per month (staff)
- Household management actions

### 10.3 Data Quality
- % of profiles with complete contact info
- % of members with photos
- % of members with directory visibility set
- Average time to update member info

---

**Document Status:** Draft for Review  
**Last Updated:** January 2026  
**Next Review:** After stakeholder feedback and video analysis
