const hap = require("hap-nodejs");

const Accessory = hap.Accessory;
const Characteristic = hap.Characteristic;
const CharacteristicEventTypes = hap.CharacteristicEventTypes;
const Service = hap.Service;

// optionally set a different storage location with code below
// hap.HAPStorage.setCustomStoragePath("...");

const accessoryUuid = hap.uuid.generate("hap.examples.light");
const accessory = new Accessory("Example Light Accessory", accessoryUuid);

const lightService = new Service.Lightbulb("Example Lightbulb");

let currentLightState = false // on or off
let currentBrightnessLevel = 100;

// 'On' characteristic is required for the light service
const onCharacteristic = lightService.getCharacteristic(Characteristic.On);
// 'Brightness' characteristic is optional for the light service; 'getCharacteristic' will automatically add it to the service!
const brightnessCharacteristic = lightService.getCharacteristic(Characteristic.Brightness);

// with the 'on' function we can add event handlers for different events, mainly the 'get' and 'set' event
onCharacteristic.on(CharacteristicEventTypes.GET, (callback) => {
    console.log("Queried current light state: " + currentLightState);
    callback(undefined, currentLightState);
});
onCharacteristic.on(CharacteristicEventTypes.SET, (value, callback) => {
    console.log("Setting light state to: " + value);
    currentLightState = value;
    callback();
});

brightnessCharacteristic.on(CharacteristicEventTypes.GET, (callback) => {
    console.log("Queried current brightness level: " + currentBrightnessLevel);
    callback(undefined, currentBrightnessLevel);
});
brightnessCharacteristic.on(CharacteristicEventTypes.SET, (value, callback) => {
    console.log("Setting brightness level to: " + value);
    currentBrightnessLevel = value;
    callback();
});

accessory.addService(lightService);

// once everything is set up, we publish the accessory. Publishing should always be the last step!
accessory.publish({
    username: "1A:31:18:E4:1C:8F",
    pincode: "443-91-245",
    port: 47129,
    category: hap.Categories.LIGHTBULB, // this value defines the symbol shown in the pairing screen
});

console.log("Accessory setup finished!");