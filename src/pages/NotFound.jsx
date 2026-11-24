import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="py-12">
      <h1 className="font-display text-5xl text-ink">Nothing lurks here</h1>
      <p className="mt-3 text-mute">That page or monster doesn't exist. It may have been deleted.</p>
      <Link to="/bestiary" className="mt-4 inline-block text-ink underline">Go to the bestiary</Link>
    </section>
  );
}
