import { User } from '../../App';
import styles from './friends.module.css';

export function Friends({friends,setBtnClick}:{friends : User[],setBtnClick: (el:boolean)=>void}) {
  return (
    <div className={styles.block}>
      <div className={styles.popup}>
        <span onClick={()=>setBtnClick(false)} className={styles.close}>×</span>
        {friends && friends.map((el) => {
          return <span>{el.first_name} {el.last_name}</span>
        })}
      </div>
    </div>
  );
}
