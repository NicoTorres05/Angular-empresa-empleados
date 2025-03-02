export interface Company {
  id: string,
  name: string,
  numEmpl: number,
  coords: {lat: number, lon: number },
  isActive: boolean
}
