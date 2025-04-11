import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Frontend Mentor | Entertainment web app" },
    { name: "description", content: "Entertainment web app Home" },
  ];
}

export default function Home() {
  return <Welcome />;
}
