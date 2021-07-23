import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();

  const addMeetup = async (enteredMeetup) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetup),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add new meet-up</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetup} />
    </Fragment>
  );
};

export default NewMeetup;
