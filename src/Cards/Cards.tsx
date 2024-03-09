import { Group } from '../App';
import styles from './cards.module.css';

export function Cards({el,index}:{el:Group, index:number}) {
  return (
    <li key={index} className={styles.item}>
      <div className='avatar' style={{backgroundColor:`${el.avatar_color}`}}></div>
      <div className={styles.infoblock}>
        <span>{el.name}</span>
        {el.closed ? <span>Приватность: закрытая</span> : <span>Приватность: открытая</span>}
        {el.members_count && <span>{el.members_count} подписчиков</span>}
      </div>
    </li>
  );
}
