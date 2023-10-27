import Link from "next/link";

export default function Home() {
  return (
    <div className="d-flex justify-content-center text-center align-items-middle w-100 h-100">
      <div className="m-auto">
        <Link href={{ pathname: "/Login", query: { user: "consumer" } }} className="btn btn-lg btn-outline-dark w-100 my-2 rounded-3">
          Consumer
        </Link>
        <Link href={{ pathname: "/Login", query: { user: "provider" } }} className="btn btn-lg btn-outline-dark w-100 my-2 rounded-3">
          Providers
        </Link>
      </div>
    </div>
  );
}
