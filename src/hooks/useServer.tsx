import axios from "axios";
import { useState, useEffect } from "react";

export default function useServer() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    axios.get('/data')
      .then((resp) => {
        setRes(resp.data);
      })
      .catch(error => {
        console.error('Ошибка запроса ', error);
      });
  }, []);

  return res;
}
