/**
 *
 * @description InvestFutureDayTrnLog
 *
 * @require underscore.js
 * @require Ancestor.js
 * @require tw.ace33022.vo.DealerFutureDayTrnLog
 *
 * @version 2013/10/30 ace 初始版本。
 * @version 2014/12/24 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 * @version 2020/03/28 ace 名稱調整。
 *
 * @author ace
 *
 * @see <a href="https://developer.mozilla.org/zh-TW/docs/JavaScript">JavaScript</a>
 *
 */
 
(function(root) {

	var RequireJSConfig;
	
	var _;	// underscore.js
	
	var ancestor;
	
	var result = function() {

		var serialVersionUID = new Number(1);	// 保留
  
		var uber = new ancestor();
	
		_.extend(this, uber);
		// this.prototype = uber; // 保留原型鍊。
		this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
		
    this.getSchemaJSONObject = function() {

      var result = _.extend({}, uber.getSchemaJSONObject());

			result.$schema = '/json-schema/VO/InvestFutureDayTrnLog';
			result.title = 'invest_future_day_trn_log';

      return result;
    }
	}

	if (typeof define === 'function') {
	
		define(["tw.ace33022.vo.ForeignFutureDayTrnLog", "underscore"], function(ForeignFutureDayTrnLog) {
		
			_ = root._;
		
			ancestor = ForeignFutureDayTrnLog;
			
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/RequireJSConfig.js');
	
		_ = require(RequireJSConfig.paths["underscore"] + '.js');
		
		ancestor = require(RequireJSConfig.paths["tw.ace33022.vo.ForeignFutureDayTrnLog"] + '.js');
			
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load !== 'undefined') {
	
			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');
			
			if (typeof root.tw.ace33022.vo.ForeignFuturesDayTrnLogs === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.ForeignFutureDayTrnLog"] + '.js');
		}
		
		_ = root._;
		
		ancestor = root.tw.ace33022.vo.ForeignFutureDayTrnLog;
			
		root.tw.ace33022.vo.InvestFutureDayTrnLog = result;
	}
})(this);