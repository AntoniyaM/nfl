export interface Conference {
  id: string
  name: string
  abbreviation: string
  divisions: Record<string, string>[]
}

export interface Team {
  id: string
  abbreviation: string
  color: string
  conference: string
  division: string
  established: number
  headCoach: string
  location: string
  logoUrl: string
  name: string
  owners: string[]
  seasonSummary: string
  standingSummary: string
  websiteUrl: string
}

export interface Player {
  id: string
  firstName: string
  lastName: string
  fullName: string
  age: number
  birthPlace: {
    city: string
    state: string
    country: string
  }
  dateOfBirth: string
  displayHeight: string
  displayWeight: string
  experience: {
    years: number
  }
  headshot: {
    alt: string
    href: string
  }
  height: number
  jersey: string
  position: {
    name: string
    type: string
  }
  slug: string
  status: string
  team: string
  weight: number
}

export type PositionType = {
  id: string
  name: string
}

export interface Competitor {
  winner: boolean | null
  score: number
  teamLogo: {
    alt: string
    url: string
  }
}

export interface Game {
  date: string
  name: string
  completed: boolean
  id: number
  competitors: Competitor[]
}

export interface Schedule {
  season: number
  week: number
  events: Game[]
}

