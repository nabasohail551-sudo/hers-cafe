/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Coffee,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Menu as MenuIcon,
  X,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Star,
  CheckCircle,
  Search,
  Filter,
  ChevronDown,
  Info,
  Heart,
  Share2,
  Eye,
  Send,
  UtensilsCrossed,
} from 'lucide-react';
import {
  CAFE_DETAILS,
  MENU_CATEGORIES,
  ALL_MENU_ITEMS,
  CAFE_GALLERY_IMAGES,
  DEMO_REVIEWS,
  FAQ_ITEMS,
  MenuItem,
} from './data/cafeData';
import { HersCafeLogo } from './components/HersCafeLogo';

interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export function App() {
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Ordering Tray / Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [orderSpecialNotes, setOrderSpecialNotes] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick View Modal
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);

  // Gallery Lightbox
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
    caption: string;
  } | null>(null);

  // FAQ open item
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Toast notification timer
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add to Cart
  const addToCart = (item: MenuItem, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + qty } : ci
        );
      }
      return [...prev, { item, quantity: qty }];
    });
    showToast(`Added ${item.name} (Rs. ${item.price}) to your order tray`);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const totalCartCount = useMemo(
    () => cart.reduce((acc, curr) => acc + curr.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0),
    [cart]
  );

  // Filtered Menu Items
  const filteredItems = useMemo(() => {
    return ALL_MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.flavorNotes.some((fn) =>
          fn.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesBestseller = !onlyBestsellers || item.isBestseller;
      return matchesCategory && matchesSearch && matchesBestseller;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, onlyBestsellers, sortBy]);

  // Generate WhatsApp Order Message
  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.item.name} — Rs. ${ci.item.price * ci.quantity}`
      )
      .join('\n');

    const message = encodeURIComponent(
      `Hello Hers Cafe Karachi!\n\nI would like to place an order from your demo menu:\n\n${itemsList}\n\n*Total Amount:* Rs. ${cartSubtotal.toLocaleString()}\n*Order Type:* ${orderType.toUpperCase()}\n${
        customerName ? `*Customer Name:* ${customerName}\n` : ''
      }${orderSpecialNotes ? `*Special Notes:* ${orderSpecialNotes}\n` : ''}\n(Please confirm availability and order details)`
    );

    window.open(`https://wa.me/${CAFE_DETAILS.whatsappRaw}?text=${message}`, '_blank');
  };

  // Direct WhatsApp Chat
  const openDirectWhatsApp = (customText?: string) => {
    const text = encodeURIComponent(
      customText ||
        'Hello Hers Cafe Karachi! I am browsing your website demo and would like to ask a question.'
    );
    window.open(`https://wa.me/${CAFE_DETAILS.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#241C18] antialiased selection:bg-[#EBDDC8] selection:text-[#241C18]">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#231A14] text-[#FAF7F2] px-5 py-3.5 rounded-xl shadow-2xl border border-[#C5A059]/40 animate-fade-in text-sm">
          <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Sticky Header with Light Brown Palette */}
      <header className="sticky top-0 z-40 bg-[#E8DCCB]/95 backdrop-blur-md border-b border-[#D8C7B0] transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo with Exact Circular Emblem */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <HersCafeLogo size={56} className="shadow-xs" />
            </div>
            <div>
              <span className="font-serif text-2xl tracking-[0.16em] uppercase font-bold text-[#2A1F18] block leading-none">
                HERS CAFÉ
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#7A6352] block mt-1 font-semibold">
                DESSERTS • WAFFLES • COFFEE
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-[#4A3B32]">
            <a href="#menu" className="hover:text-[#9A7228] transition-colors">
              Menu
            </a>
            <a href="#bestsellers" className="hover:text-[#9A7228] transition-colors">
              Bestsellers
            </a>
            <a href="#about" className="hover:text-[#9A7228] transition-colors">
              About
            </a>
            <a href="#gallery" className="hover:text-[#9A7228] transition-colors">
              Gallery
            </a>
            <a href="#reviews" className="hover:text-[#9A7228] transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hover:text-[#9A7228] transition-colors">
              FAQ
            </a>
            <a href="#contact" className="hover:text-[#9A7228] transition-colors">
              Contact
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Foodpanda Order Badge */}
            <a
              href={CAFE_DETAILS.foodpandaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#D70F64] hover:bg-[#C20D5A] text-white text-[11px] font-bold tracking-wide transition-all shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>foodpanda</span>
            </a>

            {/* Cart / Order Tray Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#DFD1BF] hover:bg-[#D5C4AF] text-[#2A1F18] text-xs font-semibold tracking-wide border border-[#CBB8A2] transition-all shadow-xs"
              aria-label="View Order Tray"
            >
              <ShoppingBag className="w-4 h-4 text-[#8C621C]" />
              <span className="hidden sm:inline">Order Tray</span>
              {totalCartCount > 0 ? (
                <span className="inline-flex items-center justify-center bg-[#2A1F18] text-[#DFC28A] text-[10px] font-bold w-5 h-5 rounded-full">
                  {totalCartCount}
                </span>
              ) : (
                <span className="text-[11px] text-[#7A6352]">0</span>
              )}
            </button>

            {/* WhatsApp Quick Order Button */}
            <button
              onClick={() => openDirectWhatsApp()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A1F18] hover:bg-[#3D2E24] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase border border-[#C5A059]/40 shadow-sm transition-all hover:shadow"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>WhatsApp</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#2A1F18] hover:bg-[#DFD1BF] transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DEC9] px-6 py-5 space-y-4 animate-fade-in shadow-xl">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E8DEC9]/80">
              <HersCafeLogo size={46} />
              <div>
                <span className="font-serif text-lg font-bold tracking-[0.16em] uppercase text-[#2A1F18] block leading-none">
                  HERS CAFÉ
                </span>
                <span className="text-[9px] tracking-[0.22em] uppercase text-[#8C7662] block mt-1 font-semibold">
                  DESSERTS • WAFFLES • COFFEE
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold uppercase tracking-wider text-[#54433A]">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-[#EFE7D8] transition-colors"
              >
                Menu
              </a>
              <a
                href="#bestsellers"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-[#EFE7D8] transition-colors"
              >
                Bestsellers
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-[#EFE7D8] transition-colors"
              >
                About
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-[#EFE7D8] transition-colors"
              >
                Gallery
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-[#EFE7D8] transition-colors"
              >
                Reviews
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-[#EFE7D8] transition-colors"
              >
                FAQ
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-[#EFE7D8] transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="pt-3 border-t border-[#E8DEC9] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#EFE7D8] text-[#2A1F18] font-semibold text-xs tracking-wider uppercase border border-[#DDD0BC]"
              >
                <ShoppingBag className="w-4 h-4 text-[#9A7228]" />
                View Order Tray ({totalCartCount} items)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDirectWhatsApp();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2A1F18] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                Order via WhatsApp
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION with Light Brown Background */}
      <section className="relative overflow-hidden bg-[#EFE5D7] border-b border-[#D8C7B0]">
        {/* 4. Div with Light Brown Background */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 bg-[#E8DCCB]/70 rounded-3xl my-6 border border-[#D8C7B0] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* 3. Left Content Column with Enhanced Dessert Picture Background */}
            <div className="lg:col-span-7 relative rounded-3xl p-6 sm:p-10 overflow-hidden shadow-lg border border-[#D5C2AA] text-center lg:text-left group">
              {/* Enhanced Dessert background picture with rich warm overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={CAFE_DETAILS.heroImage}
                  alt="Hers Cafe Signature Belgian Waffle & Gelato Dessert"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center scale-105 filter contrast-[1.12] saturate-[1.26] brightness-[1.02] transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Refined gradient overlay ensuring the mouthwatering dessert details (golden waffle, strawberries, chocolate glaze & gelato) are vividly visible while text stays razor-sharp */}
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#FAF6EE]/94 via-[#FAF6EE]/80 to-[#FAF6EE]/35 sm:to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#2A1F18]/10 via-transparent to-[#2A1F18]/25 pointer-events-none"></div>
              </div>

              {/* Content layer positioned on top */}
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAF6EE]/95 backdrop-blur-sm border border-[#DFC28A]/80 text-[#7A5B20] text-xs font-semibold tracking-wider uppercase shadow-xs">
                  <HersCafeLogo size={22} showTagline={false} />
                  <span>Karachi’s Artisanal Dessert Sanctuary</span>
                </div>

                <div className="bg-[#FAF6EE]/85 backdrop-blur-xs rounded-2xl p-4 sm:p-6 border border-[#DFC28A]/40 shadow-xs inline-block text-left">
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#241B15] font-bold tracking-tight leading-[1.12]">
                    A Little Sweetness, <br className="hidden sm:inline" />
                    <span className="italic font-normal text-[#9A7228]">A Lot of Happiness</span>
                  </h1>

                  <p className="text-base sm:text-lg text-[#5A493F] max-w-2xl leading-relaxed mt-4 font-normal">
                    {CAFE_DETAILS.subtitle}
                  </p>
                </div>

                {/* Call-to-Action Buttons including Foodpanda */}
                <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3.5">
                  <a
                    href="#menu"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#2A1F18] hover:bg-[#3E2F25] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase shadow-md transition-all hover:scale-[1.02]"
                  >
                    <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
                    <span>Explore Our Menu</span>
                  </a>

                  <button
                    onClick={() => openDirectWhatsApp('Hello Hers Cafe! I would like to order on WhatsApp.')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#DFD1BF] hover:bg-[#D5C4AF] text-[#2A1F18] font-semibold text-xs tracking-wider uppercase border border-[#CBB8A2] shadow-xs transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#1E7E34]" />
                    <span>Order on WhatsApp</span>
                  </button>

                  <a
                    href={CAFE_DETAILS.foodpandaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D70F64] hover:bg-[#C20D5A] text-white font-bold text-xs tracking-wider uppercase shadow-md transition-all hover:scale-[1.02]"
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    <span>Order on foodpanda</span>
                  </a>
                </div>

                {/* Highlights Strip with frosted backing */}
                <div className="pt-6 border-t border-[#D8C7B0]/90 grid grid-cols-3 gap-4 text-center lg:text-left bg-[#FAF6EE]/80 backdrop-blur-xs p-3.5 rounded-xl border border-[#DFC28A]/30">
                  <div>
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#2A1F18]">
                      Fresh Griddled
                    </span>
                    <span className="text-xs text-[#7A675B] font-medium">Belgian Waffles</span>
                  </div>
                  <div>
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#2A1F18]">
                      Specialty Roast
                    </span>
                    <span className="text-xs text-[#7A675B] font-medium">Espresso & Lattes</span>
                  </div>
                  <div>
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#2A1F18]">
                      100% Belgian
                    </span>
                    <span className="text-xs text-[#7A675B] font-medium">Cocoa & Valrhona</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none group">
                {/* Decorative border frame */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#DFC28A]/40 via-[#C5A059]/20 to-transparent blur-md group-hover:blur-lg transition-all"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFDFB] bg-[#FFFDFB]">
                  <img
                    src={CAFE_DETAILS.heroImage}
                    alt="Hers Cafe Signature Belgian Waffle & Gelato Dessert"
                    referrerPolicy="no-referrer"
                    className="w-full h-[400px] sm:h-[480px] object-cover filter contrast-[1.12] saturate-[1.28] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                    onClick={() =>
                      setLightboxImage({
                        src: CAFE_DETAILS.heroImage,
                        title: 'Signature Belgian Waffle & Artisan Gelato',
                        caption:
                          'Golden crisp Belgian waffle smothered in molten dark chocolate, crowned with artisan vanilla bean gelato, fresh ripe strawberries, and Biscoff speculoos crumble.',
                      })
                    }
                  />

                  {/* Enhanced Dessert Badge in Corner */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#241B15]/85 backdrop-blur-md text-[#DFC28A] border border-[#DFC28A]/40 text-[11px] font-bold tracking-wide shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-[#DFC28A] animate-pulse" />
                      <span>Signature Dessert</span>
                    </span>
                  </div>

                  {/* Floating interactive badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#231A14]/90 backdrop-blur-md text-[#FAF7F2] p-4 rounded-2xl border border-[#C5A059]/40 flex items-center justify-between shadow-xl">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#DFC28A] font-semibold block">
                        Signature Masterpiece
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#FFFDFB]">
                        Belgian Waffle & Gelato Supreme
                      </h4>
                      <p className="text-xs text-[#D8CEBF]">
                        Warm chocolate drip, strawberries & Lotus crumble
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        openDirectWhatsApp(
                          'Hello Hers Cafe! Can I order your signature Belgian Waffle & Gelato Supreme?'
                        )
                      }
                      className="px-3.5 py-2 rounded-xl bg-[#DFC28A] hover:bg-[#ECCFA0] text-[#231A14] text-xs font-bold shrink-0 transition-colors shadow-xs"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BESTSELLERS STRIP */}
      <section id="bestsellers" className="py-16 bg-[#F4EDE2] border-b border-[#E8DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7228] block mb-2">
                Curated Favorites
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B15]">
                Most-Loved by Karachi
              </h2>
            </div>
            <p className="text-sm text-[#6E5B50] max-w-md">
              Handcrafted selections renowned for crisp textures, rich Belgian cocoa, and velvety smoothness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_MENU_ITEMS.filter((item) => item.isBestseller)
              .slice(0, 4)
              .map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#FFFDFB] rounded-2xl overflow-hidden border border-[#E5DAC6] shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE8DC]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#2A1F18] text-[#DFC28A] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.tag || 'Bestseller'}
                    </div>
                    <button
                      onClick={() => setQuickViewItem(item)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFFDFB]/90 backdrop-blur-xs flex items-center justify-center text-[#2A1F18] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FFFDFB]"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-serif text-lg font-bold text-[#2A1F18]">
                          {item.name}
                        </h3>
                        <span className="text-sm font-bold text-[#9A7228] whitespace-nowrap">
                          {item.priceFormatted}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A675B] line-clamp-2 mb-3">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F2EADB] flex items-center justify-between gap-2">
                      <button
                        onClick={() => setQuickViewItem(item)}
                        className="text-xs text-[#9A7228] hover:underline font-semibold"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2A1F18] hover:bg-[#3D2E24] text-[#FAF7F2] text-xs font-semibold transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#DFC28A]" />
                        <span>Order Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* COMPLETE VISUAL MENU SECTION */}
      <section id="menu" className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7228] block mb-2">
              The Complete Visual Menu
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#241B15] mb-4">
              Explore Our Creations
            </h2>
            <p className="text-sm sm:text-base text-[#655348] leading-relaxed">
              Every dish and beverage crafted with passion, premium ingredients, and fresh preparation.
              Browse individual categories or search your desired craving below.
            </p>

            {/* Demo Menu Notice Banner */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F0E6D4] border border-[#DFC28A]/40 text-[#6B501B] text-xs">
              <Info className="w-4 h-4 shrink-0 text-[#9A7228]" />
              <span>
                <strong>Sample Menu Items & Pricing:</strong> Clearly marked demo items and sample PKR prices pending official confirmation by Hers Cafe.
              </span>
            </div>
          </div>

          {/* Search, Filter & Category Tabs Toolbar */}
          <div className="space-y-6 mb-12">
            {/* Category Navigation Tabs */}
            <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all border ${
                      isActive
                        ? 'bg-[#2A1F18] text-[#FAF7F2] border-[#2A1F18] shadow-sm'
                        : 'bg-[#FFFDFB] text-[#54433A] border-[#E2D6C2] hover:bg-[#F4ECE0]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search and Secondary Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFFDFB] p-4 rounded-2xl border border-[#E5DAC6] shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#8C7662] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search waffles, pancakes, lattes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#DDD0BC] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#C5A059] text-[#241C18]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7662]"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end text-xs">
                {/* Bestseller Toggle */}
                <button
                  onClick={() => setOnlyBestsellers(!onlyBestsellers)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                    onlyBestsellers
                      ? 'bg-[#EBDDC8] text-[#2A1F18] border-[#DFC28A] font-semibold'
                      : 'bg-[#FAF7F2] text-[#655348] border-[#DDD0BC]'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${onlyBestsellers ? 'text-[#9A7228] fill-[#9A7228]' : ''}`} />
                  <span>Bestsellers Only</span>
                </button>

                {/* Sort dropdown */}
                <div className="flex items-center gap-1 text-[#655348]">
                  <span>Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-[#FAF7F2] border border-[#DDD0BC] rounded-lg px-2.5 py-1.5 text-xs text-[#2A1F18] focus:outline-hidden"
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFDFB] rounded-2xl border border-[#E5DAC6]">
              <UtensilsCrossed className="w-12 h-12 text-[#B39E8C] mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#241B15]">No items match your query</h3>
              <p className="text-xs text-[#7A675B] mt-1 mb-4">
                Try clearing your search keyword or switching category tabs.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setOnlyBestsellers(false);
                }}
                className="px-4 py-2 rounded-lg bg-[#2A1F18] text-[#FAF7F2] text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#FFFDFB] rounded-2xl overflow-hidden border border-[#E8DEC9] hover:border-[#D5C4AA] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE8DC]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category / Bestseller Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {item.tag && (
                        <span className="bg-[#2A1F18]/90 backdrop-blur-xs text-[#DFC28A] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                          {item.tag}
                        </span>
                      )}
                      <span className="bg-[#FAF7F2]/90 backdrop-blur-xs text-[#54433A] text-[10px] font-medium px-2 py-0.5 rounded-md">
                        {item.categoryLabel}
                      </span>
                    </div>

                    {/* Quick View Icon */}
                    <button
                      onClick={() => setQuickViewItem(item)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFFDFB]/90 backdrop-blur-xs flex items-center justify-center text-[#2A1F18] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FFFDFB] shadow-sm"
                      title="Quick Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-serif text-lg font-bold text-[#2A1F18] leading-tight">
                          {item.name}
                        </h3>
                        <span className="font-serif text-base font-bold text-[#9A7228] whitespace-nowrap">
                          {item.priceFormatted}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-[#7C685A] mb-2">
                        {item.subtitle}
                      </p>

                      <p className="text-xs text-[#635349] leading-relaxed line-clamp-2 mb-3">
                        {item.description}
                      </p>

                      {/* Flavor Note Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.flavorNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4EDE2] text-[#6E5B50] font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-[#F2EADB] flex items-center justify-between gap-2">
                      <button
                        onClick={() => setQuickViewItem(item)}
                        className="text-xs font-semibold text-[#8C7662] hover:text-[#2A1F18] transition-colors"
                      >
                        Tasting Notes
                      </button>

                      <button
                        onClick={() => addToCart(item)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2A1F18] hover:bg-[#3D2E24] text-[#FAF7F2] text-xs font-semibold tracking-wide shadow-xs hover:shadow transition-all"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#DFC28A]" />
                        <span>Order Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Category Jump Banners */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F5ECE0] border border-[#E0D2BD] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7228]">
                  Golden Crisp
                </span>
                <h4 className="font-serif text-xl font-bold text-[#2A1F18] mt-1">Belgian Waffles</h4>
                <p className="text-xs text-[#6E5B50] mt-1">From Rs. 650 with Belgian cocoa & Lotus</p>
              </div>
              <button
                onClick={() => setSelectedCategory('waffles')}
                className="w-10 h-10 rounded-full bg-[#2A1F18] text-[#DFC28A] flex items-center justify-center hover:scale-105 transition-transform"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5ECE0] border border-[#E0D2BD] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7228]">
                  Hot & Molten
                </span>
                <h4 className="font-serif text-xl font-bold text-[#2A1F18] mt-1">Brownies & Lava Cakes</h4>
                <p className="text-xs text-[#6E5B50] mt-1">From Rs. 450 baked with Dutch cocoa</p>
              </div>
              <button
                onClick={() => setSelectedCategory('brownies_cakes')}
                className="w-10 h-10 rounded-full bg-[#2A1F18] text-[#DFC28A] flex items-center justify-center hover:scale-105 transition-transform"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5ECE0] border border-[#E0D2BD] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7228]">
                  Chilled & Brewed
                </span>
                <h4 className="font-serif text-xl font-bold text-[#2A1F18] mt-1">Shakes & Specialty Brews</h4>
                <p className="text-xs text-[#6E5B50] mt-1">From Rs. 350 fresh espresso & lemons</p>
              </div>
              <button
                onClick={() => setSelectedCategory('coffee_drinks')}
                className="w-10 h-10 rounded-full bg-[#2A1F18] text-[#DFC28A] flex items-center justify-center hover:scale-105 transition-transform"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT HERS CAFE SECTION */}
      <section id="about" className="py-20 bg-[#F4ECE0] border-y border-[#E8DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Showcase collage */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-[#FFFDFB]">
                <img
                  src={CAFE_GALLERY_IMAGES[3].src}
                  alt="Hers Cafe Karachi Interior"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231A14]/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-[#FAF7F2]">
                  <span className="text-[10px] uppercase tracking-wider text-[#DFC28A] font-semibold">
                    The Atmosphere
                  </span>
                  <h4 className="font-serif text-lg font-bold">A Calming Karachi Haven</h4>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border-2 border-[#FFFDFB] shadow-sm">
                  <img
                    src={CAFE_GALLERY_IMAGES[1].src}
                    alt="Fresh Waffles"
                    className="w-full h-36 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border-2 border-[#FFFDFB] shadow-sm">
                  <img
                    src={CAFE_GALLERY_IMAGES[2].src}
                    alt="Specialty Coffee"
                    className="w-full h-36 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Editorial Story */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7228] block">
                The Hers Experience
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#241B15] leading-tight">
                Where Slow Conversations <br />
                Meet Decadent Sweetness
              </h2>
              <p className="text-sm sm:text-base text-[#655348] leading-relaxed">
                Hers Cafe was envisioned as an intimate sanctuary amidst Karachi’s vibrant energy. We believe
                dessert is not just a treat, but an unhurried ritual of happiness — whether it’s the crunch of a
                caramelized Liege waffle fresh off the griddle or the warm comfort of a molten chocolate lava cake
                paired with velvety cappuccino.
              </p>

              {/* Three Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="p-4 rounded-xl bg-[#FFFDFB] border border-[#E5DAC6]">
                  <div className="w-8 h-8 rounded-lg bg-[#2A1F18] text-[#DFC28A] flex items-center justify-center mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#2A1F18]">Pure Ingredients</h4>
                  <p className="text-xs text-[#7A675B] mt-1 leading-normal">
                    Belgian chocolate, Madagascar vanilla, and pure dairy butter.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FFFDFB] border border-[#E5DAC6]">
                  <div className="w-8 h-8 rounded-lg bg-[#2A1F18] text-[#DFC28A] flex items-center justify-center mb-3">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#2A1F18]">Baked to Order</h4>
                  <p className="text-xs text-[#7A675B] mt-1 leading-normal">
                    Waffles pressed and desserts finished upon your order.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FFFDFB] border border-[#E5DAC6]">
                  <div className="w-8 h-8 rounded-lg bg-[#2A1F18] text-[#DFC28A] flex items-center justify-center mb-3">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#2A1F18]">Specialty Coffee</h4>
                  <p className="text-xs text-[#7A675B] mt-1 leading-normal">
                    Precision extracted espresso and silky microfoam.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => openDirectWhatsApp('Hello! I would like to reserve a table at Hers Cafe.')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2A1F18] hover:bg-[#3D2E24] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span>Reserve a Table via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOD & CAFE GALLERY SECTION */}
      <section id="gallery" className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7228] block mb-2">
              Visual Chronicle
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B15]">
              Moments of Indulgence
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5B50] mt-2">
              Click any photograph to view high-resolution details and captions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAFE_GALLERY_IMAGES.map((img) => (
              <div
                key={img.id}
                onClick={() => setLightboxImage(img)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFE8DC] cursor-pointer border border-[#E8DEC9] shadow-xs hover:shadow-xl transition-all"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231A14]/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 right-4 text-[#FAF7F2]">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#DFC28A] block">
                    {img.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#FFFDFB] mt-0.5">
                    {img.title}
                  </h4>
                  <p className="text-xs text-[#D8CEBF] line-clamp-1 mt-0.5">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS SECTION */}
      <section id="reviews" className="py-20 bg-[#F5ECE0] border-t border-[#E8DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7228] block mb-2">
              Guest Reflections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B15]">
              Loved by Karachi’s Sweet Tooths
            </h2>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#EBDDC8] text-[#7A5B20] text-[11px] font-medium border border-[#D5C4AA]">
              Demo Customer Feedback Placeholders
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEMO_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-8 rounded-2xl bg-[#FFFDFB] border border-[#E5DAC6] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C5A059] mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#4A3B32] italic leading-relaxed mb-6 font-normal">
                    “{rev.comment}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2EADB] flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#2A1F18]">
                      {rev.author}
                    </h4>
                    <span className="text-xs text-[#7A675B]">{rev.role}</span>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#F4EDE2] text-[#9A7228] font-bold">
                    {rev.favoriteItem}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-20 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7228] block mb-2">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B15]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5B50] mt-2">
              Everything you need to know about ordering, visiting, and our demo presentation.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#E8DEC9] bg-[#FFFDFB] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-bold text-[#2A1F18] hover:text-[#9A7228] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#9A7228] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[#635349] leading-relaxed border-t border-[#F2EADB]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADDRESS & CONTACT SECTION */}
      <section id="contact" className="py-20 bg-[#F4ECE0] border-t border-[#E8DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7228] block mb-2">
              Visit & Connect
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#241B15]">
              Find Hers Cafe in Karachi
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5B50] mt-2">
              Reach out for quick orders, table reservations, or catering queries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 bg-[#FFFDFB] p-8 rounded-2xl border border-[#E5DAC6] shadow-md space-y-6">
              <div className="border-b border-[#F2EADB] pb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7228] block">
                  Official Entity
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2A1F18] mt-1">
                  {CAFE_DETAILS.name}
                </h3>
                <span className="text-xs text-[#7A675B]">{CAFE_DETAILS.city}</span>
              </div>

              {/* Verified Information Details */}
              <div className="space-y-5 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F5ECE0] text-[#9A7228] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#2A1F18] uppercase tracking-wider">
                      Address
                    </span>
                    <p className="text-sm text-[#2A1F18] mt-0.5 font-semibold leading-snug">
                      Shop 2/1, Plot 79/1-1-3, Bano Plaza, Main Lasbela Road, Garden East, Soldier Bazaar, Karachi.
                    </p>
                    <span className="text-[11px] text-[#7A6352] block mt-0.5">
                      Main Lasbela Road, Garden East, Karachi
                    </span>
                  </div>
                </div>

                {/* Foodpanda Delivery Card */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFF3F8] border border-[#FAD2E1]">
                  <div className="w-9 h-9 rounded-xl bg-[#D70F64] text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                    fp
                  </div>
                  <div className="flex-1">
                    <span className="block text-xs font-bold text-[#D70F64] uppercase tracking-wider">
                      Order on Foodpanda
                    </span>
                    <p className="text-xs text-[#54433A] mt-0.5 font-medium">
                      Fast delivery to Garden East, Soldier Bazaar, and across Karachi.
                    </p>
                    <a
                      href={CAFE_DETAILS.foodpandaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D70F64] hover:underline mt-1.5"
                    >
                      <span>Open Hers Cafe on foodpanda</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Order Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F5ECE0] text-[#9A7228] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#2A1F18] uppercase tracking-wider">
                      Order Phone
                    </span>
                    <a
                      href={`tel:${CAFE_DETAILS.phoneRaw}`}
                      className="text-sm font-semibold text-[#2A1F18] hover:text-[#9A7228] transition-colors"
                    >
                      {CAFE_DETAILS.phoneDisplay}
                    </a>
                    <span className="text-[11px] text-[#7A6352] block mt-0.5">
                      Call for takeout and reservations
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F5ECE0] text-[#1E7E34] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#2A1F18] uppercase tracking-wider">
                      WhatsApp Orders & Support
                    </span>
                    <a
                      href={`https://wa.me/${CAFE_DETAILS.whatsappRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#1E7E34] hover:underline"
                    >
                      +92 309 2262881
                    </a>
                    <span className="text-[11px] text-[#7A6352] block mt-0.5">
                      Instant WhatsApp concierge & orders
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F5ECE0] text-[#9A7228] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#2A1F18] uppercase tracking-wider">
                      Opening Hours
                    </span>
                    <p className="text-sm text-[#54433A] mt-0.5 font-medium">
                      {CAFE_DETAILS.hoursDisplay}
                    </p>
                    <span className="text-[11px] text-[#7A6352] block mt-0.5">
                      Dine-in, Takeaway & Foodpanda
                    </span>
                  </div>
                </div>

                {/* Google Maps Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F5ECE0] text-[#9A7228] flex items-center justify-center shrink-0 mt-0.5">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#2A1F18] uppercase tracking-wider">
                      Google Maps Location
                    </span>
                    <a
                      href={CAFE_DETAILS.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9A7228] hover:underline mt-1"
                    >
                      <span>Open Map Pin (Bano Plaza, Lasbela Road)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-[11px] text-[#7A6352] block mt-0.5">
                      Main Lasbela Road, Garden East, Karachi
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Ordering Callout */}
              <div className="pt-2">
                <button
                  onClick={() => openDirectWhatsApp()}
                  className="w-full py-3.5 rounded-xl bg-[#2A1F18] hover:bg-[#3D2E24] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span>Start WhatsApp Conversation</span>
                </button>
              </div>
            </div>

            {/* Interactive Enquiry Form */}
            <div className="lg:col-span-7 bg-[#FFFDFB] p-8 rounded-2xl border border-[#E5DAC6] shadow-md">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7228] block mb-1">
                Drop Us A Message
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#241B15] mb-2">
                Send an Enquiry to Hers Cafe
              </h3>
              <p className="text-xs text-[#6E5B50] mb-6">
                Fill in your message below to send via WhatsApp or demo feedback inquiry.
              </p>

              {contactSubmitted ? (
                <div className="p-8 rounded-xl bg-[#F4ECE0] border border-[#DFC28A] text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-[#1E7E34] mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-[#2A1F18]">
                    Thank You For Reaching Out!
                  </h4>
                  <p className="text-xs text-[#6E5B50]">
                    Your demo inquiry has been received. You can also chat directly on WhatsApp for immediate response.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ name: '', phone: '', message: '' });
                    }}
                    className="mt-3 px-4 py-2 rounded-lg bg-[#2A1F18] text-[#FAF7F2] text-xs font-semibold"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!contactForm.name || !contactForm.message) {
                      showToast('Please enter your name and message');
                      return;
                    }
                    const text = encodeURIComponent(
                      `Hello Hers Cafe!\nName: ${contactForm.name}\nPhone: ${contactForm.phone || 'N/A'}\nMessage: ${contactForm.message}`
                    );
                    window.open(`https://wa.me/${CAFE_DETAILS.whatsappRaw}?text=${text}`, '_blank');
                    setContactSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-bold text-[#2A1F18] uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sara Ahmed"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#DDD0BC] text-xs text-[#241C18] focus:outline-hidden focus:ring-2 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2A1F18] uppercase tracking-wider mb-1.5">
                      Contact Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0300-1234567"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#DDD0BC] text-xs text-[#241C18] focus:outline-hidden focus:ring-2 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2A1F18] uppercase tracking-wider mb-1.5">
                      Your Message or Reservation Note *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your table reservation, custom cake inquiry, or feedback..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#DDD0BC] text-xs text-[#241C18] focus:outline-hidden focus:ring-2 focus:ring-[#C5A059]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#2A1F18] hover:bg-[#3D2E24] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Send className="w-4 h-4 text-[#DFC28A]" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-[#8C7662] text-center pt-1">
                    No automated charge will be made. Messages are sent securely to WhatsApp for confirmation.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1F1713] text-[#FAF7F2] pt-16 pb-12 border-t border-[#382A22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-0.5 rounded-full bg-[#FAF7F2] shadow-md border border-[#C5A059]/40">
                  <HersCafeLogo size={68} />
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold tracking-[0.16em] uppercase text-[#FAF7F2] block">
                    HERS CAFÉ
                  </span>
                  <span className="block text-[10px] tracking-[0.22em] text-[#DFC28A] uppercase font-semibold mt-1">
                    DESSERTS • WAFFLES • COFFEE
                  </span>
                  <span className="block text-[10px] tracking-[0.2em] text-[#CBBFB2] uppercase mt-0.5">
                    Karachi · Pakistan
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#BFB3A6] max-w-sm leading-relaxed">
                “A Little Sweetness, A Lot of Happiness.” An intimate Karachi sanctuary of warm Belgian
                waffles, delicate soufflé pancakes, artisanal cocoa desserts, and specialty espresso.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-[#DFC28A]">
                <a
                  href={`https://instagram.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Instagram {CAFE_DETAILS.instagram}</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DFC28A] block">
                Navigation
              </span>
              <ul className="space-y-2 text-xs text-[#D8CEBF]">
                <li>
                  <a href="#menu" className="hover:text-[#FFFDFB] transition-colors">
                    Visual Menu (22 Items)
                  </a>
                </li>
                <li>
                  <a href="#bestsellers" className="hover:text-[#FFFDFB] transition-colors">
                    Featured Bestsellers
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#FFFDFB] transition-colors">
                    Our Story & Ambience
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#FFFDFB] transition-colors">
                    Food & Café Gallery
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#FFFDFB] transition-colors">
                    FAQ & Demo Details
                  </a>
                </li>
              </ul>
            </div>

            {/* Menu Categories */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DFC28A] block">
                Menu Categories
              </span>
              <ul className="space-y-2 text-xs text-[#D8CEBF]">
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('waffles');
                      window.location.hash = '#menu';
                    }}
                    className="hover:text-[#FFFDFB] transition-colors text-left"
                  >
                    Belgian Waffles (Rs. 650 - 950)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('pancakes');
                      window.location.hash = '#menu';
                    }}
                    className="hover:text-[#FFFDFB] transition-colors text-left"
                  >
                    Buttermilk Pancakes (Rs. 650 - 900)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('brownies_cakes');
                      window.location.hash = '#menu';
                    }}
                    className="hover:text-[#FFFDFB] transition-colors text-left"
                  >
                    Brownies & Lava Cake (Rs. 450 - 650)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('ice_cream');
                      window.location.hash = '#menu';
                    }}
                    className="hover:text-[#FFFDFB] transition-colors text-left"
                  >
                    Ice Cream & Sundaes (Rs. 250 - 650)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('coffee_drinks');
                      window.location.hash = '#menu';
                    }}
                    className="hover:text-[#FFFDFB] transition-colors text-left"
                  >
                    Coffee & Drinks (Rs. 350 - 550)
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DFC28A] block">
                Quick Connect
              </span>
              <p className="text-xs text-[#D8CEBF] leading-relaxed">
                Shop 2/1, Plot 79/1-1-3, Bano Plaza, Main Lasbela Road, Garden East, Soldier Bazaar, Karachi.
              </p>
              <p className="text-xs text-[#D8CEBF]">
                WhatsApp: +92 309 2262881
              </p>
              <div className="pt-1 flex flex-wrap gap-2">
                <button
                  onClick={() => openDirectWhatsApp()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2E221A] text-[#DFC28A] border border-[#C5A059]/40 text-xs font-semibold hover:bg-[#3D2E24] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </button>
                <a
                  href={CAFE_DETAILS.foodpandaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D70F64] text-white text-xs font-bold hover:bg-[#C20D5A] transition-colors"
                >
                  foodpanda
                </a>
              </div>
            </div>
          </div>

          {/* Legal / Unofficial Concept Demo Footnote */}
          <div className="pt-8 border-t border-[#382A22] text-center space-y-2 text-[11px] text-[#A49487]">
            <p>
              {CAFE_DETAILS.disclaimer}
            </p>
            <p>
              © {new Date().getFullYear()} Hers Cafe — Unofficial Concept Presentation Demo · Karachi, Pakistan.
            </p>
          </div>
        </div>
      </footer>

      {/* SLIDING ORDER TRAY / CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-[#1F1713]/60 backdrop-blur-xs transition-opacity"
          ></div>

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-[#E2D6C2]">
              {/* Drawer Header */}
              <div className="p-6 bg-[#2A1F18] text-[#FAF7F2] flex items-center justify-between border-b border-[#3E2F25]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#DFC28A]" />
                  <div>
                    <h3 className="font-serif text-lg font-bold">Your Order Tray</h3>
                    <span className="text-[11px] text-[#D8CEBF]">
                      {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} selected
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg text-[#D8CEBF] hover:text-[#FAF7F2] hover:bg-[#3E2F25] transition-colors"
                  aria-label="Close Order Tray"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Items List */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-[#B39E8C] mx-auto" />
                    <h4 className="font-serif text-xl font-bold text-[#2A1F18]">
                      Your tray is empty
                    </h4>
                    <p className="text-xs text-[#7A675B] max-w-xs mx-auto">
                      Explore our 22 waffles, pancakes, brownies, sundaes, and specialty drinks to start your order.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        window.location.hash = '#menu';
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#2A1F18] text-[#FAF7F2] text-xs font-semibold"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((ci) => (
                      <div
                        key={ci.item.id}
                        className="p-3.5 rounded-xl bg-[#FFFDFB] border border-[#E5DAC6] shadow-xs flex items-center gap-3"
                      >
                        <img
                          src={ci.item.image}
                          alt={ci.item.name}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-bold text-[#2A1F18] truncate">
                            {ci.item.name}
                          </h4>
                          <span className="text-xs font-semibold text-[#9A7228] block">
                            Rs. {ci.item.price * ci.quantity}
                          </span>
                          <span className="text-[10px] text-[#8C7662]">
                            (Rs. {ci.item.price} each)
                          </span>
                        </div>
                        {/* Quantity adjuster */}
                        <div className="flex items-center gap-1.5 shrink-0 bg-[#F4EDE2] px-2 py-1 rounded-lg border border-[#E2D6C2]">
                          <button
                            onClick={() => updateCartQuantity(ci.item.id, -1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-[#2A1F18] hover:bg-[#EAE1D2]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#2A1F18] w-4 text-center">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(ci.item.id, 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-[#2A1F18] hover:bg-[#EAE1D2]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(ci.item.id)}
                          className="text-[#9C8B7F] hover:text-[#B91C1C] p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Order Details Customization */}
                    <div className="pt-4 border-t border-[#E8DEC9] space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#2A1F18] uppercase tracking-wider mb-1">
                          Order Type
                        </label>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {(['dine-in', 'takeaway', 'delivery'] as const).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setOrderType(type)}
                              className={`py-2 rounded-lg font-semibold uppercase tracking-wider text-[10px] border transition-all ${
                                orderType === type
                                  ? 'bg-[#2A1F18] text-[#DFC28A] border-[#2A1F18]'
                                  : 'bg-[#FFFDFB] text-[#54433A] border-[#E2D6C2]'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#2A1F18] uppercase tracking-wider mb-1">
                          Your Name (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mahnoor"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFDFB] border border-[#DDD0BC] text-xs text-[#241C18]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#2A1F18] uppercase tracking-wider mb-1">
                          Special Instructions (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Extra hot fudge, less sweet"
                          value={orderSpecialNotes}
                          onChange={(e) => setOrderSpecialNotes(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFDFB] border border-[#DDD0BC] text-xs text-[#241C18]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer Subtotal & WhatsApp Submit */}
              {cart.length > 0 && (
                <div className="p-6 bg-[#FFFDFB] border-t border-[#E8DEC9] space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6E5B50] font-medium">Subtotal</span>
                    <span className="font-serif text-lg font-bold text-[#2A1F18]">
                      Rs. {cartSubtotal.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#8C7662]">
                    *Sample prices. Orders are sent to WhatsApp for confirmation. No advance payment is charged.
                  </p>

                  <button
                    onClick={sendWhatsAppOrder}
                    className="w-full py-4 rounded-xl bg-[#2A1F18] hover:bg-[#3D2E24] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                    <span>Send Order on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setCart([])}
                    className="w-full text-center text-xs text-[#8C7662] hover:text-[#B91C1C] py-1"
                  >
                    Clear Order Tray
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW ITEM MODAL */}
      {quickViewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1713]/70 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#DFC28A]/40 animate-fade-in">
            <div className="relative aspect-[4/3] bg-[#EFE8DC]">
              <img
                src={quickViewItem.image}
                alt={quickViewItem.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setQuickViewItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1F1713]/80 text-[#FAF7F2] flex items-center justify-center hover:bg-[#1F1713]"
              >
                <X className="w-5 h-5" />
              </button>
              {quickViewItem.tag && (
                <span className="absolute bottom-4 left-4 bg-[#2A1F18] text-[#DFC28A] text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  {quickViewItem.tag}
                </span>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7228]">
                    {quickViewItem.categoryLabel}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#2A1F18]">
                    {quickViewItem.name}
                  </h3>
                  <p className="text-xs text-[#7A675B] mt-0.5">{quickViewItem.subtitle}</p>
                </div>
                <span className="font-serif text-xl font-bold text-[#9A7228] whitespace-nowrap">
                  {quickViewItem.priceFormatted}
                </span>
              </div>

              <p className="text-xs text-[#54433A] leading-relaxed">
                {quickViewItem.description}
              </p>

              <div>
                <span className="text-[11px] font-bold text-[#2A1F18] uppercase tracking-wider block mb-1.5">
                  Flavor Profile & Texture
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewItem.flavorNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-[#F0E6D4] text-[#6E5B50] font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DEC9] flex items-center gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewItem);
                    setQuickViewItem(null);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-[#2A1F18] hover:bg-[#3D2E24] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-[#DFC28A]" />
                  <span>Add to Order Tray</span>
                </button>
                <button
                  onClick={() => {
                    openDirectWhatsApp(`Hello Hers Cafe! Can I order ${quickViewItem.name} (${quickViewItem.priceFormatted})?`);
                    setQuickViewItem(null);
                  }}
                  className="px-4 py-3.5 rounded-xl bg-[#EFE5D4] hover:bg-[#E5D8C3] text-[#2A1F18] text-xs font-semibold flex items-center gap-1.5 border border-[#D5C4AA]"
                  title="Direct WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-[#1E7E34]" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY LIGHTBOX MODAL */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1713]/90 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#DFC28A]/40"
          >
            <div className="relative aspect-[16/10] bg-[#1F1713]">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1F1713]/80 text-[#FAF7F2] flex items-center justify-center hover:bg-[#1F1713]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl font-bold text-[#2A1F18]">
                {lightboxImage.title}
              </h3>
              <p className="text-xs text-[#6E5B50] mt-1">{lightboxImage.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING MOBILE ORDER SUMMARY PILL */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full p-4 rounded-2xl bg-[#2A1F18] text-[#FAF7F2] shadow-2xl border border-[#DFC28A]/50 flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#DFC28A] text-[#2A1F18] font-bold text-xs flex items-center justify-center">
                {totalCartCount}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold block uppercase tracking-wider">
                  View Order Tray
                </span>
                <span className="text-[11px] text-[#DFC28A]">
                  Rs. {cartSubtotal.toLocaleString()}
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1 text-[#DFC28A]">
              Review <ChevronRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
