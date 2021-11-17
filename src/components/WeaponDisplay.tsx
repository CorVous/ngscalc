import { TFunction } from "i18next";
import React, { Component } from "react";

type WeaponDisplayProps = {
  locale: string,
  t: TFunction,
}

type WeaponDisplayState = {
}

class WeaponDisplay extends Component<WeaponDisplayProps, WeaponDisplayState> {
  render() {
    return (
      <div>
        <h1>Weapon</h1>
      </div>
    )
  }
}

export default WeaponDisplay