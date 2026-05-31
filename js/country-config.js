/* ============================================
   COUNTRY CONFIG - Shared across all pages
   Reads selected_country from localStorage and
   dynamically adjusts currency & country text.
   ============================================ */
(function () {
    var countryConfigs = {
        'nigeria':      { name: 'Nigeria',      adjective: 'Nigerian',      symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-NG' },
        'ghana':        { name: 'Ghana',        adjective: 'Ghanaian',      symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-GH' },
        'kenya':        { name: 'Kenya',        adjective: 'Kenyan',        symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-KE' },
        'south-africa': { name: 'South Africa', adjective: 'South African', symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-ZA' },
        'zimbabwe':     { name: 'Zimbabwe',     adjective: 'Zimbabwean',    symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-ZW' },
        'zambia':       { name: 'Zambia',       adjective: 'Zambian',       symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-ZM' },
        'uganda':       { name: 'Uganda',       adjective: 'Ugandan',       symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-UG' },
        'tanzania':     { name: 'Tanzania',     adjective: 'Tanzanian',     symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-TZ' },
        'botswana':     { name: 'Botswana',     adjective: 'Motswana',      symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-BW' },
        'namibia':      { name: 'Namibia',      adjective: 'Namibian',      symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-NA' },
        'rwanda':       { name: 'Rwanda',       adjective: 'Rwandan',       symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-RW' },
        'malawi':       { name: 'Malawi',       adjective: 'Malawian',      symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-MW' },
        'sierra-leone': { name: 'Sierra Leone', adjective: 'Sierra Leonean',symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-SL' },
        'liberia':      { name: 'Liberia',      adjective: 'Liberian',      symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-LR' },
        'gambia':       { name: 'Gambia',       adjective: 'Gambian',       symbol: '$ ', currency: 'USD', rate: 1, locale: 'en-GM' }
    };

    var countryKey = new URLSearchParams(window.location.search).get('country') || localStorage.getItem('selected_country') || 'nigeria';
    localStorage.setItem('selected_country', countryKey);
    var config = countryConfigs[countryKey] || countryConfigs['nigeria'];

    // Expose globally
    window.COUNTRY_CONFIG = config;
    window.USER_COUNTRY = config.name;
    window.COUNTRY_KEY = countryKey;

    // Replace all hardcoded N$ values and country names on the page once DOM is ready
    function replaceCurrency() {
        var walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        var node;
        while (node = walker.nextNode()) {
            var parent = node.parentNode;
            if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) continue;

            var text = node.nodeValue;
            if (text.indexOf('N$') !== -1) {
                node.nodeValue = text.replace(/N\$\s?/g, config.symbol);
            }
        }

        // Replace country name references in visible text
        var walker2 = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        while (node = walker2.nextNode()) {
            var parent = node.parentNode;
            if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) continue;
            if (node.nodeValue.indexOf('Namibia') !== -1) {
                node.nodeValue = node.nodeValue.replace(/\bNamibia\b/g, config.name);
            }
            if (node.nodeValue.indexOf('Namibian') !== -1) {
                node.nodeValue = node.nodeValue.replace(/\bNamibian\b/g, config.adjective);
            }
        }

        // Update page title
        if (document.title.indexOf('Namibia') !== -1) {
            document.title = document.title.replace(/Namibia/g, config.name);
        }

        // Update meta tags
        var metas = document.querySelectorAll('meta[content]');
        for (var i = 0; i < metas.length; i++) {
            var content = metas[i].getAttribute('content');
            if (content && content.indexOf('Namibia') !== -1) {
                metas[i].setAttribute('content', content.replace(/Namibia/g, config.name));
            }
            if (content && content.indexOf('N$') !== -1) {
                metas[i].setAttribute('content', content.replace(/N\$\s?/g, config.symbol));
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', replaceCurrency);
    } else {
        replaceCurrency();
    }
})();
