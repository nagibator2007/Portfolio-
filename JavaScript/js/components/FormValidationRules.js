// FormValidationRules.js

// Определяет правила валидации для формы.
export function addValidationRules(validator) {
  return validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите ваше имя',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимальная длина имени - 3 символа',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимальная длина имени - 20 символов',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Введите ваше почту',
      },
      {
        rule: 'email',
        errorMessage: 'Некорректный email',
      },
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Согласие обязательно',
      },
    ]);
}