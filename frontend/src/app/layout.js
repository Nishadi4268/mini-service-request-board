import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'GlobalTNA - Service Request Board',
  description: 'Post and browse service requests from trusted tradespeople',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <div className="container py-8">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
