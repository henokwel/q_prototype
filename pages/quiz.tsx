import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import styles from "../styles/Home.module.css";
const uniqid = require("uniqid");

// Share Q
// Admin/quizzName/random generate Id for the q / .domain

const Quiz: NextPage = () => {
  const [qArr, setQArr] = useState([
    {
      id: uniqid(),
      q: "A",
      alt_A: false,
      alt_B: false,
      alt_C: false,
      altA_q: "",
      altB_q: "",
      altC_q: "",
    },
  ]);

  const [inputError, setInputError] = useState({
    id: null,
    q: false,
    alt: false,
    answer: false,
  });

  const [current, setCurrent] = useState(null);

  const router = useRouter();

  const handleAddFields = () => {
    const values = [...qArr];

    // Add workingOnCurrently to make sure user don't go back and changeSometing!
    // With better UI you can toggle between Q and make sure to check that everything is Filled!

    // A better way to handle nested Logic
    // => https://www.freecodecamp.org/news/so-youre-in-if-else-hell-here-s-how-to-get-out-of-it-fc6407fec0e/

    // check if the prev has a Q and >=1 answer
    // else display error In Q or Answers
    // Trim() before save and create a new Q

    // start with finding the last Q in the array

    let lastQ =
      values[values.length - 1] === undefined
        ? values[0]
        : values[values.length - 1];

    setCurrent(lastQ.id);
    // check for Q and Answers are not empty

    {
      /*
      // console.error("No Q give");
      // =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // if (
    //   lastQ.q !== "" &&
    //   lastQ.altA_q !== "" &&
    //   lastQ.altB_q !== "" &&
    //   lastQ.altC_q !== ""
    // ) {
      //   console.log("Q here");
      
      // setInputError({ id: lastQ.id, q: });
      // check for  >=1 Answers are selected
      
      // if (lastQ.alt_A || lastQ.alt_B || lastQ.alt_C) {
        //   values.push({
          //     id: uniqid(),
          //     q: "",
          //     alt_A: false,
          //     alt_B: false,
          //     alt_C: false,
          //     altA_q: "",
          //     altB_q: "",
          //     altC_q: "",
          //   });
          //   setQArr(values);
          // }
          
          // console.error("No Alt give");
          // }
        */
    }
    // =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Q Check
    if (lastQ.q === "") {
      console.error("No Q give");
      setInputError({
        id: lastQ.id,
        q: true,
        alt: false,
        answer: false,
      });

      // setInputError({ id: lastQ.id, q: });

      // check for  alternative, all must be given
    } else if (!lastQ.altA_q || !lastQ.altB_q || !lastQ.altC_q) {
      setInputError({
        id: lastQ.id,
        q: false,
        alt: true,
        answer: false,
      });
      console.error("NO Alts given");
      // console.log("Error ALt");
    }

    // else if (lastQ.altA_q === "") {
    //   console.error("NO Alts given");
    //   console.log("Error ALt");
    //   return;
    // } else if (lastQ.altB_q === "") {
    //   console.error("NO Alts given");
    //   console.log("Error ALt");
    //   return;
    // } else if (lastQ.altC_q === "") {
    //   console.error("NO Alts given");
    //   console.log("Error ALt");
    //   return;
    // }
    else if (!lastQ.alt_A && !lastQ.alt_B && !lastQ.alt_C) {
      console.error("NO Answer given");
      setInputError({
        id: lastQ.id,
        q: false,
        alt: false,
        answer: true,
      });
      // console.log("Error ALt");
    } else {
      console.log("Last Else");
      setInputError({
        id: lastQ.id,
        q: false,
        alt: false,
        answer: false,
      });

      // if (lastQ.alt_A || lastQ.alt_B || lastQ.alt_C) {
      // }
      values.push({
        id: uniqid(),
        q: "",
        alt_A: false,
        alt_B: false,
        alt_C: false,
        altA_q: "",
        altB_q: "",
        altC_q: "",
      });
      setQArr(values);
    }
  };

  const handleShare = () => {
    // Send the quizz to the next page
    // 0- Remove the last empty obj
    // 1-  Save current quiz to localstorate
    // 2- Clean up and set all state to defualt
    // 3- push to next page

    // 1
    localStorage.setItem("myQ", JSON.stringify(qArr));

    //2

    // 3
    router.push("/share");
  };
  // console.log();

  const handleRemoveFields = (index: number) => {
    const values = [...qArr];
    values.splice(index, 1);
    setQArr(values);
  };

  const handleInputChange = (
    index: number,
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const values = [...qArr];
    const target = event.target as typeof event.target & {
      name: string;
      value: any;
    };

    // change to Switch

    if (target.name === "q_" && target.value !== " ") {
      console.log(target.name);

      values[index].q = target.value;
    } else if (target.name === "altA_q" && target.value !== " ") {
      values[index].altA_q = target.value;
    } else if (target.name === "altB_q" && target.value !== " ") {
      values[index].altB_q = target.value;
    } else if (target.name === "altC_q" && target.value !== " ") {
      values[index].altC_q = target.value;
    } else if (target.name === "altA") {
      values[index].alt_A = !values[index].alt_A;
    } else if (target.name === "altB") {
      values[index].alt_B = !values[index].alt_B;
    } else if (target.name === "altC") {
      values[index].alt_C = !values[index].alt_C;
    }

    setQArr(values);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  console.log(qArr);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Quiz App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Create Quiz</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            {qArr.map((q, index) => {
              return (
                <>
                  <br />
                  <div key={`${q}~${index}`}>
                    <div>
                      <label
                        style={{
                          color:
                            q.id === current && inputError.q ? "red" : "black",
                        }}
                        htmlFor="q_"
                      >
                        Write Q here
                      </label>
                      <input
                        type="text"
                        // className="form-control"
                        id="q_"
                        name="q_"
                        value={q.q}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </div>
                    <h4>Select the correct answer</h4>
                    <div>
                      <label
                        // style={{ color: inputError.alt ? "red" : "black" }}
                        htmlFor="altA"
                      >
                        Add Answer
                      </label>
                      <input
                        type="checkbox"
                        className={styles.inputCheck}
                        id="altA"
                        name="altA"
                        // value={q.q}

                        checked={q.alt_A}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      <input
                        type="text"
                        // className="form-control"
                        id="altA_q"
                        name="altA_q"
                        value={q.altA_q}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </div>

                    <div>
                      <label
                        // style={{ color:  inputError.alt ? "red" : "black" }}
                        htmlFor="altB"
                      >
                        Add Answer
                      </label>
                      <input
                        type="checkbox"
                        // className="form-control"
                        id="altB"
                        name="altB"
                        // value={q.q}
                        checked={q.alt_B}
                        onChange={(event) => handleInputChange(index, event)}
                      />

                      <input
                        type="text"
                        // className="form-control"
                        id="altB_q"
                        name="altB_q"
                        value={q.altB_q}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </div>

                    <div>
                      <label
                        // style={{ color: inputError.alt ? "red" : "black" }}
                        htmlFor="altC"
                      >
                        Add Answer
                      </label>
                      <input
                        type="checkbox"
                        // className="form-control"
                        id="altC"
                        name="altC"
                        // value={q.q}
                        checked={q.alt_C}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      <input
                        type="text"
                        // className="form-control"
                        id="altC_q"
                        name="altC_q"
                        value={q.altC_q}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <br />
          <br />
        </form>
        <button onClick={() => handleAddFields()}>Add More</button>

        <button onClick={() => handleShare()}>Finish Quiz</button>
      </main>
    </div>
  );
};

export default Quiz;
