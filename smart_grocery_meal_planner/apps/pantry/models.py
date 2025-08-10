from django.db import models
from apps.users.models import Family

class InventoryItem(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='inventory_items')
    name = models.CharField(max_length=128)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    unit = models.CharField(max_length=16)
    expiry_at = models.DateField(null=True, blank=True)
    min_threshold = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    location = models.CharField(max_length=64, default='pantry')

    def __str__(self):
        return f"{self.name} - {self.family.name}"

class Purchase(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='purchases')
    item_name = models.CharField(max_length=128)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=16)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    purchased_at = models.DateField()

    def __str__(self):
        return f"{self.item_name} ({self.quantity} {self.unit})"