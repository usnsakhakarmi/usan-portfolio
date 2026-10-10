import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-32">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-4 text-h1 font-semibold">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-prose text-muted">
        The link may be broken, or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-md bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
      >
        Back to home
      </Link>
    </Container>
  );
}
