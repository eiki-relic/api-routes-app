import { useEffect, useState } from "react";

const Test = () => {
  const [people, setPeople] = useState({ id: 0, name: "" });
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/people/1");
      const data = await response.json();
      setPeople(data);
    };
    fetchData();
  }, []);
  return <div>{people.name}</div>;
};

export default Test;
