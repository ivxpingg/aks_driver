import Calendar from 'vue-mobile-calendar';
const Components = {
    install(Vue) {
        Vue.component('vCalendar', Calendar.inlineCalendar);
    }
}

export default Components;