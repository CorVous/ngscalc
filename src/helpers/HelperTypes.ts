export type NGSClassStats = {
  level: number,
  hp: number,
  attack: number,
  defense: number,
}

export type NGSClass = {
  id: string,
  name?: string,
  stats: NGSClassStats[],
  iname: any,
  weapon_types: any[], // WeaponType[]
}

export enum DamageType {
  melee,
  ranged,
  technique,
}

export type WeaponType = {
  id: string,
  name: string,
  iname: any,
  suffix: string,
  isuffix: any,
  damage_type: DamageType,
  classes: any[], // NGSClass[]
  weapon_series: any[], // WeaponSeries[]
}

export type WeaponPotential = {
  id: string,
  name: string,
  iname: any,
  description: string,
  idescription: any,
  potential: {
    level: number,
    effect: EffectSet,
    conditional_effect: EffectSet | null,
  }[],
  condition: any, // Condition
}

export type WeaponSeries = {
  id: string,
  name: string,
  iname: any,
  base_attack: number,
  attack: {
    level: number,
    value: number,
  }[],
  min_attack: number,
  max_attack: number,
  weapon_potential: WeaponPotential,
  weapon_types: any[], // WeaponType[]
  weapon_rarity_attack_scaling: any, // WeaponRarityAttackScaling[]
}

export type WeaponRarityAttackScaling = {
  id: string,
  rarity: number,
  attack: {
    level: number,
    value: number,
  }[],
}

export type EffectSet = {
  hp?: number | null,
  melee_potency?: number | null,
  technique_potency?: number | null,
  ranged_potency?: number | null,
  potency_floor?: number | null,
  pp?: number | null,
  damage_reduction?: number | null,
  physical_down_resist?: number | null,
  poison_resist?: number | null,
  panic_resist?: number | null,
  blind_resist?: number | null,
  shock_resist?: number | null,
  freeze_resist?: number | null,
  burn_resist?: number | null,
  pp_cost_down?: number | null,
  pp_natural_regen?: number | null,
  pp_active_regen?: number | null,
  critical_chance?: number | null,
  critical_damage?: number | null,
}

export type Condition = {
  id: string,
  name: string,
  description: string,
  iname: any,
  idescription: any,
  condition_categories: any[], // ConditionCategory[]
}

export type ConditionCategory = {
  id: string,
  name: string,
  description: string,
  iname: any,
  idescription: any,
  conditions: any[], // ConditionCategory[]
}

export type Armor = {
  id: string,
  name: string,
  iname: any,
  base_defense: number,
  stats: EffectSet,
  armor_rarity_defense_scaling: any, // ArmorRarityDefenseScaling[]
}

export type ArmorRarityDefenseScaling = {
  id: string,
  rarity: number,
  defense: {
    level: number,
    value: number,
  }[]
}

export type ArmorSet = {
  armor: Armor,
  enhanceLevel: number | "",
}