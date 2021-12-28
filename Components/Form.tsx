import React, { useState } from "react";
import { TextField, Box, InputBase } from "@mui/material";
import { useRouter } from "next/router";
const uniqid = require("uniqid");

export default function FormPropsTextFields() {
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

    let lastQ =
      values[values.length - 1] === undefined
        ? values[0]
        : values[values.length - 1];

    setCurrent(lastQ.id);
    // check for Q and Answers are not empty

    {
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
    } else if (!lastQ.alt_A && !lastQ.alt_B && !lastQ.alt_C) {
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

  return (
    <Box
      component="form"
      onSubmit={(e: any) => handleSubmit(e)}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch", background: "red" },
      }}
      noValidate
      autoComplete="off"
    >
      {qArr.map((q, index) => {
        return (
          <>
            {/* Question Field*/}
            <TextField
              fullWidth
              onChange={(event: any) => handleInputChange(index, event)}
              value={q.q}
              label="Q"
              id="q_"
              name="q_"
            />
            {/* ALt 1 */}
            <div>
              <TextField
                fullWidth
                onChange={(event: any) => handleInputChange(index, event)}
                value={q.q}
                label="Q"
                id="q_"
              />

            
            </div>
          </>
        );
      })}
    </Box>
  );
}
