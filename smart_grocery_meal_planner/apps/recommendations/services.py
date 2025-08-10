from dataclasses import dataclass
from typing import List

@dataclass
class FamilyContext:
    diet_types: List[str]
    allergies: List[str]
    pantry_names: List[str]


def score_recipe(recipe, family_ctx: FamilyContext) -> float:
    name = getattr(recipe, 'name', '').lower()
    penalty = 0
    for allergen in getattr(recipe, 'allergens', []) or []:
        if allergen.lower() in [a.lower() for a in family_ctx.allergies]:
            return -1.0
    inv_bonus = 0.3 if any(n in name for n in family_ctx.pantry_names) else 0
    diet_bonus = 0.2 if ('veg' in family_ctx.diet_types) else 0
    base = 0.5
    return base + inv_bonus + diet_bonus