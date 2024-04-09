import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDelete = (_id) => {
    console.log('Deleting id: ', _id);
    fetch(`http://localhost:5000/users/${_id}`, {
      method: 'DELETE'
    })
    .then(req => req.json())
    .then(data => {
      console.log(data);
      if (data.deletedCount > 0 ) {
        alert('Deleted successfully');
        const remaining = users.filter(user => user._id !== _id);
        setUsers(remaining);
      }
    })
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h3>Users: {users.length}</h3>
      <div>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              border: "3px solid purple",
              padding: "10px",
              margin: "15px",
            }}
          >
            {user.name} <br />
            {user.email} <br />
            {user._id} <br />
            <Link to={`/update/${user._id}`}>
              <button>Update</button>
            </Link>
            <button
              onClick={() => handleDelete(user._id)}
            >X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
