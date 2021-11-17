import { Condition, ConditionCategory, NGSClass, WeaponRarityAttackScaling, WeaponSeries, WeaponType } from "../src/helpers/HelperTypes"

export const weaponsMock: WeaponSeries[] = [
  {
    "id": "46",
    "name": "Primm",
    "iname": {
      "ja": "プリム"
    },
    "base_attack": 177,
    "attack": [
      {
        "level": 0,
        "value": 177
      },
      {
        "level": 1,
        "value": 179
      },
      {
        "level": 2,
        "value": 181
      },
      {
        "level": 3,
        "value": 183
      },
      {
        "level": 4,
        "value": 185
      },
      {
        "level": 5,
        "value": 187
      },
      {
        "level": 6,
        "value": 189
      },
      {
        "level": 7,
        "value": 191
      },
      {
        "level": 8,
        "value": 193
      },
      {
        "level": 9,
        "value": 196
      },
      {
        "level": 10,
        "value": 199
      },
      {
        "level": 11,
        "value": 201
      },
      {
        "level": 12,
        "value": 203
      },
      {
        "level": 13,
        "value": 205
      },
      {
        "level": 14,
        "value": 207
      },
      {
        "level": 15,
        "value": 209
      },
      {
        "level": 16,
        "value": 211
      },
      {
        "level": 17,
        "value": 214
      },
      {
        "level": 18,
        "value": 217
      },
      {
        "level": 19,
        "value": 220
      },
      {
        "level": 20,
        "value": 223
      },
      {
        "level": 21,
        "value": 224
      },
      {
        "level": 22,
        "value": 225
      },
      {
        "level": 23,
        "value": 226
      },
      {
        "level": 24,
        "value": 228
      },
      {
        "level": 25,
        "value": 230
      },
      {
        "level": 26,
        "value": 232
      },
      {
        "level": 27,
        "value": 234
      },
      {
        "level": 28,
        "value": 236
      },
      {
        "level": 29,
        "value": 238
      },
      {
        "level": 30,
        "value": 240
      },
      {
        "level": 31,
        "value": 241
      },
      {
        "level": 32,
        "value": 243
      },
      {
        "level": 33,
        "value": 245
      },
      {
        "level": 34,
        "value": 247
      },
      {
        "level": 35,
        "value": 249
      },
      {
        "level": 36,
        "value": 251
      },
      {
        "level": 37,
        "value": 253
      },
      {
        "level": 38,
        "value": 255
      },
      {
        "level": 39,
        "value": 257
      },
      {
        "level": 40,
        "value": 259
      }
    ],
    "min_attack": 0.7,
    "max_attack": 1,
    "weapon_potential": {
      "id": "1",
      "name": "Recycler Unit",
      "condition": null,
      "potential": [
        {
          "level": 1,
          "effect": {
            "hp": null,
            "melee_potency": 0.18,
            "technique_potency": 0.18,
            "ranged_potency": 0.18,
            "potency_floor": null,
            "pp": null,
            "damage_reduction": null,
            "physical_down_resist": null,
            "poison_resist": null,
            "panic_resist": null,
            "blind_resist": null,
            "shock_resist": null,
            "freeze_resist": null,
            "burn_resist": null,
            "pp_cost_down": null,
            "pp_natural_regen": null,
            "pp_active_regen": null,
            "critical_chance": null,
            "critical_damage": null
          },
          "conditional_effect": null
        },
        {
          "level": 2,
          "effect": {
            "hp": null,
            "melee_potency": 0.2,
            "technique_potency": 0.2,
            "ranged_potency": 0.2,
            "potency_floor": null,
            "pp": null,
            "damage_reduction": null,
            "physical_down_resist": null,
            "poison_resist": null,
            "panic_resist": null,
            "blind_resist": null,
            "shock_resist": null,
            "freeze_resist": null,
            "burn_resist": null,
            "pp_cost_down": null,
            "pp_natural_regen": null,
            "pp_active_regen": null,
            "critical_chance": null,
            "critical_damage": null
          },
          "conditional_effect": null
        },
        {
          "level": 3,
          "effect": {
            "hp": null,
            "melee_potency": 0.23,
            "technique_potency": 0.23,
            "ranged_potency": 0.23,
            "potency_floor": null,
            "pp": null,
            "damage_reduction": null,
            "physical_down_resist": null,
            "poison_resist": null,
            "panic_resist": null,
            "blind_resist": null,
            "shock_resist": null,
            "freeze_resist": null,
            "burn_resist": null,
            "pp_cost_down": null,
            "pp_natural_regen": null,
            "pp_active_regen": null,
            "critical_chance": null,
            "critical_damage": null
          },
          "conditional_effect": null
        },
        {
          "level": 4,
          "effect": {
            "hp": null,
            "melee_potency": 0.24,
            "technique_potency": 0.24,
            "ranged_potency": 0.24,
            "potency_floor": null,
            "pp": null,
            "damage_reduction": null,
            "physical_down_resist": null,
            "poison_resist": null,
            "panic_resist": null,
            "blind_resist": null,
            "shock_resist": null,
            "freeze_resist": null,
            "burn_resist": null,
            "pp_cost_down": null,
            "pp_natural_regen": null,
            "pp_active_regen": null,
            "critical_chance": null,
            "critical_damage": null
          },
          "conditional_effect": null
        }
      ],
      "description": "After equipping for 10 seconds, 20% chance of Restasigne to not be consumed on use\n\n//Potential of: Primm, Silver Primm, Gold Primm",
      "iname": {
        "ja": "節制の型"
      },
      "idescription": null
    },
    "weapon_types": [
      {
        "id": "22"
      },
      {
        "id": "34"
      },
      {
        "id": "7"
      },
      {
        "id": "37"
      },
      {
        "id": "16"
      },
      {
        "id": "4"
      },
      {
        "id": "10"
      },
      {
        "id": "19"
      },
      {
        "id": "40"
      },
      {
        "id": "28"
      },
      {
        "id": "25"
      },
      {
        "id": "43"
      },
      {
        "id": "31"
      },
      {
        "id": "13"
      },
      {
        "id": "1"
      },
      {
        "id": "46"
      }
    ],
    weapon_rarity_attack_scaling: {
      "id": "2"
    }
  }

]

export const weaponTypesMock: WeaponType[] = [
  {
    "id": "22",
    "name": "Soaring Blades",
    "iname": {
      "ja": "デュアルブレード"
    },
    "classes": [
      {
        "id": "13"
      }
    ],
    "weapon_series": [
      {
        "id": "46"
      },
      {
        "id": "49"
      },
      {
        "id": "58"
      },
      {
        "id": "70"
      },
      {
        "id": "73"
      },
      {
        "id": "76"
      },
      {
        "id": "85"
      },
      {
        "id": "88"
      }
    ]
  },
]

export const classMocks: NGSClass[] =  [
  {
    "id": "8",
    "name": "Ranger",
    "stats": [
      {
        "level": 1,
        "hp": 240,
        "attack": 448,
        "defense": 300,
      },
      {
        "level": 2,
        "hp": 242,
        "attack": 457,
        "defense": 305,
      }
    ],
    "iname": {
      "ja": "レンジャー"
    },
    "weapon_types": [
      {
        "id": "25"
      },
      {
        "id": "28"
      }
    ]
  },
  {
    "id": "13",
    "name": "Bouncer",
    "stats": [
      {
        "level": 1,
        "hp": 275,
        "attack": 453,
        "defense": 299,
      },
      {
        "level": 2,
        "hp": 278,
        "attack": 462,
        "defense": 304,
      },
    ],
    "iname": {
      "ja": "バウンサー"
    },
    "weapon_types": [
      {
        "id": "22"
      },
      {
        "id": "46"
      }
    ]
  },
  {
    "id": "4",
    "name": "Hunter",
    "stats": [
      {
        "level": 1,
        "hp": 300,
        "attack": 450,
        "defense": 304,
      },
      {
        "level": 2,
        "hp": 303,
        "attack": 459,
        "defense": 309,
      },
    ],
    "iname": {
      "ja": "ハンター"
    },
    "weapon_types": [
      {
        "id": "1"
      },
      {
        "id": "4"
      },
      {
        "id": "7"
      }
    ]
  }
]

export const weaponRarityAttackScalingsMock: WeaponRarityAttackScaling[] = [
  {
    "id": "2",
    "rarity": 1,
    "attack": [
      {
        "level": 1,
        "value": 2
      },
      {
        "level": 2,
        "value": 4
      },
      {
        "level": 3,
        "value": 6
      },
      {
        "level": 4,
        "value": 8
      },
      {
        "level": 5,
        "value": 10
      },
      {
        "level": 6,
        "value": 12
      },
      {
        "level": 7,
        "value": 14
      },
      {
        "level": 8,
        "value": 16
      },
      {
        "level": 9,
        "value": 19
      },
      {
        "level": 10,
        "value": 22
      },
      {
        "level": 11,
        "value": 24
      },
      {
        "level": 12,
        "value": 26
      },
      {
        "level": 13,
        "value": 28
      },
      {
        "level": 14,
        "value": 30
      },
      {
        "level": 15,
        "value": 32
      },
      {
        "level": 16,
        "value": 34
      },
      {
        "level": 17,
        "value": 37
      },
      {
        "level": 18,
        "value": 40
      },
      {
        "level": 19,
        "value": 43
      },
      {
        "level": 20,
        "value": 46
      },
      {
        "level": 21,
        "value": 47
      },
      {
        "level": 22,
        "value": 48
      },
      {
        "level": 23,
        "value": 49
      },
      {
        "level": 24,
        "value": 51
      },
      {
        "level": 25,
        "value": 53
      },
      {
        "level": 26,
        "value": 55
      },
      {
        "level": 27,
        "value": 57
      },
      {
        "level": 28,
        "value": 59
      },
      {
        "level": 29,
        "value": 61
      },
      {
        "level": 30,
        "value": 63
      },
      {
        "level": 31,
        "value": 64
      },
      {
        "level": 32,
        "value": 66
      },
      {
        "level": 33,
        "value": 68
      },
      {
        "level": 34,
        "value": 70
      },
      {
        "level": 35,
        "value": 72
      },
      {
        "level": 36,
        "value": 74
      },
      {
        "level": 37,
        "value": 76
      },
      {
        "level": 38,
        "value": 78
      },
      {
        "level": 39,
        "value": 80
      },
      {
        "level": 40,
        "value": 82
      }
    ]
  },
]

export const conditionsMock: Condition[] = [

]

export const conditionCategoriesMock: ConditionCategory[] = [

]
