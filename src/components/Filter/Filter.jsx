const Filter = ({ getFilter }) => {
  const handleChange = ({ target: { value } }) => {
    getFilter(value);
  };

  return (
    <>
      <label htmlFor="name">Find contacts by name</label>
      <input type="text" name="name" required onChange={handleChange} />
    </>
  );
};

export default Filter;
