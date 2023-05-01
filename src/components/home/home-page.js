import Image from "next/image";
import Link from "next/link";

export const HomePage = ({ data }) => {
  return (
    <div className="home_body">
      {data.map((ev) => {
        return (
          <Link className="card" href={`/events/${ev.id}`} key={ev.id} passHref>
            <div className="image">
              <Image src={ev.image} width={400} height={300} alt={ev.title} />
            </div>
            <div className="content">
              <h2>{ev.title}</h2>
              <p>{ev.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
