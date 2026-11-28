import { useState } from "react";
import EmptyState from "../components/common/EmptyState";
import type { Order } from "../types/Order";
import { formatPrice } from "../utils/formatPrice";

const ORDERS_STORAGE_KEY = "seoul-bite-orders";

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem(ORDERS_STORAGE_KEY) ?? "[]",
      ) as Order[];
    } catch {
      return [];
    }
  });

  const handleCancelOrder = (orderId: string) => {
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn hủy đơn hàng #${orderId} không?`,
    );
    if (!confirmed) return;

    setOrders((prev) => {
      const updated = prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "Đã hủy" as Order["status"] }
          : order,
      );
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <section className="page-hero">
        <div className="container-wide">
          <span className="eyebrow">Theo dõi vị ngon</span>
          <h1 className="page-title">Đơn hàng của bạn</h1>
          <p className="section-copy mb-0">
            Cảm ơn bạn đã chọn Seoul Bite cho bữa ăn hôm nay.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          {orders.length === 0 ? (
            <EmptyState
              title="Bạn chưa có đơn hàng nào"
              message="Khám phá menu và chọn món Hàn bạn yêu thích."
            />
          ) : (
            <div className="d-grid gap-3">
              {orders.map((order) => {
                const isPending = order.status === "Chờ xác nhận";
                const isCancelled = order.status === "Đã hủy";

                return (
                  <article className="order-card" key={order.id}>
                    <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
                      <div>
                        <span className="small text-secondary">Mã đơn</span>
                        <h2 className="h6 fw-bold mt-1">#{order.id}</h2>
                      </div>

                      <span
                        className="order-status"
                        style={
                          isCancelled
                            ? {
                                backgroundColor: "#fee2e2",
                                color: "#b91c1c",
                              }
                            : undefined
                        }
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="d-flex flex-wrap justify-content-between gap-2 small text-secondary">
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

                    <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mt-3">
                      <div className="small text-secondary">
                        Giao đến: {order.address}
                      </div>

                      {isPending && (
                        <button
                          type="button"
                          onClick={() => handleCancelOrder(order.id)}
                          className="btn btn-outline-danger btn-sm rounded-3 px-3"
                        >
                          Hủy đơn hàng
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default OrdersPage;
