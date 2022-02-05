/**
 *
 * @description Configuration
 *
 * @version 2015/11/13 ace 初始版本。
 * @version 2017/03/05 ace 新增Unveil.js(http://luis-almeida.github.io/unveil/)。
 * @version 2018/08/16 ace 新增requireJSFile屬性。
 *
 * @author ace
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web|Web technology for developers | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript|JavaScript | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference|JavaScript reference - JavaScript | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators|Expressions and operators - JavaScript | MDN}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof|typeof - JavaScript | MDN}
 *
 * @see {@link http://www.javascriptkit.com/|JavaScript Kit- Your comprehensive JavaScript, DHTML, CSS, and Ajax stop}
 * @see {@link http://www.javascriptkit.com/javatutors/|JavaScript Kit Advanced JavaScript Tutorials}
 * @see {@link http://www.javascriptkit.com/javatutors/trycatch2.shtml|The Error object and throwing your own errors}
 *
 * @memo 2021/07/02 ace Rhino沒有提供startsWith函數？
 *
 */

(function(root) {

	var result;
	
	if (typeof process !== 'undefined') {

		// nodeJS執行環境
		
		console.log('Process Configuration...');
		
		console.log('process.env.NODE_PATH: ' + process.env.NODE_PATH);
		// if (typeof process.env.NODE_PATH == 'undefined') throw new Error('NODE_PATH is undefined!');
		
		if (typeof nw !== 'undefined') {
		
			// NW.js執行環境
			
			// 採用HTML標籤引入資料時不會有module物件。
			if (typeof module === 'undefined') {
			
				result = root.tw.ace33022.DefaultConfiguration;
			}
			else {
			
				// result = require(process.env.NODE_PATH + '/' + 'tw/ace33022/DefaultConfiguration.js');
				result = require('tw/ace33022/DefaultConfiguration.js');
			}
		}
		else {
		
			result = require('tw/ace33022/DefaultConfiguration.js');
		}
	}
	else {

		if (typeof Packages !== 'undefined') {

			// Rhino執行環境
			
			// 從Java啟動來呼叫時，基本環境並沒有load。
			if (typeof load === 'undefined') load = function(file) { Packages.tw.ace33022.util.RhinoUtil.load(context, scope, new Packages.java.io.File(file)); }
			
			if (Packages.java.lang.System.getProperty('JSLibDir') == null) throw new Error('JSLibDir is undefined!');
			if (typeof print != 'undefined') print('JSLibDir:' + Packages.java.lang.System.getProperty('JSLibDir'));

			if (typeof print != 'undefined') print('load NameSpace...');
			load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/NameSpace.js');

			if (typeof print != 'undefined') print('load DefaultConfiguration...');
			load(Packages.java.lang.System.getProperty('JSLibDir') + '/tw/ace33022/DefaultConfiguration.js');
		}

		if (typeof root.tw === 'undefined') throw new Error('NameSpace is undefined!');
		if (typeof root.tw.ace33022.DefaultConfiguration === 'undefined') throw new Error('DefaultConfiguration is undefined!');
		
		result = root.tw.ace33022.DefaultConfiguration;
	}
	
	if (typeof result === 'undefined') throw new Error('DefaultConfiguration is undefined!');

	/**
	 *
	 * @description window.onload
	 *
	 * @see {@link https://api.jquery.com/ready/|.ready() | jQuery API Documentation}
	 *
	 * @see {@link https://blog.miniasp.com/post/2007/11/24/14-rules-for-faster-front-end-performance-notes|The Will Will Web | 加速前端網頁效能的14條規則}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10092601|jQuery 筆記 (四) window.onload 與 $(document).ready - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 * @see {@link https://blog.miniasp.com/post/2010/07/24/jQuery-ready-vs-load-vs-window-onload-event|The Will Will Web | 使用 jQuery(document).ready() 與 window.onload 注意事項}
	 *
	 * @comment 只要在註冊 window.onload 事件後才使用 $(document).ready() 就會導致 $(document).ready() 變的與 $(window).load() 的行為一樣，要等到網頁所有資源都下載完畢才會執行 $(document).ready() 中註冊的事件！
	 *
	 */
	// All resources finished loading!
	// window.addEventListener('load', function(event) {});
	
	/**
	 *
	 * @description DOMContentLoaded
	 *
	 * @see {@link https://developer.mozilla.org/zh-TW/docs/Web/Events/DOMContentLoaded|DOMContentLoaded - Event reference | MDN}
	 *
	 * @see {@link https://api.jquery.com/ready/|.ready() | jQuery API Documentation}
	 *
	 * @see {@link https://wowtianwen.iteye.com/blog/2100913|原生JS实现document.ready - - ITeye博客}
	 * @see {@link https://ithelp.ithome.com.tw/articles/10197335|重新認識 JavaScript 番外篇 (6) - 網頁的生命週期 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天}
	 *
	 */
	if ((typeof Packages === 'undefined') && (typeof document !== 'undefined')) {
	
		result["UIStyle"] = 'bootstrap';
		
		/**
		 *
		 * @description loadCSS
		 *
		 * @param {String} CSS檔案連結。
		 *
		 * @version 2019/02/15 ace 初始版本。
		 *
		 * @author ace
		 *
		 * @see {@link https://stackoverflow.com/questions/10457870/is-there-any-way-to-load-css-and-javascript-from-a-string|html - Is there any way to load css and javascript from a string? - Stack Overflow}
		 *
		 */
		result.loadCSS = function(src) {
				
			var link = document.createElement('link');
			
			link.setAttribute('type', 'text/css');
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('href', src);

			document.head.appendChild(link);
		}
		
		/**
		 *
		 * @description loadJS
		 *
		 * @version 2019/02/15 ace 初始版本。
		 *
		 * @author ace
		 *
		 * @see {@link http://rocksaying.tw/archives/11847511.html|跨網站載入與執行 JavaScript 的方式 - 石頭閒語}
		 * @see {@link https://hype.codes/how-include-js-file-another-js-file|How to include JS file to another JS file? | Hype.Codes}
		 * @see {@link https://stackoverflow.com/questions/3248384/document-createelementscript-synchronously|javascript - document.createElement("script") synchronously - Stack Overflow}
		 *
		 */
		result.loadJS = function() {
			
			function RemoveAfterLoaded() {
			
				var eleScripts = document.getElementsByTagName('head')[0].getElementsByTagName('script');
				var index;
				
				for (index = 0; index < eleScripts.length ; index++) {
				
					// 將此節點自 DOM 中移除。(ps.需等待瀏覽器進行垃圾回收，回收效率並不高。)
					if (objJS === eleScripts[index]) document.getElementsByTagName('head')[0].removeChild(this); 
				}
			};
			
			var script = document.createElement('script');
			var callback;
			var sourceFile;
			
			script.setAttribute('type', 'text/javascript');
			
			if (arguments.length === 3) {
			
				sourceFile = arguments[1];
				if (!sourceFile.endsWith('.js')) sourceFile += '.js';
			
				script.setAttribute('charset', arguments[0]);
				// script.setAttribute('src', arguments[1]);
				
				callback = arguments[2];
			}
			else {
			
				sourceFile = arguments[0];
				if (!sourceFile.endsWith('.js')) sourceFile += '.js';
				
				// script.setAttribute('src', arguments[0]);
				
				callback = arguments[1];
			}
			
			script.setAttribute('src', sourceFile);
			
			script.onload = function() { if (typeof callback === 'function') callback(); };
			
			document.head.appendChild(script);
		}
		
		result.loadNWInjectEnd = function() {
		
			var result = 'N';
			var index;

			var metas = document.getElementsByTagName('meta');

			for (index = 0; index < metas.length; index++) {

				if (metas[index].getAttribute('name') === 'load-nw_inject_end') {

					result = metas[index].getAttribute('content');
					break;
				}
			}

			return result;
		}
		
		document.addEventListener('DOMContentLoaded', function() {
		
			// nwJS的location.protocol也是定義成chrome-extension:。
			if ((result.location.protocol == 'chrome-extension:') || (result.location.protocol == 'file:')) {
			
				// NW.js由inject_js_end屬性載入執行。
				if (typeof nw === 'undefined') result.loadJS(location.pathname.substring(1, location.pathname.lastIndexOf('/') + 1) + 'nw_inject_end.js');
			}
			else if ((result.location.protocol == 'http:') || (result.location.protocol == 'https:')) {
				
				// if (result.loadNWInjectEnd() === 'Y') result.loadJS('nw_inject_end.js');
				// if (result.loadNWInjectEnd() === 'Y') result.loadJS(location.pathname.substring(1, location.pathname.lastIndexOf('/') + 1) + 'nw_inject_end.js');
				if (result.loadNWInjectEnd() === 'Y') result.loadJS(location.origin + location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1) + 'nw_inject_end.js');
			}
		});
	}

	// Browser environment
	// result["JSLibDir"] = 'javascript';
	result["DAODir"] = 'tw/ace33022/dao/browser';
	result["BrowserUIDir"] = 'tw/ace33022/program/browser/bootstrap';
	
	result["paths"]["tw.ace33022.util.InitReSetUtil"] = 'tw/ace33022/util/browser/InitReSetUtil';
	result["paths"]["tw.ace33022.util.CommonUtil"] = 'tw/ace33022/util/browser/CommonUtil';
	
	// result["paths"]["videojs"] = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/6.2.0/video.min';
	// result["paths"]["videojs-hotkeys"] = 'https://cdn.sc.gl/videojs-hotkeys/0.2/videojs.hotkeys.min';
	// result["paths"]["videojs-hotkeys"] = result["JSLibDir"] + '/tw/ace33022/util/browser/videojs.hotkeys.min';
	
	if ((typeof Packages === 'undefined') && (typeof document !== 'undefined')) {
	
		if ((result.location.protocol.indexOf('http') == 0) && (result.location.origin.indexOf('127.0.0.1') == -1) && (result.location.origin.indexOf('localhost') == -1)) {

				result["JSLibDir"] = 'https://ace33022.github.io/htdoc/javascript';

				// result["requirejsFile"] = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.js';
				result["requirejsFile"] = 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require';
				
				result["paths"]["underscore"] = 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min';
				result["paths"]["backbone"] = 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min';
				result["paths"]["tablesort"] = 'https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.0.2/tablesort.min';
				result["paths"]["tablesort.number"] = 'https://cdnjs.cloudflare.com/ajax/libs/tablesort/5.0.2/sorts/tablesort.number.min';
				
				result["paths"]["jquery"] = 'https://code.jquery.com/jquery-1.12.3.min';
				result["paths"]["bootstrap"] = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min';

				result["paths"]["jquery.unveil"] = 'https://cdnjs.cloudflare.com/ajax/libs/unveil/1.3.0/jquery.unveil.min';

				result["paths"]["bootbox"] = 'https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min';
				result["paths"]["bootstrap-fileinput"] = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.3.8/js/fileinput.min';
				result["paths"]["bootstrap-datetimepicker"] = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min';
				result["paths"]["x-editable-bootstrap"] = 'https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.1/bootstrap-editable/js/bootstrap-editable.min';
				result["paths"]["x-editable-bootstrap3"] = 'https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.1/bootstrap3-editable/js/bootstrap-editable.min';
					
				result["paths"]["jasny-rowlink"] = 'https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min';
					
				result["paths"]["highcharts"] = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.1.9/highcharts.src';

				result["paths"]["moment"] = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment';
				result["paths"]["sprintfjs"] = 'https://cdnjs.cloudflare.com/ajax/libs/sprintf/1.0.3/sprintf.min';
				result["paths"]["papaparse"] = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.4/papaparse.min';
				result["paths"]["filesaver"] = 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min';
				result["paths"]["md5"] = 'https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.7.0/js/md5.min';
				
				result["paths"]["js-logger"] = 'https://cdn.jsdelivr.net/npm/js-logger@1.6.1/src/logger.min';
				
				result["paths"]["wordcloud"] = 'https://cdnjs.cloudflare.com/ajax/libs/wordcloud2.js/1.0.6/wordcloud2.min';

				result["paths"]["leaflet"] = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.3/leaflet';
				result["paths"]["leaflet.EasyButton"] = 'https://cdnjs.cloudflare.com/ajax/libs/Leaflet.EasyButton/2.3.0/easy-button.min';
				
				result["paths"]["toastr"] = 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min';
				result["paths"]["peerjs"] = 'https://cdnjs.cloudflare.com/ajax/libs/peerjs/0.3.16/peer.min';
				
				// result["paths"]["firebase"] = 'https://www.gstatic.com/firebasejs/live/3.0/firebase';
				result["paths"]["firebase"] = 'https://www.gstatic.com/firebasejs/5.3.1/firebase';
				
				result["packages"] = new Array();
				
				/**
				 *
				 * @see {@link https://stackoverflow.com/questions/36500713/loading-codemirror-with-requirejs-from-cdn|javascript - Loading CodeMirror with RequireJS from CDN - Stack Overflow}
				 *
				 */
				result["packages"].push({
				
					"name": "codemirror",
					"location": "https://cdn.jsdelivr.net/npm/codemirror@5.46.0",
					"main": "lib/codemirror"
				});
				
				result.loadJS(result["JSLibDir"] + '/tw/ace33022/RequireJSConfig.js', function() {
				
					// document.getElementsByTagName('head')[0].getElementsByTagName('base')[0].setAttribute('href', 'https://ace33022.github.io/htdoc/');
					document.getElementsByTagName('head')[0].getElementsByTagName('base')[0].setAttribute('href', '/');
					
					result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
				
					result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');
					result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.min.css');
				
					result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css');
					result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css');
					
					result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.css');
				});
			/*
			else {
			
				// http://localhost/
				result.loadJS(result["JSLibDir"] + '/tw/ace33022/RequireJSConfig.js', function() {
				
					result.loadCSS('stylesheet/Font-Awesome/css/font-awesome.css');
				
					result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap/dist/css/bootstrap.css');
					result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap/dist/css/bootstrap-theme.css');
				
					result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');
					result.loadCSS(result["JSLibDir"] + '/bootstrap/jasny-bootstrap/dist/css/jasny-bootstrap.css');
				});
			}
			*/
		}
		else if ((result.location.origin.indexOf('127.0.0.1') != -1) || (result.location.origin.indexOf('localhost') != -1) || (result.location.protocol == 'file:') || (result.location.protocol == 'chrome-extension:') || (typeof nw !== 'undefined')) {
		
			// worker執行環境中並沒有window物件可以操作。
			if (typeof WorkerGlobalScope === 'undefined') {
			
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
			
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.min.css');
			
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css');
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css');
				
				// result.loadCSS('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.css');
				
				result.loadJS(result["JSLibDir"] + '/tw/ace33022/RequireJSConfig.js', function() {
				
					result.loadCSS('stylesheet/Font-Awesome/css/font-awesome.css');
				
					result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap/dist/css/bootstrap.css');
					result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap/dist/css/bootstrap-theme.css');
				
					result.loadCSS(result["JSLibDir"] + '/bootstrap/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');
					result.loadCSS(result["JSLibDir"] + '/bootstrap/jasny-bootstrap/dist/css/jasny-bootstrap.css');
				});
			}
		}
	}
	
	if (typeof process !== 'undefined') {
	
		// nodeJS執行環境
		
		if ((typeof nw !== 'undefined') && (typeof module === 'undefined')) {
		
			// NW.js執行環境
			
			// 採用HTML標籤引入資料時不會有module物件。
			root.Configuration = result;
		}
		else {
		
			module.exports = result;
		}
	}
	else {
	
		root["Configuration"] = result;
		
		if (typeof Packages !== 'undefined') {
		
			result["JSLibDir"] = Packages.java.lang.System.getProperty('JSLibDir');
			result["DAODir"] = 'tw/ace33022/dao/Rhino';
			
			Packages.java.lang.System.setProperty(new Packages.java.lang.String('launch.configuration.ini'), new Packages.java.lang.String(Packages.java.lang.System.getenv('WEB-INFDir') + '/' + 'ReThink.ini'));
			
			// root["Configuration"]["loggingPropertiesFile"] = Packages.java.lang.System.getenv('WEB-INFDir') + '/' + 'logging.properties';
			// root["Configuration"]["log4jPropertiesFile"] = Packages.java.lang.System.getenv('WEB-INFDir') + '/' + 'log4j.properties';
		
			root["Configuration"]["loggingPropertiesFile"] = Packages.java.lang.System.getProperty('WEB-INFDir') + '/' + 'logging.properties';
			root["Configuration"]["log4jPropertiesFile"] = Packages.java.lang.System.getProperty('WEB-INFDir') + '/' + 'log4j.properties';
			
			root["Configuration"]["Database"] = new function() {

				var conn = null;
			
				var DBDRIVER = '';
				var DBURL = '';
				
				var DBUSER = '';
				var DBPASSWORD = '';
				
				var properties = new java.util.Properties();
				
				properties.put('charSet', 'Big5');
				properties.put('user', '');
				properties.put('password', '');
				
				DBDRIVER = 'org.sqlite.JDBC';
				// DBDRIVER = 'sun.jdbc.odbc.JdbcOdbcDriver';
				java.lang.Class.forName(DBDRIVER);
				
				// DBURL = 'jdbc:sqlite:' + 'W:/tool/package/LangEnv/Java/apache-tomcat/webapps/ROOT/WEB-INF/db/SQLite/base.sqlite3';
				// DBURL = 'jdbc:sqlite:' + Packages.java.lang.System.getenv('WEB-INFDir') + '/db/SQLite/base.sqlite3';
				DBURL = 'jdbc:sqlite:' + Packages.java.lang.System.getProperty('WEB-INFDir') + '/db/SQLite/base.sqlite3';
				// conn = java.sql.DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
				
				// DBURL = 'jdbc:odbc:Driver={MicroSoft Access Driver (*.mdb)};DBQ=' + 'W:\\MyDoc\\Stock\\SrcData\\Access\\Stock.mdb';
				// conn = java.sql.DriverManager.getConnection(DBURL, properties); 
				
				this.getConnection = function() { 
				
					if (conn == null) conn = java.sql.DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
					
					return conn;
				}
				
				this.close = function() {
				
					if (conn != null) {
					
						conn.close();
						conn = null;
					}
				}
			
				return this;
			};
			
			load(root["Configuration"]["JSLibDir"] + '/tw/ace33022/util/Rhino/InitEnv.js');
		}
	}
})(this);