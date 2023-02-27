
var UI = {
    init: function(){
        this.gnb.init();
        this.scroll.init();
        this.tab.init();
        this.goTop.init();
        this.popup.init();
        this.dark.init();
    },
    selector : {
        $hbody: $('html, body'),
        $body : $('body'),
        navigation : $('.nav'),
        $contents : $('main > section'),
        $menu : $('.gnb li'),
        $header : $('.header'),
    },
    // gnb
    gnb : {
        init:function(){
            this.navi();
            this.moveEvent();
        },
        navi : function(){
            const $navTgBtn = $('.nav-toggle-btn');
            $navTgBtn.on('click', function(e) {
                const navArea = UI.selector.navigation;
                const navAreaOn = navArea.hasClass('active');
                if(navAreaOn){
                    navArea.removeClass('active');
                } else {
                    navArea.addClass('active');
                }
            })
        },
        moveEvent : function(){
            const hdHeight = UI.selector.$header.outerHeight();
            
            // 메뉴 효과주기
            $(window).on('scroll', function() {
                const scrollTop = $(window).scrollTop();
                UI.selector.$contents.each(function(idx) {
                    const $this = $(this);
                    if ($this.offset().top <= scrollTop + hdHeight) {
                        UI.selector.$menu.removeClass('on');
                        UI.selector.$menu.eq(idx).addClass('on');
                    }
                });
            });
            
            // 메뉴 클릭이동
            UI.selector.$menu.each(function(index, item) {
                $(item).on('click', function(e) {
                    e.preventDefault();
                    const $this = $(this);
                    UI.selector.$menu.removeClass('on');
                    $this.addClass('on');
                    const secTarget = UI.selector.$contents.eq(index).offset().top;
                    UI.selector.$hbody.animate({
                        scrollTop: secTarget - hdHeight + 20
                    }, 300);
                });
            });

            // UI.selector.$menu.on('click', function(e) {
            //     e.preventDefault();
            //     UI.selector.$menu.removeClass('on');
            //     $(e.target).closest('li').addClass('on');
            //     const index = $(this).index();;
            //     const secTarget =  UI.selector.$contents.eq(index).offset().top;
            //     UI.selector.$hbody.animate({ scrollTop: secTarget - hdHeight}, 300);
            // });

        }
    },
    // 스크롤
    scroll : {
        init:function(){
            this.scrollEvent();
        },
        scrollEvent: function(){
            
            $(window).on('scroll', function() {
                
                const scTop = $(this).scrollTop();

                // 헤더고정
                if(scTop >= 20 ){
                    UI.selector.$header.addClass('fixed');
                } else {
                    UI.selector.$header.removeClass('fixed');
                }

                // 컨텐츠 is-active
                const contents = UI.selector.$contents ;

                contents.each(function() {
                    const $this = $(this);
                    const contentTop = $this.offset().top - 200;
                    const $scEvtEl = $this.find('.scEvt');

                    if (scTop >= contentTop) {
                        $scEvtEl.addClass('is-active');
                    } else {
                        $scEvtEl.removeClass('is-active');
                    }
                });
            });
        }
    },
    // top버튼
    goTop : {
        init:function(){
            this.gotoTop();
        },
        gotoTop : function(){
            const $goTopBtn = $('#gotop');
            $goTopBtn.on('click', function(e) {
                e.preventDefault();
                UI.selector.$hbody.animate({ scrollTop: 0 }, 200);
            });
        }
    },
    // 리스트
    tab : {
        init:function(){
            this.tabList();
        },
        tabList : function(){
            const $tabBtnList = $('.tab-btn-list')
            const tabBtn = $tabBtnList.find('.tab-btn');
            const $tabContList = $('.tab-cont-list')
            const tabCont = $tabContList.find('.tab-cont');
            tabBtn.eq(0).addClass('on');
            tabCont.addClass('on');
            tabBtn.on('click',function(e){
                e.preventDefault();
                const tabBtnName = $(e.target).attr('data-filter');
                
                tabBtn.removeClass('on');
                $(e.target).addClass('on');

                tabCont.each(function(idx,item){
                    const tabContName = $(item).attr('data-filter');
                    console.log(tabBtnName);
                    if( tabBtnName == tabContName ){
                        $(e.target).addClass('on');
                        $(item).addClass('on');
                    } else if( tabBtnName == '*'){
                        $(item).addClass('on');
                    } else {
                        $(item).removeClass('on');
                    }
                })
            })

        }
    },
    // 메시지 팝업
    popup : {
        init:function(){
            this.popOepn();
            this.popClose();
        },
        popOepn : function(){

            const popBtn = document.querySelector('.msg-popup-btn');
            let emailText = document.getElementById('copy-email').innerHTML;
            const popup = document.getElementById('popup-wrap');
            const popErr = document.querySelector('.msg-popup p');

            function copyToClipBoard(){
                const popView = 'popView' ;
                navigator.clipboard.writeText(emailText)
                    .then(() => {
                        console.log('oh');
                        //popup.classList.add(popView);
                        popup.style.cssText  = 'display: block;';
                })
                    .catch(err => {
                        popup.style.cssText  = 'display: block;';
                        popErr.innerHTML = '💡 다시 확인해 주세요';
                })
            }
            
            popBtn.onclick = copyToClipBoard;
            
        },
        popClose : function(){
            const $popClose = $('.close-btn');
            const $msgPopWrap = $('.msg-popup-wrap');
            $popClose.click(function(){
                $msgPopWrap.css("display", "none");
            })
        }
    },
    // 다크모드
    dark : {
        init:function(){
            this.dark();
        },
        dark : function(){
            const $mode = $('.mode');
            const $modeSwitch = $('#mode-toggle');
            const $logo = $('.logo a') ;
            const body = UI.selector.$body;
            // mode 클릭
            $mode.on('click', function() {
                $modeSwitch.prop('checked', !$modeSwitch.prop('checked')).trigger('change');
            });
            // mode checkbox 
            $modeSwitch.on('change', function() {
                const isChecked = $(this).is(':checked');
                if (isChecked) {
                    $('html').attr({'data-theme': 'dark'});
                    $mode.addClass('on');
                    //$logo.css({'background':'url("../assets/img/jlogo-w.svg") center no-repeat'});
                    body.addClass('dark');
                } else {
                    $('html').attr({'data-theme': 'light'});
                    $mode.removeClass('on');
                    //$logo.css({'background':'url("../assets/img/jlogo.svg") center no-repeat'});
                    body.removeClass('dark');
                }
            });

        }
    },
}


$(document).ready(function(){
    UI.init();
});
