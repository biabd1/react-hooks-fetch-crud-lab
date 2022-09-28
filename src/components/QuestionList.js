import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

const url = `http://localhost:4000/questions`
function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  function handleDeleteClick(id) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedQuestions = questions.filter((qstn) => qstn.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctId) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctId }),
    })
      .then((res) => res.json())
      .then((updateQuestion) => {
        const updateQuestions = questions.map((qst) => {
          if (qst.id === updateQuestion.id) return updateQuestion;
          return qst;
        });
        setQuestions(updateQuestions);
      });
  }

  const questionItems = questions.map((qs) => (
    <QuestionItem
      key={qs.id}
      question={qs}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;