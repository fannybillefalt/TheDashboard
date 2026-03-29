const baseQuizUrl = "https://opentdb.com/api.php?";

async function fetchQuizApi() {//hämtar data från API.
  try {
    const response = await fetch(
      `${baseQuizUrl}amount=3&category=17&difficulty=easy`,
    );

    if (!response.ok) {
      console.log("Något gick fel.");
      return;
    }

    const data = await response.json();
    console.log(data);
    showQuizData(data.results);
  } catch (error) {
    console.log(error);
  }
}

function showQuizData(data) {//visar datan.
  const quizHTML = data
    .map(
      (quiz) => `
    <div class="contentCard quizCard">
    <p class="quiz-question">${quiz.question}</p>
    <details>
        <summary>Visa svar</summary>
        <p>✅ ${quiz.correct_answer}</p>
    </details>
</div>
    `,
    )
    .join("");

  document.getElementById("quiz").innerHTML = quizHTML;
}

fetchQuizApi();
