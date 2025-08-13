import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { z } from "zod";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../api/Notes"; // Убедитесь в правильности импорта
import { queryClient } from "../../api/queryClient";

export interface INoteFormProps { }

const CreateNoteSchema = z.object({
  title: z.string().min(5, "Не меньше 5 символов"),
  text: z.string().min(10, "Не меньше 10 символов"),
});

type CreateNoteForm = z.infer<typeof CreateNoteSchema>;

export const NoteForm: FC<INoteFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoteForm>({
    resolver: zodResolver(CreateNoteSchema),
  });

  const createNoteMutation = useMutation({
    mutationFn: ({ title, text }: CreateNoteForm) => createNote(title, text), // Обертка
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  }, queryClient);

  return (
    <form
      className="note-form"
      onSubmit={handleSubmit((data) => { // Объект data со свойствами title и text
        createNoteMutation.mutate(data); // Передаем объект data
      })}
    >
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input type="text" {...register("title")} />
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register("text")} />
      </FormField>
      <Button type="submit" isLoading={createNoteMutation.isPending}>
        Сохранить
      </Button>
    </form>
  );
};