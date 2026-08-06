var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/* -- Filter Plugin -- */

!function(n){"use strict";n.fn.masonryFilter=function(e){var i=function(n){setTimeout(function(){n.masonry("layout")},100)},t=function(t){var r=t.masonry("getAllItems"),o=[],s=[];n.each(r,function(i){var t=r[i],a=n(t.element),u=e.filter&&e.filter.call(a);u?t.isHidden&&(t.isIgnored=!1,o.push(t)):t.isHidden||(t.isIgnored=!0,s.push(t))}),t.masonry("hide",s),t.masonry("reveal",o),i(t)};return this.each(function(){var e=n(this);t(e)})}}(window.jQuery);
}

/*
     FILE ARCHIVED ON 09:54:44 Jan 14, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:32:52 Aug 06, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.634
  exclusion.robots: 0.055
  exclusion.robots.policy: 0.042
  esindex: 0.01
  cdx.remote: 5.766
  LoadShardBlock: 151.759 (3)
  PetaboxLoader3.datanode: 60.935 (4)
  PetaboxLoader3.resolve: 128.796 (3)
  load_resource: 50.025
*/