import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import Announcements from './pages/admin/Announcements';
import Pages from './pages/admin/Pages';
import Organization from './pages/Organization';
import OrganizationAdmin from './pages/admin/Organization';
import News from './pages/admin/News';
import NewsList from './pages/NewsList';
import Users from './pages/admin/Users';
import Contact from './pages/Contact';
import EServices from './pages/EServices';
import Payment from './pages/Payment';
import { OrganizationProvider } from './context/OrganizationContext';
import { NewsProvider } from './context/NewsContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <NewsProvider>
        <OrganizationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="kurumsal" element={<Organization />} />
                <Route path="haberler" element={<NewsList />} />
                <Route path="iletisim" element={<Contact />} />
                <Route path="e-hizmetler" element={<EServices />} />
                <Route path="e-hizmetler/odeme" element={<Payment />} />
                {/* Diğer sayfalar için route'lar buraya eklenecek */}
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="announcements" element={<Announcements />} />
                <Route path="pages" element={<Pages />} />
                <Route path="organization" element={<OrganizationAdmin />} />
                <Route path="news" element={<News />} />
                <Route path="users" element={<Users />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </OrganizationProvider>
      </NewsProvider>
    </AuthProvider>
  );
}

export default App;
