import { VFC } from "react";
import { useForm } from "react-hook-form";
import { HttpClient } from "lib/axios";
import { APIHost } from "constants/APIHost";
import { Account } from "data/account";
import PersistenceKeys from "constants/persistenceKeys";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import styles from "./style.module.scss";

type SignUpFormData = {
  email: string;
  password: string;
};

type SignUpResponse = {
  account: Account;
  token: string;
};

const SignUpPage: VFC = () => {
  const { register, handleSubmit } = useForm<SignUpFormData>();
  const { refetchAccount } = useCurrentAccount();
  const onSubmit = handleSubmit(async (prams) => {
    const res = await HttpClient.request<SignUpResponse>({
      method: "POST",
      url: `${APIHost.AUTH}/sign_in`,
    });
    if (!res.data.token) return;

    localStorage.setItem(PersistenceKeys.TOKEN, res.data.token);
    await refetchAccount();
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          {...register("email", {
            required: "メールアドレスは必須です",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "無効なメールアドレスです",
            },
          })}
        />
        <input
          {...register("password", {
            required: "パスワードは必須です",
          })}
        />
        <button className={styles.red}>新規登録</button>
      </form>
    </div>
  );
};

export default SignUpPage;
