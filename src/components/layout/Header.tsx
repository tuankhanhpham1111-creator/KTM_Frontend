import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/useCart";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

const navItems = [
  { to: "/", label: "Trang chủ" },
  { to: "/menu", label: "Thực đơn" },
  { to: "/about", label: "Câu chuyện" },
  { to: "/orders", label: "Đơn hàng" },
];

function Header() {
  const { itemCount } = useCart();
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="top-note">
        Giao hàng miễn phí cho đơn từ 199.000đ · Mở cửa 10:00–22:00
      </div>
      <header className="site-header navbar">
        <div className="container-wide nav-inner">
          <Link className="brand-mark" to="/" aria-label="SEOUL BITE trang chủ">
            <span className="brand-symbol">S</span>
            <span>SEOUL BITE</span>
          </Link>
          <nav className="nav-links" aria-label="Điều hướng chính">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            {isAdmin ? (
              <button
                className="btn btn-outline-brand px-3"
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Đăng xuất
              </button>
            ) : (
              <Link className="admin-nav-link" to="/admin/login">
                Đăng nhập
              </Link>
            )}
            <Link className="btn btn-brand px-3 px-lg-4" to="/menu">
              Đặt món
            </Link>
            <Link
              className="cart-link"
              to="/cart"
              aria-label={`Giỏ hàng, ${itemCount} món`}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.5 8H6" />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>
            <button
              type="button"
              className="mobile-menu-button"
              aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-drawer" aria-label="Điều hướng di động">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}

export default Header;
