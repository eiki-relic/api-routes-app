import { useRouter } from "next/router";
import useSWR from "swr";
import { Book } from "../../constants/books";

export default function Books() {
  const { query } = useRouter();
  //   const fetcher = (url: string) =>
  //     fetch(url).then((res) => {
  //       return res.json();
  //     });

  const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
    // if (res.status !== 200 && "message" in data) {
    //   throw new Error(data?.message);
    // }
    // return data;
  };

  const { data, error } = useSWR<Book, { message: string }>(
    () => query.id && `/api/books/${query.id}`,
    fetcher
  );
  console.log("data", data);
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.about}</p>
    </div>
  );
}
