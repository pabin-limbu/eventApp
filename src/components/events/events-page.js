import Image from "next/image";
import Link from "next/link";
import React from "react";

const AllEvents = ({ data }) => {
  return (
    <div className="events_page">
      {data.map((ev) => {
        return (
          <Link key={ev.id} href={`/events/${ev.id}`}>
            <div className="card">
              <Image src={ev.image} height={400} width={400} alt={ev.title} />
              <h2>Events in{ev.title}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AllEvents;
