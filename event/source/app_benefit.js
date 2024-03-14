Vue.component('app-benefit',{
	template : `
        <section id="tab05" class="app-benefit" style="height:1500px;">
            <div class="in_wrap">
                <div class="inner">
                    <h2 class="app-benefit__title"><span class="app-benefit__title-sub">지금 바로 참여해보세요!</span>APP 이벤트</h2>
                </div>
            </div>
        </section>
	`
    , created() {
        const _this = this;
        _this.$store.dispatch('GET_EVENT_BANNER_LIST');
    }
    , computed : {
        eventBanner() {
            return this.$store.getters.eventBanner;
        },
    },
    methods : {
        goEventPage(eventCode) {
            if(eventCode==122757){
                eventCode=122758;
            }else if(eventCode==122782){
                eventCode=122781;
            }
            fnAmplitudeEventAction('click_tentensale_event_banner', 'eventcode', eventCode);
            location.href = "/event/eventmain.asp?eventid=" + eventCode;
        },
    }
})