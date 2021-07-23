import React, { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetail from "../components/meetups/MeetupDetail";

const MeetupDetailPage = (props) => {
  const { meetup } = props;
  return (
    <Fragment>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <MeetupDetail meetup={meetup} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mongouser:mongopassword@cluster0.43i2a.mongodb.net/meetups_db?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://mongouser:mongopassword@cluster0.43i2a.mongodb.net/meetups_db?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetup: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetailPage;
