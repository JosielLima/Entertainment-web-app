import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface MediaCardProps {

    poster: string;
    title: string;
    type: string;
    year: string;
    imdbID: string;
}
export default function MediaCard({poster, title, type, year, imdbID}: MediaCardProps) {
    return (
        <Card className="border-0 w-120">
            <img src={poster} alt={title} className="w-full h-80 rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square" />
            <div className="flex flex-row gap-1 opacity-50">
                <p>Type: {type}</p>
                <span>•</span>
                <p>Year: {year}</p>
                <span>•</span>
                <p>IMDB ID: {imdbID}</p>
            </div>
            <h2 className="text-lg font-bold">{title}</h2>
        </Card>
    )
}