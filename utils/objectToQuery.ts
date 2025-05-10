import { isNil } from 'lodash';

export default (obj: Record<string, unknown>) => {
    let query: string[] = [];

    Object.entries(obj).forEach(([key, value]) => {
        let queryValue = value;

        if (Array.isArray(value)) {
            queryValue = value.join(',');
        }

        if (!isNil(value)) {
            query.push(`${key}=${queryValue}`);
        }
    });

    return `?${query.join('&')}`;
};
