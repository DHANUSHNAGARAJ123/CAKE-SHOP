from django.db import models
from apps.users.models import Family, FamilyMember
from apps.meals.models import Recipe

class CookLog(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='cook_logs')
    recipe = models.ForeignKey(Recipe, on_delete=models.SET_NULL, null=True)
    cooked_at = models.DateTimeField(auto_now_add=True)
    servings = models.PositiveIntegerField(default=2)

    def __str__(self):
        return f"Cooked {self.recipe} ({self.servings})"

class WasteLog(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='waste_logs')
    item_name = models.CharField(max_length=128)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=16)
    reason = models.CharField(max_length=128, default='leftover')
    logged_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Waste {self.item_name} {self.quantity}{self.unit}"