import styles from './App.module.css'
import { useState, useEffect, ChangeEvent } from 'react';
import useServer from './hooks/useServer';
import { Cards } from './Cards';

export interface GetGroupsResponse {
  result: 1 | 0;
  data?: Group[];
}

export interface Group {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
}

export interface User {
  first_name: string;
  last_name: string;
}

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [closedChecked, setClosedChecked] = useState(false);
  const [openChecked, setOpenChecked] = useState(false);
  const [friendsChecked, setFriendsChecked] = useState(false);
  const [colorFilters, setColorFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const data = useServer();

  useEffect(() => {
    setGroups(data);
  }, [data]);

  useEffect(() => {
    const delay = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(delay);
  }, [loading]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true); 
      filterGroups();
    }, 0);
    return () => clearTimeout(delay);
  }, [closedChecked, openChecked, friendsChecked, colorFilters, data]);

  const filterGroups = () => {
    let filteredGroups = data || [];
    if (closedChecked) {
      filteredGroups = filteredGroups.filter((group: Group) => group.closed);
    }
    if (openChecked) {
      filteredGroups = filteredGroups.filter((group: Group) => !group.closed);
    }
    if (friendsChecked) {
      filteredGroups = filteredGroups.filter((group: Group) => group.friends && group.friends.length > 0);
    }
    if (colorFilters.length > 0) {
      filteredGroups = filteredGroups.filter((group: Group) => colorFilters.includes(group.avatar_color || ''));
    }
    setGroups(filteredGroups);
  };

  const handleClosedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setClosedChecked(event.target.checked);
  };

  const handleOpenChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpenChecked(event.target.checked);
  };

  const handleFriendsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFriendsChecked(event.target.checked);
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    if (event.target.checked) {
      setColorFilters(prevFilters => [...prevFilters, color]);
    } else {
      setColorFilters(prevFilters => prevFilters.filter(filter => filter !== color));
    }
  };

  return (
    <div>
      <ul>
        <li><input type="checkbox" onChange={handleClosedChange} checked={closedChecked} /> Приватные</li>
        <li><input type="checkbox" onChange={handleOpenChange} checked={openChecked} /> Открытые</li>
        <li><input type="checkbox" onChange={handleFriendsChange} checked={friendsChecked} /> С друзьями</li>
      </ul>
      <ul>
        <li><input type="checkbox" value="red" onChange={handleColorChange} /> Красный</li>
        <li><input type="checkbox" value="green" onChange={handleColorChange} /> Зеленый</li>
        <li><input type="checkbox" value="blue" onChange={handleColorChange} /> Синий</li>
        <li><input type="checkbox" value="white" onChange={handleColorChange} /> Белый</li>
        <li><input type="checkbox" value="orange" onChange={handleColorChange} /> Оранжевый</li>
        <li><input type="checkbox" value="yellow" onChange={handleColorChange} /> Желтый</li>
        <li><input type="checkbox" value="purple" onChange={handleColorChange} /> Фиолетовый</li>
      </ul>
      <ul>
        {groups && groups.map((el, index) => {
          return <Cards key={index} el={el} index={index} />;
        })}
      </ul>

      <div className={`${styles.loader_none} loader_container ${loading ? styles.loader_block : ''}`}>
        <span className="loader"></span>
      </div> 
    </div>
  );
}

export default App;
