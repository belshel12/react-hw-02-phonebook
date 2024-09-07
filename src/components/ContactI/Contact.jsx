const Contact = ({ name, number }) => {
  return (
    <>
      <p>
        {name}: <span>{number}</span>
      </p>
    </>
  );
};

export default Contact;
