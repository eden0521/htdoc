/**
 *
 * @description tw.ace33022.vo.OptionCallTrnLog(選擇權買權交易行情)
 *
 * @return {Object} OptionCallTrnLog
 *
 * @require underscore.js
 * @require tw.ace33022.vo.Ancestor
 *
 * @version 2021/01/31 ace 初始版本。
 *
 * @author ace
 *
 */

(function(root) {
 
	var RequireJSConfig;
	
	var _;	// underscore.js
	
	var ancestor;
		
	var result = function() {

		var serialVersionUID = new Number(1);	// 保留

		var bestAskPrice = 0;	// 委賣價
		var bestAskQty = 0; 	// 委賣量
		var bestBidPrice = 0; // 委買價
		var bestBidQty = 0; 	// 委買量

		var uber = new ancestor();
		
		_.extend(this, uber);
		// this.prototype = uber;	// 保留原型鍊。
		this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
	
		this.setBestAskPrice = function(value) { if (value) bestAskPrice = value; return value; }
		this.setBestAskQty = function(value) { if (value) bestAskQty = value; return value; }
		this.setBestBidPrice = function(value) { if (value) bestBidPrice = value; return value; }
		this.setBestBidQty = function(value) { if (value) bestBidQty = value; return value; }

	  this.getBestAskPrice = function() { return bestAskPrice; }
    this.getBestAskQty = function() { return bestAskQty; }
		this.getBestBidPrice = function() { return bestBidPrice; }
		this.getBestBidQty = function() { return bestBidQty; }
		
		this.setValueFromJSONObject = function(value) {
  
			uber.setValueFromJSONObject(value);

			if (typeof value["best_ask_price"] != 'undefined') this.setBestAskPrice(value["best_ask_price"]);
			if (typeof value["best_ask_qty"] != 'undefined') this.setBestAskQty(value["best_ask_qty"]);
			if (typeof value["best_bid_price"] != 'undefined') this.setBestBidPrice(value["best_bid_price"]);
			if (typeof value["best_bid_qty"] != 'undefined') this.setBestBidQty(value["best_bid_qty"]);
		}
		
		this.toJSONObject = function () {
  
			var result = {
    
				"best_ask_price": bestAskPrice,
				"best_ask_qty": bestAskQty,
				"best_bid_price": bestBidPrice,
				"best_bid_qty": bestBidQty
			};
    
			return _.extend(result, uber.toJSONObject());
		}
		
    this.getSchemaJSONObject = function() {

      var result = _.extend({}, uber.getSchemaJSONObject());
			
			result.$schema = '/json-schema/vo/option_call_trn_log';
			result.title = 'option_call_day_trn_log';

			result["properties"]["close_price"] = { "description": "收盤價/成交價", "type": "number" };
			result["properties"]["last_cal_price"] = { "description": "結算價/成交價", "type": "number" };

      return result;
    }
	}

	if (typeof define === 'function') {
	
		define(["tw.ace33022.vo.OptionCallDayTrnLog", "underscore"], function(OptionCallDayTrnLog) {
		
			_ = root._;
		
			ancestor = OptionCallDayTrnLog;
				
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/RequireJSConfig.js');
	
		_ = require(RequireJSConfig.paths["underscore"] + '.js');
		
		ancestor = require(RequireJSConfig.paths["tw.ace33022.vo.OptionCallDayTrnLog"] + '.js');
		
		module.exports = result;
	}
	else {
	
		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load !== 'undefined') {
	
			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');
			
			if (typeof root.tw.ace33022.vo.OptionCallDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.OptionCallDayTrnLog"] + '.js');
		}
		
		_ = root._;
		
		ancestor = root.tw.ace33022.vo.OptionCallDayTrnLog;
		
		root.tw.ace33022.vo.OptionCallTrnLog = result;
	}
})(this);