# Coding Standards - Thuraya Pharmacy E-Commerce Platform

## 🎯 General Principles

1. **Write Clean, Readable Code** - Code is read more than written
2. **Follow TypeScript Best Practices** - Leverage type safety
3. **Keep It Simple** - Avoid over-engineering
4. **Test Your Code** - >80% coverage for critical paths
5. **Document Complex Logic** - Comments for "why", not "what"
6. **Consistent Formatting** - Use Prettier + ESLint

## 📁 Project Structure

### Frontend (Next.js)

```
/app
  /(ar)                    # Arabic locale
    /page.tsx              # Homepage
    /products/[slug]/page.tsx
  /(en)                    # English locale
  /api                     # API routes
/components
  /ui                      # shadcn/ui components
  /layouts                 # Layout components
  /features                # Feature-specific components
    /product
    /cart
    /checkout
/lib
  /api                     # API client functions
  /hooks                   # Custom React hooks
  /utils                   # Utility functions
  /store                   # Zustand stores
  /validations             # Zod schemas
/types                     # TypeScript types
/public
/styles
```

### Backend (NestJS)

```
/src
  /modules
    /product
      /dto                 # Data Transfer Objects
      /entities            # Database entities (Prisma)
      /controllers         # API endpoints
      /services            # Business logic
      /repositories        # Data access layer (if needed)
      product.module.ts
    /order
    /user
  /common
    /decorators
    /filters               # Exception filters
    /guards                # Auth guards
    /interceptors          # Request/response interceptors
    /pipes                 # Validation pipes
  /config                  # Configuration
  /prisma
    schema.prisma
    /migrations
  main.ts
```

## 🔤 Naming Conventions

### Files & Folders

```typescript
// React Components (PascalCase)
ProductCard.tsx
OrderSummary.tsx

// Utilities, hooks (camelCase)
formatCurrency.ts
useAuth.ts

// Types/Interfaces (PascalCase)
Product.ts
OrderItem.ts

// Constants (SCREAMING_SNAKE_CASE)
API_ROUTES.ts
ERROR_MESSAGES.ts

// Folders (kebab-case)
user-profile/
order-history/
```

### Variables & Functions

```typescript
// Variables (camelCase)
const productList = [];
const isLoading = false;

// Functions (camelCase, verb-based)
function fetchProducts() {}
function calculateTotal() {}
function isValidEmail() {}

// Classes (PascalCase)
class OrderService {}
class PaymentGateway {}

// Interfaces (PascalCase, prefix with I optional)
interface Product {}
interface IUserService {}

// Types (PascalCase)
type OrderStatus = 'pending' | 'completed';

// Enums (PascalCase)
enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin'
}
```

## 🎨 TypeScript Conventions

### Type Annotations

```typescript
// ✅ GOOD: Explicit return types for functions
function calculateTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ❌ BAD: Missing return type
function calculateTotal(items: OrderItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ✅ GOOD: Use interfaces for object shapes
interface Product {
  id: string;
  name: string;
  price: number;
}

// ✅ GOOD: Use types for unions/primitives
type OrderStatus = 'pending' | 'completed' | 'cancelled';
```

### Avoid `any`

```typescript
// ❌ BAD
function processData(data: any) {
  return data.value;
}

// ✅ GOOD
interface DataShape {
  value: string;
}
function processData(data: DataShape) {
  return data.value;
}

// ✅ GOOD: Use unknown when truly unknown
function processUnknown(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as DataShape).value;
  }
}
```

### Null Safety

```typescript
// ✅ GOOD: Handle null/undefined
function getProductName(product: Product | null): string {
  return product?.name ?? 'Unknown Product';
}

// ✅ GOOD: Use optional chaining
const userName = user?.profile?.name;

// ✅ GOOD: Use nullish coalescing
const displayName = userName ?? 'Guest';
```

## ⚛️ React Best Practices

### Component Structure

```typescript
// ✅ GOOD: Functional component with proper typing
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  className?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  className
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('product-card', className)}>
      <h3>{product.name}</h3>
      <p>{formatCurrency(product.price)}</p>
      <button onClick={handleClick} disabled={isLoading}>
        Add to Cart
      </button>
    </div>
  );
}
```

### Hooks Rules

```typescript
// ✅ GOOD: Custom hooks
function useProductDetails(productId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  });

  return { product: data, isLoading, error };
}

// ✅ GOOD: useCallback for event handlers
const handleAddToCart = useCallback((productId: string) => {
  addToCartMutation.mutate(productId);
}, [addToCartMutation]);

// ✅ GOOD: useMemo for expensive computations
const sortedProducts = useMemo(() => {
  return [...products].sort((a, b) => a.price - b.price);
}, [products]);
```

### State Management (Zustand)

```typescript
// ✅ GOOD: Type-safe store
interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (product) => set((state) => ({
    items: [...state.items, { ...product, quantity: 1 }]
  })),
  removeItem: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),
  clearCart: () => set({ items: [] }),
}));
```

## 🔙 NestJS Best Practices

### Controller Structure

```typescript
// ✅ GOOD: Clean controller
@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [ProductResponseDto] })
  async findAll(
    @Query() query: ProductQueryDto
  ): Promise<ProductResponseDto[]> {
    return this.productService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(
    @Param('id') id: string
  ): Promise<ProductResponseDto> {
    return this.productService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create product' })
  async create(
    @Body() createProductDto: CreateProductDto
  ): Promise<ProductResponseDto> {
    return this.productService.create(createProductDto);
  }
}
```

### Service Structure

```typescript
// ✅ GOOD: Service with business logic
@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
    private readonly logger: Logger
  ) {}

  async findAll(query: ProductQueryDto): Promise<Product[]> {
    const cacheKey = `products:${JSON.stringify(query)}`;

    // Try cache first
    const cached = await this.cacheService.get<Product[]>(cacheKey);
    if (cached) {
      this.logger.log(`Cache hit for ${cacheKey}`);
      return cached;
    }

    // Fetch from database
    const products = await this.prisma.product.findMany({
      where: this.buildWhereClause(query),
      include: {
        images: true,
        brand: true,
        category: true,
      },
    });

    // Cache for 5 minutes
    await this.cacheService.set(cacheKey, products, 300);

    return products;
  }

  private buildWhereClause(query: ProductQueryDto) {
    const where: Prisma.ProductWhereInput = {
      isActive: true,
    };

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    return where;
  }
}
```

### DTOs & Validation

```typescript
// ✅ GOOD: Input DTO with validation
export class CreateProductDto {
  @ApiProperty({ example: 'Vitamin C 1000mg' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: 'High-quality vitamin C supplement' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 49.99 })
  @IsNumber()
  @Min(0)
  @Max(999999)
  price: number;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'category-uuid' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  isPrescriptionRequired: boolean;
}

// ✅ GOOD: Output DTO
export class ProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  category: CategoryResponseDto;

  @ApiProperty({ type: [ProductImageDto] })
  images: ProductImageDto[];
}
```

## 🗄️ Database Conventions (Prisma)

### Schema Naming

```prisma
// ✅ GOOD: Clear model names
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  orders    Order[]
  addresses Address[]

  @@map("users")  // Table name in database
}

model Product {
  id                   String  @id @default(uuid())
  sku                  String  @unique
  name                 String
  price                Decimal @db.Decimal(10, 2)
  isPrescriptionRequired Boolean @default(false)

  category   Category @relation(fields: [categoryId], references: [id])
  categoryId String

  @@index([categoryId])
  @@index([sku])
  @@map("products")
}
```

### Query Best Practices

```typescript
// ✅ GOOD: Use select to limit fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    // Don't include password
  },
});

// ✅ GOOD: Use include for relations
const order = await prisma.order.findUnique({
  where: { id: orderId },
  include: {
    items: {
      include: {
        product: true,
      },
    },
    user: {
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    },
  },
});

// ✅ GOOD: Use transactions for multiple operations
await prisma.$transaction(async (tx) => {
  const order = await tx.order.create({
    data: orderData,
  });

  await tx.product.updateMany({
    where: {
      id: { in: productIds },
    },
    data: {
      stock: { decrement: 1 },
    },
  });

  return order;
});
```

## 🎨 CSS/Tailwind Conventions

### Tailwind Usage

```tsx
// ✅ GOOD: Use Tailwind utilities
<div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md">
  <Image src={product.image} alt={product.name} className="h-20 w-20 rounded" />
  <div className="flex-1">
    <h3 className="text-lg font-semibold">{product.name}</h3>
    <p className="text-gray-600">{formatCurrency(product.price)}</p>
  </div>
</div>

// ✅ GOOD: Use cn() for conditional classes
<button
  className={cn(
    "rounded-md px-4 py-2 font-medium transition-colors",
    "hover:bg-primary-dark",
    isLoading && "opacity-50 cursor-not-allowed",
    variant === "primary" && "bg-primary text-white",
    variant === "secondary" && "bg-gray-200 text-gray-900"
  )}
>
  {label}
</button>

// ✅ GOOD: Extract repeated patterns to components
// components/ui/card.tsx
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-lg bg-white p-6 shadow-md", className)}>
      {children}
    </div>
  );
}
```

### RTL Support

```tsx
// ✅ GOOD: Use logical properties
<div className="ps-4 pe-2"> {/* start/end instead of left/right */}
  <div className="ms-auto"> {/* margin-start instead of margin-left */}
    <button>Action</button>
  </div>
</div>

// ✅ GOOD: RTL-aware icons
<ChevronRight className={cn(locale === 'ar' && 'rotate-180')} />
```

## 📝 Comments & Documentation

### When to Comment

```typescript
// ✅ GOOD: Explain WHY, not WHAT
// We use exponential backoff to avoid overwhelming the payment gateway
// after transient failures, which typically resolve within 30 seconds
const retryWithBackoff = async (fn: () => Promise<T>, maxRetries = 3) => {
  // ... implementation
};

// ❌ BAD: Obvious comment
// Loop through products
products.forEach(product => {
  // ...
});

// ✅ GOOD: JSDoc for public APIs
/**
 * Calculates the total price including tax and delivery fee
 * @param items - Array of cart items
 * @param deliveryFee - Delivery fee in SAR
 * @param taxRate - Tax rate (default: 0.15 for Saudi VAT)
 * @returns Total price including all charges
 */
function calculateTotal(
  items: CartItem[],
  deliveryFee: number,
  taxRate = 0.15
): number {
  // ... implementation
}
```

### File Headers

```typescript
/**
 * @fileoverview Product service handling all product-related business logic
 * @module services/product
 * @requires prisma
 * @requires cache
 */
```

## 🧪 Testing Conventions

### Unit Tests

```typescript
// ✅ GOOD: Descriptive test names
describe('calculateTotal', () => {
  it('should calculate total with tax and delivery fee', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 },
    ];
    const deliveryFee = 20;

    const total = calculateTotal(items, deliveryFee);

    expect(total).toBe(307.5); // (200 + 50) * 1.15 + 20
  });

  it('should return 0 for empty cart', () => {
    expect(calculateTotal([], 0)).toBe(0);
  });

  it('should throw error for negative delivery fee', () => {
    expect(() => calculateTotal([], -10)).toThrow();
  });
});
```

### Integration Tests

```typescript
// ✅ GOOD: Test complete flows
describe('ProductController (e2e)', () => {
  it('should create and retrieve a product', async () => {
    const createDto = {
      name: 'Test Product',
      price: 99.99,
      stock: 10,
      categoryId: 'category-uuid',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/products')
      .send(createDto)
      .expect(201);

    const productId = createResponse.body.id;

    const getResponse = await request(app.getHttpServer())
      .get(`/products/${productId}`)
      .expect(200);

    expect(getResponse.body.name).toBe('Test Product');
  });
});
```

## 🔒 Security Best Practices

### Input Validation

```typescript
// ✅ GOOD: Validate all inputs
@Post()
async create(@Body() dto: CreateProductDto) {
  // DTO validation happens automatically via class-validator
  return this.productService.create(dto);
}

// ✅ GOOD: Sanitize user input
import { sanitize } from 'class-sanitizer';

@Post('comment')
async createComment(@Body() dto: CreateCommentDto) {
  sanitize(dto); // Remove any script tags, etc.
  return this.commentService.create(dto);
}
```

### Authentication & Authorization

```typescript
// ✅ GOOD: Protect routes
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@CurrentUser() user: User) {
  return user;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'pharmacist')
@Get('admin/orders')
getAdminOrders() {
  return this.orderService.findAll();
}
```

### Sensitive Data

```typescript
// ✅ GOOD: Never log sensitive data
this.logger.log(`User logged in: ${user.email}`);

// ❌ BAD: Logging sensitive data
this.logger.log(`Payment processed: ${JSON.stringify(paymentDetails)}`);

// ✅ GOOD: Exclude sensitive fields
const { password, ...userWithoutPassword } = user;
return userWithoutPassword;
```

## 🚀 Performance Best Practices

### Caching

```typescript
// ✅ GOOD: Cache expensive operations
async getProducts(categoryId: string): Promise<Product[]> {
  const cacheKey = `products:category:${categoryId}`;

  const cached = await this.cache.get(cacheKey);
  if (cached) return cached;

  const products = await this.prisma.product.findMany({
    where: { categoryId },
  });

  await this.cache.set(cacheKey, products, 300); // 5 minutes
  return products;
}
```

### Database Queries

```typescript
// ❌ BAD: N+1 query problem
const orders = await prisma.order.findMany();
for (const order of orders) {
  const items = await prisma.orderItem.findMany({
    where: { orderId: order.id },
  });
}

// ✅ GOOD: Use include to eager load
const orders = await prisma.order.findMany({
  include: {
    items: {
      include: { product: true },
    },
  },
});
```

## 📏 Code Formatting

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
```

### ESLint Rules

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
}
```

---

**Remember**: Consistency is more important than any individual rule. When in doubt, follow the existing code style in the project.
