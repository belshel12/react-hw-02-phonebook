import { Component } from "react";
import initialContacts from "../contacts.json";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import toast, { Toaster } from "react-hot-toast";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const localContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(localContacts);

    !parsedContacts
      ? this.setState({ contacts: initialContacts })
      : this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate() {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  }

  createContact = (newUser) => {
    this.state.contacts.some(
      ({ name }) =>
        name.toLocaleLowerCase() === newUser.name.toLocaleLowerCase()
    )
      ? toast.error(`${newUser.name} is already in contacts.`)
      : this.setState((prev) => ({
          contacts: [...prev.contacts, newUser],
        }));
  };

  getFilterData = (data) => {
    this.setState({ filter: data });
  };

  handleDelete = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => {
        return id !== contact.id;
      }),
    }));
  };

  handleFilter = () => {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter((el) =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filterContacts;
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <Toaster toastOptions={{ duration: 1500 }} />
        <h1>Phonebook</h1>
        <ContactForm getData={this.createContact} />
        <h2>Contacts</h2>
        <Filter getFilter={this.getFilterData} />
        <ContactList
          contacts={filter ? this.handleFilter() : contacts}
          onDelete={this.handleDelete}
        />
      </>
    );
  }
}

export default App;
