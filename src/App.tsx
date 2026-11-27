import { Nav } from "./components/Nav";
import { About } from "./sections/About";
import { Methodology } from "./sections/Methodology";
import { Adjust } from "./sections/Adjust";
import { Contact } from "./sections/Contact";
import { Cover } from "./sections/Cover";
import { FlowChair } from "./sections/FlowChair";
import { Kixmi } from "./sections/Kixmi";

export default function App() {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <Nav />
      <main id="content">
        <Cover />
        <About />
        <Methodology />
        <FlowChair />
        <Adjust />
        <Kixmi />
        <Contact />
      </main>
    </>
  );
}
