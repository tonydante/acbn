
//
// Global Variables
//


fiName = siteSettings.name;

	slideSpeed = 300,
	tabEffect = "fade",
	overlayColorVar = '#111';   // Set FancyBox Background Color

// variables to use with Modernizr
var mq_smallWindow = 'only all and (max-width: 767px)';
var mq_largeWindow = 'only all and (min-width: 768px)';

//
// Document Ready Event
//

$f(document).ready( function() {
    firstBranchLogo.setupFBLogo();

    $f('body').addClass('js');


    setupOffWindowContent();

    addConfirmMenuLink("deluxe.com","confirm");

    if (typeof fiName !== 'undefined') {
        setSpeedBumps();
    }

    if ($f('.featured-rate').length) {
        setupFeaturedRates();
    }  

    if($f('#searchResultsWrapper').length) {
        setupSearchPage();
    } 

    if ($f('body.faqs').length) {
        setupJumpMenu();
        $f('.secondaryButtons').hide();
    }

    setupAccordions();

    if ($f('.primaryButton').length) {
        // Rename Questions popup to Request Info
        $f('.primaryButton a[href*="dynamicFormType=tellMeMore"]').each(function() {
            $f(this).attr('href', $f(this).attr('href') + '&title=Request_Info');
        });
    }

    if ($f('body.investments').length) {
        $f('.pageTitle h1').append("<span>Products and services available through CUSO Financial Services, L.P.*</span>");
    }

    if ($f('body.financial-counseling').length) {
        var moveseminars = $f('.productList').detach();
        $f('.tab-seminars + .accordion-content').append(moveseminars);
    }

    if ($f('.content + .accordion').length) {
        $f('.content').eq(0).addClass('watermark');
    }

    if ($f('.testimonial-wrapper .cycle-slideshow > div').length == 0) {
        $f('.testimonial-wrapper').hide();
    }

    if ($f('.comparisonWrapper').length) {
        setupComparisonChart();

        if (Modernizr.mq(mq_largeWindow)) {
            setupComparisonChartHeights($f('.account-details > .section:first-of-type'));
            setupComparisonChartHeights($f('.account-details > .section:nth-child(2)'));
            setupComparisonChartHeights($f('.account-details > .section:nth-child(3)'));
        }
    }

    if ($f('.contact-faqs').length) {

        $f('#answers > div').hide();

        $f('#faqs').change(function() {
            var answer = $f(this).val();
            $f('#answers > div').fadeOut(0);
            if (answer) {
                $f('#answers').find('#'+answer).fadeIn();
            }
            
        });
    }

    if ($f('.account-finder-wrapper').length) {
        setupAccountFinder();
    }


    $f('.togglesNext').click(function(){
        $f(this).toggleClass('active').next().slideToggle();
    });

    $f('.togglesNextMobile').click(function(){
        if (Modernizr.mq(mq_smallWindow)) {
            $f(this).toggleClass('active').next().slideToggle();
            $f(this).parent().toggleClass('active');
        }
    });

    if (typeof setupSharePopup !== 'undefined') {
        setupSharePopup({
            'rounded': true, // true or false
            'trigger': $f(".share"),
            'appended': $f(".share")
        });
    }

    if ($f('.form').length) {
        findOptionalFields();
        $f('body').not('.popup').addClass('hasCaptcha');
    }

    // if ($f('ul.primaryNav').length) {
    //     $f("ul.primaryNav a").each(function() {
    //         if (this.href.indexOf('http://abnbfcu.org/')) {
    //             var myLink = $f('ul.primaryNav a').attr("href");
    //             $f('ul.primaryNav a').attr("href",myLink.replace('http://abnbfcu.org/','/'));
    //         }
    //     });
    // } 

	setupTables();
    // clickable containers not playing well in edit mode.
    if (!$f('.dotContainer').length) {
        setClickableContainers();
    }
    if ($f('.secondaryRequest').length) {
		var questionsLink = $f('.questions a').clone();
		questionsLink.addClass('secondaryButton secondRequest');
        // Rename Questions popup to Request Info
        $f('.secondaryRequest').replaceWith(questionsLink);
    }
	
    popupify();
    setPopups();
    setupDropdownNav();
    setupMobileMenu();



});

//
// Window Load Event
//

$f(window).load(function(){

	setPrintLinks($f('.print'));

    if($f('#locationsPage').length) {
		fedMaps.numLocations = 20;
		fedMaps.setupLocationsPage();
        $f('.branchName .seeMap').click(function(e) { e.stopPropagation(); });
    }

	$f('.oblToggler').toggles($f('.oblToggled'));
    $f('.searchToggler').toggles($f('.search'));

    // if (typeof setupBVLogo !== "undefined") {
    //     setupBVLogo({
    //         'element': $j('#bv-logo'),
    //         'r': 102, 'g': 102, 'b':102, 'a': 1.0,
    //         'fallback': "bv-logo-fallback-dark.png"
    //     });
    // }

});

function addConfirmMenuLink(match, classname) {
    var matchthis = match;
    // only iterate thru named navigations
    $f('.primaryNav a, .calcList a, .productList .product a, .secondaryNav a').each(function() {
        var href = $f(this).attr('href');

        if ( (href) && (href.indexOf(matchthis) >= 0) ) {
            $f(this).addClass(classname);
        }
        
    });
}

function setupComparisonChart() {

    // wrap each detail section
    $f('.account-details h4').each( function() {
        $f(this).nextUntil('h4').andSelf().wrapAll('<div class="section"></div>');
    });

}

function setupComparisonChartHeights(target) {
  
  var elementHeights = $f(target).map(function() {
    return $f(this).outerHeight();
  }).get();
  var maxHeight = Math.max.apply(null, elementHeights);
  $f(target).height(maxHeight);

}

function setupAccordions() {
    var accordion = $f('.accordion');
    var accordionTop = accordion.find('> .accordion-title');
    var accordionBottom = accordion.find('> .accordion-content');

    accordionBottom.hide();

    accordionTop.click(function(){
        $f(this).toggleClass('active').next().slideToggle();
    });

    console.log(accordionTop.length);

    // if landing on rates from a product, expand all accordions
    if ($f('#ratesPage').length && window.location.hash) {
        accordionBottom.show();
        accordionTop.addClass('active');
    } else if (accordionTop.length == 1 && !$f('#ratesPage').length) {
        accordionTop.eq(0).click();
    } 
   
    // show tab based on url hash
    var target = document.URL.substr(document.URL.indexOf('#')+1);
        //console.log(target);
    if (window.location.hash) {
        $f('.'+target).click();
    }
}



function setupJumpMenu() {
    $f('.main .content').prepend('<ul id="jumpLinks">');

    $f.each($f('.content > h2'),function(index,value){
         //append the text of your header to a list item in a div, linking to an anchor we will create on the next line
         $f('#jumpLinks').append('<li><a href="#anchor-'+index+'">'+$f(this).html()+'</a></li>');
         //add an a tag to the header with a sequential name
         $f(this).html('<a id="anchor-'+index+'">'+$f(this).html()+'</a>');
     });

}



function setupAccountFinder() {

    var panel = $f('.af-panel');
    var section = $f('.af-section');
    var clickthru = $f('.af-panel > a:not(.result)');

    // start
    panel.not('.start').hide();
    section.not('.single').hide();


    
    // $f('div.start a').click(function(event) {
    //     event.preventDefault;
    //     event.stopPropagation;
    //     var gotopanel = $f(this).attr('href').split("#");

    //     //section.hide();
    //     section.each(function() {
    //         var path = $f(this).data('panel-path');
    //         if (path == gotopanel[1]) { 
    //             $f(this).fadeIn('slow');
    //             $f(this).find('.af-panel').eq(0).fadeIn('slow').addClass('seen'); 
    //         }
    //     });

    //     $f('div.start').hide();
    // });


    clickthru.click(function(event) {
        event.preventDefault;
        event.stopPropagation;

        var gotopanel = $f(this).attr('href').split("#");

        panel.hide();
        panel.each(function() {
            var path = $f(this).data('panel-path');
            if (path == gotopanel[1]) { 
                $f(this).fadeIn('slow');
                $f(this).not('.result').addClass('seen'); 
            }
        });

    });

    $f('.af-panel').delegate('.back', 'click', function() {
        panel.hide();
        $f(this).parent().parent().prevAll('.seen:first').fadeIn('slow');
    });

    $f('.af-panel').delegate('.restart', 'click', function() {
        panel.hide();
        section.not('.single').hide();
        $f('.start').fadeIn('slow');
    });

}

function setupFeaturedRates() {
    var rateswitch = $f('.featured-rate .rate-label');
    rateswitch.eq(0).addClass('active').children().addClass('active');

    rateswitch.click(function() {
        $f('.featured-rate').removeClass('active').children().removeClass('active');
        $f(this).parent().addClass('active').children().addClass('active');
    });

    // start with random rate

    var len = $f('.featured-rate').length;
    var random = Math.floor( Math.random() * len ) + 1;       

    $f('.featured-rate').eq(random).find('.rate-label').click();

}

function findOptionalFields() {
    var defaultmsg = $f('.form .help');
    defaultmsg.each(function() {
        var self = $f(this);
        if (self.find('.default').text() == "Optional") {
            self.prevAll().addClass('optional');
        }
    });
}

function popupify() {
    // Set no background links
    $f('a.noBG').each(function() {
        href = $f(this).attr('href');
        href += href.indexOf('?') != -1 ? '&' : '?';
        href +=  'noBG=true';
        $f(this).attr('href', href);
    });

    // Popupify CTAs
    ResizeMgr.add(function(){}, function(){
        var fancyboxLinks = $f('.fancybox');
        if (Modernizr.mq(mq_largeWindow) && !fancyboxLinks.length) {
            setPopups();
        } else if (Modernizr.mq(mq_smallWindow)) {
            fancyboxLinks.unbind().removeClass('fancybox fancybox.iframe');
        }
    });

    // If iframe not inside edit/preview
    FEDApp.previewModeTest = (typeof FEDApp.previewModeTest !== 'undefined') ? FEDApp.previewModeTest : false;
    if (self !== top && (!FEDApp.previewMode || FEDApp.previewModeTest)) {

        // Create basic popup layout
        if ($f('.main > *').length) {
            var content = $f('.main > *').detach();

            if (/noTitle=true/.test(document.location.search)) {
                content = content.not('.pageTitle');
            }

            if (!/noBG=true/.test(document.location.search)) {
                content = $f('<div class="outer"><div class="inner" /></div>').children().append(content).end();
            }


            $f('body').addClass('popup').html(content);
        }
        
        // Add targets to links
        $f('a.targetBlank').attr('target', '_blank');
        $f('a').not('[target]').attr('target', '_top');

        // Hide "back to" button on thank you pages
        $f('.thankYou > a').hide();
    }
}


function setPopups() {
    $f("a.secondRequest, .questions > a, a.requestInfo, #downstreamObl a, .comparisonChart a.noMobile, .currentAHPopup").addClass('fancybox fancybox.iframe');
    $f(".calcList a, .calcPopup").addClass('fancybox fancybox.iframe calc');

    $f('.videoEmbed').fancybox();

    if (Modernizr.mq(mq_largeWindow)) {
        $f('.questions > a, a.requestInfo, a.secondRequest').fancybox({
            padding     : 0,
            margin     : 10,
            maxWidth    : '400px',
            maxHeight   : '700px',
            fitToView   : false,
            width       : '100%',
            height      : '100%',
            autoSize    : false,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none'
        });

        $f('#downstreamObl a').fancybox({
            padding     : 0,
            margin     : 10,
            maxWidth    : '295px',
            maxHeight   : '345px',
            fitToView   : false,
            width       : '100%',
            height      : '100%',
            autoSize    : false,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none'
        });

        $f('.fancybox.calc').fancybox({
            padding     : 0,
            margin      : 0,
            maxWidth    : '635px', // why does fancybox add 15px? This should be 650px.
            maxHeight   : '745px',
            fitToView   : false,

            width       : '100%',
            height      : '100%',
            autoSize    : false,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none',
            beforeLoad : function(){ $f('body').addClass('calcPopup'); },
            afterClose : function(){ $f('body').removeClass('calcPopup'); }
        });

        $f('.comparisonChart a.noMobile').fancybox({
            padding     : 0,
            margin     : 10,
            maxWidth    : '650px',
            maxHeight   : '700px',
            fitToView   : false,
            width       : '100%',
            height      : '100%',
            autoSize    : false,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none'
        });

        $f('.currentAHPopup').fancybox({
            padding     : 0,
            margin     : 10,
            maxWidth    : '400px',
            maxHeight   : '300px',
            fitToView   : false,
            width       : '100%',
            height      : '100%',
            autoSize    : false,
            closeClick  : false,
            openEffect  : 'none',
            closeEffect : 'none'
        });
    }

    if (self !== top) {
        // Add targets to links
        $f('a.targetBlank').attr('target', '_blank');
        $f('a').not('[target]').attr('target', '_top');
    }
}

function setPrintLinks(target){
    target.click(function(){

        window.print();

    });
}

function setupSearchPage() {
    // get rid of SEO'd titles from search page
    var results = $f('#searchResultsWrapper .product');

    var totalresults = results.length;
    $f('.result-total').text(totalresults);

    results.each(function() {
        var text = $f(this).find('h3 > a').text().split("|");
        $f(this).find('h3 > a').text(text[0]);
    });
}

function setupDropdownNav() {
    var nav = $f('#header .primaryNav > li');
    var navlink = $f('#header .primaryNav > li > a');

    navlink.click(function(event) {
        event.preventDefault;
        return false;
    });

    nav.hover(function(event) {
        $f(this).children().addClass('active').next('ul').stop(true,true).delay(150).fadeIn(300);
    }, function(event) {
        $f(this).children().removeClass('active').next('ul').stop(true,true).fadeOut();
    });
}

function setupMobileMenu() {
    $f('#sideContent .primaryNav > li').addClass('inactive').filter('.inPath').toggleClass('active inactive');

    // Toggle nthTier dropdown
    var toggleableLinks = $f('#sideContent .primaryNav > li > a');
    toggleableLinks.click(function(e) {
        e.preventDefault();
        $f(this).parent().siblings().not($f(this).parent()).removeClass('active').addClass('inactive');
        $f(this).parent().toggleClass('active inactive');
    });
}

