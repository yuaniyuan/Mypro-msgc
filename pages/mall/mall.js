  $(function () {
    let nowPage = 1;
    let pageCount
    // 反复触发触底操作 则会触发同一个页面多次请求
    let loading = false;

    function getData(p) {
      var url = "https://serverms.xin88.top/mall?page=" + p;

      if(p==1){
        $.get(url,data=>{
          pageCount=data.pageCount
        })  
      }
      if(p>pageCount)return

      if (loading) return;
      loading = true;

      $.get(url, (data) => {
        loading = false;
        console.log("商城数据:", data);

        $(".mall-content").append(
          data.data.map((value) => {
            const { name, pic, price, sale_count } = value;

            return `<li>
            <img src="./assets/img/mall/${pic}" alt="">
            <p>${name}</p>
            <div>
              <b>¥${price}</b>
              <span>月售${sale_count}</span>
            </div>
          </li>`;
          })
        );

        const {page} = data;
        nowPage = page;

        if (page == pageCount) {
          $(".nomore").show();
          $('.loading').hide()
        } else {
          $(".nomore").hide();
          $('.loading').show()
        }
      });
    }

    getData(nowPage);

    $(window).on("scroll", function () {
      const top = $(this).scrollTop();
      const height = $(this).height();
      const d_height = $(document).height();
      // console.log(top,height,d_height);
      if (Math.round(top) + height > d_height - 50) {
        getData(nowPage + 1);
      }
    });
  });
