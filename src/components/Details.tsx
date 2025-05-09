import iconMOvie from '../assets/icon-nav-movies.svg'

interface DetailsProps {
  type: string
  year: string
  imdbID: string
  title: string
}
export default function Details({ type, year, imdbID, title }: DetailsProps) {
  return (
    <div>
      <div className="flex flex-row gap-2 opacity-75 mb-2">
        <p>Year: {year}</p>
        <span>•</span>
        <span className="flex flex-row gap-1 align-center">
          <img src={iconMOvie} alt="movie" className="w-4 h-4" />
          <p> {type}</p>
        </span>
        <span>•</span>
        <p>IMDB ID: {imdbID}</p>
      </div>
      <h2 className="text-xl">{title}</h2>
    </div>
  )
}
