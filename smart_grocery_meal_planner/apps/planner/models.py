from django.db import models
from apps.users.models import Family
from apps.meals.models import Recipe

class MealPlan(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='meal_plans')
    week_start = models.DateField()

    class Meta:
        unique_together = ('family', 'week_start')

    def __str__(self):
        return f"Plan for {self.family.name} starting {self.week_start}"

class MealSlot(models.Model):
    MEAL_TYPES = (
        ("breakfast", "Breakfast"),
        ("lunch", "Lunch"),
        ("dinner", "Dinner"),
    )
    plan = models.ForeignKey(MealPlan, on_delete=models.CASCADE, related_name='slots')
    day = models.IntegerField(help_text="0=Mon ... 6=Sun")
    meal_type = models.CharField(max_length=16, choices=MEAL_TYPES)
    recipe = models.ForeignKey(Recipe, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        unique_together = ('plan', 'day', 'meal_type')

    def __str__(self):
        return f"{self.get_meal_type_display()} day {self.day}"