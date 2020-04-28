export const PubSub = {
    subscribers : {},

    subscribe : function(event, callback){
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    },

    publish : function(event, data, printThis){
        if (!this.subscribers[event]) return;
        this.subscribers[event].forEach(subscriberCallback => subscriberCallback(data, printThis));
    },
};