const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";

    const genresID = selectedGenres.map(genre => genre.id);
    return genresID.reduce((genreId, genresIdList) => genreId + "," + genresIdList, "");
}

export default useGenre;