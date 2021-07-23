import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  console.log("Homepage props.meetups", props.meetups);
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="Browse through all the meetups happening in your city and make friends!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch data from an API
  // always must return an object with props property
  const client = await MongoClient.connect(
    "mongodb+srv://mongouser:mongopassword@cluster0.43i2a.mongodb.net/meetups_db?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API
//   return {
//     props: { meetups: DUMMY_DATA },
//   };
// }
export default HomePage;
