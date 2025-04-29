type MovieStatus = "Watched" | "Planned";
type Genre = "Action" | "Drama" | "Comedy" | "Horror";

interface User {
  readonly id: string;
  username: string;
  email: string;
}

interface Movie {
  readonly id: string;
  title: string;
  genre: Genre;
  status: MovieStatus;
  description?: string;
  rating?: number;
  addedBy: User;
}

type NewMovie = Omit<Movie, "id">;
type MinimalMovieInfo = Pick<Movie, "title" | "status">;
type UpdateMovie = Partial<Omit<Movie, "id" | "addedBy">>;

const user: User = {
    id: "user-1", 
    username: "dakshin",
    email: "dakshin@example.com",
  };

const movies: Movie[] = [];

function addMovie(movieData: NewMovie): void {
  const newMovie: Movie = {
    ...movieData,
    id: crypto.randomUUID(),
  };
  movies.push(newMovie);
  renderMovies();
}

function renderMovies(): void {
  const list = document.getElementById("movieList") as HTMLUListElement;
  list.innerHTML = movies.map(movie => {
    const className = movie.status.toLowerCase();
    return `
      <li class="movie ${className}">
        <strong>${movie.title}</strong> [${movie.genre}] - 
        <span>${movie.status}</span>
        ${movie.rating ? ` | Rating: ${movie.rating}` : ""}
        ${movie.description ? `<br><small>${movie.description}</small>` : ""}
      </li>
    `;
  }).join('');
}

(document.getElementById("movieForm") as HTMLFormElement).addEventListener("submit", (e) => {
  e.preventDefault();

  const title = (document.getElementById("title") as HTMLInputElement).value.trim();
  const description = (document.getElementById("description") as HTMLInputElement).value.trim();
  const genre = (document.getElementById("genre") as HTMLSelectElement).value as Genre;
  const status = (document.getElementById("status") as HTMLSelectElement).value as MovieStatus;
  const ratingInput = (document.getElementById("rating") as HTMLInputElement).value;
  const rating = ratingInput ? parseFloat(ratingInput) : undefined;

  const newMovie: NewMovie = {
    title,
    genre,
    status,
    ...(description && { description }),
    ...(rating && { rating }),
    addedBy: user,
  };

  addMovie(newMovie);
  (e.target as HTMLFormElement).reset();
});
