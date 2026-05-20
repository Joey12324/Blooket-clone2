// ==========================================
// BLOOKET CLONE - DAILY SPIN MOTOR ENGINE
// ==========================================

const DailySpinSystem = {
    // 1. Configure prizes matching your wheel segments clockwise
    prizes: [
        { name: "10 Tokens", type: "tokens", value: 10 },
        { name: "Kitten Blook", type: "item", value: "Kitten" },
        { name: "100 Tokens", type: "tokens", value: 100 },
        { name: "Slime Monster", type: "item", value: "Slime Monster" },
        { name: "50 Tokens", type: "tokens", value: 50 },
        { name: "Gold Blook", type: "item", value: "Gold Blook" }
    ],
    
    cooldownTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds

    /**
     * Checks if the player is allowed to spin right now
     * @returns {object} Status details ({ allowed: boolean, timeLeft: number })
     */
    canPlayerSpin() {
        const lastSpin = localStorage.getItem("lastBlooketCloneSpinTime");
        if (!lastSpin) {
            return { allowed: true, timeLeft: 0 };
        }

        const timePassed = Date.now() - parseInt(lastSpin, 10);
        
        if (timePassed < this.cooldownTime) {
            return { allowed: false, timeLeft: this.cooldownTime - timePassed };
        }

        return { allowed: true, timeLeft: 0 };
    },

    /**
     * Calculates the spin math, animation degrees, and handles safety locks
     * @param {object} playerProfile - The live player data object to update
     * @returns {object|null} Spin result parameters, or null if on cooldown
     */
    executeSpin(playerProfile) {
        const check = this.canPlayerSpin();
        if (!check.allowed) {
            return null; // Block hack/cheat execution attempts
        }

        // Pick a random prize index (0 through 5)
        const prizeIndex = Math.floor(Math.random() * this.prizes.length);
        const wonPrize = this.prizes[prizeIndex];

        // Physics calculation: 60 degrees per slice. Aim directly for slice center.
        const targetDegrees = 360 - (prizeIndex * 60) - 30;
        // Add 5 fast complete preliminary loops (1800 degrees) for visual flair
        const totalAnimationDegrees = 1800 + targetDegrees;

        // Instantly save timestamp lock to block browser refresh bypass exploits
        localStorage.setItem("lastBlooketCloneSpinTime", Date.now().toString());

        // Process asset rewards directly onto player state profile
        if (wonPrize.type === "tokens") {
            playerProfile.tokens += wonPrize.value;
        } else if (wonPrize.type === "item") {
            playerProfile.inventory.push(wonPrize.value);
        }

        return {
            degrees: totalAnimationDegrees,
            prizeName: wonPrize.name,
            updatedPlayer: playerProfile
        };
    }
};
