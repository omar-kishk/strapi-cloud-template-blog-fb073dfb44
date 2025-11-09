# Brand Compliance Prompts - AlThuraya Marketing Website

This file contains reusable prompt templates for ensuring brand compliance across all pages and components of the AlThuraya marketing website.

## Table of Contents

1. [Color Usage Verification](#color-usage-verification)
2. [Typography Verification](#typography-verification)
3. [Logo Usage Verification](#logo-usage-verification)
4. [Pattern Usage Verification](#pattern-usage-verification)
5. [Voice and Tone Compliance](#voice-and-tone-compliance)
6. [Visual Consistency Check](#visual-consistency-check)

---

## Color Usage Verification

### Brand Color Audit

**Prompt Template:**
```
Audit the color usage on {page_or_component} to ensure compliance with AlThuraya brand guidelines.

Component/Page: {name}
Location: {file_path}

AlThuraya Brand Colors:
```typescript
Primary Colors:
- Brand Blue: #1E40AF (RGB: 30, 64, 175)
  Usage: Primary CTAs, headers, links, primary brand elements

- Brand Purple: #7C3AED (RGB: 124, 58, 237)
  Usage: Accents, secondary CTAs, highlights, gradients

- Brand Amber: #F59E0B (RGB: 245, 158, 11)
  Usage: Attention elements, warnings, special offers, energy

Secondary Colors:
- Success Green: #10B981 (RGB: 16, 185, 129)
  Usage: Success messages, positive indicators

- Error Red: #EF4444 (RGB: 239, 68, 68)
  Usage: Error messages, warnings, alerts

- Dark Gray: #1F2937 (RGB: 31, 41, 55)
  Usage: Body text, headings

- Light Gray: #F3F4F6 (RGB: 243, 244, 246)
  Usage: Backgrounds, borders, subtle elements

Neutral Colors:
- White: #FFFFFF
- Black: #000000 (use sparingly, prefer dark gray)
```

Current Implementation:
"""
{paste_component_code_or_css}
"""

Audit Checklist:

1. **Color Usage Compliance**
   - [ ] Only brand-approved colors used
   - [ ] Correct usage context for each color
   - [ ] No off-brand colors (check hex values exactly)
   - [ ] Proper color hierarchy (primary > secondary > neutral)

2. **Contrast Ratios** (WCAG AA compliance)
   - [ ] Text on Brand Blue: min 4.5:1
   - [ ] Text on Brand Purple: min 4.5:1
   - [ ] Text on Brand Amber: min 4.5:1
   - [ ] All text/background combinations meet standards

3. **Color Combinations**
   - [ ] Brand-approved color pairings used
   - [ ] No clashing combinations
   - [ ] Gradients use brand colors only
   - [ ] Hover/active states use approved variations

4. **Issues Found**
   For each violation:
   - Current color used: {hex_code}
   - Location: {element/class}
   - Issue: {description}
   - Correct brand color: {replacement_hex}
   - Fix: {code_example}

5. **Accessibility Concerns**
   - Color contrast failures
   - Color-only information (need text/icons too)
   - Recommendations

Provide:
1. Summary of violations
2. Corrected code
3. Visual guidelines reference
4. Tailwind classes to use (from config)

Example Fix:
```typescript
// ❌ WRONG: Off-brand blue
<button className="bg-[#2563EB]">  // Not brand blue!
  Click Me
</button>

// ✅ CORRECT: Brand blue
<button className="bg-brand-primary hover:bg-brand-primary/90">
  Click Me
</button>

// ❌ WRONG: Random color
<div className="text-[#8B5CF6]">  // Not brand purple!
  Special Offer
</div>

// ✅ CORRECT: Brand purple
<div className="text-brand-secondary">
  Special Offer
</div>
```
```

**Example Usage:**
```
Audit the color usage on the Hero component to ensure compliance with AlThuraya brand guidelines.

Component/Page: HeroSection
Location: /components/sections/HeroSection.tsx

[Include current component code]

Focus on:
- Background gradient colors
- CTA button colors
- Text colors
- Overlay colors
- Hover states
```

---

### Color Palette Generator for New Use Cases

**Prompt Template:**
```
Generate a brand-compliant color palette for {use_case}.

Use Case: {description}
Context: {where_it_will_be_used}

Brand Colors Available:
- Primary: #1E40AF (Blue)
- Secondary: #7C3AED (Purple)
- Accent: #F59E0B (Amber)
- Success: #10B981 (Green)
- Error: #EF4444 (Red)
- Dark: #1F2937 (Gray)
- Light: #F3F4F6 (Gray)

Requirements:
1. Suggest appropriate brand colors for:
   - Primary element/action
   - Secondary element/action
   - Background
   - Text
   - Borders
   - Hover states
   - Active states
   - Disabled states

2. Provide:
   - Color justification (why this color for this purpose)
   - Tailwind CSS classes
   - Opacity variations if needed
   - Dark mode variants (if applicable)
   - Accessibility compliance confirmation

3. Example implementation code

4. Do's and Don'ts for this use case
```

**Example Usage:**
```
Generate a brand-compliant color palette for a pricing card component.

Use Case: Pricing tiers (Basic, Professional, Enterprise)
Context: Services page, featuring three pricing tiers with the Professional tier as "most popular"

Requirements:
- Basic tier: Should feel accessible and entry-level
- Professional tier: Should stand out as recommended option
- Enterprise tier: Should feel premium and exclusive
- All must maintain brand consistency
- Must work on both light and dark backgrounds
```

---

## Typography Verification

### Typography Audit

**Prompt Template:**
```
Audit typography usage on {page_or_component} for brand compliance.

Component/Page: {name}
Location: {file_path}

AlThuraya Typography Guidelines:

**English Content:**
- Font Family: Inter (Google Font)
- Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)

**Arabic Content:**
- Font Family: Cairo (Google Font)
- Weights: 400 (Regular), 600 (Semi-Bold), 700 (Bold)

**Type Scale:**
```typescript
Display (Hero Headlines):
- Desktop: 72px / 4.5rem (font-bold)
- Mobile: 48px / 3rem (font-bold)
- Line height: 1.1
- Letter spacing: -0.02em

H1 (Page Titles):
- Desktop: 48px / 3rem (font-bold)
- Mobile: 36px / 2.25rem (font-bold)
- Line height: 1.2
- Letter spacing: -0.01em

H2 (Section Titles):
- Desktop: 36px / 2.25rem (font-bold)
- Mobile: 28px / 1.75rem (font-bold)
- Line height: 1.3

H3 (Subsection Titles):
- Desktop: 28px / 1.75rem (font-semibold)
- Mobile: 24px / 1.5rem (font-semibold)
- Line height: 1.4

H4 (Component Titles):
- Desktop: 20px / 1.25rem (font-semibold)
- Mobile: 18px / 1.125rem (font-semibold)
- Line height: 1.5

Body Large:
- 18px / 1.125rem (font-normal)
- Line height: 1.7

Body (Default):
- 16px / 1rem (font-normal)
- Line height: 1.6

Body Small:
- 14px / 0.875rem (font-normal)
- Line height: 1.5

Caption:
- 12px / 0.75rem (font-normal)
- Line height: 1.4
```

Current Implementation:
"""
{paste_component_code}
"""

Audit Checklist:

1. **Font Family Compliance**
   - [ ] English content uses Inter
   - [ ] Arabic content uses Cairo
   - [ ] No fallback fonts used incorrectly
   - [ ] Font loading optimized (next/font)

2. **Type Scale Compliance**
   - [ ] Headings match prescribed sizes
   - [ ] Responsive sizing implemented (mobile/desktop)
   - [ ] Proper Tailwind classes used
   - [ ] No arbitrary text sizes

3. **Font Weights**
   - [ ] Only approved weights used
   - [ ] Proper weight for element type
   - [ ] No faux bold (ensure font weight available)

4. **Line Height & Spacing**
   - [ ] Correct line-height for text size
   - [ ] Proper letter-spacing (tracking)
   - [ ] Adequate paragraph spacing

5. **Hierarchy**
   - [ ] Clear visual hierarchy
   - [ ] Only one H1 per page
   - [ ] Heading levels not skipped (H1→H2→H3)
   - [ ] Semantic HTML used

6. **Readability**
   - [ ] Line length: 50-75 characters
   - [ ] Sufficient contrast
   - [ ] Appropriate font size for reading

Issues Found:
- {description_of_violation}
- Location: {element}
- Current: {current_value}
- Should be: {correct_value}
- Fix: {code_example}

Provide:
1. Summary of violations
2. Corrected implementation
3. Tailwind class reference

Example Fixes:
```typescript
// ❌ WRONG: Arbitrary text size
<h1 className="text-[42px]">
  Our Services
</h1>

// ✅ CORRECT: Brand-approved size
<h1 className="text-3xl md:text-5xl font-bold">
  Our Services
</h1>

// ❌ WRONG: Incorrect font weight
<h2 className="font-normal">
  Why Choose Us
</h2>

// ✅ CORRECT: Proper heading weight
<h2 className="text-2xl md:text-4xl font-bold">
  Why Choose Us
</h2>

// ❌ WRONG: Poor line height for body text
<p className="text-base leading-tight">
  Long paragraph of text...
</p>

// ✅ CORRECT: Readable line height
<p className="text-base leading-relaxed">
  Long paragraph of text...
</p>
```
```

---

### Responsive Typography Check

**Prompt Template:**
```
Verify responsive typography implementation for {component_or_page}.

Component/Page: {name}

Check the following breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

For each text element:
1. Identify current responsive classes
2. Verify against brand guidelines
3. Check visual hierarchy at each breakpoint
4. Ensure readability at all sizes

Current Code:
"""
{paste_component_code}
"""

Provide:
1. Responsive scaling analysis
2. Issues at specific breakpoints
3. Corrected responsive classes
4. Mobile-first implementation

Example:
```typescript
// ❌ WRONG: Not responsive
<h1 className="text-5xl font-bold">
  Welcome to AlThuraya
</h1>

// ✅ CORRECT: Mobile-first responsive
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
  Welcome to AlThuraya
</h1>

// ❌ WRONG: Too large on mobile
<p className="text-2xl">
  Long description text...
</p>

// ✅ CORRECT: Appropriate sizing
<p className="text-base md:text-lg">
  Long description text...
</p>
```

Test scenarios:
- Read on mobile (320px width)
- Read on tablet (768px width)
- Read on desktop (1440px width)
- Hierarchy visible at all sizes?
```

---

## Logo Usage Verification

### Logo Implementation Audit

**Prompt Template:**
```
Audit logo usage for brand compliance on {page_or_component}.

Component/Page: {name}

AlThuraya Logo Guidelines:

**Logo Variations:**
1. Primary Logo (Full Color)
   - Use on white/light backgrounds
   - File: /images/logo/althuraya-logo-primary.svg
   - Min width: 120px
   - Clear space: Logo height × 0.5 around all sides

2. White Logo
   - Use on dark backgrounds
   - File: /images/logo/althuraya-logo-white.svg
   - Min width: 120px
   - Clear space: Logo height × 0.5 around all sides

3. Monochrome Logo
   - Use when color not available
   - File: /images/logo/althuraya-logo-mono.svg
   - Min width: 100px

4. Logo Icon (Symbol Only)
   - Use for favicons, small spaces
   - File: /images/logo/althuraya-icon.svg
   - Min width: 32px

5. Arabic Logo (الثريا)
   - Use for Arabic pages/contexts
   - File: /images/logo/althuraya-logo-ar.svg
   - Min width: 120px

**Logo Don'ts:**
- ❌ Don't distort or stretch
- ❌ Don't rotate
- ❌ Don't change colors
- ❌ Don't add effects (shadows, gradients, outlines)
- ❌ Don't place on busy backgrounds without clear space
- ❌ Don't use low-resolution versions

Current Implementation:
"""
{paste_logo_usage_code}
"""

Audit Checklist:

1. **Correct Version Used**
   - [ ] Appropriate variant for background
   - [ ] Language-specific version for locale
   - [ ] Proper file format (SVG preferred)

2. **Size Requirements**
   - [ ] Meets minimum width requirement
   - [ ] Responsive sizing implemented
   - [ ] Not pixelated or blurry

3. **Clear Space**
   - [ ] Adequate padding around logo
   - [ ] No text or graphics crowding logo
   - [ ] Proper isolation from other elements

4. **Technical Implementation**
   - [ ] Using Next.js Image component (if raster)
   - [ ] Alt text present and descriptive
   - [ ] Proper dimensions specified
   - [ ] Loading strategy appropriate

5. **Accessibility**
   - [ ] Alt text: "AlThuraya" or "AlThuraya Logo"
   - [ ] Linked logo includes aria-label
   - [ ] Proper heading structure if logo is in header

Issues Found:
- {description}
- Fix: {code_example}

Correct Implementation Examples:

```typescript
// ✅ Header Logo (Primary, light background)
<Link href="/" aria-label="AlThuraya Home">
  <Image
    src="/images/logo/althuraya-logo-primary.svg"
    alt="AlThuraya"
    width={180}
    height={48}
    priority
    className="h-12 w-auto"
  />
</Link>

// ✅ Footer Logo (White, dark background)
<Image
  src="/images/logo/althuraya-logo-white.svg"
  alt="AlThuraya"
  width={180}
  height={48}
  className="h-12 w-auto"
/>

// ✅ Mobile Logo (Smaller)
<Image
  src="/images/logo/althuraya-icon.svg"
  alt="AlThuraya"
  width={40}
  height={40}
  priority
  className="h-10 w-10 md:hidden"
/>

// ✅ Arabic Version (RTL layout)
<Image
  src="/images/logo/althuraya-logo-ar.svg"
  alt="الثريا"
  width={180}
  height={48}
  priority
  className="h-12 w-auto"
/>

// ❌ WRONG: Stretched logo
<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}  // Wrong aspect ratio!
  className="w-full h-20"  // Will distort!
/>

// ❌ WRONG: Too small
<Image
  src="/logo.svg"
  alt="Logo"
  width={60}  // Below 120px minimum!
  height={20}
/>
```
```

---

## Pattern Usage Verification

### Design Pattern Compliance

**Prompt Template:**
```
Audit design pattern usage for brand consistency on {page_or_component}.

Component/Page: {name}

AlThuraya Design Patterns:

**Spacing System:**
```typescript
4px base unit (0.25rem)
- xs: 8px (0.5rem)
- sm: 12px (0.75rem)
- md: 16px (1rem)
- lg: 24px (1.5rem)
- xl: 32px (2rem)
- 2xl: 48px (3rem)
- 3xl: 64px (4rem)
- 4xl: 96px (6rem)
```

**Border Radius:**
```typescript
- sm: 4px (0.25rem) - Buttons, inputs
- md: 8px (0.5rem) - Cards, modals
- lg: 12px (0.75rem) - Large cards
- xl: 16px (1rem) - Hero sections
- full: 9999px - Pills, badges
```

**Shadows:**
```typescript
- sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
- md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
- lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
- xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
```

**Common Components:**

1. **Buttons**
   ```typescript
   Primary: bg-brand-primary, rounded-md, px-6, py-3
   Secondary: bg-brand-secondary, rounded-md, px-6, py-3
   Outline: border-2 border-brand-primary, rounded-md, px-6, py-3
   ```

2. **Cards**
   ```typescript
   bg-white, rounded-lg, shadow-md, p-6
   Hover: transition, hover:shadow-lg
   ```

3. **Input Fields**
   ```typescript
   rounded-md, border-gray-300, px-4, py-2
   Focus: focus:ring-2, focus:ring-brand-primary
   ```

4. **Sections**
   ```typescript
   Padding: py-16 md:py-24 lg:py-32
   Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
   ```

Current Implementation:
"""
{paste_component_code}
"""

Audit Checklist:

1. **Spacing Consistency**
   - [ ] Uses standard spacing scale
   - [ ] No arbitrary spacing values
   - [ ] Consistent padding/margin patterns
   - [ ] Proper responsive spacing

2. **Component Patterns**
   - [ ] Buttons match standard pattern
   - [ ] Cards follow template
   - [ ] Forms use consistent styling
   - [ ] Proper component composition

3. **Interaction Patterns**
   - [ ] Hover states defined
   - [ ] Focus states accessible
   - [ ] Transitions smooth (200-300ms)
   - [ ] Loading states handled

4. **Layout Patterns**
   - [ ] Proper grid usage
   - [ ] Container widths standard
   - [ ] Section spacing consistent
   - [ ] Responsive breakpoints correct

Issues Found:
- {description}
- Current: {code}
- Should be: {correct_code}

Example Corrections:

```typescript
// ❌ WRONG: Arbitrary spacing
<div className="p-[17px] mb-[23px]">
  Content
</div>

// ✅ CORRECT: Standard spacing scale
<div className="p-4 mb-6">
  Content
</div>

// ❌ WRONG: Inconsistent button
<button className="bg-blue-600 rounded px-4 py-1">
  Click Me
</button>

// ✅ CORRECT: Brand button pattern
<button className="bg-brand-primary hover:bg-brand-primary/90 rounded-md px-6 py-3 text-white font-medium transition-colors">
  Click Me
</button>

// ❌ WRONG: Card without pattern
<div className="bg-white p-8 rounded shadow-sm">
  Card content
</div>

// ✅ CORRECT: Standard card pattern
<div className="bg-white rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg">
  Card content
</div>
```

Extract Repeated Patterns:
- Identify repeated UI patterns in code
- Suggest component extraction
- Provide reusable component code
```

---

### Component Library Compliance

**Prompt Template:**
```
Verify that {component_name} follows AlThuraya component library standards.

Component: {component_name}
Type: {button/card/form/navigation/etc}

Component Library Standards:

**Naming Convention:**
- PascalCase for components
- Descriptive, not generic (ContactForm vs Form)
- Prefixed if part of feature (ProductCard, ServiceCard)

**Props Interface:**
```typescript
interface ComponentProps {
  // Required props first
  requiredProp: string;

  // Optional props
  optionalProp?: boolean;

  // Callback functions
  onAction?: () => void;

  // Style overrides (always optional)
  className?: string;

  // Children (if accepts)
  children?: React.ReactNode;
}
```

**Structure:**
1. Imports
2. Type/Interface definitions
3. Component function
4. Exports

**Requirements:**
- [ ] TypeScript types for all props
- [ ] Prop validation/defaults
- [ ] Accessibility attributes
- [ ] Responsive design
- [ ] Brand colors/typography
- [ ] Proper error handling
- [ ] Loading states (if async)
- [ ] Documentation comments

Current Implementation:
"""
{paste_component_code}
"""

Review:
1. Naming compliance
2. Type safety
3. Brand compliance (colors, typography, spacing)
4. Accessibility
5. Responsive behavior
6. Error handling
7. Code quality

Provide:
- Compliance score (0-100)
- Violations found
- Recommended improvements
- Refactored version if needed

Example Standard Component:

```typescript
/**
 * Primary call-to-action button component
 * Follows AlThuraya brand guidelines
 */
interface ButtonProps {
  /** Button text */
  children: React.ReactNode;

  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'outline';

  /** Button size */
  size?: 'sm' | 'md' | 'lg';

  /** Click handler */
  onClick?: () => void;

  /** Disabled state */
  disabled?: boolean;

  /** Loading state */
  isLoading?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Button type */
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  isLoading = false,
  className,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',

        // Variant styles
        variant === 'primary' && 'bg-brand-primary text-white hover:bg-brand-primary/90 focus:ring-brand-primary',
        variant === 'secondary' && 'bg-brand-secondary text-white hover:bg-brand-secondary/90 focus:ring-brand-secondary',
        variant === 'outline' && 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary',

        // Size styles
        size === 'sm' && 'px-4 py-2 text-sm rounded-md',
        size === 'md' && 'px-6 py-3 text-base rounded-md',
        size === 'lg' && 'px-8 py-4 text-lg rounded-lg',

        // State styles
        disabled && 'opacity-50 cursor-not-allowed',
        isLoading && 'cursor-wait',

        className
      )}
      aria-disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <LoadingSpinner className="mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
```
```

---

## Voice and Tone Compliance

### Content Voice & Tone Audit

**Prompt Template:**
```
Audit the voice and tone of content on {page_url} for brand alignment.

Page: {page_url}
Content Type: {marketing_copy/blog_post/service_description/about_page}
Language: {English/Arabic}

AlThuraya Brand Voice:

**Core Attributes:**
1. **Professional** - Expert and knowledgeable, but not stuffy
2. **Trustworthy** - Reliable, transparent, honest
3. **Innovative** - Forward-thinking, modern, creative
4. **Approachable** - Friendly, helpful, conversational
5. **Results-Oriented** - Focus on outcomes and value

**Voice Characteristics:**
- ✅ Use: We, our (inclusive)
- ❌ Avoid: I, me (unless personal story)
- ✅ Use: Active voice
- ❌ Avoid: Passive voice
- ✅ Use: Specific metrics and examples
- ❌ Avoid: Vague claims
- ✅ Use: Clear, concise language
- ❌ Avoid: Jargon without explanation

**Tone Variations by Context:**

Homepage:
- Confident and inspiring
- Focus on transformation and growth
- Balanced between professional and approachable

Services Pages:
- Expert and consultative
- Focus on solutions and benefits
- Professional but warm

Blog Posts:
- Educational and helpful
- Conversational but authoritative
- Actionable and practical

About Page:
- Authentic and human
- Story-driven
- Values-focused

Contact/CTAs:
- Direct and encouraging
- Remove friction
- Emphasize value, not pressure

Current Content:
"""
{paste_page_content}
"""

Audit Checklist:

1. **Voice Consistency**
   - [ ] Matches brand personality
   - [ ] Consistent throughout page
   - [ ] Appropriate for content type
   - [ ] Authentic and genuine

2. **Tone Appropriateness**
   - [ ] Suits the context
   - [ ] Matches user's emotional state
   - [ ] Professional yet approachable
   - [ ] Culturally appropriate (esp. Arabic)

3. **Language Quality**
   - [ ] Clear and concise
   - [ ] Free of jargon or explained
   - [ ] Grammar and spelling correct
   - [ ] Active voice predominantly used

4. **Brand Values Reflection**
   - [ ] Emphasizes results
   - [ ] Demonstrates expertise
   - [ ] Shows customer focus
   - [ ] Inspires trust

Issues Found:
For each issue:
- Current text: {text}
- Problem: {what's_wrong}
- Revised text: {correction}
- Reason: {why_better}

Example Corrections:

```
❌ WRONG (too vague):
"We offer great marketing services that can help your business."

✅ CORRECT (specific, results-oriented):
"We've helped over 50 Saudi businesses increase their online revenue by an average of 180% through data-driven digital marketing strategies."

---

❌ WRONG (passive, corporate):
"SEO services are provided by our team to enhance visibility."

✅ CORRECT (active, approachable):
"Our team optimizes your website to rank higher on Google and attract more customers."

---

❌ WRONG (jargon-heavy):
"Leverage our omnichannel orchestration to maximize your ROAS across touchpoints."

✅ CORRECT (clear, benefits-focused):
"We coordinate your marketing across all channels—social media, email, search—to get the best return on your investment."

---

❌ WRONG (pushy, salesy):
"BUY NOW! Limited time offer! Don't miss out!"

✅ CORRECT (encouraging, value-focused):
"Start your growth journey today with a free consultation. Let's discuss how we can help your business thrive."
```

Cultural Considerations for Arabic:
- [ ] Formal vs informal address appropriate
- [ ] Cultural references relevant
- [ ] Idioms translated meaningfully
- [ ] Respect and courtesy maintained
- [ ] Gender-neutral language where needed
```

---

## Visual Consistency Check

### Cross-Page Visual Audit

**Prompt Template:**
```
Audit visual consistency across multiple pages.

Pages to Compare:
1. {page_1_url}
2. {page_2_url}
3. {page_3_url}

Check for Consistency:

1. **Header/Navigation**
   - Logo size and placement
   - Navigation menu style
   - CTA button in header
   - Mobile menu design
   - Active state indicators

2. **Footer**
   - Layout and structure
   - Link grouping
   - Social media icons
   - Copyright notice
   - Newsletter signup (if present)

3. **Page Sections**
   - Hero section patterns
   - Content section padding
   - CTA section styles
   - Testimonials display
   - Feature showcases

4. **Typography**
   - Heading sizes
   - Body text sizes
   - Font weights usage
   - Line heights
   - Letter spacing

5. **Color Usage**
   - Primary color distribution
   - Accent color usage
   - Background colors
   - Text colors
   - Link colors

6. **Spacing**
   - Section padding (vertical)
   - Container margins
   - Element spacing
   - Grid gaps

7. **Components**
   - Button styles
   - Card designs
   - Form inputs
   - Icons
   - Badges/pills

8. **Imagery**
   - Image aspect ratios
   - Image treatment (borders, shadows)
   - Icon style (outline/solid)
   - Illustration style

For Each Inconsistency Found:
- Pages affected: {list}
- Element: {description}
- Variation: {describe_differences}
- Standard: {what_it_should_be}
- Priority: {high/medium/low}

Provide:
1. Inconsistency report
2. Recommended standard for each element
3. Implementation guide
4. Refactoring suggestions (shared components)

Example Report:

```
INCONSISTENCY #1: Button Styles
---
Pages Affected: Services page, About page
Element: Primary CTA buttons
Variation:
- Services page: rounded-lg with px-8
- About page: rounded-md with px-6
Standard: rounded-md px-6 py-3 (per design system)
Priority: Medium
Fix: Update Services page to match standard

INCONSISTENCY #2: Section Padding
---
Pages Affected: All pages
Element: Main content sections
Variation:
- Homepage: py-20
- Services: py-16
- About: py-24
Standard: py-16 md:py-24 lg:py-32 (responsive scale)
Priority: High
Fix: Apply consistent padding across all pages

INCONSISTENCY #3: Card Shadows
---
Pages Affected: Blog page, Services page
Element: Card components
Variation:
- Blog: shadow-sm
- Services: shadow-lg
Standard: shadow-md with hover:shadow-lg
Priority: Low
Fix: Standardize to shadow-md for consistency
```

Recommendations:
1. Create shared components for repeated patterns
2. Document component usage in Storybook
3. Create visual regression tests
4. Establish component review process
```

---

## Usage Guidelines

### When to Use These Prompts

1. **Before Launching**: Run all audits on new pages/components
2. **Regular Reviews**: Monthly brand compliance checks
3. **After Updates**: Verify brand alignment after design changes
4. **Team Onboarding**: Train new team members on brand standards
5. **Quality Assurance**: Include in PR review process

### Best Practices

1. **Fix in Priority Order**: Critical brand violations first
2. **Document Decisions**: Keep a log of brand decisions made
3. **Update Guidelines**: Evolve brand guidelines as needed
4. **Educate Team**: Share findings and learnings
5. **Automate Where Possible**: Set up linters for colors, spacing
6. **Create Components**: Extract patterns into reusable components
7. **Version Control**: Track brand guideline versions
8. **Get Stakeholder Approval**: Major brand changes need sign-off

### Integration with Development

```typescript
// Example: Brand color linter rule
// .eslintrc.js
module.exports = {
  rules: {
    'no-arbitrary-colors': 'error', // Prevent className="bg-[#123456]"
    'use-brand-colors': 'warn',     // Encourage brand color usage
  },
};

// Example: Component template with brand compliance
// When creating new components, always:
// 1. Use brand colors from theme
// 2. Use typography scale
// 3. Use spacing scale
// 4. Include accessibility attributes
// 5. Follow naming conventions
```

---

Remember: **Brand consistency builds trust**. These guidelines ensure every touchpoint with AlThuraya feels cohesive and professional.
