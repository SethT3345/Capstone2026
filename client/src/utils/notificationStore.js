// Simple localStorage-backed notification store for admin notifications
export function getNotifications() {
  try {
    const raw = localStorage.getItem('adminNotifications');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function setNotifications(items) {
  try {
    localStorage.setItem('adminNotifications', JSON.stringify(items));
  } catch (e) {
    // ignore storage errors
  }
}

export function seedIfEmpty() {
  const existing = getNotifications();
  if (!existing || existing.length === 0) {
    const seed = [
      {
        id: 1,
        title: 'New user signup',
        body: 'A new user signed up and is awaiting verification.',
        read: false,
      },
      {
        id: 2,
        title: 'Course published',
        body: 'The course "React Basics" was published.',
        read: false,
      },
      {
        id: 3,
        title: 'Payment received',
        body: 'A payment was successfully processed.',
        read: false,
      },
    ];
    setNotifications(seed);
    return seed;
  }
  return existing;
}

export function getUnreadCount() {
  const items = getNotifications();
  return items.filter((i) => !i.read).length;
}

export function markAllRead() {
  const items = getNotifications().map((i) => ({ ...i, read: true }));
  setNotifications(items);
  return items;
}

export function markRead(id) {
  const items = getNotifications().map((i) => (i.id === id ? { ...i, read: true } : i));
  setNotifications(items);
  return items;
}
