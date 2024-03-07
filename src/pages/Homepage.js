import { useEffect, useState } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

function Homepage() {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState(null);
  const [search, setSearch] = useState("");
  const auth = "fVzXCYvZAGp5ZgGJQBFHrsKksWhYc2ghKmvAlCYLgMv19nGRfSTGbY4i";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${search}&per_page=15&page=1`;

  async function handleSearch(url) {
    setPage(1);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    const data = await res.json();
    console.log(data);
    setPhotos(data.photos);
  }

  async function handleMore() {
    let newURL;
    if (search === "")
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    else
      newURL = `https://api.pexels.com/v1/search?query=${search}&per_page=15&page=${
        page + 1
      }`;

    setPage((page) => page + 1);
    const res = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    const data = await res.json();
    console.log(data.photos);
    setPhotos((photos) => [...photos, ...data.photos]);
  }

  useEffect(() => {
    handleSearch(initialURL);
  }, []);

  useEffect(() => {
    if (search) handleSearch(searchURL);
  }, [searchURL, search]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        input={input}
        setInput={setInput}
        onSearch={() => setSearch(input)}
      />
      <div className="pictures">
        {photos &&
          photos.map((photo) => {
            return <Picture key={photo.id} photo={photo} />;
          })}
      </div>
      <div className="more">
        <button onClick={handleMore}>Load More</button>
      </div>
    </div>
  );
}

export default Homepage;
