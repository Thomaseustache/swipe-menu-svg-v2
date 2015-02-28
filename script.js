/*Swipe Menu SVG - by  @eustachethomas*/
var wH, wW, decX, decY, menuW, menuH, mouseY;
$(document).ready(function(){

    menuW = $('.menu').width();
    menuH = $('.menu').height();
    $('.menu').find('svg')[0].setAttribute('viewBox','0 0 '+menuW+' '+menuH);
    $('.bg path').attr('d', 'M0,0C0,0,0,'+menuH+',0,'+menuH+'C0,'+menuH+',0,'+menuH+',0,'+menuH+'C0,60,0,0,0,0C0,0,0,0,0,0');


    var s = Snap( '.menu svg' );
        pathEl = s.select( 'path' );
    pathOrigin = $('.bg path').attr('d');


    wH = $(window).height();
    wW = $(window).width();

    
    $(window).resize(function(event){
        wH = $(window).height();
        wW = $(window).width();
        menuW = $('.menu').width();
        menuH = $('.menu').height();
        $('.menu').find('svg')[0].setAttribute('viewBox','0 0 '+menuW+' '+menuH);
        $('.bg path').attr('d', 'M0,0C0,0,0,'+menuH+',0,'+menuH+'C0,'+menuH+',0,'+menuH+',0,'+menuH+'C0,60,0,0,0,0C0,0,0,0,0,0');
    });
    
    $('body').on('click touchend', '.overlay',function(){
        newPath = pathOrigin;
        $('.overlay').fadeOut(300,function(){
            $('.overlay').remove();
        });
        $('html, body').css({'overflow':'auto'});
        pathEl.stop().animate( { 'path' : newPath }, 600, mina.elastic,function(){
            $('.menu').removeClass('touch open'); 
        });
        return false;
    });
    
    /* SWIPE */
    $('.menu').swipe( {
        swipeStatus:function(event, phase, direction, distance, duration, fingers) {
          // console.log(event, phase, direction, distance, duration, fingers);

          if(phase=="start" && !$('.overlay').length){
            $('body').append('<div class="overlay"></div>');
            $('.overlay').fadeIn(300);
            $('.menu').addClass('touch');
            menuW = $('.menu').width();
            menuH = $('.menu').height();
            $('html, body').css({'overflow':'hidden'});
            $('.menu').find('svg')[0].setAttribute('viewBox','0 0 '+wW+' '+wH);
          }
          if(phase=="move" && !$('.menu').hasClass('open') ){
            if(event.type == 'touchmove'){
                mouseY = event.touches[0].clientY;
            }else{
                mouseY = event.y;
            }
            decX = parseInt( distance/ menuW *100 );
            decY = parseInt( mouseY / menuH *100 );

            newPath = 'M0,0C0,0,0,'+menuH+',0,'+menuH+'C0,'+menuH+',0,'+menuH+',0,'+menuH+'C'+ (menuW*decX/100) +','+(menuH*(decY-20)/100)+','+(menuW*decX/100)+','+(menuH*(decY+20)/100)+',0 0C0,0,0,0,0,0C0,0,0,0,0,0';
            $('.bg path').attr('d', newPath);
            // pathEl.stop().animate( { 'path' : newPath }, 500, mina.elastic );
            if(decX>60){
                newPath = 'M 0 0, L 0 '+menuH+', L '+menuW+' '+menuH+', L '+menuW+' 0, Z';
                pathEl.stop().animate( { 'path' : newPath }, 800, mina.elastic );
                $('.menu').addClass('open');
                $('.menu').removeClass('touch'); 
                return false;
            }
          }
          if(phase=="end"){
            $('html, body').css({'overflow':'auto'});
            if(decX<60){
                decX = decY = 0; 
                newPath = pathOrigin;
                $('.overlay').fadeOut(300,function(){
                    $('.overlay').remove();
                });
                pathEl.stop().animate( { 'path' : newPath }, 600, mina.elastic,function(){
                    $('.menu').removeClass('touch'); 
                });
            }else{
                newPath = 'M 0 0, L 0 '+menuH+', L '+menuW+' '+menuH+', L '+menuW+' 0, Z';
                pathEl.stop().animate( { 'path' : newPath }, 800, mina.elastic );
                $('.menu').addClass('open');
                $('.menu').removeClass('touch');
            }
          }
          
          
        }
    });

	
});
