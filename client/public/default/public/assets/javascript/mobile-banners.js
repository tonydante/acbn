
// smart app banner

if ( navigator.userAgent.match(/iPad/i) ) {
  $f('head').append("<meta name='apple-itunes-app' content='app-id=605512891, app-argument=ios-promo'>");
} else if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) ) {
  $f('head').append("<meta name='apple-itunes-app' content='app-id=605512891, app-argument=ios-promo'>");
} else if ( navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Windows Phone/i) === null ) {

  var str =
    ['<meta name="author" content="Pelican State Credit Union" />',
    '<link rel="stylesheet" href="/application/assets/appbanner/smartappbanner.css" type="text/css" media="screen" />',
    '<meta name="google-play-app" content="app-id=com.abnb.mobile" />',
    '<meta name="TileImage" content="/application/assets/appbanner/icon.jpg" />'].join('\n');

  $f('head').append(str);
  $f(function () { $f.smartbanner({ title: 'ABNB Mobile', daysHidden: 0, daysReminder: 0 }) });

}
