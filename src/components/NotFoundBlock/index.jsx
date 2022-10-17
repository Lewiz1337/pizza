import React from 'react';
import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h2>
        <span>😞</span>
        <br />
        Такой страницы не существует
      </h2>
      <div className="button back-to-main">На главную</div>
    </div>
  );
}

export default NotFoundBlock;
