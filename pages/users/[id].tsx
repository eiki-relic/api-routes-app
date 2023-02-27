import { useRouter } from "next/router";
import useSWR from "swr";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "@prisma/client";

const fetcher = async (url: string, method?: object) => {
  const res = await fetch(url, method);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function UserDetail({ user }) {
  const { register, handleSubmit } = useForm<Pick<User, "name" | "email">>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });
  const deleteUser = async () => {
    await fetcher(`/api/user/${user.id}`, {
      method: "DELETE",
    });
  };

  const onSubmit = async (user) => {
    await fetcher(`/api/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>User Detail</h1>
      <button onClick={deleteUser} />
      <div>
        <p>name</p>
        <input {...register("name")} />
      </div>
      <div>
        <p>email</p>
        <input {...register("email")} />
      </div>
      <button>Submit</button>
    </form>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetcher(`/api/user`);
  const users = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = users.map(({ id }) => ({
    params: { id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const res = await fetcher(`/api/user/${params.id}`);
  const user = res.json();
  // Pass post data to the page via props
  return {
    props: { user },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
};
