# API cURL Examples

Base URL: `http://localhost:3000/api` (adjust port if your server uses a different one)

---

## Health

```bash
# Health check
curl -s "http://localhost:3000/api/health"

# Readiness check
curl -s "http://localhost:3000/api/ready"
```

---

## Drivers (`/api/drivers`)

```bash
# Driver swap count (query: driverId if required by your impl)
curl -s "http://localhost:3000/api/drivers/driverSwapCount"

# Driver onboarding status
curl -s "http://localhost:3000/api/drivers/onboarding/status"

# Nearest partner stations (required: latitude, longitude; optional: limit, radiusKm)
curl -s "http://localhost:3000/api/drivers/nearest/partner-stations?latitude=28.6139&longitude=77.2090&limit=5"

# Nearest DSK centers (required: latitude, longitude; optional: limit, radiusKm)
curl -s "http://localhost:3000/api/drivers/nearest/dsk-centers?latitude=28.6139&longitude=77.2090&limit=5"

# Nearest inactivity centers (required: latitude, longitude; optional: limit, radiusKm)
curl -s "http://localhost:3000/api/drivers/nearest/inactivity-centers?latitude=28.6139&longitude=77.2090&limit=5"
```

---

## Queries (`/api/queries`)

```bash
# Get driver queries (query params as used by your controller)
curl -s "http://localhost:3000/api/queries"
```

---

## Schemes (`/api/schemes`)

```bash
# List all schemes for a driver
curl -s "http://localhost:3000/api/schemes?driverId=DRV001"

# Get scheme details (schemeName, description) for a driver
curl -s "http://localhost:3000/api/schemes/details?driverId=DRV001"

# Get latest scheme name for a driver
curl -s "http://localhost:3000/api/schemes/schemeName?driverId=DRV001"

# Get scheme description for a driver
curl -s "http://localhost:3000/api/schemes/description?driverId=DRV001"

# Get one scheme by id
curl -s "http://localhost:3000/api/schemes/1"
```

---

## Subscriptions (`/api/subscriptions`)

```bash
# List all subscriptions for a driver
curl -s "http://localhost:3000/api/subscriptions?driverId=DRV001"

# Get subscription details (subscriptionName, description, startDate, endDate, subscriptionPrice)
curl -s "http://localhost:3000/api/subscriptions/details?driverId=DRV001"

# Get subscription end date
curl -s "http://localhost:3000/api/subscriptions/endDate?driverId=DRV001"

# Get subscription start date
curl -s "http://localhost:3000/api/subscriptions/startDate?driverId=DRV001"

# Get subscription price
curl -s "http://localhost:3000/api/subscriptions/price?driverId=DRV001"

# Get subscription status
curl -s "http://localhost:3000/api/subscriptions/status?driverId=DRV001"
```

---

## Transactions (`/api/transactions`)

```bash
# Last swap price for a driver
curl -s "http://localhost:3000/api/transactions/lastSwapPrice?driverId=DRV001"

# Last swap partner id for a driver
curl -s "http://localhost:3000/api/transactions/lastSwapPartnerId?driverId=DRV001"

# Last swap history invoice for a driver
curl -s "http://localhost:3000/api/transactions/lastSwapHistoryInvoice?driverId=DRV001"

# Last battery issued for a driver
curl -s "http://localhost:3000/api/transactions/lastBatteryIssued?driverId=DRV001"

# Swap history by date range
curl -s "http://localhost:3000/api/transactions/swapHistoryByDateRange?startDate=2025-01-01&endDate=2025-01-31"
```

---

## Run migrations

From project root:

```bash
# Run all pending migrations
npm run db:migrate

# Undo last migration
npm run db:migrate:undo
```
