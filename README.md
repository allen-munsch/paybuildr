# PayBuildr

A powerful Django application that integrates Stripe payments, Kong API Gateway management, and page building capabilities using GrapeJS and Puck.

Wow, api gateways, POW, page buildign with grapejs, ZIP, payments with stripe, BAM, django 5.0+

## Features

- **Stripe Integration**: Process payments, manage subscriptions, and handle webhooks
- **Kong API Management**: Configure and manage API services, routes, and rate limiting
- **Page Builder**: Create and customize pages with GrapeJS or Puck page builders
- **Admin Interface**: Comprehensive Django admin integration for all components
- **API Access**: REST API endpoints for plans, subscriptions, and pages
- **Customizable**: Extensible architecture that works with your existing Django project

## Requirements

- Python 3.12+
- Django 5.0+
- Django REST Framework 3.14+
- Stripe Python SDK 7.0+
- Kong API Gateway
- Node.js (for building frontend assets)

## Installation

```bash
pip install paybuildr
```

Add to your `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'paybuildr',
    # ...
]
```

Add to your `urls.py`:

```python
urlpatterns = [
    # ...
    path('paybuildr/', include('paybuildr.urls')),
    # ...
]
```

## Configuration

### Stripe Configuration

Add these settings to your `settings.py`:

```python
STRIPE_SECRET_KEY = 'your-stripe-secret-key'
STRIPE_PUBLIC_KEY = 'your-stripe-publishable-key'
STRIPE_WEBHOOK_SECRET = 'your-stripe-webhook-secret'
STRIPE_SUCCESS_URL = 'https://your-site.com/success/'
STRIPE_CANCEL_URL = 'https://your-site.com/cancel/'
```

### Kong Configuration

```python
KONG_ADMIN_URL = 'http://localhost:8001'
KONG_SYNC_ENABLED = True  # Set to False to disable Kong synchronization
```

### Migrations

Run migrations to set up the database tables:

```bash
python manage.py migrate paybuildr
```

## Usage

### Admin Interface

The admin interface provides comprehensive management for all components:

- **Plans**: Create and manage subscription plans
- **Subscriptions**: View and manage user subscriptions
- **API Services**: Configure Kong API services
- **API Routes**: Set up routes for your Kong services
- **API Plans**: Configure rate limiting for different plans
- **Pages**: Create and edit pages with the built-in page builders

### Management Commands

```bash
# Sync services to Kong
python manage.py setup_kong

# Import services from Kong to Django
python manage.py sync_from_kong

# Sync Stripe plans
python manage.py sync_stripe_plans
```

### API Endpoints

The package provides several REST API endpoints:

- `/api/plans/` - List available plans
- `/api/plans/{id}/checkout/` - Create a checkout session
- `/api/subscriptions/` - List user subscriptions
- `/api/pages/` - Access pages created with the page builder

### Page Building

The package includes both GrapeJS and Puck.js page builders:

1. Create pages in the admin interface
2. Use the visual page builder to design your page
3. Publish and make available via the API or direct URL

## Development

### Frontend Assets

To build the frontend assets:

```bash
cd paybuildr/static/paybuildr/js/puck
npm install
npm run build
```

### Running Tests

```bash
python manage.py test paybuildr
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
