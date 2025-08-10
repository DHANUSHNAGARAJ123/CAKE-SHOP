# Smart Grocery & Meal Planner for Families

A Django-based AI-assisted kitchen OS that plans meals from what’s already at home, updates inventory after cooking, reduces waste, and nudges families with smart alerts.

## Quickstart

1. Python 3.11+
2. Create venv and install deps:
```
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```
3. Create DB and run server:
```
python manage.py migrate
python manage.py createsuperuser --username admin --email admin@example.com
python manage.py runserver 0.0.0.0:8000
```
4. Open http://localhost:8000

## Apps
- users: Family, FamilyMember, profiles
- pantry: InventoryItem, Purchase, expiry tracking
- meals: Recipe, Ingredient, NutritionTag
- planner: MealPlan, MealSlot, suggestions
- consumption: CookLog, WasteLog
- reports: KPIs, charts, PDF
- notifications: alerts, scheduled jobs
- recommendations: scoring logic

## Offline Excel Mode
Import/export pantry, recipes, members via CSV/Excel in the Inventory page.

## Environment
- Django, PostgreSQL (or SQLite for demo), Celery/Redis (optional)

## License
MIT