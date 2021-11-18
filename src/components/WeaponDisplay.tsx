import { TFunction } from "i18next";
import React, { Component } from "react";
import { getLocalName } from "../helpers/HelperFunctions";
import { NGSClass, WeaponRarityAttackScaling, WeaponSeries, WeaponType } from "../helpers/HelperTypes";

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
  weaponRarityAttackScalings: WeaponRarityAttackScaling[],
  setWeapon: (weapon: WeaponSeries, level: number) => void,
}

type WeaponDisplayState = {
  selectingWeapon: boolean,
  currentSelectedWeapon?: WeaponSeries,
  currentWeapon?: WeaponSeries,
  currentWeaponType?: WeaponType,
  currentEnhancementLevel?: number,
  currentPotentialLevel?: number,
}

type WeaponElement = {
  weapon: WeaponSeries,
  weaponType: WeaponType,
}

class WeaponDisplay extends Component<WeaponDisplayProps, WeaponDisplayState> {
  constructor(props: WeaponDisplayProps) {
    super(props);
    this.state = {
      selectingWeapon: false,
    }
  }

  getClassesWeapons = () => {
    let classesWeapons: WeaponElement[]  = [];

    // Select weapon series where the weapon type is in the current class
    // For each weapon series
    this.props.weapons.forEach(weapon => {
      // For each weapon type in current class
      this.props.currentClass.weapon_types.forEach(x=> {
        // If the weapon type is in the current class
        if (weapon.weapon_types.some(y => y.id === x.id)) {
          // Retrieve full WeaponType
          let weaponType = this.props.weaponTypes.find(y=> y.id === x.id)
          if (weaponType){
            let weaponElement: WeaponElement = {
              weapon: weapon,
              weaponType: weaponType,
            }
            classesWeapons.push(weaponElement)
          }
        }
      })
    })

    return classesWeapons
  }

  render() {
    const classesWeapons = this.getClassesWeapons()

    // console.log(selectableWeapons)
    return (
      <div>
        <h1>Weapon</h1>
        <div>
          <button onClick={() => this.setWeaponSelect(!this.state.selectingWeapon)} >{!this.state.selectingWeapon ? this.props.t("Select") : this.props.t("Cancel")}</button>
          {this.state.selectingWeapon ?
            <button>{this.props.t("Confirm")}</button> 
          :null}
        </div>
        {this.state.selectingWeapon ?
        <div id="weapon-selection">
          <input type="text" placeholder={this.props.t("Weapon Name")} />
          {
            classesWeapons.map(x => {
              return (
                <div key={x.weapon.id + "." + x.weaponType.id}>
                  <h2>{getLocalName(this.props.locale, x.weapon.name, x.weapon.iname)} {getLocalName(this.props.locale, x.weaponType.suffix, x.weaponType.isuffix)}</h2>
                </div>
              )
            })
          }
        </div>
        :null}
      </div>
    )
  }

  setWeaponSelect = (weaponSelection: boolean) => {
    this.setState({
      selectingWeapon: weaponSelection,
    })
  }

  selectWeapon = (weapon: WeaponSeries) => {
  }
}

export default WeaponDisplay