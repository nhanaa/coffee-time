import EditTable from '@/components/EditTable';
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

  return data.users;
};

const Edit = async () => {
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
      <EditTable users={users} />
    </div>
  );
};

export default Edit;
