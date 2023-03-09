"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.schema = exports.name = void 0;
const koishi_1 = require("koishi");
exports.name = 'apexlookup';
exports.schema = koishi_1.Schema.object({
    apiKey: koishi_1.Schema.string().description('apexstatus 网页 API').role('secret').required(),
});
function apply(ctx, config) {
    const baseUri = 'https://api.mozambiquehe.re/';
    ctx.command('apexapi', '查询已经登记的api地址').example('apexapi')
        .action(async () => {
        return require('koishi').h.text(config.apiKey);
    });
    ctx.command('apexmap', '查询现在的apex地图轮换').example('apexmap')
        .action(async () => {
        var rawText = await ctx.http.get(baseUri + '/maprotation?auth=' + config.apiKey);
        const nowMap = rawText['current']['map'];
        const nextMap = rawText['next']['map'];
        const remainTime = rawText['current']['remainingTimer'];
        const mapFriendName = { 'Broken Moon': '破碎月亮', 'World\'s Edge': '世界尽头', 'Olympus': '奥林匹斯', 'Storm Point': '风暴点', 'King\'s Canyon': '诸王峡谷' };
        return require('koishi').h.text('现在的地图是' + mapFriendName[nowMap] + ', 还剩 ' + remainTime + ';' + '下一张地图是' + mapFriendName[nextMap] + ' :)');
    });
    ctx.command('apexcraft', '查询现在的apex合成器内容').example('apexcraft')
        .action(async () => {
        var rawText = await ctx.http.get(baseUri + '/crafting?auth=' + config.apiKey);
        const daily0 = rawText[0]['bundleContent'][0]['itemType']['name'];
        const daily0rarity = rawText[0]['bundleContent'][0]['itemType']['rarity'];
        const daily1 = rawText[0]['bundleContent'][1]['itemType']['name'];
        const daily1rarity = rawText[0]['bundleContent'][1]['itemType']['rarity'];
        const weekly0 = rawText[1]['bundleContent'][0]['itemType']['name'];
        const weekly0rarity = rawText[1]['bundleContent'][0]['itemType']['rarity'];
        const weekly1 = rawText[1]['bundleContent'][1]['itemType']['name'];
        const weekly1rarity = rawText[1]['bundleContent'][1]['itemType']['rarity'];
        const rarityFriendlyName = { 'Epic': '紫色', 'Rare': '蓝色', 'Legend': '金色' };
        const itemFriendlyName = {
            'optic_hcog_ranger': '3 倍全息衍射式瞄准镜“游侠”',
            'optic_hcog_bruiser': '2 倍全息衍射式瞄准镜“格斗家”',
            'optic_digital_threat': '单倍数字化威胁',
            'optic_variable_sniper': '4倍至8倍可调节式光学瞄准镜',
            'optic_variable_aog': '2倍至4倍可调节式高级光学瞄准镜',
            'standard_stock': '标准枪托',
            'sniper_stock': '狙击枪托',
            'backpack': '背包',
            'helmet': '头盔',
            'skullpiercer_rifling': '穿颅器',
            'extended_heavy_mag': '加长式重型弹匣',
            'extended_light_mag': '加长轻型弹匣',
            'extended_sniper_mag': '加长狙击弹匣',
            'extended_energy_mag': '加长能量弹匣',
            'anvil_receiver': '铁砧接收器',
            'turbocharger': '涡轮增压器',
            'laser_sight': '激光瞄准镜',
            'shotgun_bolt': '霰弹枪枪栓',
            'barrel_stabilizer': '枪管稳定器',
            'double_tap_trigger': '双发扳机'
        };
        const dailyReport = itemFriendlyName[daily0] + '(' + rarityFriendlyName[daily0rarity] + ')\n' + itemFriendlyName[daily1] + '(' + rarityFriendlyName[daily1rarity] + ') ';
        const weeklyReport = itemFriendlyName[weekly0] + '(' + rarityFriendlyName[weekly0rarity] + ')\n' + itemFriendlyName[weekly1] + '(' + rarityFriendlyName[weekly1rarity] + ') ';
        return require('koishi').h.text('今天的复制器制造物品为:\n' + dailyReport + '\n本周的复制器制造物品为:\n' + weeklyReport);
    });
    ctx.command('apex', '查询一名玩家的 apex 战绩').example('apex galentwww')
        .action(async ({ options }, username) => {
        if (!username)
            return '没有用户 ID 啊';
        var rawText = await ctx.http.get(baseUri + '/bridge?player=' + username + '&platform=PC&auth=' + config.apiKey);
        const target = rawText['global']['name'];
        const playerLV = rawText['global']['level'];
        const prvBattlePass = rawText['global']['battlepass']['level'];
        const rp = rawText['global']['rank']['rankScore'];
        var bp;
        var says;
        if (prvBattlePass == -1) {
            bp = '上个赛季的通行证是一点没打';
        }
        else if (prvBattlePass == 111) {
            bp = '上个赛季的通行证是打的满满当当';
        }
        else
            bp = '上个赛季的通行证等级是: ' + prvBattlePass;
        if (rp <= 1000) {
            says = '嗯?菜鸟段?还是...不打排位?';
        }
        else if (rp > 1000 && rp <= 3000) {
            says = '青铜局?才刚刚开始~';
        }
        else if (rp > 3000 && rp <= 5400) {
            says = '到白银了,好起来了~';
        }
        else if (rp > 5400 && rp <= 8200) {
            says = '黄金!开始乱斗!';
        }
        else if (rp > 8200 && rp <= 11400) {
            says = '白金!进入上三段!';
        }
        else if (rp > 11400 && rp <= 15000) {
            says = '钻石!上钻咯兄弟们!';
        }
        else if (rp < 15000) {
            says = '我超!大师!猎杀!';
        }
        const disp = '当当当!\n你查询的用户叫: ' + target + '\n他的等级是: ' + playerLV + '\n' + bp + '\n本赛季的排位赛点数为:' + rp + '\n' + says;
        return require('koishi').h.text(disp);
    });
    ctx.command('ping', '看看机器人凉了没?').example('ping')
        .action(async () => {
        return require('koishi').h.text('Pong!');
    });
}
exports.apply = apply;
