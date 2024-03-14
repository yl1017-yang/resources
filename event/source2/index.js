
const app = new Vue({
    el : '#app',
    store: store,
    template : `
        <div class="evtContV15">
            <div class="tentensale-march">
                <div class="scroll">
                    <section class="main">
                        <div class="main_visual main01" style="display:none;">
                            <img src="images2/main.jpg" alt="">
                            <div class="float">
                                <p class="f12"><img src="images2/sale-a.png" alt="" sizes="50vw"></p>
                                <p class="f11"><img src="images2/sale-s.png" alt="" sizes="50vw"></p>
                                <p class="f14"><img src="images2/sale-e.png" alt="" sizes="50vw"></p>
                                <p class="f13"><img src="images2/sale-l.png" alt="" sizes="50vw"></p>
                                <p class="f06"><img src="images2/ball02.png" alt=""></p>
                                <p class="f07"><img src="images2/ball03.png" alt=""></p>
                                <p class="f02"><img src="images2/sale-a.png" alt=""></p>
                                <p class="f01"><img src="images2/sale-s.png" alt=""></p>
                                <p class="f04"><img src="images2/sale-e.png" alt=""></p>
                                <p class="f03"><img src="images2/sale-l.png" alt=""></p>
                                <p class="f05"><img src="images2/ball01.png" alt=""></p>
                                <p class="f08"><img src="images2/ball04.png" alt=""></p>
                            </div>
                            <p class="txt"><img src="images2/main_txt.png" alt=""></p>
                        </div>
                        <div class="main_visual main02" style="display:none;">
                            <img src="images2/main_p.jpg" alt="">
                            <div class="float">
                                <p class="f12"><img src="images2/sale-a-p.png" alt="" sizes="50vw"></p>
                                <p class="f11"><img src="images2/sale-s-p.png" alt="" sizes="50vw"></p>
                                <p class="f14"><img src="images2/sale-e-p.png" alt="" sizes="50vw"></p>
                                <p class="f13"><img src="images2/sale-l-p.png" alt="" sizes="50vw"></p>
                                <p class="f06"><img src="images2/ball02.png" alt=""></p>
                                <p class="f07"><img src="images2/ball03.png" alt=""></p>
                                <p class="f02"><img src="images2/sale-a-p.png?v1.01 alt=""></p>
                                <p class="f01"><img src="images2/sale-s-p.png" alt=""></p>
                                <p class="f04"><img src="images2/sale-e-p.png" alt=""></p>
                                <p class="f03"><img src="images2/sale-l-p.png" alt=""></p>
                                <p class="f05"><img src="images2/ball01.png" alt=""></p>
                                <p class="f08"><img src="images2/ball04.png" alt=""></p>
                            </div>
                            <p class="txt"><img src="images2/main_txt_p.png" alt=""></p>
                        </div>
                    </section>
                    <div class="fix-start-app"></div>
                    <section class="tab-area tab-area-app">
                        <div class="sidebar">
                            <div class="tab01 on" data-index="1"><a href="#tab01">오늘만<br>찐! 특가</a></div>
                            <div class="tab02" data-index="2"><a href="#tab02">할인에<br>혜택 플러스</a></div>
                            <div class="tab03" data-index="3"><a href="#tab03">역대급 세일<br><span>~79%</span></a></div>
                            <div class="tab04" data-index="4"><a href="#tab04">설레는<br>선물하기</a></div>
                            <div class="tab05" data-index="5"><a href="#tab05">APP 전용<br>이벤트</a></div>
                        </div>
                    </section>
                    <div class="right">
                        <just-one-day></just-one-day>
                        <surprise></surprise>
                        <saleItem></saleItem>
                        <present-item></present-item>
                        <app-benefit></app-benefit>
                        <alarm-or-download></alarm-or-download>
                    </div>

                </div>
            </div>
		</div>
    `,
    data() {return {
        tabType : tabType,
        mainNumber: -1
    }},
    created() {
        this.is_app = isapp;
        $(function(){

            var random = Math.floor(Math.random() * $('.main .main_visual').length);
            $('.main .main_visual').hide().eq(random).show();


            setTimeout(() => {
                $('.f11').hide();
            }, 3500);
            setTimeout(() => {
                $('.f12').hide();
            }, 5600);
            setTimeout(() => {
                $('.f13').hide();
            }, 7700);
            setTimeout(() => {
                $('.f14').hide();
            }, 4500);
        
            
            $(window).scroll(function () {
                var header = $('#header').outerHeight();
                var tabHeight = $('.main').outerHeight();
                var fixHeight = tabHeight + header;
                var st = $(this).scrollTop();
        
                if (st > fixHeight) {
                    $('.tab-area').addClass('fixed').css('top', header)
                } else {
                    $('.tab-area').removeClass('fixed')
                }
    
        
                // 스크롤시 특정위치서 탭 활성화
                var scrollPos = $(document).scrollTop();
                $('.tab-area a').each(function () {
                    var tab01 = $('#tab01');
                    var tab02 = $('#tab02');
                    var tab03 = $('#tab03');
                    var tab04 = $('#tab04');
                    var tab05 = $('#tab05');
                    if (tab01.position().top <= scrollPos + 100 && tab01.position().top + tab01.height() >= scrollPos + 100) {
                        $('.tab-area div').removeClass("on");
                        $('.tab01').addClass("on");
                    }
                    else if (tab02.position().top <= scrollPos + 100 && tab02.position().top + tab02.height() >= scrollPos + 100) {
                        $('.tab-area div').removeClass("on");
                        $('.tab02').addClass("on");
                    }
                    else if (tab03.position().top <= scrollPos + 100 && tab03.position().top + tab03.height() >= scrollPos + 100) {
                        $('.tab-area div').removeClass("on");
                        $('.tab03').addClass("on");
                    }
                    else if (tab04.position().top <= scrollPos + 100 && tab04.position().top + tab04.height() >= scrollPos + 100) {
                        $('.tab-area div').removeClass("on");
                        $('.tab04').addClass("on");
                    }
                    else if (tab05.position().top <= scrollPos + 100 && tab05.position().top + tab05.height() >= scrollPos + 100) {
                        $('.tab-area div').removeClass("on");
                        $('.tab05').addClass("on");
                    }
                });
        
               
            });
        
            $('.tab-area').on('click', 'a[href^="#"]', function (event) {
                var header = $('#header').outerHeight();
                event.preventDefault();
                if(gnbFlag){
                    $('html, body').animate({
                            scrollTop: $($.attr(this, 'href')).offset().top - header - 90
                    }, 500);
                }else{
                    $('html, body').animate({
                        scrollTop: $($.attr(this, 'href')).offset().top - header + 1
                    }, 500);
                }
                if($.attr(this, 'href')=="#tab01"){
                    fnAmplitudeEventAction('click_tentensale_sidemenu', 'num', '오늘만 찐! 특가');
                }else if($.attr(this, 'href')=="#tab02"){
                    fnAmplitudeEventAction('click_tentensale_sidemenu', 'num', '혜택');
                }else if($.attr(this, 'href')=="#tab03"){
                    fnAmplitudeEventAction('click_tentensale_sidemenu', 'num', '세일 상품 ~79%');
                }else if($.attr(this, 'href')=="#tab04"){
                    fnAmplitudeEventAction('click_tentensale_sidemenu', 'num', '설레는 선물하기');
                }else if($.attr(this, 'href')=="#tab05"){
                    fnAmplitudeEventAction('click_tentensale_sidemenu', 'num', 'APP 전용 이벤트');
                }else if($.attr(this, 'href')=="#tab06"){
                    fnAmplitudeEventAction('click_tentensale_sidemenu', 'num', '출석체크 +4,500p');
                }
                
            });

            fnAmplitudeEventAction('view_tentensale_main', '', '');
            
        });
    },
    computed: {
        randomMainNumber() {
            const _this = this;
            let nowDay = new Date().getTime();
            let showDay = new Date(2022, 09, 17, 00, 00, 00).getTime();
            let number = 2;
            if (nowDay > showDay) {
                number = 3;
            }
            _this.mainNumber = Math.floor(Math.random() * number);
            return _this.mainNumber;
        }
    },
    methods : {
        goEventPage(code) {
            let url = "event/eventmain.asp?eventid=" + code;
            if (isApp) {
                fnAPPpopupBrowserURL('', "http://m.10x10.co.kr/apps/appCom/wish/web2014/" + url, 'right', '', 'sc');
            } else {
                location.href = "/" + url;
            }
        },
        prdDetailPage(itemid){
            if(this.is_app) {
                fnAPPpopupProduct(itemid);
            } else {
                location.href = "/category/category_itemPrd.asp?itemid=" + itemid;
            }
        },
        goMileageEvt(){
            if (isApp) {
                fnAPPpopupBrowserURL('', "https://m.10x10.co.kr/apps/appCom/wish/web2014/event/eventmain.asp?eventid=122757", 'right', '', 'sc');
                fnAmplitudeEventAction('click_tentensale_sidemenu', 'num', '출석체크 +4,500p', callBack);
            } else {
                location.href = "/event/eventmain.asp?eventid=122758";
                fnAmplitudeEventAction('click_tentensale_sidemenu', 'num', '출석체크 +4,500p');
            }
        },
    }
});