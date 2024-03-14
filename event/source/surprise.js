Vue.component('surprise',{
	template : `
        <section id="tab02" class="section02">
            <img src="images/coupon.png" alt="" />
            <p class="coupon_more" @click="goMyBonusCouponPage()"></p>
            <p class="naver_evt" @click="goNaverEvt()">자세히 보러 가기</p>
        </section>
	`
    , methods : {
        goMyBonusCouponPage() {
            fnAmplitudeEventAction('click_tentensale_couponpack', '', '');
            location.href = "/my10x10/couponbook.asp?tab=1";
            
        },
        goNaverEvt(){
            fnAmplitudeEventAction('click_tentensale_cardpromotion', '', '');
            location.href = "/event/eventmain.asp?eventid=122759";
        }
    }
})