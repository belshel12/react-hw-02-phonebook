import { useEffect, useState } from "react";
import initialContacts from "../contacts.json";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? initialContacts;
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const createContact = (newUser) => {
    contacts.some(
      ({ name }) =>
        name.toLocaleLowerCase() === newUser.name.toLocaleLowerCase()
    )
      ? toast.error(`${newUser.name} is already in contacts.`)
      : setContacts([...contacts, newUser]);
  };

  const getFilterData = (data) => {
    setFilter(data);
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => id !== contact.id));
  };

  const handleFilter = () => {
    const filterContacts = contacts.filter((el) =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filterContacts;
  };
  console.log(contacts);

  return (
    <>
      <Toaster toastOptions={{ duration: 1500 }} />
      <h1>Phonebook</h1>
      <ContactForm getData={createContact} />
      <h2>Contacts</h2>
      <Filter getFilter={getFilterData} />
      <ContactList
        contacts={filter ? handleFilter() : contacts}
        onDelete={handleDelete}
      />
    </>
  );
};

export default App;
