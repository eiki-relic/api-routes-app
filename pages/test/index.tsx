import { User } from "@prisma/client";
import { useEffect, useState } from "react";

const Test = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUsers(data);
    };
    fetchData();
  }, []);
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
};

export default Test;
