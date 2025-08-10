from django.db import models
from apps.users.models import Family
from apps.pantry.models import InventoryItem

class NutritionTag(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='recipes', null=True, blank=True)
    name = models.CharField(max_length=128)
    steps = models.TextField()
    allergens = models.JSONField(default=list, blank=True)
    tags = models.ManyToManyField(NutritionTag, blank=True)
    servings = models.PositiveIntegerField(default=2)

    def __str__(self):
        return self.name

class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    item_name = models.CharField(max_length=128)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=16)

    def __str__(self):
        return f"{self.item_name} for {self.recipe.name}"