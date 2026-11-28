import { useEffect, useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import { useAuth } from "../context/useAuth";
import type { Order } from "../types/Order";
import { formatPrice } from "../utils/formatPrice";

export default function AccountPage() {
  const { customer, isCustomerLoggedIn, updateCustomerProfile, logout } =
    useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(customer?.name ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [address, setAddress] = useState(customer?.address ?? "");
  const [savedNotice, setSavedNotice] = useState(false);

  // Tái sử dụng dữ liệu đơn hàng giống OrdersPage của nhóm
  const [orders] = useState<Order[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("seoul-bite-orders") ?? "[]",
      ) as Order[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setPhone(customer.phone ?? "");
      setAddress(customer.address ?? "");
    }
  }, [customer]);

  // Chặn truy cập nếu chưa log tài khoản khách
  if (!isCustomerLoggedIn || !customer) {
    return <Navigate to="/login" replace />;
  }

  const handleSaveProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCustomerProfile({ name, phone, address });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <section className="page-hero">
        <div className="container-wide d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <span className="eyebrow">Tài khoản thành viên</span>
            <h1 className="page-title mb-1">Xin chào, {customer.name}</h1>
            <p className="section-copy mb-0">
              Tên đăng nhập: <strong>@{customer.username}</strong>
            </p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/menu" className="btn btn-outline-dark">
              Đặt thêm món
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-danger"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          <div className="row g-4">
            {/* Cột trái: Thông tin giao hàng cá nhân */}
            <div className="col-lg-5">
              <div className="bg-white border rounded-4 p-4 shadow-sm">
                <h2 className="h5 fw-bold mb-3">Thông tin giao hàng</h2>

                {savedNotice && (
                  <div
                    className="alert alert-success py-2 px-3 small"
                    role="alert"
                  >
                    Đã lưu cập nhật thông tin cá nhân!
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="d-grid gap-3">
                  <div>
                    <label className="form-label small fw-semibold">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label small fw-semibold">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label small fw-semibold">
                      Địa chỉ mặc định
                    </label>
                    <textarea
                      rows={2}
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn text-white fw-semibold"
                    style={{ backgroundColor: "var(--sh-red, #b91c1c)" }}
                  >
                    Lưu thông tin
                  </button>
                </form>
              </div>
            </div>

            {/* ls đơn hàng */}
            <div className="col-lg-7">
              <div className="bg-white border rounded-4 p-4 shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h2 className="h5 fw-bold mb-0">
                    Lịch sử đơn hàng ({orders.length})
                  </h2>
                  <Link to="/orders" className="small text-decoration-none">
                    Xem trang đơn hàng
                  </Link>
                </div>

                {orders.length === 0 ? (
                  <EmptyState
                    title="Chưa có đơn hàng nào"
                    message="Bạn chưa đặt món nào trên Seoul Bite."
                  />
                ) : (
                  <div className="d-grid gap-3">
                    {orders.map((order) => (
                      <article className="order-card" key={order.id}>
                        <div className="d-flex align-items-start justify-content-between gap-2 flex-wrap">
                          <div>
                            <span className="small text-secondary">Mã đơn</span>
                            <h3 className="h6 fw-bold mt-1 mb-0">
                              #{order.id}
                            </h3>
                          </div>
                          <span className="order-status">{order.status}</span>
                        </div>

                        <div className="d-flex flex-wrap justify-content-between gap-2 small text-secondary mt-2">
                          <span>
                            {new Date(order.createdAt).toLocaleString("vi-VN")}
                          </span>
                          <span>
                            {order.items.reduce(
                              (count, item) => count + item.quantity,
                              0,
                            )}{" "}
                            món
                          </span>
                          <strong className="text-dark">
                            {formatPrice(order.total)}
                          </strong>
                        </div>

                        <div className="small text-secondary mt-2">
                          Giao đến: {order.address}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
