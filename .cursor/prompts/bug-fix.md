# Bug Fix Prompt Template

Use this template when fixing bugs in the Thuraya Pharmacy platform.

## Prompt Structure

```markdown
# Bug: [Bug Title]

## Bug Information
- **ID**: [Jira ticket ID]
- **Severity**: [P1 Critical / P2 High / P3 Medium / P4 Low]
- **Module**: [Product/Order/User/Payment/etc.]
- **Environment**: [Production/Staging/Development]
- **Reported By**: [Name/Role]
- **Reported Date**: [Date]
- **Assigned To**: [Developer name]

## Bug Description

### Observed Behavior
[What is currently happening - be specific]

### Expected Behavior
[What should happen instead]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Result: Bug appears]

### Impact
- **Users Affected**: [Number or percentage]
- **Business Impact**: [Revenue loss/User experience/Compliance/etc.]
- **Frequency**: [Always/Sometimes/Rarely]
- **Workaround Available**: [Yes/No - describe if yes]

## Technical Analysis

### Root Cause
[What is causing the bug]

### Affected Components
- **Backend**: [List affected services/files]
- **Frontend**: [List affected components/files]
- **Database**: [List affected tables/queries]
- **Third-Party**: [List affected integrations]

### Error Logs
```
[Paste relevant error logs, stack traces, or error messages]
```

### Related Code
```typescript
// File: [file path]
// Lines: [line numbers]

[Paste relevant code snippet]
```

## Fix Plan

### Solution Approach
[Describe how you will fix the bug]

### Files to Modify
1. [File 1] - [What changes]
2. [File 2] - [What changes]
3. [File 3] - [What changes]

### Testing Strategy
- [ ] Unit tests updated/added
- [ ] Integration tests updated/added
- [ ] Manual testing completed
- [ ] Regression testing completed
- [ ] Performance impact assessed

### Deployment Plan
- **Deployment Type**: [Hotfix/Regular release]
- **Rollback Plan**: [How to rollback if needed]
- **Downtime Required**: [Yes/No - duration if yes]
- **Communication Plan**: [Who needs to be notified]

## Risk Assessment

### Regression Risks
- **High Risk Areas**: [List areas that might be affected]
- **Mitigation**: [How to prevent regression]

### Side Effects
- **Potential Issues**: [List possible side effects]
- **Monitoring**: [What to monitor after deployment]

## Verification

### Test Cases
1. **Original Issue**:
   - [ ] Bug no longer reproducible
   - [ ] Error logs clean

2. **Edge Cases**:
   - [ ] [Edge case 1] tested
   - [ ] [Edge case 2] tested

3. **Regression**:
   - [ ] [Related feature 1] still works
   - [ ] [Related feature 2] still works

### Acceptance Criteria
- [ ] Bug fixed in all environments
- [ ] No new bugs introduced
- [ ] Performance not degraded
- [ ] All tests passing
- [ ] Code reviewed and approved

## Documentation

### Code Changes
- [ ] Comments added explaining fix
- [ ] Commit message follows convention
- [ ] Pull request description complete

### Knowledge Base
- [ ] Troubleshooting doc updated (if applicable)
- [ ] Known issues list updated
- [ ] Runbook updated (if applicable)

### Communication
- [ ] Bug reporter notified
- [ ] Stakeholders informed
- [ ] Team updated in standup
- [ ] Jira ticket updated

## Post-Fix Actions

### Monitoring
- [ ] Error rates monitored for 24 hours
- [ ] User feedback monitored
- [ ] Performance metrics checked
- [ ] Logs reviewed

### Prevention
- [ ] Root cause addressed (not just symptom)
- [ ] Similar bugs searched and fixed
- [ ] Tests added to prevent recurrence
- [ ] Code review checklist updated (if applicable)

## Timeline
- **Discovered**: [Date/Time]
- **Investigation Started**: [Date/Time]
- **Fix Implemented**: [Date/Time]
- **Testing Completed**: [Date/Time]
- **Deployed**: [Date/Time]
- **Verified**: [Date/Time]
- **Total Time**: [Duration]
```

## Example Usage

```markdown
# Bug: Checkout fails when applying discount code

## Bug Information
- **ID**: THUR-542
- **Severity**: P1 Critical
- **Module**: Order/Checkout
- **Environment**: Production
- **Reported By**: Sarah (Customer Support)
- **Reported Date**: 2024-01-15 14:30 UTC
- **Assigned To**: Ahmed (Backend Developer)

## Bug Description

### Observed Behavior
When users apply a discount code at checkout, they receive a 500 Internal Server Error and cannot complete their purchase. The error occurs immediately after clicking "Apply Coupon".

### Expected Behavior
- Discount code should be validated
- If valid, discount should be applied to cart total
- User should proceed to payment step
- If invalid, user should see friendly error message

### Steps to Reproduce
1. Add any product to cart
2. Proceed to checkout
3. Enter discount code "SAVE10" in coupon field
4. Click "Apply Coupon" button
5. Result: 500 error appears, checkout blocked

### Impact
- **Users Affected**: 100% of users trying to use discount codes
- **Business Impact**:
  - Cannot process orders with coupons
  - Lost revenue from promotional campaign
  - 47 abandoned carts in last 2 hours
  - Customer support tickets increasing
- **Frequency**: Always (100% reproduction rate)
- **Workaround Available**: No - users cannot complete checkout with coupons

## Technical Analysis

### Root Cause
The `applyCoupon()` method in OrderService is trying to access `coupon.discountPercentage` when the coupon type is `FIXED_AMOUNT`, causing a type error. The database returns `discountAmount` for fixed coupons, not `discountPercentage`.

### Affected Components
- **Backend**:
  - src/modules/order/order.service.ts (line 245)
  - src/modules/coupon/coupon.service.ts (validation logic)
- **Frontend**:
  - components/checkout/CouponForm.tsx (error handling)
- **Database**:
  - coupons table (data structure)
- **Third-Party**: None

### Error Logs
```
[2024-01-15 14:30:42] ERROR: TypeError: Cannot read property 'discountPercentage' of undefined
  at OrderService.applyCoupon (order.service.ts:245)
  at OrderController.applyCouponToOrder (order.controller.ts:128)
  at /app/node_modules/@nestjs/core/router/router-execution-context.js:38:29

Stack trace:
  OrderService.calculateDiscount (order.service.ts:245:15)
  OrderService.applyCoupon (order.service.ts:220:10)
  ...
```

### Related Code
```typescript
// File: src/modules/order/order.service.ts
// Lines: 240-250

async applyCoupon(orderId: string, couponCode: string): Promise<Order> {
  const coupon = await this.couponService.validateCoupon(couponCode);

  // BUG: This assumes coupon always has discountPercentage
  const discountAmount = (order.subtotal * coupon.discountPercentage) / 100;
  // ^^^^^ Should check coupon.type first!

  return this.prisma.order.update({
    where: { id: orderId },
    data: { discount: discountAmount },
  });
}
```

## Fix Plan

### Solution Approach
1. Add type checking to determine if coupon is percentage or fixed amount
2. Calculate discount based on coupon type
3. Add validation for minimum order amount
4. Add error handling for edge cases
5. Update tests to cover both coupon types

### Files to Modify
1. **src/modules/order/order.service.ts** - Fix discount calculation logic
2. **src/modules/order/order.service.spec.ts** - Add test cases for both coupon types
3. **src/modules/coupon/dto/coupon-response.dto.ts** - Ensure type is included in DTO
4. **components/checkout/CouponForm.tsx** - Improve error messages

### Testing Strategy
- [x] Unit tests for percentage coupons
- [x] Unit tests for fixed amount coupons
- [x] Integration test: Apply percentage coupon
- [x] Integration test: Apply fixed coupon
- [x] Manual test: Apply SAVE10 (10% off)
- [x] Manual test: Apply FLAT50 (50 SAR off)
- [x] Regression test: Checkout without coupon
- [x] Performance: No degradation

### Deployment Plan
- **Deployment Type**: Hotfix (immediate)
- **Rollback Plan**: Revert to previous Docker image tag (v1.2.4)
- **Downtime Required**: No (rolling deployment)
- **Communication Plan**:
  - Notify customer support immediately
  - Send update to stakeholders
  - Post in #incidents Slack channel

## Risk Assessment

### Regression Risks
- **High Risk Areas**:
  - Order total calculation
  - Tax calculation (depends on discounted amount)
  - Payment amount (must match discounted total)
- **Mitigation**:
  - Comprehensive regression tests on order flow
  - Verify in staging before production
  - Monitor order creation metrics post-deploy

### Side Effects
- **Potential Issues**:
  - Existing orders with invalid discount might fail validation
  - Cache invalidation needed for coupon data
- **Monitoring**:
  - Watch error rates on /orders/apply-coupon endpoint
  - Monitor order completion rate
  - Track coupon usage metrics

## Verification

### Test Cases
1. **Original Issue**:
   - [x] Apply SAVE10 code - works correctly
   - [x] Apply FLAT50 code - works correctly
   - [x] Error logs clean (no TypeErrors)

2. **Edge Cases**:
   - [x] Apply expired coupon - correct error message
   - [x] Apply coupon below minimum order - correct error message
   - [x] Apply same coupon twice - prevented
   - [x] Apply multiple coupons - handled correctly
   - [x] Apply coupon with 100% discount - works
   - [x] Apply coupon with 0 value - rejected

3. **Regression**:
   - [x] Checkout without coupon - works
   - [x] Order total calculation - correct
   - [x] Tax calculation - correct
   - [x] Payment flow - works
   - [x] Order history - displays correctly

### Acceptance Criteria
- [x] Bug fixed in staging
- [x] Bug fixed in production
- [x] No new bugs introduced
- [x] Response time < 200ms (was 180ms)
- [x] All 47 tests passing
- [x] Code reviewed by Tech Lead
- [x] QA sign-off received

## Documentation

### Code Changes
- [x] Added comments explaining coupon type handling
- [x] Commit message: "fix(order): handle both percentage and fixed amount coupons"
- [x] PR #542 description complete with before/after screenshots

### Knowledge Base
- [x] Troubleshooting doc updated with coupon validation steps
- [x] Known issues removed (this issue)
- [x] API docs updated with coupon type examples

### Communication
- [x] Sarah (reporter) notified - bug fixed
- [x] Marketing team notified - campaign can proceed
- [x] Team updated in daily standup
- [x] THUR-542 marked as resolved

## Post-Fix Actions

### Monitoring (First 24 hours)
- [x] Error rate on /apply-coupon: 0.0% (was 100%)
- [x] Order completion rate: 94% (was 67%)
- [x] Coupon usage: 234 successful applications
- [x] Customer support tickets: Decreased 85%

### Prevention
- [x] Root cause addressed (type checking added)
- [x] Searched for similar bugs in payment/discount code (found 1, fixed)
- [x] Added test: percentage coupons (6 cases)
- [x] Added test: fixed amount coupons (6 cases)
- [x] Updated code review checklist: "Check all enum/union type usage"

## Timeline
- **Discovered**: 2024-01-15 14:30 UTC
- **Investigation Started**: 2024-01-15 14:35 UTC
- **Fix Implemented**: 2024-01-15 15:10 UTC
- **Testing Completed**: 2024-01-15 15:45 UTC
- **Deployed to Staging**: 2024-01-15 16:00 UTC
- **Deployed to Production**: 2024-01-15 16:30 UTC
- **Verified**: 2024-01-15 17:00 UTC
- **Total Time**: 2.5 hours (from discovery to verification)

## Lessons Learned
1. **What Went Well**:
   - Quick identification of root cause
   - Comprehensive test coverage prevented regression
   - Good communication with stakeholders

2. **What Could Be Better**:
   - Should have caught this in code review
   - Need better test coverage for discount logic
   - E2E tests should include coupon scenarios

3. **Action Items**:
   - [ ] Add E2E test for coupon flow (THUR-550)
   - [ ] Review all enum/union type usage (THUR-551)
   - [ ] Add type guards utility functions (THUR-552)
```

## Severity Levels

### P1 - Critical (Fix immediately, hotfix if needed)
- Production is down
- Data loss/corruption
- Security vulnerability
- Payment processing broken
- Core functionality blocked

### P2 - High (Fix in current sprint)
- Major feature broken
- Significant user impact
- Performance severely degraded
- Workaround exists but poor UX

### P3 - Medium (Fix in next sprint)
- Minor feature broken
- Small user impact
- Cosmetic issues with functional impact
- Easy workaround available

### P4 - Low (Fix when convenient)
- Cosmetic issues only
- Edge cases
- Nice-to-have improvements
- No user impact

## Usage Instructions

1. **Copy template** when bug is reported
2. **Fill in all sections** with bug-specific details
3. **Investigate thoroughly** before implementing fix
4. **Test comprehensively** before deploying
5. **Monitor post-deployment** for 24-48 hours
6. **Document lessons learned** for future prevention

This template ensures consistent, thorough bug fixes with proper documentation and prevention measures.
