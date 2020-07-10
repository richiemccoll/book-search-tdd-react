import fetchMock from 'fetch-mock';

import { FetchError } from 'node-fetch';

import services from './';
import bookVolumesMock from '../mocks/book-volumes.mock.json';

describe('Services', () => {
    afterEach(() => {
        fetchMock.resetHistory();
    });

    it('should generate the correct resource url', () => {
        const result = services.generateSearchResource('Harry Potter');
        expect(result).toEqual('https://www.googleapis.com/books/v1/volumes?q=harry+potter');
    });

    it('should call the service with the correct query', async () => {
        fetchMock.mock(services.generateSearchResource("test"), bookVolumesMock);
        const result = await services.callBooksService('test');
        expect(result.items).toHaveLength(1);
        const [item] = result.items;
        expect(item.volumeInfo.title).toEqual('The Ultimate Harry Potter and Philosophy');
    });

    it('should handle any errors from the service', async () => {
        fetchMock.mock(services.generateSearchResource("invalid"), 404);
        const result = await services.callBooksService('invalid');
        expect(result.error).toEqual(true);
        expect(result.message).toBeInstanceOf(FetchError);
    });
})