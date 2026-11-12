import React, { useState } from "react";
import "./AddProduct.css";

import {
  ArrowLeft,
  UploadCloud,
  X,
  ImagePlus,
  Package,
  ShieldCheck,
  Save,
  Eye,
  Send
} from "lucide-react";

export default function AddProduct({ language = "sw", onBack }) {
  const sw = language === "sw";

  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    sku: "",
    price: "",
    oldPrice: "",
    stock: "",
    weight: "",
    shipping: "",
  });

  const [message, setMessage] = useState("");

  const text = {
    title: sw ? "Ongeza Bidhaa Mpya" : "Add New Product",
    subtitle: sw
      ? "Jaza taarifa za bidhaa yako ili kuiweka sokoni."
      : "Enter your product details to list it in the marketplace.",
    details: sw ? "Taarifa za Bidhaa" : "Product Information",
    name: sw ? "Jina la Bidhaa" : "Product Name",
    description: sw ? "Maelezo ya Bidhaa" : "Product Description",
    category: sw ? "Aina ya Bidhaa" : "Category",
    brand: sw ? "Chapa (Brand)" : "Brand",
    sku: "SKU",
    images: sw ? "Picha za Bidhaa" : "Product Images",
    imageHint: sw
      ? "Pakia picha nyingi. Chagua picha zilizo wazi na zenye ubora."
      : "Upload multiple clear, high-quality product images.",
    pricing: sw ? "Bei na Stoo" : "Pricing & Inventory",
    price: sw ? "Bei ya Kuuza (TSh)" : "Selling Price (TSh)",
    oldPrice: sw ? "Bei ya Awali (TSh)" : "Original Price (TSh)",
    stock: sw ? "Idadi ya Stoo" : "Stock Quantity",
    shipping: sw ? "Gharama ya Usafirishaji (TSh)" : "Shipping Fee (TSh)",
    weight: sw ? "Uzito (kg)" : "Weight (kg)",
    upload: sw ? "Chagua Picha" : "Choose Images",
    save: sw ? "Hifadhi Draft" : "Save Draft",
    preview: sw ? "Hakiki" : "Preview",
    publish: sw ? "Chapisha Bidhaa" : "Publish Product",
    moderation: sw
      ? "Bidhaa itakaguliwa kiotomatiki kabla ya kuchapishwa. Maudhui ya ngono na bidhaa zilizokatazwa hazitaruhusiwa."
      : "Your listing will undergo automatic checks before publishing. Sexual content and prohibited products are not allowed.",
    required: sw
      ? "Tafadhali jaza jina, maelezo, aina, bei na stock."
      : "Please complete the name, description, category, price and stock.",
    categories: sw
      ? ["Chagua aina", "Elektroniki", "Mavazi", "Viatu", "Urembo", "Nyumbani", "Chakula", "Michezo", "Nyingine"]
      : ["Select category", "Electronics", "Fashion", "Shoes", "Beauty", "Home", "Food", "Sports", "Other"]
  };

  const update = (key, value) => {
    setForm(previous => ({ ...previous, [key]: value }));
  };

  const addImages = (event) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file =>
      file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );

    const remaining = Math.max(0, 8 - images.length);
    const selected = validFiles.slice(0, remaining);

    setImages(previous => [
      ...previous,
      ...selected.map(file => ({
        file,
        url: URL.createObjectURL(file)
      }))
    ]);

    event.target.value = "";
  };

  const removeImage = (index) => {
    setImages(previous => {
      const selected = previous[index];
      if (selected) URL.revokeObjectURL(selected.url);
      return previous.filter((_, i) => i !== index);
    });
  };

  const validate = () => {
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.category ||
      !form.price ||
      !form.stock
    ) {
      setMessage(text.required);
      return false;
    }

    if (Number(form.price) <= 0 || Number(form.stock) < 0) {
      setMessage(sw
        ? "Bei au stock si sahihi."
        : "Invalid price or stock quantity.");
      return false;
    }

    setMessage("");
    return true;
  };

  const handleAction = (action) => {
    if (!validate()) return;

    if (action === "preview") {
      setMessage(sw
        ? "Taarifa zimekaguliwa. Hakiki ya mwisho itaongezwa katika hatua inayofuata."
        : "Details validated. Full preview will be added in the next step.");
      return;
    }

    if (action === "draft") {
      setMessage(sw
        ? "Fomu iko tayari kuunganishwa na mfumo wa kuhifadhi Draft."
        : "Form is ready for draft-saving integration.");
      return;
    }

    setMessage(sw
      ? "Fomu iko tayari. Ukaguzi wa server na uchapishaji vitaunganishwa kupitia Supabase."
      : "Form is ready. Server moderation and publishing will be connected through Supabase.");
  };

  return (
    <div className="product-page">

      <div className="product-page-heading">
        <button className="product-back" onClick={onBack}>
          <ArrowLeft size={18} />
          {sw ? "Rudi" : "Back"}
        </button>

        <h1>{text.title}</h1>
        <p>{text.subtitle}</p>
      </div>

      <div className="product-form-layout">

        <div className="product-form-main">

          <section className="product-form-card">
            <h2><Package size={19} /> {text.details}</h2>

            <label>{text.name} *</label>
            <input
              value={form.name}
              onChange={e => update("name", e.target.value)}
              placeholder={text.name}
            />

            <label>{text.description} *</label>
            <textarea
              rows="5"
              value={form.description}
              onChange={e => update("description", e.target.value)}
              placeholder={text.description}
            />

            <div className="product-two-columns">
              <div>
                <label>{text.category} *</label>
                <select
                  value={form.category}
                  onChange={e => update("category", e.target.value)}
                >
                  {text.categories.map((category, index) => (
                    <option key={index} value={index === 0 ? "" : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>{text.brand}</label>
                <input
                  value={form.brand}
                  onChange={e => update("brand", e.target.value)}
                  placeholder={text.brand}
                />
              </div>
            </div>

            <label>{text.sku}</label>
            <input
              value={form.sku}
              onChange={e => update("sku", e.target.value)}
              placeholder="e.g. ZUNE-001"
            />
          </section>

          <section className="product-form-card">
            <h2><ImagePlus size={19} /> {text.images}</h2>
            <p className="product-help">{text.imageHint}</p>

            <div className="product-upload-area">
              <UploadCloud size={30} />
              <strong>{text.upload}</strong>
              <span>PNG, JPG, WEBP · Max 5MB · 8 images</span>

              <label className="product-upload-button">
                {text.upload}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  onChange={addImages}
                />
              </label>
            </div>

            {images.length > 0 && (
              <div className="product-image-grid">
                {images.map((image, index) => (
                  <div className="product-image-preview" key={index}>
                    <img src={image.url} alt={`Product ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      aria-label="Remove image"
                    >
                      <X size={15} />
                    </button>
                    {index === 0 && (
                      <span>{sw ? "Picha kuu" : "Main image"}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="product-form-card">
            <h2>{text.pricing}</h2>

            <div className="product-two-columns">
              <div>
                <label>{text.price} *</label>
                <input
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={e => update("price", e.target.value)}
                  placeholder="0"
                />
              </div>

              <div>
                <label>{text.oldPrice}</label>
                <input
                  type="number"
                  min="0"
                  value={form.oldPrice}
                  onChange={e => update("oldPrice", e.target.value)}
                  placeholder="0"
                />
              </div>

              <div>
                <label>{text.stock} *</label>
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={e => update("stock", e.target.value)}
                  placeholder="0"
                />
              </div>

              <div>
                <label>{text.weight}</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.weight}
                  onChange={e => update("weight", e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>

            <label>{text.shipping}</label>
            <input
              type="number"
              min="0"
              value={form.shipping}
              onChange={e => update("shipping", e.target.value)}
              placeholder="0"
            />
          </section>

        </div>

        <aside className="product-form-side">

          <section className="product-form-card moderation-card">
            <ShieldCheck size={27} />
            <h3>{sw ? "Ulinzi wa ZUNE" : "ZUNE Content Protection"}</h3>
            <p>{text.moderation}</p>
          </section>

          <section className="product-form-card">
            <h3>{sw ? "Hatua za Kuchapisha" : "Publishing Steps"}</h3>
            <ul className="product-steps">
              <li>{sw ? "Jaza taarifa za bidhaa" : "Complete product details"}</li>
              <li>{sw ? "Pakia picha za bidhaa" : "Upload product images"}</li>
              <li>{sw ? "Ukaguzi wa usalama" : "Safety moderation"}</li>
              <li>{sw ? "Chapisha Marketplace" : "Publish to Marketplace"}</li>
            </ul>
          </section>

        </aside>
      </div>

      {message && (
        <div className="product-form-message" role="status">
          {message}
        </div>
      )}

      <div className="product-form-actions">
        <button onClick={() => handleAction("draft")}>
          <Save size={17} /> {text.save}
        </button>

        <button onClick={() => handleAction("preview")}>
          <Eye size={17} /> {text.preview}
        </button>

        <button
          className="product-publish-button"
          onClick={() => handleAction("publish")}
        >
          <Send size={17} /> {text.publish}
        </button>
      </div>

    </div>
  );
}
