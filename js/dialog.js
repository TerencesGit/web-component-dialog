;(function($){

	var Dialog = function(config){
		var _this = this;
		//默认参数设置
		this.config = {
			width: 'auto',
			height: 'auto',
			message: '',
			type: 'loading',
			buttons: null,
			delay: null,
			maskOpcity: null
		}
		if(this.config && $.isPlainObject(config)){
			$.extend(this.config,config)
		}else{
			this.isConfig = true
		}
		console.log(this.config)
	};
	Dialog.prototype = {};
	window.Dialog = Dialog;
})(Zepto)