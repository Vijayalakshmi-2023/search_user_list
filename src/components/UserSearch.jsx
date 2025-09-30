import { useEffect, useState } from 'react';

export default function UserSearch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch users from API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);

  // Filter users based on input
  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4">👤 Search Users</h1>

      <input
        type="text"
        placeholder="Search by name..."
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.length > 0 ? (
        <ul className="space-y-3">
          {filteredUsers.map(user => (
            <li key={user.id} className="p-3 bg-gray-100 rounded">
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-gray-600">{user.email}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
}
