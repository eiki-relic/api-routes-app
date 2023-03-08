import { useRouter } from "next/router";
import useSWR from "swr";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "@prisma/client";

const fetcher = async (url: string, method?: object) => {
  const res = await fetch(url, method);
  console.log(res);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function UserDetail({ user }) {
  console.log("大元user", user);
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

  const onSubmit = async (data) => {
    await fetcher(`/api/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>User Detail</h1>
      <button onClick={deleteUser}>Delete</button>
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
  const users = await fetcher("http://localhost:3000/api/user");
  console.log("users", users);
  // Get the paths we want to pre-render based on posts
  const paths = users.map(({ id }) => ({
    params: { id: `${id}` },
  }));
  console.log("paths", paths);
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  console.log("para,s", params);
  const user = await fetcher(`http://localhost:3000/api/user/${params.id}`);
  // Pass post data to the page via props
  return {
    props: { user },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
};
