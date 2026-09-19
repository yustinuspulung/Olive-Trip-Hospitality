import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HotelsPage } from './pages/HotelsPage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { TransportPage } from './pages/TransportPage';
import { RequestBuilderPage } from './pages/RequestBuilderPage';
import { DashboardPage } from './pages/DashboardPage';
import { QuoteDetailPage } from './pages/QuoteDetailPage';
import { ConciergePage } from './pages/ConciergePage';
import { AdminPage } from './pages/AdminPage';
import { HOTELS } from './data/hotels';
import { Hotel, Vehicle } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return window.location.pathname;
    }
    return '/';
  });

  // Transient state passed to request builder
  const [requestBuilderConfig, setRequestBuilderConfig] = useState<any>(null);

  // Selected hotel for detail view
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(() => {
    // If path starts with /hotels/, try to find hotel
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/^\/hotels\/([a-z0-9-]+)$/);
      if (match) {
        return HOTELS.find((h) => h.slug === match[1]) || null;
      }
    }
    return null;
  });

  // Selected quote for quote detail view
  const [activeQuoteId, setActiveQuoteId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/^\/quotes\/([a-zA-Z0-9-]+)$/);
      if (match) {
        return match[1];
      }
    }
    return null;
  });

  // Sync browser popstate (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);

      const hotelMatch = path.match(/^\/hotels\/([a-z0-9-]+)$/);
      if (hotelMatch) {
        const h = HOTELS.find((item) => item.slug === hotelMatch[1]);
        if (h) setSelectedHotel(h);
      }

      const quoteMatch = path.match(/^\/quotes\/([a-zA-Z0-9-]+)$/);
      if (quoteMatch) {
        setActiveQuoteId(quoteMatch[1]);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPath(path);
  };

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    navigate(`/hotels/${hotel.slug}`);
  };

  const handleSelectVehicleForRequest = (vehicle: Vehicle) => {
    setRequestBuilderConfig({
      selectedVehicles: [{ vehicleId: vehicle.id, name: vehicle.name, quantity: 1 }]
    });
    navigate('/request/new');
  };

  const handleStartConfiguredRequest = (config: any) => {
    setRequestBuilderConfig(config);
    navigate('/request/new');
  };

  const handleStartRequestWithHotel = (data: any) => {
    setRequestBuilderConfig(data);
    navigate('/request/new');
  };

  const handleRequestBuilderSuccess = (_requestId: string, quoteId: string) => {
    setActiveQuoteId(quoteId);
    navigate(`/quotes/${quoteId}`);
  };

  const handleViewQuote = (quoteId: string) => {
    setActiveQuoteId(quoteId);
    navigate(`/quotes/${quoteId}`);
  };

  // Route Rendering Logic
  const renderContent = () => {
    // Hotel Detail: /hotels/:slug
    if (currentPath.startsWith('/hotels/') && selectedHotel) {
      return (
        <HotelDetailPage
          hotel={selectedHotel}
          onBack={() => navigate('/hotels')}
          onStartRequestWithHotel={handleStartRequestWithHotel}
        />
      );
    }

    // Quote Detail: /quotes/:id
    if (currentPath.startsWith('/quotes/') && activeQuoteId) {
      return (
        <QuoteDetailPage
          quoteId={activeQuoteId}
          onBack={() => navigate('/dashboard')}
          onViewDashboard={() => navigate('/dashboard')}
        />
      );
    }

    // Request Builder: /request/new
    if (currentPath === '/request/new') {
      return (
        <RequestBuilderPage
          initialConfig={requestBuilderConfig}
          onSuccess={handleRequestBuilderSuccess}
          onCancel={() => navigate('/')}
        />
      );
    }

    // Hotels Catalog: /hotels
    if (currentPath === '/hotels') {
      return (
        <HotelsPage
          onSelectHotel={handleSelectHotel}
          onNavigateHome={() => navigate('/')}
        />
      );
    }

    // Transport Catalog: /transport
    if (currentPath === '/transport') {
      return (
        <TransportPage
          onSelectVehicleForRequest={handleSelectVehicleForRequest}
          onNavigateHome={() => navigate('/')}
        />
      );
    }

    // Dashboard: /dashboard
    if (currentPath === '/dashboard') {
      return (
        <DashboardPage
          onNewRequest={() => {
            setRequestBuilderConfig(null);
            navigate('/request/new');
          }}
          onViewQuote={handleViewQuote}
          onNavigateHome={() => navigate('/')}
        />
      );
    }

    // Concierge: /concierge
    if (currentPath === '/concierge') {
      return <ConciergePage onNavigateHome={() => navigate('/')} />;
    }

    // Admin: /admin
    if (currentPath === '/admin') {
      return (
        <AdminPage
          onNavigateHome={() => navigate('/')}
          onViewQuote={handleViewQuote}
        />
      );
    }

    // Default: Home Page (/)
    return (
      <HomePage
        onNavigate={navigate}
        onSelectHotel={handleSelectHotel}
        onSelectVehicle={handleSelectVehicleForRequest}
        onStartConfiguredRequest={handleStartConfiguredRequest}
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#24364B]">
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      <div className="flex-1">
        {renderContent()}
      </div>
      <Footer onNavigate={navigate} />
    </div>
  );
}
