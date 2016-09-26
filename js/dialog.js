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
			var dialog = $('<div class="dialog-container"></div>'),
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
				dialog.append(header.addClass(config.type));
				dialog.append(body.html(config.message));
				if(config.buttons){
					this.createButtons(footer,config.buttons);
					dialog.append(footer)
				}
			}	
			this.modal.append(dialog).appendTo($('body'))
			if(config.delay){
				window.setTimeout(function(){
					_this.destroy()
				},config.delay)
			}
		},
		createButtons: function(footer,buttons){
			var _this = this;
			$(buttons).each(function(index, el) {
				var type = this.type,
						text = this.text || '按钮'+index,
						callback = this.callback,
						button = $('<button class="btn '+type+'">'+text+'</button>')
				if(callback){
					button.tap(function(){
						var isClose = callback();
						if(isClose != false){
							_this.destroy()
						}
						// if($(this).hasClass('confirm')){
						// 	_this.destroy()
						// }
					})
				}else{
					button.tap(function(){
						_this.destroy()
					})
				}
				footer.append(button)
			});
		},
		destroy: function(){
			this.modal && this.modal.remove();
		}
	};
	window.Dialog = Dialog;
})(Zepto)