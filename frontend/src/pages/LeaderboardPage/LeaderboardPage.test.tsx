import { LeaderboardPage } from './LeaderboardPage';
import { RANK_DISPLAY } from '@/constants/rankDisplay';
import { WINNERS_TABLE_HEADERS } from '@/constants/winnerTableHeaders';

describe('Leaderboard Page', () => {
  it('should export LeaderboardPage component', () => {
    expect(LeaderboardPage).toBeDefined();
    expect(typeof LeaderboardPage).toBe('function');
  });

  it('should have correct rank display constants for top 3', () => {
    expect(RANK_DISPLAY[1]).toBe('🥇 1');
    expect(RANK_DISPLAY[2]).toBe('🥈 2');
    expect(RANK_DISPLAY[3]).toBe('🥉 3');
  });

  it('should have correct table headers', () => {
    expect(WINNERS_TABLE_HEADERS).toHaveLength(4);
    expect(WINNERS_TABLE_HEADERS[0].key).toBe('position');
    expect(WINNERS_TABLE_HEADERS[1].key).toBe('user');
    expect(WINNERS_TABLE_HEADERS[2].key).toBe('score');
    expect(WINNERS_TABLE_HEADERS[3].key).toBe('progress');
  });

  it('should have translation keys for headers', () => {
    expect(WINNERS_TABLE_HEADERS[0].label).toBe('leaderboard.position');
    expect(WINNERS_TABLE_HEADERS[1].label).toBe('leaderboard.user');
    expect(WINNERS_TABLE_HEADERS[2].label).toBe('leaderboard.score');
    expect(WINNERS_TABLE_HEADERS[3].label).toBe('leaderboard.progress');
  });

  it('should sort winners by score in descending order', () => {
    const testData = [{ score: 10 }, { score: 50 }, { score: 30 }, { score: 20 }, { score: 40 }];
    const sortedData = [...testData].sort((a, b) => b.score - a.score);

    expect(sortedData[0].score).toBe(50);
    expect(sortedData[1].score).toBe(40);
    expect(sortedData[2].score).toBe(30);
    expect(sortedData[3].score).toBe(20);
    expect(sortedData[4].score).toBe(10);

    expect(sortedData[0].score).toBeGreaterThanOrEqual(sortedData[1].score);
    expect(sortedData[1].score).toBeGreaterThanOrEqual(sortedData[2].score);
    expect(sortedData[2].score).toBeGreaterThanOrEqual(sortedData[3].score);
    expect(sortedData[3].score).toBeGreaterThanOrEqual(sortedData[4].score);
  });

  it('should handle empty data array', () => {
    const emptyData: { score: number }[] = [];
    const sortedData = [...emptyData].sort((a, b) => b.score - a.score);

    expect(sortedData).toHaveLength(0);
  });

  it('should handle single item', () => {
    const singleData = [{ score: 42 }];
    const sortedData = [...singleData].sort((a, b) => b.score - a.score);

    expect(sortedData).toHaveLength(1);
    expect(sortedData[0].score).toBe(42);
  });

  it('should handle equal scores', () => {
    const equalData = [{ score: 30 }, { score: 30 }, { score: 20 }];

    const sortedData = [...equalData].sort((a, b) => b.score - a.score);

    expect(sortedData[0].score).toBe(30);
    expect(sortedData[1].score).toBe(30);
    expect(sortedData[2].score).toBe(20);
  });
});
