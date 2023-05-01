import CatEvent from "@/src/components/events/catEvent";
const EventsCatPage = ({ data, pageName }) => {
  // console.log(data);
  return <CatEvent data={data} pageName={pageName} />;
};

export default EventsCatPage;

export async function getStaticPaths() {
  //since next doesnt know how many page to create so we can specify her
  //this tell next how many page it need to create at build time.
  // since we have some category and each category have a single page and to tell next how many page required-
  // we have to specify path along with its params where is dynamic name holding placeholder with url value.

  const { events_categories } = await import("/data/data.json");
  const allpaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });

  // console.log(allpaths);
  return {
    paths: allpaths,
    fallback: false,
  };
}

//For static rendering
export async function getStaticProps(context) {
  const id = context.params.cat;
  // console.log(id);

  const { allEvents } = await import("/data/data.json");
  const data = allEvents.filter((ev) => ev.city === id);
  // console.log(data);
  return {
    props: { data, pageName: id },
  };
}
