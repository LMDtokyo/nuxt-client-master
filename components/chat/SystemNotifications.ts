export const systemNotifications = {
    bossKill: (playerName: string, bossName: string) =>
        `Игрок ${playerName} убил мирового босса ${bossName}!`,

    locationOpened: (locationName: string) =>
        `Новая локация открыта: ${locationName}! Исследуйте её сейчас!`,

    monsterAppeared: (monsterName: string) =>
        `Новый монстр обнаружен: ${monsterName}! Готовьтесь к битве!`,

    portCaptured: (fleetName: string) =>
        `Порт захвачен флотом ${fleetName}! Контроль на 24 часа!`,

    lotteryWin: (playerName: string) =>
        `Игрок ${playerName} выиграл лотерею! Поздравляем!`
};
