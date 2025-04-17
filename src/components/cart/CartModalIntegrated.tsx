// import React from "react";
// import { useCart } from "../../features/cart/hooks/useCart";

// const CartModalIntegrated = ({ isOpen, onClose }) => {
//   const { cartItems, updateItemQuantity, removeItem } = useCart();

//   // Calculate total
//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//       <div className="bg-[#f0f9fb] rounded-lg max-w-md w-full mx-4 relative p-6">
//         {/* Header and Close Button */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-medium text-gray-700">Panier</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Cart Items */}
//         {cartItems.length === 0 ? (
//           <div className="py-8 text-center">
//             <p className="text-gray-500">Votre panier est vide</p>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex space-x-4 pb-4 border-b border-gray-200"
//               >
//                 {/* Product Image */}
//                 <div className="w-24 flex-shrink-0">
//                   <img src={item.image} alt={item.name} className="w-full" />
//                 </div>

//                 {/* Product Info */}
//                 <div className="flex-1">
//                   <h3 className="font-bold text-lg text-gray-800">
//                     {item.name}
//                   </h3>
//                   <p className="text-gray-500 mt-1">{item.packageInfo}</p>

//                   {/* Quantity Controls */}
//                   <div className="flex items-center space-x-4 mt-4">
//                     <button
//                       className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600"
//                       onClick={() => {
//                         if (item.quantity > 1) {
//                           updateItemQuantity(item.id, item.quantity - 1);
//                         } else {
//                           removeItem(item.id);
//                         }
//                       }}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M20 12H4"
//                         />
//                       </svg>
//                     </button>

//                     <span className="text-xl font-medium">{item.quantity}</span>

//                     <button
//                       className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600"
//                       onClick={() =>
//                         updateItemQuantity(item.id, item.quantity + 1)
//                       }
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 4v16m8-8H4"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="flex-shrink-0 text-right">
//                   <p className="text-xl font-medium text-gray-800">
//                     {item.price.toFixed(2)} <span className="text-sm">Dh</span>
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Total Section */}
//         {cartItems.length > 0 && (
//           <>
//             <div className="mt-6 pb-4 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-2xl font-bold text-gray-800">Total</h3>
//                 <p className="text-2xl font-medium text-[#37AFE1]">
//                   {total.toFixed(2)} <span className="text-sm">Dh</span>
//                 </p>
//               </div>
//             </div>

//             {/* Notice Text */}
//             <div className="mt-4 mb-6">
//               <p className="text-gray-500">
//                 Lorem ipsum dolor sit amet consectetur. Dignissim viverra
//                 vestibulum odio congue. Nibh nulla.
//               </p>
//             </div>

//             {/* Order Button */}
//             <button className="w-full bg-[#37AFE1] hover:bg-[#2c8eb5] text-white py-4 rounded-full flex items-center justify-center space-x-3 text-lg font-medium transition duration-200">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                 />
//               </svg>
//               <span>COMMANDER</span>
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartModalIntegrated;
