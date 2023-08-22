let guestUser = {
  contacts: [],
  tasks: [],
  categories: [],
};

guestUser.contacts = [
  {
    name: "Sanjaya Shrestha",
    email: "sanjaya@gmail.com",
    phone: "123456789",
    color: "bg-0",
    tasks: [],
  },
  {
    name: "Elias Salimov",
    email: "elias@gmail.com",
    phone: "123456789",
    color: "bg-1",
    tasks: [],
  },
  {
    name: "Christian Hinz",
    email: "chris@gmail.com",
    phone: "123456789",
    color: "bg-2",
    tasks: [],
  },
  {
    name: "Luca Rehmet",
    email: "luca@gmail.com",
    phone: "123456789",
    color: "bg-2",
    tasks: [],
  },
  {
    name: "Florian Zirngibl",
    email: "flo@gmail.com",
    phone: "123456789",
    color: "bg-2",
    tasks: [],
  },
  {
    name: "Vladsta",
    email: "vlad@gmail.com",
    phone: "123456789",
    color: "bg-2",
    tasks: [],
  },
  {
    name: "Max Mustermann",
    email: "Max@gmail.com",
    phone: "123456789",
    color: "bg-2",
    tasks: [],
  }
];

guestUser.tasks = [
  {
    title: "Give up Join for the review",
    description: "Change all the changes which needed to be made and give up on the SCRUM for the review ",
    dueDate: "2023-08-16",
    prio: 1,
    category: { name: "Code", color: 1 },
    assignedTo: guestUser.contacts.slice(0, 3),
    subtasks: [
      { name: "Make responsive changes", done: false },
    ],
    boardColumn: "board-column-todo",
  }
];

guestUser.categories = [
  { name: "Backoffice", color: 15 },
  { name: "Design", color: 0 },
  { name: "Marketing", color: 12 },
  { name: "Media", color: 7 },
  { name: "Sales", color: 3 },
];