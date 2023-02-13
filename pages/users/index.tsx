import { User } from '@prisma/client';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSWR from 'swr';

type UserType = {
  email: string;
  name: string;
};

const User = () => {
  const { register, handleSubmit } = useForm<UserType>();
  const onSubmit: SubmitHandler<UserType> = async (data) => {
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: users, error } = useSWR<User[], { message: string }>(
    '/api/user',
    fetcher
  );

  return (
    <div>
      <h2>User作成ページ</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor={'name'}>name</label>
          <input id="name" {...register('name')} />
        </div>
        <div>
          <label htmlFor={'email'}>email</label>
          <input id="email" {...register('email')} />
        </div>
        <button>送信</button>
      </form>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <Link href={`users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
