import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Details from './Details'
import { BookmarkButton } from './BookmarkButton'

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
    <Card className="border-0 w-[360px] md:w-[440px] relative" id={imdbID}>
      <AspectRatio ratio={3 / 2}>
        <img
          src={poster}
          alt={title}
          className="w-full h-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80"
        />
        <BookmarkButton mediaId={imdbID} />
      </AspectRatio>
      <div className="absolute left-0 right-0 bottom-6 bg-zinc-600/50 border-rounded-lg p-2 pl-6">
        <Details type={type} year={year} rated={rated} title={title} />
      </div>
    </Card>
  )
}
