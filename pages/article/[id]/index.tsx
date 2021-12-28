import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const article: NextPage<{ article: any}> = ({ article }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const router = useRouter()

  return (
    <div>
      <h4>{article.title}</h4>
      <p>{article.body}</p>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  );

  const article = await res.json();
  return {
    props: {
      article,
    },
  };
};

export default article;
