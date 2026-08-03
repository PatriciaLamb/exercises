export class NewsAggregator {
  constructor() {
    this.sources = [
      'https://api.technews.com/articles',
      'https://api.worldnews.com/latest'
    ];
  }

  async fetchArticles() {
    const results = await Promise.allSettled(
      this.sources.map(url => this._fetchFromSource(url))
    );

    const articles = results
      .filter(result => result.status === 'fulfilled')
      .flatMap(result => result.value);

    return articles;
  }

  async fetchByCategory(category) {
    if (!category) {
      throw new Error('Category is required');
    }

    const url = `https://api.technews.com/articles?category=${category}`;
    return this._fetchFromSource(url);
  }

  async _fetchFromSource(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}: ${response.status}`);
    }

    const data = await response.json();
    return data.articles || [];
  }

  async getTopHeadlines(limit = 5) {
    const articles = await this.fetchArticles();
    return articles
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }
}
