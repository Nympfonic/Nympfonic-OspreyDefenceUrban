"use strict";

const config = require("../config/config.json");

class ODU {
    static name = "Nympfonic-OspreyDefenceUrban";

    constructor() {
        Logger.info(`Loading: ${ODU.name}`);
        ModLoader.onLoad[ODU.name] = ODU.onLoadMod;
    }
    static onLoadMod() {
        if (config.debug.enabled) {
            // Base
            const itemId = "Osprey_Defence_Urban";
            const itemClone = "60a3c68c37ea821725773ef5"; // Osprey Protection
            const database = DatabaseServer.tables;
            const items = database.templates.items;
            const handbook = database.templates.handbook.Items;
            const global = database.locales.global;
            const traders = database.traders;
            // Handbook
            const itemCategory = "5b5f6f8786f77447ed563642";
            const itemFleaPrice = parseInt(config.traderSettings.traderRUBPrice);
            // Item
            const itemPrefabPath = "gear/osprey_defence_urban.bundle";
            const itemLongName = "CQC Osprey MK4A plate carrier (Protection, Urban)";
            const itemShortName = "Osprey MK4A (P)";
            const itemDescription = "Osprey plate carrier is actively used by the British army and specialists. The Protection preset is provided with heavy armor plates and the optimal number of pouches for ammunition, grenades and special equipment. This particular piece has had its camouflage redesigned for urban scenarios.";
            // Offer
            //const itemTrader = "DOC_TRADER";
            //const itemTraderPrice = 599;
            //const itemTraderCurrency = "569668774bdc2da2298b4568"; // EUR
            const itemTraderLevel = parseInt(config.traderSettings.traderLoyaltyLevel);

            const currencyObj = {
                "RUB": "5449016a4bdc2d6f028b456f",
                "USD": "5696686a4bdc2da3298b456a",
                "EUR": "569668774bdc2da2298b4568"
            }

            ODU.createItemHandbookEntry(itemId, itemCategory, itemFleaPrice, handbook);
            ODU.createItem(itemId, itemClone, itemPrefabPath, itemLongName, itemShortName, itemDescription, items, global);
            // Jaeger
            if (config.trader.jaeger) {
                let itemTrader = "5c0647fdd443bc2504c2d371";
                let itemTraderPrice = parseInt(config.traderSettings.traderRUBPrice);
                let itemTraderCurrency = currencyObj.RUB; // RUB

                ODU.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLevel, traders);

                if (config.debug.logging) {
                    Logger.info(`${ODU.name}: DEBUG: Added item to Jaeger`);
                }
            }
            // Mechanic
            if (config.trader.mechanic) {
                let itemTrader = "5a7c2eca46aef81a7ca2145d";
                let itemTraderPrice = parseInt(config.traderSettings.traderRUBPrice);
                let itemTraderCurrency = currencyObj.RUB; // RUB

                ODU.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLevel, traders);

                if (config.debug.logging) {
                    Logger.info(`${ODU.name}: DEBUG: Added item to Mechanic`);
                }
            }
            // Peacekeeper
            if (config.trader.peacekeeper) {
                let itemTrader = "5ac3b934156ae10c4430e83c";
                let itemTraderPrice = parseInt(config.traderSettings.traderUSDPrice);
                let itemTraderCurrency = currencyObj.USD; // USD

                ODU.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLevel, traders);

                if (config.debug.logging) {
                    Logger.info(`${ODU.name}: DEBUG: Added item to Peacekeeper`);
                }
            }
            // Prapor
            if (config.trader.prapor) {
                let itemTrader = "54cb50c76803fa8b248b4571";
                let itemTraderPrice = parseInt(config.traderSettings.traderRUBPrice);
                let itemTraderCurrency = currencyObj.RUB; // RUB

                ODU.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLevel, traders);

                if (config.debug.logging) {
                    Logger.info(`${ODU.name}: DEBUG: Added item to Prapor`);
                }
            }
            // Ragman (also the default trader if all traders are disabled in the config)
            if (config.trader.ragman || Object.values(config.trader).every((v) => v === false)) {
                let itemTrader = "5ac3b934156ae10c4430e83c";
                let itemTraderPrice = parseInt(config.traderSettings.traderRUBPrice);
                let itemTraderCurrency = currencyObj.RUB; // RUB

                ODU.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLevel, traders);

                if (config.debug.logging) {
                    Logger.info(`${ODU.name}: DEBUG: Added item to Ragman`);
                }
            }
            // Skier
            if (config.trader.skier) {
                let itemTrader = "58330581ace78e27b8b10cee";
                let itemTraderPrice = parseInt(config.traderSettings.traderRUBPrice);
                let itemTraderCurrency = currencyObj.RUB; // RUB

                ODU.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLevel, traders);

                if (config.debug.logging) {
                    Logger.info(`${ODU.name}: DEBUG: Added item to Skier`);
                }
            }
            // Therapist
            if (config.trader.therapist) {
                let itemTrader = "54cb57776803fa99248b456e";
                let itemTraderPrice = parseInt(config.traderSettings.traderRUBPrice);
                let itemTraderCurrency = currencyObj.RUB; // RUB

                ODU.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLevel, traders);

                if (config.debug.logging) {
                    Logger.info(`${ODU.name}: DEBUG: Added item to Therapist`);
                }
            }
            // Gospozha (KMC Trader)
            if (config.trader.gospozha) {
                try {
                    if (ModLoader.onLoad["KMC-Core"]){
                        let itemTrader = "DOC_TRADER";
                        let itemTraderPrice = parseInt(config.traderSettings.traderEURPrice);
                        let itemTraderCurrency = currencyObj.EUR;

                        ODU.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLevel, traders);

                        if (config.debug.logging) {
                            Logger.info(`${ODU.name}: DEBUG: Added item to Gospozha`);
                        }
                    }
                }
                catch (error) {
                    Logger.info(`${ODU.name}: ERROR: KMC Trader "Gospozha" enabled but KMC Core not installed\nPlease install KMC Core or disable "Gospozha" in the config.json`)
                }
            }
        }
    }
    static createItemHandbookEntry(i_id, i_category, i_fprice, i_handbook) {
        // Add item to handbook
        i_handbook.push(
            {
                "Id": i_id,
                "ParentId": i_category,
                "Price": i_fprice
            }
        );
    }
    static createItem(i_id, i_clone, i_path, i_lname, i_sname, i_desc, i_items, i_global) {
        let item = JsonUtil.clone(i_items[i_clone]);
        // Change item properties
        item._id = i_id;
        item._props.Prefab.path = i_path;
        // Add item back to database
        i_items[i_id] = item;
        // Add custom item names to all languages/locales
        for (const localeID in i_global) {
            i_global[localeID].templates[i_id] =
            {
                "Name": i_lname,
                "ShortName": i_sname,
                "Description": i_desc
            };
        }
    }
    static createItemOffer(i_id, i_trader, i_price, i_currency, i_loyalty, i_traders) {
        i_traders[i_trader].assort.items.push(
            {
                "_id": i_id,
                "_tpl": i_id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd":
                {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 999999
                }
            }
        );
        // Add trader cost to item
        i_traders[i_trader].assort.barter_scheme[i_id] = [
            [
                {
                    "count": i_price,
                    "_tpl": i_currency
                }
            ]
        ];
        // Add trader loyalty level to item
        i_traders[i_trader].assort.loyal_level_items[i_id] = i_loyalty;
    }
}
module.exports.Mod = ODU;