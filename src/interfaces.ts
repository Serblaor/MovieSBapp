import { ReactNode } from 'react'
import { MediaType } from './types'

/**
 * Propiedades de un componente personalizado.
 */
export interface CustomComponentProps {
  children?: ReactNode
  className?: string
}

/**
 * Representa un episodio de una serie de televisión.
 */
export interface Episode {
  id: number
  title: string
  overview: string
  airDate: string
  stillPath: string
  episodeNumber: number
}

/**
 * Representa una temporada de una serie de televisión.
 */
export interface Season {
  id: number
  filmName: string
  name: string
  seasonNumber: number
  posterPath: string
  episodes: Episode[]
  airDate: string
}

/**
 * Representa una película.
 */
export interface Film {
  id: number
  mediaType: MediaType
  title: string
  description: string
  posterPath: string
  coverPath: string
  genreIds: number[]
  seasons: Season[]
}

/**
 * Representa un miembro del elenco de una película o serie.
 */
export interface Cast {
  id: number
  name: string
  characterName: string
  profilePath: string
}

/**
 * Representa un tráiler de una película o serie.
 */
export interface Trailer {
  id: number
  key: string
}

/**
 * Representa un género de película o serie.
 */
export interface Genre {
  id: number
  name: string
}

