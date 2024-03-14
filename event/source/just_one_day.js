Vue.component('just-one-day',{
	template : `
        <section id="tab01" class="section01" style="height:1000px;">
            <div class="in_wrap" v-if="oneDaySale">
                <div class="inner">
                    <h2>오늘만 찐특가</h2>
                </div>	
            </div>                    
        </section>
	`
    , created() {
        const _this = this;
        _this.$store.dispatch('GET_ONE_DAY_ITEM');
    }
    , data() {
        return {
            itemList: [],
            isUserLoginOK: false
        }
    }
    , computed : {
        oneDaySale() {
            return this.$store.getters.oneDaySale;
        },
        timeSale() {
            return this.$store.getters.timeSale;
        },
        tentenOfTwentyOne() {
            return this.$store.getters.tentenOfTwentyOne;
        }
    },
    methods : {
        getPrice(priceText) {
			let price = priceText.split('원');
			return price[0];
		},
        getUrl(itemId) {
			// let gaParam = this.createGaParam('today_just1day_1');
			return this.oneDaySale.type == 'E'
					? this.oneDaySale.link
					: '/shopping/category_prd.asp?itemid='+itemId;
		},
		moveItem(itemid) {
			let url = this.getUrl(itemid);
            fnAmplitudeEventAction('click_tentensale_todaysale', 'num', itemid);
			location.href = url;
		},
        moveEvent(code) {
            let url = "/event/eventmain.asp?eventid=" + code;
			location.href = url;
        },
        getDiscountText(text) {
			if(text.indexOf('%') > 0) {
				return text.replaceAll('%','<span class="percent">%</span>');
			}
			return text;
		}
    }
})