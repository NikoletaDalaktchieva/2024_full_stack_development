const Filter = ({ searchText, setSearchText }) => {
  return (
    <div>
      filter shown with:
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default Filter;
