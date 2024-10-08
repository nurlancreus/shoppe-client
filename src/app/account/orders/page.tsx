import EmptyPlaceholder from "../_components/ui/empty-placeholder";

const orders = [];

export default function OrdersPage() {
  return (
    <div>
      {orders.length === 0 && (
        <EmptyPlaceholder
          message="No orders have been made yet."
          text="Browse Products"
          href="/shop"
        />
      )}
    </div>
  );
}
