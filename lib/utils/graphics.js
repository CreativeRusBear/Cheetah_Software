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
 * @summary Get info about controllers
 * @return {Promise<Systeminformation.GraphicsControllerData[]>}
 */

async function controllersInfo () {
	const {controllers} = await si.graphics();
	return controllers;
}


/**
 * @summary Get info about displays
 * @returns {Promise<void>}
 */

async function displaysInfo () {
	const {displays} = await si.graphics();
	return displays;
}

module.exports = {
	controllersInfo,
	displaysInfo,
};