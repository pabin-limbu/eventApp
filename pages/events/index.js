import AllEvents from "@/src/components/events/events-page";
import Image from "next/image";
import Link from "next/link";

const eventsPage = ({ data }) => {
  return <AllEvents data={data} />;
};

export default eventsPage;

//For static rendering
export async function getStaticProps() {
  const { events_categories } = await import("/data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
