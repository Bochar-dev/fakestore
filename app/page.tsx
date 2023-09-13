import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <div className="center">
        <h1>Fake Store API</h1>
        <Link target="_blank" href="https://github.com/Bochar-dev/fakestore">
          Ссылка на репозиторий
        </Link>
      </div>
    </div>
  );
}
