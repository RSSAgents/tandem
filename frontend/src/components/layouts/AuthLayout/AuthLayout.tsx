import { Outlet } from 'react-router-dom';
import classes from './AuthLayout.module.css';

export const AuthLayout = () => {
  return (
    <div className={classes.layout}>
      <Outlet />
    </div>
  );
};
