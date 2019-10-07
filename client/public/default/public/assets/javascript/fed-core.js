var FEDApp = FEDApp || {};
$f = FEDApp.$ = FEDApp.jQuery = jQuery;

var addthis_config = {ui_click: true};

// This avoids javascript errors for browsers that don't define the console object.
if(typeof(console) == "undefined") {
    console = {
        log : function(msg){}
    };
}

// Function Definitions
var SideContent = {
    
    sideContent: null,

    init: function(toggler) {
        
        // Set up the dom. IF you can't scroll on a device then you might have to add these elements to the layo.
        // var windowContent = $f('<div id="windowContent"></div');
        //          var sideContent = $f('<div id="sideContent"></div');
        //          var bigWrapper = $f('<div id="bigWrapper"></div');
        //          var body = $f('body');
        //          body.wrapInner(windowContent);
        //          body.prepend(sideContent);
        //          body.wrapInner(bigWrapper);
        // *****
        // Containers have been added in Home (Off Window Content) and Default (Off Window Content) Layouts
        // *****
        // body.wrapInner('<div id="windowContent"></div');
        // body.prepend('<div id="sideContent"></div');
        // body.wrapInner('<div id="bigWrapper"></div');
        
        body = $f('body');
        // Store sideContent for the other functions.
        SideContent.sideContent = $f('#sideContent');
    
        // Set up toggler
        toggler.click(function(evt){
            evt.stopPropagation();
            $f('#bigWrapper').toggleClass('sideActive');
        });
        
        $f('#windowContent').click(function(){
            $f('#bigWrapper').removeClass('sideActive');
        });
        
        // Hide sidecontent on resize
        ResizeMgr.add(function(){
            $f('#bigWrapper').removeClass('sideActive');
        },function(){});
    },
    
    addContent: function(content) {
        
        SideContent.sideContent.append(content);
    },
    
    clearAll: function() {
        SideContent.sideContent.empty();
    }
};

function setupOffWindowContent() {
    
    var nav = $f('.primaryNav').clone();
    var search = $f('.site-search').clone();
    var quickLinks = $f('.quickLinks').clone();
    var toggler = $f('.primaryNavLink');
    var homelink = "<a class='home' href='/' title='Home'>Home</a>";
    // var content = [search, nav, quickLinks];
   
    SideContent.init($f('#header .primaryNavLink'));
    SideContent.addContent(search);
    SideContent.addContent(homelink);
    SideContent.addContent(nav);
    SideContent.addContent(quickLinks);
   
}

// clickable container
function clickableContainer(target){
    target.click( function(){
        // Get the anchor tag.
        var a =  $f(this).find("a");

        // Get the href.
        var href = a.attr("href");
        // Make sure there's an href.
        if(!href)
            return false;

        // Check if we need to show a speedbump.
        var showSpeedBump = a.hasClass('confirm');
        if(showSpeedBump) {
            confirmAlert(href);
        }
        // Don't need to show speedbump.
        // Open PDFs and target=_blank in new window.
        else if( href.indexOf('.pdf') >= 0 || a.attr('target') == '_blank') {
            // Open in a new window.
            window.open(href);
        }
        else {
            // Open in current window.
            window.location = href;
        }

        return false;

    }).addClass('clickable');
}

function productTabs() {

    var offset = 40;
    var productDetails = $f('#productDetails');

    var tabContainer = $f('#productTabs');
    var tab = tabContainer.find('dt');
    var tabContent = tabContainer.find('dd');
    
    var accordionTabs = tabContainer.clone().filter(":last").addClass('mobile').attr('id','productTabsMobile'); // duplicate tabs to use accordion on mobile breakpoint
    tabContainer.after(accordionTabs); // add new mobile tab container immediately after desktop tabs
    tabContainer.addClass('noMobile');
    var tabContainerMobile = $f('#productTabsMobile');
    var tabMobile = tabContainerMobile.find('dt');
    var tabContentMobile = tabContainerMobile.find('dd');

    if (productDetails.hasClass('tabsLeft')) {
        setupDesktopTabsLeft();
    } else if (productDetails.hasClass('tabsAccordion')) {
        setupDesktopTabsAccordion();
    } else {
        setupDesktopTabsTop();
    }

    setupMobileTabs();

    // set up top tabs on desktop/tablet (>768)
    function setupDesktopTabsTop() {
        tab.addClass('label').eq(0).addClass('selected');

        tabContent
            .addClass('pane')
            .wrapInner('<div class="tabDiv"></div>')
            .not("dd:eq(0)").hide();

        tabContainer.css('height', $f('#productTabs dd:eq(0)').outerHeight() + offset);

        tab.click(function(){
            var holdThis = $f(this);
            if(!holdThis.hasClass('selected')) {
                tab.removeClass('selected');
                holdThis.addClass('selected');

                tabContent.fadeOut();
                tabContainer.animate({ height : holdThis.next().outerHeight() + offset }, function(){
                     holdThis.next().fadeIn();
                });
             }
         });
    }

    function setupDesktopTabsLeft() {
        tab.click(function(){
            var holdThis = $f(this);
            tab.removeClass('selected').next().hide();
            holdThis.addClass('selected');

            // Resize container to dd
            tabContainer.stop(true,true).animate({ height : holdThis.next().outerHeight() + 'px' });
            holdThis.next().fadeIn(400);
          
        });
        tab.eq(0).click();
    }

    function setupDesktopTabsAccordion() {
        tabContent.hide();
        tab.click(function(){
             $f(this).toggleClass('selected').next().slideToggle();
        });
        tab.eq(0).click();
    }

    // set up accordioned mobile tabs (<767)
    function setupMobileTabs() {
        tabContentMobile.hide();
        tabMobile.click(function() {
            $f(this).toggleClass('selected').next().slideToggle();
        });
        tabMobile.eq(0).click();
    }

    // show tab based on url hash
    var target = document.URL.substr(document.URL.indexOf('#')+1);
        //console.log(target);
    if (window.location.hash) {
        $f('dt.'+target).click();
    }
}

function clickablePopup(target, fancyOptions) {
  var a = target.find('a');
  var href = a.attr('href');

  target.addClass('clickable');
  fancyOptions.href = href;
  // sets the source for the fancybox iframe from the <a> tag inside the container
  target.fancybox(fancyOptions);
  // opens fancybox popup
}

// Add elements that need a clickable container.
function setClickableContainers() {
    // Clickcable containers.
    clickableContainer($f('.productList:not(.forRates) > div, .prefooter > div'));
    clickableContainer($f('.featuredProducts .fp'));
    clickableContainer($f('.kasasaLinks > div'));
}


function setupTables() {
    var tables = $f('.table.split');

    tables.each(function(){

        var newLayout = $f('<table class="split"/>');

        // Split the rows up into the header row (<th/>) and data rows (<td/>).
        var table = $f(this);
        var rows = table.find('tr');
        var headings = rows.eq(0).children();
        var dataRows = rows.slice(1);


        dataRows.each(function(){
            var row = $f(this);
            var columns = row.children();

            columns.each(function(index){
                var heading = headings.eq(index).html();
                var data = $f(this).html();
                if( index % headings.length === 0 ) {
                    // new "column"
                    newLayout.append('<tr><th colspan="2">' + data + '</th></tr>');
                }
                else {
                    newLayout.append('<tr><td>' + heading + '</td><td>' + data + '</td></tr>');
                }
            });
        });

        // Display new headings and data
        table.append(newLayout);
    });
}

function pollContent(content, callback) {
    var numTries = 0;
    var maxTries = 5;
    var interval = 500;
    
    var id = setInterval( function() {
        console.log( 'checking for ' + content );
        
        numTries+=1;
        
        var c = $f( content );
        if( c.length > 0 || numTries > maxTries ) {
            clearInterval(id);
            callback( c );
        }
        
    }, interval);
}


var ResizeMgr = {
    onStarts: new Array(), // array of functions to call when user starts to resize the window.
    onCompletes: new Array(), // array of functions to call when user has finished resizing the window.
    interval: null,
    
    init: function(interval) {
        
        ResizeMgr.interval = interval;
        if(typeof(interval)==='undefined') {
            ResizeMgr.interval = 250;
        }
    },
    add: function(onStart, onComplete) {
        ResizeMgr.onStarts.push(onStart);
        
        ResizeMgr.onCompletes.push(onComplete);
    },
    start: function() {
        
        // Need to track when we call the onStarts and onCompletes.
        var calledOnStarts = false;
        var calledOnCompletes = false;
        
        // Get the width of the window.
        var winWidth = window.outerWidth;
        
        // Set up the function that gets called every interval period.
        setInterval(function(){
            
            //  check if the window width has changed.
            if ( winWidth != window.outerWidth ) {
                // Reset the called on completes.
                calledOnCompletes = false;
                
                // if not notifi
                if( calledOnStarts === false ) {
                    // call onStarts
                    for( var i = 0; i < ResizeMgr.onStarts.length; i++ ) {
                        ResizeMgr.onStarts[ i ]();
                    }
                    
                    calledOnStarts = true;
                }
             
                // set the new width
                winWidth = window.outerWidth;
                
            } else { // else width is same not resizing or resizing complete
                // Reset the called on starts.
                calledOnStarts = false;
                
                // if not notified 
                if( calledOnCompletes === false ) {
                    // notify
                    for( var i = 0; i < ResizeMgr.onCompletes.length; i++ ) {
                        ResizeMgr.onCompletes[ i ]( winWidth );
                    }

                    calledOnCompletes = true;
                }
                    
            }
            
        }, ResizeMgr.interval);
    },
    
    isWindowSmall: function() { return window.outerWidth <= 767; },
    isWindowLarge: function() { return window.outerWidth > 767; }
};

ResizeMgr.init();
ResizeMgr.start();

(function ( $ ) {
     $.fn.toggles = function( elem ) {

         var obj = typeof elem === "string" ? $(elem) : elem;

         $(this).click(function(){
            $(this).toggleClass('active');
            $(obj).toggleClass('active');
         });
         return this;
     };


}( FEDApp.jQuery ));

