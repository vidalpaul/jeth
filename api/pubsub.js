const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-657af196-6c90-4d2c-9c60-9d0fe1d9f6cc',
  subscribeKey: 'sub-c-c3a9b4a6-e56e-11eb-97be-3ebc6f27b518',
  secretKey: 'sec-c-ZDI1ODFiMDYtODliMC00OTE4LTliY2EtY2U1MDdhYTJmNmI4',
};

const CHANNELS_MAP = {
  TEST: 'TEST',
  BLOCK: 'BLOCK',
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);
    this.subscribeToChannels();
    this.listen();
  }

  subscribeToChannels() {
    this.pubnub.subscribe({
      channels: Object.values(CHANNELS_MAP),
    });
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }

  listen() {
    this.pubnub.addListener({
      message: (messageObject) => {
        console.log('messageObject:', messageObject);
      },
    });
  }
}

module.exports = PubSub;
const pubsub = new PubSub();
setTimeout(() => {
  pubsub.publish({
    channel: CHANNELS_MAP.TEST,
    message: 'foo',
  });
}, 3000);
