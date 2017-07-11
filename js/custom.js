$(document).ready(function() {

  $.getJSON('js/store_items.json', function(data) {
      $.each(data, function(index, item) {
        $('#fruits').find('.row').append($('<div class="col-xs-3 item" id="'+item.itemName.split(' ').join('_')+'"><img src='+item.imgSrc+' alt="'+item.itemName+'" /><p class="name" title="'+item.itemName+'">'+item.itemName+'</p><p class="stock"><span class="price">$'+item.price+'</span>&nbsp;<span class="qty">'+item.quantityRemaining+'</span>&nbsp;In Stock</p><button class="add">Add To Cart</button></div>'));
      });
  });

  $('.container').on('click', '.add', (function () {
    addItem($(this).closest("div").prop("id"));
  }));

  $('.container').on('click', '.item_inc', (function () {
    addItem($(this).parent().parent().data("item"));
  }));

  $('.container').on('click', '.item_dec', (function () {
    removeItem($(this).parent().parent().data("item"));
  }));

  $('.container').on('click', '.delete', (function () {
    deleteCartRow($(this).parent());
  }));

  $('.container').on('click', '#empty', (function () {
      window.location.reload(true);
  }));

  $('.container').on('click', '#confirm', (function () {
      alert('Heading to checkout!');
  }));

  function addItem(i) {
    var itemQty = parseInt($('#'+i).find($('.qty')).html());
    var itemPrice = parseFloat($('#'+i).find($('.price')).html().slice(1));
    var totalCartItems = parseInt($('#items').find('span').html());
    var totalCartPrice = parseFloat($('#total').find('span').html());
    if (itemQty>0) {
      totalCartItems++;
      $('#items').find('span').html(totalCartItems);
      itemQty--;
      $('#'+i).find($('.qty')).html(itemQty);
      totalCartPrice = totalCartPrice + itemPrice;
      $('#total').find('span').html(totalCartPrice.toFixed(2));
      addCartItem(i);
    } else {
      alert('Item is out of stock');
    }    
  }

  function addCartItem(i) {
    if ($(".cart_item[data-item="+i+"]").length) {
      addItemQty(i);
    } else {
      addCartRow(i);
    }
  }

  function addItemQty(i) {
    var thisItem = $(".cart_item[data-item="+i+"]");
    var totalItems = parseInt(thisItem.find('.cart_item_count').html());
    var totalPrice = parseFloat(thisItem.find('.cart_item_price').html().slice(thisItem.find('.cart_item_price').html().indexOf('$')+1));
    totalItems++;
    thisItem.find('.cart_item_count').html(totalItems);
    thisItem.find('.total_item_price').html((totalItems*totalPrice).toFixed(2));
  }

  function addCartRow(i) {
    var imgSrc = $('#'+i).find('img').attr('src');
    var itemPrice = $('#'+i).find($('.price')).html().slice(1);
    $('<div class="cart_item" data-item='+i+'><img src="'+imgSrc+'" alt="'+i+'"><div class="cart_count"><button class="item_dec">-</button><div class="cart_item_count">1</div><button class="item_inc">+</button></div><br><p class="cart_item_price">@ $'+itemPrice+' each = $<span class="total_item_price">'+itemPrice+'</span></p><p class="delete"><a href="javascript:void(0);">Delete</a></p></div>').insertAfter("#items");
  }

  function removeItem(i) {
    var thisItem = $(".cart_item[data-item="+i+"]");
    var itemQty = parseInt($('#'+i).find($('.qty')).html());
    var itemPrice = parseFloat($('#'+i).find($('.price')).html().slice(1));
    var totalItems = parseInt($(thisItem).find($('.cart_item_count')).html());
    var totalPrice = parseFloat($(thisItem).find($('.total_item_price')).html());
    var totalCartItems = parseInt($('#items').find('span').html());
    var totalCartPrice = parseFloat($('#total').find('span').html());
    if (totalItems>0) {
      totalCartItems--;
      $('#items').find('span').html(totalCartItems);
      totalCartPrice = totalCartPrice - itemPrice;
      $('#total').find('span').html(totalCartPrice.toFixed(2));
      totalItems--;
      $(thisItem).find($('.cart_item_count')).html(totalItems);
      totalPrice = totalPrice - itemPrice;
      $(thisItem).find($('.total_item_price')).html(totalPrice.toFixed(2));
      itemQty++;
      $('#'+i).find($('.qty')).html(itemQty);
    } else {
      $(thisItem).remove();
    }
  }

  function deleteCartRow(i) {
    var totalItems = parseInt($(i).find('.cart_item_count').html());
    var totalPrice = parseFloat($(i).find('.total_item_price').html());
    var totalCartItems = parseInt($('#items').find('span').html());
    var totalCartPrice = parseFloat($('#total').find('span').html());
    var itemQty = parseInt($("#"+$(i).data("item")).find('.qty').html());
    totalCartItems = totalCartItems - totalItems;
    $('#items').find('span').html(totalCartItems);
    totalCartPrice = totalCartPrice - totalPrice;
    $('#total').find('span').html(totalCartPrice.toFixed(2));
    itemQty = itemQty + totalItems;
    $("#"+$(i).data("item")).find('.qty').html(itemQty);
    $(i).remove();
  }

});