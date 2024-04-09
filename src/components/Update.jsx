import { Link, useLoaderData } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';


const Update = () => {
  const loadedUser = useLoaderData();
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const updatedUser = { name, email };
    console.log(updatedUser);

    fetch(`http://localhost:5000/users/${loadedUser._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if ( data.modifiedCount > 0 ) {
        toast('user updated successfully');
      }
    })
  }
  return (
    <div>
      <Link to="/users">Users</Link>
      <h3>Update information</h3>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" id="" placeholder='name' defaultValue={loadedUser?.name} />
        <br />
        <input type="email" name="email" id="" placeholder='email' defaultValue={loadedUser?.email} />
        <br />
        <input type="submit" value="Update User" />
      </form>
      <ToastContainer />
    </div>
  );
};

export default Update;