/*
 *  $$$$$$\                               $$\       $$\
 * $$  __$$\                              $$ |      \__|
 * $$ /  \__| $$$$$$\  $$$$$$\   $$$$$$\  $$$$$$$\  $$\  $$$$$$$\  $$$$$$$\
 * $$ |$$$$\ $$  __$$\ \____$$\ $$  __$$\ $$  __$$\ $$ |$$  _____|$$  _____|
 * $$ |\_$$ |$$ |  \__|$$$$$$$ |$$ /  $$ |$$ |  $$ |$$ |$$ /      \$$$$$$\
 * $$ |  $$ |$$ |     $$  __$$ |$$ |  $$ |$$ |  $$ |$$ |$$ |       \____$$\
 * \$$$$$$  |$$ |     \$$$$$$$ |$$$$$$$  |$$ |  $$ |$$ |\$$$$$$$\ $$$$$$$  |
 *  \______/ \__|      \_______|$$  ____/ \__|  \__|\__| \_______|\_______/
 * 								$$ |
 * 								$$ |
 *                              \__|
 */

const si = require('systeminformation');


/**
 * @async
 * @function
 * @description Get info about controllers
 * @return {Promise<Systeminformation.GraphicsControllerData[]>} - detail information about controllers
 */
async function controllersInfo () {
	const {controllers} = await si.graphics();
	return controllers;
}


/**
 * @async
 * @function
 * @description Get info about displays
 * @return {Promise<void>} - detail information about monitor's characteristics
 */
async function displaysInfo () {
	const {displays} = await si.graphics();
	return displays;
}

/**
 * @description Module, that provides detail information about installed graphics controllers and connected displays
 * @module /lib/utils/graphics
 * @type {Object}
 */
module.exports = {
	controllersInfo,
	displaysInfo,
};