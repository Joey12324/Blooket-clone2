// Owner Panel - Admin Management System for Sharkboo
// With Password Authentication

class OwnerPanel {
  constructor() {
    this.adminUsers = [];
    this.gameStats = {};
    this.users = [];
    this.quizzes = [];
    this.reports = [];
    this.sessions = {};
    this.serverSettings = {
      maintenanceMode: false,
      maxPlayers: 100,
      maxQuizSize: 50,
      dailyUserLimit: 10000
    };
    
    // Default owner credentials (CHANGE THESE!)
    this.ownerCredentials = {
      username: "owner",
      password: this.hashPassword("sharkboo123") // Hash the default password
    };
  }

  // ============ AUTHENTICATION ============
  hashPassword(password) {
    // Simple hash function - use bcrypt or similar in production!
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  login(username, password) {
    if (username !== this.ownerCredentials.username) {
      return {
        success: false,
        message: "Invalid username or password",
        sessionId: null
      };
    }

    const hashedPassword = this.hashPassword(password);
    if (hashedPassword !== this.ownerCredentials.password) {
      return {
        success: false,
        message: "Invalid username or password",
        sessionId: null
      };
    }

    // Generate session token
    const sessionId = Math.random().toString(36).substr(2, 16);
    this.sessions[sessionId] = {
      username,
      loginTime: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };

    return {
      success: true,
      message: "Login successful",
      sessionId,
      expiresAt: this.sessions[sessionId].expiresAt
    };
  }

  logout(sessionId) {
    if (this.sessions[sessionId]) {
      delete this.sessions[sessionId];
      return { success: true, message: "Logged out successfully" };
    }
    return { success: false, message: "Session not found" };
  }

  verifySession(sessionId) {
    const session = this.sessions[sessionId];
    if (!session) {
      return { valid: false, message: "Invalid session" };
    }

    if (new Date() > session.expiresAt) {
      delete this.sessions[sessionId];
      return { valid: false, message: "Session expired" };
    }

    return { valid: true, username: session.username };
  }

  changePassword(sessionId, oldPassword, newPassword) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Invalid session" };
    }

    const hashedOldPassword = this.hashPassword(oldPassword);
    if (hashedOldPassword !== this.ownerCredentials.password) {
      return { success: false, message: "Current password is incorrect" };
    }

    this.ownerCredentials.password = this.hashPassword(newPassword);
    return { success: true, message: "Password changed successfully" };
  }

  // ============ USER MANAGEMENT ============
  addAdmin(userId, username, role = "moderator") {
    const admin = {
      id: userId,
      username,
      role,
      createdAt: new Date(),
      permissions: this.getRolePermissions(role)
    };
    this.adminUsers.push(admin);
    return admin;
  }

  removeAdmin(userId) {
    this.adminUsers = this.adminUsers.filter(a => a.id !== userId);
    return true;
  }

  getRolePermissions(role) {
    const permissions = {
      owner: ["ban_user", "delete_quiz", "manage_admins", "view_analytics", "server_settings", "view_reports"],
      moderator: ["ban_user", "delete_quiz", "view_analytics", "view_reports"],
      support: ["view_analytics", "view_reports"]
    };
    return permissions[role] || [];
  }

  getAdminList() {
    return this.adminUsers;
  }

  // ============ USER CONTROL ============
  banUser(sessionId, userId, reason = "Violation of Terms of Service", duration = null) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    const ban = {
      userId,
      reason,
      bannedAt: new Date(),
      duration,
      expiresAt: duration ? new Date(Date.now() + duration * 1000) : null,
      status: "active"
    };
    if (!this.gameStats[userId]) {
      this.gameStats[userId] = {};
    }
    this.gameStats[userId].banned = ban;
    return { success: true, ban };
  }

  unbanUser(sessionId, userId) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    if (this.gameStats[userId]) {
      this.gameStats[userId].banned = null;
    }
    return { success: true, message: "User unbanned" };
  }

  checkIfBanned(userId) {
    const ban = this.gameStats[userId]?.banned;
    if (!ban) return false;
    if (ban.expiresAt && new Date() > ban.expiresAt) {
      this.unbanUser(null, userId);
      return false;
    }
    return ban.status === "active";
  }

  warnUser(sessionId, userId, reason) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    if (!this.gameStats[userId]) {
      this.gameStats[userId] = { warnings: [] };
    }
    if (!this.gameStats[userId].warnings) {
      this.gameStats[userId].warnings = [];
    }
    this.gameStats[userId].warnings.push({
      reason,
      timestamp: new Date(),
      id: this.gameStats[userId].warnings.length + 1
    });
    return { success: true, warnings: this.gameStats[userId].warnings };
  }

  // ============ QUIZ MANAGEMENT ============
  approveQuiz(sessionId, quizId) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    const quiz = this.quizzes.find(q => q.id === quizId);
    if (quiz) {
      quiz.approved = true;
      quiz.approvedAt = new Date();
      return { success: true, quiz };
    }
    return { success: false, message: "Quiz not found" };
  }

  rejectQuiz(sessionId, quizId, reason) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    const quiz = this.quizzes.find(q => q.id === quizId);
    if (quiz) {
      quiz.approved = false;
      quiz.rejectionReason = reason;
      quiz.rejectedAt = new Date();
      return { success: true, quiz };
    }
    return { success: false, message: "Quiz not found" };
  }

  deleteQuiz(sessionId, quizId, reason) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    const quizIndex = this.quizzes.findIndex(q => q.id === quizId);
    if (quizIndex !== -1) {
      const deletedQuiz = this.quizzes[quizIndex];
      this.quizzes.splice(quizIndex, 1);
      this.reports.push({
        type: "quiz_deleted",
        quizId,
        reason,
        timestamp: new Date()
      });
      return { success: true, deletedQuiz };
    }
    return { success: false, message: "Quiz not found" };
  }

  getPendingQuizzes(sessionId) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    return { success: true, quizzes: this.quizzes.filter(q => q.approved === undefined) };
  }

  // ============ ANALYTICS & REPORTING ============
  getGameStats(sessionId) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    const stats = {
      totalUsers: Object.keys(this.gameStats).length,
      activeUsers: Object.values(this.gameStats).filter(u => u.lastActive && 
        (Date.now() - u.lastActive) < 3600000).length,
      totalQuizzes: this.quizzes.length,
      approvedQuizzes: this.quizzes.filter(q => q.approved).length,
      bannedUsers: Object.values(this.gameStats).filter(u => u.banned?.status === "active").length,
      timestamp: new Date()
    };
    return { success: true, stats };
  }

  getUserStats(sessionId, userId) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    return { success: true, stats: this.gameStats[userId] || null };
  }

  getTopQuizzes(sessionId, limit = 10) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    const quizzes = this.quizzes
      .filter(q => q.approved)
      .sort((a, b) => (b.plays || 0) - (a.plays || 0))
      .slice(0, limit);
    return { success: true, quizzes };
  }

  // ============ SERVER SETTINGS ============
  updateServerSettings(sessionId, settings) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    this.serverSettings = { ...this.serverSettings, ...settings };
    return { success: true, settings: this.serverSettings };
  }

  getServerSettings(sessionId) {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    return { success: true, settings: this.serverSettings };
  }

  toggleMaintenanceMode(sessionId, enabled, message = "") {
    const verification = this.verifySession(sessionId);
    if (!verification.valid) {
      return { success: false, message: "Unauthorized" };
    }

    this.serverSettings.maintenanceMode = enabled;
    this.serverSettings.maintenanceMessage = message;
    return { success: true, settings: this.serverSettings };
  }
}

// ============ OWNER PANEL UI CONTROLLER ============
class OwnerPanelUI {
  constructor(ownerPanel) {
    this.panel = ownerPanel;
    this.currentView = "login";
    this.currentSessionId = null;
  }

  renderLoginPage() {
    return {
      view: "login",
      fields: [
        { name: "username", type: "text", placeholder: "Enter username" },
        { name: "password", type: "password", placeholder: "Enter password" }
      ],
      submitButton: "Login",
      message: "Enter your credentials to access the Owner Panel"
    };
  }

  handleLogin(username, password) {
    const result = this.panel.login(username, password);
    if (result.success) {
      this.currentSessionId = result.sessionId;
      this.currentView = "dashboard";
      return { success: true, sessionId: result.sessionId };
    }
    return { success: false, message: result.message };
  }

  handleLogout() {
    const result = this.panel.logout(this.currentSessionId);
    this.currentSessionId = null;
    this.currentView = "login";
    return result;
  }

  renderDashboard() {
    const statsResult = this.panel.getGameStats(this.currentSessionId);
    if (!statsResult.success) {
      return { error: "Unauthorized access" };
    }

    const stats = statsResult.stats;
    return {
      view: "dashboard",
      widgets: [
        { title: "Total Users", value: stats.totalUsers, icon: "👥" },
        { title: "Active Now", value: stats.activeUsers, icon: "🟢" },
        { title: "Quizzes", value: stats.totalQuizzes, icon: "📝" },
        { title: "Banned Users", value: stats.bannedUsers, icon: "🚫" }
      ],
      navigation: ["Dashboard", "Users", "Quizzes", "Analytics", "Settings", "Logout"]
    };
  }

  renderUserManagement() {
    return {
      view: "user_management",
      actions: [
        { action: "ban_user", label: "Ban User", icon: "🚫" },
        { action: "warn_user", label: "Warn User", icon: "⚠️" },
        { action: "view_stats", label: "View User Stats", icon: "📊" },
        { action: "unban_user", label: "Unban User", icon: "✅" }
      ]
    };
  }

  renderQuizModeration() {
    const result = this.panel.getPendingQuizzes(this.currentSessionId);
    if (!result.success) {
      return { error: "Unauthorized access" };
    }

    return {
      view: "quiz_moderation",
      pendingCount: result.quizzes.length,
      actions: ["Approve", "Reject", "Delete"],
      pendingQuizzes: result.quizzes
    };
  }

  renderSettings() {
    const result = this.panel.getServerSettings(this.currentSessionId);
    if (!result.success) {
      return { error: "Unauthorized access" };
    }

    return {
      view: "settings",
      settings: result.settings,
      options: [
        { key: "maintenanceMode", label: "Maintenance Mode", type: "toggle" },
        { key: "maxPlayers", label: "Max Players", type: "number" },
        { key: "maxQuizSize", label: "Max Quiz Size", type: "number" },
        { key: "dailyUserLimit", label: "Daily User Limit", type: "number" }
      ]
    };
  }

  changePassword(oldPassword, newPassword) {
    return this.panel.changePassword(this.currentSessionId, oldPassword, newPassword);
  }
}

// Export for use
module.exports = {
  OwnerPanel,
  OwnerPanelUI
};