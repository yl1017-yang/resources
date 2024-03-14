Vue.component('saleItem', {
    mixins : [item_mixin, modal_mixin, common_mixin]
    , template : `
    <section id="tab03" class="section03" style="height:1500px;">
    <div class="in_wrap">
        <div class="inner">
            <h2><span>새로운 시작엔 새로운 아이템이 필수!​</span>세일 상품 모아보기<i>~79%</i></h2>


        </div>
    </div>    
</section>
    `
    , created() {
        const _this = this;
        this.$store.dispatch('GET_CATEGORIES_ITEMS');
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
        Items1() { 
            const items = this.$store.getters.Items1;
            this.setItemInit('Items1', items);
            return this.$store.getters.Items1;
        },
        Items2() { 
            const items = this.$store.getters.Items2;
            this.setItemInit('Items2', items);
            return this.$store.getters.Items2;
        },
        Items3() { 
            const items = this.$store.getters.Items3;
            this.setItemInit('Items3', items);
            return this.$store.getters.Items3;
        },
        Items4() { 
            const items = this.$store.getters.Items4;
            this.setItemInit('Items4', items);
            return this.$store.getters.Items4;
        },
        Items5() { 
            const items = this.$store.getters.Items5;
            this.setItemInit('Items5', items);
            return this.$store.getters.Items5;
        },
        Items6() { 
            const items = this.$store.getters.Items6;
            this.setItemInit('Items6', items);
            return this.$store.getters.Items6;
        },
        Items7() { 
            const items = this.$store.getters.Items7;
            this.setItemInit('Items7', items);
            return this.$store.getters.Items7;
        },
        Items8() { 
            const items = this.$store.getters.Items8;
            this.setItemInit('Items8', items);
            return this.$store.getters.Items8;
        },
        Items9() { 
            const items = this.$store.getters.Items9;
            this.setItemInit('Items9', items);
            return this.$store.getters.Items9;
        },
        Items10() { 
            const items = this.$store.getters.Items10;
            this.setItemInit('Items10', items);
            return this.$store.getters.Items10;
        },
        Items11() { 
            const items = this.$store.getters.Items11;
            this.setItemInit('Items11', items);
            return this.$store.getters.Items11;
        },
        Items12() { 
            const items = this.$store.getters.Items12;
            this.setItemInit('Items12', items);
            return this.$store.getters.Items12;
        },
        Items13() { 
            const items = this.$store.getters.Items13;
            this.setItemInit('Items13', items);
            return this.$store.getters.Items13;
        },
        Items14() { 
            const items = this.$store.getters.Items14;
            this.setItemInit('Items14', items);
            return this.$store.getters.Items14;
        },
        Items15() { 
            const items = this.$store.getters.Items15;
            this.setItemInit('Items15', items);
            return this.$store.getters.Items15;
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
        setCategoryName(code) {
            let name = '';
            switch(code) {
                case 101: name = '디자인문구'; break;
                case 102: name = '디지털/핸드폰'; break;
                case 124: name = '디자인가전'; break;
                case 121: name = '가구/수납'; break;
                case 120: name = '패브릭/생활'; break;
                case 122: name = '데코/조명'; break;
                case 112: name = '키친'; break;
                case 119: name = '푸드'; break;
                case 117: name = '패션의류'; break;
                case 116: name = '패션잡화'; break;
                case 118: name = '뷰티'; break;
                case 125: name = '주얼리/시계'; break;
                case 110: name = 'cat&dog'; break;
                case 104: name = '토이/취미'; break;
                case 103: name = '캠핑'; break;
            }
            return name;
        },
        setItemInit(target, e) {
            const _this = this;
            let items = e.map(i => i.itemid);
            _this.setItemInfo(target, items, ["image", "name", "price", "sale", "brand"]);
        },
        /**
         * 상품상세 페이지 이동
         * @param itemid
         */
         prdDetailPage(itemid){
            fnAmplitudeEventAction('click_tentensale_sale_product', 'item_id', itemid);
            location.href = "/shopping/category_prd.asp?itemid=" + itemid;
        },
        exhibitionDetailPage(masterCode,catecode,categoryname){
            fnAmplitudeEventAction('click_tentensale_sale_product', 'category_name', categoryname);
            location.href = '/tentensale/2023/detail/index.asp?masterCode=' + masterCode + '&catecode=' + catecode;
        },
        exhibitionDetailPage2(masterCode,catecode,categoryname){
            fnAmplitudeEventAction('click_tentensale_sale_product_button', 'category_name', categoryname);
            location.href = '/tentensale/2023/detail/index.asp?masterCode=' + masterCode + '&catecode=' + catecode;
        },        
        goMdEvent01() {
            fnAmplitudeEventAction('click_tentensale_MDbanner_brand', '', '');
            location.href = "/event/eventmain.asp?eventid=122054";
        },
        goMdEvent02() {
            fnAmplitudeEventAction('click_tentensale_MDbanner_item', '', '');
            location.href = "/event/eventmain.asp?eventid=121738";
        },
    }
});