import CartItems from '@/components/features/cart/cart-items';

const CartPage = () => {
  return (
    <section className="px-4 py-6 md:px-8 md:py-5">
      <div className="mx-auto w-full max-w-6xl">
        <CartItems />
      </div>
    </section>
  );
};

export default CartPage;
