import React, { useEffect } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import CheckOrigin from "./CheckOrigin";

/**
Parent component of the app. It requests the list of First Event type
events which are descendants from the orgUnit param in the query.
Parent component: -
Child component: CheckOrigin
 */

const query = {
  events: {
    resource: "events.json",
    params: ({ program, orgUnit }) => ({
      orgUnit,
      ouMode: "DESCENDANTS",
      program,
      lastUpdatedStartDate: "2020-01-01T09:00:24.878",
      filter: "MZ5Ww7OZTgM:eq:First visit",
      skipPaging: "true",
      //lastUpdatedDuration: "10d",
    }),
  },
};

const EventList = ({ orgUnit, program }) => {
  const { loading, error, data } = useDataQuery(query, {
    variables: {
      orgUnit,
      program,
    },
  });

  useEffect(() => {
    console.log(
      `Executing OutBreak App on the program: ${program} with the parent_orgUnit ${orgUnit} `
    );
  }, []);

  return (
    <>
      {loading && <span>...</span>}
      {error && <span>{`ERROR: ${error.message}`}</span>}
      {data && (
        <>
          <pre>
            {data.events.events.map((ev, index) => (
              <React.Fragment key={ev.event}>
                <CheckOrigin event={ev} />
                {index == data.events.events.length - 1 &&
                  console.log(
                    `Program ${program} with ${data.events.events.length} events in orgUnit ${orgUnit}, updated!`
                  )}
              </React.Fragment>
            ))}
          </pre>
        </>
      )}
    </>
  );
};

export default EventList;
