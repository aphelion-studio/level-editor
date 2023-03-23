export type Orbit = {
  x: number
  y: number
  a: number
  b: number
  speed: number
  direction: 'clockwise' | 'counterclockwise'
  t: number
}

export type Planet = {
  owner: number
  radius: number
  moons: number
  spawndelay: number
  orbit: Orbit
}

export type Sun = {
  x: number
  y: number
  radius: number
}

export type Level = {
  planets: Planet[]
  suns: Sun[]
}
