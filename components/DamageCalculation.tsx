import React from "react";

const BASE_CRITICAL_DAMAGE : number = 1.2;
const BASE_CRITICAL_CHANCE : number = 0.05;

type DamageCalculationProps = {
  sourceAttack: number,
  weaponMinimumAttack: number,
  weaponMaximumAttack: number,
  targetDefense: number,
  powerMultiplier: number,
  criticalChance: number,
  criticalDamageMultiplier: number,
}

const DamageCalculation = (props: DamageCalculationProps) => {
  let weaponMinimumAttack = props.weaponMinimumAttack > props.weaponMaximumAttack ? props.weaponMaximumAttack : props.weaponMinimumAttack

  const minimumDamage = calculateMinimumDamage(props.sourceAttack, weaponMinimumAttack, props.targetDefense, props.powerMultiplier)
  const maximumDamage = calculateMaximumDamage(props.sourceAttack, props.weaponMaximumAttack, props.targetDefense, props.powerMultiplier)
  const criticalDamage = calculateCriticalDamage(props.sourceAttack, props.weaponMaximumAttack, props.targetDefense, props.powerMultiplier, props.criticalDamageMultiplier)
  const averageDamage = calculateAverageDamage(minimumDamage, maximumDamage, props.criticalChance, criticalDamage)

  return (
    <div className="d-calc">
      <h1>Damage Calculation</h1>
      <div data-testid="minimum-damage">Minimum Damage: {Math.round(minimumDamage)}</div>
      <div data-testid="maximum-damage">Maximum Damage: {Math.round(maximumDamage)}</div>
      <div data-testid="critical-damage">Critical Damage: {Math.round(criticalDamage)}</div>
      <div data-testid="average-damage">Average Damage: {Math.round(averageDamage * 10000) / 10000}</div>
    </div>
  )
}

// Minimum and Maximum damage uses the NGS damage formula
function calculateMinimumDamage(sourceAttack: number, weaponMinimumAttack: number, targetDefense: number, powerMultiplier: number) {
  const damage = ((sourceAttack + weaponMinimumAttack - targetDefense) * powerMultiplier)/5
  return damage > 1 ? damage : 1
}

function calculateMaximumDamage(sourceAttack: number, weaponMaximumAttack: number, targetDefense: number, powerMultiplier: number) {
  const damage = ((sourceAttack + weaponMaximumAttack - targetDefense) * powerMultiplier)/5
  return damage > 1 ? damage : 1
}

// Critical Damage always uses maximum damage
function calculateCriticalDamage(sourceAttack: number, weaponMaximumAttack: number, targetDefense: number, powerMultiplier: number, criticalDamageMultiplier: number ) {
  const damage = ((sourceAttack + weaponMaximumAttack - targetDefense) * BASE_CRITICAL_DAMAGE * criticalDamageMultiplier * powerMultiplier)/5
  return damage > 1 ? damage : 1
}

function calculateAverageDamage(minimumDamage: number, maximumDamage: number, criticalChance: number, criticalDamage: number) {
  let average : number
  const noncritChance = 1 - criticalChance - BASE_CRITICAL_CHANCE
  if (Math.round(minimumDamage) === Math.round(maximumDamage)) {
    average = noncritChance * Math.round(minimumDamage) + (criticalChance + BASE_CRITICAL_CHANCE) * Math.round(criticalDamage)
  } else {
    /*
    * Because NGS rounds each instance of damage to a whole number AFTER calculating the damage itself we need to calculate the 
    * chance of the minimum and maximum damage being done. This complicates the entire formula.
    */

    // Get the total range of values between the minimum and maximum damage
    const minmaxRange = maximumDamage - minimumDamage
    // Get the range of values where it calculates to the max damage
    const maxValueRange = maximumDamage - Math.round(maximumDamage) + 0.5
    // Get the range of values where it calculates to the min damage
    const minValueRange = Math.round(minimumDamage) - minimumDamage + 0.5
    // Get the range of values where it caculates the average damage between the min and max damage rounded down
    const midRange = minmaxRange - minValueRange - maxValueRange
    // Calculate the chance of the minimum damage happening
    const minChance = (minValueRange / minmaxRange) * noncritChance
    // Calculate the chance of the maximum damage happening
    const maxChance = (maxValueRange / minmaxRange) * noncritChance
    // Calculate the chance of the average damage happening
    const midRangeChance = (midRange / minmaxRange) * noncritChance
    // Calculate the average damage between the rounded minimum and maximum damage
    const midDamageAverage = (Math.round(minimumDamage + 1) + Math.round(maximumDamage - 1)) / 2
    // Average damage calculation (Average damage of the portion * chance of it happening) + the other portions
    average = Math.round(minimumDamage) * minChance + 
      Math.round(maximumDamage) * maxChance +
      midDamageAverage * midRangeChance +
      (criticalChance + BASE_CRITICAL_CHANCE) * Math.round(criticalDamage)
  }

  // Display the average damage rounded to the nearest thousandth
  return Math.round(average * 10000) / 10000;
}

export default DamageCalculation