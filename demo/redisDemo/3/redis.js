const Config =require('./config')
const env =require('./env')
const { configure,getLogger }=require('log4js')
const Log=getLogger();

//为错误等级分类
configure({
	appenders:{
		cheese:{
			type:'file',filename:'log/cheese.log'
		}
	},
	categories:{
		default:{
			appenders:['cheese'],
			level:'all'
		}
	}
})

const redis = require("redis");

// 服务配置项
redisConfig = Config[env.deploy];

// 创建redis服务
const client = redis.createClient(redisConfig.port, redisConfig.host, {});

// 设置密码
if(redisConfig.password){
	client.auth(redisConfig.password);
}


/**
 * 启动错误
 */
client.on("error", function(err) {
  console.log(">>>>> 链接redis服务错误，错误码: " + err);
  Log.error(">>>>> 链接redis服务错误，错误码: " + err);
	client.quit();
});

// 启动成功
client.on('ready', function() {
  Log.info(">>>>> 链接redis服务器"+redisConfig.host+":"+redisConfig.port+"成功");
	console.log(">>>>> 链接redis服务器"+redisConfig.host+":"+redisConfig.port+"成功");
});

module.exports = {

	/**
	 * 获取数组长度
	 */
	len: function(key){

		var promise = new Promise(function(resolve, reject) {

			client.LLEN(key, function(err, res){

				if( err ) {
					console.log(">>>>> redis");
					console.log("获取长度时出错。 错误码："+ err);
					reject(err);
				}

				resolve(res);
			});

		});

		return promise;
	},

	/**
	 * 获取列表指定范围内的元素
	 */
	getRange: function(key, start, stop){

		return new Promise(function(resolve, reject) {

			client.LRANGE([key, start, stop], function(err, res){

				if( err ) {
					Log.info(">>>>> redis");
					Log.info("获取列表指定范围内的元素时出错。 错误码："+ err);
					reject(err);
				}

				resolve(res)
			})
		});
	},

	/**
	 * 保留指定区间内的元素，不在指定区间之内的元素都将被删除。
	 */
	trim: function(key, start, stop){
		client.LTRIM([key, start, stop]);
	},

	/**
	 * 在列表中添加一个或多个值
	 */
	rpush: function(key, value){
		client.RPUSH(key, value);
	},

	/**
	 *========================哈希表============================
	 */

	/**
	 * 设置哈希表
	 * 如果存在则覆盖
	 */
	hmset: function(key, data, flag, time){

		for(let a in data) {
			data[a] = JSON.stringify(data[a])
		}

		client.HMSET(key, data);
		/**
		 * 从创建房间开始，默认过期时间为24小时
		 */
		if(flag) {
			var time = time || 60 * 60 * 24;
			client.expire(key, time);
		}
	},

	/**
	 * 设置哈希表
	 * 如果存在则覆盖
	 */
	set: function(key, data, flag, time){

		client.SET(key, data);
		/**
		 * 从创建房间开始，默认过期时间为24小时
		 */
		if(flag) {
			var time = time || 60 * 60 * 24;
			client.expire(key, time);
		}
	},

	/**
	 * 获取所有哈希表
	 */
	hmgetall: function(key) {

		return new Promise(function(resolve, reject) {

			client.HGETALL(key, function(err, res){

				if (err) {
					console.log(">>>>> redis");
					console.log("获取列表指定范围内的元素时出错。 错误码："+ err);
					reject(false);

				} else {
					resolve(res);
				}
			});
		});
	},

	/**
	 * 获取当前值
	 */
	hmget: function(key, value) {

		return new Promise(function(resolve, reject) {

			client.HGET(key, value, function(err, res){

				if (err) {
					console.log(">>>>> redis");
					console.log("获取列表指定范围内的元素时出错。 错误码："+ err);
					reject(false);

				} else {
					let data = JSON.parse(res);
					resolve(data);
				}
			});
		});
	},

	/**
	 * 获取当前值
	 */
	get: function(key) {

		return new Promise(function(resolve, reject) {

			client.GET(key, function(err, value){
				if (err) {
					console.log(">>>>> redis");
					console.log("获取列表指定范围内的元素时出错。 错误码："+ err);
					reject(false);

				} else {
					resolve(value);
				}
			});
		});
	},



	/**
	 * 获取哈希表长度
	 */
	length: function() {

		return new Promise(function(resolve, reject) {

			client.keys('*', function(err, replies) {

				if( err ) {
					Log.info(">>>>> redis");
					Log.info("获取长度时出错。 错误码："+ err);
					reject(err);
				}
				else {
					resolve(replies.length);
					// client.quit();
				}
			})
		});
	},

	/**
	 * 获取哈希表长度
	 */
	keys: function() {

		return new Promise(function(resolve, reject) {

			client.keys('*', function(err, replies) {

				if( err ) {
					Log.info(">>>>> redis");
					Log.info("获取长度时出错。 错误码："+ err);
					reject(err);
				}
				else {
					resolve(replies);
					// client.quit();
				}
			})
		});
	},

	/**
	 * 获取哈希表长度
	 */
	hlen: function(key) {

		return new Promise(function(resolve, reject) {

			client.HLEN(key, function(err, len) {

				if( err ) {
					Log.info(">>>>> redis");
					Log.info("获取长度时出错。 错误码："+ err);
					reject(err);
				}

				resolve(len);
			})
		});
	},

	/**
	 * 删除哈希表
	 */
	hdel: function(key, value){
		client.HDEL(key, value);
	},

	/**
	 *========================集合操作============================
	 */

	/**
	 * 添加集合成员
	 */
	sadd: function(key, value){
		client.SADD([key, value]);
	},

	/**
	 * 获取集合成员数
	 */
	scard: function(key, fn){
		client.SCARD(key, function(err, len) {
			typeof fn === "function" && fn(len);
		});
	},

	/**
	 * 删除key
	 */
	del: function(key){
		client.DEL(key);
	},
	client:client
}
