import React from "react";
import Image from "next/image"
import { Condition, EffectSet } from "../helpers/HelperTypes";
import { TFunction } from "i18next";
import { getLocalName } from "../helpers/HelperFunctions";

type EffectDisplayProps = {
  locale: string
  t: TFunction
  effect: EffectSet
  condition?: Condition
}

class EffectDisplay extends React.Component<EffectDisplayProps> {
  render() {
    let tripot: number | undefined
    if (this.props.effect?.melee_potency && this.props.effect?.ranged_potency && this.props.effect?.technique_potency && 
      this.props.effect.melee_potency === this.props.effect.ranged_potency && this.props.effect.melee_potency === this.props.effect.technique_potency) {
      tripot = this.props.effect.melee_potency
    }

    return(
      <div className="effect">
        {this.props.condition ?
          <details>
            <summary style={{cursor: "pointer", fontWeight: "bold"}}>If <span data-testid="effect-condition">{getLocalName(this.props.locale, this.props.condition.name, this.props.condition.iname)}</span></summary>
            <span data-testid="effect-condition-description">{getLocalName(this.props.locale, this.props.condition.description, this.props.condition.idescription)}</span>
            <hr />
          </details>
        : null}
        {/* Potency */}
        {tripot?
          <div>
            <Image priority={true} src="/icons/tripot.png" alt="effect-tri-potency" width="40" height="20" />
            <span data-testid="effect-tri-potency">
              {this.displayPercent(tripot)}
            </span>
          </div>
        :
          <>
            {this.displayImageStat(this.props.effect.melee_potency, "effect-melee-potency", "/icons/dmg_melee.png")}
            {this.displayImageStat(this.props.effect.ranged_potency, "effect-ranged-potency", "/icons/dmg_ranged.png")}
            {this.displayImageStat(this.props.effect.technique_potency, "effect-technique-potency", "/icons/dmg_tech.png")}
          </>
        }
        {/* Critical */}
        {this.displayBasicStat(this.props.effect.critical_chance, "effect-critical-chance", this.props.t("Critical Chance"))}
        {this.displayBasicStat(this.props.effect.critical_damage, "effect-critical-damage", this.props.t("Critical Damage"))}
        {/* HP & PP */}
        {this.displayBasicStat(this.props.effect.hp, "effect-hp", this.props.t("HP"), false)}
        {this.displayBasicStat(this.props.effect.damage_reduction, "effect-damage-reduction", this.props.t("Damage Reduction"))}
        {this.displayBasicStat(this.props.effect.pp, "effect-pp", this.props.t("PP"), false)}
        {this.displayBasicStat(this.props.effect.pp_cost_down, "effect-pp-cost-down", this.props.t("PP Cost Reduction"))}
        {this.displayBasicStat(this.props.effect.pp_natural_regen, "effect-pp-natural-regen", this.props.t("Natural PP Regeneration"))}
        {this.displayBasicStat(this.props.effect.pp_active_regen, "effect-pp-active-regen", this.props.t("Active PP Regeneration"))}
        {/* Status */}
        {this.displayImageStat(this.props.effect.poison_resist, "effect-poison-resist", "/icons/status_poison.png")}
        {this.displayImageStat(this.props.effect.shock_resist, "effect-shock-resist", "/icons/status_shock.png")}
        {this.displayImageStat(this.props.effect.freeze_resist, "effect-freeze-resist", "/icons/status_freeze.png")}
        {this.displayImageStat(this.props.effect.blind_resist, "effect-blind-resist", "/icons/status_blind.png")}
        {this.displayImageStat(this.props.effect.burn_resist, "effect-burn-resist", "/icons/status_burn.png")}
        {this.displayImageStat(this.props.effect.panic_resist, "effect-panic-resist", "/icons/status_panic.png")}
        {this.displayImageStat(this.props.effect.physical_down_resist, "effect-physical-down-resist", "/icons/status_physical_down.png")}
      </div>
    )
  }

  displayPositiveSign = (num: number) => {
    return num > 0 ? "+" : ""
  }

  displayPercent = (num: number) => {
    return this.displayPositiveSign(num) + this.round(num * 100) + "%"
  }

  displayImageStat = (num: number | null | undefined, testid: string, image: string, percentage: boolean = true) => {
    if (num) {
      return (
        <div>
          <Image priority={true} alt={testid} src={image} width="20" height="20" />
          <span data-testid={testid}>
            {percentage ? this.displayPercent(num) : this.displayPositiveSign(this.round(num)) + this.round(num)}
          </span>
        </div>
      )
    } else {
      return null
    }
  }

  displayBasicStat = (num: number | null | undefined, testid: string, name: string, percentage: boolean = true) => {
    if (num) {
      return (
        <div>
          {name}{" "}
          <span data-testid={testid}>
            {percentage ? this.displayPercent(num) : this.displayPositiveSign(this.round(num)) + this.round(num)}
          </span>
        </div>
      )
    } else {
      return null
    }
  }

  round = (num: number) => {
    return Math.round(num * 1000000) / 1000000
  }
}

export default EffectDisplay