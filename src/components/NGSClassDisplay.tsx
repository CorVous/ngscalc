import React, { Component, ChangeEvent } from "react";

type NGSClassStats = {
    level: number,
    hp: number,
    attack: number,
    defense: number,
}

type NGSClass = {
  id: string,
  name: string,
  stats: NGSClassStats[],
}

type NGSClassDisplayProps = {
  classes: NGSClass[],
}

type NGSClassDisplayState = {
  selectingClass: boolean,
  currentClass: NGSClass,
  currentLevel: number | "",
  attack: number,
  defense: number,
  hp: number,
}

class NGSClassDisplay extends Component<NGSClassDisplayProps, NGSClassDisplayState> {
  constructor(props: NGSClassDisplayProps) {
    super(props);
    this.state = {
      currentClass: {id: "", name: "", stats: [{level: 0, hp: 0, attack: 0, defense: 0}]},
      selectingClass: false,
      currentLevel: 0,
      attack: 0,
      defense: 0,
      hp: 0,
    }
  }

  render() {
    return (
      <div className="class-display">
        <button name="current-class" onClick={() => this.setClassSelect(!this.state.selectingClass)}>{this.state.currentClass.id !== "" ? this.state.currentClass.name : "Class"}</button>
        <div className="class-display-selector">
          {this.state.selectingClass ? this.props.classes.map(nClass =>
            <button key={nClass.id} onClick={() => this.setClass(nClass)}>{nClass.name}</button>
          ) : null}
        </div>
        {this.state.currentClass.id !== "" ?
        <div className="class-display-stats">
          <label htmlFor="class-display-level" aria-labelledby="class-display-level">Level: </label> <input type="number" id="class-display-level" value={this.state.currentLevel} onChange={this.setLevel} />
          <div>HP: {this.state.hp !== 0 ? this.state.hp : "invalid"}</div>
          <div>Attack: {this.state.attack ? this.state.attack : "invalid"}</div>
          <div>Defense: {this.state.defense ? this.state.defense : "invalid"}</div>
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
    this.setStats(nClass, this.state.currentLevel || 1)
  }

  setLevel = (e:  React.ChangeEvent<HTMLInputElement>) => {
    let level = e.target.value

    if (level === "") {
      this.setState({
        currentLevel: "",
      })
      return
    } else if (Number(level) < 1) {
      level = "1"
      this.setState({
        currentLevel: 1,
      })
    } else {
      this.setState({
        currentLevel: Number(level),
      })
    }

    this.setStats(this.state.currentClass, Number(level))
  }

  setStats = (nClass: NGSClass, level: number) => {
    const maxLevel = Math.max.apply(Math, nClass.stats.map(function(o) { return o.level }))
    level = level > maxLevel ? maxLevel : level
    const statQuery: NGSClassStats | undefined = nClass.stats.find(x => x.level === level)
    const currentStats: NGSClassStats = statQuery ? statQuery : {level: 0, hp: 0, attack: 0, defense: 0}

    this.setState({
      currentLevel: level,
      attack: currentStats.attack,
      defense: currentStats.defense,
      hp: currentStats.hp,
    })
  }
}

export default NGSClassDisplay
export type { NGSClass, NGSClassStats }