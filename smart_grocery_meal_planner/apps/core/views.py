from django.shortcuts import render

def home(request):
    sections = [
        {
            'title': 'AI Meal Suggestions',
            'points': [
                'Understands family: age, diet, allergies',
                'Uses pantry first; avoids overbuying',
                'Expiry-aware suggestions'
            ]
        },
        {
            'title': 'Health-Aware Planning',
            'points': [
                'Nutrition tags: High Protein, Iron-rich, Diabetic-safe',
                'Skips allergens and fits goals'
            ]
        },
        {
            'title': 'Real-time Inventory',
            'points': [
                'Quantities, expiry dates, low-stock',
                'Auto-deduct after cooking'
            ]
        },
    ]
    return render(request, 'home.html', {'sections': sections})