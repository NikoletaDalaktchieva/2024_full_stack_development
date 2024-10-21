const Content = ({ parts }) => {
  console.log(parts);
  return parts.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));
};

export default Content;
