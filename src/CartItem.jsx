import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {removeItem, updateQuantity} from "./CartSlice";
import "./CartItem.css";

// Add clearCart action
const clearCart = () => ({type: "cart/clearCart"});

const CartItem = ({onContinueShopping}) => {
	const items = useSelector((state) => state.cart.items);
	const dispatch = useDispatch();
	const [showComingSoon, setShowComingSoon] = useState(false);

	// Calculate subtotal for an item
	const calculateTotalCost = (item) => {
		const price = parseFloat(item.cost.substring(1));
		return price * item.quantity;
	};

	// Calculate total cart amount
	const calculateTotalAmount = () => {
		return items.reduce((total, item) => total + calculateTotalCost(item), 0);
	};

	// Handlers
	const handleContinueShopping = (e) => {
		e.preventDefault();
		onContinueShopping(e);
	};

	const handleIncrement = (item) => {
		dispatch(updateQuantity({name: item.name, quantity: item.quantity + 1}));
	};

	const handleDecrement = (item) => {
		if (item.quantity > 1) {
			dispatch(updateQuantity({name: item.name, quantity: item.quantity - 1}));
		} else {
			dispatch(removeItem({name: item.name}));
		}
	};

	const handleRemove = (item) => {
		dispatch(removeItem({name: item.name}));
	};

	const handleCheckout = (e) => {
		e.preventDefault();
		dispatch(clearCart());
		setShowComingSoon(true);
	};

	if (showComingSoon) {
		return (
			<div className="cart-container">
				<h2 className="total_cart_amount">Coming soon</h2>
				<button
					className="get-started-button1"
					onClick={handleContinueShopping}>
					Continue Shopping
				</button>
			</div>
		);
	}

	return (
		<div className="cart-container">
			<h2 className="total_cart_amount">
				Total Cart Amount: ${calculateTotalAmount()}
			</h2>
			{items.map((item) => (
				<div
					key={item.name}
					className="cart-item">
					<img
						className="cart-item-image"
						src={item.image}
						alt={item.name}
					/>
					<div className="cart-item-details">
						<div className="cart-item-name">{item.name}</div>
						<div className="cart-item-cost">{item.cost}</div>
						<div className="cart-item-quantity">
							<button
								className="cart-item-button cart-item-button-dec"
								onClick={() => handleDecrement(item)}>
								-
							</button>
							<span className="cart-item-quantity-value">{item.quantity}</span>
							<button
								className="cart-item-button cart-item-button-inc"
								onClick={() => handleIncrement(item)}>
								+
							</button>
						</div>
						<div className="cart-item-total">
							Total: ${calculateTotalCost(item)}
						</div>
						<button
							className="cart-item-delete"
							onClick={() => handleRemove(item)}>
							Delete
						</button>
					</div>
				</div>
			))}
			<button
				className="get-started-button1"
				style={{marginTop: 30}}
				onClick={handleContinueShopping}>
				Continue Shopping
			</button>
			<button
				className="get-started-button1"
				style={{marginTop: 20}}
				onClick={handleCheckout}>
				Checkout
			</button>
		</div>
	);
};

export default CartItem;
