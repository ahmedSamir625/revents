import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";

const EventFilters = ({ predicate, setPredicate, loading }) => {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%" }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item
          active={predicate.get("filter") === "all"}
          onClick={() => setPredicate("filter", "all")}
          content="All"
        />
        <Menu.Item
          active={predicate.get("filter") === "going"}
          onClick={() => setPredicate("filter", "going")}
          content="I'm Going"
        />
        <Menu.Item
          active={predicate.get("filter") === "hosting"}
          onClick={() => setPredicate("filter", "hosting")}
          content="I'm Hosting"
        />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select Date" />
      <Calendar
        onChange={(date) => setPredicate("startDate", date)}
        value={predicate.get("startDate" || new Date())}
        tileDisabled={() => loading}
      />
    </>
  );
};

export default EventFilters;
