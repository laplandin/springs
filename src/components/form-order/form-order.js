var fileInputs = $('.form-order__input');
var form = $('.form-order');
var submitBtn = $('.form-order__submit');
var fileInput = $('.form-order__file');
var fileLabel = $('.form-order__label-file span');

submitBtn.on('click', function(e) {
    e.preventDefault();
    form.trigger('submit');
    form[0].reset();
});

fileInput.on('change', function(e) {

    if (!$(this)[0].files[0]) {
        filename ? fileLabel.text(filename):  fileLabel.text('Прикрепить проект');
    } else {
        filename = $(this)[0].files[0].name;
        console.log('filename ', filename);
        fileLabel.text(filename);
    }
});


//Проверка, если вдруг после возвращения поля оказались заполнены до фокуса в них
if (fileInputs.val()) {
    fileInputs.siblings('label').addClass('form-order__label--focused');
}

fileInputs.on('focus', function (e) {
    $(this).siblings('label').addClass('form-order__label--focused');
});

fileInputs.on('blur', function (e) {
    if (!$(this).val()) {
        $(this).siblings('label').removeClass('form-order__label--focused');
    }
});
