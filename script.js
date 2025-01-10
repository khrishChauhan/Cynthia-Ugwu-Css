const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true

});




function speedEffectCrsr(){
    var timeout;
    var scaleX = 1;
    var scaleY = 1;
    
    var preX =0;
    var preY =0;
    document.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);

        scaleX = gsap.utils.clamp(0.7,1.3,dets.clientX - preX);
        scaleY = gsap.utils.clamp(0.7,1.3,dets.clientY - preY);
       
        preX = dets.clientX;
        preY = dets.clientY;

        circleMoves(scaleX,scaleY);

        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(calc(${dets.clientX}px - 0.35vw),calc(${dets.clientY}px - 0.35vw)) scale(1,1)`;
        },100);

    });
}

function circleMoves(scaleX,scaleY){
    window.addEventListener("mousemove",function(dets){
        // document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px)`;
        document.querySelector("#minicircle").style.transform = `translate(calc(${dets.clientX}px - 0.35vw),calc(${dets.clientY}px - 0.35vw)) scale(${scaleX}, ${scaleY})`;
  
    })
}

function animation1(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: "10",
        opacity: 0,
        duration: 1, 
        ease: Expo.easeInOut,
    })
    .to(".el", {
        transform: "translateY(0%)",
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2,
      })
      .from("#heroendtext", {
        y:-10,
        opacity: 0,
        duration: 1,
        delay: -0.9,
        ease: Expo.easeInOut,
      })
    
}



speedEffectCrsr();
circleMoves();
animation1();

document.querySelectorAll("#imgElm").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
        document.querySelector("#minicircle").style.opacity =1;    
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });

    
      
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top ;
      document.querySelector("#minicircle").style.opacity =0;  
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX  ,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.7),
      });

    });
  });
