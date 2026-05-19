// Owner Panel - Admin Management System for Sharkboo

class OwnerPanel {
  constructor() {
    this.adminUsers = [];
    this.gameStats = {};
    this.users = [];
    this.quizzes = [];
    this.reports = [];
    this.serverSettings = {
      maintenanceMode: false,
      maxPlayers: 100,
      maxQuizSize: 50,
      dailyUserLimit: 10000
    };
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
  banUser(userId, reason = "Violation of Terms of Service", duration = null) {
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
    return ban;
  }

  unbanUser(userId) {
    if (this.gameStats[userId]) {
      this.gameStats[userId].banned = null;
    }
    return true;
  }

  checkIfBanned(userId) {
    const ban = this.gameStats[userId]?.banned;
    if (!ban) return false;
    if (ban.expiresAt && new Date() > ban.expiresAt) {
      this.unbanUser(userId);
      return false;
    }
    return ban.status === "active";
  }

  warnUser(userId, reason) {
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
    return this.gameStats[userId].warnings;
  }

  // ============ QUIZ MANAGEMENT ============
  approveQuiz(quizId) {
    const quiz = this.quizzes.find(q => q.id === quizId);
    if (quiz) {
      quiz.approved = true;
      quiz.approvedAt = new Date();
      return quiz;
    }
    return null;
  }

  rejectQuiz(quizId, reason) {
    const quiz = this.quizzes.find(q => q.id === quizId);
    if (quiz) {
      quiz.approved = false;
      quiz.rejectionReason = reason;
      quiz.rejectedAt = new Date();
      return quiz;
    }
    return null;
  }

  deleteQuiz(quizId, reason) {
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
      return deletedQuiz;
    }
    return null;
  }

  getPendingQuizzes() {
    return this.quizzes.filter(q => q.approved === undefined);
  }

  // ============ ANALYTICS & REPORTING ============
  getGameStats() {
    return {
      totalUsers: Object.keys(this.gameStats).length,
      activeUsers: Object.values(this.gameStats).filter(u => u.lastActive && 
        (Date.now() - u.lastActive) < 3600000).length, // Last hour
      totalQuizzes: this.quizzes.length,
      approvedQuizzes: this.quizzes.filter(q => q.approved).length,
      bannedUsers: Object.values(this.gameStats).filter(u => u.banned?.status === "active").length,
      timestamp: new Date()
    };
  }

  getUserStats(userId) {
    return this.gameStats[userId] || null;
  }

  getTopQuizzes(limit = 10) {
    return this.quizzes
      .filter(q => q.approved)
      .sort((a, b) => (b.plays || 0) - (a.plays || 0))
      .slice(0, limit);
  }

  getTopCreators(limit = 10) {
    const creators = {};
    this.quizzes.forEach(quiz => {
      if (!creators[quiz.creatorId]) {
        creators[quiz.creatorId] = { quizzes: 0, totalPlays: 0 };
      }
      creators[quiz.creatorId].quizzes++;
      creators[quiz.creatorId].totalPlays += quiz.plays || 0;
    });
    
    return Object.entries(creators)
      .map(([creatorId, data]) => ({ creatorId, ...data }))
      .sort((a, b) => b.totalPlays - a.totalPlays)
      .slice(0, limit);
  }

  generateReport(reportType, data = {}) {
    const report = {
      id: Math.random().toString(36).substr(2, 9),
      type: reportType,
      data,
      generatedAt: new Date()
    };
    this.reports.push(report);
    return report;
  }

  getReports(type = null) {
    if (type) {
      return this.reports.filter(r => r.type === type);
    }
    return this.reports;
  }

  // ============ SERVER SETTINGS ============
  updateServerSettings(settings) {
    this.serverSettings = { ...this.serverSettings, ...settings };
    return this.serverSettings;
  }

  getServerSettings() {
    return this.serverSettings;
  }

  toggleMaintenanceMode(enabled, message = "") {
    this.serverSettings.maintenanceMode = enabled;
    this.serverSettings.maintenanceMessage = message;
    return this.serverSettings;
  }

  isUnderMaintenance() {
    return this.serverSettings.maintenanceMode;
  }

  // ============ CONTENT MODERATION ============
  flagContent(contentId, contentType, reason, reporter) {
    const flag = {
      id: Math.random().toString(36).substr(2, 9),
      contentId,
      contentType, // 'quiz', 'user', 'comment'
      reason,
      reporter,
      flaggedAt: new Date(),
      status: "pending"
    };
    this.reports.push(flag);
    return flag;
  }

  reviewFlag(flagId, action, notes = "") {
    const flag = this.reports.find(r => r.id === flagId);
    if (flag) {
      flag.status = action; // 'approved', 'rejected', 'pending'
      flag.reviewedAt = new Date();
      flag.reviewNotes = notes;
      return flag;
    }
    return null;
  }

  getPendingFlags() {
    return this.reports.filter(r => r.status === "pending" && r.contentId);
  }

  // ============ SYSTEM LOGS ============
  logAdminAction(adminId, action, target, details = {}) {
    return {
      adminId,
      action,
      target,
      details,
      timestamp: new Date()
    };
  }

  // ============ NOTIFICATIONS ============
  sendSystemAnnouncement(message, type = "info") {
    return {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type, // 'info', 'warning', 'maintenance'
      sentAt: new Date(),
      recipients: "all"
    };
  }

  // ============ BACKUP & RECOVERY ============
  backupDatabase() {
    const backup = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      data: {
        users: this.users.length,
        quizzes: this.quizzes.length,
        admins: this.adminUsers.length,
        reports: this.reports.length
      }
    };
    return backup;
  }

  // ============ USER INSIGHTS ============
  getUserInsights() {
    return {
      newUsersToday: Math.floor(Math.random() * 100),
      newUsersThisWeek: Math.floor(Math.random() * 500),
      retentionRate: (Math.random() * 100).toFixed(2) + "%",
      averageSessionDuration: "12 minutes",
      mostPlayedTime: "7 PM - 9 PM"
    };
  }

  getRevenueStats() {
    return {
      totalRevenue: "$15,234.50",
      revenueToday: "$234.50",
      revenueThisMonth: "$4,234.50",
      topProduct: "Starter Pack (5 Power-ups)",
      topCountry: "United States"
    };
  }
}

// ============ OWNER PANEL UI CONTROLLER ============
class OwnerPanelUI {
  constructor(ownerPanel) {
    this.panel = ownerPanel;
    this.currentView = "dashboard";
  }

  renderDashboard() {
    const stats = this.panel.getGameStats();
    return {
      view: "dashboard",
      widgets: [
        {
          title: "Total Users",
          value: stats.totalUsers,
          icon: "👥"
        },
        {
          title: "Active Now",
          value: stats.activeUsers,
          icon: "🟢"
        },
        {
          title: "Quizzes",
          value: stats.totalQuizzes,
          icon: "📝"
        },
        {
          title: "Banned Users",
          value: stats.bannedUsers,
          icon: "🚫"
        }
      ]
    };
  }

  renderUserManagement() {
    return {
      view: "user_management",
      actions: [
        "Ban User",
        "Warn User",
        "View User Profile",
        "Check Ban Status"
      ]
    };
  }

  renderQuizModeration() {
    const pending = this.panel.getPendingQuizzes();
    return {
      view: "quiz_moderation",
      pendingCount: pending.length,
      pendingQuizzes: pending
    };
  }

  renderAnalytics() {
    return {
      view: "analytics",
      gameStats: this.panel.getGameStats(),
      topQuizzes: this.panel.getTopQuizzes(10),
      topCreators: this.panel.getTopCreators(10),
      userInsights: this.panel.getUserInsights(),
      revenueStats: this.panel.getRevenueStats()
    };
  }

  renderServerSettings() {
    return {
      view: "server_settings",
      settings: this.panel.getServerSettings(),
      options: [
        "Maintenance Mode",
        "Max Players",
        "Max Quiz Size",
        "Daily User Limit"
      ]
    };
  }

  renderReports() {
    const flags = this.panel.getPendingFlags();
    return {
      view: "reports",
      pendingFlags: flags,
      allReports: this.panel.getReports()
    };
  }
}

// Export for use
module.exports = {
  OwnerPanel,
  OwnerPanelUI
};