(function () {
    // Google Tag Manager . Universal to APP+WEB Ecommerce Transpiler
    // David Vallejo @thyng
    // 2020-04-02

    // Define your GTM ID
    var gtm_container_id = "G-XXXXX";

    /*
    APP+WEB Objects Models for Reference    
    var item_model = {
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
    
    var promotion_model = {
        'promotion_id': promo.id,
        'promotion_name': promo.name,
        'creative_name': promo.creative,
        'creative_slot': promo.position,
        'location_id': undefined        
    }
    */


    if (gtm_container_id === "GTM-XXXXX") {
        console.log("You need to define your container ID");
        return;
    };
    if (!window.google_tag_manager[gtm_container_id]) {
        console.log("Container ID not loaded on the page");
        return;
    }
    var ecommerce = JSON.parse(JSON.stringify(google_tag_manager[gtm_container_id].dataLayer.get('ecommerce')));

    // Allowed EEC Actions List
    var eec_actions_list = {
        "promoClick": "select_promotion",
        "click": "select_item",
        "detail": "view_item",
        "add": "add_to_cart",
        "remove": "remove_from_cart",
        "checkout": "begin_checkout",
        "purchase": "purchase",
        "refund": "refund"
    };

    // APP+WEB Ecommerce Core Push Model
    var app_web_ecommerce = {
        event: undefined,
        ecommerce: {
            items: []
        }
    };

    // Grab Current EEC Actions
    var eec_action = Object.keys(ecommerce).filter(function (e) {
        if (Object.keys(eec_actions_list).indexOf(e) > -1)
            return e;;
    });

    if (eec_action.length === 1) {
        eec_action = eec_action[0];
    } else {
        eec_action = undefined;
    }

    // If there's an EEC Action we should look for products
    if (eec_action) {
        // Seeting the app_web event action
        app_web_ecommerce.event = eec_actions_list[eec_action];
        // promotion have a different model than other actions
        if (eec_action === 'promoClick') {
            var ecc_promotions = ecommerce[eec_action].promotions;
            if (ecc_promotions) {
                ecc_promotions.forEach(function (promo) {
                    app_web_ecommerce.ecommerce.items.push({
                        'promotion_id': promo.id,
                        'promotion_name': promo.name,
                        'creative_name': promo.creative,
                        'creative_slot': promo.position,
                        'location_id': undefined
                    });
                });
            }
        } else {
            if (eec_action) {
                var ecc_products = ecommerce[eec_action].products;
                if (ecc_products) {
                    ecc_products.forEach(function (item) {
                        app_web_ecommerce.ecommerce.items.push({
                            'item_id': item.id,
                            'item_name': item.name,
                            'item_brand': item.brand,
                            'item_category': (item.category && item.category.split('/')[0]) ? item.category.split('/')[0] : undefined,
                            'item_category2': (item.category && item.category.split('/')[1]) ? item.category.split('/')[1] : undefined,
                            'item_category3': (item.category && item.category.split('/')[2]) ? item.category.split('/')[2] : undefined,
                            'item_category4': (item.category && item.category.split('/')[3]) ? item.category.split('/')[3] : undefined,
                            'item_category5': (item.category && item.category.split('/')[4]) ? item.category.split('/')[4] : undefined,
                            'item_variant': item.variant,
                            'quantity': item.quantity,
                            'price': item.price,
                            'coupon': undefined,
                            'discount': undefined,
                            'item_list_name': undefined,
                            'item_list_id': undefined,
                            'index': item.position
                        });
                    });
                }
            }

            if (ecommerce[eec_action].actionField) {
                if (eec_action === 'purchase') {
                    app_web_ecommerce.ecommerce.transaction_id = ecommerce[eec_action].actionField.id || undefined;
                    app_web_ecommerce.ecommerce.affiliation = ecommerce[eec_action].actionField.affiliation || undefined;
                    app_web_ecommerce.ecommerce.value = ecommerce[eec_action].actionField.revenue || undefined;
                    app_web_ecommerce.ecommerce.tax = ecommerce[eec_action].actionField.tax || undefined;
                    app_web_ecommerce.ecommerce.shipping = ecommerce[eec_action].actionField.shipping || undefined;
                    app_web_ecommerce.ecommerce.coupon = ecommerce[eec_action].actionField.coupon || undefined;
                }
                if (eec_action === 'click') {
                    app_web_ecommerce.ecommerce.items[0].item_list_name = ecommerce[eec_action].actionField.list || undefined;
                }
            }
            dataLayer.push(app_web_ecommerce);
        }
    }

    // Impressions List
    if (ecommerce && ecommerce.impressions) {
        app_web_ecommerce.event = 'view_item_list';
        var ecc_products = ecommerce.impressions;
        if (ecc_products) {
            ecc_products.forEach(function (item) {
                app_web_ecommerce.ecommerce.items.push({
                    'item_id': item.id,
                    'item_name': item.name,
                    'item_brand': item.brand,
                    'item_category': (item.category && item.category.split('/')[0]) ? item.category.split('/')[0] : undefined,
                    'item_category2': (item.category && item.category.split('/')[1]) ? item.category.split('/')[1] : undefined,
                    'item_category3': (item.category && item.category.split('/')[2]) ? item.category.split('/')[2] : undefined,
                    'item_category4': (item.category && item.category.split('/')[3]) ? item.category.split('/')[3] : undefined,
                    'item_category5': (item.category && item.category.split('/')[4]) ? item.category.split('/')[4] : undefined,
                    'item_variant': item.variant,
                    'quantity': item.quantity,
                    'price': item.price,
                    'coupon': undefined,
                    'discount': undefined,
                    'item_list_name': undefined,
                    'item_list_id': undefined,
                    'index': item.position
                });
            })
        }
        dataLayer.push(app_web_ecommerce);
        app_web_ecommerce = {
            event: undefined,
            ecommerce: {
                items: []
            }
        };
    }

    // Promotion Views
    if (ecommerce && ecommerce.promoView && ecommerce.promoView.promotions) {
        app_web_ecommerce.event = 'view_promotion';
        var ecc_promotions = ecommerce.promoView.promotions;
        if (ecc_promotions) {
            ecc_promotions.forEach(function (promo) {
                app_web_ecommerce.ecommerce.items.push({
                    'promotion_id': promo.id,
                    'promotion_name': promo.name,
                    'creative_name': promo.creative,
                    'creative_slot': promo.position,
                    'location_id': undefined
                });
            });
        }
        dataLayer.push(app_web_ecommerce);
        app_web_ecommerce = {
            event: undefined,
            ecommerce: {
                items: []
            }
        };
    }
})();