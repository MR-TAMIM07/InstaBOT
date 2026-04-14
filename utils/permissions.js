const ConfigManager = require('./configManager');
const logger = require('./logger');

/**
 * Role System:
 * 0 - All Users
 * 1 - (alias for role 2, kept for legacy compatibility)
 * 2 - Bot Admins     (adminBot list)   — can use noPrefix commands
 * 3 - Premium Users  (premiumUsers list)
 * 4 - Developers     (devUsers list)   — full access + noPrefix
 */

class PermissionManager {
  static getUserRole(userId) {
    const uid = String(userId);
    if (ConfigManager.getDevUsers().includes(uid))     return 4;
    if (ConfigManager.getPremiumUsers().includes(uid)) return 3;
    if (ConfigManager.getAdmins().includes(uid))       return 2;
    return 0;
  }

  static async hasPermission(userId, requiredRole = 0) {
    if (requiredRole === 0) return true;
    const userRole = this.getUserRole(userId);

    // Developers (role 4) can do everything
    if (userRole === 4) return true;

    // Role 3 (premium) satisfies 1, 2, 3
    if (requiredRole <= 3 && userRole >= requiredRole) return true;

    // Legacy role-1 treated same as role-2
    if (requiredRole === 1 && userRole >= 2) return true;

    return false;
  }

  static getRoleName(role) {
    const roles = {
      0: 'All Users',
      1: 'Bot Admin',
      2: 'Bot Admin',
      3: 'Premium User',
      4: 'Developer'
    };
    return roles[role] || 'Unknown';
  }

  /**
   * Returns true if the user can run commands without the prefix
   * (role 2 = admin, role 4 = dev)
   */
  static canUseNoPrefix(userId) {
    const role = this.getUserRole(userId);
    return role === 2 || role === 4;
  }
}

module.exports = PermissionManager;
