# Comprehensive Dark Mode Text Color Fixes Needed

## Components Missing Text Color Updates:

### ClientsView (line ~1346)
- Title: text-gray-900 → needs dark mode
- Subtitle: text-gray-500 → needs dark mode  
- Client cards: All text inside needs dark mode
- Client detail stats: text-gray-600/900 → needs dark mode

### AnalyticsView (line ~1520)
- Title: text-gray-900 → needs dark mode
- Subtitle: text-gray-500 → needs dark mode
- All card titles: text-gray-900 → needs dark mode
- All card text: text-gray-600/500 → needs dark mode

### Tables (CrashesTableView line ~1672)
- Table headers: text-gray-500 → needs dark mode
- Table cells: text-gray-900/600 → needs dark mode
- All table text needs conditional colors

### Modals (line ~1806, ~2004)
- Modal titles: text-gray-900 → needs dark mode
- Modal text: text-gray-500/600 → needs dark mode
- All modal content text needs updates

### HeatmapCard (line ~2224)
- Title: text-gray-900 → needs dark mode
- Table text: text-gray-600/500 → needs dark mode

I need to apply: `className={text-gray-900}` → `className={darkMode ? 'text-white' : 'text-gray-900'}`
And: `className={text-gray-600}` → `className={darkMode ? 'text-neutral-400' : 'text-gray-600'}`
And: `className={text-gray-500}` → `className={darkMode ? 'text-neutral-500' : 'text-gray-500'}`
