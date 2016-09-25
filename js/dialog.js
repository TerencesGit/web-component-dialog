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
		this.renderUI()
	};
	Dialog.prototype = {
		renderUI: function(){
			var _this = this,
					config = this.config;
			this.modal = $('<div class="dialog-modal"></div>');
			var dialog = $('<div class="dialog-container"><div>')
			var header = $('<div class="dialog-header"></div>');
			if(this.isConfig){
					dialog.append(header.addClass('waiting'));
			}	
			this.modal.append(dialog).appendTo($('body'))
		}
	};
	window.Dialog = Dialog;
})(Zepto)