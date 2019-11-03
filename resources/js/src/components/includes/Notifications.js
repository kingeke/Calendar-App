import $ from 'jquery'
require('bootstrap-notify')

export const showNotification = (message, type, duration = 3000) => {
    var content = {};
    content.message = message;
    content.icon = 'fa fa-bell';
    content.title = 'Notification:';

    $.notify(content, {
        type: type,
        animate: {
            enter: 'animated slideInUp',
            exit: ''
        },
        placement: {
            from: 'bottom',
            align: 'right'
        },
        delay: duration
    });
}