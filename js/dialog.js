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
			maskOpcity: null,
			callback: null,
			effect: true,
			maskClose: true
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
			this.dialog = $('<div class="dialog-container"></div>');
			var header = $('<div class="dialog-header"></div>'),
			    body = $('<div class="dialog-body"></div>'),
			    footer = $('<div class="dialog-footer"></div>');
			if(this.isConfig){
					this.dialog.append(header.addClass('waiting'));
			}else{
				this.modal.css({
					background: 'rgba(0,0,0,'+config.maskOpcity+')'
				})
				this.dialog.width(config.width);
				this.dialog.height(config.height);
				this.dialog.append(header.addClass(config.type));
				if(config.message){
					this.dialog.append(body.html(config.message));
				}
				if(config.buttons){
					this.createButtons(footer,config.buttons);
					this.dialog.append(footer)
				}
			}	
			this.modal.append(this.dialog).appendTo($('body'))
			if(config.effect){
				_this.animate()
			}
			if(config.delay){
				window.setTimeout(function(){
					_this.destroy()
					config.callback && config.callback()
				},config.delay)
			}
			if(config.maskClose){
				this.modal.tap(function(){
					_this.destroy()
				})
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
					button.tap(function(e){
						e.stopPropagation();
						var isClose = callback();
						if(isClose != false){
							_this.destroy()
						}
						// if($(this).hasClass('confirm')){
						// 	_this.destroy()
						// }
					})
				}else{
					button.tap(function(e){
						e.stopPropagation();
						_this.destroy()
					})
				}
				footer.append(button)
			});
		},
		animate: function(){
				var _this =this.dialog;
				_this.css({'transform': 'scale(0,0)'})
				window.setTimeout(function(){
					_this.css({'transform': 'scale(1,1)'})
				},200)
		},
		destroy: function(){
			this.modal && this.modal.remove();
		}
	};
	window.Dialog = Dialog;
	$.dialog = function(config){
		return new Dialog(config)
	}
})(Zepto)