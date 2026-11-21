
document.addEventListener("DOMContentLoaded", function () {

    // 获取页面元素
    const challengeCount = document.getElementById("challengeCount");
    const bestScore = document.getElementById("bestScore");
    const letterCount = document.getElementById("letterCount");
    const totalScore = document.getElementById("totalScore");
    const growthMessage = document.getElementById("growthMessage");
    const recordList = document.getElementById("recordList");

    // 读取本地存储数据
    function getStorage(key, defaultValue) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error("读取数据失败：", error);
            return defaultValue;
        }
    }

    // 读取挑战记录和感谢信
    const challengeRecords = getStorage("integrityChallenges", []);
    const letters = getStorage("thankLetters", []);

    // 统计挑战数据
    const completedCount = challengeRecords.length;

    const scores = challengeRecords.map(item => Number(item.score) || 0);

    const highestScore = scores.length > 0
        ? Math.max(...scores)
        : 0;

    const accumulatedScore = scores.reduce(
        (sum, score) => sum + score,
        0
    );

    // 更新统计数据
    challengeCount.textContent = completedCount;
    bestScore.textContent = highestScore;
    letterCount.textContent = letters.length;
    totalScore.textContent = accumulatedScore;

    // 更新徽章
    function unlockBadge(id, unlocked) {
        const badge = document.getElementById(id);

        if (!badge) return;

        if (unlocked) {
            badge.classList.add("unlocked");
            badge.querySelector(".badge-status").textContent = "✦ 已点亮";
        }
    }

    unlockBadge("badgeStarter", completedCount >= 1);
    unlockBadge("badgePerfect", highestScore >= 100);
    unlockBadge("badgeWriter", letters.length >= 1);
    unlockBadge("badgeMaster", completedCount >= 5);

    // 根据成长情况生成寄语
    function updateGrowthMessage() {

        if (completedCount === 0 && letters.length === 0) {
            growthMessage.textContent =
                "每一次诚实的选择，都在让你成为更好的自己。完成第一次挑战，开启你的成长旅程吧！";
        } else if (highestScore === 100 && completedCount > 0) {
            growthMessage.textContent =
                "太棒了！你已经展现出优秀的诚信意识。愿你继续保持这份认真与坚持，让诚信成为生活中的习惯。";
        } else if (completedCount >= 5) {
            growthMessage.textContent =
                "坚持本身就是一种成长！你已经完成了多次诚信挑战，愿你把每一次思考都变成生活中的实际行动。";
        } else if (completedCount > 0 || letters.length > 0) {
            growthMessage.textContent =
                "你已经迈出了成长的第一步。每一次认真思考、每一份主动表达的感谢，都让这个世界多了一份温暖。";
        }
    }

    updateGrowthMessage();

    // 生成成长记录
    function renderRecords() {

        const allRecords = [];

        // 加入挑战记录
        challengeRecords.forEach((item, index) => {
            allRecords.push({
                type: "challenge",
                title: "完成诚信挑战",
                description: "获得 " + (Number(item.score) || 0) + " 分",
                date: item.date || "",
                icon: "🏆",
                order: item.timestamp || 0
            });
        });

        // 加入感谢信记录
        letters.forEach(item => {
            allRecords.push({
                type: "letter",
                title: "写下一封感谢信",
                description: item.title || "一封温暖的感谢信",
                date: item.date || "",
                icon: "💌",
                order: item.timestamp || 0
            });
        });

        // 按时间倒序排列
        allRecords.sort((a, b) => b.order - a.order);

        if (allRecords.length === 0) {
            recordList.innerHTML = `
                <div class="empty-record">
                    <span>📖</span>
                    <p>暂时还没有成长记录</p>
                    <small>完成挑战或写下感谢信后，记录就会出现在这里。</small>
                </div>
            `;
            return;
        }

        recordList.innerHTML = "";

        allRecords.forEach(item => {

            const recordItem = document.createElement("div");
            recordItem.className = "record-item";

            const icon = document.createElement("div");
            icon.className = "record-icon";
            icon.textContent = item.icon;

            const content = document.createElement("div");
            content.className = "record-content";

            const title = document.createElement("h3");
            title.textContent = item.title;

            const description = document.createElement("p");
            description.textContent = item.description;

            const date = document.createElement("span");
            date.className = "record-date";
            date.textContent = item.date || "日期未记录";

            content.appendChild(title);
            content.appendChild(description);

            recordItem.appendChild(icon);
            recordItem.appendChild(content);
            recordItem.appendChild(date);

            recordList.appendChild(recordItem);
        });
    }

    renderRecords();

});
