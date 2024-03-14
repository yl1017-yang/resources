Vue.component('surprise',{
	template : `
        <div id="tab02" class="tab02" style="height:1000px;background:#B0E6FF">
            <h2>텐텐세일 쿠폰팩</h2>
        </div>
	`
    , 
    methods : {
        goMyBonusCouponPage() {
            let url = "my10x10/couponbook.asp?tab=1";
            
            if (isApp) {
                fnAPPpopupBrowserURL('', "http://m.10x10.co.kr/apps/appCom/wish/web2014/" + url, 'right', '', 'sc');
                fnAmplitudeEventAction('click_tentensale_couponpack', '', '', callback);
            } else {
                location.href = "/" + url;
                fnAmplitudeEventAction('click_tentensale_couponpack', '', '');
            }
        },
        goNaverEvt(){
            if (isapp) {
                fnAPPpopupBrowserURL('', "https://m.10x10.co.kr/apps/appCom/wish/web2014/event/eventmain.asp?eventid=122759", 'right', '', 'sc');
                fnAmplitudeEventAction('click_tentensale_cardpromotion', '', '', callback);
            } else {
                location.href = "/event/eventmain.asp?eventid=122759";
                fnAmplitudeEventAction('click_tentensale_cardpromotion', '', '');
            }
        }
    }
})