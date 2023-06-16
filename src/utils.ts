import { Film, Season } from './interfaces'
import { MediaType } from './types'

/**
 * Combina dos valores de clase CSS en una sola cadena.
 * @param val1 - El primer valor de clase CSS.
 * @param val2 - (opcional) El segundo valor de clase CSS.
 * @returns La cadena resultante que combina los valores de clase CSS.
 */
export const mergeClassName = (val1: string, val2?: string): string => {
  return val1 + ' ' + (val2 || '')
}

/**
 * Formatea los datos de un objeto en un formato estandarizado de película.
 * @param obj - El objeto a formatear.
 * @param mediaType - (opcional) El tipo de medio (película, serie, etc.).
 * @returns Un objeto de película formateado.
 */
export const formatResult = (obj: any, mediaType?: MediaType): Film => {
  return {
    id: obj.id,
    title: obj.title || obj.name,
    description: obj.overview,
    coverPath: obj.backdrop_path,
    posterPath: obj.poster_path,
    genreIds: obj.genre_ids || obj.genres?.map((g: any) => g.id) || [],
    mediaType: mediaType || obj.media_type,
    seasons:
      obj.seasons?.map(
        (season: any) =>
          ({
            id: season.id,
            filmName: obj.title,
            name: season.name,
            posterPath: season.poster_path,
            seasonNumber: season.season_number,
            airDate: season.air_date,
            episodes: [],
          } as Season)
      ) || [],
  }
}

/**
 * Verifica si un objeto es del tipo "Film".
 * @param film - El objeto a verificar.
 * @returns `true` si el objeto es del tipo "Film", `false` de lo contrario.
 */
export const isFilm = (film: any): film is Film => {
  return <Film>film !== undefined
}

/**
 * Genera la URL de la imagen de una película o serie en TMDB.
 * @param path - La ruta de la imagen.
 * @returns La URL completa de la imagen.
 */
export const tmdbImageSrc = (path: string): string => {
  if (!path) return ''
  return `https://image.tmdb.org/t/p/original/${path}`
}

/**
 * Combina una lista de películas y series en una sola lista combinada, alternando entre ellas.
 * @param movies - La lista de películas.
 * @param tvs - La lista de series de televisión.
 * @param limit - (opcional) El límite de elementos en la lista combinada.
 * @returns Una lista combinada de películas y series alternadas.
 */
export const mergeFilms = (movies: Film[], tvs: Film[], limit = 6): Film[] => {
  const arrs: Film[] = []
  for (let i = 0; i < limit; i++) {
    let film: unknown
    if (i % 2 == 1) {
      if (tvs[i - 1]) {
        film = tvs[i - 1]
      }
    } else {
      if (movies[i - 1]) {
        film = tvs[i - 1]
      }
    }
    if (isFilm(film)) arrs.push(film)
  }
  return arrs
}

/**
 * Genera la URL de la miniatura de un video de YouTube.
 * @param key - La clave del video de YouTube.
 * @returns La URL completa de la miniatura.
 */
export const youtubeThumbnail = (key: string): string => {
  return `https://img.youtube.com/vi/${key}/mqdefault.jpg`
}

/**
 * Formatea una fecha en el formato "día/mes/año".
 * @param val - La fecha a formatear (en formato de cadena).
 * @returns La fecha formateada.
 */
export const formatDate = (val: string): string => {
  const d = new Date(val)
  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
}
