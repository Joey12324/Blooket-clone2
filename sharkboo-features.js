// 1. Player Ranking System
class PlayerRanking {
  constructor() {
    this.players = [];
  }

  addPlayer(id, name, score = 0) {
    this.players.push({ id, name, score, rank: 0 });
    this.updateRanks();
  }

  updateRanks() {
    this.players.sort((a, b) => b.score - a.score);
    this.players.forEach((player, index) => {
      player.rank = index + 1;
    });
  }

  addScore(playerId, points) {
    const player = this.players.find(p => p.id === playerId);
    if (player) {
      player.score += points;
      this.updateRanks();
    }
  }

  getPlayerRank(playerId) {
    return this.players.find(p => p.id === playerId);
  }
}

// 2. Daily Challenges
class DailyChallenge {
  constructor() {
    this.challenges = [];
    this.resetTime = this.getNextResetTime();
  }

  getNextResetTime() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  }

  createChallenge(title, description, reward) {
    return { title, description, reward, completed: false, date: new Date() };
  }

  addChallenge(challenge) {
    if (this.shouldReset()) {
      this.challenges = [];
      this.resetTime = this.getNextResetTime();
    }
    this.challenges.push(challenge);
  }

  shouldReset() {
    return new Date() >= this.resetTime;
  }

  completeChallenge(challengeIndex) {
    if (this.challenges[challengeIndex]) {
      this.challenges[challengeIndex].completed = true;
      return this.challenges[challengeIndex].reward;
    }
  }

  getTodaysChallenges() {
    return this.challenges.filter(c => !c.completed);
  }
}

// 3. Achievement Badges
class AchievementBadge {
  constructor() {
    this.badges = [
      { id: 1, name: "First Step", description: "Play your first game", icon: "🎮" },
      { id: 2, name: "Perfect Score", description: "Get 100% on a quiz", icon: "🌟" },
      { id: 3, name: "Speed Demon", description: "Complete a quiz in under 2 minutes", icon: "⚡" },
      { id: 4, name: "Collector", description: "Unlock 10 badges", icon: "🏆" },
      { id: 5, name: "Social Butterfly", description: "Share 5 scores", icon: "🦋" }
    ];
    this.playerBadges = {};
  }

  unlockBadge(playerId, badgeId) {
    if (!this.playerBadges[playerId]) {
      this.playerBadges[playerId] = [];
    }
    if (!this.playerBadges[playerId].includes(badgeId)) {
      this.playerBadges[playerId].push(badgeId);
      return this.badges.find(b => b.id === badgeId);
    }
  }

  getPlayerBadges(playerId) {
    return (this.playerBadges[playerId] || []).map(id => 
      this.badges.find(b => b.id === id)
    );
  }

  checkAchievements(playerId, stats) {
    // Perfect Score
    if (stats.correctAnswers === stats.totalQuestions) {
      this.unlockBadge(playerId, 2);
    }
    // Speed Demon (under 2 minutes)
    if (stats.timeSpent < 120) {
      this.unlockBadge(playerId, 3);
    }
  }
}

// 4. Multiplayer Lobby
class MultiplayerLobby {
  constructor() {
    this.lobbies = [];
    this.nextLobbyId = 1;
  }

  createLobby(hostId, maxPlayers = 4) {
    const lobby = {
      id: this.nextLobbyId++,
      hostId,
      players: [hostId],
      maxPlayers,
      status: "waiting",
      createdAt: new Date()
    };
    this.lobbies.push(lobby);
    return lobby;
  }

  joinLobby(lobbyId, playerId) {
    const lobby = this.lobbies.find(l => l.id === lobbyId);
    if (lobby && lobby.players.length < lobby.maxPlayers && lobby.status === "waiting") {
      lobby.players.push(playerId);
      return true;
    }
    return false;
  }

  startGame(lobbyId) {
    const lobby = this.lobbies.find(l => l.id === lobbyId);
    if (lobby) {
      lobby.status = "in-progress";
      return lobby;
    }
  }

  getAvailableLobbies() {
    return this.lobbies.filter(l => l.status === "waiting" && l.players.length < l.maxPlayers);
  }
}

// 5. Power-ups System
class PowerUp {
  constructor() {
    this.powerUps = [
      { id: 1, name: "2x Score", effect: "double_points", duration: 30 },
      { id: 2, name: "Extra Time", effect: "add_time", amount: 30, duration: 0 },
      { id: 3, name: "Hint", effect: "reveal_answer", duration: 0 },
      { id: 4, name: "Shield", effect: "no_penalty", duration: 30 }
    ];
    this.activePowerUps = {};
  }

  activatePowerUp(playerId, powerUpId) {
    const powerUp = this.powerUps.find(p => p.id === powerUpId);
    if (powerUp) {
      if (!this.activePowerUps[playerId]) {
        this.activePowerUps[playerId] = [];
      }
      this.activePowerUps[playerId].push({
        ...powerUp,
        activatedAt: new Date()
      });
      return true;
    }
    return false;
  }

  isPowerUpActive(playerId, effectType) {
    const playerPowerUps = this.activePowerUps[playerId] || [];
    return playerPowerUps.some(p => 
      p.effect === effectType && 
      (Date.now() - p.activatedAt) < (p.duration * 1000)
    );
  }

  getActivePowerUps(playerId) {
    return (this.activePowerUps[playerId] || []).filter(p =>
      (Date.now() - p.activatedAt) < (p.duration * 1000)
    );
  }
}

// 6. Leaderboard
class Leaderboard {
  constructor() {
    this.globalLeaderboard = [];
    this.friendLeaderboards = {};
  }

  updateGlobalLeaderboard(players) {
    this.globalLeaderboard = players.sort((a, b) => b.score - a.score).slice(0, 100);
  }

  getTopPlayers(limit = 10) {
    return this.globalLeaderboard.slice(0, limit);
  }

  getPlayerPosition(playerId) {
    return this.globalLeaderboard.findIndex(p => p.id === playerId) + 1;
  }

  createFriendLeaderboard(userId, friendIds) {
    const friends = this.globalLeaderboard.filter(p => friendIds.includes(p.id));
    this.friendLeaderboards[userId] = friends.sort((a, b) => b.score - a.score);
    return this.friendLeaderboards[userId];
  }

  getFriendLeaderboard(userId) {
    return this.friendLeaderboards[userId] || [];
  }
}

// 7. Custom Quiz Creator
class QuizCreator {
  constructor() {
    this.quizzes = [];
    this.nextQuizId = 1;
  }

  createQuiz(creatorId, title, description) {
    return {
      id: this.nextQuizId++,
      creatorId,
      title,
      description,
      questions: [],
      createdAt: new Date(),
      plays: 0
    };
  }

  addQuestion(quizId, question, options, correctAnswer) {
    const quiz = this.quizzes.find(q => q.id === quizId);
    if (quiz) {
      quiz.questions.push({
        question,
        options,
        correctAnswer,
        id: quiz.questions.length
      });
    }
  }

  publishQuiz(quizId) {
    const quiz = this.quizzes.find(q => q.id === quizId);
    if (quiz && quiz.questions.length > 0) {
      quiz.published = true;
      return quiz;
    }
  }

  getQuizzes(creatorId = null) {
    if (creatorId) {
      return this.quizzes.filter(q => q.creatorId === creatorId && q.published);
    }
    return this.quizzes.filter(q => q.published);
  }
}

// 8. Streak Counter
class StreakCounter {
  constructor() {
    this.streaks = {};
  }

  addCorrectAnswer(playerId) {
    if (!this.streaks[playerId]) {
      this.streaks[playerId] = { count: 0, lastAnswerTime: null };
    }
    
    const now = new Date();
    const timeDiff = this.streaks[playerId].lastAnswerTime 
      ? (now - this.streaks[playerId].lastAnswerTime) / 1000 
      : 0;
    
    // Reset streak if more than 5 minutes between answers
    if (timeDiff > 300 && this.streaks[playerId].count > 0) {
      this.streaks[playerId].count = 0;
    }
    
    this.streaks[playerId].count++;
    this.streaks[playerId].lastAnswerTime = now;
    return this.streaks[playerId].count;
  }

  getStreak(playerId) {
    return this.streaks[playerId]?.count || 0;
  }

  resetStreak(playerId) {
    if (this.streaks[playerId]) {
      this.streaks[playerId].count = 0;
    }
  }
}

// 9. Currency/Shop System
class CurrencyShop {
  constructor() {
    this.playerCurrency = {};
    this.shopItems = [
      { id: 1, name: "Blue Shark Skin", price: 500, type: "cosmetic" },
      { id: 2, name: "Gold Badge", price: 1000, type: "cosmetic" },
      { id: 3, name: "Starter Pack (5 Power-ups)", price: 750, type: "bundle" },
      { id: 4, name: "Custom Avatar Frame", price: 250, type: "cosmetic" }
    ];
    this.playerInventory = {};
  }

  addCurrency(playerId, amount) {
    if (!this.playerCurrency[playerId]) {
      this.playerCurrency[playerId] = 0;
    }
    this.playerCurrency[playerId] += amount;
  }

  purchaseItem(playerId, itemId) {
    const item = this.shopItems.find(i => i.id === itemId);
    if (!item) return { success: false, message: "Item not found" };
    
    if (!this.playerCurrency[playerId] || this.playerCurrency[playerId] < item.price) {
      return { success: false, message: "Insufficient currency" };
    }
    
    this.playerCurrency[playerId] -= item.price;
    if (!this.playerInventory[playerId]) {
      this.playerInventory[playerId] = [];
    }
    this.playerInventory[playerId].push(item);
    return { success: true, message: "Purchase successful", item };
  }

  getPlayerCurrency(playerId) {
    return this.playerCurrency[playerId] || 0;
  }

  getPlayerInventory(playerId) {
    return this.playerInventory[playerId] || [];
  }

  getShopItems() {
    return this.shopItems;
  }
}

// 10. Social Sharing
class SocialSharing {
  constructor() {
    this.shares = [];
    this.socialConnections = {};
  }

  shareScore(playerId, score, quizTitle) {
    const share = {
      playerId,
      score,
      quizTitle,
      timestamp: new Date(),
      shareUrl: `sharkboo.com/share/${Math.random().toString(36).substr(2, 9)}`
    };
    this.shares.push(share);
    return share;
  }

  shareAchievement(playerId, badgeId, badgeName) {
    const share = {
      playerId,
      type: "achievement",
      badgeId,
      badgeName,
      timestamp: new Date(),
      shareUrl: `sharkboo.com/share/${Math.random().toString(36).substr(2, 9)}`
    };
    this.shares.push(share);
    return share;
  }

  connectSocialMedia(playerId, platform, username) {
    if (!this.socialConnections[playerId]) {
      this.socialConnections[playerId] = [];
    }
    this.socialConnections[playerId].push({ platform, username });
  }

  getShareStats(playerId) {
    const playerShares = this.shares.filter(s => s.playerId === playerId);
    return {
      totalShares: playerShares.length,
      scoreShares: playerShares.filter(s => s.score).length,
      achievementShares: playerShares.filter(s => s.type === "achievement").length
    };
  }
}

// Example usage
const ranking = new PlayerRanking();
const challenges = new DailyChallenge();
const badges = new AchievementBadge();
const lobby = new MultiplayerLobby();
const powerups = new PowerUp();
const leaderboard = new Leaderboard();
const quizCreator = new QuizCreator();
const streaks = new StreakCounter();
const shop = new CurrencyShop();
const socialSharing = new SocialSharing();

console.log("✅ Sharkboo Features Initialized!");

// Export for use in other modules
module.exports = {
  PlayerRanking,
  DailyChallenge,
  AchievementBadge,
  MultiplayerLobby,
  PowerUp,
  Leaderboard,
  QuizCreator,
  StreakCounter,
  CurrencyShop,
  SocialSharing
};