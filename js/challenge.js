
/* ========================================
   诚信挑战站 · INTEGRITY CHALLENGE
   JavaScript 交互功能
======================================== */

/* 1. 获取 HTML 页面中的元素 */

const startBtn = document.getElementById("startBtn");

const introPanel = document.querySelector(".challenge-intro");
const quizPanel = document.getElementById("quizPanel");
const resultPanel = document.getElementById("resultPanel");

const questionNumber = document.getElementById("questionNumber");
const scoreElement = document.getElementById("score");

const progressBar = document.getElementById("progressBar");

const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");

const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");

const restartBtn = document.getElementById("restartBtn");


/* 2. 创建题目数组 */

const questions = [

    {
        question: "考试时，你发现自己有一道题不会做，这时同桌主动把答案递给你，你应该怎么做？",

        options: [
            "A. 接过答案，先完成考试",
            "B. 拒绝作弊，独立完成考试",
            "C. 看一眼答案，再自己填写",
            "D. 让同桌帮自己全部完成"
        ],

        answer: 1,

        explanation: "诚信考试意味着对自己的学习成果负责。即使遇到不会的题目，也应该坚持独立完成。"
    },

    {
        question: "你向朋友借了一本书，约定一周后归还，但你还没有看完，你应该怎么做？",

        options: [
            "A. 不归还，等看完再说",
            "B. 假装忘记了这件事",
            "C. 主动联系朋友，说明情况并重新约定时间",
            "D. 把书送给其他同学"
        ],

        answer: 2,

        explanation: "遵守约定是诚信的重要表现。如果无法按时完成约定，应该主动沟通，而不是逃避责任。"
    },

    {
        question: "你在学校里捡到一个钱包，里面有现金和联系方式，你应该怎么做？",

        options: [
            "A. 把现金留下",
            "B. 交给老师或学校失物招领处",
            "C. 放在原地不管",
            "D. 拿走钱包，等失主自己寻找"
        ],

        answer: 1,

        explanation: "拾金不昧体现了诚实守信。发现他人的遗失物品，应尽力交还失主。"
    },

    {
        question: "小组合作完成作业时，其中一位同学贡献了很多想法，你应该怎么做？",

        options: [
            "A. 把所有成果都说成是自己的",
            "B. 不提及任何人的贡献",
            "C. 如实说明每位成员的贡献",
            "D. 只表扬关系好的同学"
        ],

        answer: 2,

        explanation: "尊重他人的劳动成果，也是诚信的一部分。我们应该客观、真实地说明每个人的贡献。"
    },

    {
        question: "你不小心弄坏了同学的文具，但对方还不知道，你应该怎么做？",

        options: [
            "A. 悄悄放回去，不承认",
            "B. 推给其他同学",
            "C. 主动承认错误，并承担相应责任",
            "D. 假装什么都没有发生"
        ],

        answer: 2,

        explanation: "犯错并不可怕，重要的是勇于承认并承担责任。真诚面对错误，才能赢得他人的信任。"
    }

];


/* 3. 设置游戏状态 */

let currentQuestion = 0;

let score = 0;

let hasAnswered = false;

const totalQuestions = questions.length;


/* 4. 开始游戏 */

startBtn.addEventListener("click", function () {

    // 重置游戏数据
    currentQuestion = 0;
    score = 0;

    // 隐藏介绍页面
    introPanel.style.display = "none";

    // 显示答题页面
    quizPanel.style.display = "block";

    // 隐藏成绩页面
    resultPanel.style.display = "none";

    // 显示第一道题
    showQuestion();

});


/* 5. 显示题目 */

function showQuestion() {

    // 获取当前题目
    const current = questions[currentQuestion];

    // 更新题目编号
    questionNumber.textContent =
        `第${currentQuestion + 1}题 / 共${totalQuestions}题`;

    // 更新当前分数
    scoreElement.textContent =
        `当前得分：${score}`;

    // 更新进度条
    const progress =
        (currentQuestion / totalQuestions) * 100;

    progressBar.style.width = progress + "%";

    // 显示题目内容
    questionText.textContent = current.question;

    // 清空之前的选项
    optionsList.innerHTML = "";

    // 重置答题状态
    hasAnswered = false;

    // 隐藏反馈信息
    feedback.style.display = "none";
    feedback.className = "feedback";

    // 隐藏下一题按钮
    nextBtn.style.display = "none";

    // 恢复按钮文字
    nextBtn.textContent = "下一题 →";

    // 动态生成选项
    current.options.forEach(function (option, index) {

        const button = document.createElement("button");

        button.className = "option-btn";

        button.textContent = option;

        button.type = "button";

        // 点击选项时判断答案
        button.addEventListener("click", function () {

            checkAnswer(index);

        });

        optionsList.appendChild(button);

    });

}


/* 6. 判断答案 */

function checkAnswer(selectedIndex) {

    // 防止重复答题
    if (hasAnswered) {
        return;
    }

    hasAnswered = true;

    const current = questions[currentQuestion];

    const optionButtons =
        optionsList.querySelectorAll(".option-btn");

    const isCorrect =
        selectedIndex === current.answer;

    // 禁止继续点击所有选项
    optionButtons.forEach(function (button) {

        button.disabled = true;

    });

    // 标记正确答案
    optionButtons[current.answer].classList.add("correct");

    if (isCorrect) {

        // 回答正确，增加20分
        score += 20;

        feedback.textContent =
            "✓ 回答正确！" + current.explanation;

        feedback.className = "feedback correct";

    } else {

        // 回答错误，显示正确答案
        optionButtons[selectedIndex].classList.add("wrong");

        feedback.textContent =
            "✧ 再接再厉！正确答案是：" +
            current.options[current.answer] +
            "。" +
            current.explanation;

        feedback.className = "feedback wrong";

    }

    // 更新分数
    scoreElement.textContent =
        `当前得分：${score}`;

    // 显示反馈区域
    feedback.style.display = "block";

    // 显示下一题按钮
    nextBtn.style.display = "inline-block";

    // 最后一题修改按钮文字
    if (currentQuestion === totalQuestions - 1) {

        nextBtn.textContent = "查看最终成绩 →";

    }

}


/* 7. 进入下一题 */

nextBtn.addEventListener("click", function () {

    currentQuestion++;

    if (currentQuestion < totalQuestions) {

        // 继续显示下一道题
        showQuestion();

    } else {

        // 所有题目完成，显示最终成绩
        showResult();

    }

});


/* 8. 显示最终成绩 */

function showResult() {

    // 隐藏答题页面
    quizPanel.style.display = "none";

    // 显示成绩页面
    resultPanel.style.display = "block";

    // 更新最终成绩
    finalScore.textContent = score;

    // 完成进度
    progressBar.style.width = "100%";

    // 根据分数给出评价
    if (score === 100) {

        resultMessage.textContent =
            "太棒了！你是一位诚信小达人！";

    } else if (score >= 60) {

        resultMessage.textContent =
            "表现不错！继续坚持诚信的选择！";

    } else {

        resultMessage.textContent =
            "每一次思考都是成长，继续加油！";

    }

    // 保存本次挑战成绩
    const challengeRecords = JSON.parse(
        localStorage.getItem("integrityChallenges") || "[]"
    );

    challengeRecords.push({
        score: score,
        date: new Date().toLocaleString("zh-CN"),
        timestamp: Date.now()
    });

    localStorage.setItem(
        "integrityChallenges",
        JSON.stringify(challengeRecords)
    );

}


/* 9. 重新开始游戏 */

restartBtn.addEventListener("click", function () {

    // 恢复初始数据
    currentQuestion = 0;

    score = 0;

    hasAnswered = false;

    // 隐藏成绩页面
    resultPanel.style.display = "none";

    // 显示答题页面
    quizPanel.style.display = "block";

    // 重新开始第一道题
    showQuestion();

});
