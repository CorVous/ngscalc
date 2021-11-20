import React, { Component } from "react";
import NGSClassDisplay from "./NGSClassDisplay";
import { TFunction } from "i18next";
import WeaponDisplay from "./WeaponDisplay";
import { NGSClass, WeaponSeries, WeaponType } from "../helpers/HelperTypes";

type DamageSimProps = {
  apiData: any
  locale: string
  t: TFunction
}

type DamageSimState = {
  ngsClass?: {
    current?: NGSClass
    level?: number
  }
  weapon?: {
    series?: WeaponSeries
    type?: WeaponType
    enhanceLevel?: number
    potLevel?: number
  }
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
            startingWeapon={this.state?.weapon ? this.state.weapon : undefined}
            currentClass={this.state.ngsClass.current}
            weapons={this.props.apiData.weapons}
            weaponTypes={this.props.apiData.weaponTypes}
            weaponRarityAttackScalings={this.props.apiData.weaponRarityAttackScalings}
            conditions={this.props.apiData.conditions}
            setWeapon={this.setWeapon}
          />
        : null}
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

  setWeapon = (weapon: WeaponSeries, weaponType: WeaponType, enhanceLevel: number, potLevel: number) => {
    this.setState({
      weapon: {
        series: weapon,
        type: weaponType,
        enhanceLevel: enhanceLevel,
        potLevel: potLevel,
      }
    })
  }
}

export default DamageSim;