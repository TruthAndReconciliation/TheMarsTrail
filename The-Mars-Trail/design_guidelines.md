# Design Guidelines: Oregon Trail-Style Web Game

## Design Approach

**Selected Approach:** Reference-Based with Retro Gaming Aesthetic

Drawing inspiration from classic adventure games modernized for contemporary web experiences, including:
- Oregon Trail's iconic interface and narrative presentation
- Modern indie games like Slay the Spire, FTL, Stardew Valley (UI clarity)
- Banner Saga (narrative presentation with visual impact)
- Papers Please (clean information hierarchy)

**Core Design Principles:**
1. **Nostalgic Modernization:** Honor the classic Oregon Trail aesthetic while ensuring modern usability and visual polish
2. **Narrative Clarity:** Text-heavy interface demands exceptional typography and readability
3. **Atmospheric Immersion:** Create emotional connection through deliberate visual choices
4. **Decision Prominence:** Make player choices clear and impactful

---

## Typography

**Font Families:**
- **Primary (Narrative/UI):** "Press Start 2P" or "VT323" (Google Fonts) - retro gaming aesthetic for headers and key UI elements
- **Secondary (Body Text):** "Courier Prime" or "IBM Plex Mono" (Google Fonts) - monospace for narrative text, ensures readability at longer lengths
- **Accent (Modern UI):** "Inter" (Google Fonts) - for modern UI elements like buttons, stats

**Type Hierarchy:**
- Game Title/Headers: text-2xl to text-4xl, font-bold, tracking-wide, uppercase
- Narrative Text: text-base to text-lg, leading-relaxed, max-w-2xl for optimal reading
- Action Buttons: text-sm to text-base, font-semibold, uppercase, tracking-wider
- Resource Stats: text-xs to text-sm, tabular-nums for aligned numbers
- Character Names: text-sm, font-bold

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 8 consistently
- Micro spacing: p-2, gap-2 (tight UI elements)
- Standard spacing: p-4, gap-4, m-4 (general padding, margins)
- Section spacing: p-6, py-6 (moderate sections)
- Major spacing: p-8, gap-8, mb-8 (primary containers, significant breaks)

**Container Structure:**
- Full viewport game area: min-h-screen with flex flex-col
- Main game window: max-w-4xl mx-auto for focused experience
- Narrative panel: max-w-2xl for comfortable reading
- Side panels (stats, inventory): w-64 to w-80 fixed width

**Grid Patterns:**
- Inventory items: grid-cols-3 md:grid-cols-4 gap-4
- Party members: grid-cols-2 md:grid-cols-4 gap-4
- Resource displays: grid-cols-2 md:grid-cols-4 gap-2

---

## Component Library

### Core Game Interface

**Main Game Frame:**
- Centered container (max-w-4xl) with simulated retro monitor bezel effect
- Pixelated border treatment using border-4 to border-8
- Inset shadow for depth (shadow-inner)

**Narrative Panel:**
- Dominant text area with typewriter-style text reveal capability
- Border treatment with decorative corners
- Padding p-6 to p-8 for comfortable reading
- Background treatment suggesting aged paper or monitor glow

**Resource/Stats Display:**
- Top bar showing critical resources (Food, Ammunition, Money, Health)
- Each stat in individual bordered container with icon + number + label
- Grid layout: grid-cols-2 md:grid-cols-4 gap-2
- Compact padding p-2 to p-4
- Monospace numbers for alignment

**Decision Interface:**
- Large, clearly labeled action buttons arranged vertically (stack on mobile, row on desktop)
- Each button: py-4 px-6, full-width on mobile, min-w-48 on desktop
- Include consequences preview beneath each option when relevant
- Button groups use gap-4 spacing

### Navigation & Menus

**Main Menu:**
- Centered vertical stack of options (Continue, New Game, Settings)
- Large touch targets: py-4 px-8
- Pixel-style borders and hover states
- Logo/title treatment at top with generous mb-8

**Game Menu (Pause/Settings):**
- Modal overlay with backdrop blur
- Centered card: max-w-md with p-8
- Options stacked vertically with gap-4
- Clear close/resume action

**Inventory Screen:**
- Full-screen overlay when opened
- Grid display of items with visual representations
- Each item card: p-4 with border, shows quantity and basic info
- Drag-drop zones for item management (visual feedback on hover/drag)

### Game-Specific Components

**Party Member Cards:**
- Individual cards showing: avatar/icon, name, health bar, condition status
- Compact layout: p-4 with grid structure inside
- Health visualized as progress bar (h-2 rounded-full)
- Status icons (sick, injured, healthy) as small badges

**Event Popup/Modal:**
- Dramatic entrance with backdrop-blur-sm
- Centered card: max-w-xl with p-6 to p-8
- Event illustration area at top (aspect-video or aspect-square)
- Event text followed by decision buttons
- Distinct from main narrative panel

**Progress Indicator:**
- Top or side rail showing trail progress
- Landmark nodes with connecting path
- Current position highlighted
- Distance remaining in miles

**Trading Post Interface:**
- Split layout: Inventory (left) | Available Items (right)
- Item cards with price, quantity selector
- Running total display
- Transaction buttons (Buy/Sell) clearly separated

**Death/Game Over Screen:**
- Full screen takeover with dramatic presentation
- Tombstone-style memorial showing party member details
- Statistics summary: Days traveled, miles covered, final scores
- Restart/Main Menu options below

### Forms & Inputs

**Character Creation:**
- Step-by-step form with clear progression (Step 1 of 3)
- Name inputs: px-4 py-3, border-2, rounded, monospace font
- Character class selection: large radio cards in grid-cols-1 md:grid-cols-3
- Profession cards show benefits/starting resources

**Numeric Inputs (Buying/Selling):**
- Stepper controls: - | [number] | + buttons
- Buttons sized p-2, number display px-4 py-2
- Min/max values enforced with disabled states

---

## Accessibility & Interactions

- All interactive elements min 44x44px touch targets
- Focus states with prominent outlines (ring-4 ring-offset-2)
- Keyboard navigation fully supported (arrow keys, enter, escape)
- ARIA labels for all game state information
- Screen reader announcements for critical events
- High contrast text ratios throughout (WCAG AAA where possible)

---

## Images

**Hero/Title Screen Image:**
- Full-width heroic landscape depicting wagon train on prairie
- Aspect ratio: aspect-video or h-96
- Positioned behind or above title text
- Image should evoke journey, frontier, adventure
- Placement: Top of main menu screen as backdrop

**Event Illustrations:**
- Situational illustrations for key events (river crossing, hunting, trading)
- Size: aspect-square to aspect-video, max-w-md
- Pixel art style or illustrated vignettes matching retro aesthetic
- Placement: Within event modals/popups

**Character Portraits/Icons:**
- Small avatar representations for party members
- Size: w-12 h-12 to w-16 h-16
- Simplified, iconic style
- Placement: Party member cards, character selection

**Resource Icons:**
- Food, ammunition, money, medicine, supplies
- Size: w-6 h-6 to w-8 h-8
- Line art or simplified pixel art
- Placement: Resource stat displays, inventory items

**Background Textures:**
- Subtle paper/canvas texture for narrative panels
- Monitor/CRT scan line effects (optional decorative layer)
- Weathered wood grain for UI frames
- Implementation: CSS background images, low opacity overlays

---

## Animation Strategy

**Minimal, Purposeful Motion:**
- Text typewriter effect for narrative reveals (character-by-character with pause on punctuation)
- Health bar depletion/increase (smooth transition, duration-300)
- Modal entry/exit (scale and fade, duration-200)
- Button press feedback (scale-95 active state)
- NO distracting ambient animations, parallax, or continuous motion

---

## Responsive Considerations

**Mobile (base):**
- Single column layouts throughout
- Full-width buttons and cards
- Stats collapse to 2-column grid
- Simplified navigation (hamburger menu)
- Inventory: grid-cols-2

**Tablet (md:):**
- Maintain single column for narrative
- Stats expand to 4-column grid
- Side-by-side layouts for trading/inventory
- Inventory: grid-cols-3

**Desktop (lg:):**
- Optimal max-w-4xl game window
- Full multi-column layouts
- Hover states become prominent
- Inventory: grid-cols-4