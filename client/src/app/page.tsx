"use client";

import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";

const RootPage = () => {
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
};

export default RootPage;
