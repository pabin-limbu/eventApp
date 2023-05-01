import SingleEvent from "@/src/components/events/single-event";
import Image from "next/image";

const EventPage = ({ data }) => {
  return (
    <div>
      <SingleEvent data={data} />
    </div>
  );
};

export default EventPage;

export async function getStaticProps(context) {
  console.log(context);
  const id = context.params.id;
  const { allEvents } = await import("/data/data.json");
  const eventData = allEvents.find((ev) => id === ev.id);
  return {
    props: { data: eventData },
  };
}

export async function getStaticPaths() {
  const data = await import("/data/data.json");
  const { allEvents } = data;
  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}
