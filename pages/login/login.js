$(() => {
  $(".login button").on("click", function () {
    const phone = $(".login>div input[type=text]").val();
    const pwd = $(".login>div input[type=password]").val();
    const url = "https://serverms.xin88.top/users/login";
    $.post(url, { phone, pwd }, (data) => {
      console.log("登录状态", data);
      if(data.code===200){
        let status=$('.label>input').prop('checked') ? 1 : 0
        let user=JSON.stringify(data.data)
        if(status===0){
          sessionStorage.setItem('user',user)
        }
        if(status===1){
          localStorage.setItem('user',user)
        }
        alert(`登录成功，即将跳转美食广场主页`)
        location.replace('?p=home')
      }else{
        alert(data.msg)
      }
    });
  });
});
