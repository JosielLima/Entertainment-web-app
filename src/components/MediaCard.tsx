import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Details from './Details'
import { BookmarkButton } from './BookmarkButton'

interface MediaCardProps {
  poster: string
  title: string
  type: string
  year: string
  imdbID: string
  rated?: string
}

export default function MediaCard({
  poster,
  title,
  type,
  year,
  imdbID,
  rated,
}: MediaCardProps) {
  return (
    <Card className="border-0 relative max-w-md" id={imdbID}>
      <AspectRatio ratio={16 / 9}>
        <img
          src={poster}
          alt={title}
          className="w-full h-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
        />
        <BookmarkButton mediaId={imdbID} />
      </AspectRatio>
      <Details type={type} year={year} rated={rated} title={title} />
    </Card>
  )
}
