import { TFunction } from "i18next";
import React, { Component } from "react";
import { NGSClass, NGSClassStats } from "../helpers/HelperTypes"

type NGSClassDisplayProps = {
  locale: string,
  t: TFunction,
  classes: NGSClass[],
  startingClass?: {current?: NGSClass, level?: number},
  setClass: (nClass: NGSClass, level: number) => void,
}

type NGSClassDisplayState = {
  selectingClass: boolean,
  currentClass?: NGSClass,
  currentLevel: number | "",
}

class NGSClassDisplay extends Component<NGSClassDisplayProps, NGSClassDisplayState> {
  constructor(props: NGSClassDisplayProps) {
    super(props)
    this.state = {
      currentClass: this.props.startingClass?.current,
      currentLevel: this.props.startingClass?.level || 1,
      selectingClass: false,
    }
  }

  render() {
    // Collection of buttons for each class
    const ngsClassButtons = this.props.classes.map(nClass =>
      <button key={nClass.id} onClick={() => this.setClass(nClass)}>{nClass.iname[this.props.locale] || nClass.name}</button>
    )

    // Get class stats by using the currentClass and currentLevel if they are both set
    const statQuery: NGSClassStats | undefined = this.state.currentClass?.stats.find(x => x.level === this.state.currentLevel)
    const hp = statQuery ? statQuery.hp : this.props.t("invalid")
    const attack = statQuery ? statQuery.attack : this.props.t("invalid")
    const defense = statQuery ? statQuery.defense : this.props.t("invalid")

    // Set the class name to the current class's name if it exists
    let currentClassName = this.state.currentClass?.iname[this.props.locale] || this.state.currentClass?.name

    return (
      <div className="class-display">
        <button name="current-class" onClick={() => this.setClassSelect(!this.state.selectingClass)}>{currentClassName ? currentClassName : this.props.t("Class")}</button>
        <div className="class-display-selector">
          {this.state.selectingClass ? ngsClassButtons : null}
        </div>
        {this.state.currentClass ?
        <div className="class-display-stats">
          <label htmlFor="class-display-level" aria-labelledby="class-display-level">{this.props.t("Level")}: </label> <input type="number" id="class-display-level" value={this.state.currentLevel} onChange={this.setLevel} />
          <div data-testid="class-hp-value">{this.props.t("HP")}: {hp}</div>
          <div data-testid="class-attack-value">{this.props.t("Attack")}: {attack}</div>
          <div data-testid="class-defense-value">{this.props.t("Defense")}: {defense}</div>
        </div> 
        : null}
      </div>
    )
  }

  setClassSelect = (selectingClass: boolean) =>{
    this.setState({
      selectingClass: selectingClass,
    })
  }

  setClass = (nClass: NGSClass) => {
    this.setState({
      currentClass: nClass,
      selectingClass: false,
    })

    this.props.setClass(nClass, this.state.currentLevel || 1)
  }

  setLevel = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const level: string = e.target.value
    let currentLevel: number = Number(level)

    if (level === "") {
      this.setState({
        currentLevel: "",
      })
      return
    } else if (Number(level) < 1) {
      currentLevel = 1
    }
    
    if (this.state.currentClass) {
      const maxLevel: number = Math.max.apply(Math, this.state.currentClass.stats.map(function(o) { return o.level }))
      const verifiedLevel: number = currentLevel > maxLevel ? maxLevel : currentLevel
      this.setState({
        currentLevel: verifiedLevel,
      })
      this.props.setClass(this.state.currentClass, verifiedLevel)
    }
  }
}

export default NGSClassDisplay