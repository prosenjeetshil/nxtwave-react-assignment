import React, { useEffect, useState } from "react";
import axios from "axios";

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

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error fetching data</>;
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