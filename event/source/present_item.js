Vue.component('present-item', {
    template : `
    <section id="tab04" class="present-item" style="height:1000px">
        <div class="in_wrap">
            <div class="inner">
                <h2><span>누군가에게 설렘을 선물하고 싶다면?</span>설레는 선물 구경하기​</h2>

            </div>
        </div>
    </section>
    `
    , created() {
        const _this = this;
        this.$store.dispatch('GET_PRESENT_CATEGORIES_ITEMS');
    }
    , updated() {
        const _this = this;
    }
    , data() {
        return {
            categoryItems: []
        }
    }
    , computed : {
        firstItems() { 
            const items = this.$store.getters.firstItems;
            this.setItemInit('firstItems', items);
            return this.$store.getters.firstItems;
        },
        secondItems() { 
            const items = this.$store.getters.secondItems;
            this.setItemInit('secondItems', items);
            return this.$store.getters.secondItems 
        },
        thirdItems() { 
            const items = this.$store.getters.thirdItems;
            this.setItemInit('thirdItems', items);
            return this.$store.getters.thirdItems 
        },
    },
    methods : {
        /**
         * 상품 정보 연동
         * @param target 클래스명
         * @param items 상품아이디
         * @param fields 상품 정보 필드명
         */
        setItemInfo(target, items, fields){
            fnApplyItemInfoEach({
                items: items,
                target: target,
                fields:fields,
                unit:"none",
                saleBracket:false
            });
        },
        setItemInit(target, e) {
            const _this = this;
            let items = e.map(i => i.itemid);
            _this.setItemInfo(target, items, ["image", "name", "price", "sale","brand"]);
        },
        /**
         * 상품상세 페이지 이동
         * @param itemid
         */
        prdDetailPage(itemid){
            fnAmplitudeEventAction('click_tentensale_gift_product','item_id',itemid);
            location.href = "/shopping/category_prd.asp?itemid=" + itemid;
        },
        moreDetailPage(index, attribCd){
            fnAmplitudeEventAction('click_tentensale_gift_product','num',index);
            location.href = "/gift_sincerity/detail/index.asp?attribCd=" + attribCd + "&catecode=&sort=best";
        },
        moreDetailPage2(index, attribCd){
            fnAmplitudeEventAction('click_tentensale_gift_product_button','theme',index);
            location.href = "/gift_sincerity/detail/index.asp?attribCd=" + attribCd + "&catecode=&sort=best";
        },
        goHeartGiftPage() {
            location.href = "/gift_sincerity/index.asp";
        }
    }
});