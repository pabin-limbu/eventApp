import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

const SingleEvent = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const eventId = router?.query.id;

    const validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailValue.match(validRegex)) {
      setMessage("Invalid Email");
      return;
    } else {
      setMessage("");
    }

    try {
      //fetch request POST
      const response = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, eventId }),
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      setMessage(data.message);
      inputEmail.current.value = "";
    } catch (error) {

      console.log({error});
    }
  };

  return (
    <div className="event-single_page">
      <Image src={data.image} width={1000} height={500} alt={data.title} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <form onSubmit={onSubmit} className="email_registration">
        <label htmlFor="">Get register for this event</label>
        <input ref={inputEmail} id="email" placeholder="Email" />
        <button type="submit"> submit </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SingleEvent;
