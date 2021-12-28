import Link from "next/link";
import React from "react";
import styles from '../styles/Home.module.css'

const ArticleItem = (props: any) => {
  const { item } = props;
  return (
    <div className={styles.card}>
      <Link href="/article/[id]" as={`/article/${item.id}`}>
        <a>
          <h3>{item.title} &rarr;</h3>
          <p>{item.body}</p>
        </a>
      </Link>
    </div>
  );
};

export default ArticleItem;
