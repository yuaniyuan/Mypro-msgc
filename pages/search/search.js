$(function () {
  $('.search>.sort').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active')
    getData(1)
  })

  function getData(p) {
    // 读取地址兰kw的属性值 通过url传递给服务器
    const kw=new URLSearchParams(location.search).get('kw')

    // 读取当前的排序类型
    const type=$('.search>.sort>li.active').data('type')
    console.log(type);

    var url = `https://serverms.xin88.top/mall/search?type=${type}&page=${p}&kw=${kw}`;
    console.log(url);


    $.get(url, (data) => {
      console.log("搜索数据:", data);

      $(".search-content").html(
        data.data.map((value) => {
          const { name, pic, price, sale_count } = value;
          
          // kw关键字变红色
          const rename=name.replace(
            (kw,'g'),`<span style="color:red">${kw}</span>`)

          return `<li>
        <img src="./assets/img/mall/${pic}" alt="">
        <div>
          <h3>${rename}</h3>
          <b>¥${price}</b>
          <span>销量:${sale_count}</span>
        </div>
      </li>`;
        })
      );

      const { page, pageCount } = data;

      let start = page - 2;
      let end = page + 2;

      if (start < 1) {
        start = 1;
        end = start + 4;
      }

      if (end > pageCount) {
        end = pageCount;
        start =Math.max(end-4,1)
      }

      $(".search>.pages>ul").empty();

      for (let i = start; i <= end; i++) {
        $(".search>.pages>ul").append(
          `<li class="${page == i ? "active" : ""}">${i}</li>`
        );
      }

      $(window).scrollTop(0);

      // 关于按钮不可用时的做法:
      // 利用 prop 方法, 修改按钮的 disabled 属性,  true代表不可用, false代表可用

      const $btn_next = $(".search>.pages>.next");
      const $btn_prev = $(".search>.pages>.prev");
      page == 1
        ? $btn_prev.prop("disabled", true)
        : $btn_prev.prop("disabled", false);
      page == pageCount
        ? $btn_next.prop("disabled", true)
        : $btn_next.prop("disabled", false);
    });
  }

  getData(1);

  $(".search>.pages>ul").on("click", "li", function () {
    getData($(this).text());
  });

  $(".search>.pages>.next").click(function () {
    const p = $(".search>.pages>ul>li.active").text() * 1;
    getData(p + 1);
  });

  $(".search>.pages>.prev").click(function () {
    const p = $(".search>.pages>ul>li.active").text() * 1;
    getData(p - 1);
  });
});
