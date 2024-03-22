const SearchBar = () => {
    
    const searchDB = async (e) => {
        e.preventDefault();
        console.log('works')
    }
  
  
  
  
    //do i want it to need a submit button
  
  return (
    <div className="bento items-center">
        <form onSubmit={searchDB} className="form items-center flex gap-2">
            <input type="text" className="query" placeholder="Type to search..."/>
            <button className="search" type="">Submit</button>
        </form>
    </div>
  )
}

export default SearchBar