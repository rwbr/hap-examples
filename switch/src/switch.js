const hap = require("hap-nodejs");

const Accessory = hap.Accessory;
const Characteristic = hap.Characteristic;
const CharacteristicEventTypes = hap.CharacteristicEventTypes;
const Service = hap.Service;

// optionally set a different storage location with code below
// hap.HAPStorage.setCustomStoragePath("...");

const accessoryUuid = hap.uuid.generate("hap.examples.switch");
const accessory = new Accessory("Example Switch Accessory", accessoryUuid);

const switchService = new Service.Switch("Example Switch");

let currentSwitchState = false // on or off

// 'On' characteristic is required for the Switch service
const onCharacteristic = switchService.getCharacteristic(Characteristic.On);

// with the 'on' function we can add event handlers for different events, mainly the 'get' and 'set' event
onCharacteristic.on(CharacteristicEventTypes.GET, (callback) => {
    console.log("Queried current switch state: " + currentSwitchState);
    callback(undefined, currentSwitchState);
});
onCharacteristic.on(CharacteristicEventTypes.SET, (value, callback) => {
    console.log("Setting switch state to: " + value);
    currentSwitchState = value;
    callback();
});

accessory.addService(switchService);

// once everything is set up, we publish the accessory. Publishing should always be the last step!
accessory.publish({
    username: "1A:32:18:E4:1C:8F",
    pincode: "442-91-245",
    port: 47129,
    category: hap.Categories.SWIITCH, // this value defines the symbol shown in the pairing screen
});

console.log("Accessory setup finished!");