/**
 * ajax-data-test
 *
 */

require(['jquery','jquery.tmpl'], function($) {

	'use strict';

	// 验证接口
	$('#J_data_validate').on('click', function() {

		// 本地要存储的数据
		var storageData = {
			config: {
				url: '',
				type: ''
			},
			data: {
				singleData: {
					list: []
				},
				multipleData: {
					name: '',
					list: []
				}
			}
		};

		// ajax()方法的配置参数 每次点击都要初始化
		var ajaxConfig = {
			data: {}
		};

		// 用于关联本地存储数据和ajax配置数据 storageData.config = config = ajaxConfig中的config部分
		var config = {};

		// 配置数据
		config.url = $('.section-config input[name="url"]').val();
		config.type = $('.section-config .sc-type input:checked').val();
		config.dataType = $('.section-config input[name="dataType"]').val();

		storageData.config = config;

		$('.params-wrap-single li').each(function() {
			var $this = $(this);
			var key, value;
			var obj = {};


			if ($this.find('input[type="checkbox"]').prop('checked')) {
				key = $this.find('.key').val();

				if ($.trim(key)) {

					value = $this.find('.value').val();

					ajaxConfig.data[key] = value;
					obj[key] = value;

					storageData.data.singleData.list.push(obj);
				}
			}
		});

		// 真实的multipleKeyName值
		var multipleKeyName = storageData.data.multipleData.name = $('.params-wrap-multiple .multiple-key-list .key').val();

		$('.params-wrap-multiple .list').each(function() {
			var $this = $(this);
			var key, value;
			var obj = {};

			if ($this.find('input[type="checkbox"]').prop('checked')) {
				key = $this.find('.key').val();

				if ($.trim(key)) {

					value = $this.find('.value').val();
					obj[key] = value;

					storageData.data.multipleData.list.push(obj);
					ajaxConfig.data[multipleKeyName] = JSON.stringify(storageData.data.multipleData.list);
				}

			}

		});

		// 数据写到 localStorage上
		window.localStorage.setItem('ajax-data-test', JSON.stringify(storageData));

		this.pms = $.ajax(ajaxConfig);

		this.pms.done(function() {
			console.log('ok');
		});

	});


	var pageLoad = (function() {

		// 获取本地保存的数据
		var pageData = JSON.parse(localStorage.getItem('ajax-data-test'));
		console.log(pageData);


		// config 数据
		if (pageData) {
			$('.section-config input[name="url"]').val(pageData.config.url);
			$('.section-config input[name="dataType"]').val(pageData.config.dataType);

			if (pageData.config.type === 'GET') {
				$('.section-config .sc-type input').eq(0).prop('checked', true);
			} else {
				$('.section-config .sc-type input').eq(1).prop('checked', true);
			}
		}


	})();


});
