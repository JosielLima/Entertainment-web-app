import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Details from './Details'

interface TrendingCardProps {
  poster: string
  title: string
  type: string
  year: string
  imdbID: string
  rated?: string
}
export default function TrendingCard({
  poster,
  title,
  type,
  year,
  imdbID,
  rated,
}: TrendingCardProps) {
  return (
    <Card className="border-0 min-w-[470px] relative" id={imdbID}>
      <AspectRatio ratio={3 / 2}>
        <img
          src={poster}
          alt={title}
          className="w-full h-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80"
        />
      </AspectRatio>
      <div className="absolute left-8 right-0 bottom-8 bg-zinc-600/50  border-rounded-lg p-2">
        <Details type={type} year={year} rated={rated} title={title} />
      </div>
    </Card>
  )
}
