
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Boxes,
  Users,
  Wallet,
  ChartNoAxesCombined,
  Megaphone,
  MessageCircle,
  Star,
  BadgeCheck,
  Store,
  Settings,
  Bell,
  Search,
  Menu,
  Globe,
  ChevronDown,
  Plus,
  ArrowUpRight,
  TrendingUp,
  CircleHelp,
  LogOut,
  X
} from "lucide-react";

const translations = {
  sw: {
    dashboard: "Dashibodi",
    overview: "Muhtasari",
    products: "Bidhaa",
    addProduct: "Ongeza Bidhaa",
    orders: "Oda",
    inventory: "Stoo",
    customers: "Wateja",
    earnings: "Mapato",
    analytics: "Takwimu",
    promotions: "Matangazo",
    messages: "Ujumbe",
    reviews: "Maoni ya Wateja",
    verification: "Uthibitisho wa Duka",
    storeProfile: "Wasifu wa Duka",
    settings: "Mipangilio",
    help: "Msaada",
    logout: "Ondoka",
    welcome: "Karibu kwenye duka lako!",
    subtitle: "Huu hapa ni muhtasari wa biashara yako leo.",
    totalSales: "Jumla ya Mauzo",
    totalOrders: "Jumla ya Oda",
    productsListed: "Bidhaa Zilizowekwa",
    totalCustomers: "Jumla ya Wateja",
    recentOrders: "Oda za Hivi Karibuni",
    viewAll: "Ona Zote",
    quickActions: "Vitendo vya Haraka",
    addNewProduct: "Ongeza Bidhaa Mpya",
    manageOrders: "Simamia Oda",
    viewAnalytics: "Angalia Takwimu",
    search: "Tafuta...",
    notifications: "Arifa",
    store: "Duka Langu",
    seller: "Muuzaji",
    today: "Leo",
    pending: "Zinasubiri",
    completed: "Zimekamilika",
    language: "Lugha"
  },
  en: {
    dashboard: "Dashboard",
    overview: "Overview",
    products: "Products",
    addProduct: "Add Product",
    orders: "Orders",
    inventory: "Inventory",
    customers: "Customers",
    earnings: "Earnings",
    analytics: "Analytics",
    promotions: "Promotions",
    messages: "Messages",
    reviews: "Customer Reviews",
    verification: "Store Verification",
    storeProfile: "Store Profile",
    settings: "Settings",
    help: "Help Center",
    logout: "Log Out",
    welcome: "Welcome to your store!",
    subtitle: "Here is an overview of your business today.",
    totalSales: "Total Sales",
    totalOrders: "Total Orders",
    productsListed: "Products Listed",
    totalCustomers: "Total Customers",
    recentOrders: "Recent Orders",
    viewAll: "View All",
    quickActions: "Quick Actions",
    addNewProduct: "Add New Product",
    manageOrders: "Manage Orders",
    viewAnalytics: "View Analytics",
    search: "Search...",
    notifications: "Notifications",
    store: "My Store",
    seller: "Seller",
    today: "Today",
    pending: "Pending",
    completed: "Completed",
    language: "Language"
  }
};

const navigation = [
  { key: "overview", icon: LayoutDashboard },
  { key: "products", icon: Package },
  { key: "orders", icon: ShoppingBag },
  { key: "inventory", icon: Boxes },
  { key: "customers", icon: Users },
  { key: "earnings", icon: Wallet },
  { key: "analytics", icon: ChartNoAxesCombined },
  { key: "promotions", icon: Megaphone },
  { key: "messages", icon: MessageCircle },
  { key: "reviews", icon: Star },
  { key: "verification", icon: BadgeCheck },
  { key: "storeProfile", icon: Store },
  { key: "settings", icon: Settings }
];

function App() {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("zune_language") || "sw"
  );

  const [activePage, setActivePage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem("zune_language", language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="app-shell">

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

        <div className="brand">
          <div className="brand-logo">Z</div>
          <div>
            <h2>ZUNE</h2>
            <span>SELLER CENTER</span>
          </div>
          <button
            className="close-sidebar"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="store-card">
          <div className="store-avatar">Z</div>
          <div className="store-details">
            <strong>{t.store}</strong>
            <span>{t.seller}</span>
          </div>
          <ChevronDown size={17} />
        </div>

        <p className="nav-heading">{t.dashboard}</p>

        <nav className="navigation">
          {navigation.map(({ key, icon: Icon }) => (
            <button
              key={key}
              className={`nav-item ${activePage === key ? "active" : ""}`}
              onClick={() => {
                setActivePage(key);
                setSidebarOpen(false);
              }}
            >
              <Icon size={19} />
              <span>{t[key]}</span>
              {key === "verification" && (
                <span className="nav-dot" />
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <CircleHelp size={19} />
            <span>{t.help}</span>
          </button>

          <button className="nav-item logout">
            <LogOut size={19} />
            <span>{t.logout}</span>
          </button>

          <div className="sidebar-footer">
            <span>© 2026 ZUNE Marketplace</span>
          </div>
        </div>

      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="main-area">

        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={23} />
          </button>

          <div className="topbar-search">
            <Search size={19} />
            <input placeholder={t.search} />
          </div>

          <div className="topbar-actions">

            <div className="language-switch">
              <Globe size={17} />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label={t.language}
              >
                <option value="sw">SW</option>
                <option value="en">EN</option>
              </select>
            </div>

            <button className="notification-button" aria-label={t.notifications}>
              <Bell size={20} />
              <span className="notification-dot" />
            </button>

            <div className="profile-avatar">S</div>

          </div>

        </header>

        <section className="page-content">

          <div className="welcome-section">
            <div>
              <p className="date-label">{t.today}</p>
              <h1>{t.welcome}</h1>
              <p className="welcome-subtitle">{t.subtitle}</p>
            </div>

            <button
              className="primary-button"
              onClick={() => setActivePage("products")}
            >
              <Plus size={18} />
              {t.addProduct}
            </button>
          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-top">
                <span>{t.totalSales}</span>
                <div className="stat-icon green">
                  <Wallet size={20} />
                </div>
              </div>
              <h2>TSh 0</h2>
              <span className="stat-note">—</span>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>{t.totalOrders}</span>
                <div className="stat-icon blue">
                  <ShoppingBag size={20} />
                </div>
              </div>
              <h2>0</h2>
              <span className="stat-note">—</span>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>{t.productsListed}</span>
                <div className="stat-icon purple">
                  <Package size={20} />
                </div>
              </div>
              <h2>0</h2>
              <span className="stat-note">—</span>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>{t.totalCustomers}</span>
                <div className="stat-icon orange">
                  <Users size={20} />
                </div>
              </div>
              <h2>0</h2>
              <span className="stat-note">—</span>
            </div>

          </div>

          <div className="content-grid">

            <section className="content-card recent-orders">
              <div className="card-heading">
                <div>
                  <h3>{t.recentOrders}</h3>
                  <p>{t.subtitle}</p>
                </div>
                <button className="text-button">
                  {t.viewAll}
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="empty-state">
                <div className="empty-icon">
                  <ShoppingBag size={28} />
                </div>
                <strong>
                  {language === "sw"
                    ? "Bado hakuna oda"
                    : "No orders yet"}
                </strong>
                <p>
                  {language === "sw"
                    ? "Oda zako mpya zitaonekana hapa."
                    : "Your new orders will appear here."}
                </p>
              </div>
            </section>

            <section className="content-card quick-actions">
              <div className="card-heading">
                <h3>{t.quickActions}</h3>
              </div>

              <button
                className="quick-action"
                onClick={() => setActivePage("products")}
              >
                <div className="quick-icon green">
                  <Plus size={20} />
                </div>
                <span>{t.addNewProduct}</span>
                <ArrowUpRight size={17} />
              </button>

              <button
                className="quick-action"
                onClick={() => setActivePage("orders")}
              >
                <div className="quick-icon blue">
                  <ShoppingBag size={20} />
                </div>
                <span>{t.manageOrders}</span>
                <ArrowUpRight size={17} />
              </button>

              <button
                className="quick-action"
                onClick={() => setActivePage("analytics")}
              >
                <div className="quick-icon purple">
                  <TrendingUp size={20} />
                </div>
                <span>{t.viewAnalytics}</span>
                <ArrowUpRight size={17} />
              </button>

              <button
                className="quick-action"
                onClick={() => setActivePage("verification")}
              >
                <div className="quick-icon blue">
                  <BadgeCheck size={20} />
                </div>
                <span>{t.verification}</span>
                <ArrowUpRight size={17} />
              </button>

            </section>

          </div>

          <footer className="main-footer">
            <span>ZUNE Seller Center</span>
            <span>Premium Seller Experience</span>
          </footer>

        </section>

      </main>

    </div>
  );
}

export default App;
