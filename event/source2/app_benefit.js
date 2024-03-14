Vue.component('app-benefit',{
	template : `
        <div id="tab05" class="tab05" style="height:1000px;background:#111">
            <section class="app-benefit">
                <h2 class="app-benefit__title"><span class="app-benefit__title-sub">지금 바로 참여해보세요!</span>APP 이벤트</h2>
            </section>
        </div>
	`
    , created() {
        this.is_app = isapp;
        const _this = this;
        _this.$store.dispatch('GET_EVENT_BANNER_LIST');
    }
    , computed : {
        eventBanner() {
            return this.$store.getters.eventBanner;
        },
    }
    , data() {
        return {
        }
    }
    , methods : {
        goEventPage(eventCode) {
            if (this.is_app) {
                const callBack = bool => {
                    if(bool) fnAPPpopupBrowserURL('', "https://m.10x10.co.kr/apps/appCom/wish/web2014/event/eventmain.asp?eventid=" + eventCode, 'right', '', 'sc');
                }
                fnAmplitudeEventAction('click_tentensale_event_banner', 'eventcode', eventCode, callBack);
            } else {
                if(eventCode==122757){
                    eventCode=122758;
                }else if(eventCode==122782){
                    eventCode=122781;
                }else if(eventCode==122770){
                    eventCode=122769;
                }
                fnAmplitudeEventAction('click_tentensale_event_banner', 'eventcode', eventCode);
                location.href = "/event/eventmain.asp?eventid=" + eventCode;
            }
        },
    }
})