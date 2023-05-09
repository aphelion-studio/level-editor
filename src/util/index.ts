import type { Orbit, Planet, Sun } from '../types'

export const templatePlanet = (): Planet => ({
  owner: 0,
  radius: 20,
  moons: 0,
  spawndelay: 3,
  orbit: {
    x: 0,
    y: 0,
    a: 100,
    b: 100,
    speed: 0.04,
    direction: 'clockwise',
    progress: 0,
  },
})

export const templateSun = (): Sun => ({
  x: 0,
  y: 0,
  radius: 70,
})

const extractSegNumT = (progress: number): [segNum: number, t: number] => [
  progress === 1 ? 0 : Math.floor(progress / 0.25),
  (progress / 0.25) % 1,
]

export const cubicBezierX = (orbit: Orbit, time: number) => {
  const [segNum, t] = extractSegNumT((orbit.progress + (orbit.speed * time) / 4) % 1)
  const a1x = segNum === 0 ? orbit.x - orbit.a : segNum === 2 ? orbit.x + orbit.a : orbit.x
  const c1x = segNum === 1 ? orbit.x + orbit.a * 0.6 : segNum === 3 ? orbit.x - orbit.a * 0.6 : a1x
  const a2x = segNum === 1 ? orbit.x + orbit.a : segNum === 3 ? orbit.x - orbit.a : orbit.x
  const c2x = segNum === 0 ? orbit.x - orbit.a * 0.6 : segNum === 2 ? orbit.x + orbit.a * 0.6 : a2x
  return (
    a1x * Math.pow(1 - t, 3) +
    c1x * 3 * t * Math.pow(1 - t, 2) +
    c2x * 3 * Math.pow(t, 2) * (1 - t) +
    a2x * Math.pow(t, 3)
  )
}

export const cubicBezierY = (orbit: Orbit, time: number) => {
  const [segNum, t] = extractSegNumT((orbit.progress + (orbit.speed * time) / 4) % 1)
  const a1y = segNum === 1 ? orbit.y + orbit.b : segNum === 3 ? orbit.y - orbit.b : orbit.y
  const c1y = segNum === 0 ? orbit.y + orbit.b * 0.6 : segNum === 2 ? orbit.y - orbit.b * 0.6 : a1y
  const a2y = segNum === 0 ? orbit.y + orbit.b : segNum === 2 ? orbit.y - orbit.b : orbit.y
  const c2y = segNum === 1 ? orbit.y + orbit.b * 0.6 : segNum === 3 ? orbit.y - orbit.b * 0.6 : a2y
  return (
    a1y * Math.pow(1 - t, 3) +
    c1y * 3 * t * Math.pow(1 - t, 2) +
    c2y * 3 * Math.pow(t, 2) * (1 - t) +
    a2y * Math.pow(t, 3)
  )
}

export const playerColor = (player: number) => {
  switch (player) {
    case 0:
      return 'lightgray'
    case 1:
      return 'blue'
    case 2:
      return 'red'
    default:
      return 'black'
  }
}
