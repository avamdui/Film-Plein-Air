function Cookies(options) {

    this.cookiesAccepted = false;
    this.pattern = '<div class="CookieBanner-desc">[[content]]</div><div class="CookieBanner-actionContainer"><a class="CookieBanner-infoLink" href="[[infoLink]]">[[infoContent]]</a><button id="CookieBannerAcceptButton" class="CookieBanner-button">[[acceptContent]]</button><button id="CookieBannerRefuseButton" class="CookieBanner-button">[[refuseContent]]</button></div>';

    this.init(options);

}



Cookies.prototype.init = function (options) {
    this.generateBanner(options);
    this.detectAcceptation();
};



Cookies.prototype.generateBanner = function (options) {
    // Default values
    var defaultContent = {
        content: "Do not forget to put your own content",
        infoContent: "Gestion de la vie privée",
        infoLink: "#",
        acceptContent: "Accepter",
        refuseContent: "Refuser"
    };

    // Check default values and replace them if new one is specify in function's arguments
    if (options) {
        for (var key in defaultContent) {
            if (options[key]) defaultContent[key] = options[key];
        }
    }



    // Create banner element
    var banner = document.createElement('div');
    banner.id = "CookieBanner";
    banner.classList.add('CookieBanner');

    // Create a copy of the pattern
    var html = this.pattern;

    // We replace each key by its value
    for (var property in defaultContent) {
        html = html.replace('[[' + property + ']]', defaultContent[property]);
    }

    // Send the new html to the banner
    banner.innerHTML = html;

    // And append everything to the <body>
    document.body.appendChild(banner);
};



Cookies.prototype.eatCookieBanner = function () {
    var cookieBanner = document.getElementById('CookieBanner');
    cookieBanner.style.display = "none";
},



    Cookies.prototype.detectAcceptation = function () {
        var that = this;

        Array.prototype.forEach.call(document.querySelectorAll('.CookieBanner-button'), function (el) {
            el.addEventListener('click', function () {
                // Eat cookies !
                that.eatCookieBanner();
                // Set global variable to true only if user likes cookies
                if (el.id === "CookieBannerAcceptButton") that.cookiesAccepted = true;
            });
        });

    }



Cookies.prototype.set = function (name, value, days) {
    // You cannot set any cookies if they are not accepted by the user
    if (this.cookiesAccepted === true) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
        alert("Cookie just set");
    }
    else alert("User doesn't want your bloody cookie ! You cannot set it.");
},



    Cookies.prototype.get = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        var len = ca.length;
        var i = 0;
        for (; i < len; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },



    Cookies.prototype.unset = function (name) {
        setCookie(name, "", -1);
    }



var cookies = new Cookies({
    content: "Ce site web utilise des cookies. Les cookies nous permettent de personnaliser le contenu et les annonces, d'offrir des fonctionnalités relatives aux médias sociaux et d'analyser notre trafic.Nous partageons également des informations sur l'utilisation de notre site avec nos partenaires de médias sociaux, de publicité et d'analyse, qui peuvent combiner celles- ci avec d'autres informations que vous leur avez fournies ou qu'ils ont collectées lors de votre utilisation de leurs services"
});





document.getElementById('button').addEventListener('click', function () {
    console.log('Cookies accepted : ' + cookies.cookiesAccepted)
});

document.getElementById('setCookieButton').addEventListener('click', function () {
    cookies.set('MyCookie', 'is cool');
});
