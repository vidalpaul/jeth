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
  constructor({ blockchain }) {
    this.pubnub = new PubNub(credentials);
    this.blockchain = blockchain;
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
        const { channel, message } = messageObject;
        const parsedMessage = JSON.parse(message);

        console.log('Message received. Channel:', channel);

        switch (channel) {
          case CHANNELS_MAP.BLOCK:
            console.log('block message', message);
            this.blockchain
              .addBlock({ block: parsedMessage })
              .then(() => console.log('New block accepted'))
              .catch((error) =>
                console.error('New block rejected:', error.message)
              );
            break;
          default:
            return;
        }
      },
    });
  }

  broadcastBlock(block) {
    this.publish({
      channel: CHANNELS_MAP.BLOCK,
      message: JSON.stringify(block),
    });
  }
}

module.exports = PubSub;
