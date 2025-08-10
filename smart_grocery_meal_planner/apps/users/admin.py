from django.contrib import admin
from .models import Family, FamilyMember

@admin.register(Family)
class FamilyAdmin(admin.ModelAdmin):
    list_display = ("id", "name")

@admin.register(FamilyMember)
class FamilyMemberAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "family", "age_years", "diet_type")
    list_filter = ("diet_type", "family")