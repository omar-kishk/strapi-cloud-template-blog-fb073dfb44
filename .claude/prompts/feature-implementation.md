# Feature Implementation Prompt Template

Use this template when implementing new features in the Thuraya Pharmacy platform.

## Prompt Structure

```markdown
# Feature: [Feature Name]

## Context
- **Module**: [Product/Order/User/Payment/etc.]
- **User Story**: As a [user type], I want to [action] so that [benefit]
- **Priority**: [Critical/High/Medium/Low]
- **Sprint**: [Sprint number]

## Requirements

### Functional Requirements
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

### Non-Functional Requirements
- **Performance**: [Response time requirements]
- **Security**: [Security considerations]
- **Scalability**: [Scalability requirements]
- **Accessibility**: [WCAG compliance level]

### Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Technical Specifications

### Backend (NestJS)
- **Endpoint**: [HTTP method] /api/v1/[resource]
- **Controller**: [ControllerName]
- **Service**: [ServiceName]
- **Repository**: Prisma [ModelName]
- **DTOs**: [CreateDto, UpdateDto, ResponseDto]
- **Validation**: [Validation rules]

### Frontend (Next.js)
- **Route**: /[locale]/[route]
- **Component**: [ComponentName]
- **Server/Client**: [Server Component/Client Component]
- **State Management**: [Zustand store/React Query]
- **Styling**: [Tailwind classes, shadcn/ui components]

### Database
- **Models**: [List of Prisma models]
- **Relations**: [Relationships between models]
- **Indexes**: [Indexes to add]
- **Migrations**: [Migration description]

### Integration
- **External APIs**: [D365/Payment Gateway/Delivery/etc.]
- **Events**: [Events to publish/subscribe]
- **Webhooks**: [Webhook endpoints needed]

## Implementation Steps

### Phase 1: Backend
1. Create DTOs with validation
2. Implement service layer with business logic
3. Create controller with endpoints
4. Write unit tests (target: 80%+ coverage)
5. Write integration tests
6. Update Swagger documentation

### Phase 2: Frontend
1. Create UI components
2. Implement form validation (Zod)
3. Connect to API (React Query)
4. Add loading and error states
5. Ensure RTL/LTR support
6. Write component tests

### Phase 3: Integration
1. Test E2E flow
2. Performance testing
3. Security review
4. Accessibility audit
5. Browser/device testing

## Testing Requirements

### Unit Tests
- [ ] Service logic tested
- [ ] Edge cases covered
- [ ] Error handling tested
- [ ] Mocks for external dependencies

### Integration Tests
- [ ] API endpoints tested
- [ ] Database operations verified
- [ ] Authentication/authorization tested
- [ ] Error responses validated

### E2E Tests
- [ ] Happy path tested
- [ ] Error scenarios tested
- [ ] Cross-browser tested
- [ ] Mobile responsive tested

## Security Considerations
- [ ] Input validation implemented
- [ ] SQL injection prevented (Prisma)
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Authentication required
- [ ] Authorization enforced
- [ ] Sensitive data encrypted
- [ ] Audit logging added

## Localization (i18n)
- [ ] Arabic translations added
- [ ] English translations added
- [ ] RTL layout verified
- [ ] Number/date formatting correct
- [ ] Directional icons mirrored

## Documentation
- [ ] API documentation updated (Swagger)
- [ ] Code comments added (JSDoc)
- [ ] README updated (if needed)
- [ ] Architecture decision recorded (if applicable)

## Definition of Done
- [ ] Code complete and peer-reviewed
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] Product Owner approved
- [ ] No critical bugs
- [ ] Performance benchmarks met
- [ ] Security review passed
- [ ] Accessibility verified

## Dependencies
- **Blocked by**: [List any blockers]
- **Depends on**: [List dependencies]
- **Blocks**: [What this blocks]

## Estimated Effort
- **Story Points**: [Points]
- **Hours**: [Estimated hours]
- **Developers**: [Number of developers needed]
```

## Example Usage

```markdown
# Feature: Product Review System

## Context
- **Module**: Product
- **User Story**: As a customer, I want to review products I've purchased so that other customers can benefit from my experience
- **Priority**: High
- **Sprint**: Sprint 4

## Requirements

### Functional Requirements
1. Customers can submit reviews only for products they've purchased
2. Reviews include rating (1-5 stars), title, and comment
3. Reviews can include photos (up to 3 images)
4. Pharmacist can approve/reject reviews
5. Average rating calculated and displayed on product page

### Non-Functional Requirements
- **Performance**: Load reviews in < 500ms
- **Security**: Verify user ownership before allowing review
- **Scalability**: Support 100,000+ reviews
- **Accessibility**: WCAG 2.1 AA compliant

### Acceptance Criteria
- [ ] User can submit review after purchase
- [ ] User cannot review product not purchased
- [ ] Rating updates immediately after approval
- [ ] Photos upload to Azure Blob Storage
- [ ] Reviews display in Arabic and English
- [ ] Spam reviews are filtered

## Technical Specifications

### Backend (NestJS)
- **Endpoint**: POST /api/v1/products/:id/reviews
- **Controller**: ReviewController
- **Service**: ReviewService
- **Repository**: Prisma Review, OrderItem
- **DTOs**: CreateReviewDto, UpdateReviewDto, ReviewResponseDto
- **Validation**:
  - Rating: 1-5 (required)
  - Title: 10-100 chars (required)
  - Comment: 20-1000 chars (required)
  - Images: Max 3, 5MB each

### Frontend (Next.js)
- **Route**: /[locale]/products/[id] (reviews section)
- **Component**: ReviewForm, ReviewList, ReviewItem
- **Server/Client**: Server Component (list), Client Component (form)
- **State Management**: React Query for fetching, Zustand for form state
- **Styling**: shadcn/ui Card, shadcn/ui Form, Tailwind

### Database
```prisma
model Review {
  id          String   @id @default(uuid())
  productId   String
  userId      String
  orderItemId String   @unique
  rating      Int      @db.SmallInt
  title       String   @db.VarChar(100)
  comment     String   @db.Text
  images      String[] // Azure Blob URLs
  status      ReviewStatus @default(PENDING)
  isVerified  Boolean  @default(false)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  product     Product  @relation(fields: [productId], references: [id])
  user        User     @relation(fields: [userId], references: [id])
  orderItem   OrderItem @relation(fields: [orderItemId], references: [id])

  @@map("reviews")
  @@index([productId, status])
  @@index([userId])
}

enum ReviewStatus {
  PENDING
  APPROVED
  REJECTED
}
```

## Implementation Steps

### Phase 1: Backend (2 days)
1. Create Review model and migration
2. Create DTOs (CreateReviewDto, UpdateReviewDto)
3. Implement ReviewService:
   - createReview() - Verify purchase, create review
   - approveReview() - Update status, recalculate rating
   - rejectReview() - Update status with reason
   - getProductReviews() - Paginated, approved only
4. Create ReviewController with endpoints
5. Add image upload to Azure Blob
6. Write unit tests (15 test cases)
7. Write integration tests (8 test cases)

### Phase 2: Frontend (2 days)
1. Create ReviewForm component (Client)
2. Create ReviewList component (Server)
3. Create ReviewItem component (Server)
4. Implement form validation (Zod schema)
5. Add image upload with preview
6. Connect to API with React Query
7. Add Arabic/English translations
8. Write component tests (12 test cases)

### Phase 3: Integration (1 day)
1. E2E test: Submit review flow
2. E2E test: Admin approval flow
3. Performance test: Load 1000 reviews
4. Security audit: Review ownership
5. Accessibility audit: Screen reader test
6. Mobile responsive test

## Testing Requirements

### Unit Tests
- [x] ReviewService.createReview() - success case
- [x] ReviewService.createReview() - user hasn't purchased
- [x] ReviewService.createReview() - duplicate review
- [x] ReviewService.approveReview() - rating recalculated
- [x] ReviewService.getProductReviews() - pagination works

### Integration Tests
- [x] POST /reviews - 201 on success
- [x] POST /reviews - 403 if not purchased
- [x] POST /reviews - 409 if duplicate
- [x] GET /products/:id/reviews - returns approved only
- [x] PATCH /reviews/:id/approve - only pharmacist

### E2E Tests
- [x] User submits review with photos
- [x] Pharmacist approves review
- [x] Average rating updates on product page
- [x] Reviews display in correct language

## Security Considerations
- [x] Verify user owns order item before review
- [x] Sanitize review text (prevent XSS)
- [x] Rate limit review submissions (3 per hour)
- [x] Validate image file types (JPEG, PNG only)
- [x] Check image file size (max 5MB)
- [x] Only pharmacist can approve/reject

## Localization (i18n)
- [x] "Write a Review" → "اكتب تقييمًا"
- [x] "Rating" → "التقييم"
- [x] "Your Review" → "تقييمك"
- [x] "Upload Photos" → "تحميل الصور"
- [x] Star icons mirrored in RTL

## Documentation
- [x] Swagger docs for all endpoints
- [x] JSDoc comments on service methods
- [x] Component props documented

## Definition of Done
- [x] Code reviewed by senior developer
- [x] All tests passing (35/35)
- [x] 85% code coverage achieved
- [x] Deployed to staging
- [x] Product Owner demo completed
- [x] No P1 or P2 bugs
- [x] API response < 200ms (p95)
- [x] WCAG audit passed

## Dependencies
- **Blocked by**: None
- **Depends on**: Order system completed (Sprint 3)
- **Blocks**: None

## Estimated Effort
- **Story Points**: 8
- **Hours**: 40 hours (5 days)
- **Developers**: 2 (1 backend, 1 frontend)
```

## Usage Instructions

1. **Copy this template** when starting a new feature
2. **Fill in all sections** with feature-specific details
3. **Share with team** for review and feedback
4. **Use as reference** during implementation
5. **Update checkboxes** as you progress
6. **Attach to Jira story** for documentation

This template ensures consistent, high-quality feature implementation across the Thuraya platform.
