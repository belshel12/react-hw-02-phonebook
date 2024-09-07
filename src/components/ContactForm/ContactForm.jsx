import { Component } from "react";
import { nanoid } from "nanoid";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name !== "" && this.state.number !== "") {
      this.props.getData({ ...this.state, id: nanoid() });
    }
    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="tel"
            name="number"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />
          <button type="submit">Add contact</button>
        </form>
      </>
    );
  }
}

export default ContactForm;
