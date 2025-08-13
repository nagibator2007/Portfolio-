import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { queryClient } from "../../api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/User";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterSchema = z.object({
  username: z.string().min(5, "Не меньше 5 символов"),
  password: z.string().min(8, "Не меньше 8 символов"),
  email: z.string()
    .email("Неверный формат email")
    .min(8, "Email должен содержать не менее 5 символов"),
});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormValues) =>
      registerUser(data.username, data.password, data.email),
    onSuccess: () => {
      // Перезагружаем страницу после успешной регистрации
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  }, queryClient);

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input
          required
          type="text"
          {...register("username")} />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input
          required
          type="email"
          {...register("email")} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
          required
          type="password"
          {...register("password")} />
      </FormField>

      {registerMutation.error && <span>{registerMutation.error.message}</span>}

      <Button type="submit" isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
