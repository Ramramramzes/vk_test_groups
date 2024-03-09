import { useState } from 'react';
import { Group } from '../App';
import styles from './cards.module.css';
import ReactDOM from 'react-dom';
import { Friends } from './Friends/Friends';


export function Cards({el,index}:{el:Group, index:number}) {
  const [btnClick, setBtnClick] = useState(false)

  const handleClick = () => {
    setBtnClick(!btnClick)
    console.log(btnClick);
    
  }

  return (
    <li key={index} className={styles.item}>
      <div className='avatar' style={{backgroundColor:`${el.avatar_color}`}}></div>
      <div className={styles.infoblock}>
        <span>{el.name}</span>
        {el.closed ? <span>Приватность: закрытая</span> : <span>Приватность: открытая</span>}
        {el.members_count && <span>{el.members_count} подписчиков</span>}
        {el.friends && <button onClick={handleClick}>Друзья</button>}
      </div>
      {btnClick && ReactDOM.createPortal(<Friends setBtnClick={setBtnClick} friends={el.friends ? el.friends : []} />,document.getElementById('root_friends')!)}
    </li>
  );
}
