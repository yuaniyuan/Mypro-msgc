$(function () {
  let page = 1;
  let loading=false;

  function getData(p) {
    
    if (loading) return;
    loading = true;
    
    var url = `https://douyu.xin88.top/api/room/list?page=${p}&type=ms`;

    $.get(url, (data) => {
      loading = false;
      console.log("直播数据:", data);

      $(".live-content").append(
        data.data.list.map((value) => {
          const { hn, nickname, roomName, roomSrc } = value;
          console.log(2);
          return `<li>
          <div>
            <img src="${roomSrc}" alt="">
            <p class="hn">${hn}</p>
            <p class="nickname">${nickname}</p>
          </div>
          <p>${roomName}</p>
        </li>`;
        })
      );
      const { nowPage, pageCount } = data.data;
      page = nowPage;

      if (p == 1) {
        getData(2);
        console.log(3);
      }

      if (page == pageCount) {
        $(".nomore").show();
        $(".loading").hide();
      } else {
        $(".nomore").hide();
        $(".loading").show();
      }
    });
  }

  getData(1);

  // $(window).on("scroll", function () {
  //   const top = $(this).scrollTop();
  //   const height = $(this).height();
  //   const d_height = $(document).height();

  //   if (Math.round(top) + height > d_height - 50) {
  //     getData(page + 1);
  //   }
  // });
});
