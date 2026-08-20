import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content-shell">
        <Header />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
