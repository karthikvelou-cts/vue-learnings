<template>
  <section class="quiz-wrap">
    <h2>Sports Quiz (Easy)</h2>
    <div class="score-board" v-if="questions.length">
      <div class="score-pill">Points: {{ points }}</div>
      <div class="score-pill">Correct: {{ correctCount }}</div>
      <div class="score-pill">Incorrect: {{ incorrectCount }}</div>
      <div class="score-pill">Answered: {{ answeredCount }}/{{ questions.length }}</div>
    </div>

    <div v-if="loading" class="state">Loading questions...</div>
    <div v-else-if="error" class="state error">{{ error }}</div>

    <div v-else-if="questions.length" class="quiz-card">
      <p class="meta">Question {{ currentIndex + 1 }} of {{ questions.length }}</p>
      <h3 v-html="currentQuestion.question"></h3>

      <div class="answers">
        <button
          v-for="option in currentQuestion.options"
          :key="option"
          class="option-btn"
          :class="{
            selected: userAnswers[currentQuestion.id] === option,
            correct: showResult && option === currentQuestion.correct_answer,
            wrong: showResult && userAnswers[currentQuestion.id] === option && option !== currentQuestion.correct_answer
          }"
          @click="selectAnswer(option)"
        >
          <span v-html="option"></span>
        </button>
      </div>

      <p v-if="showResult" class="result-line">
        Correct answer:
        <strong v-html="currentQuestion.correct_answer"></strong>
      </p>

      <div class="slider-controls">
        <button :disabled="currentIndex === 0" @click="prevQuestion">Prev</button>
        <button @click="toggleResult">{{ showResult ? 'Hide Answer' : 'Show Answer' }}</button>
        <button :disabled="currentIndex === questions.length - 1" @click="nextQuestion">Next</button>
      </div>
    </div>
  </section>
</template>

<script>
const QUIZ_URL = 'https://opentdb.com/api.php?amount=20&category=21&difficulty=easy'

export default {
  name: 'QuizView',
  data() {
    return {
      loading: true,
      error: '',
      questions: [],
      currentIndex: 0,
      showResult: false,
      userAnswers: {},
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || null
    },
    answeredCount() {
      return Object.keys(this.userAnswers).length
    },
    correctCount() {
      return this.questions.reduce((count, question) => {
        return this.userAnswers[question.id] === question.correct_answer ? count + 1 : count
      }, 0)
    },
    incorrectCount() {
      return this.answeredCount - this.correctCount
    },
    points() {
      return this.correctCount * 10
    },
  },
  methods: {
    async loadQuiz() {
      this.loading = true
      this.error = ''

      try {
        const response = await fetch(QUIZ_URL)
        if (!response.ok) {
          throw new Error('Quiz API request failed')
        }

        const data = await response.json()
        const firstFive = (data.results || []).slice(0, 20)

        this.questions = firstFive.map((q, index) => {
          const options = this.shuffle([...q.incorrect_answers, q.correct_answer])
          return {
            ...q,
            id: `${index}-${q.question}`,
            options,
          }
        })

        if (!this.questions.length) {
          this.error = 'No quiz questions received from API.'
        }
      } catch (err) {
        this.error = 'Unable to load quiz. Please try again.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    shuffle(values) {
      const arr = [...values]
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
      return arr
    },
    selectAnswer(option) {
      if (!this.currentQuestion) return
      this.userAnswers[this.currentQuestion.id] = option
    },
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1
        this.showResult = false
      }
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex += 1
        this.showResult = false
      }
    },
    toggleResult() {
      this.showResult = !this.showResult
    },
  },
  mounted() {
    this.loadQuiz()
  },
}
</script>

<style scoped>
.quiz-wrap {
  max-width: 760px;
  margin: 0 auto;
}

.quiz-wrap h2 {
  margin: 0 0 16px;
}

.score-board {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.score-pill {
  border: 1px solid #c9d4ce;
  border-radius: 10px;
  background: #ffffff;
  padding: 10px 12px;
  font-weight: 600;
  text-align: center;
}

.quiz-card {
  background: #fff;
  border: 1px solid #d9e6dd;
  border-radius: 12px;
  padding: 20px;
}

.meta {
  margin-top: 0;
  color: #5f6b76;
}

.answers {
  display: grid;
  gap: 10px;
  margin: 16px 0;
}

.option-btn {
  text-align: left;
  border: 1px solid #c9d4ce;
  border-radius: 8px;
  background: #f9fbfa;
  padding: 10px 12px;
  cursor: pointer;
}

.option-btn.selected {
  border-color: #42b983;
  background: #e9f7f0;
}

.option-btn.correct {
  border-color: #2e8b57;
  background: #dff5e8;
}

.option-btn.wrong {
  border-color: #d84a4a;
  background: #fdeaea;
}

.result-line {
  margin-top: 0;
}

.slider-controls {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 16px;
}

.slider-controls button {
  flex: 1;
  border: none;
  border-radius: 8px;
  padding: 10px 12px;
  background: #42b983;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.slider-controls button:disabled {
  background: #a9c9bb;
  cursor: not-allowed;
}

.state {
  padding: 20px;
  background: #fff;
  border: 1px solid #d9e6dd;
  border-radius: 10px;
}

.error {
  color: #b93838;
}

@media (max-width: 720px) {
  .score-board {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
