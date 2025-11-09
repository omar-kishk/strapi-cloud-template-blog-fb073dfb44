# Page Optimization Prompts - AlThuraya Marketing Website

This file contains reusable prompt templates for optimizing pages across various dimensions: SEO, performance, accessibility, and conversion.

## Table of Contents

1. [SEO Optimization](#seo-optimization)
2. [Performance Optimization](#performance-optimization)
3. [Accessibility Checks](#accessibility-checks)
4. [Conversion Optimization](#conversion-optimization)
5. [Technical SEO Audit](#technical-seo-audit)
6. [Content Optimization](#content-optimization)

---

## SEO Optimization

### Comprehensive SEO Page Audit

**Prompt Template:**
```
Perform a comprehensive SEO audit for the following page and provide optimization recommendations.

Page Information:
- URL: {page_url}
- Page Type: {homepage/service_page/blog_post/product_page}
- Target Primary Keyword: {primary_keyword}
- Target Secondary Keywords: {keyword_list}
- Target Audience: {audience_description}
- Geographic Target: {location}
- Language: {English/Arabic/Both}

Current Page Elements to Analyze:
"""
Title Tag: {current_title}
Meta Description: {current_meta_description}
H1: {current_h1}
H2s: {current_h2_list}
URL Structure: {current_url}
Content Length: {word_count} words
Image Alt Texts: {alt_text_list}
Internal Links: {internal_link_count}
External Links: {external_link_count}
"""

Provide Analysis and Recommendations for:

1. **Title Tag**
   - Current effectiveness (1-10 rating)
   - Keyword placement
   - Length (optimal: 50-60 characters)
   - Click-worthiness
   - Improved version(s)

2. **Meta Description**
   - Current effectiveness (1-10 rating)
   - Keyword inclusion
   - Length (optimal: 150-155 characters)
   - Call-to-action presence
   - Improved version(s)

3. **Header Structure**
   - H1 optimization
   - H2-H6 hierarchy
   - Keyword distribution
   - Recommendations

4. **Content Optimization**
   - Keyword density (target: 1-2%)
   - LSI keywords to add
   - Content gaps
   - Readability score
   - Recommended content additions

5. **Technical SEO**
   - URL structure optimization
   - Image optimization needs
   - Internal linking opportunities
   - External linking recommendations
   - Schema markup suggestions

6. **Competitive Analysis**
   - Top 3 ranking competitors for target keyword
   - Their advantages
   - Opportunities to outrank

7. **Action Items** (prioritized)
   - Quick wins (can implement today)
   - Medium-term improvements (this week)
   - Long-term strategies (this month)
```

**Example Usage:**
```
Perform a comprehensive SEO audit for the following page and provide optimization recommendations.

Page Information:
- URL: https://althuraya.com/en/services/social-media-marketing
- Page Type: Service page
- Target Primary Keyword: "social media marketing Saudi Arabia"
- Target Secondary Keywords: "Instagram marketing", "Facebook advertising", "social media management KSA"
- Target Audience: SME business owners and marketing managers in Saudi Arabia
- Geographic Target: Saudi Arabia (Riyadh, Jeddah, Dammam)
- Language: English (Arabic version exists at /ar/services/social-media-marketing)

Current Page Elements to Analyze:
"""
Title Tag: Social Media Marketing | AlThuraya
Meta Description: Professional social media marketing services for businesses in Saudi Arabia. Grow your brand on Instagram, Facebook, and Twitter.
H1: Social Media Marketing Services
H2s:
  - Why Social Media Marketing?
  - Our Services
  - Pricing
  - Get Started
URL Structure: /en/services/social-media-marketing
Content Length: 800 words
Image Alt Texts: ["Social media icons", "Marketing graph", "Team meeting"]
Internal Links: 3 (homepage, blog, contact)
External Links: 1 (Instagram business)
"""

[Continue with the full analysis template above]
```

---

### Keyword Optimization

**Prompt Template:**
```
Optimize the following page content for target keywords while maintaining natural readability.

Target Keywords:
- Primary: {primary_keyword}
- Secondary: {secondary_keyword_1, secondary_keyword_2}
- Long-tail: {long_tail_keywords}

Current Content:
"""
{paste_current_content}
"""

Optimization Requirements:
1. Target keyword density: 1-2% for primary, 0.5-1% for secondary
2. Include primary keyword in:
   - First 100 words
   - At least one H2
   - Conclusion
   - Naturally throughout content
3. Add LSI (Latent Semantic Indexing) keywords
4. Maintain readability (Flesch Reading Ease: 60-70)
5. Length: {target_word_count} words
6. Tone: {professional/conversational/technical}
7. Language: {English/Arabic}

Provide:
- Optimized version of content
- Keyword placement analysis
- LSI keywords used
- Readability score estimate
- Additional keyword opportunities
```

**Example Usage:**
```
Optimize the following page content for target keywords while maintaining natural readability.

Target Keywords:
- Primary: "email marketing services"
- Secondary: "email campaign management", "newsletter design"
- Long-tail: "email marketing agency Saudi Arabia", "automated email marketing"

Current Content:
"""
Email is a powerful tool for businesses. Our team helps you create emails that your customers will love. We design beautiful newsletters and send them to your subscribers. With our service, you can reach more customers and grow your business.
"""

Optimization Requirements:
1. Target keyword density: 1-2% for primary, 0.5-1% for secondary
2. Include primary keyword in:
   - First 100 words
   - At least one H2
   - Conclusion
   - Naturally throughout content
3. Add LSI keywords: automation, segmentation, deliverability, open rates, CTR
4. Maintain readability (Flesch Reading Ease: 60-70)
5. Length: 300-400 words
6. Tone: Professional but approachable
7. Language: English

Provide:
- Optimized version of content
- Keyword placement analysis
- LSI keywords used
- Readability score estimate
- Additional keyword opportunities
```

---

## Performance Optimization

### Performance Audit and Recommendations

**Prompt Template:**
```
Analyze the following page performance metrics and provide optimization recommendations.

Page: {page_url}
Framework: Next.js 15 (App Router)

Current Performance Metrics:
- Lighthouse Performance Score: {score}/100
- First Contentful Paint (FCP): {fcp_time}s
- Largest Contentful Paint (LCP): {lcp_time}s
- Time to Interactive (TTI): {tti_time}s
- Total Blocking Time (TBT): {tbt_time}ms
- Cumulative Layout Shift (CLS): {cls_score}
- Speed Index: {si_time}s

Page Characteristics:
- Number of Images: {image_count}
- Total Image Size: {total_image_size}MB
- JavaScript Bundle Size: {js_size}KB
- CSS Size: {css_size}KB
- Number of Requests: {request_count}
- Page Size: {page_size}MB
- Uses: {libraries_frameworks}

Provide Optimization Recommendations:

1. **Critical Issues** (blocking performance)
   - List top 3 critical issues
   - Impact on Core Web Vitals
   - Step-by-step fix instructions

2. **Image Optimization**
   - Images to optimize (list largest ones)
   - Format recommendations (WebP, AVIF)
   - Lazy loading opportunities
   - Responsive image suggestions
   - Next.js Image component usage

3. **JavaScript Optimization**
   - Bundle size reduction strategies
   - Code splitting opportunities
   - Dynamic imports to implement
   - Unused code to remove
   - Third-party script optimization

4. **CSS Optimization**
   - Critical CSS extraction
   - Unused CSS removal
   - Tailwind CSS purging check
   - Font loading optimization

5. **Caching Strategy**
   - Static asset caching
   - API response caching
   - Browser cache recommendations
   - CDN configuration

6. **Server-Side Optimization**
   - Server Component vs Client Component usage
   - Data fetching strategy
   - Streaming opportunities
   - Edge runtime possibilities

7. **Implementation Priority**
   - Quick wins (immediate impact, low effort)
   - High impact (significant improvement, moderate effort)
   - Long-term (strategic improvements)

Provide code examples where applicable.
```

**Example Usage:**
```
Analyze the following page performance metrics and provide optimization recommendations.

Page: https://althuraya.com/en/services
Framework: Next.js 15 (App Router)

Current Performance Metrics:
- Lighthouse Performance Score: 68/100
- First Contentful Paint (FCP): 1.8s
- Largest Contentful Paint (LCP): 3.2s
- Time to Interactive (TTI): 4.5s
- Total Blocking Time (TBT): 380ms
- Cumulative Layout Shift (CLS): 0.15
- Speed Index: 2.9s

Page Characteristics:
- Number of Images: 12
- Total Image Size: 4.5MB
- JavaScript Bundle Size: 280KB
- CSS Size: 45KB
- Number of Requests: 32
- Page Size: 5.2MB
- Uses: React 19, Next.js 15, Tailwind CSS, Framer Motion

[Continue with optimization analysis]
```

---

### Image Optimization Audit

**Prompt Template:**
```
Audit all images on {page_url} and provide optimization recommendations.

Current Images:
"""
{image_list_with_details}
Example format:
1. hero-banner.jpg - 2.5MB, 4000x3000px, displayed at 1200x800px
2. service-icon-1.png - 45KB, 500x500px, displayed at 64x64px
3. team-photo.jpg - 1.8MB, 3000x2000px, displayed at 800x600px
"""

For Each Image Provide:
1. **Current State**
   - File format
   - File size
   - Actual dimensions
   - Display dimensions
   - Loading strategy (eager/lazy)
   - Format (JPEG/PNG/WebP/SVG)

2. **Optimization Recommendations**
   - Recommended format (WebP/AVIF)
   - Recommended dimensions
   - Compression level
   - Expected size reduction
   - Next.js Image component configuration

3. **Implementation Code**
   ```typescript
   // Before
   <img src="..." alt="..." />

   // After (optimized)
   <Image
     src="..."
     alt="..."
     width={...}
     height={...}
     sizes="..."
     quality={...}
     priority={...}
   />
   ```

4. **Alt Text Review**
   - Current alt text
   - SEO-optimized alt text suggestion
   - Accessibility compliance

5. **Summary**
   - Total current size: X MB
   - Optimized size: Y MB
   - Savings: Z MB (XX% reduction)
   - LCP improvement estimate
```

---

## Accessibility Checks

### WCAG 2.1 AA Compliance Audit

**Prompt Template:**
```
Perform a WCAG 2.1 AA accessibility audit for {page_url}.

Page Type: {page_type}
Framework: Next.js 15 + React 19
Target Compliance Level: WCAG 2.1 AA

Audit Criteria:

1. **Perceivable**
   - [ ] Text alternatives for non-text content
   - [ ] Captions for multimedia
   - [ ] Content can be presented in different ways
   - [ ] Content is distinguishable (color contrast)

2. **Operable**
   - [ ] All functionality keyboard accessible
   - [ ] Users have enough time to read content
   - [ ] No content causes seizures
   - [ ] Users can navigate and find content
   - [ ] Input modalities beyond keyboard

3. **Understandable**
   - [ ] Text is readable and understandable
   - [ ] Content appears and operates predictably
   - [ ] Users helped to avoid and correct mistakes

4. **Robust**
   - [ ] Compatible with assistive technologies
   - [ ] Valid HTML/proper ARIA usage

For the following page elements, analyze:
"""
{paste_page_html_or_components}
"""

Provide:

1. **Critical Violations** (must fix)
   - Issue description
   - WCAG criterion violated
   - User impact
   - Fix with code example

2. **Warnings** (should fix)
   - Issue description
   - Best practice
   - Recommendation

3. **Color Contrast Issues**
   - Text/background combinations failing 4.5:1 ratio
   - Suggested color adjustments
   - Updated Tailwind classes

4. **Keyboard Navigation**
   - Elements not keyboard accessible
   - Missing focus indicators
   - Tab order issues
   - Recommendations with code

5. **ARIA Implementation**
   - Missing ARIA labels
   - Incorrect ARIA usage
   - Proper ARIA examples

6. **Semantic HTML**
   - Non-semantic div/span usage
   - Missing landmarks
   - Heading hierarchy issues
   - Corrected markup

7. **Form Accessibility**
   - Missing labels
   - Error message associations
   - Required field indicators
   - Form validation accessibility

8. **Testing Checklist**
   - [ ] Keyboard-only navigation test
   - [ ] Screen reader test (NVDA/JAWS/VoiceOver)
   - [ ] Color contrast check (all text)
   - [ ] Focus indicator visibility
   - [ ] Form error handling
   - [ ] Alternative text completeness
   - [ ] Skip navigation links

Priority: {High/Medium/Low} for each issue
Estimated effort: {Hours/Days} for fixes
```

**Example Usage:**
```
Perform a WCAG 2.1 AA accessibility audit for https://althuraya.com/en/contact.

Page Type: Contact form page
Framework: Next.js 15 + React 19
Target Compliance Level: WCAG 2.1 AA

[Include current page HTML/JSX components]

Focus areas:
- Contact form accessibility
- Error message handling
- Focus management
- Color contrast on CTA buttons
- Mobile touch targets
```

---

### Keyboard Navigation Audit

**Prompt Template:**
```
Audit keyboard navigation and focus management for {component_or_page}.

Component/Page: {name}
Type: {navigation_menu/form/modal/dropdown/tabs/carousel}

Current Implementation:
"""
{paste_component_code}
"""

Audit Checklist:

1. **Tab Order**
   - [ ] Logical tab sequence
   - [ ] No keyboard traps
   - [ ] Skip links present (if applicable)
   - [ ] Tab index used appropriately

2. **Focus Indicators**
   - [ ] Visible focus styles
   - [ ] Sufficient contrast (3:1 minimum)
   - [ ] Not removed by CSS
   - [ ] Custom focus styles if needed

3. **Keyboard Shortcuts**
   - [ ] Arrow keys for navigation (where appropriate)
   - [ ] Enter/Space for activation
   - [ ] Escape to close modals/dropdowns
   - [ ] Home/End for lists (where appropriate)

4. **Interactive Elements**
   - [ ] All clickable elements keyboard accessible
   - [ ] Proper button vs link usage
   - [ ] Form controls properly labeled

5. **Dynamic Content**
   - [ ] Focus management on page changes
   - [ ] Announcements for screen readers
   - [ ] Loading states keyboard accessible

Provide:

1. **Issues Found**
   - Description
   - User impact
   - WCAG criterion

2. **Recommended Fixes**
   - Updated code with proper keyboard handling
   - ARIA attributes if needed
   - Focus management implementation

3. **Testing Instructions**
   - Keyboard navigation flow
   - Expected behavior for each interaction
   - Edge cases to test

Example Format:
```typescript
// Issue: Modal doesn't trap focus
// Fix:
'use client';

import { useEffect, useRef } from 'react';
import { FocusTrap } from '@/components/ui/focus-trap';

export function Modal({ isOpen, onClose, children }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <FocusTrap>
      <div role="dialog" aria-modal="true">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </FocusTrap>
  );
}
```
```

---

## Conversion Optimization

### Landing Page Conversion Audit

**Prompt Template:**
```
Analyze the conversion effectiveness of {page_url} and provide optimization recommendations.

Page Information:
- URL: {page_url}
- Type: {landing_page/service_page/product_page}
- Traffic Source: {organic/paid/social/email}
- Target Action: {form_submission/purchase/download/signup}
- Current Conversion Rate: {conversion_rate}%
- Industry Benchmark: {benchmark_rate}%

Current Page Elements:
"""
Headline: {headline}
Subheadline: {subheadline}
Value Proposition: {value_prop}
Primary CTA: {primary_cta}
Secondary CTA: {secondary_cta}
Social Proof: {testimonials/reviews/logos/stats}
Trust Signals: {trust_badges/guarantees/certifications}
Above-the-fold Content: {description}
Form Fields: {field_list}
Visual Hierarchy: {description}
"""

Analyze and Provide Recommendations for:

1. **Value Proposition Clarity**
   - Is the value immediately clear?
   - Does it address visitor's pain points?
   - Is it differentiated from competitors?
   - Recommended improvements

2. **Call-to-Action Optimization**
   - CTA visibility and placement
   - Button copy effectiveness
   - Color and contrast
   - Number and positioning of CTAs
   - Suggested A/B test variations

3. **Trust and Credibility**
   - Social proof effectiveness
   - Trust signals present
   - Risk reversal elements
   - Testimonial quality
   - Recommendations

4. **Form Optimization**
   - Number of fields (recommend minimum)
   - Field labels clarity
   - Error handling
   - Progressive disclosure opportunities
   - Multi-step form consideration

5. **Visual Hierarchy**
   - Eye-flow analysis
   - Information architecture
   - White space usage
   - Typography effectiveness
   - Image/video placement

6. **Mobile Conversion**
   - Mobile-specific issues
   - Touch target sizes
   - Mobile form usability
   - Mobile CTA accessibility

7. **Page Speed Impact**
   - Loading time effect on conversion
   - Priority optimization areas
   - Estimated conversion lift from improvements

8. **Psychological Triggers**
   - Scarcity/urgency elements
   - Social proof placement
   - Authority signals
   - Reciprocity opportunities

9. **A/B Test Recommendations**
   - Highest-impact test ideas
   - Test hypothesis for each
   - Expected impact (high/medium/low)
   - Implementation complexity

10. **Estimated Impact**
    - Current conversion rate: X%
    - Projected conversion rate: Y%
    - Expected lift: Z%
    - ROI estimate

Prioritize recommendations by:
- Expected impact (High/Medium/Low)
- Implementation effort (Easy/Medium/Hard)
- Quick wins to implement first
```

**Example Usage:**
```
Analyze the conversion effectiveness of our Social Media Marketing service page and provide optimization recommendations.

Page Information:
- URL: https://althuraya.com/en/services/social-media-marketing
- Type: Service page / Landing page
- Traffic Source: Organic search (60%), Paid ads (30%), Social (10%)
- Target Action: Contact form submission (request quote)
- Current Conversion Rate: 2.3%
- Industry Benchmark: 3.5-5% for B2B services

Current Page Elements:
"""
Headline: Social Media Marketing Services
Subheadline: Grow your brand on social media with our expert management services
Value Proposition: We help businesses increase their social media presence and engagement
Primary CTA: Get a Free Quote
Secondary CTA: View Our Work
Social Proof: 3 client testimonials, "50+ clients served" stat
Trust Signals: None visible
Above-the-fold Content: Hero image, headline, subheadline, one CTA button
Form Fields: Name, Email, Phone, Company, Service Interest (dropdown), Message, Submit
Visual Hierarchy: Traditional layout, hero section, features, testimonials, form
"""

[Continue with full analysis]
```

---

### A/B Test Hypothesis Generator

**Prompt Template:**
```
Generate A/B test hypotheses for improving {metric} on {page_url}.

Test Context:
- Page: {page_url}
- Current Metric: {conversion_rate/click_rate/signup_rate}: {current_value}%
- Goal: {target_value}%
- Traffic: {monthly_visitors} visitors/month
- Element to Test: {headline/CTA/form/layout/images/copy}
- Priority: {high/medium/low}

User Research Insights:
"""
{paste_user_feedback_analytics_insights}
"""

For Each Hypothesis, Provide:

1. **Hypothesis Statement**
   Format: "If we [change], then [metric] will [increase/decrease] because [reason based on user insight]"

2. **Test Details**
   - Control (A): Current version description
   - Variant (B): Proposed change description
   - What's being tested: Specific element
   - Expected impact: Percentage lift estimate

3. **Success Criteria**
   - Primary metric
   - Secondary metrics
   - Minimum detectable effect
   - Sample size needed
   - Test duration estimate

4. **Implementation Complexity**
   - Technical difficulty: Low/Medium/High
   - Design resources needed: Yes/No
   - Development time: Hours/Days
   - Risk level: Low/Medium/High

5. **Mockup/Code Example**
   - Visual description of change
   - Code snippet if applicable

Generate 5 test hypotheses, ranked by:
- Potential impact
- Ease of implementation
- Statistical confidence needed

Example Format:
```
Hypothesis #1: Hero CTA Button Color
---
If we change the CTA button color from blue (#1E40AF) to orange (#F59E0B), then click-through rate will increase by 15% because:
- Orange creates higher contrast against white background (better visibility)
- Orange aligns with "urgency" psychology
- User testing showed blue blends with other page elements

Control (A):
- Blue button: "Get Started" (#1E40AF background, white text)

Variant (B):
- Orange button: "Get Started" (#F59E0B background, white text)
- All other elements unchanged

Success Criteria:
- Primary: CTA click-through rate
- Secondary: Form submissions, bounce rate
- MDE: 10% relative improvement
- Sample size: 1,000 visitors per variant
- Duration: 2 weeks

Implementation:
- Complexity: Low (color change only)
- Design: Not needed
- Dev time: 15 minutes
- Risk: Low (easy to revert)

Code:
<Button className="bg-brand-accent hover:bg-brand-accent/90">
  Get Started
</Button>
```
```

---

## Technical SEO Audit

### Technical SEO Checklist

**Prompt Template:**
```
Perform a technical SEO audit for {website_url}.

Website: {website_url}
Platform: Next.js 15 (App Router)
Hosting: {hosting_provider}
CDN: {cdn_provider}

Audit the Following:

1. **Crawlability**
   - [ ] robots.txt configuration
   - [ ] XML sitemap presence and validity
   - [ ] URL structure (clean, descriptive)
   - [ ] Pagination handling
   - [ ] Redirect chains
   - [ ] 404 errors
   - [ ] Broken links

2. **Indexability**
   - [ ] Meta robots tags
   - [ ] Canonical tags implementation
   - [ ] Duplicate content issues
   - [ ] Noindex usage
   - [ ] Parameter handling

3. **Site Architecture**
   - [ ] URL structure depth (max 3 levels)
   - [ ] Internal linking strategy
   - [ ] Breadcrumb implementation
   - [ ] Site hierarchy clarity

4. **Mobile Optimization**
   - [ ] Mobile-friendly design
   - [ ] Responsive breakpoints
   - [ ] Touch target sizes (min 44x44px)
   - [ ] Mobile page speed
   - [ ] Mobile usability issues

5. **Page Speed**
   - [ ] Core Web Vitals (LCP, FID, CLS)
   - [ ] Server response time
   - [ ] Render-blocking resources
   - [ ] Image optimization
   - [ ] Caching strategy

6. **Structured Data**
   - [ ] Schema markup presence
   - [ ] JSON-LD implementation
   - [ ] Rich snippets eligibility
   - [ ] Organization schema
   - [ ] Breadcrumb schema
   - [ ] Article/BlogPosting schema (if applicable)

7. **Security**
   - [ ] HTTPS implementation
   - [ ] SSL certificate validity
   - [ ] Mixed content issues
   - [ ] Security headers

8. **International/Multilingual**
   - [ ] Hreflang tags (for ar/en)
   - [ ] Language selector
   - [ ] Geo-targeting settings
   - [ ] Duplicate content across languages

9. **Next.js Specific**
   - [ ] Metadata API usage
   - [ ] generateStaticParams implementation
   - [ ] sitemap.ts configuration
   - [ ] robots.ts configuration
   - [ ] App Router best practices

For Each Section:
- ✅ Passing criteria
- ❌ Failing criteria with details
- ⚠️  Warnings/improvements
- 🔧 Fix instructions with code examples
- Priority: High/Medium/Low

Generate:
1. Executive summary
2. Critical issues (must fix immediately)
3. Optimization opportunities
4. Implementation roadmap
```

---

## Content Optimization

### Content Gap Analysis

**Prompt Template:**
```
Perform a content gap analysis for {topic/keyword_cluster}.

Target Topic: {main_topic}
Target Keywords: {keyword_list}
Competitors: {competitor_urls}

Analysis Required:

1. **Current Content Inventory**
   List all existing content:
   - URL
   - Title
   - Keywords targeted
   - Word count
   - Last updated
   - Current ranking

2. **Competitor Content Analysis**
   For each competitor, analyze:
   - Topics they cover that we don't
   - Keywords they rank for
   - Content depth and quality
   - Content format (blog/guide/video)
   - Engagement metrics (if available)

3. **Keyword Gap**
   - Keywords competitors rank for but we don't
   - Search volume for each keyword
   - Difficulty score
   - Opportunity score

4. **Content Recommendations**
   For each gap, provide:
   - Recommended content title
   - Content type (blog post/guide/landing page)
   - Target keywords
   - Suggested word count
   - Key topics to cover
   - Internal linking opportunities
   - Priority (high/medium/low)

5. **Content Update Recommendations**
   For existing content:
   - Pages that need updates
   - Content to add
   - Keywords to optimize for
   - Expected ranking improvement

6. **Content Calendar**
   - Prioritized list of content to create
   - Timeline (this month/next 3 months/next 6 months)
   - Resources needed
   - Expected traffic impact

Format as actionable content brief for each recommendation.
```

---

## Best Practices

1. **Use These Prompts Iteratively**: Start with audit, then apply specific optimization prompts
2. **Prioritize by Impact**: Focus on high-impact, low-effort improvements first
3. **Test Changes**: Always A/B test significant changes before full rollout
4. **Measure Results**: Track metrics before and after optimizations
5. **Regular Audits**: Run these audits quarterly or after major changes
6. **Mobile-First**: Always consider mobile experience in optimizations
7. **Accessibility First**: Never sacrifice accessibility for aesthetics
8. **Performance Monitoring**: Set up continuous monitoring with Lighthouse CI
9. **User Feedback**: Combine these technical audits with actual user feedback
10. **Document Changes**: Keep a changelog of optimizations and their results
