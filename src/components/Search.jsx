import UserChats from './UserChats';

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
      </div>
      <div>
        <UserChats />
        <UserChats />
      </div>
    </div>
  );
};
export default Search;
