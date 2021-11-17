import React, { Component } from "react";
import NGSClassDisplay from "./NGSClassDisplay";
import { TFunction } from "i18next";
import WeaponDisplay from "./WeaponDisplay";
import { NGSClass, Weapon } from "../helpers/HelperTypes";

type DamageSimProps = {
  apiData: any;
  locale: string;
  t: TFunction;
}

type DamageSimState = {
  ngsClass?: {
    current?: NGSClass,
    level?: number | "",
  },
  weapon?: {
    current?: Weapon,
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
          classes={this.props.apiData.classes}
          startingClass={this.state && this.state.ngsClass ? this.state.ngsClass : undefined}
          setClass={this.setClass}
        />
        {this.state && this.state.ngsClass ? 
          <WeaponDisplay locale={this.props.locale} t={this.props.t} />
        : null}
      </>
    )
  }

  setClass = (ngsClass: NGSClass, level: number | "") => {
    this.setState({
      ngsClass: {
        current: ngsClass,
        level: level,
      }
    })
  }
}

export default DamageSim;