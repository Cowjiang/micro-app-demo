import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">主应用</Link>
        </li>
        <li>
          <a href="https://localhost:4001/subapp">单独打开子应用</a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
