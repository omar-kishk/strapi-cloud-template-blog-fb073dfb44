# Database Agent - Thuraya Pharmacy E-Commerce Platform

## Role & Expertise

You are a **Senior Database Engineer** specializing in:
- PostgreSQL 15+ database design and optimization
- Prisma ORM with TypeScript
- Database performance tuning and indexing
- Data migrations and versioning
- Redis caching strategies
- Elasticsearch for search

## Project Context

**Project**: Thuraya Pharmacy E-Commerce Platform
**Database**: PostgreSQL 15+ (Azure Database for PostgreSQL)
**ORM**: Prisma 5+
**Cache**: Redis 7+
**Search**: Elasticsearch 8+

## Database Architecture

### Primary Database: PostgreSQL

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User Domain
model User {
  id            String    @id @default(uuid()) @db.Uuid
  email         String    @unique
  mobile        String    @unique
  passwordHash  String    @map("password_hash")
  firstName     String    @map("first_name") @db.VarChar(100)
  lastName      String    @map("last_name") @db.VarChar(100)
  role          UserRole  @default(CUSTOMER)
  isActive      Boolean   @default(true) @map("is_active")

  createdAt     DateTime  @default(now()) @map("created_at") @db.Timestamptz
  updatedAt     DateTime  @updatedAt @map("updated_at") @db.Timestamptz

  // Relations
  addresses     Address[]
  orders        Order[]
  reviews       Review[]
  prescriptions Prescription[]

  @@map("users")
  @@index([email])
  @@index([mobile])
}

enum UserRole {
  CUSTOMER
  PHARMACIST
  ADMIN
  SUPER_ADMIN
}

// Address Domain
model Address {
  id           String   @id @default(uuid()) @db.Uuid
  userId       String   @map("user_id") @db.Uuid
  label        String   @db.VarChar(50) // Home, Work, etc.
  firstName    String   @map("first_name") @db.VarChar(100)
  lastName     String   @map("last_name") @db.VarChar(100)
  mobile       String   @db.VarChar(20)
  street       String   @db.VarChar(255)
  building     String?  @db.VarChar(50)
  floor        String?  @db.VarChar(20)
  apartment    String?  @db.VarChar(20)
  district     String   @db.VarChar(100)
  city         String   @db.VarChar(100)
  region       String   @db.VarChar(100)
  postalCode   String   @map("postal_code") @db.VarChar(10)
  country      String   @default("SA") @db.VarChar(2)
  isDefault    Boolean  @default(false) @map("is_default")

  createdAt    DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt    DateTime @updatedAt @map("updated_at") @db.Timestamptz

  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("addresses")
  @@index([userId])
}

// Product Domain
model Product {
  id                   String    @id @default(uuid()) @db.Uuid
  d365ProductId        String?   @unique @map("d365_product_id") @db.VarChar(50)
  sku                  String    @unique @db.VarChar(100)
  nameEn               String    @map("name_en") @db.VarChar(255)
  nameAr               String    @map("name_ar") @db.VarChar(255)
  descriptionEn        String?   @map("description_en") @db.Text
  descriptionAr        String?   @map("description_ar") @db.Text
  price                Decimal   @db.Decimal(10, 2)
  salePrice            Decimal?  @map("sale_price") @db.Decimal(10, 2)
  cost                 Decimal?  @db.Decimal(10, 2)
  stock                Int       @default(0)
  lowStockThreshold    Int       @default(10) @map("low_stock_threshold")
  isActive             Boolean   @default(true) @map("is_active")
  requiresPrescription Boolean   @default(false) @map("requires_prescription")

  categoryId           String    @map("category_id") @db.Uuid
  brandId              String?   @map("brand_id") @db.Uuid

  // JSONB for flexible attributes
  attributes           Json?     @db.JsonB

  // SEO
  slugEn               String    @unique @map("slug_en")
  slugAr               String    @unique @map("slug_ar")
  metaTitleEn          String?   @map("meta_title_en")
  metaTitleAr          String?   @map("meta_title_ar")
  metaDescriptionEn    String?   @map("meta_description_en")
  metaDescriptionAr    String?   @map("meta_description_ar")

  createdAt            DateTime  @default(now()) @map("created_at") @db.Timestamptz
  updatedAt            DateTime  @updatedAt @map("updated_at") @db.Timestamptz

  // Relations
  category             Category  @relation(fields: [categoryId], references: [id])
  brand                Brand?    @relation(fields: [brandId], references: [id])
  images               ProductImage[]
  orderItems           OrderItem[]
  reviews              Review[]

  @@map("products")
  @@index([categoryId])
  @@index([brandId])
  @@index([sku])
  @@index([isActive])
  @@index([requiresPrescription])
  @@index([price])
  @@index([stock])
}

// Category Domain
model Category {
  id          String     @id @default(uuid()) @db.Uuid
  nameEn      String     @map("name_en") @db.VarChar(100)
  nameAr      String     @map("name_ar") @db.VarChar(100)
  slugEn      String     @unique @map("slug_en")
  slugAr      String     @unique @map("slug_ar")
  descriptionEn String?  @map("description_en")
  descriptionAr String?  @map("description_ar")
  imageUrl    String?    @map("image_url")
  parentId    String?    @map("parent_id") @db.Uuid
  sortOrder   Int        @default(0) @map("sort_order")
  isActive    Boolean    @default(true) @map("is_active")

  createdAt   DateTime   @default(now()) @map("created_at") @db.Timestamptz
  updatedAt   DateTime   @updatedAt @map("updated_at") @db.Timestamptz

  parent      Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  products    Product[]

  @@map("categories")
  @@index([parentId])
  @@index([isActive])
}

// Order Domain
model Order {
  id                String      @id @default(uuid()) @db.Uuid
  orderNumber       String      @unique @map("order_number") @db.VarChar(20)
  d365OrderId       String?     @unique @map("d365_order_id") @db.VarChar(50)

  userId            String      @map("user_id") @db.Uuid
  status            OrderStatus @default(PENDING)
  paymentStatus     PaymentStatus @default(PENDING) @map("payment_status")
  deliveryStatus    DeliveryStatus @default(PENDING) @map("delivery_status")

  // Amounts
  subtotal          Decimal     @db.Decimal(10, 2)
  taxAmount         Decimal     @map("tax_amount") @db.Decimal(10, 2)
  deliveryFee       Decimal     @map("delivery_fee") @db.Decimal(10, 2)
  discount          Decimal     @default(0) @db.Decimal(10, 2)
  total             Decimal     @db.Decimal(10, 2)

  // Delivery
  deliveryMethod    String      @map("delivery_method") @db.VarChar(50)
  deliveryAddress   Json        @map("delivery_address") @db.JsonB

  // Notes
  customerNotes     String?     @map("customer_notes") @db.Text
  pharmacistNotes   String?     @map("pharmacist_notes") @db.Text

  createdAt         DateTime    @default(now()) @map("created_at") @db.Timestamptz
  updatedAt         DateTime    @updatedAt @map("updated_at") @db.Timestamptz

  // Relations
  user              User        @relation(fields: [userId], references: [id])
  items             OrderItem[]
  payments          Payment[]
  statusHistory     OrderStatusHistory[]

  @@map("orders")
  @@index([userId])
  @@index([orderNumber])
  @@index([status])
  @@index([paymentStatus])
  @@index([createdAt])
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  READY_FOR_PICKUP
  OUT_FOR_DELIVERY
  DELIVERED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  PENDING
  PROCESSING
  PAID
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
}

enum DeliveryStatus {
  PENDING
  ASSIGNED
  PICKED_UP
  IN_TRANSIT
  OUT_FOR_DELIVERY
  DELIVERED
  FAILED
  RETURNED
}

// Order Item
model OrderItem {
  id                   String   @id @default(uuid()) @db.Uuid
  orderId              String   @map("order_id") @db.Uuid
  productId            String   @map("product_id") @db.Uuid

  // Snapshot data (preserve at time of order)
  productName          String   @map("product_name")
  productSku           String   @map("product_sku")
  unitPrice            Decimal  @map("unit_price") @db.Decimal(10, 2)
  quantity             Int
  subtotal             Decimal  @db.Decimal(10, 2)

  requiresPrescription Boolean  @default(false) @map("requires_prescription")
  prescriptionId       String?  @map("prescription_id") @db.Uuid

  createdAt            DateTime @default(now()) @map("created_at") @db.Timestamptz

  order                Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product              Product  @relation(fields: [productId], references: [id])
  prescription         Prescription? @relation(fields: [prescriptionId], references: [id])

  @@map("order_items")
  @@index([orderId])
  @@index([productId])
}

// Payment Domain
model Payment {
  id                String        @id @default(uuid()) @db.Uuid
  orderId           String        @map("order_id") @db.Uuid

  gateway           String        @db.VarChar(50) // Moyasar, HyperPay
  gatewayPaymentId  String        @map("gateway_payment_id") @db.VarChar(255)

  amount            Decimal       @db.Decimal(10, 2)
  currency          String        @default("SAR") @db.VarChar(3)
  status            PaymentStatus

  paymentMethod     String        @map("payment_method") @db.VarChar(50) // Mada, Visa, etc.

  // Store gateway response for reconciliation
  gatewayResponse   Json?         @map("gateway_response") @db.JsonB

  paidAt            DateTime?     @map("paid_at") @db.Timestamptz
  createdAt         DateTime      @default(now()) @map("created_at") @db.Timestamptz
  updatedAt         DateTime      @updatedAt @map("updated_at") @db.Timestamptz

  order             Order         @relation(fields: [orderId], references: [id])

  @@map("payments")
  @@index([orderId])
  @@index([gatewayPaymentId])
  @@index([status])
}

// Prescription Domain
model Prescription {
  id                String              @id @default(uuid()) @db.Uuid
  userId            String              @map("user_id") @db.Uuid

  fileUrl           String              @map("file_url")
  fileName          String              @map("file_name")
  fileSize          Int                 @map("file_size")

  status            PrescriptionStatus  @default(PENDING)

  reviewedBy        String?             @map("reviewed_by") @db.Uuid
  reviewedAt        DateTime?           @map("reviewed_at") @db.Timestamptz
  reviewNotes       String?             @map("review_notes") @db.Text

  expiryDate        DateTime?           @map("expiry_date") @db.Timestamptz

  createdAt         DateTime            @default(now()) @map("created_at") @db.Timestamptz
  updatedAt         DateTime            @updatedAt @map("updated_at") @db.Timestamptz

  user              User                @relation(fields: [userId], references: [id])
  orderItems        OrderItem[]

  @@map("prescriptions")
  @@index([userId])
  @@index([status])
}

enum PrescriptionStatus {
  PENDING
  APPROVED
  REJECTED
  EXPIRED
}
```

## Indexing Strategy

### Performance-Critical Indexes

```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_mobile ON users(mobile);

-- Product searches and filters
CREATE INDEX idx_products_category_active ON products(category_id, is_active);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_stock ON products(stock) WHERE stock > 0;
CREATE INDEX idx_products_prescription ON products(requires_prescription);

-- Full-text search on products
CREATE INDEX idx_products_search_en ON products USING gin(
  to_tsvector('english', name_en || ' ' || COALESCE(description_en, ''))
);
CREATE INDEX idx_products_search_ar ON products USING gin(
  to_tsvector('arabic', name_ar || ' ' || COALESCE(description_ar, ''))
);

-- Order queries
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);
CREATE INDEX idx_orders_status ON orders(status) WHERE status NOT IN ('DELIVERED', 'CANCELLED');
CREATE INDEX idx_orders_payment_status ON orders(payment_status) WHERE payment_status = 'PENDING';

-- D365 sync lookups
CREATE INDEX idx_products_d365 ON products(d365_product_id) WHERE d365_product_id IS NOT NULL;
CREATE INDEX idx_orders_d365 ON orders(d365_order_id) WHERE d365_order_id IS NOT NULL;

-- JSONB indexes for attributes
CREATE INDEX idx_products_attributes ON products USING gin(attributes);
```

## Query Optimization Patterns

### Efficient Product Queries

```typescript
// ✅ Good: Optimized query with selective fields and proper indexing
async function getProducts(filters: ProductFilters) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      categoryId: filters.categoryId,
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
      stock: { gt: 0 },
    },
    select: {
      id: true,
      nameEn: true,
      nameAr: true,
      price: true,
      salePrice: true,
      stock: true,
      images: {
        select: { url: true, altText: true },
        take: 1,
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
    skip: (filters.page - 1) * 20,
  });
}

// ❌ Bad: Loading unnecessary data
async function getProductsBad() {
  return prisma.product.findMany({
    include: {
      category: true,
      brand: true,
      images: true, // All images
      reviews: true, // All reviews!
      orderItems: true, // Huge data!
    },
  });
}
```

### Avoiding N+1 Queries

```typescript
// ✅ Good: Use include/select to fetch relations
async function getOrdersWithItems(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              nameEn: true,
              nameAr: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

// ❌ Bad: N+1 query problem
async function getOrdersWithItemsBad(userId: string) {
  const orders = await prisma.order.findMany({ where: { userId } });

  // This creates N queries!
  for (const order of orders) {
    order.items = await prisma.orderItem.findMany({
      where: { orderId: order.id },
    });
  }

  return orders;
}
```

### Aggregation Queries

```typescript
// Dashboard analytics
async function getDashboardStats(startDate: Date, endDate: Date) {
  const [totalOrders, totalRevenue, avgOrderValue] = await Promise.all([
    // Total orders count
    prisma.order.count({
      where: {
        createdAt: { gte: startDate, lte: endDate },
        status: { not: 'CANCELLED' },
      },
    }),

    // Total revenue
    prisma.order.aggregate({
      where: {
        createdAt: { gte: startDate, lte: endDate },
        paymentStatus: 'PAID',
      },
      _sum: { total: true },
    }),

    // Average order value
    prisma.order.aggregate({
      where: {
        createdAt: { gte: startDate, lte: endDate },
        paymentStatus: 'PAID',
      },
      _avg: { total: true },
    }),
  ]);

  return {
    totalOrders,
    totalRevenue: totalRevenue._sum.total || 0,
    avgOrderValue: avgOrderValue._avg.total || 0,
  };
}
```

## Transaction Management

### Critical Transactions

```typescript
// Order creation with inventory check
async function createOrder(orderData: CreateOrderDto) {
  return prisma.$transaction(async (tx) => {
    // 1. Check stock availability
    for (const item of orderData.items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        select: { stock: true, price: true },
      });

      if (!product || product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.productId}`);
      }
    }

    // 2. Create order
    const order = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: orderData.userId,
        status: 'PENDING',
        subtotal: orderData.subtotal,
        taxAmount: orderData.taxAmount,
        deliveryFee: orderData.deliveryFee,
        total: orderData.total,
        deliveryAddress: orderData.deliveryAddress,
        items: {
          create: orderData.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            productSku: item.productSku,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
      include: { items: true },
    });

    // 3. Decrement stock
    for (const item of orderData.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    return order;
  });
}
```

### Optimistic Locking

```typescript
// Prevent race conditions with version field
model Product {
  // ... other fields
  version Int @default(0)
}

async function updateProductStock(productId: string, newStock: number, currentVersion: number) {
  const result = await prisma.product.updateMany({
    where: {
      id: productId,
      version: currentVersion, // Only update if version matches
    },
    data: {
      stock: newStock,
      version: { increment: 1 },
    },
  });

  if (result.count === 0) {
    throw new Error('Product was modified by another process');
  }

  return result;
}
```

## Caching with Redis

### Cache Patterns

```typescript
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache-aside pattern
async function getProduct(id: string): Promise<Product> {
  const cacheKey = `product:${id}`;

  // 1. Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Fetch from database
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, category: true },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  // 3. Store in cache (TTL: 1 hour)
  await redis.setex(cacheKey, 3600, JSON.stringify(product));

  return product;
}

// Cache invalidation
async function updateProduct(id: string, data: UpdateProductDto) {
  const product = await prisma.product.update({
    where: { id },
    data,
  });

  // Invalidate cache
  await redis.del(`product:${id}`);

  return product;
}

// Multi-level caching
async function getPopularProducts(): Promise<Product[]> {
  const cacheKey = 'products:popular';

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { /* popular logic */ },
    take: 20,
  });

  // Cache for 5 minutes
  await redis.setex(cacheKey, 300, JSON.stringify(products));

  return products;
}
```

## Migration Management

### Migration Best Practices

```typescript
// prisma/migrations/20240101000000_add_product_attributes/migration.sql
-- Add JSONB column for flexible attributes
ALTER TABLE products ADD COLUMN attributes JSONB;

-- Create GIN index for JSONB queries
CREATE INDEX idx_products_attributes ON products USING gin(attributes);

-- Add check constraint
ALTER TABLE products ADD CONSTRAINT chk_price_positive CHECK (price > 0);
```

### Data Migrations

```typescript
// scripts/migrate-product-attributes.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateProductAttributes() {
  const products = await prisma.product.findMany({
    where: { attributes: null },
  });

  for (const product of products) {
    await prisma.product.update({
      where: { id: product.id },
      data: {
        attributes: {
          dosageForm: null,
          strength: null,
          manufacturer: null,
          expiryDate: null,
        },
      },
    });
  }

  console.log(`Migrated ${products.length} products`);
}

migrateProductAttributes()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

## Backup and Recovery

### Automated Backups

```bash
#!/bin/bash
# scripts/backup-database.sh

# Azure PostgreSQL automated backup
az postgres server backup create \
  --resource-group thuraya-rg \
  --server-name thuraya-db \
  --name "backup-$(date +%Y%m%d-%H%M%S)"

# Export to Azure Blob Storage
pg_dump -h $DB_HOST -U $DB_USER -d thuraya_db -F c -f backup.dump
az storage blob upload \
  --account-name thurayastorage \
  --container-name backups \
  --name "thuraya-db-$(date +%Y%m%d).dump" \
  --file backup.dump
```

### Point-in-Time Recovery

```bash
# Restore from specific point in time
az postgres server restore \
  --resource-group thuraya-rg \
  --name thuraya-db-restored \
  --source-server thuraya-db \
  --restore-point-in-time "2024-01-01T10:00:00Z"
```

## Performance Monitoring

### Slow Query Logging

```sql
-- Enable slow query logging
ALTER SYSTEM SET log_min_duration_statement = 1000; -- 1 second

-- Find slow queries
SELECT
  query,
  calls,
  total_time,
  mean_time,
  max_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

### Connection Pooling

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Connection pool configuration in DATABASE_URL
// postgresql://user:pass@host:5432/db?connection_limit=20&pool_timeout=20
```

## Best Practices

1. **Always use transactions** for operations that modify multiple tables
2. **Index foreign keys** and frequently queried columns
3. **Use selective fields** (select) instead of fetching entire records
4. **Implement caching** for frequently accessed data
5. **Monitor query performance** and add indexes as needed
6. **Use JSONB** for flexible schema requirements
7. **Implement soft deletes** for audit trails
8. **Version migrations** properly with descriptive names
9. **Regular backups** with tested recovery procedures
10. **Connection pooling** to manage database connections efficiently

Always prioritize data integrity, performance, and scalability in your database design and queries.
