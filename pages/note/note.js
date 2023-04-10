$(function () {
  // 获取某个函数的底部偏移量 top值+元素高
  function getBottom(el) {
    // 元素的顶部 top
    const top = $(el).css("top");
    // 元素的高度 el_height
    const height = $(el).height();
    // console.log({ top, height });
    return parseFloat(top) + height;
  }

  let pno = 1;

  let loading = false;

  function getData(p) {
    // 如果 .nomore 元素, 已经处于显示状态, 则不再发请求
    if ($(".nomore:visible").length == 1) return;

    if (loading) return;

    loading = true;

    var url = "https://serverms.xin88.top/note?page=" + p;

    $.get(url, (data) => {
      loading = false;

      console.log("笔记数据:", data);

      $(".note-content").append(
        data.data.map((value) => {
          // 为什么服务器要提供宽和高?
          // 因为我们的图片属于网络图, 涉及到异步加载, 只有加载完毕后才能得到图片的宽高, 无法满足当前的需求
          const { cover, favorite, head_icon, name, title, width, height } =
            value;

          // 图片有两种宽度, 这种宽高比一定相同, 应该等比例计算
          // 1. 原始宽高
          // 2. 显示宽高
          const img_w = 242.5; //显示的宽度
          const img_h = (img_w * height) / width; //显示时的高度

          return `<li>
          <img src="./assets/img/note/${cover}"
          style="width:${img_w}px; height:${img_h}px" alt="">
          <p>${title}</p>
          <div>
            <div>
              <img src="./assets/img/note/${head_icon}" alt="">
              <span>${name}</span>
            </div>
            <span>${favorite}</span>
          </div>
        </li>`;
        })
      );

      // 对所有已添加到页面上的li 进行位置的计算
      // each 类似数组的 forEach, 是jQuery提供的用于遍历查询到的元素的方法
      // 参数1: 序号;  参数2: 元素;
      const els = [];

      $(".note-content>li").each((i, el) => {
        // console.log(i, el);
        // 读取宽度
        const w = $(el).width();
        // 对前4个元素进行布局: 即序号 0 1 2 3 的元素
        if (i < 4) {
          $(el).css({ left: i * w + i * 10, top: 0 });
          els.push(el);
        } else {
          // 非前四个元素
          // 每次布局都要找到已经布局的元素中，bottom最小的
          let el_min = els[0];
          els.forEach((v) => {
            // var b=getBottom(v);
            // console.log(b);

            if (getBottom(v) < getBottom(el_min)) {
              el_min = v;
            }
          });
          $(el).css({
            left: $(el_min).css("left"),
            top: getBottom(el_min) + 10,
          });
          const index = els.indexOf(el_min);
          els.splice(index, 1, el);
        }
      });

      let el_max = els[0];
      els.forEach((v) => {
        if (getBottom(v) > getBottom(el_max)) {
          el_max = v;
          $(".note-content").height(getBottom(el_max));
        }
      });
      console.log(el_max);

      const { page, pageCount } = data;

      pno = page;

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

  $(window).on("scroll", function () {
    const top = $(window).scrollTop();

    const win_h = $(window).height();
    const dom_h = $(document).height();
    const offset_bottom = dom_h - win_h;

    if (top > offset_bottom - 150) {
      // getData(pno + 1)
    }
  });
});
