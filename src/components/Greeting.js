import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/slices/githubSlice';

function Greeting() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.github);
  const [username, setUsername] = useState('');

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleChange = (e) => {
    setUsername(e.target.value);
    dispatch(fetchUsers(username));
  };

  return (
    <div>
      <input type="text" name="username" value={username} onChange={(e) => handleChange(e)} />
      <h1>Github Users</h1>
      {users && users.items.map((user) => (
        <div key={user.id}>
          <h2>{user.login}</h2>
          <img src={user.avatar_url} alt={user.login} />
        </div>
      ))}
    </div>
  );
}

export default Greeting;
