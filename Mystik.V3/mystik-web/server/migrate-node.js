import { initDatabase, getDatabase } from './db.js';

console.log('Starting database migration...');

try {
  // Инициализируем базу данных
  initDatabase();
  const db = getDatabase();
  
  console.log('Database initialized successfully');
  
  // Проверяем, есть ли данные в таблицах
  const quizzesCount = db.prepare('SELECT COUNT(*) as count FROM quizzes').get().count;
  const spreadsCount = db.prepare('SELECT COUNT(*) as count FROM tarot_spreads').get().count;
  const cardsCount = db.prepare('SELECT COUNT(*) as count FROM tarot_cards').get().count;
  
  console.log(`Current data: ${quizzesCount} quizzes, ${spreadsCount} spreads, ${cardsCount} cards`);
  
  // Если данных нет, добавляем базовые данные
  if (quizzesCount === 0) {
    console.log('Adding basic quizzes...');
    
    // Добавляем базовые тесты
    const quizzes = [
      {
        id: 'strengths',
        title: 'Тест по методике Клифтона',
        description: 'Узнайте свои сильные стороны и как их использовать',
        is_premium: 1,
        questions: JSON.stringify([
          { question: "Я легко подстраиваюсь под неожиданно меняющиеся ситуации", options: ["Совсем не характерно", "Малозаметно", "Частично", "Достаточно характерно", "Полностью характерно"] }
        ])
      },
      {
        id: 'paei',
        title: 'PAEI тест',
        description: 'Определите свой управленческий стиль',
        is_premium: 0,
        questions: JSON.stringify([
          { question: "Я предпочитаю четкие инструкции", options: ["Да", "Скорее да", "Не знаю", "Скорее нет", "Нет"] }
        ])
      }
    ];
    
    const insertQuiz = db.prepare('INSERT OR IGNORE INTO quizzes (id, title, description, is_premium, questions) VALUES (?, ?, ?, ?, ?)');
    quizzes.forEach(quiz => {
      insertQuiz.run(quiz.id, quiz.title, quiz.description, quiz.is_premium, quiz.questions);
    });
  }
  
  if (spreadsCount === 0) {
    console.log('Adding basic tarot spreads...');
    
    const spreads = [
      {
        id: 'daily',
        name: 'Карта дня',
        description: 'Одна карта, которая покажет энергию дня',
        card_count: 1,
        positions: JSON.stringify(['Энергия дня']),
        is_premium: 0
      },
      {
        id: 'three',
        name: 'Три карты',
        description: 'Прошлое, настоящее и будущее',
        card_count: 3,
        positions: JSON.stringify(['Прошлое', 'Настоящее', 'Будущее']),
        is_premium: 0
      }
    ];
    
    const insertSpread = db.prepare('INSERT OR IGNORE INTO tarot_spreads (id, name, description, card_count, positions, is_premium) VALUES (?, ?, ?, ?, ?, ?)');
    spreads.forEach(spread => {
      insertSpread.run(spread.id, spread.name, spread.description, spread.card_count, spread.positions, spread.is_premium);
    });
  }
  
  if (cardsCount === 0) {
    console.log('Adding basic tarot cards...');
    
    const cards = [
      { id: '0', number: '0', name: 'Шут', symbol: '🃏', meaning: 'Новые начинания' },
      { id: '1', number: 'I', name: 'Маг', symbol: '🎩', meaning: 'Сила воли' },
      { id: '2', number: 'II', name: 'Верховная Жрица', symbol: '🔮', meaning: 'Интуиция' }
    ];
    
    const insertCard = db.prepare('INSERT OR IGNORE INTO tarot_cards (id, number, name, symbol, meaning) VALUES (?, ?, ?, ?, ?)');
    cards.forEach(card => {
      insertCard.run(card.id, card.number, card.name, card.symbol, card.meaning);
    });
  }
  
  console.log('Migration completed!');
  
  process.exit(0);
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}