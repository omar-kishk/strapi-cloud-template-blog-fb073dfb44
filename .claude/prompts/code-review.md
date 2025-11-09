# Code Review Prompt Template

Use this template when reviewing code in the Thuraya Pharmacy platform.

## Review Checklist

### 1. Functionality ✅
- [ ] Code implements the requirements correctly
- [ ] Edge cases are handled properly
- [ ] Error handling is comprehensive
- [ ] Business logic is correct
- [ ] No obvious bugs or logical errors

### 2. Code Quality 📝
- [ ] Code is readable and well-structured
- [ ] Functions are small and focused (single responsibility)
- [ ] Variable and function names are descriptive
- [ ] No code duplication (DRY principle)
- [ ] Comments explain "why" not "what"
- [ ] Complex logic is documented

### 3. TypeScript Best Practices 🔷
- [ ] No `any` types (use `unknown` if type is truly unknown)
- [ ] Proper type annotations for function parameters
- [ ] Explicit return types for all functions
- [ ] Interfaces used for object shapes
- [ ] Enums used for fixed value sets
- [ ] Type guards for runtime type checking
- [ ] Generics used where appropriate

### 4. Architecture & Design 🏗️
- [ ] Follows established patterns (Controller → Service → Repository)
- [ ] Proper separation of concerns
- [ ] Dependencies injected correctly (NestJS)
- [ ] No circular dependencies
- [ ] Follows SOLID principles
- [ ] Scalable and maintainable

### 5. Performance ⚡
- [ ] No N+1 query problems
- [ ] Efficient database queries (use `select`, `include` wisely)
- [ ] Proper indexes used
- [ ] Caching implemented where appropriate
- [ ] No unnecessary computations in loops
- [ ] Lazy loading for heavy components
- [ ] Images optimized

### 6. Security 🔒
- [ ] Input validation implemented (class-validator, Zod)
- [ ] SQL injection prevented (Prisma handles this)
- [ ] XSS prevention (sanitize outputs)
- [ ] CSRF protection in place
- [ ] Authentication required where needed
- [ ] Authorization enforced (role-based)
- [ ] Sensitive data not logged
- [ ] Secrets not hardcoded
- [ ] Rate limiting for public endpoints

### 7. Testing 🧪
- [ ] Unit tests written and passing
- [ ] Test coverage meets target (80%+)
- [ ] Edge cases tested
- [ ] Error scenarios tested
- [ ] Mocks used appropriately
- [ ] Test names are descriptive
- [ ] Tests are independent

### 8. API Design (Backend) 🌐
- [ ] RESTful conventions followed
- [ ] Proper HTTP methods used (GET, POST, PATCH, DELETE)
- [ ] Appropriate status codes returned
- [ ] DTOs for all request/response bodies
- [ ] Validation rules on DTOs
- [ ] Swagger documentation updated
- [ ] API versioning considered (/v1/)
- [ ] Pagination for list endpoints

### 9. React/Next.js (Frontend) ⚛️
- [ ] Server Components by default, Client Components when needed
- [ ] Proper use of hooks (no violations of rules of hooks)
- [ ] Components are reusable and composable
- [ ] Props properly typed
- [ ] No prop drilling (use context/state management)
- [ ] Memoization used where needed (useMemo, useCallback)
- [ ] Loading states implemented
- [ ] Error boundaries in place

### 10. Styling & UI 🎨
- [ ] Tailwind CSS used consistently
- [ ] shadcn/ui components used where available
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] RTL support (use logical properties: ps/pe, not pl/pr)
- [ ] Consistent spacing and typography
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Dark mode considered (if applicable)

### 11. Internationalization (i18n) 🌍
- [ ] Arabic and English translations provided
- [ ] Translation keys descriptive
- [ ] RTL layout works correctly
- [ ] Number formatting locale-aware
- [ ] Date formatting locale-aware
- [ ] Directional icons mirrored in RTL

### 12. Database (Prisma) 🗄️
- [ ] Schema changes in migration files
- [ ] Indexes added for foreign keys and frequently queried fields
- [ ] Relationships properly defined
- [ ] Cascade deletes handled correctly
- [ ] Default values set where appropriate
- [ ] Constraints added (unique, check)
- [ ] JSONB used for flexible data (not excessive)

### 13. Error Handling ⚠️
- [ ] Try-catch blocks where needed
- [ ] Proper error types thrown (NestJS exceptions)
- [ ] Error messages are user-friendly
- [ ] Errors logged with context
- [ ] Stack traces not exposed to users
- [ ] Graceful degradation

### 14. Documentation 📚
- [ ] JSDoc comments for public APIs
- [ ] Complex logic explained
- [ ] Swagger/OpenAPI docs updated
- [ ] README updated (if needed)
- [ ] Architecture Decision Records (ADR) added (if applicable)

### 15. Git & Version Control 🔀
- [ ] Commit messages follow convention (feat/fix/refactor)
- [ ] Branch named appropriately (feature/THUR-123-product-reviews)
- [ ] No large files committed
- [ ] No sensitive data in commits
- [ ] PR description complete and clear
- [ ] PR linked to Jira ticket

### 16. Saudi Arabia Specifics 🇸🇦
- [ ] Currency displayed as SAR
- [ ] Tax calculation (15% VAT)
- [ ] Arabic language prioritized
- [ ] RTL layout default
- [ ] Prescription requirements enforced
- [ ] Pharmacist approval workflow
- [ ] PDPL compliance (privacy)
- [ ] Saudi FDA compliance

## Review Comments Template

### Blocking Issues (Must fix before merge) 🚫

```markdown
**Blocking**: [Issue description]

**Location**: [File:Line]

**Problem**:
[Detailed explanation of the issue]

**Solution**:
[How to fix it]

**Example**:
```typescript
// ❌ Bad
const data = await fetchData() as any;

// ✅ Good
interface FetchDataResponse {
  id: string;
  name: string;
}
const data = await fetchData() as FetchDataResponse;
```
```

### Suggestions (Nice to have, not blocking) 💡

```markdown
**Suggestion**: [Improvement idea]

**Location**: [File:Line]

**Current**:
[What's there now]

**Proposed**:
[Better approach]

**Benefit**:
[Why this is better - performance/readability/maintainability]
```

### Questions (Need clarification) ❓

```markdown
**Question**: [What you're unclear about]

**Location**: [File:Line]

**Context**:
[Why you're asking]
```

### Praise (Good practices to encourage) ⭐

```markdown
**Nice work!**: [What was done well]

**Location**: [File:Line]

**Why this is good**:
[Explain the benefit]
```

## Example Code Review

```markdown
# Code Review: Add Product Review Feature (PR #542)

## Summary
This PR implements the product review system allowing customers to rate and review purchased products. Overall good implementation with comprehensive tests. Found a few issues that need addressing before merge.

## General Feedback
✅ **Good**:
- Excellent test coverage (87%)
- Proper TypeScript typing throughout
- Good separation of concerns
- Well-documented complex logic

⚠️ **Needs attention**:
- Missing validation for review images
- Performance concern with review aggregation
- Missing Arabic translations

---

## Detailed Review

### Blocking Issues 🚫

#### 1. Missing Input Validation for Images

**Location**: `src/modules/review/dto/create-review.dto.ts:15`

**Problem**:
Images array accepts any URLs without validation. Users could submit malicious URLs or non-image files.

**Solution**:
Add validation for:
- File type (JPEG, PNG only)
- File size (max 5MB per image)
- Maximum 3 images
- URL must be from Azure Blob Storage domain

**Example**:
```typescript
// ❌ Current
@IsOptional()
@IsArray()
images?: string[];

// ✅ Better
@IsOptional()
@IsArray()
@ArrayMaxSize(3, { message: 'Maximum 3 images allowed' })
@IsUrl({}, { each: true })
@Matches(/^https:\/\/thurayastorage\.blob\.core\.windows\.net\/.*\.(jpg|jpeg|png)$/i, {
  each: true,
  message: 'Invalid image URL',
})
images?: string[];
```

#### 2. N+1 Query Problem in Review Aggregation

**Location**: `src/modules/review/review.service.ts:45-52`

**Problem**:
When calculating average rating, the code fetches all reviews individually in a loop:

```typescript
// ❌ Current (N+1 problem)
for (const review of reviews) {
  totalRating += review.rating;
}
const avgRating = totalRating / reviews.length;
```

**Solution**:
Use Prisma aggregation to calculate on database side:

```typescript
// ✅ Better
const aggregation = await this.prisma.review.aggregate({
  where: { productId, status: 'APPROVED' },
  _avg: { rating: true },
  _count: { rating: true },
});

await this.prisma.product.update({
  where: { id: productId },
  data: {
    averageRating: aggregation._avg.rating || 0,
    reviewCount: aggregation._count.rating,
  },
});
```

**Performance Impact**:
- Current: 1 + N queries (N = number of reviews)
- Proposed: 2 queries total
- For product with 100 reviews: 101 queries → 2 queries (50x improvement)

#### 3. Missing Transaction for Review Approval

**Location**: `src/modules/review/review.service.ts:78`

**Problem**:
Updating review status and recalculating product rating are two separate operations. If rating calculation fails, review will be approved but product rating won't update.

**Solution**:
Wrap in Prisma transaction:

```typescript
// ✅ Use transaction
async approveReview(reviewId: string): Promise<Review> {
  return this.prisma.$transaction(async (tx) => {
    // 1. Update review status
    const review = await tx.review.update({
      where: { id: reviewId },
      data: { status: 'APPROVED' },
    });

    // 2. Recalculate product rating
    await this.recalculateProductRating(review.productId, tx);

    return review;
  });
}
```

---

### Suggestions 💡

#### 1. Extract Magic Numbers to Constants

**Location**: `src/modules/review/review.service.ts:12`

**Current**:
```typescript
const reviews = await this.prisma.review.findMany({
  take: 20,
  skip: (page - 1) * 20,
});
```

**Proposed**:
```typescript
const REVIEWS_PER_PAGE = 20;

const reviews = await this.prisma.review.findMany({
  take: REVIEWS_PER_PAGE,
  skip: (page - 1) * REVIEWS_PER_PAGE,
});
```

**Benefit**: Easier to maintain and change pagination size across the codebase.

#### 2. Add Helper Method for Purchase Verification

**Location**: `src/modules/review/review.service.ts:25-35`

**Current**:
Purchase verification logic is inline in `createReview()` method.

**Proposed**:
Extract to separate method:

```typescript
private async verifyUserPurchasedProduct(
  userId: string,
  productId: string
): Promise<OrderItem | null> {
  return this.prisma.orderItem.findFirst({
    where: {
      order: { userId, paymentStatus: 'PAID' },
      productId,
    },
  });
}

// Then use:
const orderItem = await this.verifyUserPurchasedProduct(userId, productId);
if (!orderItem) {
  throw new ForbiddenException('You can only review products you have purchased');
}
```

**Benefit**: More testable, reusable, and follows single responsibility principle.

#### 3. Cache Product Average Rating

**Location**: `src/modules/review/review.service.ts:45`

**Current**:
Every time reviews are fetched, average rating is recalculated.

**Proposed**:
Store `averageRating` and `reviewCount` in Product model, update on review approval/rejection:

```typescript
// In Product model
model Product {
  // ... other fields
  averageRating  Decimal? @default(0) @db.Decimal(3, 2)
  reviewCount    Int      @default(0)
}

// Update on review status change
async updateProductRatingCache(productId: string) {
  const stats = await this.getReviewStats(productId);
  await this.prisma.product.update({
    where: { id: productId },
    data: {
      averageRating: stats.average,
      reviewCount: stats.count,
    },
  });
}
```

**Benefit**: Much faster product listing queries, reduces database load.

---

### Questions ❓

#### 1. Review Image Storage

**Location**: `src/modules/review/review.controller.ts:45`

**Question**: How are review images uploaded to Azure Blob Storage? I don't see the upload endpoint.

**Context**: The DTO accepts image URLs, but there's no controller method for uploading images. Are users expected to upload directly to Blob Storage via a pre-signed URL?

#### 2. Review Editing

**Location**: `src/modules/review/review.service.ts`

**Question**: Should users be able to edit their reviews after submission? Current implementation only has create, approve, reject.

**Context**: Most e-commerce platforms allow users to edit reviews within a certain timeframe.

#### 3. Pharmacist Permissions

**Location**: `src/modules/review/review.controller.ts:78`

**Question**: Should only pharmacists approve/reject reviews, or can admins do it too?

**Context**: The `@Roles('PHARMACIST')` decorator is used, but `ADMIN` might also need this permission.

---

### Praise ⭐

#### 1. Excellent Test Coverage

**Location**: `src/modules/review/review.service.spec.ts`

**Why this is good**:
- 87% coverage is excellent
- All edge cases covered (duplicate reviews, not purchased, invalid rating)
- Good use of mocks for PrismaService
- Descriptive test names

#### 2. Proper Error Handling

**Location**: `src/modules/review/review.service.ts:30`

**Why this is good**:
```typescript
if (existingReview) {
  throw new ConflictException('You have already reviewed this product');
}
```

Using proper NestJS exception types instead of generic Error. This will return correct HTTP status codes (409 Conflict).

#### 3. Well-Documented DTOs

**Location**: `src/modules/review/dto/create-review.dto.ts`

**Why this is good**:
```typescript
@ApiProperty({
  description: 'Rating from 1 to 5 stars',
  minimum: 1,
  maximum: 5,
  example: 5,
})
@IsInt()
@Min(1)
@Max(5)
rating: number;
```

Excellent Swagger documentation with examples. This makes API very clear for frontend developers.

---

## Summary of Required Changes

### Must Fix Before Merge (3 items):
1. ✅ Add image URL validation
2. ✅ Fix N+1 query in rating aggregation
3. ✅ Add transaction for review approval

### Recommended (3 items):
1. 💡 Extract magic numbers to constants
2. 💡 Add helper method for purchase verification
3. 💡 Cache average rating in Product model

### Questions to Answer (3 items):
1. ❓ How are review images uploaded?
2. ❓ Should users be able to edit reviews?
3. ❓ Can admins also approve reviews?

---

## Approval Status: ⏸️ Changes Requested

Please address the 3 blocking issues and answer the questions. The suggestions are optional but recommended. Re-request review when ready.

Great work overall! The feature is well-implemented and thoroughly tested. 👍
```

## Usage Instructions

1. **Read the PR** thoroughly before starting review
2. **Run the code** locally if possible
3. **Check tests** - run them and review coverage
4. **Use this checklist** to ensure comprehensive review
5. **Be constructive** - suggest solutions, not just problems
6. **Be specific** - reference exact files and line numbers
7. **Prioritize** - distinguish blocking vs. nice-to-have
8. **Approve or request changes** based on findings

## Review Response Times

- **P1 (Critical hotfix)**: Review within 2 hours
- **P2 (High priority)**: Review within 1 day
- **P3 (Normal)**: Review within 2 days
- **P4 (Low priority)**: Review within 1 week

This template ensures consistent, thorough, and constructive code reviews across the Thuraya platform.
