import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  const navigate = useNavigate();
  const handleStartPage = () => navigate('/start');
  const handleEndPage = () => navigate('/end');
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.btn} onClick={handleStartPage}>
          Start page
        </button>
        <button className={styles.btn} onClick={handleEndPage}>
          End page
        </button>
      </div>
    </header>
  );
}
