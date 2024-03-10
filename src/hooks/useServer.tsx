import axios from "axios";
import { useState, useEffect } from "react";

export default function useServer() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    axios.get('https://musical-journey-p9w5vx6pqr6f99rw-3001.app.github.dev/data')
      .then((resp) => {
        setRes(resp.data);
      })
      .catch(error => {
        console.error('Ошибка запроса ', error);
      });
  }, []);

  return res;
}
