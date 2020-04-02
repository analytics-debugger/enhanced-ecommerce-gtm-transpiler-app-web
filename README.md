
# APP+WEB Enhanced Ecommerce Traspiler for GTM 

Google Analytics just added support Enhnaced Ecommerce for APP+WEB, but the current dataLayer model has changed.

This code will try to take care of transpiling the well-known EEC Universal DataLayer pushes model automatically to the new APP+WEB one.

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


## Item Model

    {
          'item_id': undefined,
          'item_name': undefined,
          'item_brand': undefined,
          'item_category': undefined,
          'item_category2': undefined,
          'item_category3': undefined,
          'item_category4': undefined,
          'item_category5': undefined,
          'item_variant': undefined,
          'price': undefined,
          'quantity': undefined,
          'coupon': undefined,
          'discount': undefined,
          'item_list_name': undefined,
          'item_list_id': undefined,
          'index': undefined,
        };

## Promotion Model

    { 
        'promotion_id': promo.id,   
        'promotion_name': promo.name,
        'creative_name': promo.creative,
        'creative_slot': promo.position,
        'location_id': undefined
    }




