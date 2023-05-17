import React, { useEffect, useState } from "react";
import axios from "axios";

const AxiosTest = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [updatedTitles, setUpdatedTitles] = useState({});

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        const initialUpdatedTitles = res.data.reduce((obj, item) => {
          obj[item.id] = item.title;
          return obj;
        }, {});
        setData(res.data);
        setUpdatedTitles(initialUpdatedTitles);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (id) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title: updatedTitles[id],
      })
      .then((res) => {
        const updatedData = data.map((item) => {
          if (item.id === id) {
            return { ...item, title: updatedTitles[id] };
          }
          return item;
        });
        setData(updatedData);
        console.log(updatedData);
      })
      .catch((err) => console.log(err));
  };

  const handleTitleChange = (id, value) => {
    setUpdatedTitles((prevTitles) => ({
      ...prevTitles,
      [id]: value,
    }));
  };

  return (
    <div>
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id} className='titles'>
              {/* {item.title} */}
              <h3>{item.id }</h3>
              <button onClick={() => handleDelete(item.id)} className='delete btn'>delete</button>
              <input
              className="input side"
                type="text"
                value={updatedTitles[item.id]}
                onChange={(e) => handleTitleChange(item.id, e.target.value)}
              />
              <button onClick={() => handleUpdate(item.id)} className='update btn'> yenileme</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AxiosTest;
