
    $('#frm-btn1').on("click",function(){
      $('#frm-btn2').removeClass("mine-active")
      $('#frm-btn1').addClass("mine-active")
      var tl4 = gsap.timeline({defaults:{duration: 0.3}});
      tl4.to('#frm-2',{opacity:0})
        .to('#frm-2',{display:"none"},"-=0.3")
        .to('#frm-1',{display:"block"})
        .to('#frm-1',{opacity:1},"-=0.3")
    });
    $('#frm-btn2').on("click",function(){
      $('#frm-btn1').removeClass("mine-active")
      $('#frm-btn2').addClass("mine-active")
      var tl5 = gsap.timeline({defaults:{duration: 0.3}});
      tl5.to('#frm-1',{opacity:0})
        .to('#frm-1',{display:"none"},"-=0.3")
        .to('#frm-2',{display:"block"})
        .to('#frm-2',{opacity:1},"-=0.3")
    });
    $('#frm-btn3').on("click",function(){
      $('#frm-btn4').removeClass("mine-active")
      $('#frm-btn3').addClass("mine-active")
      var tl4 = gsap.timeline({defaults:{duration: 0.3}});
      tl4.to('#frm-2',{opacity:0})
        .to('#frm-2',{display:"none"},"-=0.3")
        .to('#frm-1',{display:"block"})
        .to('#frm-1',{opacity:1},"-=0.3")
    });
    $('#frm-btn4').on("click",function(){
      $('#frm-btn3').removeClass("mine-active");
      $('#frm-btn4').addClass("mine-active")
      var tl5 = gsap.timeline({defaults:{duration: 0.3}});
      tl5.to('#frm-1',{opacity:0})
        .to('#frm-1',{display:"none"},"-=0.3")
        .to('#frm-2',{display:"block"})
        .to('#frm-2',{opacity:1},"-=0.3")
    });
