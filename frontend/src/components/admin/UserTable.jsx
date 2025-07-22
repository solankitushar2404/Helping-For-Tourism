import React, { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("/api/admin/users");
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Username</th>
          <th className="py-2">Email</th>
          <th className="py-2">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="py-2">{user.username}</td>
            <td className="py-2">{user.email}</td>
            <td className="py-2">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;