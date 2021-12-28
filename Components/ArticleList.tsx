import { NextPage } from "next";
import React from "react";
import ArticleItem from "./ArticleItem";

import styles from '../styles/Home.module.css'

const ArticleList = (props: any) => {
  const { articles } = props;
  return (
    <div className={styles.grid}>
       {articles.map((item: any, index: number) => (
        <ArticleItem key={index} item={item} />
      ))}
    </div>
  );
};

export default ArticleList;
