import { TFunction } from "i18next";
import React, { Component } from "react";
import { getLocalName } from "../helpers/HelperFunctions";
import { NGSClass, WeaponRarityAttackScaling, WeaponSeries, WeaponType } from "../helpers/HelperTypes";

type WeaponDisplayProps = {
  locale: string,
  t: TFunction,
  startingWeapon?: {
    series?: WeaponSeries,
    type?: WeaponType,
    enhanceLevel?: number,
    potLevel?: number,
  },
  currentClass: NGSClass,
  weapons: WeaponSeries[],
  weaponTypes: WeaponType[],
  weaponRarityAttackScalings: WeaponRarityAttackScaling[],
  setWeapon: (weapon: WeaponSeries, weaponType: WeaponType, enhanceLevel: number, potLevel: number) => void,
}

type WeaponDisplayState = {
  selectingWeapon: boolean,
  weaponSearch: string,
  currentSelectedWeaponSeries?: WeaponSeries,
  currentSelectedWeaponType?: WeaponType,
  currentWeaponSeries?: WeaponSeries,
  currentWeaponType?: WeaponType,
  currentEnhancementLevel: number | "",
  currentPotentialLevel: number | "",
}

type WeaponElement = {
  weaponSeries: WeaponSeries,
  weaponType: WeaponType,
}

class WeaponDisplay extends Component<WeaponDisplayProps, WeaponDisplayState> {
  constructor(props: WeaponDisplayProps) {
    super(props);
    this.state = {
      selectingWeapon: false,
      weaponSearch: "",
      currentEnhancementLevel: 0,
      currentPotentialLevel: 1,
      currentSelectedWeaponSeries: this.props.startingWeapon?.series,
      currentSelectedWeaponType: this.props.startingWeapon?.type,
    }
  }

  getClassesWeapons = () => {
    let classesWeapons: WeaponElement[]  = [];

    // Select weapon series where the weapon type is in the current class
    // For each weapon series
    this.props.weapons.forEach(weaponSeries => {
      // For each weapon type in current class
      this.props.currentClass.weapon_types.forEach(x=> {
        // If the weapon type is in the current class
        if (weaponSeries.weapon_types.some(y => y.id === x.id)) {
          // Retrieve full WeaponType
          let weaponType = this.props.weaponTypes.find(y=> y.id === x.id)
          if (
            getLocalName(this.props.locale, weaponType?.name, weaponType?.iname).toLowerCase().includes(this.state.weaponSearch.toLowerCase()) ||
            getLocalName(this.props.locale, weaponSeries.name, weaponSeries.iname).toLowerCase().includes(this.state.weaponSearch.toLowerCase())
          ) {
            if (weaponType){
              let weaponElement: WeaponElement = {
                weaponSeries: weaponSeries,
                weaponType: weaponType,
              }
              classesWeapons.push(weaponElement)
            }
          }
        }
      })
    })

    return classesWeapons
  }

  render() {
    const classesWeapons = this.getClassesWeapons()
    return (
      <div>
        <h1>{this.props.t("Weapon")}</h1>
        <div>
          <button onClick={() => this.setWeaponSelect(!this.state.selectingWeapon)} >{!this.state.selectingWeapon ? this.props.t("Select") : this.props.t("Cancel")}</button>
          {this.state.selectingWeapon ?
            <button onClick={this.confirmWeapon}>{this.props.t("Confirm")}</button> 
          :null}
        </div>
        {/* Weapon Select */}
        {this.state.selectingWeapon ?
        <div id="weapon-selection">
          <input id="weapon-search" type="text" placeholder={this.props.t("Weapon Name")} value={this.state.weaponSearch} onChange={(e)=>this.setState({ weaponSearch: e.target.value })} />
          {classesWeapons.map(x => {
            return (
              <div key={x.weaponSeries.id + "." + x.weaponType.id} onClick={() => this.selectWeapon(x.weaponSeries, x.weaponType)} style={{cursor: "pointer"}}>
                <h2>{(this.state.currentSelectedWeaponSeries?.id === x.weaponSeries.id && this.state.currentSelectedWeaponType?.id === x.weaponType.id) ? "->" : ""}
                  {getLocalName(this.props.locale, x.weaponSeries.name, x.weaponSeries.iname)} {getLocalName(this.props.locale, x.weaponType.suffix, x.weaponType.isuffix)}</h2>
              </div>
            )
          })}
          <hr />
        </div>
        :null}
        {/* Weapon Details */}
        {this.state.currentWeaponSeries && this.state.currentWeaponType ?
          <div>
            <h2>
              <label htmlFor="weapon-enhancement-level">
                {getLocalName(this.props.locale,
                  this.state.currentWeaponSeries.name,
                  this.state.currentWeaponSeries.iname)}
                {' '}

                {getLocalName(this.props.locale,
                  this.state.currentWeaponType.suffix,
                  this.state.currentWeaponType.isuffix)}
                {/* Enhancement Level */}
               +</label><input id="weapon-enhancement-level" type="number" value={this.state.currentEnhancementLevel} onChange={this.enhancementLevelChanged} />
            </h2>
            <div>{this.props.t("Attack")}: <span data-testid="weapon-attack-value">
              {this.getWeaponAttackValue(this.state.currentWeaponSeries, Number(this.state.currentEnhancementLevel))}
            </span></div>
            <div>{this.props.t("Attack Range")}: <span data-testid="weapon-range-value">
              {this.state.currentWeaponSeries.min_attack * 100}% - {this.state.currentWeaponSeries.max_attack * 100}%
            </span></div>
            <div>
              <h3><span data-testid="weapon-potential-name">
                {getLocalName(this.props.locale,
                  this.state.currentWeaponSeries.weapon_potential.name,
                  this.state.currentWeaponSeries.weapon_potential.iname)}
              </span></h3>
              {/* Potential Level */}
              <label htmlFor="weapon-potential-level">Level </label><input id="weapon-potential-level" type="number" value={this.state.currentPotentialLevel} onChange={this.potentialLevelChanged} />
            </div>
            <div><span data-testid="weapon-potential-description">
              {getLocalName(this.props.locale,
                this.state.currentWeaponSeries.weapon_potential.description,
                this.state.currentWeaponSeries.weapon_potential.idescription)}
            </span></div>
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

  selectWeapon = (weaponSeries: WeaponSeries, weaponType: WeaponType) => {
    this.setState({
      currentSelectedWeaponSeries: weaponSeries,
      currentSelectedWeaponType: weaponType,
    })
  }

  confirmWeapon = () => {
    if (this.state.currentSelectedWeaponSeries && this.state.currentSelectedWeaponType) {
      this.setState({
        currentWeaponSeries: this.state.currentSelectedWeaponSeries,
        currentWeaponType: this.state.currentSelectedWeaponType,
        selectingWeapon: false,
      })
      this.props.setWeapon(this.state.currentSelectedWeaponSeries, this.state.currentSelectedWeaponType, this.state.currentEnhancementLevel || 0, this.state.currentPotentialLevel || 1)
    }
  }

  getWeaponAttackValue = (weaponSeries: WeaponSeries, enhanceLevel: number) => {
    const rarityScaling = this.props.weaponRarityAttackScalings.find(x => x.id === weaponSeries.weapon_rarity_attack_scaling.id)
    const weaponLevelScaling = weaponSeries.attack.find(x => x.level === enhanceLevel)?.value ?? 0
    const rarityLevelScaling = rarityScaling?.attack.find(x => x.level === enhanceLevel)?.value ?? 0

    return Number(weaponLevelScaling) + Number(rarityLevelScaling)
  }

  enhancementLevelChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newEnhancementLevel: any = e.target.value
    

    if (e.target.value === "") {
      newEnhancementLevel = ""
    } else {
      newEnhancementLevel = Number(e.target.value)
    }

    if (this.state.currentWeaponSeries) {
      const maxLevel: number = Math.max.apply(Math, this.state.currentWeaponSeries.attack.map(function(o) { return o.level }))
      newEnhancementLevel = newEnhancementLevel > maxLevel ? maxLevel : newEnhancementLevel < 0 ? 0 : newEnhancementLevel
      this.setState({
        currentEnhancementLevel: newEnhancementLevel,
      })
  
      if (this.state.currentWeaponSeries && this.state.currentWeaponType) {
        this.props.setWeapon(this.state.currentWeaponSeries, this.state.currentWeaponType, newEnhancementLevel, this.state.currentPotentialLevel || 1)
      }
    }
  }

  potentialLevelChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPotLevel: any = e.target.value

    if (e.target.value === "") {
      newPotLevel = ""
    } else {
      newPotLevel = Number(e.target.value)
    }

    if (this.state.currentWeaponSeries) {
      const maxLevel: number = Math.max.apply(Math, this.state.currentWeaponSeries.weapon_potential.potential.map(function(o) { return o.level }))
      newPotLevel = newPotLevel > maxLevel ? maxLevel : newPotLevel < 1 ? 1 : newPotLevel
      this.setState({
        currentPotentialLevel: newPotLevel,
      })
  
      if (this.state.currentWeaponSeries && this.state.currentWeaponType) {
        this.props.setWeapon(this.state.currentWeaponSeries, this.state.currentWeaponType, this.state.currentEnhancementLevel || 0, newPotLevel)
      }
    }
  }
}

export default WeaponDisplay