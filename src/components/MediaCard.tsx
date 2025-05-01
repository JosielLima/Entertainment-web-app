import {
  Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface MediaCardProps {

    poster: string;
    title: string;
    type: string;
    year: string;
    imdbID: string;
}
export default function MediaCard({poster, title, type, year, imdbID}: MediaCardProps) {
    return (
        <Card className="border-0">
            <AspectRatio ratio={16 / 9}>
                <img src={poster} alt={title} className="w-full h-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square" />
            </AspectRatio>
            <div className="flex flex-row gap-2 opacity-75">
                <p>Type: {type}</p>
                <span>•</span>
                <p>Year: {year}</p>
                <span>•</span>
                <p>IMDB ID: {imdbID}</p>
            </div>
            <h2 className="text-xl">{title}</h2>
        </Card>
    )
}