import React, { Component } from "react";
import NGSClassDisplay from "./NGSClassDisplay";
import { TFunction } from "i18next";
import WeaponDisplay from "./WeaponDisplay";
import { NGSClass, WeaponSeries } from "../helpers/HelperTypes";

type DamageSimProps = {
  apiData: any;
  locale: string;
  t: TFunction;
}

type DamageSimState = {
  ngsClass?: {
    current?: NGSClass,
    level?: number,
  },
  weapon?: {
    current?: WeaponSeries,
    level?: number,
  },
}

class DamageSim extends Component<DamageSimProps, DamageSimState> {
  constructor(props: DamageSimProps) {
    super(props);
    this.setState({

    })
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

  setWeapon = (weapon: WeaponSeries, level: number) => {
    this.setState({
      weapon: {
        current: weapon,
        level: level,
      }
    })
  }
}

export default DamageSim;