/**
 *
 * @description OptionCallDayTrnLog(選擇權買權每日交易行情)
 *
 * @return {Object} OptionCallDayTrnLog
 *
 * @require underscore.js
 * @require tw.ace33022.dao.db.vo.Ancestor
 * @require tw.ace33022.vo.OptionCallDayTrnLog
 * 
 * @version 2013/11/01 ace 初始版本。
 * @version 2014/11/26 ace 調整成可提供requirejs、require(CommonJS格式)、load(Rhino格式)使用。
 * @version 2016/09/06 ace add doSelectByTrnDateOrderByTrnDate method。
 * @version 2016/09/06 ace add doSelectByConMonthOrderByTrnDate method。
 * @version 2016/09/06 ace add doSelectByConMonthAndTrnDateOrderByTrnDate method。
 * @version 2020/03/20 ace 名稱調整。
 *
 * @author ace
 *
 * @see <a href="http://ejohn.org/">John Resig</a>
 * @see <a href="https://github.com/jeresig/env-js">jeresig/env-js</a>
 *
 */

(function(root) {

	var RequireJSConfig;
	
	var _;	// underscore.js
	
	var ancestor;
	var accessVO;
	
	var result = function(conn) {

		var serialVersionUID = new Number(1);     // 保留
		
		// root._.extend(this, new ancestor(conn));
		_.extend(this, new ancestor(conn));
    // this.prototype = this;  	// 由於已複製父類別Ancestor，因此原型類別指向自己。
  
		// this.setTableName('option_call_day_trn_log');
		this.setAccessVO(accessVO);
		this.setDAO(new Packages.tw.ace33022.dao.db.vo.OptionCallDayTrnLog(conn));
		
		this.doInsert = function(vo) {

			var javaVO = new Packages.tw.ace33022.vo.OptionCallDayTrnLog();

			javaVO.setValueFromJSONString(vo.toJSONString());
			
			return this.getDAO().doInsert(javaVO);
		}
		
		this.doDelete = function(trnDate, productCode) {
		
			return this.getDAO().doDelete(new Packages.java.lang.String(trnDate), new Packages.java.lang.String(productCode));
		}
		
		this.doSelectByConMonthOrderByTrnDateAndStrikePrice = function(productCode, conMonth) {
		
			return this.tranIteratorToVO(this.getDAO().doSelectByConMonthOrderByTrnDateAndStrikePrice(productCode, conMonth).iterator());
		}
		
		this.doSelectOrderByConMonthAndStrikePrice = function(trnDate, productCode) {return this.tranIteratorToVO(this.getDAO().doSelectOrderByConMonthAndStrikePrice(new Packages.java.lang.String(trnDate), new Packages.java.lang.String(productCode)).iterator());}
	}

	if (typeof define === 'function') {
	
		define(["tw.ace33022.dao.db.vo.Ancestor", "tw.ace33022.vo.OptionCallDayTrnLog", "underscore"], function(Ancestor, OptionCallDayTrnLog) {
		
			_ = root._;
		
			ancestor = Ancestor;
			accessVO = OptionCallDayTrnLog;
			
			return result;
		});
	}
	else if (typeof exports !== 'undefined') {
	
		RequireJSConfig = require('tw/ace33022/utils/RequireJSConfig.js');
		
		_ = require(RequireJSConfig.paths["underscore"] + '.js');
	
		ancestor = require(RequireJSConfig.paths["tw.ace33022.dao.db.vo.Ancestor"] + '.js');
		accessVO = require(RequireJSConfig.paths["tw.ace33022.vo.OptionCallDayTrnLog"] + '.js');

		module.exports = result;
	}
	else {

		RequireJSConfig = root.tw.ace33022.RequireJSConfig;
		
		if (typeof load !== 'undefined') {

			if (typeof root._ === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["underscore"] + '.js');

			if (typeof root.tw.ace33022.dao.db.vo.Ancestor === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.dao.db.vo.Ancestor"] + '.js');
			if (typeof root.tw.ace33022.vo.OptionCallDayTrnLog === 'undefined') load(RequireJSConfig.baseUrl + RequireJSConfig.paths["tw.ace33022.vo.OptionCallDayTrnLog"] + '.js');
		}
		
		_ = root._;
		
		ancestor = root.tw.ace33022.dao.db.vo.Ancestor;
		accessVO = root.tw.ace33022.vo.OptionCallDayTrnLog;

		root.tw.ace33022.dao.db.vo.OptionCallDayTrnLog = result;
	}
})(this);