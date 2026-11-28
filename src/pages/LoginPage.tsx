import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const {
    isAdmin,
    isCustomerLoggedIn,
    login,
    loginCustomer,
    registerCustomer,
  } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  if (isCustomerLoggedIn) {
    return <Navigate to="/account" replace />;
  }

  const toggleMode = (nextIsRegister: boolean) => {
    setIsRegister(nextIsRegister);
    setError("");
    setShowPassword(false);
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const cleanUsername = username.trim();
    if (!cleanUsername || !password) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    const isAdminOk = login(cleanUsername, password);
    if (isAdminOk) {
      navigate("/admin", { replace: true });
      return;
    }

    const res = loginCustomer(cleanUsername, password);
    if (res.ok) {
      navigate("/account", { replace: true });
    } else {
      setError(res.message || "Tên đăng nhập hoặc mật khẩu chưa đúng.");
    }
  };

  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = registerCustomer({
      name: fullName,
      username: regUsername,
      password: regPassword,
      phone,
      address,
    });

    if (res.ok) {
      navigate("/account", { replace: true });
    } else {
      setError(res.message || "Đăng ký không thành công.");
    }
  };

  return (
    <section
      className="section-pad d-flex align-items-center"
      style={{
        minHeight: "calc(100vh - 80px)",
        background:
          "radial-gradient(circle at 12% 18%, rgba(185, 28, 28, 0.06), transparent 40%), radial-gradient(circle at 88% 85%, rgba(234, 88, 12, 0.07), transparent 42%)",
      }}
    >
      <div className="container-wide">
        <div
          className="mx-auto bg-white rounded-4 shadow overflow-hidden border"
          style={{ maxWidth: 940, borderColor: "#f1dfd8" }}
        >
          <div className="row g-0">
            {/* Cột trái: Banner thương hiệu Seoul Bite */}
            <div
              className="col-lg-5 d-none d-lg-flex flex-column justify-content-between p-4 p-xl-5 text-white position-relative"
              style={{
                background:
                  "linear-gradient(155deg, #991b1b 0%, #b91c1c 55%, #7f1d1d 100%)",
              }}
            >
              <div>
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white bg-opacity-10 small fw-semibold mb-4">
                  <span>●</span>
                  <span>SEOUL BITE • TASTE KOREA</span>
                </div>
                <h2 className="h3 fw-bold lh-base mb-3">
                  Hương vị chuẩn Hàn, giao nóng tận tay.
                </h2>
                <p className="small text-white-50 mb-4">
                  Đăng nhập để lưu sẵn địa chỉ giao hàng, đặt món chỉ trong vài
                  giây và theo dõi trạng thái đơn hàng theo thời gian thực.
                </p>
              </div>

              <div className="d-grid gap-3 pt-3 border-top border-white border-opacity-25 small">
                <div className="d-flex align-items-start gap-2">
                  <span className="fw-bold">✓</span>
                  <span>Tự động điền thông tin nhận hàng khi thanh toán</span>
                </div>
                <div className="d-flex align-items-start gap-2">
                  <span className="fw-bold">✓</span>
                  <span>Quản lý lịch sử các món Hàn yêu thích đã đặt</span>
                </div>
                <div className="d-flex align-items-start gap-2">
                  <span className="fw-bold">✓</span>
                  <span>Nhận ưu đãi thành viên mới mỗi tuần</span>
                </div>
              </div>
            </div>

            {/* Cột phải: Form Đăng nhập / Đăng ký */}
            <div className="col-lg-7 p-4 p-sm-5">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
                  style={{
                    width: 28,
                    height: 28,
                    fontSize: 13,
                    backgroundColor: "var(--sh-red, #b91c1c)",
                  }}
                >
                  S
                </span>
                <span
                  className="text-uppercase fw-bold small"
                  style={{
                    color: "var(--sh-red, #b91c1c)",
                    letterSpacing: "0.08em",
                  }}
                >
                  SEOUL BITE ACCOUNT
                </span>
              </div>

              <h1 className="h3 fw-bold mb-1">
                {isRegister ? "Tạo tài khoản mới" : "Chào mừng trở lại"}
              </h1>
              <p className="text-secondary small mb-4">
                {isRegister
                  ? "Điền thông tin bên dưới để trải nghiệm đặt món nhanh chóng hơn."
                  : "Đăng nhập để tiếp tục đặt món và quản lý đơn hàng của bạn."}
              </p>

              {error && (
                <div
                  className="alert alert-danger py-2 px-3 small mb-3 rounded-3"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {isRegister ? (
                <form onSubmit={handleRegisterSubmit} className="d-grid gap-3">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label className="form-label fw-semibold small">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        className="form-control py-2 rounded-3"
                        placeholder="Nguyễn Minh Anh"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label fw-semibold small">
                        Tên đăng nhập *
                      </label>
                      <input
                        type="text"
                        className="form-control py-2 rounded-3"
                        placeholder="minhanh123"
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label className="form-label fw-semibold small">
                        Mật khẩu *
                      </label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control py-2 rounded-start-3"
                          placeholder="Ít nhất 3 ký tự"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm px-3"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? "Ẩn" : "Hiện"}
                        </button>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label fw-semibold small">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        className="form-control py-2 rounded-3"
                        placeholder="09xx xxx xxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label fw-semibold small">
                      Địa chỉ giao hàng
                    </label>
                    <input
                      type="text"
                      className="form-control py-2 rounded-3"
                      placeholder="Số nhà, đường, quận/huyện..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 py-2.5 fw-semibold text-white rounded-3 shadow-sm mt-1"
                    style={{ backgroundColor: "var(--sh-red, #b91c1c)" }}
                  >
                    Tạo tài khoản →
                  </button>

                  <p className="text-center small text-secondary mb-0 mt-1">
                    Đã có tài khoản?{" "}
                    <button
                      type="button"
                      onClick={() => toggleMode(false)}
                      className="btn btn-link p-0 fw-semibold text-decoration-none align-baseline"
                      style={{ color: "var(--sh-red, #b91c1c)" }}
                    >
                      Đăng nhập
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleLoginSubmit} className="d-grid gap-3">
                  <div>
                    <label className="form-label fw-semibold small">
                      Tên đăng nhập
                    </label>
                    <input
                      type="text"
                      className="form-control py-2 rounded-3"
                      placeholder="Nhập tên đăng nhập của bạn"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label fw-semibold small">
                      Mật khẩu
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control py-2 rounded-start-3"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm px-3"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? "Ẩn" : "Hiện"}
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center small">
                    <label className="form-check-label d-flex align-items-center gap-2 text-secondary user-select-none">
                      <input
                        type="checkbox"
                        className="form-check-input mt-0"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      Ghi nhớ đăng nhập
                    </label>
                    <span className="text-secondary">
                      Cần hỗ trợ? Liên hệ quầy
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 py-2 fw-semibold text-white rounded-3 shadow-sm mt-1"
                    style={{ backgroundColor: "var(--sh-red, #b91c1c)" }}
                  >
                    Đăng nhập →
                  </button>

                  <p className="text-center small text-secondary mb-0 mt-1">
                    Bạn chưa có tài khoản?{" "}
                    <button
                      type="button"
                      onClick={() => toggleMode(true)}
                      className="btn btn-link p-0 fw-semibold text-decoration-none align-baseline"
                      style={{ color: "var(--sh-red, #b91c1c)" }}
                    >
                      Đăng ký
                    </button>
                  </p>
                </form>
              )}

              <div className="mt-4 pt-3 border-top d-flex flex-wrap justify-content-between align-items-center gap-2 small">
                <Link
                  to="/"
                  className="text-decoration-none fw-medium"
                  style={{ color: "var(--sh-red, #b91c1c)" }}
                >
                  ← Quay lại cửa hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
