import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Details from './Details'

interface MediaCardProps {
  poster: string
  title: string
  type: string
  year: string
  imdbID: string
}
export default function MediaCard({
  poster,
  title,
  type,
  year,
  imdbID,
}: MediaCardProps) {
  return (
    <Card className="border-0">
      <AspectRatio ratio={16 / 9}>
        <img
          src={poster}
          alt={title}
          className="w-full h-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
        />
      </AspectRatio>
      <Details type={type} year={year} imdbID={imdbID} title={title} />
    </Card>
  )
}
