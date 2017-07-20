var sidePanel = {
    init: function(current) {
        var viewName = this.current = current;
        $('*[data-toggle="' + viewName + '"]').hide();
        $('.slide-panel__amply.' + this.current).show();
    },

    distributors: ['baikal', 'dl', 'pek'],
    current: '',
    next: '',
    z: 100,

    changeMenu: function(viewName) {
        console.log(viewName);
        $('.side-item').fadeIn();
        $('*[data-toggle="' + viewName + '"]').fadeOut();
    },

    renderNext: function (nextView) {
        nextView.show();
        nextView.css('zIndex', this.z++).toggleClass('slideInLeft');
        this.current = this.next;
        setTimeout(function() {
            nextView.css('zIndex', sidePanel.z++).toggleClass('slideInLeft');
        }, 1000);
    },

    getNextName: function(el) {
        return el.data('toggle');
    },

    hidePrevious: function() {
        var element = $('.slide-panel__amply.'+this.current);
        element.removeClass('slideInLeft');
        element.toggleClass('slideOutRight');
        element.hide();
        element.toggleClass('slideOutRight');
    },

    handle: function(element) {
        var name = this.next = this.getNextName(element);
        console.log('handled');
        // this.hidePrevious();
        this.renderNext($('.slide-panel__amply.' + this.next));
        this.changeMenu(name);
    }

};

function setSlidePanelHandlers() {
    sidePanel.init('baikal');
    console.log('setted');
    $('.side-item').on('click', function() {
        console.log('clicked');
       sidePanel.handle($(this));
    });
}

setSlidePanelHandlers();