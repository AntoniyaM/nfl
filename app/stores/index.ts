import type { Conference, Player, Team, Schedule } from '~~/types'

export const useStore = defineStore('main', () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl

  const getConferences = () => {
    return useQuery<Conference[]>({
      key: ['conferences'],
      query: () => fetch(`${baseUrl}/conferences`).then((res) => res.json()),
    })
  }

  const getTeams = () => {
    return useQuery<Team[]>({
      key: ['teams'],
      query: () => fetch(`${baseUrl}/teams`).then((res) => res.json()),
    })
  }

  const getTeamById = (id: string) => {
    return useQuery<Team>({
      key: ['teams', id],
      query: () => fetch(`${baseUrl}/teams/${id}`).then((res) => res.json()),
    })
  }

  const getTeamsByDivisionId = (divisionId: string) => {
    return useQuery<Team[]>({
      key: ['teams', divisionId],
      query: () => fetch(`${baseUrl}/teams/division/${divisionId}`).then((res) => res.json()),
    })
  }

  const getPlayers = () => {
    return useQuery<Player[]>({
      key: ['players'],
      query: () => fetch(`${baseUrl}/players`).then((res) => res.json()),
    })
  }

  const getPlayerById = (id: string) => {
    return useQuery<Player>({
      key: ['players', id],
      query: () => fetch(`${baseUrl}/players/${id}`).then((res) => res.json()),
    })
  }

  const getPlayersByTeamId = (teamId: string) => {
    return useQuery<Player[]>({
      key: ['players', teamId],
      query: () => fetch(`${baseUrl}/players/team/${teamId}`).then((res) => res.json()),
    })
  }

  const getSchedule = () => {
    return useQuery<Schedule>({
      key: ['schedule'],
      query: () => fetch(`${baseUrl}/schedule`).then((res) => res.json()),
    })
  }

  return {
    getConferences,
    getTeams,
    getTeamById,
    getTeamsByDivisionId,
    getPlayers,
    getPlayerById,
    getPlayersByTeamId,
    getSchedule,
  }
})
