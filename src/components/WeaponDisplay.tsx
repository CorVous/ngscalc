import { TFunction } from "i18next";
import React, { Component } from "react";
import { Condition, ConditionCategory, NGSClass, WeaponRarityAttackScaling, WeaponSeries, WeaponType } from "../helpers/HelperTypes";

type WeaponDisplayProps = {
  locale: string,
  t: TFunction,
  startingWeapon?: {
    current?: WeaponSeries,
    level?: number,
  },
  currentClass: NGSClass,
  weapons: WeaponSeries[],
  weaponTypes: WeaponType[],
  conditionCategories: ConditionCategory[],
  conditions: Condition[],
  weaponRarityAttackScalings: WeaponRarityAttackScaling[],
  setWeapon: (weapon: WeaponSeries, level: number) => void,
}

type WeaponDisplayState = {
}

class WeaponDisplay extends Component<WeaponDisplayProps, WeaponDisplayState> {
  render() {
    return (
      <div>
        <h1>Weapon</h1>
      </div>
    )
  }
}

export default WeaponDisplay