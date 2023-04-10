$(() => {
  var url = "https://serverms.xin88.top/index";

  $.get(url, (data) => {
    console.log("首页数据", data);

    $(".hot-video>ul").html(
      data.hot_video.map((v) => {
        const { mp4, pic, vname } = v;
        return `
        <li>
          <video src="./assets/video/${mp4}" preload="metadata"></video>
          <i></i>
          <b>${vname}</b>
        </li>
        `;
      })
    );

    $(".home-content>.area-1>.area-1-left>.hot-search>div").html(
      data.today_hot.map((v) => {
        const { name, emphasize } = v;
        return `
          <a class="${
            emphasize ? "active" : ""
          }"href="?p=search&kw=${name}">${name}</a>
        `;
      })
    );

    $(".hot-video>ul>li").on("click", function () {
      // console.log(this);
      if ($(this).hasClass("active")) {
        $(this).removeAttr("class").siblings().removeAttr("class");
      } else {
        $(this)
          .siblings()
          .removeAttr("class")
          .end()
          .removeAttr("class")
          .addClass("active")
          .siblings()
          .addClass("noactive");
      }

      $("video").each(function () {
        if ($(this).parent().hasClass("active")) {
          this.play();
        } else {
          this.pause();
        }
      });
    });

    $(".today-meal>div:first-child>ul").html(
      data.today_meal.map((v, i) => {
        const { cate_name } = v;

        return `
          <li class="${i == 0 ? "active" : ""}">${cate_name}</li>
        `;
      })
    );

    $(".today-meal").on("click", "li", function () {
      $(this).addClass("active").siblings().removeAttr("class");
      const i = $(this).index() * 3;

      mySwiper.slideTo(i, 1000);
    });

    data.today_meal.map((v, i) => {
      const { contents } = v;

      contents.forEach((e) => {
        const { pic, title, desc } = e;
        $(".swiper-wrapper").append(`
          <div class="swiper-slide">
            <img src="./assets/img/food/${pic}" alt="">
            <b>${title}</b>
            <span>${desc}</span>
          </div>
          `);
      });
    });
    mySwiper.slideTo(0, 0);

    $(".index-items").html(
      data.index_items.map((v) => {
        const { title, items } = v;

        const lis = items.map((v) => {
          const { author, desc, pic, title: el } = v;
          return `
            <li>
              <div>
                <img src="./assets/img/food/${pic}" alt="">
                <span>${author}</span>
              </div>
              <b>${el}</b>
              <p>${desc}</p>
            </li>`;
        });

        return `
        <div>
          <h2>${title}</h2>
          <ul>${lis}</ul>
        </div>
      `;
      })
    );
  });

  var mySwiper = new Swiper(".swiper", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 10,
    effect: "coverflow",
    speed: 1000,
    on: {
      slideChange() {
        let i = this.activeIndex / 3;
        $(".today-meal li").eq(i).click();
      },
    },
  });

  // 每隔3秒 切换一次动画
  setInterval(() => {
    $(".area-1-right").toggleClass("active");
  }, 3000);
});
