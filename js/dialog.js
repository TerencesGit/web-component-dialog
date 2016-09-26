;(function($){

	var Dialog = function(config){
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
			var dialog = $('<div class="dialog-container"><div>'),
			    header = $('<div class="dialog-header"></div>'),
			    body = $('<div class="dialog-body"></div>'),
			    footer = $('<div class="dialog-footer"></div>');
			if(this.isConfig){
					dialog.append(header.addClass('waiting'));
			}else{
				this.modal.css({
					background: 'rgba(0,0,0,'+config.maskOpcity+')'
				})
				dialog.width(config.width);
				dialog.height(config.height);
				dialog.append(header.addClass(config.type))
				dialog.append(body.html(config.message))
			}	
			this.modal.append(dialog).appendTo($('body'))
			if(config.delay){
				window.setTimeout(function(){
					_this.destroy()
				},config.delay)
			}
		},
		destroy: function(){
			this.modal && this.modal.remove();
		}
	};
	window.Dialog = Dialog;
})(Zepto)