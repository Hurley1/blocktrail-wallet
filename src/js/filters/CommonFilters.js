angular.module('blocktrail.wallet')
    .filter('toCurrencyTicker', function($rootScope, Currencies) {
        return function(input) {
            if (typeof Currencies.currencies[input] === "undefined") {
                if (input === 'BTC') {
                    return "BTC";
                }
                return input;
            } else {
                return Currencies.currencies[input].ticker || Currencies.currencies[input].code || input;
            }
        };
    })
    .filter('toCurrencySymbol', function($rootScope, Currencies) {
        return function(input) {
            if (typeof Currencies.currencies[input] === "undefined") {
                if (input === 'BTC') {
                    return '฿';
                }
                return input;
            } else {
                return Currencies.currencies[input].symbol || input;
            }
        };
    })
    .filter('languageName', function(blocktrailLocalisation) {
        return function(input) {
            return blocktrailLocalisation.languageName(input);
        };
    })
    .filter('confirmations', function($rootScope) {
        return function(input) {
            if (input) {
                return (parseInt($rootScope.blockHeight) - parseInt(input))+1;
            } else {
                return 0;
            }
        };
    })
    .filter('mathAbs', function() {
        return function(input) {
            return Math.abs(input);
        };
    })
    .filter('nl2br', function($sce){
        return function(msg) {
            return $sce.trustAsHtml((msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2'));
        }
    })
    .filter('contactInitials', function($rootScope) {
        return function(input) {
            //take the first and last word and return initials
            if (!input) {
                return input;
            }
            var regex = /\S+\s*/g;
            var words = input.trim().match(regex);
            if (words && words.length >= 2) {
                return (words[0][0]+words[words.length-1][0]).toUpperCase();
            } else if (words){
                return words[0][0].toUpperCase();
            } else {
                return input;
            }
        };
    })
    .filter('shortenCountryName', function() {
        return function(input) {
            //remove the bracket version of the country name
            if (!input) {
                return input;
            }
            var regex = /\(.+\)/g;
            return input.replace(regex, '');
        };
    })
    .filter('characters', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length >= chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                }else{
                    while(input.charAt(input.length-1) == ' '){
                        input = input.substr(0, input.length -1);
                    }
                }
                return input + '...';
            }
            return input;
        };
    })
    .filter('duration', function () {
        return function (input) {
            return moment.duration(input).humanize();
        };
    });
