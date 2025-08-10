from django.db import models

class Family(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

class FamilyMember(models.Model):
    DIET_CHOICES = (
        ("veg", "Vegetarian"),
        ("nonveg", "Non-vegetarian"),
    )
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='members')
    name = models.CharField(max_length=128)
    age_years = models.IntegerField()
    diet_type = models.CharField(max_length=16, choices=DIET_CHOICES)
    allergies = models.JSONField(default=list, blank=True)
    goals = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.name} ({self.family.name})"