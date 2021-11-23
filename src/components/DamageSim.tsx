import React, { Component } from "react";
import NGSClassDisplay from "./NGSClassDisplay";
import { TFunction } from "i18next";
import WeaponDisplay from "./WeaponDisplay";
import { ArmorSet, NGSClass, WeaponSeries, WeaponType } from "../helpers/HelperTypes";
import ArmorDisplay from "./ArmorDisplay";

type DamageSimProps = {
  apiData: any
  locale: string
  t: TFunction
}

type DamageSimState = {
  ngsClass?: {
    current?: NGSClass
    level?: number
  } | null
  weapon?: {
    series?: WeaponSeries
    type?: WeaponType
    enhanceLevel?: number
    potLevel?: number
  } | null
  armor?: ArmorSet[]
}

class DamageSim extends Component<DamageSimProps, DamageSimState> {
  constructor(props: DamageSimProps) {
    super(props);
  }

  render() {
    return (
      <>
        <NGSClassDisplay locale={this.props.locale} t={this.props.t}
          startingClass={this.state?.ngsClass ? this.state.ngsClass : undefined}
          classes={this.props.apiData.classes}
          setClass={this.setClass}
        />
        {this.state?.ngsClass?.current ? 
          <WeaponDisplay locale={this.props.locale} t={this.props.t}
            startingWeapon={this.state.weapon}
            currentClass={this.state.ngsClass.current}
            weapons={this.props.apiData.weapons}
            weaponTypes={this.props.apiData.weaponTypes}
            weaponRarityAttackScalings={this.props.apiData.weaponRarityAttackScalings}
            conditions={this.props.apiData.conditions}
            setWeapon={this.setWeapon}
          />
        : null}
        <ArmorDisplay
          locale={this.props.locale}
          t={this.props.t}
          armors={this.props.apiData.armors}
          armorRarityScalings={this.props.apiData.armorRarityDefenseScalings}
          setArmor={this.setArmor}
        />
      </>
    )
  }

  setClass = (ngsClass: NGSClass, level: number) => {
    this.setState({
      ngsClass: {
        current: ngsClass,
        level: level,
      }
    })
  }

  setWeapon = (weapon: WeaponSeries | null, weaponType: WeaponType | null, enhanceLevel: number, potLevel: number) => {
    if (weapon && weaponType) {
      this.setState({
        weapon: {
          series: weapon,
          type: weaponType,
          enhanceLevel: enhanceLevel,
          potLevel: potLevel,
        }
      })
    } else {
      this.setState({
        weapon: null
      })
    }
  }

  setArmor = (armor: ArmorSet[]) => {
    this.setState({
      armor: armor
    })
  }
}

export default DamageSim;