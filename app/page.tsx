import Coffee from '@/components/Coffee';
import { User } from '@/types/types';
import React from 'react';

const getUsers = async () => {
  const res = await fetch(process.env.URL + '/api/users', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
    next: {
      revalidate: 0,
    },
  });

  const data = await res.json();

  console.log(data.users);

  return data.users;
};

const Home = async () => {
  const usersData = await getUsers();
  const users: User[] = usersData.map((userData: any) => {
    const user: User = {
      id: userData._id,
      name: userData.name,
      email: userData.email,
      status: userData.status,
    };

    return user;
  });

  return (
    <div>
      <Coffee users={users} />
    </div>
  );
};

export default Home;
