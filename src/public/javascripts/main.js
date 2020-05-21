$('body').tooltip({
  selector: '[data-toggle="tooltip"]'
});

$('.item-box').hover(function() {
  $(this).addClass('shadow')
}, function(){
  $(this).removeClass('shadow')
})