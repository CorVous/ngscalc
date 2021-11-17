export type NGSClassStats = {
  level: number,
  hp: number,
  attack: number,
  defense: number,
}

export type NGSClass = {
  id: string,
  name: string,
  stats: NGSClassStats[],
  iname: {
    [key: string]: string,
  }
}

export type Weapon = {
  id: string,
}