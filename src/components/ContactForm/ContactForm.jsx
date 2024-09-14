import { useState } from "react";
import { nanoid } from "nanoid";

const ContactForm = ({ getData }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = ({ target: { value, name } }) => {
    if (name === "name") {
      setName(value);
    }
    if (name === "number") {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "" && number !== "") {
      getData({ id: nanoid(), name, number });
    }
    setName("");
    setNumber("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleChange}
        />
        <button type="submit">Add contact</button>
      </form>
    </>
  );
};

export default ContactForm;
