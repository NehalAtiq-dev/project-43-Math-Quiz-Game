        // --- GAME STATE ---
        let currentQuestion = { num1: 0, num2: 0, answer: 0 };
        let score = 0;
        
        // --- DOM REFERENCES ---
        const scoreDisplay = document.getElementById('score-display');
        const questionDisplay = document.getElementById('question-display');
        const answerInput = document.getElementById('answer-input');
        const checkBtn = document.getElementById('check-btn');
        const feedbackMessage = document.getElementById('feedback-message');

        /**
         * Generates a new simple addition question (e.g., 5 + 8).
         */
        function generateQuestion() {
            // Generate two random numbers between 1 and 10 for simple math
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            
            currentQuestion.num1 = num1;
            currentQuestion.num2 = num2;
            currentQuestion.answer = num1 + num2;

            questionDisplay.textContent = `${num1} + ${num2} = ?`;
            answerInput.value = ''; // Clear previous input
            feedbackMessage.textContent = ''; // Clear previous feedback
            answerInput.focus(); // Focus on the input field
        }

        /**
         * Updates the score display in the UI.
         */
        function updateScoreDisplay() {
            scoreDisplay.textContent = score;
        }

        /**
         * Displays a feedback message (correct or incorrect) in the UI.
         * @param {string} message - The text to display.
         * @param {string} colorClass - Tailwind class for text color (e.g., 'text-green-600').
         */
        function showFeedback(message, colorClass) {
            feedbackMessage.className = `text-center font-semibold mt-4 min-h-[1.5rem] ${colorClass}`;
            feedbackMessage.textContent = message;

            // Clear the feedback after a short delay
            setTimeout(() => {
                feedbackMessage.textContent = '';
                feedbackMessage.className = `text-center font-semibold mt-4 min-h-[1.5rem]`;
            }, 2000);
        }

        /**
         * Event handler for checking the user's answer.
         */
        function checkAnswer() {
            const userAnswer = parseInt(answerInput.value.trim(), 10);

            // Basic input validation
            if (isNaN(userAnswer)) {
                showFeedback("Please enter a number!", 'text-red-500');
                return;
            }

            if (userAnswer === currentQuestion.answer) {
                // Correct answer!
                score += 10;
                updateScoreDisplay();
                showFeedback("Correct! 🎉 Keep going!", 'text-green-600');
                
                // Load the next question after a brief pause
                setTimeout(generateQuestion, 500); 

            } else {
                // Incorrect answer
                score = Math.max(0, score - 5); // Subtract a few points, don't go below 0
                updateScoreDisplay();
                showFeedback("Oops! Try again.", 'text-red-600');
            }
        }
        
        // --- EVENT LISTENERS ---
        checkBtn.addEventListener('click', checkAnswer);

        // Allow pressing Enter key to check the answer
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });


        // --- INITIALIZATION ---
        window.onload = () => {
            generateQuestion();
            updateScoreDisplay();
        };
