import '../style/static.css'; // Assuming you have a CSS file for styling

const Static = () => {
  // Static data for multiple movie categories
  const categories = [
    {
      name: 'Category 1: New Releases',
      movies: [
        { title: 'Stree 2', poster: 'http://ts4.mm.bing.net/th?id=OIP.zv7FfGmEgs0BYAGh1RcOngHaEK&pid=15.1' },
        { title: 'Mission: Impossible - Dead Reckoning',  poster: 'https://th.bing.com/th/id/OIP.JSG4MX4bE_qnAEdiq6-oTwHaJQ?w=141&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
        { title: 'Pushpa 2', poster: 'https://th.bing.com/th?id=OIF.L%2bPY3ptBsbUUZwgRng381A&w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
        { title: 'Singham Again',  poster: 'https://th.bing.com/th/id/OIP.oeiTbvTqk-NBsiDdVxIryQHaEK?w=284&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
      ],
    },
    {
      name: 'Category 2: Romance',
      movies: [
        { title: 'TAMASHA',  poster: 'https://th.bing.com/th/id/OIP.L1lfsv8VYuLpj7UB0FY00QHaKu?w=208&h=300&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
        { title: 'Titanic',  poster: 'https://th.bing.com/th/id/OIP.tczeHErX9gHDXPANDJhLDwHaKr?w=208&h=300&c=7&r=0&o=5&dpr=1.3&pid=1.7' },
        { title: 'Pathan',  poster: 'https://th.bing.com/th/id/OIP.EaYUaFtAskmctw94IAdgSwHaJ4?w=1080&h=1440&rs=1&pid=ImgDetMain' },
        { title: 'Shaandaar',  poster: 'https://images.wedmegood.com/wp-content/uploads/2016/12/Shaandar_New_Poster.jpg' },
      ],
    },
  ];

  return (
    <div className="static-container">
      {categories.map((category, index) => (
        <div key={index} className="category-section">
          <h2>{category.name}</h2>
          <div className="movie-slider">
            <div className="movie-scroll">
              {category.movies.map((movie, idx) => (
                <div key={idx} className="movie-ca">
                  <img
                    src={movie.poster || '/placeholder.png'}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <h3>{movie.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Static;
