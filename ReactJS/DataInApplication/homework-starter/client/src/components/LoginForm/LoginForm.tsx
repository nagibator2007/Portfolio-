import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { queryClient } from "../../api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/User";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
  password: z.string().min(8, "Не меньше 8 символов"),
  email: z.string()
    .email("Неверный формат email")
    .min(5, "Email должен содержать не менее 5 символов"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => login(data.email, data.password),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  }, queryClient)

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input
          required
          type="text"
          {...register("email")} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
          required
          type="password"
          {...register("password")} />
      </FormField>

      {loginMutation.error && <span>{loginMutation.error.message}</span>}

      <Button type="submit" isLoading={loginMutation.isPending}>Войти</Button>
    </form>
  );
};
