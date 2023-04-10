// 准备就绪的写法:
$(function () {
  function getData(p) {
    var url = `https://serverms.xin88.top/video?page=${p}`;

    $.get(url, (data) => {
      console.log("菜谱数据:", data);

      $(".menu-content").html(
        data.data.map((value) => {
          const { duration, pic, title, views } = value;

          return `<li>
          <div>
            <img src="./assets/img/video/${pic}" alt="">
            <div>
              <span>${views}次播放</span>
              <span>${duration}</span>
            </div>
          </div>
          <p>${title}</p>
        </li>`;
        })
      );

      // 分页的展示部分
      const { page, pageCount } = data;

      let start = page - 2;
      let end = page + 2;

      if (start < 1) {
        start = 1;
        end = 5;
      }

      if (end > pageCount) {
        end = pageCount;
      }

      $('.menu>.pages>ul').empty()

      for (let i = start; i <= end; i++) {
        // i和当前页相同时 要添加激活样式
        $(".menu>.pages>ul").append(
          `<li class=${page == i ? "active" : ""}>${i}</li>`
        );
      }

      if(page==1) {
        $('.menu>.pages>.prev').hide()
      }else{
        $('.menu>.pages>.prev').show()
      }

      const $btn_next=$('.menu>.pages>.next')
      page==pageCount ? $btn_next.hide() : $btn_next.show()

      // 统一体验 滚动到顶部
      $(window).scrollTop(0)
    });
  }

  getData(1)

  $('.menu>.pages').on('click','li',function(){
    console.log($(this));
    getData($(this).text())
  })

  $('.menu>.pages>.next').click(function(){
    const p=$('.menu>.pages>ul>li.active').text()*1
    getData(p+1)
  })

  $('.menu>.pages>.prev').click(function(){
    const p=$('.menu>.pages>ul>li.active').text()
    getData(p-1)
  })
});
