import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useCMS } from '../context/CMSContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, CheckCircle, Save, Smartphone } from 'lucide-react';
import { ShippingDetails, INDIAN_STATES, Order } from '../types';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AddressFormFields = ({ form, onChange, disabled }: { form: ShippingDetails, onChange: (e: any) => void, disabled: boolean }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0 ${disabled ? 'opacity-70 pointer-events-none' : ''}`}>
        <div className="group"><label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">First Name</label><input required name="firstName" value={form.firstName} onChange={onChange} type="text" className="w-full border-b border-gray-300 py-2 outline-none focus:border-navy-900 bg-white text-navy-900" /></div>
        <div className="group"><label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Last Name</label><input required name="lastName" value={form.lastName} onChange={onChange} type="text" className="w-full border-b border-gray-300 py-2 outline-none focus:border-navy-900 bg-white text-navy-900" /></div>
        <div className="group"><label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Email Address</label><input required name="email" value={form.email} onChange={onChange} type="email" className="w-full border-b border-gray-300 py-2 outline-none focus:border-navy-900 bg-white text-navy-900" /></div>
        <div className="group"><label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Phone Number</label><input required name="phone" value={form.phone} onChange={onChange} type="tel" className="w-full border-b border-gray-300 py-2 outline-none focus:border-navy-900 bg-white text-navy-900" /></div>
        <div className="md:col-span-2 group"><label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Address</label><input required name="address" value={form.address} onChange={onChange} type="text" className="w-full border-b border-gray-300 py-2 outline-none focus:border-navy-900 bg-white text-navy-900" /></div>
        <div className="group"><label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">City</label><input required name="city" value={form.city} onChange={onChange} type="text" className="w-full border-b border-gray-300 py-2 outline-none focus:border-navy-900 bg-white text-navy-900" /></div>
        {/* District Field Corrected */}
        <div className="group"><label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">District</label><input required name="district" value={form.district} onChange={onChange} type="text" className="w-full border-b border-gray-300 py-2 outline-none focus:border-navy-900 bg-white text-navy-900" /></div>
        <div className="group"><label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">State</label><select required name="state" value={form.state} onChange={onChange} className="w-full border-b border-gray-300 py-2 outline-none focus:border-navy-900 bg-white text-navy-900">{INDIAN_STATES.slice(2).map(state => <option key={state} value={state}>{state}</option>)}</select></div>
        <div className="group"><label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Pincode</label><input required name="pincode" value={form.pincode} onChange={onChange} type="text" className="w-full border-b border-gray-300 py-2 outline-none focus:border-navy-900 bg-white text-navy-900" /></div>
    </div>
);

const Checkout: React.FC = () => {
    const { cart, cartTotal, taxAmount, clearCart } = useCart();
    const { shippingRules, addOrder, globalSettings, updateUserProfile, users } = useCMS();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [calculatedShipping, setCalculatedShipping] = useState(0);
    const [isAddressSaved, setIsAddressSaved] = useState(false);
    const [sameAsBilling, setSameAsBilling] = useState(true);
    const [saveAddressForNextTime, setSaveAddressForNextTime] = useState(false);
    const [orderNotes, setOrderNotes] = useState('');

    const [billingForm, setBillingForm] = useState<ShippingDetails>({
        firstName: '', lastName: '', email: '', phone: '', address: '', city: '', district: '', state: 'Tamil Nadu', pincode: ''
    });

    const [shippingForm, setShippingForm] = useState<ShippingDetails>(billingForm);

    useEffect(() => {
        if (isAuthenticated && user && users.length > 0) {
            const freshUser = users.find(u => String(u.id) === String(user.id));
            if (freshUser) {
                setBillingForm(prev => ({
                    ...prev,
                    firstName: freshUser.name ? freshUser.name.split(' ')[0] : '',
                    lastName: freshUser.name ? freshUser.name.split(' ').slice(1).join(' ') : '',
                    email: freshUser.email || '',
                    phone: freshUser.phone || '',
                    address: freshUser.address || '',
                    city: freshUser.city || '',
                    district: freshUser.district || '',
                    state: freshUser.state || 'Tamil Nadu',
                    pincode: freshUser.pincode || ''
                }));
            }
        }
    }, [user, users, isAuthenticated]);

    useEffect(() => { if (sameAsBilling) setShippingForm(billingForm); }, [billingForm, sameAsBilling]);
    useEffect(() => { setIsAddressSaved(false); setCalculatedShipping(0); }, [cart]);

    const calculateShippingCost = () => {
        let totalShipping = 0;
        const targetState = shippingForm.state;

        let pranjulNightyQty = 0;
        let pranjulCollectionQty = 0;
        const otherCategoryGroups: { [cat: string]: number } = {};

        cart.forEach(item => {
            const cat = item.category.toLowerCase();
            const sub = item.subCategory ? item.subCategory.toLowerCase() : '';
            const isCategory = (keyword: string) => cat.includes(keyword) || sub.includes(keyword);

            if (isCategory('pranjul') && isCategory('nighty')) {
                pranjulNightyQty += item.quantity;
            } else if (isCategory('pranjul') && (isCategory('collection') || isCategory('collecion'))) {
                pranjulCollectionQty += item.quantity;
            } else {
                otherCategoryGroups[item.category] = (otherCategoryGroups[item.category] || 0) + item.quantity;
            }
        });

        const getRuleCost = (rules: any[], qty: number) => {
            const stateRules = rules.filter(r => r.state === targetState || r.state === 'All States');
            const matched = stateRules.find(r => qty >= r.minQty && qty <= r.maxQty);
            return matched ? matched.cost : 0;
        };

        if (pranjulNightyQty > 0) {
            const nightyRules = shippingRules['Nighty'] || [];
            totalShipping += getRuleCost(nightyRules, pranjulNightyQty);
        }

        if (pranjulCollectionQty > 0) {
            const readymadeRules = shippingRules['Readymade'] || shippingRules['Kurtis Collections'] || [];
            totalShipping += getRuleCost(readymadeRules, pranjulCollectionQty);
        }

        Object.entries(otherCategoryGroups).forEach(([catName, qty]) => {
            const catRules = shippingRules[catName] || [
                { state: 'All States', minQty: 1, maxQty: 5, cost: 50, type: 'fixed' },
                { state: 'All States', minQty: 6, maxQty: 9999, cost: 0, type: 'fixed' }
            ];
            totalShipping += getRuleCost(catRules, qty);
        });

        return totalShipping;
    };

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cost = calculateShippingCost();
        setCalculatedShipping(cost);
        setIsAddressSaved(true);
        toast.success("Shipping & Delivery Details Saved!");

        if (saveAddressForNextTime && isAuthenticated && user) {
            updateUserProfile(user.id, {
                address: billingForm.address,
                city: billingForm.city,
                district: billingForm.district,
                state: billingForm.state,
                pincode: billingForm.pincode,
                phone: billingForm.phone
            });
        }
    };

    const finalPayable = cartTotal + taxAmount + calculatedShipping;

    const handleFinalPayment = async () => {
        setLoading(true);
        const orderId = 'ORD-' + Date.now().toString().slice(-6);

        const newOrder: Order = {
            id: orderId,
            userId: user?.id || 'guest',
            userName: `${billingForm.firstName} ${billingForm.lastName}`,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            total: Number(finalPayable.toFixed(2)),
            status: 'Confirmed',
            paymentMethod: 'Pay on Delivery / Direct Order',
            items: cart,
            billingDetails: billingForm,
            shippingDetails: shippingForm,
            notes: orderNotes
        };

        addOrder(newOrder);
        clearCart();
        toast.success("Order Placed Successfully!");
        setLoading(false);
        navigate('/order-success', { state: { order: newOrder } });
    };

    return (
        <div className="min-h-screen bg-white pt-40 pb-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
                    <div className="lg:w-2/3">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-serif text-krishna-900">Checkout</h1>
                            <div className="flex items-center text-peacock-700 bg-peacock-50 px-3 py-1 rounded-full text-xs font-medium">
                                <Lock size={12} className="mr-1" /> Local Secure Order
                            </div>
                        </div>

                        <div className="space-y-8">
                            <form onSubmit={handleAddressSubmit} className={`bg-white p-8 shadow-sm border-t-4 ${isAddressSaved ? 'border-peacock-500' : 'border-gray-200'} transition-colors duration-500 relative`}>
                                {isAddressSaved && (<div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]"></div>)}
                                <div className="mb-12">
                                    <div className="flex justify-between items-center mb-6 relative z-20">
                                        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-krishna-800 text-white flex items-center justify-center font-bold text-sm">1</div><h2 className="text-lg font-bold uppercase tracking-widest text-krishna-900">Billing Address</h2></div>
                                    </div>
                                    <AddressFormFields form={billingForm} onChange={(e) => setBillingForm({ ...billingForm, [e.target.name]: e.target.value })} disabled={isAddressSaved} />
                                </div>

                                <div className="border-t border-gray-200 my-8"></div>

                                <div className="mb-6">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 relative z-20 gap-4">
                                        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-krishna-800 text-white flex items-center justify-center font-bold text-sm">2</div><h2 className="text-lg font-bold uppercase tracking-widest text-krishna-900">Delivery Address</h2></div>
                                        <label className="flex items-center cursor-pointer"><input type="checkbox" checked={sameAsBilling} onChange={(e) => setSameAsBilling(e.target.checked)} disabled={isAddressSaved} className="w-4 h-4 text-krishna-800 focus:ring-krishna-800 rounded border-gray-300" /><span className="ml-2 text-sm text-gray-600 font-medium">Same as Billing Address</span></label>
                                    </div>
                                    {!sameAsBilling && (<div className="animate-fade-in"><AddressFormFields form={shippingForm} onChange={(e) => setShippingForm({ ...shippingForm, [e.target.name]: e.target.value })} disabled={isAddressSaved} /></div>)}
                                </div>

                                {isAuthenticated && (
                                    <div className="mb-6 relative z-20">
                                        <label className="flex items-center cursor-pointer p-4 bg-gray-50 rounded border border-gray-100 hover:border-gold-300 transition-colors">
                                            <input type="checkbox" checked={saveAddressForNextTime} onChange={(e) => setSaveAddressForNextTime(e.target.checked)} disabled={isAddressSaved} className="w-4 h-4 text-krishna-800 focus:ring-krishna-800 rounded border-gray-300" />
                                            <span className="ml-3 text-sm text-krishna-900 font-medium flex items-center"><Save size={16} className="mr-2 text-gold-600" /> Save this address for next time</span>
                                        </label>
                                    </div>
                                )}

                                <div className="mb-6 relative z-20">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">Order Notes (Optional)</label>
                                    <textarea value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} disabled={isAddressSaved} placeholder="Notes about your order..." className="w-full border border-gray-200 rounded p-3 text-sm outline-none focus:border-krishna-800 bg-white text-krishna-900 h-20" />
                                </div>

                                {!isAddressSaved ? (
                                    <button type="submit" className="w-full bg-krishna-800 text-white py-4 uppercase font-bold tracking-widest text-xs hover:bg-peacock-600 transition-colors shadow-md relative z-20">
                                        Save Address & Calculate Shipping
                                    </button>
                                ) : (
                                    <div className="flex justify-between items-center relative z-20 pt-4 border-t border-gray-100">
                                        <span className="text-xs font-bold text-peacock-700 flex items-center"><CheckCircle size={16} className="mr-1" /> Address & Shipping Saved</span>
                                        <button type="button" onClick={() => setIsAddressSaved(false)} className="text-xs text-krishna-800 underline font-bold hover:text-peacock-600">Edit Address</button>
                                    </div>
                                )}
                            </form>

                            {isAddressSaved && (
                                <div className="bg-white p-8 shadow-sm border-t-4 border-krishna-800 animate-fade-in-up">
                                    <div className="flex items-center gap-2 mb-6"><div className="w-8 h-8 rounded-full bg-krishna-800 text-white flex items-center justify-center font-bold text-sm">3</div><h2 className="text-lg font-bold uppercase tracking-widest text-krishna-900">Order Method</h2></div>
                                    <div className="space-y-4 mb-8">
                                        <label className="flex items-center justify-between p-4 border border-krishna-800 bg-krishna-50 cursor-pointer transition-colors rounded-sm">
                                            <div className="flex items-center">
                                                <input type="radio" checked readOnly className="text-krishna-800 focus:ring-krishna-800" />
                                                <div className="ml-3">
                                                    <div className="flex items-center gap-2"><span className="font-bold text-krishna-900 text-base">Pay on Delivery / Direct Order</span><span className="bg-peacock-600 text-white text-[9px] px-2 py-0.5 rounded uppercase font-bold">Fast</span></div>
                                                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-2"><CheckCircle size={14} className="text-peacock-600" /> Instant confirmation & digital receipt generation</p>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-peacock-100 flex items-center justify-center text-peacock-700"><CheckCircle size={18} /></div>
                                        </label>
                                    </div>

                                    <button onClick={handleFinalPayment} disabled={loading} className="w-full bg-krishna-800 text-white py-5 uppercase tracking-widest font-bold hover:bg-peacock-600 border border-transparent transition-all duration-300 shadow-lg disabled:opacity-70 flex justify-center items-center">
                                        {loading ? 'Processing...' : `Place Order - ₹${finalPayable.toFixed(2)}`}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 shadow-lg sticky top-32">
                            <h3 className="font-serif text-xl text-navy-900 mb-6 pb-4 border-b border-gray-100">In Your Bag ({cart.length})</h3>
                            <div className="space-y-6 mb-8 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                                {cart.map(item => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group items-start">
                                        <div className="w-16 h-20 overflow-hidden relative flex-shrink-0"><img src={item.image} className="w-full h-full object-cover" alt={item.name} /></div>
                                        <div className="flex-1">
                                            <h4 className="font-serif text-navy-900 text-sm leading-tight mb-1">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                                            {item.selectedSize && <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded text-navy-900 font-bold block w-fit mb-1">Size: {item.selectedSize}</span>}
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-navy-900">Qty: {item.quantity}</span>
                                                <p className="text-sm font-medium text-navy-900 font-sans">₹{(item.discountPrice || item.price) * item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-100 pt-6 space-y-2 text-sm">
                                <div className="flex justify-between text-gray-500"><span className="font-sans">Subtotal</span><span className="font-sans">₹{cartTotal}</span></div>
                                <div className="flex justify-between text-gray-500"><div className="flex flex-col"><span className="font-sans">Shipping</span>{isAddressSaved && <span className="text-[10px] text-gray-400">To: {shippingForm.state}</span>}</div>{isAddressSaved ? (<span className={`font-sans ${calculatedShipping === 0 ? 'text-green-600 font-bold' : ''}`}>{calculatedShipping === 0 ? 'Free' : `₹${calculatedShipping}`}</span>) : (<span className="text-xs text-orange-500">Enter Address</span>)}</div>
                                <div className="flex justify-between text-gray-500"><span className="font-sans">Tax ({globalSettings?.taxRate || 0}%)</span><span className="font-sans">₹{taxAmount.toFixed(2)}</span></div>
                                <div className="flex justify-between text-navy-900 font-bold text-lg pt-4"><span>Total</span><span className="font-sans">₹{finalPayable.toFixed(2)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
