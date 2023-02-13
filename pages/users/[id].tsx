import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function UserDetail() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/user/${query.id}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Detail</h1>
      <div>
        <p>name</p>
        <p>{data.name}</p>
      </div>
      <div>
        <p>email</p>
        <p>{data.email}</p>
      </div>
    </div>
  );
}
