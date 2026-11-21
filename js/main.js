
document.addEventListener("DOMContentLoaded", function () {

    // 1. 获取页面元素
    const exploreBtn = document.querySelector("#exploreBtn");
    const islandSection = document.querySelector("#island");
    const places = document.querySelectorAll(".place");
    const growthNav = document.querySelector("#growthNav");

    // 2. 开启探索之旅：恢复最初的滚动方式
    if (exploreBtn && islandSection) {

        exploreBtn.addEventListener("click", function () {

            islandSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }

    // 3. 四个建筑的页面跳转
    const placePages = {
        tree: "tree.html",
        post: "post.html",
        challenge: "challenge.html",
        growth: "profile.html"
    };

    places.forEach(function (place) {

        place.addEventListener("click", function () {

            const placeName = place.dataset.place;
            const targetPage = placePages[placeName];

            if (targetPage) {
                window.location.href = targetPage;
            }

        });

    });

    // 4. 我的成长导航
    if (growthNav) {

        growthNav.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "profile.html";
        });

    }

    // 5. 初始化
    console.log("HEART ISLAND 诚信星球启动成功！");

});
