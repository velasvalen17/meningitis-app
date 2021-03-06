import React, { useEffect } from "react";
import { useDataMutation } from "@dhis2/app-runtime";

/**
Component that handles the creation of new origin events.
Every time a new origin event is created a log appears at the console.
**/

export const CreateOrigin = ({
  orgUnit,
  trackedEntityInstance,
  enrollment,
  eventDate,
}) => {
  const mutation = {
    resource: "events",
    type: "create",
    data: ({ orgUnit, trackedEntityInstance, enrollment, eventDate }) => ({
      program: "VOEVJzwp4F7",
      programStage: "UFGwxeTgzZD",
      orgUnit,
      trackedEntityInstance,
      enrollment,
      eventDate,
      status: "ACTIVE",
      dataValues: [
        {
          dataElement: "MZ5Ww7OZTgM",
          value: "Origin",
        },
      ],
    }),
  };
  const [mutate] = useDataMutation(mutation, {
    variables: {
      orgUnit: orgUnit,
      trackedEntityInstance: trackedEntityInstance,
      enrollment: enrollment,
      eventDate: eventDate,
    },
  });

  useEffect(() => {
    mutate();
    console.log(
      "Event with TEI_ID: " + trackedEntityInstance + " has been created!!"
    );
  }, []);

  return <></>;
};

export default CreateOrigin;
