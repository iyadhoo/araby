$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-product]').click(function(){
    window.location = 'product.html';
  });

  $('[data-add-to-cart]').click(function(){
    alert('أضيف المنتج إلى عربة الشراء');
  });
  $('.product-option input[type="radio"]').change(function(){
    $(this).parents('.product-option').siblings().removeClass('active');
    $(this).parents('.product-option').addClass('active');
  });
  $('[data-remove-from-cart]').click(function(){
    $(this).parents('[data-product-info]').remove();
    calculateTotalPrice();
  });
  $('[data-product-quantity]').change(function(){
    var newQuantity = $(this).val();
    var $parent = $(this).parents('[data-product-info]');
    var pricePerUnit = $parent.attr('data-product-price');
    var totalPriceForProduct =newQuantity *  pricePerUnit;
    $parent.find('.total-price-for-product').text(totalPriceForProduct + '$');
    calculateTotalPrice();
  });
  function calculateTotalPrice(){
    var totalPriceForAllProducts=0;
    $('[data-product-info]').each(function(){
      var pricePerUnit = $(this).attr('data-product-price');
      var quantity = $(this).find('[data-product-quantity]').val();
      var totalPriceForProduct = quantity * pricePerUnit;
      totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct;
    });
    $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    if(totalPriceForAllProducts===0){
      $('#form-checkout button[type="submit"]').prop('disabled',true);
    }
  }
  var citiesByCountry = {
    sa: [
      'الرياض',
      'جدة'
    ],
    eg: [
      'القاهرة',
      'الاسكندرية'
    ],
    jo: [
      'عمّان',
      'الزرقاء'
    ],
    sy: [
      'دمشق',
      'حلب',
      'حُمص'
    ]
  };
  //عندما يتغير البلد
  $('#form-checkout select[name="country"]').change(function(){
    
  //اجلب رمز البلد
  var country = $(this).val();
  //اجلب مدن هذا الرمز
  var cities = citiesByCountry[country];
  //فرغ حقل المدن 
  $('#form-checkout select[name="city"]').empty();
  $('#form-checkout select[name="city"]').append('<option disabled selected value="">اختر المدينة</option>');
  //أضف المدن إلى قائمة المدن
      
      // من أجل كل مدينة 
      cities.forEach(function(city){
        
      //إنشاء حقل اختيار جديد
      var $newOption = $('<option></option>');
      //إضافة النص
      $newOption.text(city);
      //إاضافة القيمة
      $newOption.val(city);
      //إضافة إلى حقل المدينة
      $('#form-checkout select[name="city"]').append($newOption);
      });

  });

  //عندما تتغير طريقة الدفع
  $('#form-checkout input[name="payment_method"]').change(function(){
    
  // اجلب القيمة المختارة حالياً
  var paymentMethod = $(this).val();
  //إذا كانت عند التسليم
  if(paymentMethod==='on_delivery')
    //عطل حقول الإدخال لبطاقة الائتمان
    {
      $('#credit_card_info input').prop('disabled',true);
    }
  //وإلا 
    else{
        $('#credit_card_info input').prop('disabled',false);
    //قم بتفعيلها

    }
    $('#credit_card_info').toggle();
  });
})