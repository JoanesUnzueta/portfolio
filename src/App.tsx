import { Nav } from "./components/Nav";
import { About } from "./sections/About";
import { Adjust } from "./sections/Adjust";
import { Contact } from "./sections/Contact";
import { Cover } from "./sections/Cover";
import { FlowChair } from "./sections/FlowChair";
import { Kixmi } from "./sections/Kixmi";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Cover />
        <About />
        <Kixmi />
        <FlowChair />
        <Adjust />
        <Contact />
      </main>
    </>
  );
}
