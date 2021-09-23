import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="main">
      <Link href="/blob">
        <a>Blob Example</a>
      </Link>
    </div>
  );
}
