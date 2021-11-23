import React from "react"
import { TFunction } from "i18next"
import { getLocalName, searchAllNames } from "../helpers/HelperFunctions"
import { Condition, EffectSet, NGSClass, WeaponRarityAttackScaling, WeaponSeries, WeaponType } from "../helpers/HelperTypes"
import EffectDisplay from "./EffectDisplay"

type WeaponDisplayProps = {
  locale: string
  t: TFunction
  startingWeapon?: {
    series?: WeaponSeries
    type?: WeaponType
    enhanceLevel?: number
    potLevel?: number
  } | null
  currentClass: NGSClass
  weapons: WeaponSeries[]
  weaponTypes: WeaponType[]
  conditions: Condition[]
  weaponRarityAttackScalings: WeaponRarityAttackScaling[]
  setWeapon: (weapon: WeaponSeries | null, weaponType: WeaponType | null, enhanceLevel: number, potLevel: number) => void
}

type WeaponDisplayState = {
  selectingWeapon: boolean
  weaponSearch: string
  currentSelectedWeaponSeries?: WeaponSeries | null
  currentSelectedWeaponType?: WeaponType | null
  currentWeaponSeries?: WeaponSeries | null
  currentWeaponType?: WeaponType | null
  currentEnhancementLevel: number | ""
  currentPotentialLevel: number | ""
}

type WeaponElement = {
  weaponSeries: WeaponSeries
  weaponType: WeaponType
}

class WeaponDisplay extends React.Component<WeaponDisplayProps, WeaponDisplayState> {
  constructor(props: WeaponDisplayProps) {
    super(props)

    this.state = {
      selectingWeapon: false,
      weaponSearch: "",
      currentEnhancementLevel: this.props.startingWeapon?.enhanceLevel ?? 0,
      currentPotentialLevel: this.props.startingWeapon?.potLevel ?? 0,
      currentSelectedWeaponSeries: this.props.startingWeapon?.series,
      currentSelectedWeaponType: this.props.startingWeapon?.type,
      currentWeaponSeries: this.props.startingWeapon?.series,
      currentWeaponType: this.props.startingWeapon?.type
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

  componentDidUpdate() {
    const classWeaponMismatch = this.props.currentClass.weapon_types.find(x => x.id == this.props.startingWeapon?.type?.id) === undefined
    if (this.props.startingWeapon?.type?.id && classWeaponMismatch) {
      this.setState({
        currentSelectedWeaponSeries: null,
        currentSelectedWeaponType: null,
        currentWeaponSeries: null,
        currentWeaponType: null,
        currentEnhancementLevel: 0,
        currentPotentialLevel: 0
      })
      this.props.setWeapon(null, null, 0, 0)
    }
  }

  render() {
    const classesWeapons = this.getClassesWeapons()
    let potentialLevel: number
    if (this.state.currentPotentialLevel == "") {
      potentialLevel = 1
    } else {
      potentialLevel = Number(this.state.currentPotentialLevel)
    }
    const currPotEffect: EffectSet | undefined = this.state.currentWeaponSeries?.weapon_potential.potential.find(x => x.level == potentialLevel)?.effect
    const currPotCEffect: EffectSet | undefined = this.state.currentWeaponSeries?.weapon_potential.potential.find(x => x.level == potentialLevel)?.conditional_effect ?? undefined
    let currCondition: Condition | undefined
    if (this.state.currentWeaponSeries?.weapon_potential?.condition){
      currCondition = this.props.conditions.find(x=> x.id === this.state.currentWeaponSeries?.weapon_potential?.condition.id)
    }

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
            if (this.state.weaponSearch == "" || searchAllNames(this.state.weaponSearch, x.weaponSeries.name, x.weaponSeries.iname)) {
              return (
                <div key={x.weaponSeries.id + "." + x.weaponType.id} onClick={() => this.selectWeapon(x.weaponSeries, x.weaponType)} style={{cursor: "pointer"}}>
                  <h2>{(this.state.currentSelectedWeaponSeries?.id === x.weaponSeries.id && this.state.currentSelectedWeaponType?.id === x.weaponType.id) ? "->" : ""}
                    {getLocalName(this.props.locale, x.weaponSeries.name, x.weaponSeries.iname)} {getLocalName(this.props.locale, x.weaponType.suffix, x.weaponType.isuffix)}</h2>
                  <div>{this.props.t("Rarity")}: {x.weaponSeries.weapon_rarity_attack_scaling.rarity }</div>
                  <div>{this.props.t("Attack")}: {x.weaponSeries.base_attack}</div>
                </div>
              )
            }
          })}
        </div>
        :null}
        {/* Weapon Details */}
        {this.state.currentWeaponSeries && this.state.currentWeaponType && !this.state.selectingWeapon ?
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
            {/* Potential Effect */}
            {this.state.currentPotentialLevel > 0 ?
              <div>
                {currPotEffect?
                  <EffectDisplay locale={this.props.locale} t={this.props.t}
                  effect={currPotEffect} />
                : null}
                <br />
                {currCondition && currPotCEffect !== null && currPotCEffect !== undefined?
                  <EffectDisplay locale={this.props.locale} t={this.props.t}
                    effect={currPotCEffect}
                    condition={currCondition}
                  />
                : null}
              </div>
            : null}
          </div>
        :null}
      </div>
    )
  }

  setWeaponSelect = (weaponSelection: boolean) => {
    this.setState({
      selectingWeapon: weaponSelection,
      currentSelectedWeaponSeries: this.state.currentWeaponSeries,
      currentSelectedWeaponType: this.state.currentWeaponType,
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
      this.props.setWeapon(this.state.currentSelectedWeaponSeries, this.state.currentSelectedWeaponType, this.state.currentEnhancementLevel || 0, this.state.currentPotentialLevel || 0)
    }
  }

  getWeaponAttackValue = (weaponSeries: WeaponSeries, enhanceLevel: number) => {
    const rarityScaling = this.props.weaponRarityAttackScalings.find(x => x.id === weaponSeries.weapon_rarity_attack_scaling.id)
    const rarityLevelScaling = rarityScaling?.attack.find(x => x.level === enhanceLevel)?.value ?? 0

    return weaponSeries.base_attack + Number(rarityLevelScaling)
  }

  enhancementLevelChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newEnhancementLevel: any = e.target.value
    
    if (e.target.value === "") {
      newEnhancementLevel = ""
    } else {
      newEnhancementLevel = Number(e.target.value)
    }

    if (this.state.currentWeaponSeries) {
      const weaponAttackScaling = this.props.weaponRarityAttackScalings.find(x => x.id === this.state.currentWeaponSeries?.weapon_rarity_attack_scaling.id)
      const maxLevel: number = Math.max.apply(Math, weaponAttackScaling?.attack.map(function(o) { return o.level }) || [])
      newEnhancementLevel = newEnhancementLevel > maxLevel ? maxLevel : newEnhancementLevel < 0 ? Math.abs(newEnhancementLevel) : newEnhancementLevel
      this.setState({
        currentEnhancementLevel: newEnhancementLevel,
      })
  
      if (this.state.currentWeaponSeries && this.state.currentWeaponType) {
        this.props.setWeapon(this.state.currentWeaponSeries, this.state.currentWeaponType, newEnhancementLevel, this.state.currentPotentialLevel || 0)
      }
    }
  }

  potentialLevelChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newPotLevel: any = e.target.value

    if (this.state.currentWeaponSeries) {
      if (newPotLevel !== "") {
        newPotLevel = Number(e.target.value)
        const maxLevel: number = Math.max.apply(Math, this.state.currentWeaponSeries.weapon_potential.potential.map(function(o) { return o.level }))
        newPotLevel = newPotLevel > maxLevel ? maxLevel : newPotLevel < 0 ? Math.abs(newPotLevel) : newPotLevel
        this.setState({
          currentPotentialLevel: newPotLevel,
        })
    
        if (this.state.currentWeaponSeries && this.state.currentWeaponType) {
          this.props.setWeapon(this.state.currentWeaponSeries, this.state.currentWeaponType, this.state.currentEnhancementLevel || 0, newPotLevel)
        }
      } else {
        this.setState({
          currentPotentialLevel: newPotLevel,
        })
    
        if (this.state.currentWeaponSeries && this.state.currentWeaponType) {
          this.props.setWeapon(this.state.currentWeaponSeries, this.state.currentWeaponType, this.state.currentEnhancementLevel || 0, 0)
        }
      }

    }
  }
}

export default WeaponDisplay