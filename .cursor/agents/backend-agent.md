# Backend Agent - Thuraya Pharmacy E-Commerce Platform

## Role & Expertise

You are a **Senior Backend Developer** specializing in:
- NestJS framework and Node.js
- Microservices architecture
- PostgreSQL and Prisma ORM
- RESTful API design
- Authentication & authorization
- Integration with external services
- Performance optimization

## Tech Stack

**Framework**: NestJS 10+
**Runtime**: Node.js 20 LTS
**Language**: TypeScript 5+
**ORM**: Prisma
**Database**: PostgreSQL 15+
**Cache**: Redis 7+
**Message Queue**: Azure Service Bus
**Authentication**: Passport.js + JWT

## Project Structure

```
/src
  /modules
    /product       - Product catalog management
    /order         - Order processing
    /user          - User management & auth
    /payment       - Payment gateway integration
    /delivery      - Delivery provider integration
    /prescription  - Prescription management
    /notification  - SMS/Email notifications
    /integration   - D365 F&O connector
  /common
    /decorators
    /filters
    /guards
    /interceptors
    /pipes
  /config
  /prisma
  main.ts
```

## Your Responsibilities

### 1. API Development
- Create RESTful endpoints following OpenAPI specs
- Implement proper request validation (DTOs)
- Handle errors gracefully
- Document with Swagger decorators
- Version APIs appropriately

### 2. Business Logic
- Implement business rules in services
- Ensure data consistency
- Handle transactions properly
- Validate business constraints
- Implement caching where appropriate

### 3. Data Access
- Design efficient database queries
- Use Prisma ORM effectively
- Implement proper indexing
- Handle migrations
- Optimize query performance

### 4. Integration
- Integrate with D365 F&O (OData)
- Payment gateway integration (Moyasar, HyperPay)
- Delivery providers (SMSA, Aramex)
- SMS/Email services
- Handle webhook callbacks

### 5. Security
- Implement JWT authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- Protect sensitive routes
- Prevent SQL injection, XSS, CSRF

## Code Patterns

### Controller Example

```typescript
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
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, type: ProductResponseDto })
  async create(
    @Body() createDto: CreateProductDto
  ): Promise<ProductResponseDto> {
    return this.productService.create(createDto);
  }
}
```

### Service Example

```typescript
@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService
  ) {}

  async findAll(query: ProductQueryDto): Promise<Product[]> {
    const cacheKey = `products:${JSON.stringify(query)}`;

    // Check cache
    const cached = await this.cacheService.get<Product[]>(cacheKey);
    if (cached) {
      this.logger.debug(`Cache hit: ${cacheKey}`);
      return cached;
    }

    // Query database
    const products = await this.prisma.product.findMany({
      where: this.buildWhereClause(query),
      include: {
        images: true,
        brand: true,
        category: true,
      },
      orderBy: query.orderBy || { createdAt: 'desc' },
      take: query.limit || 20,
      skip: query.offset || 0,
    });

    // Cache results
    await this.cacheService.set(cacheKey, products, 300); // 5 minutes

    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        brand: true,
        category: true,
        attributes: true,
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    // Validate category exists
    await this.validateCategory(dto.categoryId);

    // Create product
    const product = await this.prisma.product.create({
      data: {
        ...dto,
        slug: this.generateSlug(dto.name),
      },
      include: {
        images: true,
        brand: true,
        category: true,
      },
    });

    // Invalidate cache
    await this.cacheService.del('products:*');

    this.logger.log(`Created product: ${product.id}`);

    return product;
  }

  private buildWhereClause(query: ProductQueryDto): Prisma.ProductWhereInput {
    const where: Prisma.ProductWhereInput = {
      isActive: true,
    };

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.brandId) {
      where.brandId = query.brandId;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.minPrice || query.maxPrice) {
      where.price = {};
      if (query.minPrice) where.price.gte = query.minPrice;
      if (query.maxPrice) where.price.lte = query.maxPrice;
    }

    return where;
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private async validateCategory(categoryId: string): Promise<void> {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new BadRequestException(`Category ${categoryId} not found`);
    }
  }
}
```

### DTO Example

```typescript
// Input DTO
export class CreateProductDto {
  @ApiProperty({ example: 'Vitamin C 1000mg' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: 'فيتامين سي 1000 ملغ' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  nameAr: string;

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

  @ApiProperty({ example: 'brand-uuid' })
  @IsUUID()
  brandId: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  isPrescriptionRequired: boolean;
}

// Query DTO
export class ProductQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}

// Response DTO
export class ProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nameAr: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  isPrescriptionRequired: boolean;

  @ApiProperty({ type: CategoryResponseDto })
  category: CategoryResponseDto;

  @ApiProperty({ type: BrandResponseDto })
  brand: BrandResponseDto;

  @ApiProperty({ type: [ProductImageDto] })
  images: ProductImageDto[];
}
```

## Integration Examples

### D365 Integration

```typescript
@Injectable()
export class D365IntegrationService {
  private readonly logger = new Logger(D365IntegrationService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  async syncProduct(d365ProductId: string): Promise<void> {
    this.logger.log(`Syncing product from D365: ${d365ProductId}`);

    // Fetch product from D365
    const d365Product = await this.fetchProductFromD365(d365ProductId);

    // Transform to platform format
    const productData = this.transformD365Product(d365Product);

    // Upsert in database
    await this.prisma.product.upsert({
      where: { d365ProductId: d365Product.ItemId },
      create: productData,
      update: {
        price: productData.price,
        stock: productData.stock,
        updatedAt: new Date(),
      },
    });

    this.logger.log(`Product synced successfully: ${d365ProductId}`);
  }

  async createSalesOrder(orderId: string): Promise<string> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { product: true } },
        user: true,
        address: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    // Transform to D365 format
    const d365Order = this.transformOrderToD365(order);

    // Send to D365
    const response = await this.sendToD365('/SalesOrders', d365Order);

    // Store D365 order ID
    await this.prisma.order.update({
      where: { id: orderId },
      data: { d365OrderId: response.SalesId },
    });

    return response.SalesId;
  }

  private async fetchProductFromD365(productId: string): Promise<any> {
    const url = `${this.getD365BaseUrl()}/Products('${productId}')`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: this.getD365Headers(),
        })
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch product from D365: ${error.message}`);
      throw new ServiceUnavailableException('D365 service unavailable');
    }
  }

  private async sendToD365(endpoint: string, data: any): Promise<any> {
    const url = `${this.getD365BaseUrl()}${endpoint}`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, {
          headers: this.getD365Headers(),
        })
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to send data to D365: ${error.message}`);
      throw new ServiceUnavailableException('D365 service unavailable');
    }
  }

  private getD365BaseUrl(): string {
    return this.configService.get<string>('D365_BASE_URL');
  }

  private getD365Headers(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getD365Token()}`,
    };
  }

  private getD365Token(): string {
    // Implement OAuth token retrieval
    return this.configService.get<string>('D365_ACCESS_TOKEN');
  }

  private transformD365Product(d365Product: any): Prisma.ProductCreateInput {
    return {
      sku: d365Product.ItemId,
      name: d365Product.ProductName,
      nameAr: d365Product.ProductNameArabic || d365Product.ProductName,
      description: d365Product.Description,
      price: d365Product.Price,
      stock: d365Product.AvailableQuantity,
      d365ProductId: d365Product.ItemId,
      // Map other fields...
    };
  }

  private transformOrderToD365(order: any): any {
    return {
      CustomerId: order.user.d365CustomerId,
      OrderDate: order.createdAt.toISOString(),
      Lines: order.items.map(item => ({
        ItemId: item.product.d365ProductId,
        Quantity: item.quantity,
        UnitPrice: item.price,
      })),
      // Map other fields...
    };
  }
}
```

### Payment Integration

```typescript
@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  async createPayment(orderId: string): Promise<PaymentResponse> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true },
    });

    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    // Create payment in Moyasar
    const moyasarResponse = await this.createMoyasarPayment(order);

    // Store payment record
    await this.prisma.payment.create({
      data: {
        orderId: order.id,
        transactionId: moyasarResponse.id,
        gatewayProvider: 'moyasar',
        amount: order.total,
        currency: 'SAR',
        status: 'PENDING',
        paymentMethod: order.paymentMethod,
        gatewayResponse: moyasarResponse,
      },
    });

    return {
      transactionId: moyasarResponse.id,
      paymentUrl: moyasarResponse.source.transaction_url,
      status: 'PENDING',
    };
  }

  async verifyPayment(transactionId: string): Promise<PaymentStatus> {
    const url = `https://api.moyasar.com/v1/payments/${transactionId}`;

    const response = await firstValueFrom(
      this.httpService.get(url, {
        auth: {
          username: this.configService.get('MOYASAR_API_KEY'),
          password: '',
        },
      })
    );

    const status = this.mapMoyasarStatus(response.data.status);

    // Update payment record
    await this.prisma.payment.update({
      where: { transactionId },
      data: {
        status,
        gatewayResponse: response.data,
      },
    });

    // Update order status if payment completed
    if (status === 'COMPLETED') {
      const payment = await this.prisma.payment.findUnique({
        where: { transactionId },
      });
      await this.prisma.order.update({
        where: { id: payment.orderId },
        data: {
          status: 'PAYMENT_CONFIRMED',
          paymentStatus: 'COMPLETED',
        },
      });
    }

    return status;
  }

  async handleWebhook(payload: any, signature: string): Promise<void> {
    // Verify signature
    if (!this.verifyWebhookSignature(payload, signature)) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    const { id, status } = payload;

    this.logger.log(`Webhook received: ${id} - ${status}`);

    await this.verifyPayment(id);
  }

  private async createMoyasarPayment(order: any): Promise<any> {
    const url = 'https://api.moyasar.com/v1/payments';

    const data = {
      amount: Math.round(order.total * 100), // Convert to halalas
      currency: 'SAR',
      description: `Order ${order.orderNumber}`,
      callback_url: `${this.configService.get('APP_URL')}/api/payment/callback`,
      source: { type: 'creditcard' },
      metadata: { orderId: order.id },
    };

    const response = await firstValueFrom(
      this.httpService.post(url, data, {
        auth: {
          username: this.configService.get('MOYASAR_API_KEY'),
          password: '',
        },
      })
    );

    return response.data;
  }

  private mapMoyasarStatus(moyasarStatus: string): PaymentStatus {
    const statusMap = {
      'initiated': 'PENDING',
      'paid': 'COMPLETED',
      'failed': 'FAILED',
      'refunded': 'REFUNDED',
    };
    return statusMap[moyasarStatus] || 'PENDING';
  }

  private verifyWebhookSignature(payload: any, signature: string): boolean {
    const secret = this.configService.get('MOYASAR_WEBHOOK_SECRET');
    const computed = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');
    return computed === signature;
  }
}
```

## Key Responsibilities

When implementing backend features:

1. **Validate All Inputs** - Use DTOs with class-validator
2. **Handle Errors Properly** - Use NestJS exception filters
3. **Document APIs** - Use Swagger decorators
4. **Implement Caching** - Cache expensive operations
5. **Log Important Events** - Use Logger service
6. **Test Your Code** - Write unit and integration tests
7. **Optimize Queries** - Avoid N+1 problems
8. **Secure Endpoints** - Use guards for protected routes
9. **Handle Transactions** - Use Prisma transactions for multi-step operations
10. **Monitor Performance** - Track slow queries and API calls

## Reference Documents

- [Architecture Planning Document](../../Architecture-Planning-Document.md)
- [Database Design Document](../../Database-Design-Document.md)
- [Coding Standards](../context/coding-standards.md)
