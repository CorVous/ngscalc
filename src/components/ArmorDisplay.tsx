import React from 'react'
import { TFunction } from "i18next"
import { getLocalName, searchAllNames } from "../helpers/HelperFunctions"
import { ArmorSet, Armor, ArmorRarityDefenseScaling } from "../helpers/HelperTypes"
import EffectDisplay from "./EffectDisplay"

type ArmorDisplayProps = {
  t: TFunction
  locale: string
  setArmor: (armor: ArmorSet[]) => void
  armors: Armor[]
  armorRarityScalings: ArmorRarityDefenseScaling[]
  armor?: ArmorSet[]
}

type ArmorDisplayState = {
  selectingArmor: boolean
  currentSelectedArmor: ArmorSet[]
  currentArmor: ArmorSet[]
  armorSearch: string
}

class ArmorDisplay extends React.Component<ArmorDisplayProps, ArmorDisplayState> {
  constructor(props: ArmorDisplayProps) {
    super(props)
    this.state = {
      selectingArmor: false,
      currentArmor: props.armor ? props.armor : [],
      currentSelectedArmor: [],
      armorSearch: "",
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.t("Armor")}</h1>
        <div>
          <button onClick={() => this.setArmorSelect(!this.state.selectingArmor)} >{!this.state.selectingArmor ? this.props.t("Select") : this.props.t("Cancel")}</button>
          {this.state.selectingArmor ?
            <button onClick={this.confirmArmor}>{this.props.t("Confirm")}</button> 
          :null}
          {/* Currently Selected Armor */}
          {this.state.currentSelectedArmor.length > 0 && this.state.selectingArmor?
            <div>
              {this.state.currentSelectedArmor.map((armorSet, index) => {
                return (
                  <div key={index}>
                    <h3>
                      <span onClick={() => this.removeSelectedArmor(index)} style={{cursor: "pointer"}}>[x]</span>
                      {armorSet.armor.name} {armorSet.enhanceLevel > 0 ? "+" + armorSet.enhanceLevel : "" }
                    </h3>
                  </div>
                )
              })}
            </div>
          : null}
        </div>
        {/* Armor Selection */}
        {this.state.selectingArmor ?
          <div id="armor-selection">
            <input id="weapon-search" type="text" placeholder={this.props.t("Armor Name")} value={this.state.armorSearch} onChange={(e)=>this.setState({ armorSearch: e.target.value })} />
            {this.props.armors.map((armor, index) => {
              let numberSelected = 0
              this.state.currentSelectedArmor.forEach(armorSet => {
                if (armorSet.armor.id === armor.id) {
                  numberSelected++
                }
              })

              if (this.state.armorSearch == "" || searchAllNames(this.state.armorSearch, armor.name, armor.iname)) {
                return (
                  <div key={index} style={{cursor: "pointer"}} onClick={() => this.selectArmor(armor)}>
                    <h2>{getLocalName(this.props.locale, armor.name, armor.iname)} {numberSelected !== 0 ? "x" + numberSelected : ""}</h2>
                    <div>{this.props.t("Rarity")}: {armor.armor_rarity_defense_scaling.rarity}</div>
                    <div>{this.props.t("Defense")}: {armor.base_defense}</div>
                    <EffectDisplay locale={this.props.locale} t={this.props.t}
                      effect={armor.stats}
                    />
                  </div>
                )
              }
            })}
          </div>
        : null}
        {/* Current Armor */}
        {this.state.currentArmor.length > 0 && !this.state.selectingArmor ?
          <div>
            {
              this.state.currentArmor.map((armorSet, index) => {
                return (
                  <div key={index}>
                    <h2>
                      <span onClick={() => this.removeCurrentArmor(index)} style={{cursor: "pointer"}}>[x]</span>
                      <label htmlFor={"armor-display-" + armorSet.armor.name + "-" +index}>{getLocalName(this.props.locale, armorSet.armor.name, armorSet.armor.iname)} +</label><input id={"armor-display-" + armorSet.armor.name + "-" +index} type="number" value={armorSet.enhanceLevel} onChange={(e) => this.setEnhanceLevel(index, e.target.value)}/>
                    </h2>
                    <div>{this.props.t("Rarity")}: {armorSet.armor.armor_rarity_defense_scaling.rarity}</div>
                    <div>{this.props.t("Defense")}: <span data-testid="armor-defense-value">{this.getDefense(armorSet)}</span></div>
                    <EffectDisplay locale={this.props.locale} t={this.props.t}
                      effect={armorSet.armor.stats}
                    />
                  </div>
                )
              })
            }
          </div>
        : null}
      </div>
    )
  }

  setArmorSelect = (selectingArmor: boolean) => {
    this.setState({
      selectingArmor: selectingArmor,
      currentSelectedArmor: this.state.currentArmor,
    })
  }

  selectArmor = (armor: Armor) => {
    if (this.state.currentSelectedArmor.length < 3) {
      this.setState({
        currentSelectedArmor: [...this.state.currentSelectedArmor, {
          armor: armor,
          enhanceLevel: 0,
        }]
      })
    }
  }

  confirmArmor = () => {
    this.setState({
      selectingArmor: false,
      currentArmor: this.state.currentSelectedArmor,
    })
  }

  removeSelectedArmor = (index: number) => {
    this.setState({
      currentSelectedArmor: this.state.currentSelectedArmor.filter((armor, armorIndex) => armorIndex !== index)
    })
  }

  removeCurrentArmor = (index: number) => {
    this.setState({
      currentArmor: this.state.currentArmor.filter((armor, armorIndex) => armorIndex !== index)
    })
  }

  getDefense = (armorSet: ArmorSet) => {
    const thisScaling = this.props.armorRarityScalings.find(armorRarityScaling => armorRarityScaling.id === armorSet.armor.armor_rarity_defense_scaling.id)
    const scalingDefense = Number(thisScaling?.defense.find(defense => defense.level === armorSet.enhanceLevel)?.value)
    const currentDefense = armorSet.armor.base_defense + (scalingDefense || 0)
    return currentDefense
  }

  setEnhanceLevel = (index: number, value: string) => {
    const currentArmor = this.state.currentArmor
    if (value === "") {
      currentArmor[index].enhanceLevel = ""
    } else {
      const thisScaling = this.props.armorRarityScalings.find(armorRarityScaling => armorRarityScaling.id === currentArmor[index].armor.armor_rarity_defense_scaling.id)
      const maxLevel = Math.max.apply(Math, thisScaling?.defense.map(function(o) { return o.level }) ?? [])
      const newEnhancementLevel = Number(value) > maxLevel ? maxLevel : Number(value) < 0 ? Math.abs(Number(value)) : Number(value)
      currentArmor[index].enhanceLevel = newEnhancementLevel
    }
    this.setState({
      currentArmor: currentArmor,
    })
    this.props.setArmor(currentArmor)
  }
}

export default ArmorDisplay
