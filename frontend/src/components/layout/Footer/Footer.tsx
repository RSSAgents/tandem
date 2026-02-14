import classes from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.logo}>RSSAgents</div>
      <div className={classes.creationYear}>2026</div>
    </div>
  );
};
