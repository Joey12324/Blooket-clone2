// Sharkboo Titles & Badges System - Moderators, Owners & Special Roles

class TitlesSystem {
  constructor() {
    this.titles = this.initializeTitles();
    this.userTitles = {};
    this.badges = this.initializeBadges();
    this.userBadges = {};
  }

  // ============ INITIALIZE TITLES ============
  initializeTitles() {
    return [
      // ============ ADMIN TITLES ============
      {
        id: 1,
        name: "Supreme Owner",
        role: "owner",
        icon: "👑",
        color: "#FFD700",
        description: "The ultimate authority - Supreme Owner of Sharkboo",
        permissions: ["all"],
        badgeColor: "gold",
        displayText: "👑 Supreme Owner",
        specialEffects: ["gold_glow", "crown_effect"]
      },
      {
        id: 2,
        name: "Ocean King",
        role: "owner",
        icon: "🌊",
        color: "#00CED1",
        description: "Legendary ruler of the Sharkboo Ocean",
        permissions: ["all"],
        badgeColor: "cyan",
        displayText: "🌊 Ocean King",
        specialEffects: ["water_particles", "crown_effect"]
      },
      {
        id: 3,
        name: "Great White Chief",
        role: "owner",
        icon: "🦈",
        color: "#2E8B57",
        description: "Chief guardian of the shark realm",
        permissions: ["all"],
        badgeColor: "green",
        displayText: "🦈 Great White Chief",
        specialEffects: ["shark_effect"]
      },
      
      // ============ MODERATOR TITLES ============
      {
        id: 4,
        name: "Senior Moderator",
        role: "moderator",
        icon: "⭐",
        color: "#FF8C00",
        description: "Experienced guardian of the community",
        permissions: ["ban_user", "delete_quiz", "view_analytics", "manage_reports"],
        badgeColor: "orange",
        displayText: "⭐ Senior Moderator",
        specialEffects: ["star_glow"]
      },
      {
        id: 5,
        name: "Dolphin Guardian",
        role: "moderator",
        icon: "🐬",
        color: "#1E90FF",
        description: "Intelligent moderator keeping players safe",
        permissions: ["ban_user", "delete_quiz", "view_analytics", "manage_reports"],
        badgeColor: "blue",
        displayText: "🐬 Dolphin Guardian",
        specialEffects: ["dolphin_effect"]
      },
      {
        id: 6,
        name: "Coral Reef Protector",
        role: "moderator",
        icon: "🌸",
        color: "#FF69B4",
        description: "Protective moderator nurturing the community",
        permissions: ["ban_user", "delete_quiz", "view_analytics"],
        badgeColor: "pink",
        displayText: "🌸 Coral Reef Protector",
        specialEffects: ["coral_particles"]
      },
      {
        id: 7,
        name: "Manta Ray Sentinel",
        role: "moderator",
        icon: "🏴",
        color: "#696969",
        description: "Swift and graceful guardian",
        permissions: ["ban_user", "delete_quiz", "view_analytics"],
        badgeColor: "gray",
        displayText: "🏴 Manta Ray Sentinel",
        specialEffects: ["glide_effect"]
      },
      {
        id: 8,
        name: "Jellyfish Warden",
        role: "moderator",
        icon: "🪼",
        color: "#9370DB",
        description: "Glowing protector of player welfare",
        permissions: ["ban_user", "delete_quiz", "view_analytics"],
        badgeColor: "purple",
        displayText: "🪼 Jellyfish Warden",
        specialEffects: ["glow_effect"]
      },

      // ============ SUPPORT TITLES ============
      {
        id: 9,
        name: "Fish Friend Helper",
        role: "support",
        icon: "🐟",
        color: "#87CEEB",
        description: "Friendly helper assisting players",
        permissions: ["view_analytics", "respond_tickets"],
        badgeColor: "lightblue",
        displayText: "🐟 Fish Friend Helper",
        specialEffects: []
      },
      {
        id: 10,
        name: "Starfish Assistant",
        role: "support",
        icon: "⭐",
        color: "#FFD700",
        description: "Shining support for the community",
        permissions: ["view_analytics", "respond_tickets"],
        badgeColor: "yellow",
        displayText: "⭐ Starfish Assistant",
        specialEffects: ["twinkle_effect"]
      },

      // ============ SPECIAL CONTRIBUTOR TITLES ============
      {
        id: 11,
        name: "Quiz Master",
        role: "contributor",
        icon: "📚",
        color: "#8B4513",
        description: "Created 50+ quality quizzes",
        permissions: ["premium_quiz_creation"],
        badgeColor: "brown",
        displayText: "📚 Quiz Master",
        specialEffects: ["knowledge_glow"]
      },
      {
        id: 12,
        name: "Community Legend",
        role: "contributor",
        icon: "🏆",
        color: "#FFD700",
        description: "Legendary contributor to the community",
        permissions: ["premium_features"],
        badgeColor: "gold",
        displayText: "🏆 Community Legend",
        specialEffects: ["legendary_glow"]
      },
      {
        id: 13,
        name: "Ocean Explorer",
        role: "contributor",
        icon: "🗺️",
        color: "#20B2AA",
        description: "Discovered new game features",
        permissions: ["early_access"],
        badgeColor: "teal",
        displayText: "🗺️ Ocean Explorer",
        specialEffects: ["discovery_glow"]
      },
      {
        id: 14,
        name: "Whale Watcher",
        role: "contributor",
        icon: "🐋",
        color: "#4169E1",
        description: "Long-time supporter and observer",
        permissions: ["vip_access"],
        badgeColor: "royalblue",
        displayText: "🐋 Whale Watcher",
        specialEffects: ["ocean_particles"]
      },

      // ============ EVENT & SEASONAL TITLES ============
      {
        id: 15,
        name: "Summer Champion",
        role: "seasonal",
        icon: "☀️",
        color: "#FF6347",
        description: "Won the Summer Beach Challenge",
        permissions: [],
        badgeColor: "red",
        displayText: "☀️ Summer Champion",
        specialEffects: ["sun_glow"],
        seasonal: true,
        expiresAt: "2026-08-31"
      },
      {
        id: 16,
        name: "Speedrunner Supreme",
        role: "achievement",
        icon: "⚡",
        color: "#FFD700",
        description: "Completed quizzes in record time",
        permissions: [],
        badgeColor: "gold",
        displayText: "⚡ Speedrunner Supreme",
        specialEffects: ["speed_effect"]
      },
      {
        id: 17,
        name: "Shark Week Hero",
        role: "seasonal",
        icon: "🦈",
        color: "#DC143C",
        description: "Dominated during Shark Week",
        permissions: [],
        badgeColor: "crimson",
        displayText: "🦈 Shark Week Hero",
        specialEffects: ["shark_effect"],
        seasonal: true,
        expiresAt: "2026-08-15"
      },

      // ============ VIP & PREMIUM TITLES ============
      {
        id: 18,
        name: "Ocean VIP",
        role: "vip",
        icon: "💎",
        color: "#FF1493",
        description: "Premium VIP member",
        permissions: ["premium_features", "early_access", "exclusive_packs"],
        badgeColor: "deeppink",
        displayText: "💎 Ocean VIP",
        specialEffects: ["diamond_glow"]
      },
      {
        id: 19,
        name: "Platinum Citizen",
        role: "vip",
        icon: "💍",
        color: "#E5E4E2",
        description: "Highest tier VIP member",
        permissions: ["all_premium", "exclusive_content", "priority_support"],
        badgeColor: "platinum",
        displayText: "💍 Platinum Citizen",
        specialEffects: ["platinum_glow", "exclusive_particles"]
      },

      // ============ DEVELOPER TITLES ============
      {
        id: 20,
        name: "Code Architect",
        role: "developer",
        icon: "💻",
        color: "#00AA00",
        description: "Sharkboo core developer",
        permissions: ["all"],
        badgeColor: "green",
        displayText: "💻 Code Architect",
        specialEffects: ["code_glow"]
      }
    ];
  }

  // ============ INITIALIZE BADGES ============
  initializeBadges() {
    return [
      {
        id: 1,
        name: "Admin Badge",
        icon: "🔑",
        description: "Administrator of Sharkboo",
        rarity: "legendary"
      },
      {
        id: 2,
        name: "Moderator Badge",
        icon: "⚖️",
        description: "Community Moderator",
        rarity: "rare"
      },
      {
        id: 3,
        name: "Helper Badge",
        icon: "🤝",
        description: "Community Helper",
        rarity: "uncommon"
      },
      {
        id: 4,
        name: "VIP Badge",
        icon: "👑",
        description: "VIP Member",
        rarity: "epic"
      }
    ];
  }

  // ============ TITLE MANAGEMENT ============
  grantTitle(userId, titleId) {
    const title = this.titles.find(t => t.id === titleId);
    if (!title) {
      return { success: false, message: "Title not found" };
    }

    if (!this.userTitles[userId]) {
      this.userTitles[userId] = [];
    }

    // Check if already has title
    if (this.userTitles[userId].some(t => t.id === titleId)) {
      return { success: false, message: "User already has this title" };
    }

    this.userTitles[userId].push({
      ...title,
      grantedAt: new Date(),
      active: false
    });

    return {
      success: true,
      message: `Granted ${title.name} to user`,
      title
    };
  }

  revokeTitle(userId, titleId) {
    if (this.userTitles[userId]) {
      this.userTitles[userId] = this.userTitles[userId].filter(t => t.id !== titleId);
      return { success: true, message: "Title revoked" };
    }
    return { success: false, message: "User has no titles" };
  }

  setActiveTitle(userId, titleId) {
    if (!this.userTitles[userId]) {
      return { success: false, message: "User has no titles" };
    }

    const title = this.userTitles[userId].find(t => t.id === titleId);
    if (!title) {
      return { success: false, message: "User doesn't have this title" };
    }

    // Deactivate all titles
    this.userTitles[userId].forEach(t => t.active = false);

    // Activate selected title
    title.active = true;

    return {
      success: true,
      message: `Set active title to ${title.name}`,
      title
    };
  }

  getActiveTitle(userId) {
    if (!this.userTitles[userId]) return null;
    return this.userTitles[userId].find(t => t.active);
  }

  getUserTitles(userId) {
    return this.userTitles[userId] || [];
  }

  // ============ TITLE QUERIES ============
  getTitlesByRole(role) {
    return this.titles.filter(t => t.role === role);
  }

  getTitleById(titleId) {
    return this.titles.find(t => t.id === titleId);
  }

  getAdminTitles() {
    return this.titles.filter(t => t.role === "owner" || t.role === "moderator");
  }

  getModeratorTitles() {
    return this.getTitlesByRole("moderator");
  }

  getSupportTitles() {
    return this.getTitlesByRole("support");
  }

  getContributorTitles() {
    return this.getTitlesByRole("contributor");
  }

  getVIPTitles() {
    return this.getTitlesByRole("vip");
  }

  getSeasonalTitles() {
    return this.titles.filter(t => t.seasonal === true);
  }

  getActiveTitles() {
    const seasonal = this.getSeasonalTitles();
    return seasonal.filter(t => new Date() < new Date(t.expiresAt));
  }

  // ============ PROFILE DISPLAY ============
  getUserProfile(userId) {
    const titles = this.getUserTitles(userId);
    const activeTitle = this.getActiveTitle(userId);

    return {
      userId,
      activeTitle,
      allTitles: titles,
      titleCount: titles.length,
      profileDisplay: activeTitle ? `${activeTitle.displayText}` : "Player"
    };
  }

  getDisplayName(userId) {
    const activeTitle = this.getActiveTitle(userId);
    return activeTitle ? activeTitle.displayText : "Player";
  }

  // ============ LEADERBOARD ============
  getTopAdmins(limit = 10) {
    const admins = {};

    Object.entries(this.userTitles).forEach(([userId, titles]) => {
      const adminTitles = titles.filter(t => t.role === "owner" || t.role === "moderator");
      if (adminTitles.length > 0) {
        admins[userId] = {
          userId,
          titles: adminTitles,
          titleCount: adminTitles.length,
          topRole: adminTitles[0].role
        };
      }
    });

    return Object.values(admins)
      .sort((a, b) => b.titleCount - a.titleCount)
      .slice(0, limit);
  }

  // ============ TITLE STATISTICS ============
  getTitleStats() {
    let totalTitlesGranted = 0;
    let usersWithTitles = 0;

    Object.values(this.userTitles).forEach(userTitles => {
      if (userTitles.length > 0) {
        usersWithTitles++;
        totalTitlesGranted += userTitles.length;
      }
    });

    return {
      totalTitlesInSystem: this.titles.length,
      totalTitlesGranted,
      usersWithTitles,
      byRole: {
        owners: this.getTitlesByRole("owner").length,
        moderators: this.getTitlesByRole("moderator").length,
        support: this.getTitlesByRole("support").length,
        contributors: this.getTitlesByRole("contributor").length,
        vip: this.getTitlesByRole("vip").length
      }
    };
  }
}

// ============ TITLES UI ============
class TitlesUI {
  constructor(titlesSystem) {
    this.system = titlesSystem;
  }

  renderTitleStore() {
    return {
      view: "title_store",
      categories: [
        {
          name: "Admin Titles",
          icon: "👑",
          titles: this.system.getAdminTitles()
        },
        {
          name: "Moderator Titles",
          icon: "⭐",
          titles: this.system.getModeratorTitles()
        },
        {
          name: "Support Titles",
          icon: "🤝",
          titles: this.system.getSupportTitles()
        },
        {
          name: "Contributor Titles",
          icon: "🏆",
          titles: this.system.getContributorTitles()
        },
        {
          name: "VIP Titles",
          icon: "💎",
          titles: this.system.getVIPTitles()
        },
        {
          name: "Seasonal Titles",
          icon: "📅",
          titles: this.system.getActiveTitles()
        }
      ]
    };
  }

  renderUserProfile(userId) {
    return {
      view: "user_profile",
      profile: this.system.getUserProfile(userId),
      profileDisplay: this.system.getDisplayName(userId)
    };
  }

  renderTitleSelection(userId) {
    return {
      view: "title_selection",
      userId,
      availableTitles: this.system.getUserTitles(userId),
      currentActive: this.system.getActiveTitle(userId)
    };
  }

  renderAdminStats() {
    return {
      view: "admin_stats",
      topAdmins: this.system.getTopAdmins(),
      stats: this.system.getTitleStats()
    };
  }

  renderTitleDetails(titleId) {
    const title = this.system.getTitleById(titleId);
    if (!title) {
      return { error: "Title not found" };
    }

    return {
      view: "title_details",
      title,
      requirements: `Requires ${title.role} role`,
      permissions: title.permissions,
      effects: title.specialEffects
    };
  }
}

// Export
module.exports = {
  TitlesSystem,
  TitlesUI
};