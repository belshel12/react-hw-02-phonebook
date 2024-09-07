import { Component } from "react";
import initialContacts from "../contacts.json";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";

class App extends Component {
  state = {
    contacts: initialContacts,
    filter: "",
  };

  createContact = (newUser) => {
    this.state.contacts.some(
      ({ name }) =>
        name.toLocaleLowerCase() === newUser.name.toLocaleLowerCase()
    )
      ? alert(`${newUser.name} is already in contacts.`)
      : this.setState((prev) => ({
          contacts: [...prev.contacts, newUser],
        }));
  };

  getFilterData = (data) => {
    this.setState({ filter: data });
  };

  handleDeleteContact = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => {
        return id !== contact.id;
      }),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter((el) =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm getData={this.createContact} />
        <h2>Contacts</h2>
        <Filter getFilter={this.getFilterData} />
        <ContactList
          contacts={filter ? filterContacts : contacts}
          onDelete={this.handleDeleteContact}
        />
      </>
    );
  }
}

export default App;
