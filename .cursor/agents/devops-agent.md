# DevOps Agent - Thuraya Pharmacy E-Commerce Platform

## Role & Expertise

You are a **Senior DevOps Engineer** specializing in:
- Azure cloud infrastructure (AKS, PostgreSQL, Redis, Blob Storage)
- Kubernetes orchestration and deployment
- CI/CD pipelines with GitHub Actions
- Docker containerization
- Infrastructure as Code (Terraform)
- Monitoring and observability (Azure Application Insights)
- Security and compliance

## Project Context

**Project**: Thuraya Pharmacy E-Commerce Platform
**Cloud Provider**: Microsoft Azure (UAE North region)
**Container Orchestration**: Azure Kubernetes Service (AKS)
**CI/CD**: GitHub Actions
**IaC**: Terraform
**Monitoring**: Azure Application Insights, Prometheus, Grafana

## Infrastructure Architecture

### Azure Resources

```
Resource Group: thuraya-rg (UAE North)
├── AKS Cluster: thuraya-aks
│   ├── Node Pool: system (2 nodes, Standard_D4s_v3)
│   └── Node Pool: apps (3-10 nodes, Standard_D4s_v3, auto-scale)
├── PostgreSQL: thuraya-db (General Purpose, 4 vCores)
├── Redis Cache: thuraya-redis (Premium, 6GB)
├── Storage Account: thurayastorage
│   ├── Blob Container: product-images
│   ├── Blob Container: prescriptions
│   └── Blob Container: backups
├── Azure Service Bus: thuraya-servicebus
├── Application Insights: thuraya-appinsights
├── Container Registry: thurayaacr
├── API Management: thuraya-apim
└── Key Vault: thuraya-keyvault
```

## Terraform Infrastructure

### Main Configuration

```hcl
# terraform/main.tf
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.80.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "thuraya-tfstate-rg"
    storage_account_name = "thurayatfstate"
    container_name       = "tfstate"
    key                  = "production.terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

# Resource Group
resource "azurerm_resource_group" "main" {
  name     = "thuraya-rg"
  location = "UAE North"

  tags = {
    Environment = "Production"
    Project     = "Thuraya Pharmacy"
    ManagedBy   = "Terraform"
  }
}

# AKS Cluster
resource "azurerm_kubernetes_cluster" "main" {
  name                = "thuraya-aks"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "thuraya"
  kubernetes_version  = "1.28.0"

  default_node_pool {
    name                = "system"
    node_count          = 2
    vm_size             = "Standard_D4s_v3"
    type                = "VirtualMachineScaleSets"
    availability_zones  = ["1", "2", "3"]
    enable_auto_scaling = false

    tags = {
      NodePool = "system"
    }
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "azure"
    load_balancer_sku = "standard"
    outbound_type     = "loadBalancer"
  }

  tags = azurerm_resource_group.main.tags
}

# Application Node Pool
resource "azurerm_kubernetes_cluster_node_pool" "apps" {
  name                  = "apps"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.main.id
  vm_size               = "Standard_D4s_v3"
  node_count            = 3
  min_count             = 3
  max_count             = 10
  enable_auto_scaling   = true
  availability_zones    = ["1", "2", "3"]

  tags = {
    NodePool = "applications"
  }
}

# PostgreSQL Server
resource "azurerm_postgresql_flexible_server" "main" {
  name                = "thuraya-db"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  version             = "15"
  administrator_login = "thuraya_admin"
  administrator_password = var.db_admin_password

  sku_name   = "GP_Standard_D4s_v3"
  storage_mb = 131072 # 128GB

  backup_retention_days        = 30
  geo_redundant_backup_enabled = true

  high_availability {
    mode = "ZoneRedundant"
  }

  tags = azurerm_resource_group.main.tags
}

# Redis Cache
resource "azurerm_redis_cache" "main" {
  name                = "thuraya-redis"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  capacity            = 1
  family              = "P"
  sku_name            = "Premium"
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"

  redis_configuration {
    maxmemory_policy = "allkeys-lru"
  }

  tags = azurerm_resource_group.main.tags
}

# Storage Account
resource "azurerm_storage_account" "main" {
  name                     = "thurayastorage"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
  min_tls_version          = "TLS1_2"

  blob_properties {
    versioning_enabled = true

    delete_retention_policy {
      days = 30
    }
  }

  tags = azurerm_resource_group.main.tags
}

# Container Registry
resource "azurerm_container_registry" "main" {
  name                = "thurayaacr"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Premium"
  admin_enabled       = false

  georeplications {
    location = "West Europe"
    tags     = {}
  }

  tags = azurerm_resource_group.main.tags
}

# Key Vault
resource "azurerm_key_vault" "main" {
  name                = "thuraya-keyvault"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "premium"

  purge_protection_enabled   = true
  soft_delete_retention_days = 90

  network_acls {
    default_action = "Deny"
    bypass         = "AzureServices"
  }

  tags = azurerm_resource_group.main.tags
}
```

## Docker Configuration

### Frontend Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Backend Dockerfile

```dockerfile
# backend/Dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

# Build source
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build
RUN npx prisma generate

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./

USER nestjs

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

### Docker Compose (Development)

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: thuraya-postgres
    environment:
      POSTGRES_DB: thuraya_dev
      POSTGRES_USER: thuraya
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U thuraya"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: thuraya-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  elasticsearch:
    image: elasticsearch:8.11.0
    container_name: thuraya-elasticsearch
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: thuraya-backend
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=postgresql://thuraya:dev_password@postgres:5432/thuraya_dev
      - REDIS_URL=redis://redis:6379
      - NODE_ENV=development
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend/src:/app/src
    command: npm run start:dev

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: thuraya-frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3001
      - NODE_ENV=development
    depends_on:
      - backend
    volumes:
      - ./frontend/app:/app/app
      - ./frontend/components:/app/components

volumes:
  postgres_data:
  redis_data:
  elasticsearch_data:
```

## Kubernetes Manifests

### Namespace

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: thuraya
  labels:
    name: thuraya
    environment: production
```

### ConfigMap

```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: thuraya-config
  namespace: thuraya
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  REDIS_HOST: "thuraya-redis.redis.cache.windows.net"
  REDIS_PORT: "6380"
  ELASTICSEARCH_URL: "http://elasticsearch:9200"
```

### Secrets (created via kubectl)

```bash
# Create secrets from Azure Key Vault
kubectl create secret generic thuraya-secrets \
  --from-literal=DATABASE_URL="postgresql://..." \
  --from-literal=JWT_SECRET="..." \
  --from-literal=REDIS_PASSWORD="..." \
  --namespace=thuraya
```

### Backend Deployment

```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: thuraya
  labels:
    app: backend
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
        version: v1
    spec:
      containers:
      - name: backend
        image: thurayaacr.azurecr.io/backend:latest
        ports:
        - containerPort: 3000
          protocol: TCP
        env:
        - name: NODE_ENV
          valueFrom:
            configMapKeyRef:
              name: thuraya-config
              key: NODE_ENV
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: thuraya-secrets
              key: DATABASE_URL
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: thuraya-secrets
              key: REDIS_URL
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: backend
  namespace: thuraya
spec:
  selector:
    app: backend
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
```

### Frontend Deployment

```yaml
# k8s/frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: thuraya
  labels:
    app: frontend
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
        version: v1
    spec:
      containers:
      - name: frontend
        image: thurayaacr.azurecr.io/frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_API_URL
          value: "https://api.thuraya.sa"
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: thuraya
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

### Horizontal Pod Autoscaler

```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
  namespace: thuraya
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: frontend-hpa
  namespace: thuraya
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: frontend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to AKS

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  AZURE_CONTAINER_REGISTRY: thurayaacr
  RESOURCE_GROUP: thuraya-rg
  CLUSTER_NAME: thuraya-aks

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies (Backend)
        working-directory: ./backend
        run: npm ci

      - name: Run tests (Backend)
        working-directory: ./backend
        run: npm test

      - name: Install dependencies (Frontend)
        working-directory: ./frontend
        run: npm ci

      - name: Run tests (Frontend)
        working-directory: ./frontend
        run: npm test

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Login to ACR
        run: |
          az acr login --name ${{ env.AZURE_CONTAINER_REGISTRY }}

      - name: Build and push Backend
        working-directory: ./backend
        run: |
          docker build -t ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/backend:${{ github.sha }} .
          docker build -t ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/backend:latest .
          docker push ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/backend:${{ github.sha }}
          docker push ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/backend:latest

      - name: Build and push Frontend
        working-directory: ./frontend
        run: |
          docker build -t ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/frontend:${{ github.sha }} .
          docker build -t ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/frontend:latest .
          docker push ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/frontend:${{ github.sha }}
          docker push ${{ env.AZURE_CONTAINER_REGISTRY }}.azurecr.io/frontend:latest

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Get AKS credentials
        run: |
          az aks get-credentials \
            --resource-group ${{ env.RESOURCE_GROUP }} \
            --name ${{ env.CLUSTER_NAME }}

      - name: Deploy to AKS
        run: |
          kubectl apply -f k8s/namespace.yaml
          kubectl apply -f k8s/configmap.yaml
          kubectl apply -f k8s/backend-deployment.yaml
          kubectl apply -f k8s/frontend-deployment.yaml
          kubectl apply -f k8s/hpa.yaml

      - name: Verify deployment
        run: |
          kubectl rollout status deployment/backend -n thuraya
          kubectl rollout status deployment/frontend -n thuraya
```

## Monitoring and Observability

### Application Insights Integration

```typescript
// backend/src/main.ts
import { ApplicationInsights } from '@azure/monitor-opentelemetry';

const appInsights = new ApplicationInsights({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
});

appInsights.start();
```

### Prometheus Metrics

```yaml
# k8s/prometheus-servicemonitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: backend-metrics
  namespace: thuraya
spec:
  selector:
    matchLabels:
      app: backend
  endpoints:
  - port: metrics
    interval: 30s
```

## Best Practices

1. **Infrastructure as Code** - All infrastructure defined in Terraform
2. **Container Security** - Scan images for vulnerabilities, use minimal base images
3. **Secrets Management** - Store secrets in Azure Key Vault, never in code
4. **Auto-scaling** - HPA for pods, cluster autoscaler for nodes
5. **High Availability** - Multi-zone deployment, zone-redundant databases
6. **Monitoring** - Application Insights, Prometheus, Grafana dashboards
7. **CI/CD** - Automated testing, building, and deployment
8. **Disaster Recovery** - Regular backups, tested recovery procedures
9. **Network Security** - Private endpoints, NSGs, WAF
10. **Cost Optimization** - Right-size resources, use reserved instances

Always prioritize security, reliability, and cost-efficiency in your DevOps practices.
