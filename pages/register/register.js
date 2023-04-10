$(function () {
  // 手机输入框添加获得焦点和失去焦点的事件监听
  $(".phone>input")
    .focus(function () {
      $(this).removeAttr("class").nextAll().hide();
    })
    .blur(function () {
      let phone = $(this).val();
      if (!phone) return;

      if (/^1[3-9]\d{9}$/.test(phone)) {
        let url = "https://serverms.xin88.top/users/checkPhone";
        // post请求 适合上传数据，具体请求有服务器规定
        $.post(url, { phone }, (data) => {
          console.log("手机号验证结果:", data);
          if (data.code === 202) {
            $(this).addClass("err").nextAll().last().show();
          }

          if (data.code === 200) {
            $(this).addClass("ok").next().show();
          }
        });
      } else {
        $(this).addClass("err");
        $(this).next().next().show();
      }
    });

  $(".password>input")
    .focus(function () {
      $(this).removeAttr("class").nextAll().hide();
    })
    .blur(function () {
      let password = $(this).val().length;
      if (!password) return;
      if (password >= 6 && password <= 12) {
        $(this).addClass("ok").next().show();
      } else {
        $(this).removeAttr("class").nextAll().last().show();
      }
    });

  $(".repassword>input")
    .focus(function () {
      $(this).removeAttr("class").nextAll().hide();
    })
    .blur(function () {
      let repassword = $(this).val();
      if (!repassword) return;
      let password = $(this).parent().prev().find("input").val();
      if (repassword === password) {
        $(this).addClass("ok").next().show();
      } else {
        $(this).removeAttr("class").nextAll().last().show();
      }
    });

  $(".btn").on("click", function () {
    const agree = $(".register>div>label>input");
    if (agree.prop("checked")) {
      if ($(".register p.ok:visible").length === 3) {
        let url = "https://serverms.xin88.top/users/register";
        let phone = $(".phone>input").val();
        let pwd = $(".password>input").val();
        $.post(url, { phone, pwd }, (data) => {
          if(data.code==200){
            alert(`恭喜注册成功，成为本站第${data.id}名用户`)
            location.replace('?p=login')
          }
        });
      } else {
        alert("请确保所有信息填写正确，再进行注册");
      }
    } else {
      $(agree.parent().parent())
        .addClass("animate__animated animate__rubberBand")
        .on("animationend", function () {
          $(this).removeAttr("class");
        });
    }
  });
});
