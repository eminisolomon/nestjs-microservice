import { ApiBadRequestException } from './exception';

export class CollectionUtil {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static groupBy = (collection: unknown[] = [], key: string): { [key: string]: any[] } => {
    if (!key.length) {
      throw new ApiBadRequestException();
    }

    return collection.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {}) as { [key: string]: [] };
  };

  static group = (collection: unknown[]) => {
    return collection.reduce(function (rv, x: string | number) {
      (rv[x] = rv[x] || []).push(x);
      return rv;
    }, {});
  };

  static maxBy = (collection: unknown[] = [], key: string) => {
    if (!key.length) {
      throw new ApiBadRequestException('key is required');
    }

    return collection.reduce((prev, current) => {
      return Number(prev[key] > current[key]) ? prev : current;
    });
  };

  static max = (collection: string[] | number[]) => {
    return Math.max(...collection.map((c: number | string) => Number(c)));
  };

  static minBy = (collection: unknown[] = [], key: string) => {
    if (!key.length) {
      throw new ApiBadRequestException('key is required');
    }

    return collection.reduce((prev, current) => {
      return Number(prev[key] > current[key]) ? current : prev;
    });
  };

  static min = (collection: string[] | number[]) => {
    return Math.min(...collection.map((c: number | string) => Number(c)));
  };

  static sum = (collection: unknown[] = []) => {
    return collection.reduce((prev, current): number => {
      return Number(prev) + Number(current);
    });
  };

  static sumBy = (collection: unknown[] = [], key: string) => {
    if (!key.length) {
      throw new ApiBadRequestException('key is required');
    }

    return collection.reduce((prev, current): number => {
      if (isNaN(prev[key] || 0)) {
        return 0 + Number(current[key]);
      }

      if (prev[key]) {
        return Number(prev[key]) + Number(current[key]);
      }

      return Number(prev) + Number(current[key]);
    });
  };

  static hasDuplicated = (collection: unknown[] = []) => {
    return new Set(collection).size !== collection.length;
  };

  static hasDuplicatedBy = (collection: unknown[] = [], key: string) => {
    if (!key.length) {
      throw new ApiBadRequestException('key is required');
    }

    return new Set(collection.map((c) => c[key])).size !== collection.length;
  };

  static getMaxLengthPerKey = (collection: unknown[] = [], key: string): LastType => {
    if (!key.length) {
      throw new ApiBadRequestException('key is required');
    }

    const lastHash: LastType = {
      length: 0,
      key: null
    };

    collection.reduce((prev: { [key: string]: string[] }, next: { [key: string]: string }) => {
      const length = (prev[next[key]] = prev[next[key]] || []).push(next.name);

      if (length > lastHash.length) {
        lastHash.key = next.name;
        lastHash.length = length;
      }

      return prev;
    }, {});

    return lastHash;
  };
}

export type LastType = {
  key: string;
  length: number | null;
};
