
/* =========================
   1. 获取页面元素
========================= */

const letterForm = document.querySelector("#letterForm");

const receiver = document.querySelector("#receiver");

const letterTitle = document.querySelector("#letterTitle");

const letterContent = document.querySelector("#letterContent");

const sender = document.querySelector("#sender");

const wordCount = document.querySelector("#wordCount");

const resetBtn = document.querySelector("#resetBtn");

const previewReceiver = document.querySelector("#previewReceiver");

const previewTitle = document.querySelector("#previewTitle");

const previewContent = document.querySelector("#previewContent");

const previewSender = document.querySelector("#previewSender");

const previewDate = document.querySelector("#previewDate");

const letterTotal = document.querySelector("#letterTotal");

const letterList = document.querySelector("#letterList");

const postToast = document.querySelector("#postToast");

const letterModal = document.querySelector("#letterModal");

const modalClose = document.querySelector("#modalClose");


// =========================
// 2. 设置本地存储
// =========================

const STORAGE_KEY = "heartIslandGratitudeLetters";


// =========================
// 3. 读取已经保存的信件
// =========================

function loadLetters() {

    try {

        const savedLetters = JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

        if (Array.isArray(savedLetters)) {

            return savedLetters.filter(letter => {

                return (
                    letter &&
                    typeof letter.id === "string" &&
                    typeof letter.receiver === "string" &&
                    typeof letter.title === "string" &&
                    typeof letter.content === "string" &&
                    typeof letter.sender === "string" &&
                    typeof letter.date === "string"
                );

            });

        }

    } catch (error) {

        console.error("读取信件失败：", error);

    }

    return [];

}


let letters = loadLetters();


// =========================
// 4. 保存信件数据
// =========================

function saveLetters() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(letters)
        );

        return true;

    } catch (error) {

        console.error("保存信件失败：", error);

        showToast("保存失败，请检查浏览器存储空间");

        return false;

    }

}


// =========================
// 5. 获取当前日期
// =========================

function getToday() {

    const now = new Date();

    const year = now.getFullYear();

    const month = String(
        now.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        now.getDate()
    ).padStart(2, "0");

    return `${year}年${month}月${day}日`;

}


// =========================
// 6. 实时预览信件
// =========================

function updatePreview() {

    const selectedReceiver = receiver.value;

    const title = letterTitle.value.trim();

    const content = letterContent.value;

    const name = sender.value.trim();


    previewReceiver.textContent = selectedReceiver
        ? `亲爱的${selectedReceiver}：`
        : "亲爱的收件人：";


    previewTitle.textContent = title || "一封温暖的信";


    previewContent.textContent = content ||
        "这里将展示你写下的感恩内容。\n\n每一份感谢，都能让世界变得更加温暖。";


    previewSender.textContent = name || "你的朋友";


    previewDate.textContent = getToday();


    wordCount.textContent =
        `${letterContent.value.length} / 500`;

}


// =========================
// 7. 监听输入变化
// =========================

receiver.addEventListener("change", updatePreview);

letterTitle.addEventListener("input", updatePreview);

letterContent.addEventListener("input", updatePreview);

sender.addEventListener("input", updatePreview);


// =========================
// 8. 显示提示信息
// =========================

let toastTimer;

function showToast(message) {

    postToast.textContent = `💌 ${message}`;

    postToast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        postToast.classList.remove("show");

    }, 2500);

}


// =========================
// 9. 渲染已保存的信件
// =========================

function renderLetters() {

    letterList.innerHTML = "";

    letterTotal.textContent = letters.length;


    // 没有信件时显示空状态
    if (letters.length === 0) {

        const empty = document.createElement("div");

        empty.className = "empty-letters";

        const icon = document.createElement("div");

        icon.className = "empty-icon";

        icon.textContent = "💌";

        const title = document.createElement("h3");

        title.textContent = "你的信箱还是空的";

        const description = document.createElement("p");

        description.textContent =
            "写下第一封感恩信，把温暖收藏起来吧。";

        empty.append(icon, title, description);

        letterList.appendChild(empty);

        return;

    }


    // 从最新的信件开始显示
    const sortedLetters = [...letters].reverse();


    sortedLetters.forEach(letter => {

        const card = document.createElement("article");

        card.className = "letter-card";


        const icon = document.createElement("div");

        icon.className = "card-icon";

        icon.textContent = "💌";


        const title = document.createElement("h3");

        title.textContent = letter.title;


        const receiverText = document.createElement("p");

        receiverText.className = "card-receiver";

        receiverText.textContent = `致：${letter.receiver}`;


        const content = document.createElement("p");

        content.className = "card-content";

        content.textContent = letter.content;


        const bottom = document.createElement("div");

        bottom.className = "card-bottom";


        const date = document.createElement("span");

        date.className = "card-date";

        date.textContent = letter.date;


        const actions = document.createElement("div");

        actions.className = "card-actions";


        const viewBtn = document.createElement("button");

        viewBtn.type = "button";

        viewBtn.textContent = "查看";

        viewBtn.addEventListener("click", () => {

            viewLetter(letter.id);

        });


        const deleteBtn = document.createElement("button");

        deleteBtn.type = "button";

        deleteBtn.className = "delete-letter";

        deleteBtn.textContent = "删除";

        deleteBtn.addEventListener("click", () => {

            deleteLetter(letter.id);

        });


        actions.append(viewBtn, deleteBtn);

        bottom.append(date, actions);

        card.append(
            icon,
            title,
            receiverText,
            content,
            bottom
        );

        letterList.appendChild(card);

    });

}


// =========================
// 10. 保存一封新信件
// =========================

letterForm.addEventListener("submit", (event) => {

    // 同步保存感谢信记录，供成长档案读取
    const savedLetters = JSON.parse(
        localStorage.getItem("thankLetters") || "[]"
    );

    savedLetters.push({
        title: letterTitle.value.trim(),
        date: new Date().toLocaleString("zh-CN"),
        timestamp: Date.now()
    });

    localStorage.setItem(
        "thankLetters",
        JSON.stringify(savedLetters)
    );


    event.preventDefault();


    const newLetter = {

        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,

        receiver: receiver.value,

        title: letterTitle.value.trim(),

        content: letterContent.value.trim(),

        sender: sender.value.trim(),

        date: getToday()

    };


    // 检查内容
    if (
        !newLetter.receiver ||
        !newLetter.title ||
        !newLetter.content ||
        !newLetter.sender
    ) {

        showToast("请先填写完整的信件内容");

        return;

    }


    // 保存到数组
    letters.push(newLetter);


    // 保存到浏览器
    if (!saveLetters()) {

        letters.pop();

        return;

    }


    // 更新信件列表
    renderLetters();


    // 清空表单
    letterForm.reset();

    updatePreview();


    // 显示提示
    showToast("信件已成功收藏！");

    console.log("新信件已保存：", newLetter);

});


// =========================
// 11. 查看已经保存的信件
// =========================

function viewLetter(id) {

    const letter = letters.find(item => item.id === id);

    if (!letter) {

        return;

    }


    document.querySelector("#modalTitle").textContent =
        letter.title;


    document.querySelector("#modalReceiver").textContent =
        `亲爱的${letter.receiver}：`;


    document.querySelector("#modalBody").textContent =
        letter.content;


    document.querySelector("#modalSender").textContent =
        `写信人：${letter.sender}`;


    document.querySelector("#modalDate").textContent =
        letter.date;


    letterModal.classList.add("show");

    letterModal.setAttribute("aria-hidden", "false");

    modalClose.focus();

}


// =========================
// 12. 关闭信件弹窗
// =========================

function closeModal() {

    letterModal.classList.remove("show");

    letterModal.setAttribute("aria-hidden", "true");

}


modalClose.addEventListener("click", closeModal);


letterModal.addEventListener("click", (event) => {

    if (event.target === letterModal) {

        closeModal();

    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeModal();

    }

});


// =========================
// 13. 删除信件
// =========================

function deleteLetter(id) {

    const confirmed = confirm(
        "确定要删除这封感恩信吗？删除后无法恢复。"
    );


    if (!confirmed) {

        return;

    }


    const oldLetters = letters;

    letters = letters.filter(letter => letter.id !== id);


    if (!saveLetters()) {

        letters = oldLetters;

        return;

    }


    renderLetters();

    showToast("这封信已经从信箱中删除");

}


// =========================
// 14. 清空重写
// =========================

resetBtn.addEventListener("click", () => {

    const hasContent =
        receiver.value ||
        letterTitle.value ||
        letterContent.value ||
        sender.value;


    if (!hasContent) {

        return;

    }


    const confirmed = confirm(
        "确定要清空当前正在编写的内容吗？"
    );


    if (!confirmed) {

        return;

    }


    letterForm.reset();

    updatePreview();

    showToast("已经为你准备好一张新信纸");

});


// =========================
// 15. 页面初始化
// =========================

function init() {

    updatePreview();

    renderLetters();

    console.log("感恩邮局启动成功！");

}


init();
