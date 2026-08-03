import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { NewsAggregator } from './newsAggregator.js';

// TODO: Define Mock Server with handlers
const server = setupServer(
  http.get('https://api.technews.com/articles', () => {
    return HttpResponse.json({
      articles: [
        { id: 1, title: 'AI Breakthrough', views: 1000, category: 'tech' },
        { id: 2, title: 'New Framework Released', views: 500, category: 'it' }
      ]
    });
  }),

  http.get('https://api.worldnews.com/latest', () => {
    return HttpResponse.json({
      articles: [
        { id: 3, title: 'Global Summit', views: 2000, category: 'global' }
      ]
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('NewsAggregator', () => {
  test('fetches articles from multiple sources', async () => {
    const aggregator = new NewsAggregator();
    const articles = await aggregator.fetchArticles();

    expect(articles).toHaveLength(3);
    expect(articles[0].title).toBe('AI Breakthrough')
    expect(articles[2].title).toBe('Global Summit')
  });

  test('handles API errors gracefully', async () => {
    // TODO: Test for error handling
    server.use(
      http.get('https://api.technews.com/articles', () => {
        return new HttpResponse(null, { status: 500 })
      })
    );

    const aggregator = new NewsAggregator();
    const articles = await aggregator.fetchArticles();

    expect(articles).toHaveLength(1);
    expect(articles[0].title).toBe('Global Summit')
  });

  test('fetches articles by category', async () => {
    // TODO: Implement test
    server.use(
      http.get('https://api.technews.com/articles?category=it', () => {
        return HttpResponse.json({
          articles: [
            { id: 2, title: 'New Framework Released', views: 500, category: 'it' }
          ]
        });
      })
    )
    const aggregator = new NewsAggregator();
    const articles = await aggregator.fetchByCategory('it');

    expect(articles).toHaveLength(1);
    expect(articles[0].category).toBe('it')
  });

  test('throws error when category is missing', async () => {
    // TODO: Implement test
    const aggregator = new NewsAggregator();

    await expect(aggregator.fetchByCategory(null)).rejects.toThrow('Category is required')
    await expect(aggregator.fetchByCategory('')).rejects.toThrow('Category is required')
  });

  test('returns top headlines sorted by views', async () => {
    // TODO: Implement test
    const aggregator = new NewsAggregator();

    const headlines = await aggregator.getTopHeadlines(3);

    expect(headlines).toHaveLength(3);
    // console.log(headlines)
    expect(headlines[0].title).toBe('Global Summit');
    expect(headlines[1].title).toBe('AI Breakthrough'); 
    expect(headlines[2].title).toBe('New Framework Released');
  });

  test('handles 500 server error', async () => {
    // TODO: Test for 500 error
    //** unnötiger Test, da dies schon in "fetches articles from multiple sources" behandelt wird*/
  });
});
