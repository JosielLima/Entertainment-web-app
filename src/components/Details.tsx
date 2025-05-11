import iconMovie from '../assets/icon-nav-movies.svg'

interface DetailsProps {
  type: string
  year: string
  title: string
  rated?: string
}
export default function Details({ type, year, rated, title }: DetailsProps) {
  return (
    <div>
      <div className="flex flex-row gap-2 opacity-75 mb-2 items-center">
        <p>{year}</p>
        <span>•</span>
        <img src={iconMovie} alt="movie" className="w-4 h-4" />
        <p> {type}</p>
        <span>•</span>
        <p>{rated}</p>
      </div>
      <h2 className="text-xl">{title}</h2>
    </div>
  )
}
