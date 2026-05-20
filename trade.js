// ==========================================
// UNIFIED GLOBAL TRADING SYSTEM FOR BLOOKET CLONE
// ==========================================

const GlobalTradingSystem = {
    activeTrades: new Map(),
    tradeCounter: 0,

    /**
     * Helper: Generates a unique trade ID
     */
    generateId() {
        this.tradeCounter++;
        return `TRADE_${this.tradeCounter}_${Date.now()}`;
    },

    /**
     * Create a trade between ANY two players
     * @param {object} sender - The player initiating ({ id, inventory, tokens })
     * @param {object} receiver - The player receiving ({ id, inventory, tokens })
     * @param {object} senderOffer - What sender gives ({ items: [], tokens: 0 })
     * @param {object} receiverOffer - What receiver gives ({ items: [], tokens: 0 })
     */
    createTrade(sender, receiver, senderOffer = { items: [], tokens: 0 }, receiverOffer = { items: [], tokens: 0 }) {
        // 1. Validate Sender Assets
        const hasSenderItems = senderOffer.items.every(item => sender.inventory.includes(item));
        const hasSenderTokens = sender.tokens >= (senderOffer.tokens || 0);
        
        if (!hasSenderItems || !hasSenderTokens) {
            return { success: false, message: `Trade failed: ${sender.id} does not have the offered assets.` };
        }

        // 2. Validate Receiver Assets
        const hasReceiverItems = receiverOffer.items.every(item => receiver.inventory.includes(item));
        const hasReceiverTokens = receiver.tokens >= (receiverOffer.tokens || 0);

        if (!hasReceiverItems || !hasReceiverTokens) {
            return { success: false, message: `Trade failed: ${receiver.id} does not have the requested assets.` };
        }

        // 3. Generate Trade Package
        const tradeId = this.generateId();
        const tradePackage = {
            id: tradeId,
            senderId: sender.id,
            receiverId: receiver.id,
            senderOffer: { ...senderOffer },
            receiverOffer: { ...receiverOffer },
            status: "PENDING",
            timestamp: Date.now()
        };

        // 4. Save to global system registry
        this.activeTrades.set(tradeId, tradePackage);
        return { success: true, message: "Trade request created successfully!", tradeId: tradeId, trade: tradePackage };
    },

    /**
     * Complete and finalize an active trade
     * @param {string} tradeId - The system ID of the trade
     * @param {object} sender - Live reference to sender's profile object
     * @param {object} receiver - Live reference to receiver's profile object
     */
    completeTrade(tradeId, sender, receiver) {
        const trade = this.activeTrades.get(tradeId);

        if (!trade || trade.status !== "PENDING") {
            return { success: false, message: "Trade offer not found or already closed." };
        }

        // Double check they match the original trade setup
        if (trade.senderId !== sender.id || trade.receiverId !== receiver.id) {
            return { success: false, message: "Critical Security Error: Player profile mismatch." };
        }

        // Final security check: Ensure assets are still available right now
        const senderHasItems = trade.senderOffer.items.every(item => sender.inventory.includes(item));
        const senderHasTokens = sender.tokens >= trade.senderOffer.tokens;
        const receiverHasItems = trade.receiverOffer.items.every(item => receiver.inventory.includes(item));
        const receiverHasTokens = receiver.tokens >= trade.receiverOffer.tokens;

        if (!senderHasItems || !senderHasTokens || !receiverHasItems || !receiverHasTokens) {
            this.activeTrades.delete(tradeId);
            return { success: false, message: "Trade cancelled: Assets changed before completion." };
        }

        // EXECUTE TRANSACTION: Deduct and add assets
        
        // Process Sender giving items/tokens to Receiver
        trade.senderOffer.items.forEach(item => {
            sender.inventory.splice(sender.inventory.indexOf(item), 1);
            receiver.inventory.push(item);
        });
        sender.tokens -= trade.senderOffer.tokens;
        receiver.tokens += trade.senderOffer.tokens;

        // Process Receiver giving items/tokens to Sender
        trade.receiverOffer.items.forEach(item => {
            receiver.inventory.splice(receiver.inventory.indexOf(item), 1);
            sender.inventory.push(item);
        });
        receiver.tokens -= trade.receiverOffer.tokens;
        sender.tokens += trade.receiverOffer.tokens;

        // Clean up trade record
        this.activeTrades.delete(tradeId);

        return { 
            success: true, 
            message: "Trade successfully processed! Inventories updated globally.",
            players: { sender, receiver }
        };
    },

    /**
     * Cancel or Decline an active trade
     */
    cancelTrade(tradeId) {
        if (this.activeTrades.has(tradeId)) {
            this.activeTrades.delete(tradeId);
            return { success: true, message: "Trade request rejected." };
        }
        return { success: false, message: "Trade record not found." };
    }
};
