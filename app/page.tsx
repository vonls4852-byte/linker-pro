"use client";
import { useState, useEffect } from 'react';
import {
  // ========== ОСНОВНЫЕ ИКОНКИ ==========
  User, Camera, Heart, MessageCircle, Grid, Play, Bookmark, Settings,
  MessageSquare, LogOut, Lock, Bell, ShieldCheck, Database, Info,
  MapPin, X, Globe, Calendar,

  // ========== ИКОНКИ ТЕМ ==========
  Moon, Sun, Sparkles,

  // ========== ИКОНКИ РОЛЕЙ И МОДЕРАЦИИ ==========
  Crown, Shield, Code, Star, Trash2,
  AlertTriangle, Ban, CheckCircle, History, Clock, BookOpen,

  // ========== ИКОНКИ ПАНЕЛИ УПРАВЛЕНИЯ ==========
  LayoutDashboard, Users,

  // ========== ИКОНКА ДЛЯ СТАТИСТИКИ ==========
  Eye,

  // ========== ИКОНКИ ДЛЯ ЧАТОВ ==========
  Plus, Search, Send, CheckCheck, Users as UsersIcon, Paperclip, Image, File,

  // ========== ИКОНКИ ДЛЯ ДРУЗЕЙ ==========
  UserPlus, QrCode, Copy, Share2,

  // ========== ИКОНКИ ДЛЯ ТЕСТИРОВЩИКА ==========
  FlaskConical, TestTube, Bug, FlaskRound
} from 'lucide-react';

import AuthScreen from '@/components/AuthScreen';
import SplashScreen from '@/components/SplashScreen';

export default function LinkerPro() {
  // ==================== 1. СОСТОЯНИЯ ====================

  // 1.1 Экран приветствия
  const [showSplash, setShowSplash] = useState(true);

  // 1.2 Авторизация
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedUsers, setSavedUsers] = useState<any[]>([]);
  const [showAccountPicker, setShowAccountPicker] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 1.3 Основные данные
  const [userName, setUserName] = useState('');
  const [userBio, setUserBio] = useState('');
  const [themeColor, setThemeColor] = useState('#3b82f6');
  const [activeTab, setActiveTab] = useState<'profile' | 'friends' | 'chat' | 'feed' | 'settings' | 'dashboard'>('profile');

  // ===== ЛЕНТА НОВОСТЕЙ =====
  const [posts, setPosts] = useState<any[]>([]);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [newComment, setNewComment] = useState('');

  // ===== УВЕДОМЛЕНИЯ =====
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // 1.4 Чаты
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [foundUsers, setFoundUsers] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showFileMenu, setShowFileMenu] = useState(false);

  // 1.5 Групповые чаты
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [groupName, setGroupName] = useState('');
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [showAddParticipantsModal, setShowAddParticipantsModal] = useState(false);
  const [groupParticipants, setGroupParticipants] = useState<any[]>([]);

  // 1.6 Интерфейс чатов
  const [leftColumnWidth, setLeftColumnWidth] = useState(30);
  const [isDragging, setIsDragging] = useState(false);

  // 1.7 Друзья
  const [inviteLink, setInviteLink] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);

  // ===== НОВЫЕ СОСТОЯНИЯ ДЛЯ ДРУЗЕЙ =====
  const [friends, setFriends] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [showFriendRequestsModal, setShowFriendRequestsModal] = useState(false);
  const [searchFriendsQuery, setSearchFriendsQuery] = useState('');

  // 1.8 Тестировщик
  const [testerInviteCode, setTesterInviteCode] = useState('');
  const [showTesterInviteModal, setShowTesterInviteModal] = useState(false);
  const [isTester, setIsTester] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [testTheme, setTestTheme] = useState(false);
  const [testChatMode, setTestChatMode] = useState(false);
  const [testSpeedMode, setTestSpeedMode] = useState(false);
  const [experimentValue, setExperimentValue] = useState(0);
  const [showTestNotification, setShowTestNotification] = useState(false);
  const [testNotificationMessage, setTestNotificationMessage] = useState('');

  // 1.9 Статистика тестировщика
  const [experimentsCount, setExperimentsCount] = useState(0);
  const [testedFeatures, setTestedFeatures] = useState<string[]>([]);
  const [bugsFound, setBugsFound] = useState(0);
  const [testTime, setTestTime] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showTesterStats, setShowTesterStats] = useState(false);
  const [testerLevel, setTesterLevel] = useState(1);

  // 1.10 Настройки темы
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [themeStyle, setThemeStyle] = useState<'gradient' | 'solid' | 'minimal'>('gradient');
  const [themeBlur, setThemeBlur] = useState(true);
  const [themeAnimations, setThemeAnimations] = useState(true);
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  // 1.11 Редактирование профиля
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editWebsite, setEditWebsite] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editBirthday, setEditBirthday] = useState('');
  const [editGender, setEditGender] = useState('');
  const [showBirthday, setShowBirthday] = useState(true);

  // 1.12 Аватар
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarLikes, setAvatarLikes] = useState(0);
  const [avatarComments, setAvatarComments] = useState(0);
  const [avatarViews, setAvatarViews] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // 1.13 Система уровней
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [nextLevelXP, setNextLevelXP] = useState(100);
  const [levelAchievements, setLevelAchievements] = useState<string[]>([]);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [lastAction, setLastAction] = useState('');

  // 1.14 Панель управления
  const [viewMode, setViewMode] = useState<'developer' | 'admin' | 'moderator' | 'helper'>('developer');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  // ===== СОСТОЯНИЯ ДЛЯ ЛОГОВ =====
  const [moderatorLogs, setModeratorLogs] = useState<any[]>([]);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [logsFilter, setLogsFilter] = useState('all');

  // ===== СОСТОЯНИЯ ДЛЯ ХЕЛПЕРА =====
  const [supportChats, setSupportChats] = useState<any[]>([]);
  const [selectedSupportChat, setSelectedSupportChat] = useState<any>(null);
  const [supportMessages, setSupportMessages] = useState<any[]>([]);
  const [newSupportMessage, setNewSupportMessage] = useState('');
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqCategories] = useState<any[]>([
    { id: 1, name: 'Аккаунт', icon: '👤' },
    { id: 2, name: 'Чаты', icon: '💬' },
    { id: 3, name: 'Платежи', icon: '💰' },
    { id: 4, name: 'Технические вопросы', icon: '⚙️' },
  ]);
  const [faqItems, setFaqItems] = useState<any[]>([]);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<number | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);

  // ===== СОСТОЯНИЯ ДЛЯ МОДЕРАТОРА =====
  const [complaints, setComplaints] = useState<any[]>([]);
  const [moderationQueue, setModerationQueue] = useState<any[]>([]);
  const [showComplaintsModal, setShowComplaintsModal] = useState(false);

  // ===== СОСТОЯНИЯ ДЛЯ АДМИНИСТРАТОРА =====
  const [extendedStats, setExtendedStats] = useState<any>({});
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [showStatsModal, setShowStatsModal] = useState(false);

  // ===== СОСТОЯНИЯ ДЛЯ РАЗРАБОТЧИКА =====
  const [systemLogs, setSystemLogs] = useState<any[]>([]);
  const [performanceStats, setPerformanceStats] = useState<any>({});
  const [showSystemModal, setShowSystemModal] = useState(false);

  // ===== ОНЛАЙН-СТАТУС =====
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [lastActivity, setLastActivity] = useState<Record<string, number>>({});

  // ===== ИНДИКАТОР "ПЕЧАТАЕТ..." =====
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // ==================== 2. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

  const calculateLevel = (xp: number) => {
    let level = 1;
    let requiredXP = 100;
    while (xp >= requiredXP) {
      level++;
      requiredXP += 100;
    }
    return {
      level,
      nextXP: requiredXP,
      currentXP: xp,
      progress: ((xp - (requiredXP - 100)) / 100) * 100
    };
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'только что';
    if (diffMins < 60) return `${diffMins} мин`;
    if (diffHours < 24) return `${diffHours} ч`;
    if (diffDays === 1) return 'вчера';
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  // ==================== 3. ФУНКЦИИ XP ====================

  const addXP = (amount: number, action: string) => {
    setUserXP(prev => prev + amount);
    setLastAction(`+${amount} XP: ${action}`);
    setTimeout(() => setLastAction(''), 3000);
  };

  // ==================== 4. ФУНКЦИИ АВТОРИЗАЦИИ ====================

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    setUserName(user.name || '');
    setUserBio(user.bio || '');
    addXP(50, 'Регистрация');
    const updatedSavedUsers = [...savedUsers.filter((u: any) => u.id !== user.id), user];
    setSavedUsers(updatedSavedUsers);
    localStorage.setItem('saved_accounts', JSON.stringify(updatedSavedUsers));
  };

  const handleLogout = () => {
    // Сохраняем настройки перед выходом
    const settings = {
      themeColor,
      themeMode,
      themeStyle,
      themeBlur,
      themeAnimations,
      isTester: currentUser?.isTester || false,
      testerSince: currentUser?.testerSince,
      experimentsCount,
      testedFeatures,
      bugsFound,
      testTime,
      achievements,
      testerLevel
    };

    // Сохраняем настройки отдельно от пользователя
    localStorage.setItem('app_settings', JSON.stringify(settings));

    // Удаляем только пользователя
    localStorage.removeItem('current_user');

    // Очищаем состояния
    setCurrentUser(null);
    setUserName('');
    setUserBio('');
    setActiveTab('profile');
    setShowLogoutModal(false);
  };

  const handleSwitchAccount = () => {
    setShowLogoutModal(false);
    setShowAccountPicker(true);
  };

  const handleSelectAccount = (user: any) => {
    setCurrentUser(user);
    setUserName(user.name || '');
    setUserBio(user.bio || '');
    setShowAccountPicker(false);
    localStorage.setItem('current_user', JSON.stringify(user));
  };

  const handleAddAccount = () => {
    setShowAccountPicker(false);
    setCurrentUser(null);
  };

  const handleRemoveAccount = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedSavedUsers = savedUsers.filter((u: any) => u.id !== userId);
    setSavedUsers(updatedSavedUsers);
    localStorage.setItem('saved_accounts', JSON.stringify(updatedSavedUsers));
  };

  // ==================== 5. ФУНКЦИИ ЧАТОВ ====================

  const loadChats = async () => {
    if (!currentUser) return;
    try {
      const response = await fetch(`/api/chats?userId=${currentUser.id}`);
      const data = await response.json();
      if (data.success) setChats(data.chats);
    } catch (error) {
      console.error('Ошибка загрузки чатов:', error);
    }
  };

  const loadMessages = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chats/${chatId}/messages`);
      const data = await response.json();
      if (data.success) setMessages(data.messages);
    } catch (error) {
      console.error('Ошибка загрузки сообщений:', error);
    }
  };

  const searchUsers = async () => {
    if (!searchUserQuery.trim() || !currentUser) return;
    try {
      const response = await fetch('/data/users.json');
      const data = await response.json();
      const usersArray = Object.values(data);
      const filtered = usersArray.filter((user: any) =>
        user.id !== currentUser?.id &&
        (user.nickname?.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
          user.name?.toLowerCase().includes(searchUserQuery.toLowerCase()))
      );
      setFoundUsers(filtered.slice(0, 5));
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
      setFoundUsers([]);
    }
  };

  const createNewChat = async (participantId: string, participantName: string) => {
    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participants: [participantId],
          name: participantName,
          currentUserId: currentUser?.id
        })
      });
      const data = await response.json();
      if (data.success) {
        await loadChats();
        setShowNewChatModal(false);
        setSearchUserQuery('');
        setFoundUsers([]);
        setSelectedChat(data.chat);
      }
    } catch (error) {
      console.error('Ошибка создания чата:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessageText.trim() || !selectedChat || !currentUser) return;

    stopTyping();

    try {
      const response = await fetch(`/api/chats/${selectedChat.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newMessageText,
          userId: currentUser.id,
          userName: userName || currentUser.name
        })
      });
      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, data.message]);
        setNewMessageText('');
        loadChats();
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
    }
  };

  // ==================== 6. ФУНКЦИИ ГРУППОВЫХ ЧАТОВ ====================

  const createGroupChat = async () => {
    if (selectedUsers.length < 2) {
      alert('Выберите минимум 2 участника для группы');
      return;
    }
    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participants: [currentUser?.id, ...selectedUsers.map(u => u.id)],
          name: groupName || `Группа ${selectedUsers.length + 1} участников`,
          currentUserId: currentUser?.id,
          isGroup: true
        })
      });
      const data = await response.json();
      if (data.success) {
        await loadChats();
        setShowCreateGroupModal(false);
        setSelectedUsers([]);
        setGroupName('');
        setSelectedChat(data.chat);
      }
    } catch (error) {
      console.error('Ошибка создания группы:', error);
    }
  };

  const removeSelectedUser = (userId: string) => {
    setSelectedUsers(prev => prev.filter(u => u.id !== userId));
  };

  const loadGroupParticipants = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chats/${chatId}/participants`);
      const data = await response.json();
      if (data.success) setGroupParticipants(data.participants);
    } catch (error) {
      console.error('Ошибка загрузки участников:', error);
    }
  };

  const addParticipantsToGroup = async (newParticipantIds: string[]) => {
    if (!selectedChat) return;
    try {
      const response = await fetch(`/api/chats/${selectedChat.id}/participants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participantIds: newParticipantIds })
      });
      const data = await response.json();
      if (data.success) {
        await loadGroupParticipants(selectedChat.id);
        setShowAddParticipantsModal(false);
        setSelectedUsers([]);
        await loadChats();
      }
    } catch (error) {
      console.error('Ошибка добавления участников:', error);
    }
  };

  const leaveGroup = async () => {
    if (!selectedChat || !selectedChat.isGroup) return;
    try {
      const response = await fetch(`/api/chats/${selectedChat.id}/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser?.id })
      });
      const data = await response.json();
      if (data.success) {
        setSelectedChat(null);
        await loadChats();
      }
    } catch (error) {
      console.error('Ошибка выхода из группы:', error);
    }
  };

  // ==================== 7. ФУНКЦИИ ПЕРЕТАСКИВАНИЯ ====================

  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDrag = (e: MouseEvent) => {
    if (!isDragging) return;
    const container = document.querySelector('.chats-container');
    if (!container) return;
    const containerWidth = container.clientWidth;
    const mouseX = e.clientX;
    const containerLeft = container.getBoundingClientRect().left;
    let newWidth = ((mouseX - containerLeft) / containerWidth) * 100;
    newWidth = Math.max(20, Math.min(50, newWidth));
    setLeftColumnWidth(newWidth);
  };

  const stopDragging = () => setIsDragging(false);

  // ==================== 8. ФУНКЦИИ ПРОФИЛЯ ====================

  const handleSaveProfile = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, name: userName, bio: userBio };
      setCurrentUser(updatedUser);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
      alert('Профиль сохранён!');
    }
  };

  const handleSaveEditedProfile = async () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        name: editName,
        bio: editBio,
        website: editWebsite,
        location: editLocation,
        birthday: editBirthday,
        gender: editGender,
        settings: { ...currentUser.settings, showBirthday }
      };
      setCurrentUser(updatedUser);
      setUserName(editName);
      setUserBio(editBio);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
      setShowEditProfile(false);
      alert('Профиль обновлён!');
    }
  };

  // ==================== 9. ФУНКЦИИ АВАТАРА ====================

  const handleAvatarUpload = async (file: File) => {
    if (!currentUser) return;
    setIsUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('userId', currentUser.id);
      const response = await fetch('/api/upload/avatar', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) {
        addXP(25, 'Загрузка аватара');
        const updatedUser = { ...currentUser, avatar: data.avatarUrl };
        setCurrentUser(updatedUser);
        localStorage.setItem('current_user', JSON.stringify(updatedUser));
        const updatedSavedUsers = savedUsers.map(u => u.id === currentUser.id ? updatedUser : u);
        setSavedUsers(updatedSavedUsers);
        localStorage.setItem('saved_accounts', JSON.stringify(updatedSavedUsers));
      } else alert('Ошибка загрузки: ' + data.error);
    } catch (error) {
      console.error('Ошибка загрузки аватара:', error);
      alert('Не удалось загрузить аватар');
    } finally {
      setIsUploadingAvatar(false);
      setShowAvatarMenu(false);
      setAvatarPreview(null);
    }
  };

  const handleAvatarDelete = async () => {
    if (!currentUser?.avatar) return;
    try {
      const response = await fetch(
        `/api/upload/avatar?userId=${currentUser.id}&avatarUrl=${encodeURIComponent(currentUser.avatar)}`,
        { method: 'DELETE' }
      );
      const data = await response.json();
      if (data.success) {
        const updatedUser = { ...currentUser, avatar: null };
        setCurrentUser(updatedUser);
        localStorage.setItem('current_user', JSON.stringify(updatedUser));
        const updatedSavedUsers = savedUsers.map(u => u.id === currentUser.id ? updatedUser : u);
        setSavedUsers(updatedSavedUsers);
        localStorage.setItem('saved_accounts', JSON.stringify(updatedSavedUsers));
      }
    } catch (error) {
      console.error('Ошибка удаления аватара:', error);
      alert('Не удалось удалить аватар');
    } finally {
      setShowAvatarMenu(false);
    }
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой. Максимум 5MB');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setAvatarPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    handleAvatarUpload(file);
  };

  // ==================== 10. ФУНКЦИИ ТЕМЫ ====================

  const handleSaveTheme = async () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        themeColor,
        themeStyle,
        themeBlur,
        themeAnimations
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
      localStorage.setItem('theme', themeMode);
      // Весь блок try/catch с fetch удалён
    }
  };

  // ==================== 11. ФУНКЦИИ АДМИНКИ ====================

  const loadAllUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (data.success) {
        const usersArray = Object.values(data.users);
        setAllUsers(usersArray);
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  };

  // ==================== 12. ФУНКЦИИ ТЕСТИРОВЩИКА ====================

  const activateTester = (code: string) => {
    const validCodes = ['TEST123', 'BETA2024', 'DEBUGGER', 'TESTER123', 'ALPHA2024'];
    if (validCodes.includes(code.toUpperCase())) {
      const updatedUser = { ...currentUser, isTester: true, testerSince: Date.now() };
      setCurrentUser(updatedUser);
      setIsTester(true);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
      const testers = JSON.parse(localStorage.getItem('testers') || '[]');
      if (!testers.includes(currentUser?.id)) {
        testers.push(currentUser?.id);
        localStorage.setItem('testers', JSON.stringify(testers));
      }
      setShowTesterInviteModal(false);
      setShowWelcomeModal(true);
      alert('🎉 Поздравляем! Теперь вы тестировщик!');
      alert(`✅ Ваша роль: ${updatedUser.role} (сохранена)`);
      addXP(100, 'Стал тестировщиком');
    } else {
      alert('❌ Неверный код приглашения');
    }
  };

  const generateTesterInvite = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    const invites = JSON.parse(localStorage.getItem('tester_invites') || '[]');
    invites.push({ code, createdBy: currentUser?.id, createdAt: Date.now(), used: false });
    localStorage.setItem('tester_invites', JSON.stringify(invites));
    return code;
  };

  const showTestNotificationMessage = (message: string) => {
    setTestNotificationMessage(message);
    setShowTestNotification(true);
    setTimeout(() => setShowTestNotification(false), 3000);
  };

  const toggleTestTheme = () => {
    setTestTheme(!testTheme);
    if (!testTheme) {
      showTestNotificationMessage('🎨 Тестовая тема активирована!');
      addXP(5, 'Тестирование темы');
    } else {
      showTestNotificationMessage('🎨 Обычная тема восстановлена');
    }
  };

  const toggleTestChatMode = () => {
    setTestChatMode(!testChatMode);
    if (!testChatMode) {
      showTestNotificationMessage('💬 Тестовый режим чата активирован!');
      addXP(5, 'Тестирование чата');
    } else {
      showTestNotificationMessage('💬 Обычный режим чата восстановлен');
    }
  };

  const toggleSpeedMode = () => {
    setTestSpeedMode(!testSpeedMode);
    if (!testSpeedMode) {
      showTestNotificationMessage('🚀 Турбо-режим активирован!');
      addXP(5, 'Тестирование скорости');
    } else {
      showTestNotificationMessage('🚀 Обычная скорость восстановлена');
    }
  };

  const runExperiment = () => {
    const newValue = Math.floor(Math.random() * 100);
    setExperimentValue(newValue);
    const experiments = [
      '🧪 Измерение квантовой запутанности',
      '🔬 Анализ тёмной материи',
      '⚗️ Синтез нового элемента',
      '📊 Вычисление числа Пи',
      '🎮 Загрузка мини-игры'
    ];
    const randomExp = experiments[Math.floor(Math.random() * experiments.length)];
    showTestNotificationMessage(`${randomExp}: ${newValue}%`);
    addXP(10, 'Участие в эксперименте');
  };

  // ==================== 13. ФУНКЦИИ СТАТИСТИКИ ТЕСТИРОВЩИКА ====================

  const trackExperiment = () => {
    setExperimentsCount(prev => prev + 1);
    if (experimentsCount + 1 === 10) unlockAchievement('🔬 Маленький учёный');
    else if (experimentsCount + 1 === 50) unlockAchievement('🧪 Профессор');
    else if (experimentsCount + 1 === 100) unlockAchievement('⚗️ Безумный учёный');
  };

  const trackFeatureTest = (feature: string) => {
    if (!testedFeatures.includes(feature)) {
      setTestedFeatures(prev => [...prev, feature]);
      if (testedFeatures.length + 1 === 5) unlockAchievement('🎯 Тестировщик');
    }
  };

  const trackBug = () => {
    setBugsFound(prev => prev + 1);
    if (bugsFound + 1 === 5) unlockAchievement('🐛 Охотник на багов');
    else if (bugsFound + 1 === 20) unlockAchievement('🕷️ Дебаггер');
  };

  const unlockAchievement = (name: string) => {
    if (!achievements.includes(name)) {
      setAchievements(prev => [...prev, name]);
      showTestNotificationMessage(`🏆 Достижение: ${name}!`);
      addXP(50, `Достижение: ${name}`);
    }
  };

  const toggleTestThemeWithTracking = () => {
    toggleTestTheme();
    trackFeatureTest('Новая тема');
    if (!testTheme) trackExperiment();
  };

  const toggleTestChatModeWithTracking = () => {
    toggleTestChatMode();
    trackFeatureTest('Тестовый чат');
    if (!testChatMode) trackExperiment();
  };

  const toggleSpeedModeWithTracking = () => {
    toggleSpeedMode();
    trackFeatureTest('Турбо-режим');
    if (!testSpeedMode) trackExperiment();
  };

  const runExperimentWithTracking = () => {
    runExperiment();
    trackExperiment();
    if (Math.random() > 0.7) trackBug();
  };

  // ==================== 14. ФУНКЦИИ ЗАГРУЗКИ ПО РОЛЯМ ====================

  const loadSupportChats = () => {
    const mockChats = [
      { id: '1', userId: '123', userName: 'Иван Петров', lastMessage: 'Не могу войти в аккаунт', time: '5 мин назад', unread: 2, avatar: '👤' },
      { id: '2', userId: '456', userName: 'Анна Смирнова', lastMessage: 'Как создать группу?', time: '15 мин назад', unread: 0, avatar: '👩' },
      { id: '3', userId: '789', userName: 'Павел Иванов', lastMessage: 'Ошибка при загрузке фото', time: '1 час назад', unread: 1, avatar: '👨' },
    ];
    setSupportChats(mockChats);
  };

  const loadFaqData = () => {
    const mockFaq = [
      { id: 1, question: 'Как сменить пароль?', answer: 'Зайдите в настройки профиля → Безопасность → Изменить пароль', category: 1 },
      { id: 2, question: 'Не приходит код подтверждения', answer: 'Проверьте папку спам или запросите код повторно через 60 секунд', category: 1 },
      { id: 3, question: 'Как создать групповой чат?', answer: 'Перейдите в чаты → нажмите на зелёную иконку группы → выберите участников', category: 2 },
      { id: 4, question: 'Как добавить участника в группу?', answer: 'Откройте группу → нажмите на название → Добавить участников', category: 2 },
      { id: 5, question: 'Как привязать карту?', answer: 'Эта функция появится в следующем обновлении', category: 3 },
    ];
    setFaqItems(mockFaq);
  };

  const loadTemplates = () => {
    const mockTemplates = [
      { id: 1, title: 'Приветствие', text: 'Здравствуйте! Чем я могу вам помочь?', category: 'Общее' },
      { id: 2, title: 'Техническая поддержка', text: 'Опишите проблему подробнее, и мы постараемся решить её как можно скорее.', category: 'Техника' },
      { id: 3, title: 'Благодарность', text: 'Спасибо за обращение! Если возникнут другие вопросы, обращайтесь.', category: 'Общее' },
    ];
    setTemplates(mockTemplates);
  };

  const loadComplaints = () => {
    const mockComplaints = [
      { id: '1', fromUser: 'Анна Смирнова', fromUserId: '456', targetUser: 'Пользователь123', reason: 'Оскорбления', time: '10 мин назад', status: 'new' },
      { id: '2', fromUser: 'Иван Петров', fromUserId: '123', targetUser: 'Максим Ли', reason: 'Спам', time: '25 мин назад', status: 'new' },
    ];
    setComplaints(mockComplaints);
  };

  const loadModerationQueue = () => {
    const mockQueue = [
      { id: '1', type: 'Пост', content: 'Рекламный пост', author: 'Пользователь123', time: '5 мин назад' },
      { id: '2', type: 'Комментарий', content: 'Грубый комментарий', author: 'Аноним', time: '15 мин назад' },
    ];
    setModerationQueue(mockQueue);
  };

  const loadExtendedStats = () => {
    const mockStats = {
      totalUsers: 1247,
      activeToday: 342,
      newToday: 28,
      totalChats: 5678,
      totalMessages: 45231,
      averageSessionTime: '14 мин',
    };
    setExtendedStats(mockStats);
  };

  const loadActivityLogs = () => {
    const mockLogs = [
      { id: '1', user: 'Админ1', action: 'Изменил роль пользователя', target: 'user123', time: '5 мин назад' },
      { id: '2', user: 'Модератор2', action: 'Заблокировал пользователя', target: 'user456', time: '15 мин назад' },
    ];
    setActivityLogs(mockLogs);
  };

  const loadSystemLogs = () => {
    const mockSystemLogs = [
      { id: '1', type: 'API', message: 'GET /api/users - 200 OK', time: '2 мин назад' },
      { id: '2', type: 'Database', message: 'Query executed - 150ms', time: '3 мин назад' },
    ];
    setSystemLogs(mockSystemLogs);
  };

  const loadPerformanceStats = () => {
    const mockPerformance = {
      averageResponseTime: '120ms',
      serverLoad: '42%',
      memoryUsage: '1.2GB',
      activeConnections: 156,
    };
    setPerformanceStats(mockPerformance);
  };

  // ==================== 15. ФУНКЦИИ ДЛЯ ЛОГИРОВАНИЯ ====================

  const addModeratorLog = (action: string, targetId?: string, details?: string) => {
    if (!currentUser) return;
    const newLog = {
      id: Date.now().toString(),
      moderatorId: currentUser.id,
      moderatorName: currentUser.name || currentUser.nickname,
      moderatorRole: currentUser.role,
      action,
      targetId,
      details,
      timestamp: Date.now(),
      ip: 'Локальный'
    };
    const updatedLogs = [newLog, ...moderatorLogs];
    setModeratorLogs(updatedLogs);
    localStorage.setItem('moderator_logs', JSON.stringify(updatedLogs));
  };

  const loadModeratorLogs = () => {
    const saved = localStorage.getItem('moderator_logs');
    if (saved) {
      setModeratorLogs(JSON.parse(saved));
    }
  };

  const clearModeratorLogs = () => {
    if (currentUser?.role === 'developer' && confirm('Очистить все логи?')) {
      setModeratorLogs([]);
      localStorage.removeItem('moderator_logs');
      addModeratorLog('Очистил логи модераторов');
    }
  };

  // ==================== 16. ФУНКЦИИ УВЕДОМЛЕНИЙ ====================

  const loadNotifications = () => {
    if (!currentUser) return;
    const saved = localStorage.getItem(`notifications_${currentUser.id}`);
    if (saved) {
      const notifs = JSON.parse(saved);
      setNotifications(notifs);
      setUnreadCount(notifs.filter((n: any) => !n.read).length);
    } else {
      const mockNotifications = [
        {
          id: '1',
          type: 'message',
          title: 'Новое сообщение',
          text: 'Иван Петров: Привет! Как дела?',
          time: Date.now() - 1000 * 60 * 5,
          read: false,
          link: '/chat/123',
          icon: '💬'
        },
        {
          id: '2',
          type: 'friend',
          title: 'Заявка в друзья',
          text: 'Анна Смирнова хочет добавить вас в друзья',
          time: Date.now() - 1000 * 60 * 30,
          read: false,
          link: '/friends',
          icon: '👥'
        }
      ];
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter((n: any) => !n.read).length);
      localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify(mockNotifications));
    }
  };

  const addNotification = (type: string, title: string, text: string, link: string = '') => {
    if (!currentUser) return;
    const newNotification = {
      id: Date.now().toString(),
      type,
      title,
      text,
      time: Date.now(),
      read: false,
      link,
      icon: type === 'message' ? '💬' : type === 'friend' ? '👥' : type === 'like' ? '❤️' : '🔔'
    };
    const updated = [newNotification, ...notifications];
    setNotifications(updated);
    setUnreadCount(prev => prev + 1);
    localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify(updated));
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    if (currentUser) {
      localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify(updated));
    }
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
    if (currentUser) {
      localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify(updated));
    }
  };

  const clearAllNotifications = () => {
    if (confirm('Очистить все уведомления?')) {
      setNotifications([]);
      setUnreadCount(0);
      if (currentUser) {
        localStorage.removeItem(`notifications_${currentUser.id}`);
      }
    }
  };

  const formatNotificationTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    if (days < 7) return `${days} д назад`;
    return new Date(timestamp).toLocaleDateString('ru-RU');
  };

  // ==================== 17. ФУНКЦИИ ДЛЯ МЕДИА В ЧАТАХ ====================

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('Файл слишком большой. Максимум 10MB');
      return;
    }
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
    setShowMediaModal(true);
  };

  const uploadFile = async () => {
    if (!selectedFile || !selectedChat || !currentUser) return;
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    setTimeout(() => {
      const mediaMessage = {
        id: Date.now().toString(),
        chatId: selectedChat.id,
        userId: currentUser.id,
        userName: currentUser.name || currentUser.nickname,
        type: selectedFile.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(selectedFile),
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        timestamp: Date.now(),
        read: false
      };
      setMessages(prev => [...prev, mediaMessage]);
      setShowMediaModal(false);
      setSelectedFile(null);
      setImagePreview(null);
      setUploadProgress(0);
      clearInterval(interval);
    }, 2000);
  };

  const cancelUpload = () => {
    setShowMediaModal(false);
    setSelectedFile(null);
    setImagePreview(null);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // ==================== 18. ФУНКЦИИ ДЛЯ ОНЛАЙН-СТАТУСА ====================

  const updateOnlineStatus = () => {
    const now = Date.now();
    const online: string[] = [];

    const allParticipants = new Set<string>();

    chats.forEach(chat => {
      chat.participants.forEach((id: string) => {
        if (id !== currentUser?.id) {
          allParticipants.add(id);
        }
      });
    });

    allParticipants.forEach(userId => {
      const lastActive = lastActivity[userId] || 0;
      if (now - lastActive < 5 * 60 * 1000) {
        online.push(userId);
      }
    });

    setOnlineUsers(online);
  };

  const updateMyActivity = () => {
    if (!currentUser) return;

    setLastActivity(prev => ({
      ...prev,
      [currentUser.id]: Date.now()
    }));

    localStorage.setItem(`last_active_${currentUser.id}`, Date.now().toString());
  };

  const loadLastActivity = () => {
    const allParticipants = new Set<string>();

    chats.forEach(chat => {
      chat.participants.forEach((id: string) => {
        if (id !== currentUser?.id) {
          allParticipants.add(id);
        }
      });
    });

    const activity: Record<string, number> = {};

    allParticipants.forEach(userId => {
      const saved = localStorage.getItem(`last_active_${userId}`);
      if (saved) {
        activity[userId] = parseInt(saved);
      }
    });

    setLastActivity(activity);
  };

  const formatLastSeen = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    if (days < 7) return `${days} д назад`;

    return new Date(timestamp).toLocaleDateString('ru-RU');
  };

  // ==================== 19. ФУНКЦИИ ДЛЯ ИНДИКАТОРА "ПЕЧАТАЕТ..." ====================

  const startTyping = () => {
    if (!selectedChat || !currentUser) return;

    setTypingUsers(prev => ({
      ...prev,
      [selectedChat.id]: true
    }));

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      stopTyping();
    }, 3000);

    setTypingTimeout(timeout);
  };

  const stopTyping = () => {
    if (!selectedChat || !currentUser) return;

    setTypingUsers(prev => ({
      ...prev,
      [selectedChat.id]: false
    }));

    if (typingTimeout) {
      clearTimeout(typingTimeout);
      setTypingTimeout(null);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageText(e.target.value);
    startTyping();
  };

  // ==================== 24. ФУНКЦИИ ДЛЯ ЛЕНТЫ НОВОСТЕЙ ====================

  // Загрузка постов
  const loadPosts = () => {
    if (!currentUser) return;

    const saved = localStorage.getItem(`posts_${currentUser.id}`);
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      // Демо-посты для теста
      const mockPosts = [
        {
          id: '1',
          userId: currentUser.id,
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
          content: 'Привет всем! Это мой первый пост в Linker Pro! 🚀',
          image: null,
          likes: [],
          comments: [],
          createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 часа назад
        },
        {
          id: '2',
          userId: 'user_1',
          userName: 'Анна Смирнова',
          userAvatar: null,
          content: 'Отличное приложение! 👏',
          image: null,
          likes: [],
          comments: [],
          createdAt: Date.now() - 1000 * 60 * 60 * 5, // 5 часов назад
        }
      ];
      setPosts(mockPosts);
      localStorage.setItem(`posts_${currentUser.id}`, JSON.stringify(mockPosts));
    }
  };

  // Создание поста
  const createPost = () => {
    if (!newPostText.trim() && !newPostImage) return;

    const newPost = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: newPostText,
      image: newPostImage,
      likes: [],
      comments: [],
      createdAt: Date.now()
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem(`posts_${currentUser.id}`, JSON.stringify(updatedPosts));

    setShowCreatePostModal(false);
    setNewPostText('');
    setNewPostImage(null);

    addXP(10, 'Создание поста');
  };

  // Добавить изображение к посту
  const handlePostImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой. Максимум 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setNewPostImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Лайк поста
  const likePost = (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(currentUser.id);
        return {
          ...post,
          likes: hasLiked
            ? post.likes.filter((id: string) => id !== currentUser.id)
            : [...post.likes, currentUser.id]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem(`posts_${currentUser.id}`, JSON.stringify(updatedPosts));
  };

  // Добавить комментарий
  const addComment = (postId: string) => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      text: newComment,
      createdAt: Date.now()
    };

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), newCommentObj]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem(`posts_${currentUser.id}`, JSON.stringify(updatedPosts));
    setNewComment('');
  };

  // Форматирование времени для постов
  const formatPostTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    if (days < 7) return `${days} д назад`;

    return new Date(timestamp).toLocaleDateString('ru-RU');
  };

  // ==================== 25. ФУНКЦИИ ДЛЯ ДРУЗЕЙ ====================

  // Загрузка друзей
  const loadFriends = () => {
    if (!currentUser) return;

    const saved = localStorage.getItem(`friends_${currentUser.id}`);
    if (saved) {
      setFriends(JSON.parse(saved));
    } else {
      setFriends([]);
    }
  };

  // Загрузка заявок
  const loadFriendRequests = () => {
    if (!currentUser) return;

    const saved = localStorage.getItem(`friend_requests_${currentUser.id}`);
    if (saved) {
      setFriendRequests(JSON.parse(saved));
    } else {
      setFriendRequests([]);
    }
  };

  // Отправить заявку в друзья
  const sendFriendRequest = (userId: string, userName: string) => {
    if (!currentUser) return;

    const newRequest = {
      id: Date.now().toString(),
      fromUserId: currentUser.id,
      fromUserName: currentUser.name,
      fromUserNickname: currentUser.nickname,
      toUserId: userId,
      toUserName: userName,
      status: 'pending',
      createdAt: Date.now()
    };

    // Сохраняем заявку у получателя
    const recipientRequests = JSON.parse(localStorage.getItem(`friend_requests_${userId}`) || '[]');
    recipientRequests.push(newRequest);
    localStorage.setItem(`friend_requests_${userId}`, JSON.stringify(recipientRequests));

    alert('Заявка отправлена!');
    addXP(5, 'Отправка заявки в друзья');
  };

  // Принять заявку
  const acceptFriendRequest = (requestId: string, fromUserId: string, fromUserName: string) => {
    if (!currentUser) return;

    // Удаляем заявку
    const updatedRequests = friendRequests.filter(r => r.id !== requestId);
    setFriendRequests(updatedRequests);
    localStorage.setItem(`friend_requests_${currentUser.id}`, JSON.stringify(updatedRequests));

    // Добавляем в друзья
    const newFriend = {
      id: fromUserId,
      name: fromUserName,
      addedAt: Date.now()
    };

    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    localStorage.setItem(`friends_${currentUser.id}`, JSON.stringify(updatedFriends));

    // Также добавляем текущего пользователя в друзья к отправителю
    const senderFriends = JSON.parse(localStorage.getItem(`friends_${fromUserId}`) || '[]');
    senderFriends.push({
      id: currentUser.id,
      name: currentUser.name,
      addedAt: Date.now()
    });
    localStorage.setItem(`friends_${fromUserId}`, JSON.stringify(senderFriends));

    addXP(10, 'Принятие заявки в друзья');
  };

  // Отклонить заявку
  const rejectFriendRequest = (requestId: string) => {
    if (!currentUser) return;

    const updatedRequests = friendRequests.filter(r => r.id !== requestId);
    setFriendRequests(updatedRequests);
    localStorage.setItem(`friend_requests_${currentUser.id}`, JSON.stringify(updatedRequests));
  };

  // Удалить из друзей
  const removeFriend = (friendId: string) => {
    if (!currentUser) return;

    const updatedFriends = friends.filter(f => f.id !== friendId);
    setFriends(updatedFriends);
    localStorage.setItem(`friends_${currentUser.id}`, JSON.stringify(updatedFriends));

    // Удаляем из друзей у другой стороны
    const otherFriends = JSON.parse(localStorage.getItem(`friends_${friendId}`) || '[]');
    const updatedOtherFriends = otherFriends.filter((f: any) => f.id !== currentUser.id);
    localStorage.setItem(`friends_${friendId}`, JSON.stringify(updatedOtherFriends));

    addXP(5, 'Удаление из друзей');
  };

  // ==================== 20. useEffect ====================
  
  // 2.1 Загрузка данных
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Сначала загружаем сохранённые настройки (тема, тестировщик)
      const savedSettings = localStorage.getItem('app_settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setThemeColor(settings.themeColor || '#3b82f6');
        setThemeMode(settings.themeMode || 'dark');
        setThemeStyle(settings.themeStyle || 'gradient');
        setThemeBlur(settings.themeBlur !== false);
        setThemeAnimations(settings.themeAnimations !== false);
        setIsTester(settings.isTester || false);
        setExperimentsCount(settings.experimentsCount || 0);
        setTestedFeatures(settings.testedFeatures || []);
        setBugsFound(settings.bugsFound || 0);
        setTestTime(settings.testTime || 0);
        setAchievements(settings.achievements || []);
        setTesterLevel(settings.testerLevel || 1);
      }

      // Потом загружаем пользователя
      const savedUser = localStorage.getItem('current_user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setUserName(user.name || '');
        setUserBio(user.bio || '');

        // Настройки пользователя (если есть) имеют приоритет
        if (user.themeColor) setThemeColor(user.themeColor);
        if (user.themeStyle) setThemeStyle(user.themeStyle);
        if (user.themeBlur !== undefined) setThemeBlur(user.themeBlur);
        if (user.themeAnimations !== undefined) setThemeAnimations(user.themeAnimations);
        if (user.isTester !== undefined) setIsTester(user.isTester);

        loadNotifications();
        loadPosts();
        loadFriends();
        loadFriendRequests();
      }

      // Загружаем тему из отдельного хранилища
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setThemeMode(savedTheme as 'dark' | 'light');
      }

      // Загружаем сохранённые аккаунты
      const saved = localStorage.getItem('saved_accounts');
      if (saved) {
        setSavedUsers(JSON.parse(saved));
      }

      setIsLoading(false);
    }
  }, []);

  // 2.2 Сохранение пользователя
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('current_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // 2.3 Расчет уровня
  useEffect(() => {
    const levelInfo = calculateLevel(userXP);
    setUserLevel(levelInfo.level);
    setNextLevelXP(levelInfo.nextXP);
    if (levelInfo.level > userLevel) {
      setShowLevelUpModal(true);
      setLevelAchievements(prev => [...prev, `Достигнут ${levelInfo.level} уровень!`]);
    }
  }, [userXP]);

  // 2.4 Загрузка чатов
  useEffect(() => {
    if (currentUser) {
      loadChats();
    }
  }, [currentUser]);

  // 2.5 Загрузка сообщений
  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat.id);
    }
  }, [selectedChat]);

  // 2.6 Перетаскивание колонок
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDragging);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging]);

  // 2.7 Таймер тестировщика
  useEffect(() => {
    if (currentUser?.isTester) {
      const interval = setInterval(() => {
        setTestTime(prev => prev + 1);
        if (testTime + 1 === 60) {
          unlockAchievement('⏱️ Час тестирования');
        } else if (testTime + 1 === 600) {
          unlockAchievement('📅 День тестирования');
        }
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [currentUser?.isTester, testTime]);

  // 2.8 Тестовые стили
  useEffect(() => {
    if (testTheme) {
      const style = document.createElement('style');
      style.id = 'test-theme-style';
      style.innerHTML = `
        .bg-gradient-to-r.from-blue-600.to-purple-600 {
          background: linear-gradient(135deg, #ff00ff, #00ffff) !important;
        }
        button:hover {
          transform: scale(1.05) !important;
          transition: all 0.3s ease !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      const existingStyle = document.getElementById('test-theme-style');
      if (existingStyle) existingStyle.remove();
    }
  }, [testTheme]);

  useEffect(() => {
    if (testSpeedMode) {
      const style = document.createElement('style');
      style.id = 'test-speed-style';
      style.innerHTML = `
        * {
          transition-duration: 0.1s !important;
          animation-duration: 0.1s !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      const existingStyle = document.getElementById('test-speed-style');
      if (existingStyle) existingStyle.remove();
    }
  }, [testSpeedMode]);

  // 2.9 Загрузка данных для хелпера
  useEffect(() => {
    if (currentUser?.role === 'helper' || currentUser?.role === 'moderator' || currentUser?.role === 'admin' || currentUser?.role === 'developer') {
      loadSupportChats();
      loadFaqData();
      loadTemplates();
    }
  }, [currentUser?.role]);

  // 2.10 Загрузка данных для модератора
  useEffect(() => {
    if (currentUser?.role === 'moderator' || currentUser?.role === 'admin' || currentUser?.role === 'developer') {
      loadComplaints();
      loadModerationQueue();
    }
  }, [currentUser?.role]);

  // 2.11 Загрузка данных для администратора
  useEffect(() => {
    if (currentUser?.role === 'admin' || currentUser?.role === 'developer') {
      loadExtendedStats();
      loadActivityLogs();
    }
  }, [currentUser?.role]);

  // 2.12 Загрузка данных для разработчика
  useEffect(() => {
    if (currentUser?.role === 'developer') {
      loadSystemLogs();
      loadPerformanceStats();
    }
  }, [currentUser?.role]);

  // 2.13 Применение темы к HTML
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    }
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  // 2.14 Отслеживание активности пользователя
  useEffect(() => {
    if (!currentUser) return;

    updateMyActivity();

    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll'];

    const handleUserActivity = () => {
      updateMyActivity();
    };

    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    const onlineInterval = setInterval(() => {
      updateOnlineStatus();
    }, 30000);

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearInterval(onlineInterval);
    };
  }, [currentUser]);

  // 2.15 Загрузка активности при изменении чатов
  useEffect(() => {
    if (chats.length > 0) {
      loadLastActivity();
      updateOnlineStatus();
    }
  }, [chats]);

  // 2.16 Закрытие меню при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showFileMenu) {
        setShowFileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showFileMenu]);

  // ==================== 21. УСЛОВИЯ ОТОБРАЖЕНИЯ ====================

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: themeColor }}></div>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} themeColor={themeColor} />;
  }

  // ==================== 22. ОСНОВНОЙ JSX ====================

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* HEADER */}
      <header className="h-16 bg-black/80 border-b border-white/5 flex items-center justify-between px-6">
        <h1 className="text-2xl font-black italic tracking-tighter" style={{ color: themeColor }}>
          LINKER
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">@{currentUser?.nickname || 'slava_ivanov'}</span>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors relative"
            >
              <Bell size={20} className="text-zinc-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#111] rounded-xl border border-white/10 shadow-2xl z-50">
                <div className="p-3 border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-medium text-white">Уведомления</h3>
                  {notifications.length > 0 && (
                    <button onClick={markAllAsRead} className="text-xs text-zinc-400 hover:text-white transition-colors">
                      Прочитать все
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center">
                      <Bell size={32} className="mx-auto mb-2 text-zinc-600" />
                      <p className="text-sm text-zinc-500">Нет уведомлений</p>
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer relative ${!notif.read ? 'bg-blue-500/5' : ''}`}
                        onClick={() => {
                          markAsRead(notif.id);
                          if (notif.link) console.log('Переход по ссылке:', notif.link);
                          setShowNotifications(false);
                        }}
                      >
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-lg">
                            {notif.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{notif.title}</p>
                            <p className="text-xs text-zinc-400 line-clamp-2">{notif.text}</p>
                            <p className="text-[10px] text-zinc-600 mt-1">
                              {formatNotificationTime(notif.time)}
                            </p>
                          </div>
                          {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-2 border-t border-white/10">
                    <button onClick={clearAllNotifications} className="w-full py-2 text-xs text-zinc-400 hover:text-red-400 transition-colors">
                      Очистить все
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="p-2 hover:bg-red-500/10 rounded-xl transition-colors group"
            title="Выйти"
          >
            <LogOut size={20} className="text-zinc-400 group-hover:text-red-400" />
          </button>
        </div>
      </header>

      {/* НАВИГАЦИЯ */}
      <nav className="flex gap-2 px-6 py-3 border-b border-white/5 bg-black/40">
        <button onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === 'profile' ? 'text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
          style={{ backgroundColor: activeTab === 'profile' ? themeColor : 'transparent' }}>
          <User size={18} /><span>Профиль</span>
        </button>
        <button onClick={() => setActiveTab('friends')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === 'friends' ? 'text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
          style={{ backgroundColor: activeTab === 'friends' ? themeColor : 'transparent' }}>
          <UserPlus size={18} /><span>Друзья</span>
        </button>
        <button onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === 'chat' ? 'text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
          style={{ backgroundColor: activeTab === 'chat' ? themeColor : 'transparent' }}>
          <MessageSquare size={18} /><span>Чаты</span>
        </button>
        <button onClick={() => setActiveTab('feed')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === 'feed' ? 'text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
          style={{ backgroundColor: activeTab === 'feed' ? themeColor : 'transparent' }}>
          <Heart size={18} /><span>Лента</span>
        </button>
        <button onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === 'settings' ? 'text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
          style={{ backgroundColor: activeTab === 'settings' ? themeColor : 'transparent' }}>
          <Settings size={18} /><span>Настройки</span>
        </button>
        {(currentUser?.role === 'helper' || currentUser?.role === 'moderator' || currentUser?.role === 'admin' || currentUser?.role === 'developer') && (
          <button onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === 'dashboard' ? 'text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
            style={{ backgroundColor: activeTab === 'dashboard' ? themeColor : 'transparent' }}>
            <LayoutDashboard size={18} /><span>Панель</span>
          </button>
        )}
      </nav>

      {/* КОНТЕНТ */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Профиль */}
        {activeTab === 'profile' && (
          <>
            <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl relative overflow-hidden mb-16">
              <div className="absolute inset-0 bg-black/20" />
              <button className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors">
                <Camera size={16} /><span>Изменить обложку</span>
              </button>
            </div>
            <div className="flex items-start gap-6 -mt-24 px-4">
              <div className="relative">
                <div onClick={() => setShowAvatarModal(true)}
                  className="w-28 h-28 rounded-full border-4 border-black shadow-2xl flex items-center justify-center overflow-hidden cursor-pointer group relative">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-4xl">
                        {userName ? userName.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
                {isUploadingAvatar && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 mt-9">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                      {currentUser?.fullName || currentUser?.name || userName || 'Слава Иванов'}
                      {currentUser?.isTester && (
                        <>
                          <span className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-400 border border-purple-500/30">
                            <FlaskConical size={12} /> Tester
                          </span>
                          <button onClick={() => setShowTesterStats(true)}
                            className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 hover:bg-purple-500/20 rounded-full text-xs text-purple-400 transition-colors">
                            <span>📊</span> Lvl {testerLevel}
                          </button>
                        </>
                      )}
                    </h1>
                    <p className="text-zinc-400 text-sm mt-0.5">@{currentUser?.nickname || 'slava_ivanov'}</p>
                  </div>
                  <button onClick={() => { setEditName(userName); setEditBio(userBio); setEditWebsite(currentUser?.website || ''); setEditLocation(currentUser?.location || ''); setEditBirthday(currentUser?.birthday || ''); setEditGender(currentUser?.gender || ''); setShowBirthday(currentUser?.settings?.showBirthday !== false); setShowEditProfile(true); }}
                    className="px-5 py-2 rounded-xl text-sm font-medium transition-colors text-white hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: themeColor }}>
                    Редактировать профиль
                  </button>
                </div>
                <p className="text-zinc-300 text-sm mt-3">{userBio || 'Разработчик Linker Pro 🚀'}</p>
                {(currentUser?.location || currentUser?.website || (currentUser?.birthday && currentUser?.settings?.showBirthday)) && (
                  <div className="flex flex-col gap-2 mt-4 text-sm text-zinc-400">
                    {currentUser?.location && <div className="flex items-center gap-2"><MapPin size={14} /><span>{currentUser.location}</span></div>}
                    {currentUser?.website && (
                      <div className="flex items-center gap-2">
                        <Globe size={14} />
                        <a href={currentUser.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                          {currentUser.website.replace('https://', '')}
                        </a>
                      </div>
                    )}
                    {currentUser?.birthday && currentUser?.settings?.showBirthday && (
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{new Date(currentUser.birthday).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex gap-5 mt-4">
                  <div><span className="font-bold">0</span><span className="text-zinc-500 text-xs ml-1">публикации</span></div>
                  <div><span className="font-bold">0</span><span className="text-zinc-500 text-xs ml-1">подписчики</span></div>
                  <div><span className="font-bold">0</span><span className="text-zinc-500 text-xs ml-1">подписки</span></div>
                </div>
                {/* Статус онлайн */}
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${onlineUsers.includes(currentUser?.id) ? 'bg-green-500' : 'bg-gray-500'}`} />
                  <span className="text-xs text-zinc-500">
                    {onlineUsers.includes(currentUser?.id) ? 'В сети' : 'Не в сети'}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-5 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-3xl">{userLevel}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full border-4 border-black flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">⚡</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg">Уровень {userLevel}</h3>
                    <span className="text-sm text-zinc-400">{userXP} / {nextLevelXP} XP</span>
                  </div>
                  <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-500 relative"
                      style={{ width: `${((userXP - (nextLevelXP - 100)) / 100) * 100}%` }}>
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-zinc-500">⚔️ До следующего уровня:</span>
                    <span className="font-bold text-yellow-400">{nextLevelXP - userXP} XP</span>
                  </div>
                </div>
              </div>
              {lastAction && (
                <div className="mt-3 text-xs text-green-400 bg-green-500/10 rounded-lg py-2 px-3 animate-pulse border border-green-500/20">
                  ✨ {lastAction}
                </div>
              )}
            </div>
            {currentUser?.isTester && (
              <div className="mt-6 p-5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <FlaskConical size={18} className="text-purple-400" />
                  <h3 className="font-bold">Экспериментальные функции</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 rounded-full text-purple-400 ml-auto">Beta</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={toggleTestThemeWithTracking}
                    className={`p-3 rounded-xl text-sm transition-all flex flex-col items-center gap-1 ${testTheme ? 'bg-purple-500/30 border border-purple-500' : 'bg-black/30 hover:bg-black/50'}`}>
                    <span className="text-xl mb-1">🎨</span> {testTheme ? '✓ Активна' : 'Новая тема'}
                  </button>
                  <button onClick={toggleTestChatModeWithTracking}
                    className={`p-3 rounded-xl text-sm transition-all flex flex-col items-center gap-1 ${testChatMode ? 'bg-purple-500/30 border border-purple-500' : 'bg-black/30 hover:bg-black/50'}`}>
                    <span className="text-xl mb-1">💬</span> {testChatMode ? '✓ Активен' : 'Тестовый чат'}
                  </button>
                  <button onClick={toggleSpeedModeWithTracking}
                    className={`p-3 rounded-xl text-sm transition-all flex flex-col items-center gap-1 ${testSpeedMode ? 'bg-purple-500/30 border border-purple-500' : 'bg-black/30 hover:bg-black/50'}`}>
                    <span className="text-xl mb-1">🚀</span> {testSpeedMode ? '✓ Активен' : 'Турбо-режим'}
                  </button>
                  <button onClick={runExperimentWithTracking}
                    className="p-3 bg-black/30 hover:bg-black/50 rounded-xl text-sm transition-all flex flex-col items-center gap-1 relative overflow-hidden">
                    <span className="text-xl mb-1">⚡</span> Эксперимент
                    {experimentValue > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-[10px] flex items-center justify-center">
                        {experimentValue}
                      </span>
                    )}
                  </button>
                </div>
                {(testTheme || testChatMode || testSpeedMode) && (
                  <div className="mt-3 p-2 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <p className="text-xs text-purple-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                      Активные режимы: {testTheme && ' 🎨 Тема'} {testChatMode && ' 💬 Чат'} {testSpeedMode && ' 🚀 Турбо'}
                    </p>
                  </div>
                )}
                <p className="text-[10px] text-zinc-600 mt-4 text-center">
                  Функции в разработке. Спасибо за тестирование! 🧪
                </p>
              </div>
            )}
            <div className="flex gap-6 mt-6 border-b border-white/5">
              <button className="py-3 px-1 text-sm font-medium border-b-2 border-blue-500 text-white flex items-center gap-2"><Grid size={16} />Публикации</button>
              <button className="py-3 px-1 text-sm font-medium text-zinc-500 hover:text-white border-b-2 border-transparent flex items-center gap-2"><Play size={16} />Reels</button>
              <button className="py-3 px-1 text-sm font-medium text-zinc-500 hover:text-white border-b-2 border-transparent flex items-center gap-2"><Bookmark size={16} />Сохраненное</button>
            </div>
            <div className="grid grid-cols-3 gap-1 mt-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-square bg-[#111] rounded-lg relative group cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center"><Heart size={24} className="text-white/20" /></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1"><Heart size={14} className="text-white" /><span className="text-xs text-white">0</span></div>
                      <div className="flex items-center gap-1"><MessageCircle size={14} className="text-white" /><span className="text-xs text-white">0</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {showAvatarModal && (
              <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col lg:flex-row bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <button onClick={() => setShowAvatarModal(false)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors flex items-center justify-center">
                    <X size={20} className="text-white" />
                  </button>
                  <div className="lg:w-2/3 bg-black flex items-center justify-center p-4 lg:p-8">
                    <div className="relative w-full max-h-[70vh] flex items-center justify-center">
                      {currentUser?.avatar ? (
                        <img src={currentUser.avatar} alt={userName} className="max-w-full max-h-[70vh] object-contain rounded-lg" />
                      ) : (
                        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-black text-8xl">{userName ? userName.charAt(0).toUpperCase() : '?'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="lg:w-1/3 bg-[#0a0a0a] border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col">
                    <div className="p-6 border-b border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                          {currentUser?.avatar ? (
                            <img src={currentUser.avatar} alt={userName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-white font-bold text-xl">{userName ? userName.charAt(0).toUpperCase() : '?'}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{userName || 'Слава Иванов'}</h3>
                          <p className="text-sm text-zinc-500">@{currentUser?.nickname || 'slava_ivanov'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      <div className="grid grid-cols-3 gap-3">
                        <label className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center"><Camera size={18} className="text-blue-400" /></div>
                          <span className="text-xs">Загрузить</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarSelect} disabled={isUploadingAvatar} />
                        </label>
                        {currentUser?.avatar && (
                          <button onClick={handleAvatarDelete} className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-red-500/10 rounded-xl transition-colors">
                            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center"><Trash2 size={18} className="text-red-400" /></div>
                            <span className="text-xs">Удалить</span>
                          </button>
                        )}
                      </div>
                      <div className="bg-white/5 rounded-xl p-5 space-y-4">
                        <h4 className="font-medium text-sm uppercase tracking-wider text-zinc-400">Статистика</h4>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><Eye size={16} className="text-blue-400" /></div><span className="text-sm">Просмотры</span></div>
                          <span className="font-bold">{avatarViews}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center"><Heart size={16} className="text-red-400" /></div><span className="text-sm">Лайки</span></div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{avatarLikes}</span>
                            <button onClick={() => { setIsLiked(!isLiked); setAvatarLikes(prev => isLiked ? prev - 1 : prev + 1); }}
                              className={`p-1.5 rounded-full transition-colors ${isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-red-500'}`}>
                              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><MessageCircle size={16} className="text-green-400" /></div><span className="text-sm">Комментарии</span></div>
                          <span className="font-bold">{avatarComments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Друзья */}
        {activeTab === 'friends' && (
          <div className="space-y-6 pb-24">
            {/* Шапка */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold" style={{ color: themeColor }}>Друзья</h2>
              <div className="flex gap-2">
                {/* Кнопка приглашения */}
                <button
                  onClick={() => {
                    const baseUrl = window.location.origin;
                    const inviteCode = Math.random().toString(36).substring(2, 10);
                    setInviteLink(`${baseUrl}/invite?code=${inviteCode}&ref=${currentUser?.id}`);
                    setShowInviteModal(true);
                  }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <UserPlus size={16} />
                  <span>Пригласить</span>
                </button>

                {/* Кнопка заявок (счётчик) */}
                {friendRequests.length > 0 && (
                  <button
                    onClick={() => setShowFriendRequestsModal(true)}
                    className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 relative"
                  >
                    <Bell size={16} className="text-yellow-400" />
                    <span>Заявки</span>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                      {friendRequests.length}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#111] rounded-2xl p-5 border border-white/5">
                <p className="text-3xl font-bold">{friends.length}</p>
                <p className="text-sm text-zinc-500 mt-1">друзей</p>
              </div>
              <div className="bg-[#111] rounded-2xl p-5 border border-white/5">
                <p className="text-3xl font-bold">{friends.filter(f => onlineUsers.includes(f.id)).length}</p>
                <p className="text-sm text-zinc-500 mt-1">онлайн</p>
              </div>
              <div className="bg-[#111] rounded-2xl p-5 border border-white/5">
                <p className="text-3xl font-bold">{friendRequests.length}</p>
                <p className="text-sm text-zinc-500 mt-1">заявки</p>
              </div>
            </div>

            {/* Поиск друзей */}
            <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-medium mb-4">Найти друзей</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={searchFriendsQuery}
                  onChange={(e) => setSearchFriendsQuery(e.target.value)}
                  placeholder="Введите имя или никнейм..."
                  className="w-full bg-black/50 rounded-xl pl-10 pr-4 py-3 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Результаты поиска (из users.json) */}
              {searchFriendsQuery && (
                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                  {foundUsers
                    .filter(user => !friends.some(f => f.id === user.id))
                    .map(user => (
                      <div key={user.id} className="flex items-center justify-between p-2 bg-black/30 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {user.name?.charAt(0) || user.nickname?.charAt(0) || '?'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name || 'Пользователь'}</p>
                            <p className="text-xs text-zinc-500">@{user.nickname}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => sendFriendRequest(user.id, user.name || user.nickname)}
                          className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-sm transition-colors flex items-center gap-1"
                        >
                          <UserPlus size={14} className="text-blue-400" />
                          <span>Добавить</span>
                        </button>
                      </div>
                    ))}
                  {foundUsers.length === 0 && (
                    <p className="text-center text-zinc-500 py-2">Пользователи не найдены</p>
                  )}
                </div>
              )}
            </div>

            {/* Список друзей */}
            <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-medium mb-4">Мои друзья ({friends.length})</h3>

              {friends.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <UserPlus size={48} className="text-zinc-700 mb-3" />
                  <p className="text-zinc-500 text-sm">У вас пока нет друзей</p>
                  <p className="text-xs text-zinc-600 mt-1">Найдите пользователей и добавьте в друзья</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {friends.map(friend => (
                    <div key={friend.id} className="flex items-center justify-between p-3 bg-black/30 hover:bg-black/50 rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {friend.name?.charAt(0) || '?'}
                            </span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${onlineUsers.includes(friend.id) ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                        </div>
                        <div>
                          <p className="font-medium">{friend.name}</p>
                          <p className="text-xs text-zinc-500">
                            {onlineUsers.includes(friend.id) ? 'онлайн' : 'был(а) недавно'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Удалить ${friend.name} из друзей?`)) {
                            removeFriend(friend.id);
                          }
                        }}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Чаты */}
        {activeTab === 'chat' && (
          <div className="chats-container flex h-[calc(100vh-180px)] -mx-6 relative">
            <div className="bg-[#0a0a0a] border-r border-white/5 flex flex-col relative" style={{ width: `${leftColumnWidth}%` }}>
              <div className="p-4 border-b border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold" style={{ color: themeColor }}>Чаты</h2>
                  <div className="flex gap-2">
                    <button onClick={() => { setShowCreateGroupModal(true); setSearchUserQuery(''); setFoundUsers([]); }}
                      className="w-10 h-10 rounded-full bg-green-500/20 hover:bg-green-500/30 flex items-center justify-center transition-colors" title="Создать группу">
                      <Users size={20} className="text-green-400" />
                    </button>
                    <button onClick={() => setShowNewChatModal(true)}
                      className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors" title="Новый личный чат">
                      <Plus size={20} className="text-white" />
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input type="text" placeholder="Поиск" className="w-full bg-black/50 rounded-xl pl-10 pr-4 py-2.5 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {chats.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <MessageSquare size={48} className="text-zinc-700 mb-3" />
                    <p className="text-zinc-500 text-sm">Нет чатов</p>
                    <p className="text-xs text-zinc-600 mt-1">Нажмите + чтобы создать</p>
                  </div>
                ) : (
                  chats.map((chat) => {
                    const lastMsg = chat.lastMessage;
                    const isSelected = selectedChat?.id === chat.id;
                    return (
                      <div key={chat.id} onClick={() => setSelectedChat(chat)}
                        className={`p-3 rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-white/5'}`}>
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              {chat.isGroup ? <UsersIcon size={20} className="text-white" /> : (
                                (() => {
                                  const otherParticipantId = chat.participants.find((id: string) => id !== currentUser?.id);
                                  const otherUser = [...savedUsers, ...allUsers].find(u => u.id === otherParticipantId);
                                  const firstLetter = otherUser?.name?.charAt(0) || otherUser?.nickname?.charAt(0) || '?';
                                  return <span className="text-white font-bold text-lg">{firstLetter}</span>;
                                })()
                              )}
                            </div>
                            {!chat.isGroup && (() => {
                              const otherParticipantId = chat.participants.find((id: string) => id !== currentUser?.id);
                              const isOnline = otherParticipantId && onlineUsers.includes(otherParticipantId);
                              return (
                                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${isOnline ? 'bg-green-500' : 'bg-gray-500'
                                  }`} />
                              );
                            })()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <p className="font-medium truncate">
                                {chat.isGroup ? chat.name : (() => {
                                  const otherParticipantId = chat.participants.find((id: string) => id !== currentUser?.id);
                                  const otherUser = [...savedUsers, ...allUsers].find(u => u.id === otherParticipantId);
                                  return otherUser?.name || otherUser?.nickname || 'Пользователь';
                                })()}
                              </p>
                              {lastMsg && <p className="text-[10px] text-zinc-500 ml-2 shrink-0">{formatMessageTime(lastMsg.timestamp)}</p>}
                            </div>
                            {lastMsg ? (
                              <div className="flex items-center gap-1">
                                {lastMsg.userId === currentUser?.id && <CheckCheck size={12} className={lastMsg.read ? 'text-blue-400' : 'text-zinc-600'} />}
                                <p className="text-xs text-zinc-500 truncate">
                                  {lastMsg.userId === currentUser?.id ? 'Вы: ' : ''}{lastMsg.content}
                                </p>
                              </div>
                            ) : <p className="text-xs text-zinc-600">Нет сообщений</p>}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="w-1 bg-transparent hover:bg-blue-500/50 cursor-col-resize transition-colors absolute top-0 bottom-0"
              style={{ left: `${leftColumnWidth}%`, transform: 'translateX(-50%)' }} onMouseDown={startDragging}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-white/10 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-1 h-4 bg-white/30 rounded-full mx-px" /><div className="w-1 h-4 bg-white/30 rounded-full mx-px" />
              </div>
            </div>
            <div className="bg-[#0a0a0a] flex flex-col" style={{ width: `${100 - leftColumnWidth}%` }}>
              {selectedChat ? (
                <>
                  <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <MessageSquare size={18} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedChat.name}</h3>
                        {!selectedChat.isGroup && (() => {
                          const otherParticipantId = selectedChat.participants.find((id: string) => id !== currentUser?.id);
                          const isOnline = otherParticipantId && onlineUsers.includes(otherParticipantId);
                          const lastSeen = otherParticipantId ? lastActivity[otherParticipantId] : null;
                          const isTyping = typingUsers[selectedChat.id];

                          if (isTyping) {
                            return (
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-blue-400">печатает</span>
                                <div className="flex gap-1">
                                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                              </div>
                            );
                          }

                          return (
                            <p className={`text-xs ${isOnline ? 'text-green-500' : 'text-zinc-500'}`}>
                              {isOnline ? 'онлайн' : (lastSeen ? `был(а) ${formatLastSeen(lastSeen)}` : 'был(а) недавно')}
                            </p>
                          );
                        })()}
                        {selectedChat.isGroup && (
                          <p className="text-xs text-zinc-500">{selectedChat.participants.length} участников</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.length === 0 ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <MessageCircle size={48} className="text-zinc-700 mx-auto mb-3" />
                          <p className="text-zinc-500 text-sm">Нет сообщений</p>
                          <p className="text-xs text-zinc-600">Напишите что-нибудь...</p>
                        </div>
                      </div>
                    ) : (
                      messages.map((msg, index) => {
                        const isMe = msg.userId === currentUser?.id;
                        const showAvatar = index === 0 || messages[index - 1]?.userId !== msg.userId;
                        return (
                          <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-2 max-w-[70%] ${isMe ? 'flex-row-reverse' : ''}`}>
                              {!isMe && showAvatar && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 mt-1">
                                  <span className="text-white text-xs font-bold">{msg.userName?.charAt(0) || '?'}</span>
                                </div>
                              )}
                              {!isMe && !showAvatar && <div className="w-8 shrink-0" />}
                              <div>
                                {!isMe && showAvatar && <p className="text-xs text-zinc-500 mb-1 ml-1">{msg.userName}</p>}
                                <div className={`px-4 py-2 rounded-2xl ${isMe ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-[#1a1a1a] rounded-tl-none'}`}>
                                  <p className="text-sm break-words">{msg.content}</p>
                                </div>
                                <div className={`flex items-center gap-1 mt-1 text-[10px] text-zinc-600 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                  <span>{formatMessageTime(msg.timestamp)}</span>
                                  {isMe && <CheckCheck size={12} className={msg.read ? 'text-blue-400' : 'text-zinc-600'} />}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="p-4 border-t border-white/5 shrink-0">
                    <div className="flex items-center gap-2">
                      {/* Кнопка прикрепления с меню */}
                      <div className="relative">
                        <button
                          onClick={() => setShowFileMenu(!showFileMenu)}
                          className="p-3 bg-green-500/20 hover:bg-green-500/30 rounded-xl transition-colors"
                          title="Прикрепить файл"
                        >
                          <Paperclip size={20} className="text-green-400" />
                        </button>

                        {/* Выпадающее меню */}
                        {showFileMenu && (
                          <div className="absolute bottom-full left-0 mb-2 w-48 bg-[#1a1a1a] rounded-xl border border-white/10 shadow-2xl z-50 overflow-hidden">
                            <div className="p-2 border-b border-white/10">
                              <p className="text-xs text-zinc-400">Выберите тип</p>
                            </div>

                            {/* Фото/Видео */}
                            <label className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer transition-colors">
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*,video/*"
                                onChange={(e) => {
                                  handleFileSelect(e);
                                  setShowFileMenu(false);
                                }}
                              />
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <Camera size={16} className="text-blue-400" />
                              </div>
                              <div>
                                <p className="text-sm text-white">Фото/Видео</p>
                                <p className="text-xs text-zinc-500">Изображения и видео</p>
                              </div>
                            </label>

                            {/* Документ */}
                            <label className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer transition-colors border-t border-white/5">
                              <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                                onChange={(e) => {
                                  handleFileSelect(e);
                                  setShowFileMenu(false);
                                }}
                              />
                              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <File size={16} className="text-purple-400" />
                              </div>
                              <div>
                                <p className="text-sm text-white">Документ</p>
                                <p className="text-xs text-zinc-500">PDF, Word, Excel</p>
                              </div>
                            </label>

                            {/* Архив */}
                            <label className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer transition-colors border-t border-white/5">
                              <input
                                type="file"
                                className="hidden"
                                accept=".zip,.rar,.7z"
                                onChange={(e) => {
                                  handleFileSelect(e);
                                  setShowFileMenu(false);
                                }}
                              />
                              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                <File size={16} className="text-yellow-400" />
                              </div>
                              <div>
                                <p className="text-sm text-white">Архив</p>
                                <p className="text-xs text-zinc-500">ZIP, RAR, 7z</p>
                              </div>
                            </label>

                            {/* Любой файл */}
                            <label className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer transition-colors border-t border-white/5">
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  handleFileSelect(e);
                                  setShowFileMenu(false);
                                }}
                              />
                              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Paperclip size={16} className="text-green-400" />
                              </div>
                              <div>
                                <p className="text-sm text-white">Любой файл</p>
                                <p className="text-xs text-zinc-500">До 10MB</p>
                              </div>
                            </label>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={newMessageText}
                        onChange={handleTyping}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            stopTyping();
                            sendMessage();
                          }
                        }}
                        placeholder="Написать сообщение..."
                        className="flex-1 bg-[#1a1a1a] rounded-xl px-4 py-3 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors"
                      />
                      <button
                        onClick={() => {
                          stopTyping();
                          sendMessage();
                        }}
                        disabled={!newMessageText.trim() && !selectedFile}
                        className="p-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={20} className="text-white" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare size={64} className="text-zinc-700 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-zinc-400 mb-2">Выберите чат</h3>
                    <p className="text-sm text-zinc-600">Начните общение с друзьями</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Лента */}
        {activeTab === 'feed' && (
          <div className="space-y-6 pb-24">
            {/* Шапка ленты */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold" style={{ color: themeColor }}>Лента новостей</h2>
              <button
                onClick={() => setShowCreatePostModal(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                <span>Создать пост</span>
              </button>
            </div>

            {/* Список постов */}
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Heart size={64} className="text-zinc-700 mb-4" />
                  <h2 className="text-2xl font-bold text-zinc-400 mb-2">Пока нет постов</h2>
                  <p className="text-zinc-600 text-center max-w-md">Создайте первый пост!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="bg-[#111] rounded-2xl p-6 border border-white/5">
                    {/* Шапка поста */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        {post.userAvatar ? (
                          <img src={post.userAvatar} alt={post.userName} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          <span className="text-white font-bold text-lg">
                            {post.userName?.charAt(0) || '?'}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{post.userName}</p>
                        <p className="text-xs text-zinc-500">{formatPostTime(post.createdAt)}</p>
                      </div>
                    </div>

                    {/* Текст поста */}
                    {post.content && (
                      <p className="text-zinc-300 mb-4">{post.content}</p>
                    )}

                    {/* Изображение поста */}
                    {post.image && (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <img src={post.image} alt="Post" className="w-full h-auto" />
                      </div>
                    )}

                    {/* Статистика */}
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <span className="text-zinc-500">{post.likes?.length || 0} лайков</span>
                      <span className="text-zinc-500">{post.comments?.length || 0} комментариев</span>
                    </div>

                    {/* Действия */}
                    <div className="flex items-center gap-4 border-t border-white/5 pt-3">
                      <button
                        onClick={() => likePost(post.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${post.likes?.includes(currentUser.id)
                          ? 'text-red-500'
                          : 'text-zinc-400 hover:text-red-500'
                          }`}
                      >
                        <Heart size={18} fill={post.likes?.includes(currentUser.id) ? 'currentColor' : 'none'} />
                        <span>Лайк</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPost(post);
                          setShowComments(true);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-white transition-colors"
                      >
                        <MessageCircle size={18} />
                        <span>Комментировать</span>
                      </button>
                    </div>

                    {/* Последний комментарий (если есть) */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="mt-3 p-3 bg-black/30 rounded-lg">
                        <p className="text-xs text-zinc-400 mb-1">
                          {post.comments[post.comments.length - 1].userName}
                        </p>
                        <p className="text-sm text-zinc-300">
                          {post.comments[post.comments.length - 1].text}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Настройки */}
        {activeTab === 'settings' && (
          <div className="space-y-6 pb-24">
            <h2 className="text-2xl font-bold mb-6" style={{ color: themeColor }}>Настройки</h2>
            <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center"><User size={18} className="text-blue-500" /></div>
                <div><h3 className="text-lg font-medium">Профиль</h3><p className="text-xs text-zinc-500">Личная информация, имя, био</p></div>
              </div>
              <div className="space-y-4">
                <div><label className="text-sm text-zinc-400 block mb-1">Имя</label><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full bg-black/50 rounded-xl px-4 py-2.5 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors" placeholder="Ваше имя" /></div>
                <div><label className="text-sm text-zinc-400 block mb-1">О себе</label><textarea value={userBio} onChange={(e) => setUserBio(e.target.value)} rows={3} className="w-full bg-black/50 rounded-xl px-4 py-2.5 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Расскажите о себе" /></div>
                <button onClick={handleSaveProfile} className="px-6 py-2.5 rounded-xl text-sm font-medium transition-colors text-white hover:opacity-90 active:scale-95" style={{ backgroundColor: themeColor }}>Сохранить изменения</button>
              </div>
            </div>
            <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center"><Sparkles size={18} className="text-purple-500" /></div><div><h3 className="text-lg font-medium">Оформление</h3><p className="text-xs text-zinc-500">Цвета, тема, эффекты</p></div></div>
                <button onClick={() => setShowThemeSettings(true)} className="px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2 text-white hover:opacity-90 active:scale-95" style={{ backgroundColor: themeColor }}><Settings size={16} /><span>Настроить</span></button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl">
                <div className="flex items-center gap-2 flex-1">{themeMode === 'dark' ? <Moon size={16} className="text-blue-400" /> : <Sun size={16} className="text-yellow-500" />}<span className="text-sm">{themeMode === 'dark' ? 'Тёмная' : 'Светлая'} тема</span></div>
                <div className="w-px h-4 bg-white/5" />
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full" style={{ backgroundColor: themeColor }} /><span className="text-sm text-zinc-400">{themeStyle}</span></div>
              </div>
            </div>
            <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center"><Lock size={18} className="text-green-500" /></div><div><h3 className="text-lg font-medium">Конфиденциальность</h3><p className="text-xs text-zinc-500">Кто видит твой профиль и активность</p></div></div>
              <div className="space-y-5">
                <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                  <div><p className="text-sm font-medium">Приватный аккаунт</p><p className="text-xs text-zinc-500 mt-0.5">Только подписчики видят твои фото и видео</p></div>
                  <button onClick={() => { const updatedUser = { ...currentUser, settings: { ...currentUser.settings, privateAccount: !currentUser.settings?.privateAccount } }; setCurrentUser(updatedUser); localStorage.setItem('current_user', JSON.stringify(updatedUser)); }}
                    className={`w-12 h-6 rounded-full relative transition-colors ${currentUser?.settings?.privateAccount ? '' : 'bg-zinc-700'}`} style={{ backgroundColor: currentUser?.settings?.privateAccount ? themeColor : undefined }}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentUser?.settings?.privateAccount ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                  <div><p className="text-sm font-medium">Дата рождения</p><p className="text-xs text-zinc-500 mt-0.5">{currentUser?.settings?.showBirthday ? 'Видна всем' : 'Только вы'}</p></div>
                  <button onClick={() => { const updatedUser = { ...currentUser, settings: { ...currentUser.settings, showBirthday: !currentUser.settings?.showBirthday } }; setCurrentUser(updatedUser); localStorage.setItem('current_user', JSON.stringify(updatedUser)); }}
                    className={`w-12 h-6 rounded-full relative transition-colors ${currentUser?.settings?.showBirthday !== false ? '' : 'bg-zinc-700'}`} style={{ backgroundColor: currentUser?.settings?.showBirthday !== false ? themeColor : undefined }}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentUser?.settings?.showBirthday !== false ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                  <div><p className="text-sm font-medium">Показывать статус онлайн</p><p className="text-xs text-zinc-500 mt-0.5">Кто видит, когда ты в сети</p></div>
                  <button onClick={() => { const updatedUser = { ...currentUser, settings: { ...currentUser.settings, showOnline: !currentUser.settings?.showOnline } }; setCurrentUser(updatedUser); localStorage.setItem('current_user', JSON.stringify(updatedUser)); }}
                    className={`w-12 h-6 rounded-full relative transition-colors ${currentUser?.settings?.showOnline !== false ? '' : 'bg-zinc-700'}`} style={{ backgroundColor: currentUser?.settings?.showOnline !== false ? themeColor : undefined }}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentUser?.settings?.showOnline !== false ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                  <div><p className="text-sm font-medium">Отчеты о прочтении</p><p className="text-xs text-zinc-500 mt-0.5">Показывать, что ты прочитал сообщение</p></div>
                  <button onClick={() => { const updatedUser = { ...currentUser, settings: { ...currentUser.settings, readReceipts: !currentUser.settings?.readReceipts } }; setCurrentUser(updatedUser); localStorage.setItem('current_user', JSON.stringify(updatedUser)); }}
                    className={`w-12 h-6 rounded-full relative transition-colors ${currentUser?.settings?.readReceipts !== false ? '' : 'bg-zinc-700'}`} style={{ backgroundColor: currentUser?.settings?.readReceipts !== false ? themeColor : undefined }}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentUser?.settings?.readReceipts !== false ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                  <div><p className="text-sm font-medium">Заблокированные</p><p className="text-xs text-zinc-500 mt-0.5">Управление заблокированными пользователями</p></div>
                  <button className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">Список</button>
                </div>
              </div>
            </div>
            <div className="bg-[#111] rounded-2xl p-6 border border-purple-500/30 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <FlaskConical size={18} className="text-purple-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Программа тестирования</h3>
                  <p className="text-xs text-zinc-500">Получи доступ к новым функциям первым</p>
                </div>
              </div>
              {currentUser?.isTester ? (
                <div className="space-y-3">
                  <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <FlaskConical size={16} className="text-purple-400" />
                      <span className="text-sm font-medium text-purple-400">Вы тестировщик!</span>
                    </div>
                    <p className="text-xs text-zinc-400">Спасибо за участие в тестировании.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Вы уверены, что хотите выйти из программы тестирования? Все тестовые функции будут отключены.')) {
                        const updatedUser = { ...currentUser, isTester: false };
                        delete updatedUser.testerSince;
                        delete updatedUser.hasAdminAccess;
                        setCurrentUser(updatedUser);
                        localStorage.setItem('current_user', JSON.stringify(updatedUser));
                        alert('✅ Вы вышли из программы тестирования');
                      }
                    }}
                    className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} className="text-red-400" />
                    <span className="text-red-400">Выйти из тестирования</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-zinc-400">Хотите помочь нам сделать приложение лучше?</p>
                  <button onClick={() => setShowTesterInviteModal(true)}
                    className="w-full py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <FlaskConical size={16} className="text-purple-400" /> Ввести код приглашения
                  </button>
                  {(currentUser?.role === 'developer' || currentUser?.role === 'admin') && (
                    <button onClick={() => { const code = generateTesterInvite(); alert(`🔑 Новый код приглашения: ${code}`); }}
                      className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs transition-colors">
                      Сгенерировать новый код
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ПАНЕЛЬ УПРАВЛЕНИЯ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 pb-24">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentUser?.role === 'developer' ? 'bg-purple-500/20' : currentUser?.role === 'admin' ? 'bg-red-500/20' : currentUser?.role === 'moderator' ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                {currentUser?.role === 'developer' && <Code size={24} className="text-purple-400" />}
                {currentUser?.role === 'admin' && <Crown size={24} className="text-red-400" />}
                {currentUser?.role === 'moderator' && <Shield size={24} className="text-blue-400" />}
                {currentUser?.role === 'helper' && <Heart size={24} className="text-green-400" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold" style={{ color: themeColor }}>Панель управления</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentUser?.role === 'developer' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : currentUser?.role === 'admin' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : currentUser?.role === 'moderator' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                    {currentUser?.role === 'developer' && 'Разработчик'}
                    {currentUser?.role === 'admin' && 'Администратор'}
                    {currentUser?.role === 'moderator' && 'Модератор'}
                    {currentUser?.role === 'helper' && 'Хелпер'}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${currentUser?.role === 'developer' ? 'text-purple-400' : currentUser?.role === 'admin' ? 'text-red-400' : currentUser?.role === 'moderator' ? 'text-blue-400' : 'text-green-400'}`}>
                  {currentUser?.role === 'developer' && 'Полный доступ ко всем функциям платформы'}
                  {currentUser?.role === 'admin' && 'Управление пользователями и просмотр ролей'}
                  {currentUser?.role === 'moderator' && 'Просмотр статистики модератора'}
                  {currentUser?.role === 'helper' && 'Информация для хелперов'}
                </p>
              </div>
            </div>
            {currentUser?.role === 'developer' && (
              <div className="bg-[#111] rounded-2xl p-6 border border-purple-500/30 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Code size={18} className="text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-400">Режим просмотра</h3>
                    <p className="text-xs text-zinc-500">Переключайся между ролями для тестирования</p>
                  </div>
                </div>
                <div className={`mb-4 p-3 rounded-xl border flex items-center gap-3 ${viewMode === 'developer' ? 'bg-purple-500/10 border-purple-500/30' : viewMode === 'admin' ? 'bg-red-500/10 border-red-500/30' : viewMode === 'moderator' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${viewMode === 'developer' ? 'bg-purple-500/20' : viewMode === 'admin' ? 'bg-red-500/20' : viewMode === 'moderator' ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                    <Info size={16} className={viewMode === 'developer' ? 'text-purple-400' : viewMode === 'admin' ? 'text-red-400' : viewMode === 'moderator' ? 'text-blue-400' : 'text-green-400'} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${viewMode === 'developer' ? 'text-purple-400' : viewMode === 'admin' ? 'text-red-400' : viewMode === 'moderator' ? 'text-blue-400' : 'text-green-400'}`}>
                      Режим просмотра: <span className="font-bold">
                        {viewMode === 'developer' && 'Разработчик'}
                        {viewMode === 'admin' && 'Администратор'}
                        {viewMode === 'moderator' && 'Модератор'}
                        {viewMode === 'helper' && 'Хелпер'}
                      </span>
                    </p>
                    <p className="text-xs text-zinc-400">Сейчас вы видите интерфейс от лица этой роли</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {['developer', 'admin', 'moderator', 'helper'].map((role) => (
                    <button key={role} onClick={() => setViewMode(role as any)}
                      className={`p-3 rounded-xl border transition-all ${viewMode === role ? role === 'developer' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : role === 'admin' ? 'bg-red-500/20 border-red-500 text-red-400' : role === 'moderator' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-green-500/20 border-green-500 text-green-400' : 'border-white/5 bg-black/30 hover:bg-black/50 text-zinc-400'}`}>
                      {role === 'developer' && <Code size={20} className="mx-auto mb-1" />}
                      {role === 'admin' && <Crown size={20} className="mx-auto mb-1" />}
                      {role === 'moderator' && <Shield size={20} className="mx-auto mb-1" />}
                      {role === 'helper' && <Heart size={20} className="mx-auto mb-1" />}
                      <span className="text-xs font-medium block">
                        {role === 'developer' ? 'Разработчик' : role === 'admin' ? 'Админ' : role === 'moderator' ? 'Модератор' : 'Хелпер'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {currentUser?.role === 'admin' && (
              <div className="bg-[#111] rounded-2xl p-6 border border-red-500/30 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Crown size={18} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-red-400">Просмотр ролей</h3>
                    <p className="text-xs text-zinc-500">Вы можете просматривать панели модератора и хелпера</p>
                  </div>
                </div>
                <div className={`mb-4 p-3 rounded-xl border flex items-center gap-3 ${viewMode === 'admin' ? 'bg-red-500/10 border-red-500/30' : viewMode === 'moderator' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${viewMode === 'admin' ? 'bg-red-500/20' : viewMode === 'moderator' ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                    <Info size={16} className={viewMode === 'admin' ? 'text-red-400' : viewMode === 'moderator' ? 'text-blue-400' : 'text-green-400'} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${viewMode === 'admin' ? 'text-red-400' : viewMode === 'moderator' ? 'text-blue-400' : 'text-green-400'}`}>
                      Текущий просмотр: <span className="font-bold">
                        {viewMode === 'admin' && 'Администратор'}
                        {viewMode === 'moderator' && 'Модератор'}
                        {viewMode === 'helper' && 'Хелпер'}
                      </span>
                    </p>
                    <p className="text-xs text-zinc-400">
                      {viewMode === 'admin' && 'Ваша основная панель администратора'}
                      {viewMode === 'moderator' && 'Вы смотрите панель модератора'}
                      {viewMode === 'helper' && 'Вы смотрите панель хелпера'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['admin', 'moderator', 'helper'].map((role) => (
                    <button key={role} onClick={() => setViewMode(role as any)}
                      className={`p-3 rounded-xl border transition-all ${viewMode === role ? role === 'admin' ? 'bg-red-500/20 border-red-500 text-red-400' : role === 'moderator' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-green-500/20 border-green-500 text-green-400' : 'border-white/5 bg-black/30 hover:bg-black/50 text-zinc-400'}`}>
                      {role === 'admin' && <Crown size={20} className="mx-auto mb-1" />}
                      {role === 'moderator' && <Shield size={20} className="mx-auto mb-1" />}
                      {role === 'helper' && <Heart size={20} className="mx-auto mb-1" />}
                      <span className="text-xs font-medium block">
                        {role === 'admin' ? 'Админ' : role === 'moderator' ? 'Модератор' : 'Хелпер'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {(viewMode === 'developer' || (currentUser?.role === 'developer' && !viewMode)) && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-[#111] rounded-2xl p-5 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <User size={16} className="text-blue-500" />
                      </div>
                      <span className="text-sm text-zinc-500">Всего пользователей</span>
                    </div>
                    <p className="text-3xl font-bold">{allUsers.length}</p>
                  </div>
                  <div className="bg-[#111] rounded-2xl p-5 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Crown size={16} className="text-purple-500" />
                      </div>
                      <span className="text-sm text-zinc-500">Администраторы</span>
                    </div>
                    <p className="text-3xl font-bold">{allUsers.filter((u: any) => u.role === 'admin' || u.role === 'developer').length}</p>
                  </div>
                  <div className="bg-[#111] rounded-2xl p-5 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Shield size={16} className="text-blue-500" />
                      </div>
                      <span className="text-sm text-zinc-500">Модераторы</span>
                    </div>
                    <p className="text-3xl font-bold">{allUsers.filter((u: any) => u.role === 'moderator').length}</p>
                  </div>
                  <div className="bg-[#111] rounded-2xl p-5 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Heart size={16} className="text-green-500" />
                      </div>
                      <span className="text-sm text-zinc-500">Хелперы</span>
                    </div>
                    <p className="text-3xl font-bold">{allUsers.filter((u: any) => u.role === 'helper').length}</p>
                  </div>
                </div>
                <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Users size={18} className="text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Управление пользователями</h3>
                        <p className="text-xs text-zinc-500">Назначение ролей и прав доступа</p>
                      </div>
                    </div>
                    <button onClick={async () => { await loadAllUsers(); setShowAdminPanel(true); }}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-sm transition-colors text-white">
                      Открыть панель
                    </button>
                  </div>
                </div>
                <div className="bg-[#111] rounded-2xl p-6 border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <History size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Логи модераторов</h3>
                      <p className="text-xs text-zinc-500">Отслеживание действий модераторов</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      loadModeratorLogs();
                      setShowLogsModal(true);
                    }}
                    className="w-full py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <History size={16} className="text-blue-400" />
                    <span>Просмотреть логи ({moderatorLogs.length})</span>
                  </button>
                </div>
              </>
            )}
            {(viewMode === 'admin' || (currentUser?.role === 'admin' && !viewMode)) && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-[#111] rounded-2xl p-5 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <User size={16} className="text-blue-500" />
                      </div>
                      <span className="text-sm text-zinc-500">Всего пользователей</span>
                    </div>
                    <p className="text-3xl font-bold">{allUsers.length}</p>
                  </div>
                  <div className="bg-[#111] rounded-2xl p-5 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Crown size={16} className="text-purple-500" />
                      </div>
                      <span className="text-sm text-zinc-500">Администраторы</span>
                    </div>
                    <p className="text-3xl font-bold">{allUsers.filter((u: any) => u.role === 'admin' || u.role === 'developer').length}</p>
                  </div>
                  <div className="bg-[#111] rounded-2xl p-5 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Shield size={16} className="text-blue-500" />
                      </div>
                      <span className="text-sm text-zinc-500">Модераторы</span>
                    </div>
                    <p className="text-3xl font-bold">{allUsers.filter((u: any) => u.role === 'moderator').length}</p>
                  </div>
                  <div className="bg-[#111] rounded-2xl p-5 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Heart size={16} className="text-green-500" />
                      </div>
                      <span className="text-sm text-zinc-500">Хелперы</span>
                    </div>
                    <p className="text-3xl font-bold">{allUsers.filter((u: any) => u.role === 'helper').length}</p>
                  </div>
                </div>
                <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Users size={18} className="text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Управление пользователями</h3>
                        <p className="text-xs text-zinc-500">Назначение ролей и прав доступа</p>
                      </div>
                    </div>
                    <button onClick={async () => { await loadAllUsers(); setShowAdminPanel(true); }}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-sm transition-colors text-white">
                      Открыть панель
                    </button>
                  </div>
                </div>
                <div className="bg-[#111] rounded-2xl p-6 border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <History size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Логи модераторов</h3>
                      <p className="text-xs text-zinc-500">Отслеживание действий модераторов</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      loadModeratorLogs();
                      setShowLogsModal(true);
                    }}
                    className="w-full py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <History size={16} className="text-blue-400" />
                    <span>Просмотреть логи ({moderatorLogs.length})</span>
                  </button>
                </div>
              </>
            )}
            {(viewMode === 'moderator' || (currentUser?.role === 'moderator' && !viewMode)) && (
              <div className="bg-[#111] rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Shield size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Панель модератора</h3>
                    <p className="text-xs text-zinc-500">Инструменты для модерации</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/30 rounded-xl p-4">
                    <p className="text-sm text-zinc-400 mb-1">Всего пользователей</p>
                    <p className="text-2xl font-bold text-blue-400">{allUsers.length}</p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4">
                    <p className="text-sm text-zinc-400 mb-1">Модераторов</p>
                    <p className="text-2xl font-bold text-blue-400">{allUsers.filter((u: any) => u.role === 'moderator').length}</p>
                  </div>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                  <p className="text-sm text-zinc-300">
                    Как модератор, вы можете просматривать жалобы и модерировать контент.
                    Для управления пользователями обратитесь к администратору.
                  </p>
                </div>
              </div>
            )}
            {(viewMode === 'helper' || (currentUser?.role === 'helper' && !viewMode)) && (
              <div className="bg-[#111] rounded-2xl p-6 border border-green-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Heart size={18} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Панель хелпера</h3>
                    <p className="text-xs text-zinc-500">Инструменты для помощи пользователям</p>
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-4 mb-6">
                  <p className="text-sm text-zinc-400 mb-1">Всего пользователей</p>
                  <p className="text-2xl font-bold text-green-400">{allUsers.length}</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                  <p className="text-sm text-zinc-300">
                    Как хелпер, вы можете отвечать на вопросы пользователей
                    и помогать им в чатах поддержки.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* МОДАЛЬНЫЕ ОКНА */}
        {showAccountPicker && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-white/10 animate-in zoom-in-50 duration-200">
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: themeColor }}>Сменить аккаунт</h2>
              <div className="space-y-3 mb-6">
                {savedUsers.length > 0 ? savedUsers.map((user) => (
                  <div key={user.id} onClick={() => handleSelectAccount(user)} className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-all group relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {user.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{user.name || 'Пользователь'}</p>
                      <p className="text-sm text-zinc-500">@{user.nickname}</p>
                    </div>
                    <button onClick={(e) => handleRemoveAccount(user.id, e)} className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 rounded-lg">
                      <LogOut size={16} className="text-red-400" />
                    </button>
                  </div>
                )) : (
                  <p className="text-center text-zinc-500 py-4">Нет сохраненных аккаунтов</p>
                )}
              </div>
              <button onClick={handleAddAccount} className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 text-white hover:opacity-90 active:scale-95" style={{ backgroundColor: themeColor }}>
                <User size={18} /><span>Войти в другой аккаунт</span>
              </button>
              <button onClick={() => setShowAccountPicker(false)} className="w-full py-3 px-4 bg-transparent hover:bg-white/5 rounded-xl text-zinc-400 font-medium transition-colors mt-3">
                Отмена
              </button>
            </div>
          </div>
        )}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-white/10 animate-in zoom-in-50 duration-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">{currentUser?.name?.charAt(0)?.toUpperCase() || 'С'}</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{currentUser?.name || 'Слава Иванов'}</h3>
                <p className="text-sm text-zinc-500">@{currentUser?.nickname || 'slava_ivanov'}</p>
              </div>
              <div className="space-y-3">
                <button onClick={handleLogout} className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 text-white hover:opacity-90 active:scale-95" style={{ backgroundColor: '#ef4444' }}>
                  <LogOut size={18} /><span>Выйти</span>
                </button>
                <button onClick={handleSwitchAccount} className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 text-white hover:opacity-90 active:scale-95" style={{ backgroundColor: themeColor }}>
                  <User size={18} /><span>Сменить аккаунт</span>
                </button>
                <button onClick={() => setShowLogoutModal(false)} className="w-full py-3 px-4 bg-transparent hover:bg-white/5 rounded-xl text-zinc-400 font-medium transition-colors">
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-5 w-full max-w-md border border-white/10 animate-in zoom-in-50 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#111] pt-1 z-10">
                <h2 className="text-xl font-bold" style={{ color: themeColor }}>Редактировать профиль</h2>
                <button onClick={() => setShowEditProfile(false)} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={18} className="text-zinc-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Имя</label>
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-black/50 rounded-xl px-3 py-2.5 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors" maxLength={50} />
                  <p className="text-[10px] text-zinc-600 text-right mt-0.5">{editName.length}/50</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">О себе</label>
                  <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} rows={2} className="w-full bg-black/50 rounded-xl px-3 py-2.5 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors resize-none" maxLength={150} />
                  <p className="text-[10px] text-zinc-600 text-right mt-0.5">{editBio.length}/150</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Веб-сайт</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">https://</span>
                    <input type="text" value={editWebsite.replace('https://', '')} onChange={(e) => setEditWebsite(`https://${e.target.value}`)} className="w-full bg-black/50 rounded-xl pl-16 pr-3 py-2.5 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors" placeholder="ваш-сайт.ру" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Местоположение</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} className="w-full bg-black/50 rounded-xl pl-9 pr-3 py-2.5 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors" placeholder="Город, страна" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Дата рождения</label>
                  <input type="date" value={editBirthday} onChange={(e) => setEditBirthday(e.target.value)} className="w-full bg-black/50 rounded-xl px-3 py-2.5 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors" />
                  <div className="flex items-center justify-between mt-2 p-2 bg-black/30 rounded-lg">
                    <div className="flex-1">
                      <p className="text-xs font-medium">Показывать дату рождения</p>
                      <p className="text-[10px] text-zinc-500">{showBirthday ? 'Видна всем' : 'Только вы'}</p>
                    </div>
                    <button onClick={() => setShowBirthday(!showBirthday)} className={`w-10 h-5 rounded-full relative transition-colors ${showBirthday ? '' : 'bg-zinc-700'}`} style={{ backgroundColor: showBirthday ? themeColor : undefined }}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${showBirthday ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Пол</label>
                  <select value={editGender} onChange={(e) => setEditGender(e.target.value)} className="w-full bg-black/50 rounded-xl px-3 py-2.5 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors">
                    <option value="">Не указан</option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                    <option value="other">Другой</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-3 sticky bottom-0 bg-[#111] pb-1">
                  <button onClick={handleSaveEditedProfile} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors text-white hover:opacity-90 active:scale-95" style={{ backgroundColor: themeColor }}>
                    Сохранить
                  </button>
                  <button onClick={() => setShowEditProfile(false)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors">
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showNewChatModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-white/10 animate-in zoom-in-50 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: themeColor }}>Новый чат</h2>
                <button onClick={() => { setShowNewChatModal(false); setSearchUserQuery(''); setFoundUsers([]); }} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400 block mb-2">Поиск пользователя</label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input type="text" value={searchUserQuery} onChange={(e) => setSearchUserQuery(e.target.value)} onKeyUp={(e) => e.key === 'Enter' && searchUsers()} placeholder="Введите никнейм или имя..." className="w-full bg-black/50 rounded-xl pl-10 pr-4 py-3 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors" />
                  </div>
                  <button onClick={searchUsers} className="w-full mt-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                    Найти
                  </button>
                </div>
                {foundUsers.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-500">Найдено пользователей:</p>
                    {foundUsers.map((user) => (
                      <div key={user.id} onClick={() => createNewChat(user.id, user.name || user.nickname)} className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{user.name?.charAt(0) || user.nickname?.charAt(0) || '?'}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{user.name || 'Пользователь'}</p>
                          <p className="text-xs text-zinc-500">@{user.nickname}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {searchUserQuery && foundUsers.length === 0 && (
                  <p className="text-center text-zinc-500 py-4 text-sm">Пользователи не найдены</p>
                )}
              </div>
            </div>
          </div>
        )}
        {showCreateGroupModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-white/10 animate-in zoom-in-50 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: themeColor }}>Создать группу</h2>
                <button onClick={() => { setShowCreateGroupModal(false); setSelectedUsers([]); setGroupName(''); }} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400 block mb-2">Название группы (необязательно)</label>
                  <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Введите название..." className="w-full bg-black/50 rounded-xl px-4 py-3 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="text-sm text-zinc-400 block mb-2">Добавить участников</label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input type="text" value={searchUserQuery} onChange={(e) => setSearchUserQuery(e.target.value)} onKeyUp={(e) => e.key === 'Enter' && searchUsers()} placeholder="Поиск по имени или никнейму..." className="w-full bg-black/50 rounded-xl pl-10 pr-4 py-3 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>
                {selectedUsers.length > 0 && (
                  <div>
                    <p className="text-xs text-zinc-500 mb-2">Выбрано: {selectedUsers.length}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedUsers.map((user) => (
                        <div key={user.id} className="flex items-center gap-2 bg-blue-500/20 rounded-full pl-2 pr-1 py-1 border border-blue-500/30">
                          <span className="text-xs">{user.name || user.nickname}</span>
                          <button onClick={() => removeSelectedUser(user.id)} className="w-5 h-5 rounded-full hover:bg-blue-500/30 flex items-center justify-center">
                            <X size={12} className="text-blue-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {foundUsers.length > 0 && (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    <p className="text-xs text-zinc-500">Найдено пользователей:</p>
                    {foundUsers.map((user) => {
                      const isSelected = selectedUsers.some(u => u.id === user.id);
                      return (
                        <div key={user.id} onClick={() => { if (!isSelected) setSelectedUsers(prev => [...prev, user]); }} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-blue-500/20 opacity-50 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10'}`}>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{user.name?.charAt(0) || user.nickname?.charAt(0) || '?'}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{user.name || 'Пользователь'}</p>
                            <p className="text-xs text-zinc-500">@{user.nickname}</p>
                          </div>
                          {isSelected && <CheckCheck size={18} className="text-blue-400" />}
                        </div>
                      );
                    })}
                  </div>
                )}
                <button onClick={createGroupChat} disabled={selectedUsers.length < 2} className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Создать группу ({selectedUsers.length + 1} участников)
                </button>
              </div>
            </div>
          </div>
        )}
        {showGroupInfo && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-purple-500/30 animate-in zoom-in-50 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: themeColor }}>{selectedChat?.name}</h2>
                <button onClick={() => setShowGroupInfo(false)} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-zinc-400 mb-2">Участники ({groupParticipants.length})</p>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {groupParticipants.map((participant: any) => (
                    <div key={participant.id} className="flex items-center gap-3 p-2 bg-white/5 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {participant.name?.charAt(0) || participant.nickname?.charAt(0) || '?'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{participant.name || 'Пользователь'}</p>
                        <p className="text-xs text-zinc-500">@{participant.nickname}</p>
                      </div>
                      {participant.id === currentUser?.id && (
                        <span className="text-xs text-zinc-500">Это вы</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {showAddParticipantsModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-white/10 animate-in zoom-in-50 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: themeColor }}>Добавить участников</h2>
                <button onClick={() => { setShowAddParticipantsModal(false); setSelectedUsers([]); }} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input type="text" value={searchUserQuery} onChange={(e) => setSearchUserQuery(e.target.value)} onKeyUp={(e) => e.key === 'Enter' && searchUsers()} placeholder="Поиск пользователей..." className="w-full bg-black/50 rounded-xl pl-10 pr-4 py-3 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>
                {selectedUsers.length > 0 && (
                  <div>
                    <p className="text-xs text-zinc-500 mb-2">Выбрано: {selectedUsers.length}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedUsers.map((user) => (
                        <div key={user.id} className="flex items-center gap-2 bg-blue-500/20 rounded-full pl-2 pr-1 py-1 border border-blue-500/30">
                          <span className="text-xs">{user.name || user.nickname}</span>
                          <button onClick={() => setSelectedUsers(prev => prev.filter(u => u.id !== user.id))} className="w-5 h-5 rounded-full hover:bg-blue-500/30 flex items-center justify-center">
                            <X size={12} className="text-blue-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {foundUsers.length > 0 && (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    <p className="text-xs text-zinc-500">Найдено пользователей:</p>
                    {foundUsers.map((user) => {
                      const isSelected = selectedUsers.some(u => u.id === user.id);
                      const alreadyInGroup = selectedChat?.participants.includes(user.id);
                      if (alreadyInGroup) return null;
                      return (
                        <div key={user.id} onClick={() => { if (!isSelected) setSelectedUsers(prev => [...prev, user]); }} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-blue-500/20 opacity-50 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10'}`}>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{user.name?.charAt(0) || user.nickname?.charAt(0) || '?'}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{user.name || 'Пользователь'}</p>
                            <p className="text-xs text-zinc-500">@{user.nickname}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <button onClick={() => addParticipantsToGroup(selectedUsers.map(u => u.id))} disabled={selectedUsers.length === 0} className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Добавить ({selectedUsers.length})
                </button>
              </div>
            </div>
          </div>
        )}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-white/10 animate-in zoom-in-50 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: themeColor }}>Пригласить друзей</h2>
                <button onClick={() => { setShowInviteModal(false); setInviteCopied(false); }} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400 mb-4">
                Поделитесь этой ссылкой с друзьями, чтобы они могли присоединиться к тестированию:
              </p>
              <div className="flex items-center gap-2 mb-6">
                <input type="text" value={inviteLink} readOnly className="flex-1 bg-black/50 rounded-xl px-4 py-3 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors" />
                <button onClick={() => { navigator.clipboard.writeText(inviteLink); setInviteCopied(true); setTimeout(() => setInviteCopied(false), 2000); }} className="p-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors" title="Копировать">
                  <Copy size={18} className="text-white" />
                </button>
              </div>
              {inviteCopied && (
                <div className="mb-4 p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                  <p className="text-sm text-green-400">Ссылка скопирована!</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => { const text = encodeURIComponent('Присоединяйся к тестированию Linker Pro! ' + inviteLink); window.open('https://wa.me/?text=' + text); }} className="p-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <span className="text-sm">WhatsApp</span>
                </button>
                <button onClick={() => { const url = encodeURIComponent(inviteLink); const text = encodeURIComponent('Присоединяйся к тестированию Linker Pro!'); window.open('https://t.me/share/url?url=' + url + '&text=' + text); }} className="p-3 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <span className="text-sm">Telegram</span>
                </button>
              </div>
              <button onClick={() => setShowInviteModal(false)} className="w-full mt-3 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors">
                Закрыть
              </button>
            </div>
          </div>
        )}

        {/* МОДАЛКА ЗАЯВОК В ДРУЗЬЯ */}
        {showFriendRequestsModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-white/10 animate-in zoom-in-50 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: themeColor }}>Заявки в друзья</h2>
                <button
                  onClick={() => setShowFriendRequestsModal(false)}
                  className="p-1 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>

              {friendRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Bell size={48} className="mx-auto mb-3 text-zinc-600" />
                  <p className="text-zinc-500">Нет входящих заявок</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {friendRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {request.fromUserName?.charAt(0) || '?'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{request.fromUserName}</p>
                          <p className="text-xs text-zinc-500">@{request.fromUserNickname}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => acceptFriendRequest(request.id, request.fromUserId, request.fromUserName)}
                          className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                          title="Принять"
                        >
                          <CheckCheck size={16} className="text-green-400" />
                        </button>
                        <button
                          onClick={() => rejectFriendRequest(request.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                          title="Отклонить"
                        >
                          <X size={16} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {showTesterInviteModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-purple-500/30 animate-in zoom-in-50 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: themeColor }}>Вступить в тестирование</h2>
                <button onClick={() => setShowTesterInviteModal(false)} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400 mb-4">Введите код приглашения:</p>
              <div className="space-y-4">
                <input type="text" value={testerInviteCode} onChange={(e) => setTesterInviteCode(e.target.value.toUpperCase())} placeholder="TEST123" className="w-full bg-black/50 rounded-xl px-4 py-3 text-sm border border-white/5 outline-none focus:border-purple-500 transition-colors text-center text-lg font-mono" maxLength={10} />
                <button onClick={() => { activateTester(testerInviteCode); setTesterInviteCode(''); }} disabled={!testerInviteCode} className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
                  Активировать
                </button>
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <p className="text-xs text-purple-400 font-medium mb-1">🎯 Демо-коды:</p>
                  <p className="text-xs text-zinc-400">TEST123, BETA2024, DEBUGGER, TESTER123, ALPHA2024</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {showTesterStats && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-2xl border border-purple-500/30 animate-in zoom-in-50 duration-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <FlaskConical size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: themeColor }}>Кабинет тестировщика</h2>
                    <p className="text-sm text-zinc-400">@{currentUser?.nickname}</p>
                  </div>
                </div>
                <button onClick={() => setShowTesterStats(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 mb-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">Уровень тестировщика</span>
                  <span className="text-2xl font-bold text-purple-400">{testerLevel}</span>
                </div>
                <div className="w-full h-2 bg-purple-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${(experimentsCount % 10) * 10}%` }} />
                </div>
                <p className="text-xs text-zinc-500 mt-2">{10 - (experimentsCount % 10)} экспериментов до следующего уровня</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">🧪</span><span className="text-sm text-zinc-400">Эксперименты</span></div>
                  <p className="text-3xl font-bold">{experimentsCount}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">🐛</span><span className="text-sm text-zinc-400">Найдено багов</span></div>
                  <p className="text-3xl font-bold">{bugsFound}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">⏱️</span><span className="text-sm text-zinc-400">Время тестов</span></div>
                  <p className="text-3xl font-bold">{Math.floor(testTime / 60)}ч {testTime % 60}м</p>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">🎯</span><span className="text-sm text-zinc-400">Функций</span></div>
                  <p className="text-3xl font-bold">{testedFeatures.length}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <span>🏆 Достижения</span>
                  <span className="text-xs text-zinc-500">{achievements.length}/∞</span>
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {achievements.length > 0 ? achievements.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-black/30 rounded-xl border border-white/5">
                      <span className="text-2xl">{a.split(' ')[0]}</span>
                      <div>
                        <p className="text-sm font-medium">{a}</p>
                        <p className="text-xs text-zinc-500">Получено за тестирование</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-sm text-zinc-600 text-center py-4">Пока нет достижений.</p>
                  )}
                </div>
              </div>
              <button onClick={() => setShowTesterStats(false)} className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors">
                Закрыть
              </button>
            </div>
          </div>
        )}
        {showThemeSettings && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-5 w-full max-w-md border border-white/10 animate-in zoom-in-50 duration-200 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#111] pt-1 z-10">
                <h2 className="text-xl font-bold" style={{ color: themeColor }}>Оформление</h2>
                <button onClick={() => setShowThemeSettings(false)} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={18} className="text-zinc-400" />
                </button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium block mb-3">Режим</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setThemeMode('dark')} className={`p-4 rounded-xl border transition-all ${themeMode === 'dark' ? 'text-white' : 'text-zinc-400 border-white/5 bg-black/30 hover:bg-black/50'}`} style={{ backgroundColor: themeMode === 'dark' ? `${themeColor}20` : 'transparent' }}>
                      <Moon size={20} className={themeMode === 'dark' ? 'text-white' : 'text-zinc-400'} />
                      <p className={`text-sm font-medium ${themeMode === 'dark' ? 'text-white' : 'text-zinc-400'}`}>Тёмная</p>
                    </button>
                    <button onClick={() => setThemeMode('light')} className={`p-4 rounded-xl border transition-all ${themeMode === 'light' ? 'text-white' : 'text-zinc-400 border-white/5 bg-black/30 hover:bg-black/50'}`} style={{ backgroundColor: themeMode === 'light' ? `${themeColor}20` : 'transparent' }}>
                      <Sun size={20} className={themeMode === 'light' ? 'text-white' : 'text-zinc-400'} />
                      <p className={`text-sm font-medium ${themeMode === 'light' ? 'text-white' : 'text-zinc-400'}`}>Светлая</p>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-3">Акцентный цвет</label>
                  <div className="grid grid-cols-5 gap-2">
                    {['#3b82f6', '#8b5cf6', '#ec4899', '#22c55e', '#f97316'].map((color) => (
                      <button key={color} onClick={() => setThemeColor(color)} className="flex flex-col items-center gap-1">
                        <div className={`w-10 h-10 rounded-full transition-all ${themeColor === color ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`} style={{ backgroundColor: color }} />
                        <span className="text-[10px] text-zinc-500">{color === '#3b82f6' ? 'Синий' : color === '#8b5cf6' ? 'Фиол' : color === '#ec4899' ? 'Роз' : color === '#22c55e' ? 'Зел' : 'Оранж'}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-3">Стиль</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => setThemeStyle('gradient')} className={`p-3 rounded-xl border transition-all ${themeStyle === 'gradient' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-black/30 hover:bg-black/50'}`}>
                      <div className="w-full h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 mb-2" />
                      <p className={`text-xs ${themeStyle === 'gradient' ? 'text-white' : 'text-zinc-400'}`}>Градиент</p>
                    </button>
                    <button onClick={() => setThemeStyle('solid')} className={`p-3 rounded-xl border transition-all ${themeStyle === 'solid' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-black/30 hover:bg-black/50'}`}>
                      <div className="w-full h-8 rounded-lg bg-blue-500 mb-2" />
                      <p className={`text-xs ${themeStyle === 'solid' ? 'text-white' : 'text-zinc-400'}`}>Сплошной</p>
                    </button>
                    <button onClick={() => setThemeStyle('minimal')} className={`p-3 rounded-xl border transition-all ${themeStyle === 'minimal' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-black/30 hover:bg-black/50'}`}>
                      <div className="w-full h-8 rounded-lg bg-zinc-800 border border-white/10 mb-2" />
                      <p className={`text-xs ${themeStyle === 'minimal' ? 'text-white' : 'text-zinc-400'}`}>Минимал</p>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-3">Эффекты</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                      <div>
                        <p className="text-sm font-medium">Размытие фона</p>
                        <p className="text-xs text-zinc-500">Эффект стекла в панелях</p>
                      </div>
                      <button onClick={() => setThemeBlur(!themeBlur)} className={`w-12 h-6 rounded-full relative transition-colors ${themeBlur ? '' : 'bg-zinc-700'}`} style={{ backgroundColor: themeBlur ? themeColor : undefined }}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${themeBlur ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl">
                      <div>
                        <p className="text-sm font-medium">Анимации</p>
                        <p className="text-xs text-zinc-500">Плавные переходы</p>
                      </div>
                      <button onClick={() => setThemeAnimations(!themeAnimations)} className={`w-12 h-6 rounded-full relative transition-colors ${themeAnimations ? '' : 'bg-zinc-700'}`} style={{ backgroundColor: themeAnimations ? themeColor : undefined }}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${themeAnimations ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-3 sticky bottom-0 bg-[#111] pb-1">
                  <button onClick={() => { handleSaveTheme(); setShowThemeSettings(false); }} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors text-white hover:opacity-90 active:scale-95" style={{ backgroundColor: themeColor }}>
                    Применить тему
                  </button>
                  <button onClick={() => setShowThemeSettings(false)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors">
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showAdminPanel && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-5 w-full max-w-3xl border border-white/10 animate-in zoom-in-50 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#111] pt-1 z-10">
                <div className="flex items-center gap-2">
                  <Crown size={20} className="text-purple-500" />
                  <h2 className="text-xl font-bold" style={{ color: themeColor }}>Управление пользователями</h2>
                </div>
                <button onClick={() => setShowAdminPanel(false)} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={18} className="text-zinc-400" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-black/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-500">Всего пользователей</p>
                  <p className="text-2xl font-bold">{allUsers.length}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-500">Администраторов</p>
                  <p className="text-2xl font-bold">{allUsers.filter((u: any) => u.role === 'admin' || u.role === 'developer').length}</p>
                </div>
                <div className="bg-black/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-500">Модераторов</p>
                  <p className="text-2xl font-bold">{allUsers.filter((u: any) => u.role === 'moderator').length}</p>
                </div>
              </div>
              <div className="space-y-2">
                {allUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-black/30 hover:bg-black/50 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {user.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{user.name || 'Пользователь'}</p>
                          {user.role && user.role !== 'user' && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${user.role === 'admin' || user.role === 'developer' ? 'bg-purple-500/20 text-purple-400' : user.role === 'moderator' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                              {user.role === 'developer' ? 'Разработчик' : user.role === 'admin' ? 'Админ' : user.role === 'moderator' ? 'Модератор' : user.role === 'helper' ? 'Хелпер' : ''}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500">@{user.nickname}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select value={user.role || 'user'} onChange={async (e) => { const newRole = e.target.value; try { await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'update', userData: { userId: user.id, role: newRole } }) }); await loadAllUsers(); } catch (error) { console.error('Ошибка обновления роли:', error); } }} className="bg-black/50 rounded-lg px-2 py-1 text-xs border border-white/5 outline-none focus:border-blue-500">
                        <option value="user">Пользователь</option>
                        <option value="helper">Хелпер</option>
                        <option value="moderator">Модератор</option>
                        <option value="admin">Администратор</option>
                        <option value="developer">Разработчик</option>
                      </select>
                      <button className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {showLogsModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-4xl border border-blue-500/30 animate-in zoom-in-50 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#111] pt-1 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <History size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: themeColor }}>Логи действий модераторов</h2>
                    <p className="text-xs text-zinc-500">Всего записей: {moderatorLogs.length}</p>
                  </div>
                </div>
                <button onClick={() => setShowLogsModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>
              <div className="flex gap-2 mb-4">
                <button onClick={() => setLogsFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs ${logsFilter === 'all' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white/5 hover:bg-white/10'}`}>
                  Все
                </button>
                <button onClick={() => setLogsFilter('role')}
                  className={`px-3 py-1 rounded-lg text-xs ${logsFilter === 'role' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-white/5 hover:bg-white/10'}`}>
                  Изменения ролей
                </button>
                <button onClick={() => setLogsFilter('delete')}
                  className={`px-3 py-1 rounded-lg text-xs ${logsFilter === 'delete' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/5 hover:bg-white/10'}`}>
                  Удаления
                </button>
              </div>
              <div className="space-y-2">
                {moderatorLogs
                  .filter(log => {
                    if (logsFilter === 'role') return log.action.includes('роль');
                    if (logsFilter === 'delete') return log.action.includes('Удалил');
                    return true;
                  })
                  .map(log => (
                    <div key={log.id} className="p-3 bg-black/30 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-bold">
                            {log.moderatorName?.charAt(0) || '?'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{log.moderatorName}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                              {log.moderatorRole}
                            </span>
                            <span className="text-[10px] text-zinc-600">
                              {new Date(log.timestamp).toLocaleString('ru-RU')}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-300">{log.action}</p>
                          {log.details && (
                            <p className="text-xs text-zinc-500 mt-1">📌 {log.details}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {currentUser?.role === 'developer' && moderatorLogs.length > 0 && (
                <button onClick={clearModeratorLogs}
                  className="w-full mt-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-sm text-red-400 transition-colors">
                  Очистить все логи
                </button>
              )}
            </div>
          </div>
        )}
        {showLevelUpModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in-50 duration-300">
            <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-2xl p-8 max-w-md text-center border border-white/10 shadow-2xl">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white font-black text-5xl">{userLevel}</span>
              </div>
              <h2 className="text-3xl font-black mb-2 text-white">LEVEL UP!</h2>
              <p className="text-zinc-300 mb-6">Поздравляем! Ты достиг {userLevel} уровня!</p>
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-sm text-zinc-400">Награда за уровень:</p>
                <p className="text-lg font-bold text-yellow-400">
                  {userLevel === 2 && '🎨 Новая цветовая тема'}
                  {userLevel === 3 && '🏷️ Особый бейдж'}
                  {userLevel === 4 && '🎨 Ещё 2 темы'}
                  {userLevel === 5 && '👑 Золотая рамка'}
                  {userLevel >= 6 && '✨ Особые эффекты'}
                </p>
              </div>
              <button onClick={() => setShowLevelUpModal(false)} className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl font-bold text-white hover:scale-105 transition-transform">
                ЗАБРАТЬ НАГРАДУ
              </button>
            </div>
          </div>
        )}
        {showTestNotification && (
          <div className="fixed bottom-4 right-4 z-[100] animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-[#1a1a1a] border border-purple-500/30 rounded-xl shadow-2xl p-4 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <FlaskConical size={16} className="text-purple-400" />
                </div>
                <p className="text-sm text-zinc-300">{testNotificationMessage}</p>
              </div>
              <div className="mt-2 h-1 w-full bg-purple-500/20 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full animate-shrink" style={{ animation: 'shrink 3s linear forwards' }} />
              </div>
            </div>
          </div>
        )}
        {showWelcomeModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="bg-[#111] rounded-2xl p-8 max-w-md text-center border border-white/10 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🧪</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">
                Привет, {currentUser?.name}! 👋
              </h2>
              <p className="text-zinc-400 text-sm mb-6">
                Ты успешно присоединился к программе тестирования Linker Pro!
              </p>
              <div className="bg-purple-500/10 rounded-xl p-4 mb-6 border border-purple-500/30">
                <p className="text-purple-400 font-medium mb-3">🎁 Твои бонусы:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-xs text-purple-400">+100 XP</span>
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-xs text-purple-400">🔬 Тест-функции</span>
                  <span className="px-3 py-1 bg-purple-500/20 rounded-full text-xs text-purple-400">🏷️ Бейдж</span>
                </div>
              </div>
              <p className="text-xs text-zinc-600 mb-4">
                Спасибо, что помогаешь нам становиться лучше!
              </p>
              <button
                onClick={() => setShowWelcomeModal(false)}
                className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
        {showMediaModal && selectedFile && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-purple-500/30 animate-in zoom-in-50 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: themeColor }}>
                  {selectedFile.type.startsWith('image/') ? 'Загрузка изображения' : 'Загрузка файла'}
                </h2>
                <button onClick={cancelUpload} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>
              {imagePreview && (
                <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                </div>
              )}
              <div className="bg-black/30 rounded-xl p-4 mb-4">
                <p className="text-sm font-medium text-white mb-1">{selectedFile.name}</p>
                <p className="text-xs text-zinc-500">{formatFileSize(selectedFile.size)}</p>
              </div>
              {uploadProgress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>Загрузка...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={uploadFile}
                  disabled={uploadProgress > 0}
                  className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {uploadProgress > 0 ? 'Загрузка...' : 'Отправить'}
                </button>
                <button
                  onClick={cancelUpload}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}

        {/* МОДАЛКА СОЗДАНИЯ ПОСТА */}
        {showCreatePostModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-lg border border-white/10 animate-in zoom-in-50 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: themeColor }}>Создать пост</h2>
                <button
                  onClick={() => {
                    setShowCreatePostModal(false);
                    setNewPostText('');
                    setNewPostImage(null);
                  }}
                  className="p-1 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>

              <div className="space-y-4">
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Что у вас нового?"
                  rows={4}
                  className="w-full bg-black/50 rounded-xl px-4 py-3 text-sm border border-white/5 outline-none focus:border-blue-500 transition-colors resize-none"
                />

                {newPostImage && (
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={newPostImage} alt="Preview" className="w-full h-48 object-cover" />
                    <button
                      onClick={() => setNewPostImage(null)}
                      className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black/80 rounded-lg transition-colors"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                )}

                <div className="flex gap-2">
                  <label className="flex-1 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <Camera size={16} className="text-purple-400" />
                    <span>Добавить фото</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePostImageSelect}
                    />
                  </label>

                  <button
                    onClick={createPost}
                    disabled={!newPostText.trim() && !newPostImage}
                    className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Опубликовать
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
}