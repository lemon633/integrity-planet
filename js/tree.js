
/* =========================
   1. 获取页面元素
========================= */

const todayDate = document.querySelector("#todayDate");

const taskTitle = document.querySelector("#taskTitle");

const taskDescription = document.querySelector("#taskDescription");

const completeBtn = document.querySelector("#completeBtn");

const completeHint = document.querySelector("#completeHint");

const totalLeaves = document.querySelector("#totalLeaves");

const totalDays = document.querySelector("#totalDays");

const leafContainer = document.querySelector("#leafContainer");

const recordText = document.querySelector("#recordText");

const successToast = document.querySelector("#successToast");


// =========================
// 2. 每日诚信任务
// =========================

const tasks = [

    {
        title: "说到做到",
        description: "今天答应别人的事情，努力按时完成，不轻易食言。"
    },

    {
        title: "诚实面对错误",
        description: "如果今天做错了事情，勇敢承认，并主动想办法改正。"
    },

    {
        title: "不隐瞒真实情况",
        description: "遇到问题时，不编造理由，真实表达自己的想法。"
    },

    {
        title: "认真完成承诺",
        description: "认真完成自己答应的任务，不敷衍、不拖延。"
    },

    {
        title: "归还拾到的物品",
        description: "如果发现别人遗失的物品，主动寻找失主或交给老师。"
    },

    {
        title: "考试诚信",
        description: "认真对待学习和考试，坚持独立思考，诚信完成自己的作业。"
    },

    {
        title: "珍惜他人的信任",
        description: "认真倾听别人的请求，不随意传播别人托付给你的秘密。"
    }

];


// =========================
// 3. 获取今天的日期
// =========================

function getToday() {

    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// =========================
// 4. 选择今日任务
// =========================

function getTodayTask() {

    const today = getToday();

    const dateNumber = Number(today.replaceAll("-", ""));

    const index = dateNumber % tasks.length;

    return tasks[index];

}


// =========================
// 5. 读取本地成长记录
// =========================

const STORAGE_KEY = "heartIslandTreeData";

function loadData() {

    try {

        const savedData = JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

        if (
            savedData &&
            Array.isArray(savedData.completedDates) &&
            Number.isFinite(savedData.totalLeaves) &&
            savedData.totalLeaves >= 0
        ) {

            return {
                totalLeaves: Math.floor(savedData.totalLeaves),
                completedDates: [
                    ...new Set(savedData.completedDates.filter(
                        date => typeof date === "string"
                    ))
                ]
            };

        }

    } catch (error) {

        console.error("读取成长记录失败：", error);

    }

    return {
        totalLeaves: 0,
        completedDates: []
    };

}

let treeData = loadData();


// =========================
// 6. 保存成长记录
// =========================

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(treeData)
    );

}


// =========================
// 7. 绘制成长叶片
// =========================

function renderLeaves() {

    leafContainer.innerHTML = "";

    const positions = [

        [35, 27],
        [53, 19],
        [62, 35],
        [27, 43],
        [47, 49],
        [70, 52],
        [36, 60],
        [56, 67],
        [24, 32],
        [74, 40],
        [45, 15],
        [63, 23],
        [31, 52],
        [52, 39],
        [68, 63],
        [39, 36],
        [58, 56],
        [22, 65],
        [76, 29],
        [48, 58],
        [33, 20],
        [65, 46],
        [43, 68],
        [55, 28]

    ];

    // 最多显示24片装饰叶子
    const displayCount = Math.min(
        treeData.totalLeaves,
        positions.length
    );

    for (let i = 0; i < displayCount; i++) {

        const leaf = document.createElement("span");

        leaf.className = "growth-leaf";

        leaf.textContent = "🍃";

        leaf.style.left = positions[i][0] + "%";

        leaf.style.top = positions[i][1] + "%";

        leaf.style.animationDelay = `${i * 0.04}s`;

        leafContainer.appendChild(leaf);

    }

}


// =========================
// 8. 更新页面数据
// =========================

function updatePage() {

    const today = getToday();

    const task = getTodayTask();

    todayDate.textContent = today;

    taskTitle.textContent = task.title;

    taskDescription.textContent = task.description;

    totalLeaves.textContent = treeData.totalLeaves;

    totalDays.textContent = treeData.completedDates.length;

    renderLeaves();

    const completedToday =
        treeData.completedDates.includes(today);

    if (completedToday) {

        completeBtn.disabled = true;

        completeBtn.textContent = "✓ 今日任务已完成";

        completeHint.textContent =
            "今天已经完成任务啦，明天继续坚持！";

        recordText.textContent =
            "今天的诚信行动已经被记录，继续保持！";

    } else {

        completeBtn.disabled = false;

        completeBtn.innerHTML =
            '我已完成今日任务 <span>→</span>';

        completeHint.textContent =
            "完成任务，让诚信之树长出一片新叶子。";

        recordText.textContent =
            "每一次守信，都值得被记录。";

    }

}


// =========================
// 9. 显示完成提示
// =========================

function showSuccessToast() {

    successToast.classList.add("show");

    setTimeout(() => {

        successToast.classList.remove("show");

    }, 2500);

}


// =========================
// 10. 完成今日任务
// =========================

completeBtn.addEventListener("click", () => {

    const today = getToday();

    // 防止重复完成
    if (treeData.completedDates.includes(today)) {

        return;

    }

    // 累计成长叶片
    treeData.totalLeaves++;

    // 记录完成日期
    treeData.completedDates.push(today);

    // 保存到浏览器
    saveData();

    // 更新页面
    updatePage();

    // 显示成功提示
    showSuccessToast();

    console.log("今日诚信任务完成！");

});


// =========================
// 11. 页面初始化
// =========================

updatePage();

console.log("诚信之树页面启动成功！");
