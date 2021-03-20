export const arrayHeader = [
  { title: "Имя", type: "text", name: "name", placeholder: "Введите имя" },
  {
    title: "Фамилия",
    type: "text",
    name: "lastname",
    placeholder: "Введите фамилию",
  },
  {
    title: "Возраст",
    type: "number",
    name: "age",
    placeholder: "Введите возраст",
  },
  {
    title: "Пол",
    type: "checkbox",
    checkboxes: [
      { name: "m", lable: "мужской" },
      { name: "f", lable: "женский" },
    ],
  },
];
