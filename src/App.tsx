const imageModules = import.meta.glob("./assets/p_*.png", {
  eager: true,
  import: "default",
});

const images = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src as string);
  
export default function App() {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-background text-foreground">
      {images.map((src, i) => (
        <section
          key={src}
          className="h-screen w-full snap-start snap-always flex items-center justify-center p-6 md:p-12"
        >
          <img
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className="max-h-full max-w-full object-contain"
          />
        </section>
      ))}

      <section className="h-screen w-full snap-start snap-always flex items-center justify-center px-8">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-6">GET IN TOUCH</p>
          <a
            href="mailto:hello@joanesunzueta.com"
            className="text-3xl md:text-6xl font-light tracking-tight hover:opacity-60 transition-opacity"
          >
            joanes.unzueta@gmail.com
          </a>
          <div className="mt-12 flex justify-center gap-8 text-xs tracking-[0.3em] text-muted-foreground uppercase">
            <a href="https://www.linkedin.com/in/joanes-unzueta/" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="tel:+46761937969" className="hover:text-foreground transition-colors">+46 761 937 969</a>
          </div>
        </div>
      </section>
    </div>
  );
}