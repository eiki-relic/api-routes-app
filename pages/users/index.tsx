import { useForm, SubmitHandler } from "react-hook-form";

type UserType = {
  email: string;
  name: string;
};

const User = () => {
  const { register, handleSubmit } = useForm<UserType>();
  const onSubmit: SubmitHandler<UserType> = async (data) => {
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
  return (
    <div>
      <h2>User作成ページ</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor={"name"}>name</label>
          <input id="name" {...register("name")} />
        </div>
        <div>
          <label htmlFor={"email"}>email</label>
          <input id="email" {...register("email")} />
        </div>
        <button>送信</button>
      </form>
    </div>
  );
};

export default User;
