// Sharkboo Packs System - Water, Beaches, Fishes & Oceans Theme

class PacksSystem {
  constructor() {
    this.packs = this.initializePacks();
    this.playerOwnedPacks = {};
    this.seasonalOffers = [];
  }

  initializePacks() {
    return [
      // ============ OCEAN EXPLORER PACKS ============
      {
        id: 1,
        name: "Great White Pack",
        type: "cosmetic",
        theme: "Great White Shark",
        description: "Become the apex predator with Great White Shark cosmetics",
        price: 500,
        icon: "🦈",
        items: [
          { name: "Great White Skin", type: "avatar" },
          { name: "Shark Fin Effect", type: "effect" },
          { name: "Ocean Blue Theme", type: "theme" }
        ],
        rarity: "rare",
        discount: 0
      },
      {
        id: 2,
        name: "Tropical Fish Pack",
        type: "cosmetic",
        theme: "Colorful Tropical Fish",
        description: "Swim with vibrant tropical fish cosmetics",
        price: 350,
        icon: "🐠",
        items: [
          { name: "Clownfish Avatar", type: "avatar" },
          { name: "Rainbow Trail", type: "effect" },
          { name: "Coral Reef Theme", type: "theme" }
        ],
        rarity: "common",
        discount: 0
      },
      {
        id: 3,
        name: "Deep Sea Mystery Pack",
        type: "cosmetic",
        theme: "Deep Sea Creatures",
        description: "Discover the mysteries of the deep ocean",
        price: 750,
        icon: "🌊",
        items: [
          { name: "Anglerfish Avatar", type: "avatar" },
          { name: "Bioluminescent Glow", type: "effect" },
          { name: "Dark Ocean Theme", type: "theme" },
          { name: "Deep Sea Particles", type: "effect" }
        ],
        rarity: "epic",
        discount: 0
      },
      {
        id: 4,
        name: "Beach Paradise Pack",
        type: "cosmetic",
        theme: "Sandy Beaches",
        description: "Relax on beautiful sandy beaches",
        price: 400,
        icon: "🏖️",
        items: [
          { name: "Beach Outfit", type: "avatar" },
          { name: "Sand Particles", type: "effect" },
          { name: "Tropical Beach Theme", type: "theme" }
        ],
        rarity: "uncommon",
        discount: 0
      },
      {
        id: 5,
        name: "Manta Ray Glide Pack",
        type: "cosmetic",
        theme: "Manta Ray",
        description: "Glide gracefully like a manta ray",
        price: 550,
        icon: "🏴",
        items: [
          { name: "Manta Ray Avatar", type: "avatar" },
          { name: "Graceful Glide", type: "effect" },
          { name: "Ray Wing Trail", type: "effect" }
        ],
        rarity: "rare",
        discount: 0
      },

      // ============ QUIZ & KNOWLEDGE PACKS ============
      {
        id: 6,
        name: "Ocean Facts Quiz Pack",
        type: "quiz",
        theme: "Ocean Knowledge",
        description: "Learn fascinating facts about the ocean",
        price: 300,
        icon: "📚",
        quizzes: [
          { title: "Marine Life 101", questions: 20 },
          { title: "Ocean Depths", questions: 15 },
          { title: "Coral Reefs", questions: 25 },
          { title: "Sea Creatures Trivia", questions: 30 }
        ],
        rarity: "common",
        discount: 0
      },
      {
        id: 7,
        name: "Fish Species Expert Pack",
        type: "quiz",
        theme: "Fish Identification",
        description: "Become an expert in fish species",
        price: 400,
        icon: "🐟",
        quizzes: [
          { title: "Freshwater Fish", questions: 20 },
          { title: "Saltwater Fish", questions: 25 },
          { title: "Rare Fish Species", questions: 30 },
          { title: "Fish Behavior", questions: 20 }
        ],
        rarity: "uncommon",
        discount: 0
      },
      {
        id: 8,
        name: "Beach Survival Quiz Pack",
        type: "quiz",
        theme: "Beach Safety",
        description: "Master beach and water safety",
        price: 350,
        icon: "⛱️",
        quizzes: [
          { title: "Water Safety 101", questions: 25 },
          { title: "Beach Hazards", questions: 20 },
          { title: "Rip Current Survival", questions: 15 },
          { title: "First Aid at Beach", questions: 20 }
        ],
        rarity: "uncommon",
        discount: 0
      },
      {
        id: 9,
        name: "Oceanography Master Pack",
        type: "quiz",
        theme: "Advanced Ocean Science",
        description: "Advanced ocean science and research",
        price: 600,
        icon: "🔬",
        quizzes: [
          { title: "Ocean Currents", questions: 30 },
          { title: "Marine Ecosystems", questions: 35 },
          { title: "Whale Migration", questions: 25 },
          { title: "Ocean Pollution", questions: 20 }
        ],
        rarity: "rare",
        discount: 0
      },
      {
        id: 10,
        name: "Underwater Creatures Pack",
        type: "quiz",
        theme: "Sea Creature Biology",
        description: "Explore the fascinating world of sea creatures",
        price: 450,
        icon: "🐙",
        quizzes: [
          { title: "Cephalopods", questions: 20 },
          { title: "Jellyfish & Stingers", questions: 18 },
          { title: "Sea Turtles", questions: 15 },
          { title: "Crustaceans", questions: 22 }
        ],
        rarity: "uncommon",
        discount: 0
      },

      // ============ POWER-UP BUNDLES ============
      {
        id: 11,
        name: "Shark Attack Bundle",
        type: "powerup",
        theme: "Aggressive Boosts",
        description: "Dominate with shark-themed power-ups",
        price: 250,
        icon: "⚡",
        powerups: [
          { name: "2x Score Boost", quantity: 5 },
          { name: "Speed Rush", quantity: 3 },
          { name: "Perfect Streak", quantity: 2 }
        ],
        rarity: "common",
        discount: 0
      },
      {
        id: 12,
        name: "Ocean Guardian Bundle",
        type: "powerup",
        theme: "Defensive Boosts",
        description: "Protect yourself with guardian power-ups",
        price: 300,
        icon: "🛡️",
        powerups: [
          { name: "Shield", quantity: 5 },
          { name: "Freeze Time", quantity: 3 },
          { name: "Error Correction", quantity: 4 }
        ],
        rarity: "uncommon",
        discount: 0
      },
      {
        id: 13,
        name: "Deep Sea Treasure Bundle",
        type: "powerup",
        theme: "Rare Boosts",
        description: "Unlock rare and powerful power-ups",
        price: 500,
        icon: "💎",
        powerups: [
          { name: "2x Score Boost", quantity: 10 },
          { name: "Shield", quantity: 8 },
          { name: "Hint", quantity: 10 },
          { name: "Extra Time", quantity: 5 },
          { name: "Perfect Streak", quantity: 5 }
        ],
        rarity: "rare",
        discount: 10
      },
      {
        id: 14,
        name: "Whale Wisdom Bundle",
        type: "powerup",
        theme: "Intelligence Boosts",
        description: "Enhance your mind with wisdom power-ups",
        price: 350,
        icon: "🐋",
        powerups: [
          { name: "Hint", quantity: 8 },
          { name: "Multiple Choice Reveal", quantity: 5 },
          { name: "Pattern Recognition", quantity: 3 }
        ],
        rarity: "uncommon",
        discount: 0
      },
      {
        id: 15,
        name: "Coral Reef Combo Bundle",
        type: "powerup",
        theme: "Balanced Boosts",
        description: "A balanced mix of all power-up types",
        price: 400,
        icon: "🌸",
        powerups: [
          { name: "2x Score Boost", quantity: 4 },
          { name: "Shield", quantity: 4 },
          { name: "Hint", quantity: 4 },
          { name: "Extra Time", quantity: 4 }
        ],
        rarity: "uncommon",
        discount: 5
      },

      // ============ SEASONAL & LIMITED PACKS ============
      {
        id: 16,
        name: "Summer Beach Vibes Pack",
        type: "seasonal",
        theme: "Summer Collection",
        description: "Limited summer beach-themed collection",
        price: 600,
        icon: "☀️",
        items: [
          { name: "Summer Swimsuit", type: "avatar" },
          { name: "Beach Ball Effect", type: "effect" },
          { name: "Sunset Theme", type: "theme" },
          { name: "Ice Cream Trail", type: "effect" }
        ],
        rarity: "rare",
        discount: 0,
        limited: true,
        expiresAt: "2026-08-31"
      },
      {
        id: 17,
        name: "Dolphin Delight Pack",
        type: "cosmetic",
        theme: "Playful Dolphins",
        description: "Playful and intelligent dolphin collection",
        price: 480,
        icon: "🐬",
        items: [
          { name: "Dolphin Avatar", type: "avatar" },
          { name: "Dolphin Jump", type: "effect" },
          { name: "Playful Bubbles", type: "effect" },
          { name: "Dolphin Pod Theme", type: "theme" }
        ],
        rarity: "rare",
        discount: 0
      },
      {
        id: 18,
        name: "Neon Ocean Pack",
        type: "cosmetic",
        theme: "Futuristic Ocean",
        description: "Futuristic neon ocean aesthetics",
        price: 700,
        icon: "🌐",
        items: [
          { name: "Neon Suit", type: "avatar" },
          { name: "Neon Glow", type: "effect" },
          { name: "Cyber Ocean Theme", type: "theme" },
          { name: "Digital Waves", type: "effect" }
        ],
        rarity: "epic",
        discount: 0
      },
      {
        id: 19,
        name: "Starter Ocean Bundle",
        type: "bundle",
        theme: "New Player Bundle",
        description: "Perfect for new players starting their ocean journey",
        price: 299,
        icon: "🎁",
        includes: [
          { pack_id: 2, name: "Tropical Fish Pack" },
          { pack_id: 6, name: "Ocean Facts Quiz Pack" },
          { pack_id: 11, name: "Shark Attack Bundle" },
          { bonus_coins: 100 }
        ],
        rarity: "common",
        discount: 25
      },
      {
        id: 20,
        name: "Ultimate Ocean Collector Pack",
        type: "ultimate",
        theme: "Complete Ocean Experience",
        description: "The ultimate ocean collection - everything included",
        price: 1999,
        icon: "👑",
        includes: "All cosmetics, all quizzes, all power-ups + exclusive legendary items",
        items: [
          { name: "Legendary Ocean King Avatar", type: "avatar" },
          { name: "Ocean Crown", type: "accessory" },
          { name: "1000 Bonus Coins", type: "currency" }
        ],
        rarity: "legendary",
        discount: 20,
        exclusive: true
      }
    ];
  }

  // ============ PACK MANAGEMENT ============
  getPack(packId) {
    return this.packs.find(p => p.id === packId);
  }

  getAllPacks() {
    return this.packs;
  }

  getPacksByTheme(theme) {
    return this.packs.filter(p => p.theme.toLowerCase().includes(theme.toLowerCase()));
  }

  getPacksByRarity(rarity) {
    return this.packs.filter(p => p.rarity === rarity);
  }

  // ============ PLAYER PACK OWNERSHIP ============
  purchasePack(playerId, packId) {
    const pack = this.getPack(packId);
    if (!pack) {
      return { success: false, message: "Pack not found" };
    }

    if (!this.playerOwnedPacks[playerId]) {
      this.playerOwnedPacks[playerId] = [];
    }

    // Check if already owned
    if (this.playerOwnedPacks[playerId].some(p => p.id === packId)) {
      return { success: false, message: "Pack already owned" };
    }

    this.playerOwnedPacks[playerId].push({
      ...pack,
      purchasedAt: new Date(),
      purchasePrice: pack.price * (1 - pack.discount / 100)
    });

    return {
      success: true,
      message: `Successfully purchased ${pack.name}`,
      pack
    };
  }

  getPlayerPacks(playerId) {
    return this.playerOwnedPacks[playerId] || [];
  }

  getPlayerPackIds(playerId) {
    return (this.playerOwnedPacks[playerId] || []).map(p => p.id);
  }

  hasPlayerOwnedPack(playerId, packId) {
    return this.getPlayerPackIds(playerId).includes(packId);
  }

  // ============ PACK BROWSING ============
  getFeaturedPacks() {
    return this.packs
      .filter(p => p.rarity === "epic" || p.rarity === "legendary")
      .slice(0, 5);
  }

  getRecommendedPacks(playerId) {
    const ownedIds = this.getPlayerPackIds(playerId);
    return this.packs
      .filter(p => !ownedIds.includes(p.id))
      .sort((a, b) => b.rarity.length - a.rarity.length)
      .slice(0, 10);
  }

  getPacksByType(type) {
    return this.packs.filter(p => p.type === type);
  }

  // ============ SEASONAL OFFERS ============
  createSeasonalOffer(packIds, discount, expiresAt) {
    const offer = {
      id: Math.random().toString(36).substr(2, 9),
      packIds,
      discount,
      expiresAt,
      createdAt: new Date()
    };
    this.seasonalOffers.push(offer);
    return offer;
  }

  getActiveOffers() {
    return this.seasonalOffers.filter(o => new Date() < new Date(o.expiresAt));
  }

  // ============ PACK STATISTICS ============
  getPackStats() {
    return {
      totalPacks: this.packs.length,
      cosmeticPacks: this.getPacksByType("cosmetic").length,
      quizPacks: this.getPacksByType("quiz").length,
      powerupBundles: this.getPacksByType("powerup").length,
      seasonalPacks: this.getPacksByType("seasonal").length,
      averagePrice: Math.round(this.packs.reduce((sum, p) => sum + p.price, 0) / this.packs.length),
      mostExpensive: Math.max(...this.packs.map(p => p.price)),
      mostAffordable: Math.min(...this.packs.map(p => p.price))
    };
  }

  getMostPopularPacks() {
    // In a real system, track purchases
    return this.getFeaturedPacks();
  }
}

// ============ PACK UI CONTROLLER ============
class PacksUI {
  constructor(packsSystem) {
    this.system = packsSystem;
    this.currentView = "store";
    this.filterType = "all";
    this.sortBy = "popularity";
  }

  renderPackStore() {
    return {
      view: "store",
      title: "Ocean Packs Store",
      sections: [
        {
          title: "Featured Packs",
          packs: this.system.getFeaturedPacks(),
          icon: "⭐"
        },
        {
          title: "Cosmetic Packs",
          packs: this.system.getPacksByType("cosmetic"),
          icon: "🎨"
        },
        {
          title: "Quiz Packs",
          packs: this.system.getPacksByType("quiz"),
          icon: "📚"
        },
        {
          title: "Power-up Bundles",
          packs: this.system.getPacksByType("powerup"),
          icon: "⚡"
        },
        {
          title: "Limited & Seasonal",
          packs: this.system.getPacksByType("seasonal"),
          icon: "🎁"
        }
      ],
      activeOffers: this.system.getActiveOffers()
    };
  }

  renderPackDetails(packId) {
    const pack = this.system.getPack(packId);
    if (!pack) {
      return { error: "Pack not found" };
    }

    return {
      view: "pack_details",
      pack,
      finalPrice: pack.price * (1 - pack.discount / 100),
      discount: pack.discount,
      originalPrice: pack.price
    };
  }

  renderPlayerInventory(playerId) {
    return {
      view: "player_inventory",
      title: "My Packs",
      packs: this.system.getPlayerPacks(playerId),
      totalOwned: this.system.getPlayerPacks(playerId).length
    };
  }

  renderStoreStats() {
    return {
      view: "store_stats",
      stats: this.system.getPackStats(),
      popularPacks: this.system.getMostPopularPacks()
    };
  }
}

// Export
module.exports = {
  PacksSystem,
  PacksUI
};