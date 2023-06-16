import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  getInTheaters,
  getPopulars,
  getTopRated,
  getTrailers,
  getTrendings,
} from '../api/tmdb-api'
import { Card } from '../components/card'
import { Section } from '../components/section'
import { Slider } from '../components/slider/slider'
import { TrailerModal } from '../components/trailer-modal'
import { TrendingHero } from '../components/trending-hero'
import { Film } from '../interfaces'
import { mergeFilms, tmdbImageSrc } from '../utils'

/**
 * Componente de la página principal que muestra los elementos más destacados, como películas populares, películas mejor calificadas, etc.
 */
export const Home = () => {
  const navigate = useNavigate()

  const [trendings, setTrendings] = useState<Film[]>([])
  const [inTheaters, setInTheaters] = useState<Film[]>([])
  const [populars, setPopulars] = useState<Film[]>([])
  const [topRatedTv, setTopRatedTv] = useState<Film[]>([])
  const [topRatedMovie, setTopRatedMovie] = useState<Film[]>([])

  const [trailerSrc, setTrailerSrc] = useState('')

  /**
   * Reproduce el tráiler de una película en el modal correspondiente.
   * @param film La película para reproducir el tráiler.
   */
  const playTrailer = async (film: Film) => {
    const trailers = await getTrailers(film.mediaType, film.id)

    setTrailerSrc(`https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`)
  }

  /**
   * Navega a la página de detalles de una película.
   * @param film La película para la cual se mostrarán los detalles.
   */
  const goToDetailPage = (film: Film) => {
    navigate(`/${film.mediaType}/${film.id}`)
  }

  /**
   * Obtiene las películas mejor calificadas en la categoría de películas.
   */
  const fetchTopRatedMovie = async () => {
    setTopRatedMovie((await getTopRated('movie')).films)
  }

  /**
   * Obtiene las películas mejor calificadas en la categoría de programas de televisión.
   */
  const fetchTopRatedTv = async () => {
    setTopRatedTv((await getTopRated('tv')).films)
  }

  /**
   * Obtiene las películas populares en las categorías de películas y programas de televisión y las fusiona en una sola lista.
   */
  const fetchPopulars = async () => {
    const movies = await getPopulars('movie')
    const tvs = await getPopulars('tv')

    setPopulars(mergeFilms(movies, tvs, 20))
  }

  /**
   * Obtiene las películas que están en los cines actualmente.
   */
  const fetchInTheaters = async () => {
    setInTheaters(await getInTheaters())
  }

  /**
   * Obtiene las películas y programas de televisión más populares en las categorías de películas y programas de televisión y las fusiona en una sola lista.
   */
  const fetchTrending = async () => {
    const movies = await getTrendings('movie')
    const tvs = await getTrendings('tv')

    setTrendings(mergeFilms(movies, tvs))
  }

  useEffect(() => {
    // Realiza las solicitudes de API necesarias cuando el componente se monta.
    fetchTrending()
    fetchInTheaters()
    fetchPopulars()
    fetchTopRatedTv()
    fetchTopRatedMovie()
  }, [])

  return (
    <>
      {/* Modal de tráiler */}
      <TrailerModal onHide={() => setTrailerSrc('')} src={trailerSrc} />

      {/* Sección de elementos más destacados */}
      <Section className="py-0" hidden={trendings.length === 0}>
        <Slider
          className="slick-hero"
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {(onSwipe) =>
            trendings.map((film, i) => (
              <TrendingHero
                onPlayTrailer={() => playTrailer(film)}
                onClick={() =>
                  !onSwipe ? navigate(`/${film.mediaType}/${film.id}`) : ''
                }
                film={film}
                key={i}
              />
            ))
          }
        </Slider>
      </Section>

      {/* Sección de películas en cines */}
      <Section title="In Theaters" hidden={inTheaters.length === 0}>
        <Slider isMovieCard={true}>
          {(_) =>
            inTheaters.map((film, i) => (
              <Card
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              />
            ))
          }
        </Slider>
      </Section>

      {/* Sección de películas populares */}
      <Section title="What's Popular" hidden={populars.length === 0}>
        <Slider isMovieCard={true}>
          {(_) =>
            populars.map((film, i) => (
              <Card
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              />
            ))
          }
        </Slider>
      </Section>

      {/* Sección de programas de televisión mejor calificados */}
      <Section
        title="Top Rated TV"
        hidden={topRatedTv.length === 0}
        onTitleClick={() => navigate(`/list/top-rated-tv`)}
      >
        <Slider isMovieCard={true}>
          {(_) =>
            topRatedTv.map((film, i) => (
              <Card
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              />
            ))
          }
        </Slider>
      </Section>

      {/* Sección de películas mejor calificadas */}
      <Section
        hidden={topRatedMovie.length === 0}
        title="Top Rated Movies"
        onTitleClick={() => navigate(`/list/top-rated-movies`)}
      >
        <Slider isMovieCard={true}>
          {(_) =>
            topRatedMovie.map((film, i) => (
              <Card
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
              />
            ))
          }
        </Slider>
      </Section>
    </>
  )
}

