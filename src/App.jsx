import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* The signature red band that runs behind the card */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[min(28rem,45vw)] -translate-x-1/2 bg-blood-deep md:block" />
      <div className="relative min-h-screen w-full bg-paper">
        <Navbar />
        <main className="px-6 pb-16 pt-6 sm:px-10 2xl:px-16">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}
