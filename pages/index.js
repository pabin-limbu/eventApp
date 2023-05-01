import { Inter } from "next/font/google";
import { HomePage } from "@/src/components/home/home-page";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  return (
    <>
      <HomePage data={data} />
    </>
  );
}

//For server side rendering
export async function getServerSideProps(context) {
  //this returns the props that our page need to have.

  const { events_categories } = await import("/data/data.json");
  // console.log(events_categories);
  return {
    props: { data: events_categories },
  };
}
