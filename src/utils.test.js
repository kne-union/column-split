import { calculateResizeValues, hideColumn, showColumn, calculateInitialValue, getColumnMin, getColumnMax } from './utils';

describe('utils', () => {
  describe('calculateResizeValues', () => {
    const activeColumns = [
      { name: 'a', title: 'A' },
      { name: 'b', title: 'B' },
      { name: 'c', title: 'C' }
    ];
    const disabledColumns = [{ name: 'd', title: 'D' }];

    it('should calculate new values based on sizes', () => {
      const sizes = [100, 200, 200]; // total: 500
      const currentValue = { a: 0.2, b: 0.4, c: 0.4, d: 0 };
      const result = calculateResizeValues(activeColumns, sizes, currentValue, disabledColumns);

      expect(result.a).toBeCloseTo(0.2, 2);
      expect(result.b).toBeCloseTo(0.4, 2);
      expect(result.c).toBeCloseTo(0.4, 2);
      expect(result.d).toBe(0);
    });

    it('should ensure total equals 1', () => {
      const sizes = [150, 150, 200]; // total: 500
      const currentValue = { a: 0.3, b: 0.3, c: 0.4 };
      const result = calculateResizeValues(activeColumns, sizes, currentValue);

      const total = Object.values(result).reduce((sum, v) => sum + v, 0);
      expect(total).toBeCloseTo(1, 2);
    });

    it('should return current value if activeColumns is empty', () => {
      const currentValue = { a: 0.5, b: 0.5 };
      const result = calculateResizeValues([], [100, 100], currentValue);
      expect(result).toBe(currentValue);
    });

    it('should handle two columns', () => {
      const twoColumns = [
        { name: 'a', title: 'A' },
        { name: 'b', title: 'B' }
      ];
      const sizes = [300, 200]; // total: 500
      const currentValue = { a: 0.5, b: 0.5 };
      const result = calculateResizeValues(twoColumns, sizes, currentValue);

      expect(result.a).toBeCloseTo(0.6, 2);
      expect(result.b).toBeCloseTo(0.4, 2);
    });
  });

  describe('hideColumn', () => {
    const activeColumns = [
      { name: 'a', title: 'A' },
      { name: 'b', title: 'B' },
      { name: 'c', title: 'C' }
    ];

    it('should hide column and distribute its value to others', () => {
      const currentValue = { a: 0.33, b: 0.33, c: 0.34 };
      const result = hideColumn(currentValue, activeColumns[0], activeColumns);

      expect(result.a).toBe(0);
      expect(result.b).toBeGreaterThan(0.33);
      expect(result.c).toBeGreaterThan(0.34);
    });

    it('should return null if only one active column', () => {
      const currentValue = { a: 1 };
      const singleColumn = [{ name: 'a', title: 'A' }];
      const result = hideColumn(currentValue, singleColumn[0], singleColumn);

      expect(result).toBeNull();
    });

    it('should return null if no active columns', () => {
      const currentValue = { a: 1 };
      const result = hideColumn(currentValue, { name: 'a' }, []);

      expect(result).toBeNull();
    });

    it('should respect max constraint when hiding', () => {
      const columnsWithMax = [
        { name: 'a', title: 'A' },
        { name: 'b', title: 'B', max: 0.6 },
        { name: 'c', title: 'C', max: 0.6 }
      ];
      const currentValue = { a: 0.5, b: 0.25, c: 0.25 };
      const result = hideColumn(currentValue, columnsWithMax[0], columnsWithMax);

      expect(result.b).toBeLessThanOrEqual(0.6);
      expect(result.c).toBeLessThanOrEqual(0.6);
    });

    it('should return null if not enough space to distribute', () => {
      const columnsWithMax = [
        { name: 'a', title: 'A' },
        { name: 'b', title: 'B', max: 0.51 },
        { name: 'c', title: 'C', max: 0.51 }
      ];
      const currentValue = { a: 0.5, b: 0.5, c: 0 }; // b already at max
      const result = hideColumn(currentValue, columnsWithMax[0], columnsWithMax);

      // Not enough space to hide 'a'
      expect(result).toBeNull();
    });

    it('should ensure total equals 1 after hiding', () => {
      const currentValue = { a: 0.4, b: 0.35, c: 0.25 };
      const result = hideColumn(currentValue, activeColumns[0], activeColumns);

      const total = Object.values(result).reduce((sum, v) => sum + v, 0);
      expect(total).toBeCloseTo(1, 2);
    });
  });

  describe('showColumn', () => {
    const activeColumns = [
      { name: 'a', title: 'A' },
      { name: 'b', title: 'B' }
    ];

    it('should show column and take space from active columns', () => {
      const currentValue = { a: 0.6, b: 0.4, c: 0 };
      const columnToShow = { name: 'c', title: 'C' };
      const result = showColumn(currentValue, columnToShow, activeColumns);

      expect(result.c).toBeGreaterThan(0);
      expect(result.a).toBeLessThan(0.6);
      expect(result.b).toBeLessThan(0.4);
    });

    it('should respect min constraint when showing', () => {
      const columnsWithMin = [
        { name: 'a', title: 'A', min: 0.3 },
        { name: 'b', title: 'B', min: 0.3 }
      ];
      const currentValue = { a: 0.5, b: 0.5, c: 0 };
      const columnToShow = { name: 'c', title: 'C' };
      const result = showColumn(currentValue, columnToShow, columnsWithMin);

      expect(result.a).toBeGreaterThanOrEqual(0.3);
      expect(result.b).toBeGreaterThanOrEqual(0.3);
    });

    it('should respect target column min/max constraints', () => {
      const currentValue = { a: 0.5, b: 0.5, c: 0 };
      const columnToShow = { name: 'c', title: 'C', min: 0.2, max: 0.3 };
      const result = showColumn(currentValue, columnToShow, activeColumns);

      expect(result.c).toBeGreaterThanOrEqual(0.2);
      expect(result.c).toBeLessThanOrEqual(0.3);
    });

    it('should ensure total equals 1 after showing', () => {
      const currentValue = { a: 0.5, b: 0.5, c: 0 };
      const columnToShow = { name: 'c', title: 'C' };
      const result = showColumn(currentValue, columnToShow, activeColumns);

      const total = Object.values(result).reduce((sum, v) => sum + v, 0);
      expect(total).toBeCloseTo(1, 2);
    });

    it('should handle empty active columns', () => {
      const currentValue = { c: 0 };
      const columnToShow = { name: 'c', title: 'C' };
      const result = showColumn(currentValue, columnToShow, []);

      expect(result.c).toBeDefined();
    });
  });

  describe('calculateInitialValue', () => {
    it('should calculate equal distribution', () => {
      const columns = [
        { name: 'a', title: 'A' },
        { name: 'b', title: 'B' },
        { name: 'c', title: 'C' }
      ];
      const result = calculateInitialValue(columns);

      expect(result.a).toBeCloseTo(1 / 3, 10);
      expect(result.b).toBeCloseTo(1 / 3, 10);
      expect(result.c).toBeCloseTo(1 / 3, 10);
    });

    it('should handle two columns', () => {
      const columns = [
        { name: 'a', title: 'A' },
        { name: 'b', title: 'B' }
      ];
      const result = calculateInitialValue(columns);

      expect(result.a).toBe(0.5);
      expect(result.b).toBe(0.5);
    });

    it('should handle single column', () => {
      const columns = [{ name: 'a', title: 'A' }];
      const result = calculateInitialValue(columns);

      expect(result.a).toBe(1);
    });
  });

  describe('getColumnMin', () => {
    it('should return column min if set and greater than default', () => {
      const column = { name: 'a', min: 0.1 };
      expect(getColumnMin(column, 0.01)).toBe(0.1);
    });

    it('should return default min if column min is smaller', () => {
      const column = { name: 'a', min: 0.001 };
      expect(getColumnMin(column, 0.01)).toBe(0.01);
    });

    it('should return default min if column min is not set', () => {
      const column = { name: 'a' };
      expect(getColumnMin(column, 0.01)).toBe(0.01);
    });

    it('should use default defaultMin', () => {
      const column = { name: 'a' };
      expect(getColumnMin(column)).toBe(0.01);
    });
  });

  describe('getColumnMax', () => {
    it('should return column max if set', () => {
      const column = { name: 'a', max: 0.8 };
      expect(getColumnMax(column)).toBe(0.8);
    });

    it('should return 1 if column max is not set', () => {
      const column = { name: 'a' };
      expect(getColumnMax(column)).toBe(1);
    });
  });
});
