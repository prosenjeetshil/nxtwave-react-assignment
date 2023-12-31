import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const ListContainer = () => {
  const [listData, setListData] = useState({ lists: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setTimeout(async () => {
        const response = await axios.get(
          "https://apis.ccbp.in/list-creation/lists"
        );
        const data = response.data;
        console.log("Fetched data:", data);
        setListData(data || { lists: [] });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTryAgain = () => {
    setIsLoading(true);
    setError(null);
    fetchData(); // Retry the HTTP GET request
  };

  // if loading show the loading spinner using cliploader 
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <ClipLoader size={30} color={"#123abc"} loading={isLoading} />
      </div>
    );
  }

  // if error occured while fetching data then show an error with a try again button
  if (error) {
    return (
      <div>
        <img
          src=".../public/error-image.jpg"
          alt="Failure View"
        />
        <p>Something went wrong. Please try again</p>
        <button onClick={handleTryAgain}>Try Again</button>
      </div>
    );
  }

  const listNumber1Items = listData.lists.filter((item) => item.list_number === 1);
  const listNumber2Items = listData.lists.filter((item) => item.list_number === 2);

  return (
    <div>
      <h2>List Containers</h2>

      {/* List Number 1 */}
      <div style={{ float: 'left', marginRight: '20px' }}>
        <h3>List Number 1</h3>
        {listNumber1Items.map((item, index) => (
          <div key={index}>
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
          </div>
        ))}
      </div>

      {/* List Number 2 */}
      <div style={{ float: 'left' }}>
        <h3>List Number 2</h3>
        {listNumber2Items.map((item, index) => (
          <div key={index}>
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
          </div>
        ))}
      </div>

      <div style={{ clear: 'both' }}></div>

    </div>
  );
};

export default ListContainer;