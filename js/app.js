$(() => {

///////////////////// Calculator
////////
//     Variables from html elements
    // inputs
    let productsQuantity = $('#productsQuantity');
    let orderQuantity = $('#orderQuantity');

    //package selector
    let selectPackage = $('#selectPackage');

    let selectPackageSelectorDown = $('.selectPackageSelectorDown');
    let selectPackageSelectorUp = $('.selectPackageSelectorUp');

    let calculatorFormSelect = $('.calculatorFormSelect');
    let basic = calculatorFormSelect.find('.basic');
    let pro = calculatorFormSelect.find('.pro');
    let premium = calculatorFormSelect.find('.premium');

    //checkboxes

    let accountingService = $('.accountingService');
    let terminal = $('.terminal');

////////
//     Calculator prices, etc.

    let productsPriceTxt = $('.productsPrice');
    let productsSumTxt = $('.productsSum');

    let ordersPriceTxt = $('.ordersPrice');
    let ordersSumTxt = $('.ordersSum');

    let packageTxt = $('.package');
    let packagePriceTxt = $('.packagePrice');

    let accountingPriceTxt = $('.accountingPrice');
    let terminalPriceTxt = $('.terminalPrice');

    let priceSumTxt = $('.priceSum');

////////
/////////////////////

// main prices
    const productPrice = 0.5;
    const orderPrice = 0.25;
    const packagePrice = 20;
    const accountServicePrice = 35;
    const terminalPrice = 5;

// given variables


    let givenProductQuantity = 0;
    let givenOrderQuantity = 0;
    let givenPackage = 0;
    let givenAccountingService = 1;
    let givenTerminal = 1;

// sum all

    let productSum = 0;
    let orderSum = 0;
    let packageSum = 0;
    let accServiceSum = 35;
    let terminalSum = 5;

    let totalSum = 0;

    // -------


// functions loaded on start

    getProductQuantity();
    getOrderQuantity();
    packageSelectorClick();
    nowSelectPackage();
    checkAcSrv();
    checkTerminal();
    /////

    // getting inputs values


    function getProductQuantity() {

        productsQuantity.on('change', function () {
            let value = Math.floor(productsQuantity.val());
            productsQuantity.val(value);
            givenProductQuantity = value;
            if (givenProductQuantity <= 0) {
                productsQuantity.val(0);
                givenProductQuantity = 0;
            } else if (givenProductQuantity >= 999) {
                productsQuantity.val(999);
                givenProductQuantity = 999;
            }
            countProductPrice(givenProductQuantity, productPrice);
            totalSumShow();
        });
        productsQuantity.on('keypress', function (k) {

            let keyPressed = k.which;
            if (keyPressed === 13 && $(this).focusin()) {
                $(this).blur();
                orderQuantity.focus();
            }
        });

        return givenProductQuantity;
    }

    function getOrderQuantity() {

        orderQuantity.on('change', function () {
            let value = Math.floor(orderQuantity.val());
            orderQuantity.val(value);
            givenOrderQuantity = value;
            if (givenOrderQuantity <= 0) {
                orderQuantity.val(0);
                givenOrderQuantity = 0;
            } else if (givenOrderQuantity >= 999) {
                orderQuantity.val(999);
                givenOrderQuantity = 999;
            }
            countOrderPrice(givenOrderQuantity, orderPrice);
            totalSumShow();
        });
        orderQuantity.on('keypress', function (k) {
            let keyPressed = k.which;
            if (keyPressed === 13 && $(this).focusin()) {
                $(this).blur();
                if (selectPackageSelectorUp.hasClass("none")) {
                    selectPackageSelectorDown.focus();
                } else {
                    selectPackageSelectorUp.focus();
                }
            }
        });
        return givenOrderQuantity;
    }


    //check package selector click

    function packageSelectorClick() {
        if (selectPackageSelectorDown.hasClass("none")){
            selectPackage.on('click', () => {
                selectPackageSelectorUp.trigger('click');
            })
        }else{
            selectPackage.on('click', () => {
                selectPackageSelectorDown.trigger('click');
            })
        }

        selectPackageSelectorDown.on('click', function () {
            $(this).blur();
            calculatorFormSelect.slideToggle(function () {
                $(this).toggleClass("none");
            });
            selectPackageSelectorUp.toggleClass("none");
            selectPackageSelectorDown.toggleClass("none");
        });
        selectPackageSelectorUp.on('click', function () {
            $(this).blur();
            calculatorFormSelect.slideToggle(function () {
                $(this).toggleClass("none");
            });
            selectPackageSelectorUp.toggleClass("none");
            selectPackageSelectorDown.toggleClass("none");
        })
    }

    // check selected package

    function nowSelectPackage() {
        basic.on('click', function () {
            givenPackage = 1;
            selectPackageSelectorUp.toggleClass("none");
            selectPackageSelectorDown.toggleClass("none");
            calculatorFormSelect.slideToggle(function () {
                $(this).toggleClass("none");
            });
            selectPackage.val("Podstawowy");
            countPackagePrice(givenPackage, packagePrice, selectPackage.val());
            totalSumShow();

        });
        pro.on('click', function () {
            givenPackage = 2;
            selectPackageSelectorUp.toggleClass("none");
            selectPackageSelectorDown.toggleClass("none");
            calculatorFormSelect.slideToggle(function () {
                $(this).toggleClass("none");
            });
            selectPackage.val("Profesjonalny");
            countPackagePrice(givenPackage, packagePrice, selectPackage.val());
            totalSumShow();
        });
        premium.on('click', function () {
            givenPackage = 3;
            selectPackageSelectorUp.toggleClass("none");
            selectPackageSelectorDown.toggleClass("none");
            calculatorFormSelect.slideToggle(function () {
                $(this).toggleClass("none");
            });
            selectPackage.val("Premium");
            countPackagePrice(givenPackage, packagePrice, selectPackage.val());
            totalSumShow();
        });
        return givenPackage;
    }

    // check accounting service and terminal

    function checkAcSrv() {
        accountingService.on("click", function () {
            if ($(this).prop("checked")) {
                givenAccountingService = 1;
            } else {
                givenAccountingService = 0;
            }
            countAcServCount(givenAccountingService, accountServicePrice);
            totalSumShow();
        })
    }

    function checkTerminal() {
        terminal.on("click", function () {
            if ($(this).prop("checked")) {
                givenTerminal = 1;
            } else {
                givenTerminal = 0;
            }
            terminalCount(givenTerminal, terminalPrice);
            totalSumShow();
        })
    }

    ///////// count and show it

    function countProductPrice(quantity, price) {
        let qty = quantity;
        let pr = price;
        if (qty > 0) {
            productSum = qty * pr;
            $(productsPriceTxt).text(qty + " * " + pr + "$");
            $(productsSumTxt).text(productSum + "$");
        } else {
            productSum = 0;
            $(productsPriceTxt).empty();
            $(productsSumTxt).empty();
        }
    }

    function countOrderPrice(quantity, price) {
        let qty = quantity;
        let pr = price;
        if (qty > 0) {
            orderSum = qty * pr;
            $(ordersPriceTxt).text(qty + " * " + pr + "$");
            $(ordersSumTxt).text(orderSum + "$");
        } else {
            orderSum = 0;
            $(ordersPriceTxt).empty();
            $(ordersSumTxt).empty();
        }
    }

    function countPackagePrice(pnum, price, pval) {
        let pNumber = pnum;
        let pPrice = price;
        if (pNumber > 0) {
            packageSum = pNumber * pPrice;
            $(packageTxt).text(pval);
            $(packagePriceTxt).text(packageSum + "$");
        } else {
            packageSum = 0;
            $(packageTxt).empty();
            $(packagePriceTxt).empty();
        }
    }

    function countAcServCount(check, price) {
        let sCheck = check;
        let sPrice = price;
        accServiceSum = sCheck * sPrice;
        $(accountingPriceTxt).text(accServiceSum + "$");

    }

    function terminalCount(check, price) {
        let tCheck = check;
        let tPrice = price;
        terminalSum = tCheck * tPrice;
        $(terminalPriceTxt).text(terminalSum + "$");
    }

    function totalSumShow() {
        totalSum = productSum + orderSum + packageSum + accServiceSum + terminalSum;
        $(priceSumTxt).text(totalSum + "$");
    }


// const time = setInterval(function() {
//     console.log(givenProductQuantity, givenOrderQuantity, givenPackage, givenAccountingService, givenTerminal,productSum);
// }, 500);

})
;