export interface IOffice {
  title: string
  description: string
  geos: object
  status: object
  priority: number
  order: number
  active: boolean
  time_cards: {
    time_start: string
    time_end: string
  }
  created_at: Date
  updated_at: Date
}
