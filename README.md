
# APP+WEB Enhanced Ecommerce Traspiler for GTM 

Google Analytics just added support Enhnaced Ecommerce for APP+WEB, but the current dataLayer model has changed.
This code will try to take care of transpiling the well-known EEC Universal DataLayer pushes model automatically to the new APP+WEB one.

#### BETA: This is an in-progress project. Please report issues.

### EEC Updates ( Not official ):

 - No Checkout Steps. now just one: Begin Checkout
 - Checkout options are now: add_shipping_info and add_payment_info
 - New ***discount*** metric for products
 - New ***item_list_id*** dimension for product impressions tracking
 - New ***location_id*** dimensions for promotion tracking

### More Info:

 - APP+WEB Enhanced Ecommerce GTM Devguide:
   [https://developers.google.com/analytics/devguides/collection/app-web/ecommerce](https://developers.google.com/analytics/devguides/collection/app-web/ecommerce)
   
 - APP+WEB Enhanced Ecommerce GTAG Devguide:     
   [https://developers.google.com/tag-manager/ecommerce-appweb](https://developers.google.com/tag-manager/ecommerce-appweb)

# Reference
## Events List
|name|description  |
|--|--|
|select_promotion|Promotion Click|
|select_item|Product Click|
|view_item|Product Detail View|
|add_to_cart|Add to Cart|
|remove_from_cart|Remove From Cart|
|begin_checkout|Checkout Step #1|
|purchase|Purchase|
|refund|Refund|
|view_item_list|Products Impressions List|
|view_promotion|Promotions Impressions List|
|add_payment_info|Payment Details Info|
|add_shipping_info|Shipping Details Info|


## Item Model
    {
          'item_id': undefined,        // &id
          'item_name': undefined,      // &nm
          'item_brand': undefined,     // &br
          'item_category': undefined,  // &ca
          'item_category2': undefined, // &c2
          'item_category3': undefined, // &c3
          'item_category4': undefined, // &c4
          'item_category5': undefined, // &c5
          'item_variant': undefined,   // &va
          'price': undefined,          // &pr
          'quantity': undefined,       // &qt
          'coupon': undefined,         // &cp
          'discount': undefined,       // &ds
          'item_list_name': undefined, // &ln
          'item_list_id': undefined,   // &li
          'index': undefined,          // &lp
        }
## Items (  )
    {
           '&pr1': 'idP12345~nmAndroid Warhol T-Shirt~lnSearch Results~brGoogle~caApparel/T-Shirts~vaBlack~lp1~qt2~pr2.0',          
           '&pr2': ...,          

    }


## Transaction
    {
          'transaction_id': undefined,    // &ep.transaction_id
          'affiliation': undefined,       // &ep.affiliation
          'revenue': undefined,           // &epn.value
          'tax': undefined,               // &epn.tax
          'shipping': undefined,          // &epn.shipping
          'coupon': undefined,            // &ep.coupon

    }
## Promotion Model

    { 
        'promotion_id': promo.id,         // &pi
        'promotion_name': promo.name,     // &pn
        'creative_name': promo.creative,  // &cn
        'creative_slot': promo.position,  // &cs
        'location_id': undefined          // &lo
    }



