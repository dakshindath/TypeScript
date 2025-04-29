var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var user = {
    id: "user-1",
    username: "dakshin",
    email: "dakshin@example.com",
};
var movies = [];
function addMovie(movieData) {
    var newMovie = __assign(__assign({}, movieData), { id: crypto.randomUUID() });
    movies.push(newMovie);
    renderMovies();
}
function renderMovies() {
    var list = document.getElementById("movieList");
    list.innerHTML = movies.map(function (movie) {
        var className = movie.status.toLowerCase();
        return "\n      <li class=\"movie ".concat(className, "\">\n        <strong>").concat(movie.title, "</strong> [").concat(movie.genre, "] - \n        <span>").concat(movie.status, "</span>\n        ").concat(movie.rating ? " | Rating: ".concat(movie.rating) : "", "\n        ").concat(movie.description ? "<br><small>".concat(movie.description, "</small>") : "", "\n      </li>\n    ");
    }).join('');
}
document.getElementById("movieForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var title = document.getElementById("title").value.trim();
    var description = document.getElementById("description").value.trim();
    var genre = document.getElementById("genre").value;
    var status = document.getElementById("status").value;
    var ratingInput = document.getElementById("rating").value;
    var rating = ratingInput ? parseFloat(ratingInput) : undefined;
    var newMovie = __assign(__assign(__assign({ title: title, genre: genre, status: status }, (description && { description: description })), (rating && { rating: rating })), { addedBy: user });
    addMovie(newMovie);
    e.target.reset();
});
