import React, { createContext, useContext, useState, useEffect } from 'react';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  link: string;
  isPublished: boolean;
}

interface NewsContextType {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  fetchNews: () => Promise<void>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

// Türkçe tarih formatı için yardımcı fonksiyon
const formatTurkishDate = (dateStr: string): string => {
  try {
    // "28.12.2024 00:00:00" formatındaki tarihi işle
    const [datePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('.');
    
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    
    // Eğer geçerli bir tarih değilse bugünün tarihini kullan
    if (isNaN(date.getTime())) {
      return new Date().toLocaleDateString('tr-TR');
    }
    
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Tarih formatı hatası:', error);
    return new Date().toLocaleDateString('tr-TR');
  }
};

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://mobil.denizli.bel.tr/jsonService.ashx?s=Haber', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API Response:', data);

      // RSS yapısından haber listesini al
      const items = data?.rss?.channel?.item || [];
      console.log('News Items:', items);

      if (!Array.isArray(items)) {
        throw new Error('API yanıtında haber listesi bulunamadı');
      }

      // RSS verilerini bizim formatımıza dönüştür
      const formattedNews = items.map((item: any) => {
        // HTML içeriğini temizle
        const cleanContent = item.description || 
                           (item.content && item.content['#cdata-section']) || '';

        return {
          id: parseInt(item.id) || Math.random(),
          title: item.title?.trim() || 'Başlıksız Haber',
          content: cleanContent.trim(),
          image: item.image || '/default-news.jpg',
          date: formatTurkishDate(item.pubDate || ''),
          link: item.link || '#',
          isPublished: true,
        };
      });

      console.log('Formatted News:', formattedNews);
      setNews(formattedNews);
    } catch (error) {
      console.error('Haberler yüklenirken hata:', error);
      setError('Haberler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <NewsContext.Provider
      value={{
        news,
        loading,
        error,
        fetchNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}
